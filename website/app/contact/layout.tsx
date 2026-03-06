import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Root Cause Analytics - Contact',
  description: 'Talk to our Sydney-based team about deploying MEDISCAN in your Snowflake environment.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/contact',
  },
  openGraph: {
    type: 'website',
    title: 'Root Cause Analytics - Contact',
    description: 'Talk to our Sydney-based team about deploying MEDISCAN in your Snowflake environment.',
    url: 'https://www.rootcauseanalytics.com.au/contact',
    images: [{ url: '/logo-512.png', width: 512, height: 512, alt: 'Root Cause Analytics' }],
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
