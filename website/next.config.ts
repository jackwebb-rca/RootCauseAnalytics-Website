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
    ]
  },
}

export default nextConfig
