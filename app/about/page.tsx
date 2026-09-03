import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Root Cause Analytics is a one-person company in Sydney with published benchmarks. Two products, both self-hosted, both built here.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <p className="kicker rv-auto">About Root Cause Analytics</p>
        <h1 className="rv-auto d1">
          A one-person company with{" "}
          <span className="hl">published benchmarks.</span>
        </h1>
      </section>

      <section className="section">
        <div className="prose rv">
          <p>
            I started Root Cause Analytics because I had this problem myself
            and could not find a good solution on the market.
          </p>
          <p>
            The site exists to show you the evidence: that RCA is a reliable
            alternative to standard digitisation companies,{" "}
            <b>with more capability, at a fraction of the price</b>.
          </p>
          <p>
            Based in Sydney, NSW. Two products, both self-hosted, both built
            here.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="honesty rv">
          <span className="tag">What we will not do</span>
          <p>
            We do not take custody of your real documents to run our
            benchmarks. <b>Evaluation runs on your hardware or on synthetic
            data.</b>
          </p>
        </div>
      </section>

      <section className="cta">
        <div className="cta-card rv">
          <div>
            <h2>
              The evidence is <em>one click away.</em>
            </h2>
            <p>
              Every accuracy claim on this site links back to a published run
              log, misses included.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-gold" href="/evidence">
              See the live trials
            </Link>
            <Link className="btn btn-paper" href="/contact">
              Talk to Jack →
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
