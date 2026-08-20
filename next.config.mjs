/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/products/rca-extract",
        destination: "/document-library",
        permanent: true,
      },
      {
        source: "/products/:path*",
        destination: "/document-library",
        permanent: true,
      },
      {
        source: "/support",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/libraries",
        destination: "/document-generator",
        permanent: true,
      },
      {
        source: "/libraries/:path*",
        destination: "/document-generator",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
