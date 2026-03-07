import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.rootcauseanalytics.com.au'
  return [
    { url: base,                      lastModified: new Date('2026-03-06'), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/solution`,        lastModified: new Date('2026-03-06'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/support`,         lastModified: new Date('2026-03-06'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`,           lastModified: new Date('2026-01-01'), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/contact`,         lastModified: new Date('2026-01-01'), changeFrequency: 'yearly',  priority: 0.6 },
  ]
}
