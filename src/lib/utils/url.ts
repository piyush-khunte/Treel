/**
 * Resolves the canonical base URL for the active environment.
 * Handles local dev (http://localhost:3000), staging/preview Vercel URLs,
 * and canonical production domain (https://treel.in).
 */
export function getCanonicalSiteUrl(
  req?: Request | { headers?: Headers | Record<string, string | string[] | undefined> }
): string {
  // 1. Inspect request headers if available
  if (req) {
    try {
      let origin: string | null = null;
      if ("headers" in req && req.headers) {
        if (typeof (req.headers as Headers).get === "function") {
          const h = req.headers as Headers;
          origin = h.get("origin") || h.get("x-forwarded-host") || h.get("host");
          const proto =
            h.get("x-forwarded-proto") ||
            (origin && origin.includes("localhost") ? "http" : "https");
          if (origin && !origin.startsWith("http://") && !origin.startsWith("https://")) {
            return `${proto}://${origin}`.replace(/\/$/, "");
          }
        } else {
          const h = req.headers as Record<string, string | string[] | undefined>;
          const raw = h["origin"] || h["x-forwarded-host"] || h["host"];
          origin = Array.isArray(raw) ? raw[0] : raw || null;
          const proto =
            (Array.isArray(h["x-forwarded-proto"])
              ? h["x-forwarded-proto"][0]
              : h["x-forwarded-proto"]) ||
            (origin && origin.includes("localhost") ? "http" : "https");
          if (origin && !origin.startsWith("http://") && !origin.startsWith("https://")) {
            return `${proto}://${origin}`.replace(/\/$/, "");
          }
        }
      }
      if (origin) {
        return origin.replace(/\/$/, "");
      }
    } catch {
      // Fall through to env checks
    }
  }

  // 2. Explicit environment variables
  const envUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    process.env.VERCEL_URL;
  if (envUrl) {
    if (envUrl.startsWith("http://") || envUrl.startsWith("https://")) {
      return envUrl.replace(/\/$/, "");
    }
    const proto = envUrl.includes("localhost") ? "http" : "https";
    return `${proto}://${envUrl.replace(/\/$/, "")}`;
  }

  // 3. In development or local server runtime, default to localhost
  if (process.env.NODE_ENV === "development" || process.env.PORT) {
    const port = process.env.PORT || "3000";
    return `http://localhost:${port}`;
  }

  return "https://treel.in";
}

