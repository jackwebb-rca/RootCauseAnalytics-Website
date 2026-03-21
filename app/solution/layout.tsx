import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'MEDISCAN - AI assisted OCR & NLP document processing on Snowflake',
  description: 'Extract structured data from discharge summaries, pathology reports & referral letters averaging 97 - 99% accuracy, available on the Snowflake Marketplace.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/solution',
  },
  openGraph: {
    type: 'website',
    title: 'MEDISCAN - AI assisted OCR & NLP document processing on Snowflake',
    description: 'Extract structured data from discharge summaries, pathology reports & referral letters averaging 97 - 99% accuracy, available on the Snowflake Marketplace.',
    url: 'https://www.rootcauseanalytics.com.au/solution',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'MEDISCAN by Root Cause Analytics' }],
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'MEDISCAN',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Snowflake',
  description: 'AI-powered OCR and NLP for healthcare document processing. Snowflake Native App with HIPAA compliance and SOC 2 Type II certification.',
  url: 'https://www.rootcauseanalytics.com.au/solution',
  offers: {
    '@type': 'Offer',
    price: '0.10',
    priceCurrency: 'USD',
    description: 'Per page processed',
  },
  featureList: [
    'HIPAA Compliant',
    'SOC 2 Type II Certified',
    'Snowflake Native App',
    '97-99% OCR Accuracy',
    'Clinical NLP',
    'Zero Data Movement',
    '10 Minute Deployment',
  ],
  publisher: {
    '@type': 'Organization',
    name: 'Root Cause Analytics',
    url: 'https://www.rootcauseanalytics.com.au',
  },
}

export default function SolutionLayout({ children }: { children: React.ReactNode }) {
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
