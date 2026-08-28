import { NextRequest, NextResponse } from "next/server";
import { getPack } from "@/lib/billing/packs";
import { quadsToCents } from "@/lib/billing/money";
import { hashToken, isTokenShape } from "@/lib/billing/token";
import { getStripe, siteUrl } from "@/lib/billing/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/billing/checkout
 * Body: { pack: "pack25" | "pack50" | "pack100", token?: string }
 *
 * Creates a Stripe Checkout session for a credit pack. When a valid
 * existing credit token is supplied, the purchase tops up that account
 * (the webhook credits by token hash); otherwise the webhook creates a
 * new account and the success page reveals the new token once.
 *
 * Note: prices are simple AUD amounts. No GST line (seller is not GST
 * registered) and never a card-fee line (RBA surcharge ban).
 */
export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }
  const { pack: packId, token } = (body ?? {}) as {
    pack?: unknown;
    token?: unknown;
  };
  const pack = getPack(packId);
  if (!pack) {
    return NextResponse.json({ error: "unknown pack" }, { status: 400 });
  }
  let tokenHash: string | null = null;
  if (token !== undefined && token !== null && token !== "") {
    if (!isTokenShape(token)) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }
    tokenHash = hashToken(token);
  }

  const stripe = getStripe();
  const base = siteUrl();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    currency: "aud",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "aud",
          unit_amount: quadsToCents(pack.quads),
          product_data: {
            name: `RCA Document Library credits - ${pack.label}`,
            description: `About ${pack.approxDocs} LLM document extractions at 0.155 AUD each.`,
          },
        },
      },
    ],
    metadata: {
      pack: pack.id,
      amount_quads: String(pack.quads),
      // Only set for top-ups; new accounts get a token in the webhook.
      existing_token_hash: tokenHash ?? "",
    },
    success_url: `${base}/billing/success?cs={CHECKOUT_SESSION_ID}`,
    cancel_url: `${base}/pricing`,
  });

  return NextResponse.json({ url: session.url });
}
