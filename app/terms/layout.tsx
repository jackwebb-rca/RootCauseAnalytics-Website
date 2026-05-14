import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service - Root Cause Analytics',
  description: 'Terms governing the use of the Root Cause Analytics website, the RCA training document libraries, and RCA Extract on the Snowflake Marketplace.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/terms',
  },
  openGraph: {
    type: 'article',
    title: 'Terms of Service - Root Cause Analytics',
    description: 'Terms governing use of the website, libraries and RCA Extract.',
    url: 'https://www.rootcauseanalytics.com.au/terms',
  },
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
