import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Consolidate www vs non-www (301 permanent)
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'rootcauseanalytics.com.au' }],
        destination: 'https://www.rootcauseanalytics.com.au/:path*',
        permanent: true,
      },
      // /mediscan moved to /products/rca-extract under the new brand architecture
      {
        source: '/mediscan',
        destination: '/products/rca-extract',
        permanent: true,
      },
      // Legacy /solution URL preserved through to the new RCA Extract page
      {
        source: '/solution',
        destination: '/products/rca-extract',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      // Sanity Studio handles its own client-side routing
      {
        source: '/studio/:path*',
        destination: '/studio',
      },
    ]
  },
}

export default nextConfig
