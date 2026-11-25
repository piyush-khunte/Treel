/**
 * Single source of truth for what each cookie-consent category actually switches on.
 *
 * Keep this in sync with:
 *  - src/app/layout.tsx                              (Google Ads, marketing)
 *  - src/components/privacy/consent-script-loader.tsx (Google Analytics + Microsoft Clarity, analytics)
 *  - src/app/cookies/page.tsx                         (public Cookie Policy)
 *
 * The consent API uses this to record, for every decision, the services that were
 * really active for the categories the visitor granted, so the admin audit trail shows
 * what was tracked rather than just which checkboxes were ticked.
 */

export type ConsentCategoryKey = "necessary" | "functional" | "analytics" | "marketing";

export interface TrackingService {
  id: string;
  name: string;
  provider: string;
  category: ConsentCategoryKey;
  cookies: string[];
  purpose: string;
  /** Whether the service is actually loaded in this deployment (env/config dependent). */
  isActive: () => boolean;
}

const isProduction = () => process.env.NODE_ENV === "production";

export const TRACKING_SERVICES: TrackingService[] = [
  {
    id: "treel-consent",
    name: "Consent preference",
    provider: "Treel (first party)",
    category: "necessary",
    cookies: ["treel_cookie_consent"],
    purpose: "Remembers the visitor's cookie choice (anonymous ID, categories, policy version).",
    isActive: () => true,
  },
  {
    id: "treel-cart",
    name: "Cart & coupon storage",
    provider: "Treel (first party)",
    category: "necessary",
    cookies: ["treel_guest_cart", "treel_suraksha_cart", "treel_personal_coupon", "treel_suraksha_coupon"],
    purpose: "Keeps the shopping cart and applied coupon (browser storage).",
    isActive: () => true,
  },
  {
    id: "google-analytics",
    name: "Google Analytics 4",
    provider: "Google",
    category: "analytics",
    cookies: ["_ga", "_gid"],
    purpose: "Page views, session duration and referrers (IP anonymised).",
    isActive: () => Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID),
  },
  {
    id: "microsoft-clarity",
    name: "Microsoft Clarity",
    provider: "Microsoft",
    category: "analytics",
    cookies: ["_clck", "_clsk"],
    purpose: "Heatmaps and anonymised session recordings.",
    isActive: () => Boolean(process.env.NEXT_PUBLIC_CLARITY_ID),
  },
  {
    id: "google-ads",
    name: "Google Ads conversion tracking",
    provider: "Google",
    category: "marketing",
    cookies: ["_gcl_au", "_gcl_aw"],
    purpose: "Attributes lead-form conversions (/thank-you) to Google Ads clicks.",
    // Loaded by the root layout in production builds only.
    isActive: isProduction,
  },
];

/** Names of the services that are actually active for the granted categories. */
export function getActiveServicesForCategories(categories: Partial<Record<ConsentCategoryKey, boolean>>): string[] {
  return TRACKING_SERVICES.filter(
    (s) => s.category !== "necessary" && categories[s.category] && s.isActive()
  ).map((s) => s.name);
}

/** Per-category summary of configured services and whether each is live in this deployment. */
export function getTrackingRegistrySummary(): Record<ConsentCategoryKey, { name: string; active: boolean; cookies: string[] }[]> {
  const summary: Record<ConsentCategoryKey, { name: string; active: boolean; cookies: string[] }[]> = {
    necessary: [],
    functional: [],
    analytics: [],
    marketing: [],
  };
  for (const s of TRACKING_SERVICES) {
    summary[s.category].push({ name: s.name, active: s.isActive(), cookies: s.cookies });
  }
  return summary;
}
