// Article registry. Add new articles here and create a matching entry in
// content: the hub and the per-article template render from this list.
export type Article = {
  slug: string;
  title: string;
  date: string; // ISO date
  summary: string;
  body: string[]; // paragraphs
};

// No articles are published on the site yet. The previous site linked out to
// the LinkedIn newsletter and had no on-site article pages. New posts go here.
export const articles: Article[] = [];
