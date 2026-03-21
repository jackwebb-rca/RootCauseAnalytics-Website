import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medical Records Intelligence - Articles | Root Cause Analytics',
  description: 'Insights on healthcare document processing, medical record digitisation, and AI in health data management.',
  alternates: { canonical: 'https://www.rootcauseanalytics.com.au/articles' },
  openGraph: {
    type: 'website',
    title: 'Medical Records Intelligence - Articles | Root Cause Analytics',
    description: 'Insights on healthcare document processing, medical record digitisation, and AI in health data management.',
    url: 'https://www.rootcauseanalytics.com.au/articles',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Root Cause Analytics' }],
  },
}

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
