import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, withClient, applyUsage, validateUsageRow, balanceAud } from "@/lib/billing/db";
import { hashToken, isTokenShape } from "@/lib/billing/token";
import { issueStatement, privateKeyFromEnv } from "@/lib/billing/statement";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BATCH = 500;

/**
 * POST /api/billing/usage
 * Auth: Authorization: Bearer <credit token>
 * Body: { rows: [{ id, amount, currency, extracted_at?, period? }] }
 *
 * Debits the account once per fee-ledger row id (the desktop ledger's
 * fee:v1 content hash), so redelivery of the same rows is harmless.
 * Returns the new balance plus a signed balance statement for the
 * desktop offline grace window.
 */
export async function POST(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!isTokenShape(token)) {
    return NextResponse.json({ error: "invalid token" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }
  const rows = (body as { rows?: unknown })?.rows;
  if (!Array.isArray(rows) || rows.length === 0 || rows.length > MAX_BATCH) {
    return NextResponse.json(
      { error: `rows must be 1..${MAX_BATCH}` },
      { status: 400 }
    );
  }
  const validated: Array<Extract<ReturnType<typeof validateUsageRow>, { ok: true }>> = [];
  for (const row of rows) {
    const v = validateUsageRow(row);
    if (!v.ok) {
      return NextResponse.json(
        { error: `bad row: ${v.reason}` },
        { status: 400 }
      );
    }
    validated.push(v);
  }

  const tokenHash = hashToken(token);
  await ensureSchema();
  const result = await withClient((q) => applyUsage(q, tokenHash, validated));
  if (!result) {
    return NextResponse.json({ error: "unknown token" }, { status: 404 });
  }

  const balance = balanceAud(result.balanceQuads);
  const signed = issueStatement(tokenHash, balance, privateKeyFromEnv());
  return NextResponse.json({
    applied: result.applied,
    duplicates: result.duplicates,
    balanceAud: balance,
    statement: signed.statement,
    signature: signed.signatureB64,
  });
}
