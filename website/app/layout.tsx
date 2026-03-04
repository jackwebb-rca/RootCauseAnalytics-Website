import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MEDISCAN - AI-Powered Healthcare Document Processing',
  description: 'MEDISCAN transforms healthcare document processing with AI-powered OCR and NLP on Snowflake. 97-99% accuracy, $0.10 per page, 10 Minute Deployment Time. HIPAA Compliant & SOC 2 Type II certified.',
  generator: 'v0.app',
  keywords: ['healthcare OCR', 'medical document processing', 'Snowflake marketplace', 'HIPAA compliant', 'NLP healthcare', 'medical records digitisation'],
  authors: [{ name: 'Root Cause Analytics' }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-AU">
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
