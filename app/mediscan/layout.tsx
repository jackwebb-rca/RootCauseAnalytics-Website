import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RCA Extract - Healthcare document extraction on Snowflake',
  description: 'MEDISCAN has been renamed RCA Extract. You will be redirected.',
  robots: { index: false, follow: true },
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/products/rca-extract',
  },
}

export default function MediscanRedirectLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
