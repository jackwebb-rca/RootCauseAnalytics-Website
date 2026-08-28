import { createPrivateKey, createPublicKey, sign, verify } from "crypto";

// Signed balance statements. The desktop app caches the latest
// statement; within the offline grace window the cached statement
// authorises LLM extraction up to the cached balance. Ed25519, the
// same signing pattern as the app's update manifest.
//
// Keys: BILLING_SIGNING_KEY_B64 is a base64 PKCS8 PEM private key,
// generated offline by scripts/billing-generate-signing-key.mjs.
// The matching public key ships inside the desktop app (unit B3).

export const STATEMENT_VERSION = "rca-balance-v1";
export const GRACE_SECONDS = 7 * 24 * 60 * 60; // 7 days (DECISION D-4)

export interface BalanceStatement {
  v: typeof STATEMENT_VERSION;
  tokenHash: string;
  balanceAud: string; // canonical 4dp decimal string
  issuedAt: string; // ISO UTC
  expiresAt: string; // ISO UTC, issuedAt + grace
}

function canonicalPayload(s: BalanceStatement): Buffer {
  // Field order is pinned; the verifier rebuilds this exact string.
  return Buffer.from(
    [s.v, s.tokenHash, s.balanceAud, s.issuedAt, s.expiresAt].join("\n"),
    "utf8"
  );
}

export function issueStatement(
  tokenHash: string,
  balanceAud: string,
  privateKeyPem: string,
  now: Date = new Date()
): { statement: BalanceStatement; signatureB64: string } {
  const statement: BalanceStatement = {
    v: STATEMENT_VERSION,
    tokenHash,
    balanceAud,
    issuedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + GRACE_SECONDS * 1000).toISOString(),
  };
  const key = createPrivateKey(privateKeyPem);
  const signature = sign(null, canonicalPayload(statement), key);
  return { statement, signatureB64: signature.toString("base64") };
}

export function verifyStatement(
  statement: BalanceStatement,
  signatureB64: string,
  publicKeyPem: string,
  now: Date = new Date()
): { ok: boolean; reason?: string } {
  if (statement.v !== STATEMENT_VERSION) {
    return { ok: false, reason: "unknown statement version" };
  }
  const expires = Date.parse(statement.expiresAt);
  if (!Number.isFinite(expires)) return { ok: false, reason: "bad expiry" };
  if (now.getTime() > expires) return { ok: false, reason: "expired" };
  let valid = false;
  try {
    const key = createPublicKey(publicKeyPem);
    valid = verify(
      null,
      canonicalPayload(statement),
      key,
      Buffer.from(signatureB64, "base64")
    );
  } catch {
    valid = false;
  }
  return valid ? { ok: true } : { ok: false, reason: "bad signature" };
}

export function privateKeyFromEnv(): string {
  const b64 = process.env.BILLING_SIGNING_KEY_B64;
  if (!b64) throw new Error("BILLING_SIGNING_KEY_B64 is not set");
  return Buffer.from(b64, "base64").toString("utf8");
}
