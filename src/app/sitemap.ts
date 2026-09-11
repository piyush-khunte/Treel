import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://treel.in";
  const now = new Date().toISOString();

  // Route definitions with priority mappings
  const routes: { url: string; lastModified: string; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"; priority: number }[] = [
    // 1.0 - Master Homepage
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    // 0.9 - Product & Category Defined Homepages
    { url: `${baseUrl}/tmip`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/suraksha`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/personal`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/vehicle-digital-twin`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/mobility-intelligence`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/founder-note`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // 0.8 - Master Core & Deep Dives
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/leadership`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-story`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/why-treel`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/technology`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/data-infrastructure`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/partners`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/jk-tyre`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/press`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/media-kit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/events`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/annual-reports`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // 0.8 - TMIP Deep-Dive Pages
    { url: `${baseUrl}/tmip/platform`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/platform/vehicle-digital-twin`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/platform/telemetry`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/platform/predictive-maintenance`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/platform/integrations`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions/logistics`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions/passenger-transport`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions/construction`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions/mining`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions/oem-fleet`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/customers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/customers/case-studies`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/roi-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/demo`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/whitepapers`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/security`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tmip/compliance`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tmip/api`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // 0.8 - Suraksha Deep-Dive Pages
    { url: `${baseUrl}/suraksha/product`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/how-it-works`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/emi`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/why-suraksha`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/safety`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/savings`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/simplicity`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/centres`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/testimonials`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/faqs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/videos`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // 0.8 - Personal TPMS E-Commerce & Features
    { url: `${baseUrl}/personal/product`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/features`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/features/monitoring`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/features/alerts`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/features/app`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/features/battery`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/specs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/personal/buy`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/buy/cart`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/personal/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/faqs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/personal/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/app`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // 0.5 - Support & Contact
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/tmip/support`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/suraksha/support`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/suraksha/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/suraksha/whatsapp`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/suraksha/callback`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/personal/support`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/personal/support/setup`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/personal/support/troubleshooting`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/personal/support/warranty`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/personal/support/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // 0.3 - Policies & Legal
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/cookies`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/accessibility`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/gdpr`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/personal/returns`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/personal/shipping`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/personal/refunds`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  return routes;
}
