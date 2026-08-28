import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, withClient, getBalance, balanceAud } from "@/lib/billing/db";
import { hashToken, isTokenShape } from "@/lib/billing/token";
import { issueStatement, privateKeyFromEnv } from "@/lib/billing/statement";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/billing/balance
 * Auth: Authorization: Bearer <credit token>
 * Returns the balance plus a signed balance statement.
 */
export async function GET(req: NextRequest) {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (!isTokenShape(token)) {
    return NextResponse.json({ error: "invalid token" }, { status: 401 });
  }
  const tokenHash = hashToken(token);
  await ensureSchema();
  const quads = await withClient((q) => getBalance(q, tokenHash));
  if (quads === null) {
    return NextResponse.json({ error: "unknown token" }, { status: 404 });
  }
  const balance = balanceAud(quads);
  const signed = issueStatement(tokenHash, balance, privateKeyFromEnv());
  return NextResponse.json({
    balanceAud: balance,
    statement: signed.statement,
    signature: signed.signatureB64,
  });
}
