import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  compress: true,
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
    ],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
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

      // Temporarily hide /suraksha/testimonials and /tmip/customers until real stories are added
      {
        source: "/suraksha/testimonials",
        destination: "/suraksha",
        permanent: false,
      },
      {
        source: "/suraksha/testimonials/:path*",
        destination: "/suraksha",
        permanent: false,
      },
      {
        source: "/tmip/customers",
        destination: "/tmip",
        permanent: false,
      },
      {
        source: "/tmip/customers/:path*",
        destination: "/tmip",
        permanent: false,
      },

      // Redirects for legacy/typo routes: timp -> tmip
      {
        source: "/tim/tpms",
        destination: "/tmip/tpms",
        permanent: true,
      },
      {
        source: "/timp/tpms",
        destination: "/tmip/tpms",
        permanent: true,
      },
      {
        source: "/timp",
        destination: "/tmip",
        permanent: true,
      },
      {
        source: "/timp/:path*",
        destination: "/tmip/:path*",
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
      {
        source: "/support-thankyou",
        destination: "/thank-you",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
