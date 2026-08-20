import type { Metadata } from "next";
import Link from "next/link";
import TrialTable from "@/components/TrialTable";
import evidence from "@/lib/evidence.json";

export const metadata: Metadata = {
  title: "Evidence",
  description:
    "Published benchmark run logs for Root Cause Analytics: every field, every document, including the misses. Tables render directly from the raw result files.",
  alternates: { canonical: "/evidence" },
};

const MODEL_NAMES: Record<string, string> = {
  "claude-sonnet-5": "Sonnet",
  "claude-haiku-4-5": "Haiku",
};

export default function EvidencePage() {
  const trial = evidence.liveTrial;
  const v2 = evidence.v2Benchmark;
  const trialDate = new Date(trial.date).toLocaleDateString("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const templates = Object.entries(v2.byTemplate as Record<string, { correct: number; total: number; accuracy: number }>);

  return (
    <>
      <section className="page-hero">
        <p className="kicker rv-auto">Evidence · run logs, not brochures</p>
        <h1 className="rv-auto d1">
          We publish <span className="hl">our misses.</span>
        </h1>
        <p className="sub rv-auto d2">
          Most vendors quote one glossy accuracy number. We publish run logs:
          every field, every document, <b>including the ones we got wrong</b>.
          When a model fails, we score it zero and say so.
        </p>
      </section>

      <section className="section">
        <div className="ev-run">
          <div className="ev-run-head rv">
            <h3>Latest live trial · {trialDate}</h3>
            <span>
              Run {trial.dataset} · {trial.docs} documents
            </span>
          </div>
          <div className="ev-grid">
            <div className="rv d1">
              <p>
                {trial.docs} documents, five fields each, ground truth known
                before the run. Sonnet completed all {trial.docs}. Haiku
                completed {trial.runs[1]?.completed} and hit its output limit
                on two dense flow sheets, so those two{" "}
                <b>score zero in the table</b>. Document type identification is
                our current weak spot and we say so.
              </p>
              <p className="foot">
                Total API spend for this run: A${trial.totalSpendAud}*
                <br />
                *Yes, under two dollars. Testing with ground truth is cheap.
                Guessing is expensive.
              </p>
              <ul className="fact-list red" style={{ marginTop: 22 }}>
                {trial.runs.flatMap((r) =>
                  r.failedDocs.map((f) => (
                    <li key={r.model + f.id}>
                      <b>
                        {MODEL_NAMES[r.model] ?? r.model} · {f.id}:
                      </b>{" "}
                      {f.error}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div className="rv d2 table-scroll">
              <TrialTable />
            </div>
          </div>
        </div>

        <div className="ev-run">
          <div className="ev-run-head rv">
            <h3>V2 OCR benchmark · no AI assistance</h3>
            <span>
              {v2.docs} documents · {v2.fields} fields
            </span>
          </div>
          <div className="ev-grid">
            <div className="rv d1">
              <p>
                <b>
                  {v2.accuracyPct}% field accuracy ({v2.ocrOnly.correct}/
                  {v2.ocrOnly.total})
                </b>{" "}
                on OCR-only extraction across {v2.fields} fields. No AI, no
                provider key, nothing leaves the machine. The per-template
                breakdown is on the right, misses included.
              </p>
              <p className="foot">
                Dataset: {v2.dataset}
                <br />
                Generated{" "}
                {new Date(v2.generatedAt).toLocaleDateString("en-AU")}
              </p>
            </div>
            <div className="rv d2 table-scroll">
              <table>
                <caption>OCR-only accuracy by template</caption>
                <thead>
                  <tr>
                    <th scope="col">Template</th>
                    <th scope="col">Correct</th>
                    <th scope="col">Accuracy</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map(([name, t]) => (
                    <tr key={name}>
                      <td>{name.replace(".json", "")}</td>
                      <td className="num">
                        {t.correct}/{t.total}
                      </td>
                      <td className="num">
                        <span className={t.accuracy >= 1 ? "ok" : "miss"}>
                          {(t.accuracy * 100).toFixed(1)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>All templates</td>
                    <td className="num">
                      <b>
                        {v2.ocrOnly.correct}/{v2.ocrOnly.total}
                      </b>
                    </td>
                    <td className="num">
                      <b>{v2.accuracyPct}%</b>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="sec-head rv">
          <h2>Methodology</h2>
          <span>How these numbers are made</span>
        </div>
        <ul className="fact-list rv d1">
          <li>
            <b>Ground truth is known before the run.</b> Every trial document
            comes from our generator, so the right answer for every field
            exists before any model sees the page.
          </li>
          <li>
            <b>These tables render from the raw JSON logs.</b> When we run a
            new trial, we drop the result file in and the page updates.
            Nothing is typed in by hand.
          </li>
          <li>
            <b>Spend is published per run.</b> The {trialDate} trial cost A$
            {trial.totalSpendAud} in API fees.
          </li>
          <li>
            <b>Failures score zero.</b> A model that does not answer does not
            get excused from the denominator.
          </li>
        </ul>
      </section>

      <section className="cta">
        <div className="cta-card rv">
          <div>
            <h2>
              Want this run against <em>your document types?</em>
            </h2>
            <p>
              Ask for a benchmark pack. Same methodology, your formats, ground
              truth included.
            </p>
          </div>
          <div className="cta-actions">
            <Link className="btn btn-gold" href="/contact">
              Ask for a benchmark pack
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
