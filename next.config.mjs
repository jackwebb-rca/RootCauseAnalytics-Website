/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Installer downloads. Files live on the public releases repo;
      // the domain only redirects (a redirect costs no Vercel bandwidth).
      // /downloads/latest/<file> follows GitHub's "latest release" path;
      // /downloads/release/<tag>/<file> pins one release by tag.
      {
        source: "/downloads/latest/:file",
        destination:
          "https://github.com/jackwebb-rca/rca-document-library-releases/releases/latest/download/:file",
        permanent: false,
      },
      {
        source: "/downloads/release/:tag/:file",
        destination:
          "https://github.com/jackwebb-rca/rca-document-library-releases/releases/download/:tag/:file",
        permanent: false,
      },
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
