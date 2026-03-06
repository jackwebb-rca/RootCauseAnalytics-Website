import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Root Cause Analytics - Support & FAQ',
  description: 'Guides, documentation and FAQ for deploying MEDISCAN on Snowflake.',
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au/support',
  },
  openGraph: {
    type: 'website',
    title: 'Root Cause Analytics - Support & FAQ',
    description: 'Guides, documentation and FAQ for deploying MEDISCAN on Snowflake.',
    url: 'https://www.rootcauseanalytics.com.au/support',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'MEDISCAN by Root Cause Analytics' }],
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I deploy MEDISCAN?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MEDISCAN is available on the Snowflake Marketplace. Simply search for "MEDISCAN" in the marketplace, click Install, and follow the guided setup. The entire process takes approximately 10 minutes — no infrastructure provisioning or data migration required.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is MEDISCAN HIPAA compliant?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. MEDISCAN is designed to support HIPAA-compliant deployments. A Business Associate Agreement (BAA) is available upon request. All document processing occurs within your Snowflake environment using a zero data movement architecture — patient data never leaves your account.',
      },
    },
    {
      '@type': 'Question',
      name: 'What document types does MEDISCAN support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MEDISCAN supports PDF, TIFF, PNG, JPEG, and BMP formats. Multi-page PDFs are fully supported. Documents can be staged in Snowflake internal stages or referenced from external cloud storage (S3, Azure Blob, GCS).',
      },
    },
    {
      '@type': 'Question',
      name: 'How is MEDISCAN priced?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MEDISCAN is priced at $0.10 per page processed, with volume discounts for organisations processing 10,000+ pages per month. There are no setup fees, minimum monthly commitments, or charges for pages that fail processing.',
      },
    },
    {
      '@type': 'Question',
      name: 'What OCR accuracy can I expect?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MEDISCAN achieves 99% accuracy on clean, high-quality printed documents. Overall accuracy ranges from 97–99% depending on document quality and type. Handwritten notes and low-resolution scans may achieve lower extraction rates.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does MEDISCAN store or access our documents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. MEDISCAN operates as a Snowflake Native App within your account. Documents and extracted data remain entirely within your Snowflake environment. Root Cause Analytics does not have access to your documents or processed data.',
      },
    },
  ],
}

export default function SupportLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  )
}
