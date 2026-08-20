import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Root Cause Analytics approaches security across its self-hosted products, synthetic libraries, website and operations.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      <section className="page-hero">
        <p className="kicker rv-auto">Security · last updated 14 May 2026</p>
        <h1 className="rv-auto d1">Security Notice</h1>
      </section>
      <section className="section">
        <div className="prose rv">
          <p>
            <b>The extraction app.</b> Runs self-hosted inside your
            infrastructure. Patient data, documents and extracted output remain
            entirely within your environment. No external API calls are made
            during extraction unless you enable AI assistance, and encryption
            is handled by your own infrastructure.
          </p>
          <p>
            <b>Synthetic libraries.</b> Every PDF carries a visible synthetic
            disclaimer on every page. Libraries are generated from curated case
            files and phrase banks. Downloads are direct, without third-party
            file-share processors unless you request one. The libraries are not
            licensed for clinical, claims, underwriting, regulatory or legal
            use.
          </p>
          <p>
            <b>This website.</b> HTTPS everywhere with HSTS. Hosted on Vercel.
            Static generation keeps the attack surface small.
          </p>
          <p>
            <b>Operations.</b> Private source repositories with access
            controls. Two-factor authentication on all administrative accounts.
            Production deployments gated on the main branch. Secrets managed
            through environment variables. No production access from personal
            mobile devices.
          </p>
          <p>
            <b>Vulnerability reporting.</b> Email{" "}
            <a href="mailto:jack.webb@rootcauseanalytics.com.au">
              jack.webb@rootcauseanalytics.com.au
            </a>{" "}
            with coordinated disclosure. We respond within five business days,
            AEST.
          </p>
        </div>
      </section>
    </>
  );
}
