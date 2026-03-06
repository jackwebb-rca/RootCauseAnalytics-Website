import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.rootcauseanalytics.com.au'),
  title: 'MEDISCAN — AI Healthcare Document Processing',
  description: 'AI-powered OCR & NLP for healthcare documents. Snowflake Native App — 10 min deployment, $0.10/page, HIPAA & SOC 2 compliant. Trusted by Australian healthcare organisations.',
  keywords: ['healthcare OCR', 'medical document processing', 'Snowflake native app', 'HIPAA compliant', 'NLP healthcare', 'medical records digitisation', 'AI healthcare Australia'],
  authors: [{ name: 'Root Cause Analytics' }],
  alternates: {
    canonical: 'https://www.rootcauseanalytics.com.au',
  },
  openGraph: {
    type: 'website',
    url: 'https://www.rootcauseanalytics.com.au',
    siteName: 'Root Cause Analytics',
    title: 'MEDISCAN — AI Healthcare Document Processing',
    description: 'AI-powered OCR & NLP for healthcare documents. Snowflake Native App — 10 min deployment, $0.10/page, HIPAA & SOC 2 compliant.',
    images: [{ url: '/logo-512.png', width: 512, height: 512, alt: 'MEDISCAN by Root Cause Analytics' }],
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Root Cause Analytics',
  url: 'https://www.rootcauseanalytics.com.au',
  logo: 'https://www.rootcauseanalytics.com.au/logo-512.png',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'jack.webb@rootcauseanalytics.com.au',
    contactType: 'customer support',
    areaServed: 'AU',
    availableLanguage: 'English',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sydney',
    addressRegion: 'NSW',
    addressCountry: 'AU',
  },
  sameAs: [
    'https://app.snowflake.com/marketplace/listing/GZSUZU1HJP/',
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-AU">
      <head>
        <meta
          name="msvalidate.01"
          content="9D7CE4E3C1DB23FD9654E42A7EC348E9"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#1E3A8A] text-white px-4 py-2 rounded z-50"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
