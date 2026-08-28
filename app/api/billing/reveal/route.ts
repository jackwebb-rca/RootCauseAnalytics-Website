import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, withClient, takeReveal } from "@/lib/billing/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/billing/reveal?cs=<checkout session id>
 *
 * One-time reveal of a newly created credit token, for the checkout
 * success page. The session id is only known to the payer's browser
 * (Stripe redirects there). The row is deleted on reveal, so a second
 * call returns nothing.
 */
export async function GET(req: NextRequest) {
  const cs = req.nextUrl.searchParams.get("cs") ?? "";
  if (!/^cs_[A-Za-z0-9_]+$/.test(cs)) {
    return NextResponse.json({ error: "invalid session id" }, { status: 400 });
  }
  await ensureSchema();
  const token = await withClient((q) => takeReveal(q, cs));
  if (!token) {
    // Either already revealed, expired, a top-up (no new token), or
    // the webhook has not landed yet. The page retries briefly for the
    // webhook race, then shows guidance.
    return NextResponse.json({ token: null });
  }
  return NextResponse.json({ token });
}
