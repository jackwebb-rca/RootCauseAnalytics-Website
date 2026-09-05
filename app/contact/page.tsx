import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk directly with the founder. Replies within one business day, Sydney time.",
  alternates: { canonical: "/contact" },
};

const FAQ = [
  {
    q: "Where do your apps run?",
    a: "On your hardware. Both the Document Library and the Generator are self-hosted. OCR, extraction, search, export and generation all work offline. The Document Library only opens network connections if you turn AI assistance on, and then only to a runtime allowlist of exactly three hosts.",
  },
  {
    q: "Do you ever take custody of our documents?",
    a: "No. We do not take custody of your real documents to run our benchmarks. Evaluation runs on your hardware or on synthetic data.",
  },
  {
    q: "What accuracy should we expect?",
    a: "Our published V2 benchmark is 96.1% field accuracy on OCR-only extraction across 76 fields. That is our benchmark, not a promise about your corpus. Accuracy depends on your templates and the condition of your documents, which is why evaluation on your own document types comes first.",
  },
  {
    q: "How is it priced?",
    a: "Consumption based. The Document Library charges USD $0.10 per document extracted and the Document Generator charges USD $0.10 per document generated. There is no subscription and no upfront fee. Evaluations and sample sets are free, so you can check the quality before you pay.",
  },
  {
    q: "Can our synthetic documents be mistaken for real records?",
    a: "No. Every generated page carries a verifiable synthetic disclaimer, and no real patient exists anywhere in the pipeline. The documents are licensed for AI training, evaluation and internal demonstration, not for clinical, claims, underwriting or regulatory use.",
  },
  {
    q: "How fast do you reply?",
    a: "Within one business day, Sydney time.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="page-hero">
        <p className="kicker rv-auto">Contact</p>
        <h1 className="rv-auto d1">
          Talk directly with <span className="hl">the founder.</span>
        </h1>
        <p className="sub rv-auto d2">
          Tell me what documents you are dealing with and what you want out of
          them. <b>I reply within one business day, Sydney time.</b>
        </p>
      </section>

      <section className="section">
        <div className="contact-grid">
          <div className="rv">
            <ContactForm />
            <p className="hero-note" style={{ marginTop: 26 }}>
              Prefer plain email?{" "}
              <a href="mailto:jack.webb@rootcauseanalytics.com.au">
                jack.webb@rootcauseanalytics.com.au
              </a>
            </p>
          </div>
          <div className="rv d1">
            <div className="sec-head">
              <h2>Questions people ask</h2>
            </div>
            <div className="faq">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
