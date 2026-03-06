import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Root Cause Analytics — Healthcare AI, Sydney',
  description: 'Sydney-based healthcare AI specialists. We build HIPAA-compliant document intelligence tools for Australian healthcare organisations. Learn about our team and MEDISCAN.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/about',
  },
  openGraph: {
    type: 'website',
    title: 'About Root Cause Analytics — Healthcare AI, Sydney',
    description: 'Sydney-based healthcare AI specialists building HIPAA-compliant document intelligence for Australian healthcare.',
    url: 'https://www.rootcauseanalytics.com.au/about',
    images: [{ url: '/logo-512.png', width: 512, height: 512, alt: 'Root Cause Analytics' }],
  },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
