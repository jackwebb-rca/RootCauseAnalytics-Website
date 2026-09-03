import type { Metadata } from "next";
import Link from "next/link";
import evidence from "@/lib/evidence.json";

export const metadata: Metadata = {
  title: "RCA Document Library",
  description:
    "A self-hosted app for digitising and cataloguing documents. OCR, per-field confidence scoring, offline operation, and a clean searchable table of your entire archive.",
  alternates: { canonical: "/document-library" },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RCA Document Library",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Self-hosted",
  description:
    "Self-hosted app for digitising and cataloguing documents. OCR, field extraction with per-field confidence scores, offline operation.",
  offers: { "@type": "Offer", priceCurrency: "AUD", price: "0", description: "Quote-based. Free evaluation first." },
  publisher: { "@type": "Organization", name: "Root Cause Analytics" },
};

export default function DocumentLibraryPage() {
  const v2 = evidence.v2Benchmark;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <section className="page-hero">
        <p className="kicker rv-auto">№ 01 · RCA Document Library</p>
        <h1 className="rv-auto d1">
          Digitise your paper archive into a{" "}
          <span className="hl">table you can search and audit.</span>
        </h1>
        <p className="sub rv-auto d2">
          The Document Library is a self-hosted app for digitising and
          cataloguing documents. It OCRs your PDFs and scans, extracts the
          fields you define, and gives every value a{" "}
          <b>confidence score you can actually interrogate</b>. The result is a
          clean, searchable table of your entire archive.
        </p>
      </section>

      <section className="section">
        <div className="sec-head rv">
          <h2>How it works</h2>
          <span>Four steps</span>
        </div>
        <div className="steps">
          <div className="step rv">
            <span className="num" aria-hidden="true">1</span>
            <div>
              <h3>Load your documents</h3>
              <p>PDFs and scans, digital or paper-sourced.</p>
            </div>
          </div>
          <div className="step rv">
            <span className="num" aria-hidden="true">2</span>
            <div>
              <h3>Define templates for the fields you want</h3>
              <p>
                The template builder tells you which fields depend on layout
                and which generalise.
              </p>
            </div>
          </div>
          <div className="step rv">
            <span className="num" aria-hidden="true">3</span>
            <div>
              <h3>Extraction runs with per-field confidence</h3>
              <p>
                Confidence is built from four visible factors: OCR quality,
                rule match, type check and shape check, so there is no
                black-box score.
              </p>
            </div>
          </div>
          <div className="step rv">
            <span className="num" aria-hidden="true">4</span>
            <div>
              <h3>Search, review, export</h3>
              <p>
                Review the flagged fields and export. Ground truth records are
                append-only, so your history never breaks.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="sec-head rv">
          <h2>Why teams pick it over digitisation vendors</h2>
          <span>All claims verifiable</span>
        </div>
        <ul className="fact-list rv d1">
          <li>
            <b>{v2.accuracyPct}% field accuracy</b> on OCR-only extraction in
            the V2 benchmark ({v2.fields} fields). That number is OCR only,
            with no AI assistance.
          </li>
          <li>
            <b>Offline-first.</b> OCR, extraction, search and export all run
            without internet. Your documents never leave your machines.
          </li>
          <li>
            <b>Locked-down networking.</b> The app enforces a runtime allowlist
            of exactly three hosts, and only if you turn AI assistance on.
          </li>
          <li>
            <b>Optional AI scoring layer.</b> If you add a provider key, AI
            validates extractions as a separate result. It never overwrites
            what the OCR engine found.
          </li>
          <li>
            <b>Australian formats understood</b>, including Medicare numbers.
          </li>
          <li>
            Costs a fraction of a standard digitisation contract, and you own
            the setup.
          </li>
        </ul>
      </section>

      <section className="section">
        <div className="sec-head rv">
          <h2>What it costs</h2>
          <span>Quote based, anchors published</span>
        </div>
        <div className="table-scroll rv d1">
          <table>
            <caption>Document Library · pricing ledger</caption>
            <thead>
              <tr>
                <th scope="col">Stage</th>
                <th scope="col">What you get</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Evaluation</td>
                <td>
                  A trial run on your own document types, on your hardware or
                  on synthetic stand-ins. You see real extraction results
                  before you commit to anything.
                </td>
                <td className="num"><span className="ok">Free</span></td>
              </tr>
              <tr>
                <td>Extraction</td>
                <td>
                  Per-document fee once you run at volume. Covers OCR,
                  extraction, confidence scoring and cataloguing.
                </td>
                <td className="num">10c per document</td>
              </tr>
              <tr>
                <td>Licence and setup</td>
                <td>
                  Scoped to your deployment: single desktop or self-hosted
                  Docker server, template building, and handover.
                </td>
                <td className="num">Quote</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="spec-cap rv d2" style={{ marginTop: 16 }}>
          For comparison: Australian scanning bureaus typically charge 8 to 25
          cents per page for scanning alone, before any data extraction or
          cataloguing. Tell us your document volume and we will give you a
          full quote.
        </p>
      </section>

      <section className="section">
        <div className="honesty rv">
          <span className="tag">What we do not claim</span>
          <p>
            Extraction accuracy depends on your templates and the condition of
            your documents. {v2.accuracyPct}% is our published benchmark,{" "}
            <b>not a promise about your corpus</b>. That is why evaluation on
            your own document types comes first, before any commitment.
          </p>
        </div>
      </section>

      <section className="cta">
        <div className="cta-card rv">
          <div>
            <h2>
              Run it on <em>your documents.</em>
            </h2>
            <p>
              Request an evaluation. It runs on your hardware or on synthetic
              data, so nothing sensitive changes hands.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-gold" href="/contact">
              Request an evaluation
            </Link>
            <Link className="btn btn-paper" href="/evidence">
              See the live trials →
            </Link>
            <span className="mono-note">
              Replies within one business day, Sydney time.
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
