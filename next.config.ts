import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/timp/campaign",
        destination: "/tmip/campaign",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
