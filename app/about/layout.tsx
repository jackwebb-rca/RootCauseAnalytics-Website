import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Root Cause Analytics - About Us',
  description: 'Sydney-based healthcare data company building document processing solutions for Australian health services.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/about',
  },
  openGraph: {
    type: 'website',
    title: 'Root Cause Analytics - About Us',
    description: 'Sydney-based healthcare data company building document processing solutions for Australian health services.',
    url: 'https://www.rootcauseanalytics.com.au/about',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MEDISCAN by Root Cause Analytics' }],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
