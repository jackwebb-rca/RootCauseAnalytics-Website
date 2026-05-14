import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Libraries - Pre-labelled synthetic document libraries | Root Cause Analytics',
  description: 'Pre-labelled synthetic document libraries for document AI teams. Real-looking PDFs at scale, with ground truth, bounding boxes and scanned variants shipped alongside every document.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/libraries',
  },
  openGraph: {
    type: 'website',
    title: 'Pre-labelled synthetic document libraries',
    description: 'Real-looking PDFs at scale with ground truth, bounding boxes and scanned variants.',
    url: 'https://www.rootcauseanalytics.com.au/libraries',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Root Cause Analytics libraries' }],
  },
}

export default function LibrariesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
