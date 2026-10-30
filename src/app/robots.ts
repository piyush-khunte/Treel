import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // Cart & checkout flows
          "/personal/buy/cart",
          "/personal/buy/checkout",
          "/personal/buy/success",
          "/personal/buy/failed",
          "/suraksha/cart",
          "/suraksha/buy/cart",
          "/suraksha/checkout",
          "/suraksha/order-confirmation",
          "/suraksha/buy/checkout",
          "/suraksha/buy/success",
          "/suraksha/buy/failed",
          // Action & transaction completion endpoints
          "/suraksha/emi/apply/success",
          "/suraksha/callback/success",
          "/tmip/demo/scheduled",
          "/thank-you",
          "/unsubscribe",
          // System & administrative routes
          "/coming-soon/",
          "/maintenance",
          "/admin/",
          "/api/",
        ],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "ClaudeBot",
          "Claude-Web",
          "PerplexityBot",
          "CCBot",
          "Amazonbot",
          "Applebot-Extended",
          "Meta-ExternalAgent",
          "Bytespider",
          "cohere-ai",
        ],
        allow: "/",
        disallow: [
          "/admin/",
          "/api/",
          "/personal/buy/cart",
          "/personal/buy/checkout",
          "/suraksha/cart",
          "/suraksha/buy/cart",
          "/suraksha/checkout",
        ],
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
