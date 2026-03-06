import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Root Cause Analytics - About Us',
  description: 'Sydney-based healthcare AI specialists building HIPAA-compliant document processing solutions for the Australian healthcare sector.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/about',
  },
  openGraph: {
    type: 'website',
    title: 'Root Cause Analytics - About Us',
    description: 'Sydney-based healthcare AI specialists building HIPAA-compliant document processing solutions for the Australian healthcare sector.',
    url: 'https://www.rootcauseanalytics.com.au/about',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Root Cause Analytics' }],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
