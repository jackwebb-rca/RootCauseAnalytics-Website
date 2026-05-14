import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RCA Extract - Self-hosted document extraction for healthcare PDFs',
  description: 'RCA Extract turns discharge summaries, ED assessments, referrals, imaging reports and pathology reports into structured fields. Ships as a self-hosted Docker container that runs in your cloud or on-prem. Zero data egress. Built by Root Cause Analytics in Sydney.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/products/rca-extract',
  },
  openGraph: {
    type: 'website',
    title: 'RCA Extract - Self-hosted document extraction for healthcare PDFs',
    description: 'Self-hosted Docker container. POST a PDF, get back structured fields plus bounding boxes. Zero data egress.',
    url: 'https://www.rootcauseanalytics.com.au/products/rca-extract',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'RCA Extract by Root Cause Analytics' }],
  },
}

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'RCA Extract',
  applicationCategory: 'HealthApplication',
  operatingSystem: 'Docker',
  description: 'Self-hosted document extraction for healthcare PDFs. Ships as a Docker container that runs in the customer\'s cloud or on-prem environment. Zero data egress.',
  url: 'https://www.rootcauseanalytics.com.au/products/rca-extract',
  featureList: [
    'Self-hosted Docker container',
    'Zero data egress',
    'REST API for PDF upload',
    'Bounding boxes per labelled field',
    'FHIR-aligned output where applicable',
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
