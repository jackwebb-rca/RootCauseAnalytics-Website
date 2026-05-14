import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RCA Extract - Healthcare document extraction on Snowflake',
  description: 'RCA Extract turns discharge summaries, ED assessments, referrals, imaging reports and pathology reports into structured Snowflake tables. Snowflake Native App. Built by Root Cause Analytics in Sydney.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/products/rca-extract',
  },
  openGraph: {
    type: 'website',
    title: 'RCA Extract - Healthcare document extraction on Snowflake',
    description: 'RCA Extract turns discharge summaries, ED assessments, referrals, imaging reports and pathology reports into structured Snowflake tables. Snowflake Native App.',
    url: 'https://www.rootcauseanalytics.com.au/products/rca-extract',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RCA Extract by Root Cause Analytics' }],
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'RCA Extract',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Snowflake',
  description: 'Document extraction for healthcare PDFs. Runs as a Snowflake Native App inside the customer\'s Snowflake account.',
  url: 'https://www.rootcauseanalytics.com.au/products/rca-extract',
  featureList: [
    'Snowflake Native App',
    'Zero Data Egress',
    'Human-in-the-Loop Review',
    'Audit Trail',
    'Marketplace install',
  ],
  publisher: {
    '@type': 'Organization',
    name: 'Root Cause Analytics',
    url: 'https://www.rootcauseanalytics.com.au',
  },
}

export default function RCAExtractLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      {children}
    </>
  )
}
