import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RCA Insurance Library - Synthetic commercial P&C submission packs',
  description: 'Pre-labelled synthetic broker submissions for QA, evaluation and training of document extraction pipelines. Eight document types, eight engineered red flag categories.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/libraries/insurance',
  },
  openGraph: {
    type: 'website',
    title: 'RCA Insurance Library - Synthetic commercial P&C submission packs',
    description: 'Pre-labelled synthetic broker submissions for QA, evaluation and training of document extraction pipelines.',
    url: 'https://www.rootcauseanalytics.com.au/libraries/insurance',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RCA Insurance Library' }],
  },
}

export default function InsuranceLibraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
