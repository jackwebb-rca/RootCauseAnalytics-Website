import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy - Root Cause Analytics',
  description: 'How Root Cause Analytics handles personal information collected through this website, our email channels, and our products. Bound by the Australian Privacy Principles under the Privacy Act 1988 (Cth).',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/privacy',
  },
  openGraph: {
    type: 'article',
    title: 'Privacy Policy - Root Cause Analytics',
    description: 'How Root Cause Analytics handles personal information.',
    url: 'https://www.rootcauseanalytics.com.au/privacy',
  },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
