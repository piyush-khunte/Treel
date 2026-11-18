import type { MetadataRoute } from "next";
import { getPublishedBlogsFromDb } from "@/lib/blogs/blog-storage";
import { filterPersonalBlogs } from "@/lib/blogs/personal-blog-scope";
import { getPublishedJobs } from "@/lib/content/careers-storage";
import { getPublishedEvents } from "@/lib/content/events-storage";
import { getPublishedInsights } from "@/lib/content/insights-storage";
import { getPublishedPressItems } from "@/lib/content/press-storage";
import { getPublishedSurakshaArticles } from "@/lib/content/suraksha-storage";
import { getPublishedWhitepapers } from "@/lib/content/whitepapers-storage";
import { canonicalAuthorSlugs } from "@/lib/seo/authors";
import { SITE_URL } from "@/lib/seo/metadata";

type SitemapEntry = MetadataRoute.Sitemap[number];

/** Alias research slugs that canonicalise to another paper (never list them). */
const RESEARCH_ALIAS_SLUGS = new Set(["case-study-1000-truck", "vehicle-digital-twin"]);

/** Research papers with their own static route folders (already listed below). */
const RESEARCH_STATIC_SLUGS = new Set(["data-architecture", "roi-fleet-intelligence"]);

function toIsoDate(value: string | undefined | null, fallback: string): string {
  if (!value) return fallback;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? fallback : parsed.toISOString();
}

async function safeLoad<T>(loader: () => Promise<T[]>): Promise<T[]> {
  try {
    return await loader();
  } catch (error) {
    console.error("sitemap loader failed:", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const releaseDate = "2026-10-30T00:00:00.000Z";
  const now = releaseDate;

  // Route definitions with priority mappings
  const routes: {
    url: string;
    lastModified: string;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority: number;
  }[] = [
    // 1.0 - Master Homepage
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },

    // 0.9 - Product & Category Defined Homepages
    { url: `${baseUrl}/tmip`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/suraksha`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/personal`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/vehicle-digital-twin`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/mobility-intelligence`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/founder-note`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },

    // 0.8 - Master Core & Corporate Deep Dives
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/leadership`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/our-story`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/why-treel`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/global-presence`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/products`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/products/otr-tpms`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/technology`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/data-infrastructure`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/careers`, lastModified: "2026-10-14T07:26:08.570Z", changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/press`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/media-kit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/insights`, lastModified: "2026-09-01T00:00:00.000Z", changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/research`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/events`, lastModified: "2026-10-14T00:00:00.000Z", changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/annual-reports`, lastModified: "2025-10-15T23:24:26.597Z", changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/notices`, lastModified: "2026-10-12T10:18:51.894Z", changeFrequency: "monthly", priority: 0.8 },

    // 0.8 - OEM Industry Hub & Segments
    { url: `${baseUrl}/oem`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/oem/introduction`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/oem/commercial-vehicle`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/oem/bus`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/oem/four-wheeler`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/oem/two-wheeler`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/oem/mining`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/oem/agriculture`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // 0.8 - TMIP Enterprise Fleet Intelligence
    { url: `${baseUrl}/tmip/platform`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/platform/vehicle-digital-twin`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/tpms`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/platform/telemetry`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/platform/predictive-maintenance`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/features/maintenance`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions/logistics`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions/passenger-transport`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions/construction`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/solutions/oem-fleet`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/roi-calculator`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/demo`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/whitepapers`, lastModified: "2026-10-15T09:40:00.000Z", changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/whitepapers/roi-fleet-intelligence`, lastModified: "2026-10-15T09:40:00.000Z", changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tmip/security`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/tmip/compliance`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // 0.8 - Suraksha Fleet Commercial Safety
    { url: `${baseUrl}/suraksha/buy`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/suraksha/product`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/how-it-works`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/emi`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/emi/apply`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/why-suraksha`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/safety`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/savings`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/simplicity`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/suraksha/centres`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
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
    { url: `${baseUrl}/personal/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/faqs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/personal/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/app`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/app/android`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/personal/app/ios`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // 0.8 - Research & Deep Telematics Architecture
    { url: `${baseUrl}/research/data-architecture`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/research/roi-fleet-intelligence`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },

    // Campaign landing pages (/lp-*), /personal/track-order and /personal/reviews/write
    // are noindex or canonicalised elsewhere, so they are intentionally not listed.

    // 0.5 - Support & Inquiries
    { url: `${baseUrl}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
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

  // Dynamic content, loaded from the same storage helpers the pages use
  // (Supabase with graceful fallback to the local JSON stores).
  const [insights, surakshaArticles, publishedBlogs, jobs, events, pressItems, whitepapers] = await Promise.all([
    safeLoad(getPublishedInsights),
    safeLoad(getPublishedSurakshaArticles),
    safeLoad(getPublishedBlogsFromDb),
    safeLoad(getPublishedJobs),
    safeLoad(getPublishedEvents),
    safeLoad(getPublishedPressItems),
    safeLoad(() => getPublishedWhitepapers("research")),
  ]);
  const personalBlogs = await safeLoad(() => filterPersonalBlogs(publishedBlogs));

  const dynamicRoutes: SitemapEntry[] = [];
  const add = (
    pathname: string,
    lastModified: string,
    changeFrequency: SitemapEntry["changeFrequency"],
    priority: number
  ) => {
    dynamicRoutes.push({ url: `${baseUrl}${pathname}`, lastModified, changeFrequency, priority });
  };

  // Insights articles + category hubs
  const insightCategories = new Map<string, string>();
  for (const article of insights) {
    if (!article.slug) continue;
    const published = toIsoDate(article.publishIsoDate, releaseDate);
    add(`/insights/${article.slug}`, published, "monthly", 0.7);
    if (article.categorySlug) {
      const previous = insightCategories.get(article.categorySlug);
      if (!previous || published > previous) insightCategories.set(article.categorySlug, published);
    }
  }
  for (const [categorySlug, lastModified] of insightCategories) {
    add(`/insights/category/${categorySlug}`, lastModified, "weekly", 0.6);
  }

  // Suraksha drivers' blog
  for (const article of surakshaArticles) {
    const slug = article.slug || article._id;
    if (!slug) continue;
    add(`/suraksha/blog/${slug}`, toIsoDate(article.updatedAt || article.createdAt, releaseDate), "monthly", 0.6);
  }

  // Personal TPMS blog
  for (const blog of personalBlogs) {
    if (!blog.slug) continue;
    add(`/personal/blog/${blog.slug}`, toIsoDate(blog.date, releaseDate), "monthly", 0.6);
  }

  // Author profiles (canonical slugs only, so alias keys are not duplicated)
  for (const slug of canonicalAuthorSlugs()) {
    add(`/authors/${slug}`, releaseDate, "monthly", 0.4);
  }

  // Careers roles
  for (const job of jobs) {
    if (!job.slug) continue;
    add(`/careers/${job.slug}`, toIsoDate(job.updatedAt || job.postedDate, releaseDate), "weekly", 0.6);
  }

  // Events
  for (const event of events) {
    if (!event.slug) continue;
    add(`/events/${event.slug}`, toIsoDate(event.updatedAt || event.startDate, releaseDate), "weekly", 0.6);
  }

  // Press releases
  for (const item of pressItems) {
    if (!item.slug) continue;
    add(`/press/${item.year || "2026"}/${item.slug}`, toIsoDate(item.updatedAt || item.createdAt, releaseDate), "monthly", 0.5);
  }

  // Research papers
  for (const paper of whitepapers) {
    if (!paper.slug || RESEARCH_ALIAS_SLUGS.has(paper.slug) || RESEARCH_STATIC_SLUGS.has(paper.slug)) continue;
    add(`/research/${paper.slug}`, toIsoDate(paper.updatedAt || paper.createdAt, releaseDate), "monthly", 0.6);
  }

  // De-duplicate (static entries win) so no URL is listed twice.
  const seen = new Set(routes.map((route) => route.url));
  const uniqueDynamic = dynamicRoutes.filter((route) => {
    if (seen.has(route.url)) return false;
    seen.add(route.url);
    return true;
  });

  return [...routes, ...uniqueDynamic];
}
