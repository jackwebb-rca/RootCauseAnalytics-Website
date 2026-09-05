import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of service for Root Cause Analytics Pty Ltd.",
  alternates: { canonical: "/terms" },
  robots: { index: false },
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <p className="kicker rv-auto">Legal · last updated 14 May 2026</p>
        <h1 className="rv-auto d1">Terms of Service</h1>
      </section>
      <section className="section">
        <div className="prose rv">
          <p>
            These terms govern use of this website and the products of Root
            Cause Analytics Pty Ltd. By accessing the site or using the
            products, you agree to them.
          </p>
          <p>
            <b>1. Products covered.</b> The self-hosted document extraction
            app, the synthetic document libraries (medical and insurance),
            benchmark packs, and bespoke custom libraries.
          </p>
          <p>
            <b>2. Synthetic-only restriction.</b> All generated documents are
            synthetic, with visible disclaimers on every page. You must not use
            them for clinical care, insurance underwriting, regulatory
            submissions, or any purpose that misrepresents them as authentic
            records.
          </p>
          <p>
            <b>3. Licence.</b> Subject to section 2, licensees may use the
            documents to train AI models, stress-test extraction pipelines and
            run internal demonstrations. Public redistribution and resale are
            prohibited.
          </p>
          <p>
            <b>4. Pricing and payment.</b> Evaluations and sample sets are
            free. Use of the apps is charged per document: USD $0.10 per
            document extracted in RCA Document Library and USD $0.10 per
            document generated in RCA Document Generator, with no subscription
            and no upfront fee. Prices are in US dollars.
          </p>
          <p>
            <b>5. Deployment.</b> The extraction app operates within your
            infrastructure. Root Cause Analytics retains no access to your
            documents or extracted data.
          </p>
          <p>
            <b>6. Intellectual property.</b> Root Cause Analytics retains
            rights to the generator, libraries and schemas. You retain
            ownership of the models and pipelines you develop.
          </p>
          <p>
            <b>7. Warranties.</b> Services are provided as is, with exclusions
            as permitted under Australian Consumer Law. No accuracy warranty
            applies beyond our published benchmarks.
          </p>
          <p>
            <b>8. Liability.</b> Liability is capped at amounts paid in the
            preceding twelve months. Indirect and consequential losses are
            excluded.
          </p>
          <p>
            <b>9. Indemnity.</b> You indemnify Root Cause Analytics against
            claims arising from breaches of section 2.
          </p>
          <p>
            <b>10. Termination.</b> Breach can result in suspension of access
            and termination of licences.
          </p>
          <p>
            <b>11. Changes.</b> Updates take effect on notice. Continued use
            constitutes acceptance.
          </p>
          <p>
            <b>12. Governing law.</b> New South Wales law applies, with
            exclusive jurisdiction in NSW courts.
          </p>
          <p>
            <b>13. Contact.</b> Root Cause Analytics Pty Ltd, Sydney, NSW,
            Australia ·{" "}
            <a href="mailto:jack.webb@rootcauseanalytics.com.au">
              jack.webb@rootcauseanalytics.com.au
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
