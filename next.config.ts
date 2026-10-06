import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // Old landing page 301 permanent redirects to new canonical URLs
      {
        source: "/lp/tmip",
        destination: "/lp-tmip",
        permanent: true,
      },
      {
        source: "/lp/suraksha",
        destination: "/lp-suraksha",
        permanent: true,
      },
      {
        source: "/lp/tpms/car",
        destination: "/lp-tpms/car",
        permanent: true,
      },
      {
        source: "/lp/tpms/bike",
        destination: "/lp-tpms/bike",
        permanent: true,
      },
      {
        source: "/lp/tpms",
        destination: "/lp-tpms",
        permanent: true,
      },
      {
        source: "/lp/tpms/:slug*",
        destination: "/lp-tpms/:slug*",
        permanent: true,
      },

      // Marketing campaign shortcuts redirected to canonical landing pages
      {
        source: "/timp/campaign",
        destination: "/lp-tmip",
        permanent: true,
      },
      {
        source: "/tmip/campaign",
        destination: "/lp-tmip",
        permanent: true,
      },
      {
        source: "/suraksha/campaign",
        destination: "/lp-suraksha",
        permanent: true,
      },
      {
        source: "/personal/campaign",
        destination: "/lp-tpms/bike",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
