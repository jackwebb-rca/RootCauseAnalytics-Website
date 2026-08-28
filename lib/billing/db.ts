import { Pool } from "pg";
import { formatQuadsAsAud, parseAudToQuads } from "./money";
import { MAX_DEBIT_QUADS } from "./packs";

// Billing storage. Postgres (Neon through Vercel storage). The server
// balance is billing truth; the desktop fee ledger is the local record.
//
// Idempotency mirrors the desktop ledger's own trick:
// - credits are unique by Stripe event id (webhooks arrive at least once)
// - debits are unique by the fee ledger row id (the fee:v1 content hash)
// so replays of either are harmless by construction.

export interface Querier {
  query(text: string, params?: unknown[]): Promise<{ rows: any[] }>;
}

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

export function getPool(): Pool {
  if (!pool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is not set");
    pool = new Pool({ connectionString: url, max: 3 });
  }
  return pool;
}

/**
 * Run work on ONE pooled connection. Required for every transactional
 * helper below: BEGIN/COMMIT through Pool.query would land on
 * different connections and silently not be a transaction.
 */
export async function withClient<T>(fn: (q: Querier) => Promise<T>): Promise<T> {
  const client = await getPool().connect();
  try {
    return await fn(client);
  } finally {
    client.release();
  }
}

export const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS billing_accounts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  token_hash TEXT NOT NULL UNIQUE,
  email TEXT,
  balance_quads BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS billing_credits (
  stripe_event_id TEXT PRIMARY KEY,
  checkout_session_id TEXT NOT NULL UNIQUE,
  account_id BIGINT NOT NULL REFERENCES billing_accounts(id),
  amount_quads BIGINT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS billing_debits (
  ledger_id TEXT PRIMARY KEY,
  account_id BIGINT NOT NULL REFERENCES billing_accounts(id),
  amount_quads BIGINT NOT NULL,
  extracted_at TEXT,
  period TEXT,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS billing_reveals (
  checkout_session_id TEXT PRIMARY KEY,
  token TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL
);
`;

export async function ensureSchema(q: Querier = getPool()): Promise<void> {
  if (q === (pool as unknown) && schemaReady) return schemaReady;
  const run = (async () => {
    for (const stmt of SCHEMA_SQL.split(";")) {
      const sql = stmt.trim();
      if (sql) await q.query(sql);
    }
  })();
  if (q === (pool as unknown)) schemaReady = run;
  return run;
}

/**
 * Apply a completed checkout. Idempotent by Stripe event id AND by
 * checkout session id. Creates the account when accountTokenHash has
 * no row yet. Returns the credited account's token hash.
 */
export async function applyCredit(
  q: Querier,
  args: {
    stripeEventId: string;
    checkoutSessionId: string;
    tokenHash: string;
    email: string | null;
    amountQuads: number;
  }
): Promise<{ credited: boolean; balanceQuads: number }> {
  if (!Number.isSafeInteger(args.amountQuads) || args.amountQuads <= 0) {
    throw new Error("credit amount must be a positive integer of quads");
  }
  await q.query("BEGIN");
  try {
    await q.query(
      `INSERT INTO billing_accounts (token_hash, email)
       VALUES ($1, $2)
       ON CONFLICT (token_hash) DO NOTHING`,
      [args.tokenHash, args.email]
    );
    const inserted = await q.query(
      `INSERT INTO billing_credits
         (stripe_event_id, checkout_session_id, account_id, amount_quads)
       SELECT $1, $2, a.id, $3::bigint FROM billing_accounts a
        WHERE a.token_hash = $4
       ON CONFLICT DO NOTHING
       RETURNING account_id`,
      [args.stripeEventId, args.checkoutSessionId, args.amountQuads, args.tokenHash]
    );
    const credited = inserted.rows.length > 0;
    if (credited) {
      await q.query(
        `UPDATE billing_accounts
            SET balance_quads = balance_quads + $1::bigint
          WHERE token_hash = $2`,
        [args.amountQuads, args.tokenHash]
      );
    }
    const bal = await q.query(
      `SELECT balance_quads FROM billing_accounts WHERE token_hash = $1`,
      [args.tokenHash]
    );
    await q.query("COMMIT");
    return { credited, balanceQuads: Number(bal.rows[0].balance_quads) };
  } catch (err) {
    await q.query("ROLLBACK");
    throw err;
  }
}

export interface UsageRow {
  id: string; // fee ledger content-hash id
  amount: string | number; // AUD, up to 4dp
  currency: string; // must be AUD
  extracted_at?: string;
  period?: string;
}

export function validateUsageRow(row: unknown): { ok: true; id: string; quads: number; extractedAt: string | null; period: string | null } | { ok: false; reason: string } {
  const r = row as Partial<UsageRow> | null;
  if (!r || typeof r !== "object") return { ok: false, reason: "not an object" };
  if (typeof r.id !== "string" || !/^[0-9a-f]{64}$/.test(r.id)) {
    return { ok: false, reason: "id must be a 64-char hex hash" };
  }
  if (r.currency !== "AUD") return { ok: false, reason: "currency must be AUD" };
  let quads: number;
  try {
    quads = parseAudToQuads(r.amount as string | number);
  } catch {
    return { ok: false, reason: "bad amount" };
  }
  if (quads <= 0 || quads > MAX_DEBIT_QUADS) {
    return { ok: false, reason: "amount out of bounds" };
  }
  return {
    ok: true,
    id: r.id,
    quads,
    extractedAt: typeof r.extracted_at === "string" ? r.extracted_at : null,
    period: typeof r.period === "string" ? r.period : null,
  };
}

/**
 * Apply a batch of usage rows to an account. Each ledger id debits at
 * most once, ever. Returns the new balance and how many rows were new.
 * The balance MAY go slightly negative (a batch finishing after the
 * last top-up ran out); the desktop gate blocks the NEXT batch.
 */
export async function applyUsage(
  q: Querier,
  tokenHash: string,
  rows: Array<ReturnType<typeof validateUsageRow> & { ok: true }>
): Promise<{ applied: number; duplicates: number; balanceQuads: number } | null> {
  await q.query("BEGIN");
  try {
    const acct = await q.query(
      `SELECT id FROM billing_accounts WHERE token_hash = $1 FOR UPDATE`,
      [tokenHash]
    );
    if (acct.rows.length === 0) {
      await q.query("ROLLBACK");
      return null;
    }
    const accountId = acct.rows[0].id;
    let applied = 0;
    for (const row of rows) {
      const ins = await q.query(
        `INSERT INTO billing_debits
           (ledger_id, account_id, amount_quads, extracted_at, period)
         VALUES ($1, $2, $3::bigint, $4, $5)
         ON CONFLICT DO NOTHING
         RETURNING ledger_id`,
        [row.id, accountId, row.quads, row.extractedAt, row.period]
      );
      if (ins.rows.length > 0) {
        applied += 1;
        await q.query(
          `UPDATE billing_accounts SET balance_quads = balance_quads - $1::bigint
            WHERE id = $2`,
          [row.quads, accountId]
        );
      }
    }
    const bal = await q.query(
      `SELECT balance_quads FROM billing_accounts WHERE id = $1`,
      [accountId]
    );
    await q.query("COMMIT");
    return {
      applied,
      duplicates: rows.length - applied,
      balanceQuads: Number(bal.rows[0].balance_quads),
    };
  } catch (err) {
    await q.query("ROLLBACK");
    throw err;
  }
}

export async function getBalance(
  q: Querier,
  tokenHash: string
): Promise<number | null> {
  const res = await q.query(
    `SELECT balance_quads FROM billing_accounts WHERE token_hash = $1`,
    [tokenHash]
  );
  return res.rows.length ? Number(res.rows[0].balance_quads) : null;
}

export function balanceAud(balanceQuads: number): string {
  return formatQuadsAsAud(balanceQuads);
}

// One-time token reveal for the checkout success page. The plaintext
// token lives only here and only until revealed or expired.

export async function storeReveal(
  q: Querier,
  checkoutSessionId: string,
  token: string,
  expiresAt: Date
): Promise<void> {
  await q.query(
    `INSERT INTO billing_reveals (checkout_session_id, token, expires_at)
     VALUES ($1, $2, $3)
     ON CONFLICT (checkout_session_id) DO NOTHING`,
    [checkoutSessionId, token, expiresAt.toISOString()]
  );
}

export async function takeReveal(
  q: Querier,
  checkoutSessionId: string
): Promise<string | null> {
  const res = await q.query(
    `DELETE FROM billing_reveals
      WHERE checkout_session_id = $1 AND expires_at > now()
      RETURNING token`,
    [checkoutSessionId]
  );
  return res.rows.length ? res.rows[0].token : null;
}
