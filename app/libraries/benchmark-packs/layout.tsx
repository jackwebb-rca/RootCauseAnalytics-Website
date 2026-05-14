import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RCA Benchmark Packs - Paid packs for QA, vendor evaluation and pilots',
  description: 'Smaller paid packs from the RCA Insurance and Medical libraries. Insurance QA Sprint Pack: AUD $2,500, 10 packs, 48 to 72 hour delivery.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/libraries/benchmark-packs',
  },
  openGraph: {
    type: 'website',
    title: 'RCA Benchmark Packs',
    description: 'Smaller paid packs for QA, vendor evaluation and pilots.',
    url: 'https://www.rootcauseanalytics.com.au/libraries/benchmark-packs',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RCA Benchmark Packs' }],
  },
}

export default function BenchmarkPacksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
