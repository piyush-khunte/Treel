import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/timp/campaign",
        destination: "/lp/tmip",
        permanent: true,
      },
      {
        source: "/tmip/campaign",
        destination: "/lp/tmip",
        permanent: true,
      },
      {
        source: "/suraksha/campaign",
        destination: "/lp/suraksha",
        permanent: true,
      },
      {
        source: "/personal/campaign",
        destination: "/lp/tpms/bike",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
