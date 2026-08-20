import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "RCA Document Generator",
  description:
    "Realistic synthetic Australian documents for AI training and evaluation. 45 medical document types, 81 clinical case archetypes, complete ground truth, fully offline and deterministic.",
  alternates: { canonical: "/document-generator" },
};

const productSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "RCA Document Generator",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Self-hosted",
  description:
    "Generates realistic synthetic Australian documents for AI training and evaluation, with complete ground truth on every field. Deterministic and fully offline.",
  offers: { "@type": "Offer", priceCurrency: "AUD", price: "0", description: "Quote-based. Free preview pack first." },
  publisher: { "@type": "Organization", name: "Root Cause Analytics" },
};

const GALLERY = [
  { src: "/specimens/spec-treatment-plan-1.png", cap: "Staged care plan · MED", alt: "Synthetic staged care plan specimen" },
  { src: "/specimens/spec-ed-assessment-1.png", cap: "ED assessment · MED", alt: "Synthetic emergency department assessment specimen" },
  { src: "/specimens/spec-imaging-1.png", cap: "Imaging report · MED", alt: "Synthetic imaging report specimen" },
  { src: "/specimens/spec-ecg-1.png", cap: "12-lead ECG report · MED", alt: "Synthetic 12-lead ECG report specimen" },
  { src: "/specimens/spec-hads-1.png", cap: "HADS questionnaire · MED", alt: "Synthetic hospital anxiety and depression scale specimen" },
  { src: "/specimens/spec-medcert-1.png", cap: "Medical certificate · MED", alt: "Synthetic medical certificate specimen" },
  { src: "/specimens/spec-mhcp-1.png", cap: "MH care plan · MED", alt: "Synthetic mental health care plan specimen" },
  { src: "/specimens/spec-policy-1.png", cap: "Policy schedule · INS", alt: "Synthetic insurance policy schedule specimen" },
  { src: "/specimens/spec-lossrun-1.png", cap: "Loss run report · INS", alt: "Synthetic insurance loss run report specimen" },
];

export default function DocumentGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <section className="page-hero">
        <p className="kicker rv-auto">№ 02 · RCA Document Generator</p>
        <h1 className="rv-auto d1">
          Real enough to train on. <span className="hl">Fake enough</span> to
          sleep at night.
        </h1>
        <p className="sub rv-auto d2">
          The Generator produces realistic synthetic Australian documents and
          records for AI training and evaluation, with{" "}
          <b>zero privacy risk</b>. Every document ships with complete ground
          truth, so you always know the right answer when you test.
        </p>
      </section>

      <section className="section">
        <div className="sec-head rv">
          <h2>What it generates</h2>
          <span>Current holdings</span>
        </div>
        <ul className="fact-list rv d1">
          <li>
            <b>45 medical document types:</b> discharge summaries, ED
            assessments, pathology and imaging reports, care plans, hospital
            packs and more.
          </li>
          <li>
            <b>81 internally consistent clinical case archetypes.</b> The
            medications match the diagnosis. The dates line up. The story
            holds.
          </li>
          <li>
            <b>Commercial insurance packs:</b> broker submissions, policy
            schedules, loss runs, FNOL forms.
          </li>
          <li>
            <b>Red-flag packs:</b> submission packs seeded with deliberate
            cross-document inconsistencies, recorded in the ground truth, for
            testing whether your QA process catches them.
          </li>
        </ul>
      </section>

      <section className="section">
        <div className="sec-head rv">
          <h2>From the current libraries</h2>
          <span>Real generator output · reduced</span>
        </div>
        <div className="gallery rv d1">
          {GALLERY.map((g) => (
            <figure className="cell" key={g.src}>
              <Image
                src={g.src}
                alt={g.alt}
                width={400}
                height={300}
                style={{ width: "100%", height: 300, objectFit: "cover", objectPosition: "top" }}
              />
              <figcaption>{g.cap}</figcaption>
            </figure>
          ))}
        </div>
        <p className="spec-cap" style={{ marginTop: 16 }}>
          Every specimen above was produced by the RCA engine. No person shown
          exists. Every page carries a verifiable synthetic disclaimer.
        </p>
      </section>

      <section className="section">
        <div className="sec-head rv">
          <h2>Built for evaluation, not just volume</h2>
          <span>The engineering</span>
        </div>
        <ul className="fact-list red rv d1">
          <li>
            <b>Deterministic by design.</b> Same seed produces byte-identical
            PDFs and ground truth. Anyone can verify a pack.
          </li>
          <li>
            <b>Anti-memorisation variety:</b> 8 style profiles, 3 template
            families, 4 disclaimer placements, density variation. Your model
            learns documents, not one template.
          </li>
          <li>
            <b>Fully offline and fast.</b> No LLM calls. About 50 documents in
            5 seconds, 5,000 in around 5 minutes.
          </li>
          <li>
            <b>Australian to the bone:</b> valid Medicare and provider number
            formats, NSW addresses, local health districts.
          </li>
          <li>
            <b>Every page carries a verifiable synthetic disclaimer.</b>{" "}
            Nothing can be mistaken for a real record.
          </li>
        </ul>
      </section>

      <section className="section">
        <div className="sec-head rv">
          <h2>What it costs</h2>
          <span>Quote-based · anchors published</span>
        </div>
        <div className="table-scroll rv d1">
          <table>
            <caption>Insurance library · pricing ledger</caption>
            <thead>
              <tr>
                <th scope="col">Tier</th>
                <th scope="col">What you get</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Free sample</td>
                <td>2 submission packs. Review the schema, the ground truth and the disclaimer in real output.</td>
                <td className="num"><span className="ok">Free</span></td>
              </tr>
              <tr>
                <td>QA Sprint Pack</td>
                <td>10 submission packs, an engineered red-flag summary, and a 30-minute handover call. Built for pipeline QA and vendor evaluation.</td>
                <td className="num">AUD $2,500</td>
              </tr>
              <tr>
                <td>Production library</td>
                <td>100+ submission packs for a production regression suite or internal QA at scale.</td>
                <td className="num">Quote</td>
              </tr>
              <tr>
                <td>Training library</td>
                <td>1,000+ submission packs with train, validation and test splits for model training.</td>
                <td className="num">Quote</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="table-scroll rv d2" style={{ marginTop: 28 }}>
          <table>
            <caption>Medical library · pricing ledger</caption>
            <thead>
              <tr>
                <th scope="col">Tier</th>
                <th scope="col">What you get</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Free sample</td>
                <td>25 to 35 documents. Review the schema, the Australian conventions and the disclaimer.</td>
                <td className="num"><span className="ok">Free</span></td>
              </tr>
              <tr>
                <td>Pilot pack</td>
                <td>100 to 200 documents scoped to your specialty, for an internal pilot with ground truth.</td>
                <td className="num">Quote</td>
              </tr>
              <tr>
                <td>Production library</td>
                <td>500 to 1,000 documents across 40+ types for a production regression suite.</td>
                <td className="num">Quote</td>
              </tr>
              <tr>
                <td>Training library</td>
                <td>5,000+ documents with train, validation and test splits for model training at scale.</td>
                <td className="num">Quote</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="spec-cap rv d2" style={{ marginTop: 16 }}>
          Custom libraries are also available: your document types, your field
          schema, built deterministically and shipped with full ground truth.
          Tell us what you need to test and we will quote the corpus.
        </p>
      </section>

      <section className="cta">
        <div className="cta-card rv">
          <div>
            <h2>
              Test on documents that <em>cannot hurt anyone.</em>
            </h2>
            <p>
              Request a preview pack with ground truth included, so your team
              can evaluate hands-on.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-gold" href="/contact">
              Request a preview pack
            </Link>
            <Link className="btn btn-paper" href="/evidence">
              See the evidence →
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
