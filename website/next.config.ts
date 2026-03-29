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
      // Redirect old /solution URL to /MEDISCAN
      {
        source: '/solution',
        destination: '/MEDISCAN',
        permanent: true,
      },
      // Redirect lowercase /mediscan to /MEDISCAN
      {
        source: '/mediscan',
        destination: '/MEDISCAN',
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
