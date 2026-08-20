import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles } from "@/lib/articles";

// Article template. Renders any entry added to lib/articles.ts.
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    alternates: { canonical: `/articles/${article.slug}` },
  };
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    author: { "@type": "Person", name: "Jack Webb" },
    publisher: { "@type": "Organization", name: "Root Cause Analytics" },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="page-hero">
        <p className="kicker rv-auto">
          Article ·{" "}
          {new Date(article.date).toLocaleDateString("en-AU", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
        <h1 className="rv-auto d1">{article.title}</h1>
      </section>
      <section className="section">
        <div className="prose rv d1">
          {article.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>
    </>
  );
}
