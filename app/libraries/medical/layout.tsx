import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RCA Medical Library - Synthetic Australian medical training documents',
  description: '40+ document types across hospital, ED, GP clinic, pathology, imaging and specialist correspondence. Ground truth, bounding boxes and scanned variants shipped with every document.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/libraries/medical',
  },
  openGraph: {
    type: 'website',
    title: 'RCA Medical Library - Synthetic Australian medical training documents',
    description: '40+ document types with ground truth and bounding boxes. Built for document AI evaluation and training.',
    url: 'https://www.rootcauseanalytics.com.au/libraries/medical',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RCA Medical Library' }],
  },
}

export default function MedicalLibraryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
