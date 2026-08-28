import type { Metadata } from "next";
import { Suspense } from "react";
import { RevealToken } from "./reveal-token";

export const metadata: Metadata = {
  title: "Payment complete",
  robots: { index: false },
};

export default function BillingSuccessPage() {
  return (
    <>
      <section className="page-hero">
        <p className="kicker rv-auto">Billing · payment complete</p>
        <h1 className="rv-auto d1">Thank you</h1>
      </section>
      <section className="section">
        <div className="prose rv">
          <Suspense fallback={<p>Checking your payment...</p>}>
            <RevealToken />
          </Suspense>
        </div>
      </section>
    </>
  );
}
