/**
 * Resolves the canonical base URL used in emails and absolute links.
 *
 * Security: this NEVER uses request headers (Origin / Host / X-Forwarded-Host).
 * Those are client-controlled, and links built from them end up in emails sent from
 * Treel's domain (unsubscribe links carry subscriber tokens, download links carry
 * access tokens). The base URL comes only from configuration:
 *
 *   1. NEXT_PUBLIC_SITE_URL / SITE_URL / NEXT_PUBLIC_APP_URL (set this in every environment)
 *   2. Vercel system variables (production domain, then the deployment URL)
 *   3. http://localhost:<PORT> in development
 *   4. https://treel.in
 *
 * The optional `req` parameter is accepted for backwards compatibility and ignored.
 */
function normalize(url: string): string {
  const trimmed = url.trim().replace(/^['"]|['"]$/g, "").replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
  const proto = trimmed.includes("localhost") ? "http" : "https";
  return `${proto}://${trimmed}`;
}

export function getCanonicalSiteUrl(_req?: unknown): string {
  void _req;

  const configured =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (configured) return normalize(configured);

  if (process.env.VERCEL_ENV === "production" && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return normalize(process.env.VERCEL_PROJECT_PRODUCTION_URL);
  }
  if (process.env.VERCEL_URL) return normalize(process.env.VERCEL_URL);

  if (process.env.NODE_ENV === "development") {
    return `http://localhost:${process.env.PORT || "3000"}`;
  }

  return "https://treel.in";
}
