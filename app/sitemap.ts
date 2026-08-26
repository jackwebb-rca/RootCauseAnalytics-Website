import type { MetadataRoute } from "next";
import { articles } from "@/lib/articles";

const BASE = "https://www.rootcauseanalytics.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    "",
    "/document-library",
    "/document-generator",
    "/evidence",
    "/articles",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/security",
    "/downloads",
  ].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const articlePages = articles.map((a) => ({
    url: `${BASE}/articles/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));
  return [...pages, ...articlePages];
}
