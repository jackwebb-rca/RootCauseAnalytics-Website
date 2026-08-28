import { describe, it, expect, beforeEach } from "vitest";
import { newDb } from "pg-mem";
import {
  ensureSchema,
  applyCredit,
  applyUsage,
  validateUsageRow,
  getBalance,
  storeReveal,
  takeReveal,
  type Querier,
} from "@/lib/billing/db";

// pg-mem runs the real schema and the real SQL, so these tests prove
// the idempotency guarantees at the SQL level, not in a re-implementation.

function makeDb(): Querier {
  const mem = newDb();
  const { Pool } = mem.adapters.createPg();
  const pool = new Pool();
  return pool as unknown as Querier;
}

const HASH_A = "aa".repeat(32);
const LEDGER_1 = "11".repeat(32);
const LEDGER_2 = "22".repeat(32);

function usageRow(id: string) {
  const v = validateUsageRow({
    id,
    amount: "0.155",
    currency: "AUD",
    extracted_at: "2026-08-28T00:00:00.000Z",
    period: "2026-08",
  });
  if (!v.ok) throw new Error("test row invalid: " + v.reason);
  return v;
}

describe("billing db", () => {
  let q: Querier;
  beforeEach(async () => {
    q = makeDb();
    await ensureSchema(q);
  });

  it("credits once per Stripe event id, replay is harmless", async () => {
    const args = {
      stripeEventId: "evt_1",
      checkoutSessionId: "cs_1",
      tokenHash: HASH_A,
      email: "jack@example.com",
      amountQuads: 250000,
    };
    const first = await applyCredit(q, args);
    expect(first).toEqual({ credited: true, balanceQuads: 250000 });
    const replay = await applyCredit(q, args);
    expect(replay).toEqual({ credited: false, balanceQuads: 250000 });
  });

  it("top-up adds to the same account", async () => {
    await applyCredit(q, {
      stripeEventId: "evt_1",
      checkoutSessionId: "cs_1",
      tokenHash: HASH_A,
      email: null,
      amountQuads: 250000,
    });
    const topup = await applyCredit(q, {
      stripeEventId: "evt_2",
      checkoutSessionId: "cs_2",
      tokenHash: HASH_A,
      email: null,
      amountQuads: 500000,
    });
    expect(topup.balanceQuads).toBe(750000);
  });

  it("debits once per ledger id, redelivery is harmless", async () => {
    await applyCredit(q, {
      stripeEventId: "evt_1",
      checkoutSessionId: "cs_1",
      tokenHash: HASH_A,
      email: null,
      amountQuads: 250000,
    });
    const first = await applyUsage(q, HASH_A, [usageRow(LEDGER_1), usageRow(LEDGER_2)]);
    expect(first).toEqual({
      applied: 2,
      duplicates: 0,
      balanceQuads: 250000 - 2 * 1550,
    });
    const replay = await applyUsage(q, HASH_A, [usageRow(LEDGER_1), usageRow(LEDGER_2)]);
    expect(replay).toEqual({
      applied: 0,
      duplicates: 2,
      balanceQuads: 250000 - 2 * 1550,
    });
  });

  it("unknown token yields null, no side effects", async () => {
    const result = await applyUsage(q, HASH_A, [usageRow(LEDGER_1)]);
    expect(result).toBeNull();
    expect(await getBalance(q, HASH_A)).toBeNull();
  });

  it("reveal returns the token exactly once", async () => {
    const future = new Date(Date.now() + 60_000);
    await storeReveal(q, "cs_1", "rca_credit_" + "a".repeat(32), future);
    expect(await takeReveal(q, "cs_1")).toBe("rca_credit_" + "a".repeat(32));
    expect(await takeReveal(q, "cs_1")).toBeNull();
  });

  it("expired reveal returns nothing", async () => {
    const past = new Date(Date.now() - 60_000);
    await storeReveal(q, "cs_1", "rca_credit_" + "b".repeat(32), past);
    expect(await takeReveal(q, "cs_1")).toBeNull();
  });
});

describe("usage row validation", () => {
  const base = {
    id: LEDGER_1,
    amount: "0.155",
    currency: "AUD",
  };
  it("accepts the real fee shape", () => {
    expect(validateUsageRow(base).ok).toBe(true);
  });
  it("rejects wrong currency", () => {
    expect(validateUsageRow({ ...base, currency: "USD" }).ok).toBe(false);
  });
  it("rejects zero, negative, and oversize amounts", () => {
    expect(validateUsageRow({ ...base, amount: "0" }).ok).toBe(false);
    expect(validateUsageRow({ ...base, amount: "-1" }).ok).toBe(false);
    expect(validateUsageRow({ ...base, amount: "1.0001" }).ok).toBe(false);
  });
  it("accepts exactly 1 AUD (the upper bound)", () => {
    expect(validateUsageRow({ ...base, amount: "1" }).ok).toBe(true);
  });
  it("rejects non-hash ids", () => {
    expect(validateUsageRow({ ...base, id: "not-a-hash" }).ok).toBe(false);
    // An all-digit hash has no uppercase form, so use a lettered one.
    expect(validateUsageRow({ ...base, id: "AB".repeat(32) }).ok).toBe(false);
  });
});
