import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Short, practical writing on document extraction, synthetic data and the unglamorous reality of digitisation. No hype pieces.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <>
      <section className="page-hero">
        <p className="kicker rv-auto">Articles · the newsletter</p>
        <h1 className="rv-auto d1">
          Notes from the <span className="hl">paper mines.</span>
        </h1>
        <p className="sub rv-auto d2">
          Short, practical writing on document extraction, synthetic data and
          the unglamorous reality of digitisation. <b>No hype pieces.</b>
        </p>
      </section>

      <section className="section">
        {articles.length > 0 ? (
          <ul className="article-list rv">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link href={`/articles/${a.slug}`}>
                  <span className="date">
                    {new Date(a.date).toLocaleDateString("en-AU", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  <span>
                    <h3>{a.title}</h3>
                    <p>{a.summary}</p>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="honesty rv">
            <span className="tag">The archive is being unpacked</span>
            <p>
              New articles land here. Until then, the newsletter continues on
              LinkedIn, and you can{" "}
              <b>
                <Link href="/contact" style={{ color: "inherit" }}>
                  write to Jack directly
                </Link>
              </b>{" "}
              with questions worth answering in public.
            </p>
          </div>
        )}
      </section>
    </>
  );
}
