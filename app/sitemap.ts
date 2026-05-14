import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.rootcauseanalytics.com.au'
  return [
    { url: base,                                  lastModified: new Date('2026-05-14'), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${base}/products/rca-extract`,        lastModified: new Date('2026-05-14'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/libraries`,                   lastModified: new Date('2026-05-14'), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/libraries/insurance`,         lastModified: new Date('2026-05-14'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/libraries/medical`,           lastModified: new Date('2026-05-14'), changeFrequency: 'monthly', priority: 0.85 },
    { url: `${base}/libraries/benchmark-packs`,   lastModified: new Date('2026-05-14'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/articles`,                    lastModified: new Date('2026-05-14'), changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/support`,                     lastModified: new Date('2026-05-14'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/about`,                       lastModified: new Date('2026-05-14'), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${base}/contact`,                     lastModified: new Date('2026-05-14'), changeFrequency: 'yearly',  priority: 0.6 },
  ]
}
