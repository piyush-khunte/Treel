import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/personal/buy/checkout",
          "/personal/buy/success",
          "/personal/buy/failed",
          "/personal/track-order",
          "/suraksha/emi/apply",
          "/suraksha/emi/apply/success",
          "/suraksha/callback/success",
          "/tmip/demo/scheduled",
          "/unsubscribe",
          "/thank-you",
          "/coming-soon/",
          "/maintenance",
          "/admin/",
          "/api/",
        ],
      },
      {
        userAgent: ["GPTBot", "Google-Extended", "ClaudeBot", "PerplexityBot", "CCBot"],
        allow: "/",
        disallow: ["/admin/", "/api/"],
      },
      {
        userAgent: ["AhrefsBot", "SemrushBot"],
        crawlDelay: 10,
      },
    ],
    sitemap: [
      "https://treel.in/sitemap.xml",
    ],
  };
}
