import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MEDISCAN - Medical Record Digitisation on Snowflake',
  description: 'Extract structured data from discharge summaries, pathology reports and referral letters at 97-99% accuracy. Available on the Snowflake Marketplace.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/mediscan',
  },
  openGraph: {
    type: 'website',
    title: 'MEDISCAN - Medical Record Digitisation on Snowflake',
    description: 'Extract structured data from discharge summaries, pathology reports and referral letters at 97-99% accuracy. Available on the Snowflake Marketplace.',
    url: 'https://www.rootcauseanalytics.com.au/mediscan',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MEDISCAN by Root Cause Analytics' }],
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MEDISCAN',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Snowflake',
  description: 'Healthcare document processing as a Snowflake Native App. Extract structured data from medical records with 97-99% accuracy and zero data egress.',
  url: 'https://www.rootcauseanalytics.com.au/mediscan',
  offers: {
    '@type': 'Offer',
    price: '0.10',
    priceCurrency: 'USD',
    description: 'Per page processed',
  },
  featureList: [
    'Snowflake Native App',
    '97-99% Extraction Accuracy',
    'Zero Data Egress',
    'Human-in-the-Loop Review',
    'Configurable Accuracy Thresholds',
    'Audit Trail with PHI Redaction',
    '10 Minute Deployment',
  ],
  publisher: {
    '@type': 'Organization',
    name: 'Root Cause Analytics',
    url: 'https://www.rootcauseanalytics.com.au',
  },
}

export default function MediscanLayout({ children }: { children: React.ReactNode }) {
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
