import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { ensureSchema, withClient, applyCredit, storeReveal } from "@/lib/billing/db";
import { generateToken, hashToken } from "@/lib/billing/token";
import { getStripe } from "@/lib/billing/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const REVEAL_TTL_MS = 24 * 60 * 60 * 1000; // success page has 24h to collect

/**
 * POST /api/billing/stripe-webhook
 *
 * Handles checkout.session.completed. Idempotent by Stripe event id
 * (billing_credits primary key), so at-least-once delivery and replays
 * credit exactly once. Unknown event types are acknowledged and
 * ignored. Signature is verified against the raw body.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "webhook not configured" }, { status: 500 });
  }
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }
  const raw = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(raw, signature, secret);
  } catch {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") {
    // Async payment methods complete later; acknowledge and wait for
    // the paid event.
    return NextResponse.json({ received: true });
  }

  const amountQuads = Number(session.metadata?.amount_quads ?? "");
  if (!Number.isSafeInteger(amountQuads) || amountQuads <= 0) {
    // A session we did not create. Acknowledge so Stripe stops
    // retrying, but credit nothing.
    return NextResponse.json({ received: true, ignored: "no pack metadata" });
  }
  // Belt and braces: the amount actually paid must match the metadata.
  if (session.amount_total !== amountQuads / 100 || session.currency !== "aud") {
    return NextResponse.json({ received: true, ignored: "amount mismatch" });
  }

  const existingHash = session.metadata?.existing_token_hash || "";
  const email = session.customer_details?.email ?? null;

  await ensureSchema();
  await withClient(async (q) => {
    let tokenHash = existingHash;
    let newToken: string | null = null;
    if (!/^[0-9a-f]{64}$/.test(tokenHash)) {
      newToken = generateToken();
      tokenHash = hashToken(newToken);
    }
    await applyCredit(q, {
      stripeEventId: event.id,
      checkoutSessionId: session.id,
      tokenHash,
      email,
      amountQuads,
    });
    if (newToken) {
      await storeReveal(
        q,
        session.id,
        newToken,
        new Date(Date.now() + REVEAL_TTL_MS)
      );
    }
  });

  return NextResponse.json({ received: true });
}
