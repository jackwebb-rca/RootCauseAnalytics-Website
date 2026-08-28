import { describe, it, expect } from "vitest";
import { generateKeyPairSync } from "crypto";
import {
  issueStatement,
  verifyStatement,
  GRACE_SECONDS,
} from "@/lib/billing/statement";

function keys() {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  return {
    priv: privateKey.export({ type: "pkcs8", format: "pem" }).toString(),
    pub: publicKey.export({ type: "spki", format: "pem" }).toString(),
  };
}

const HASH = "ab".repeat(32);

describe("balance statement", () => {
  it("signs and verifies", () => {
    const { priv, pub } = keys();
    const { statement, signatureB64 } = issueStatement(HASH, "24.0250", priv);
    expect(verifyStatement(statement, signatureB64, pub)).toEqual({ ok: true });
  });

  it("grace window is exactly seven days", () => {
    const { priv } = keys();
    const now = new Date("2026-08-28T00:00:00.000Z");
    const { statement } = issueStatement(HASH, "1.0000", priv, now);
    expect(statement.issuedAt).toBe("2026-08-28T00:00:00.000Z");
    expect(statement.expiresAt).toBe("2026-09-04T00:00:00.000Z");
    expect(GRACE_SECONDS).toBe(604800);
  });

  it("rejects a tampered balance", () => {
    const { priv, pub } = keys();
    const { statement, signatureB64 } = issueStatement(HASH, "1.0000", priv);
    const tampered = { ...statement, balanceAud: "9999.0000" };
    const result = verifyStatement(tampered, signatureB64, pub);
    expect(result.ok).toBe(false);
    expect(result.reason).toBe("bad signature");
  });

  it("rejects an expired statement", () => {
    const { priv, pub } = keys();
    const issued = new Date("2026-01-01T00:00:00.000Z");
    const { statement, signatureB64 } = issueStatement(HASH, "1.0000", priv, issued);
    const later = new Date("2026-01-09T00:00:00.000Z"); // day 8 of a 7 day grace
    const result = verifyStatement(statement, signatureB64, pub, later);
    expect(result.ok).toBe(false);
    expect(result.reason).toBe("expired");
  });

  it("accepts within grace and rejects one second after expiry", () => {
    const { priv, pub } = keys();
    const issued = new Date("2026-01-01T00:00:00.000Z");
    const { statement, signatureB64 } = issueStatement(HASH, "1.0000", priv, issued);
    const inside = new Date("2026-01-07T23:59:59.000Z");
    expect(verifyStatement(statement, signatureB64, pub, inside).ok).toBe(true);
    const outside = new Date("2026-01-08T00:00:01.000Z");
    expect(verifyStatement(statement, signatureB64, pub, outside).ok).toBe(false);
  });

  it("rejects the wrong key", () => {
    const a = keys();
    const b = keys();
    const { statement, signatureB64 } = issueStatement(HASH, "1.0000", a.priv);
    expect(verifyStatement(statement, signatureB64, b.pub).ok).toBe(false);
  });
});
