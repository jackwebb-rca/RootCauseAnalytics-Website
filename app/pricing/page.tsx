import type { Metadata } from "next";
import { PACKS } from "@/lib/billing/packs";
import { BuyButtons } from "./buy-buttons";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "RCA Document Library is free to download. AI extraction uses prepaid credits at 15.5 cents per document.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const packs = Object.values(PACKS);
  return (
    <>
      <section className="page-hero">
        <p className="kicker rv-auto">Pricing · prepaid credits</p>
        <h1 className="rv-auto d1">Pricing</h1>
      </section>
      <section className="section">
        <div className="prose rv">
          <p>
            The app is free to download and free to use with the built-in
            offline extraction engine. AI extraction uses your own Anthropic
            API key, which Anthropic bills to you directly, plus a platform
            fee of <b>15.5 cents AUD per document</b>, paid with prepaid
            credits.
          </p>
          <p>
            Your first 25 AI documents are free, so you can try AI extraction
            before you buy credits.
          </p>
          <h2>Credit packs</h2>
          <BuyButtons
            packs={packs.map((p) => ({
              id: p.id,
              label: p.label,
              approxDocs: p.approxDocs,
            }))}
          />
          <h2>How it works</h2>
          <ol>
            <li>Buy a credit pack. Payment is by card, processed by Stripe.</li>
            <li>
              You get a credit code on the payment success page. Keep it safe.
            </li>
            <li>
              Paste the code into the app under Settings, Billing. The app
              shows your balance and how many documents it covers.
            </li>
            <li>
              Each completed AI extraction uses 15.5 cents of credit. When the
              balance runs out, AI extraction pauses until you top up with the
              same code.
            </li>
          </ol>
          <p>
            Credits do not expire. Prices are in Australian dollars. No GST is
            charged (Root Cause Analytics is not registered for GST). If you
            need a refund of unused credits, <a href="/contact">contact us</a>.
          </p>
        </div>
      </section>
    </>
  );
}
