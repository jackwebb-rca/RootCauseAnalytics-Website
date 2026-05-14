import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Security Notice - Root Cause Analytics',
  description: 'How we secure the Root Cause Analytics products: RCA Extract on Snowflake, the synthetic training document libraries, and the website. Vulnerability disclosure contact.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/security',
  },
  openGraph: {
    type: 'article',
    title: 'Security Notice - Root Cause Analytics',
    description: 'How we secure our products and the website.',
    url: 'https://www.rootcauseanalytics.com.au/security',
  },
}

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
