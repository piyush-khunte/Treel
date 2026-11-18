/**
 * Defensive image source normalization and validation.
 * Prevents Next.js Image error: 'Image is missing required "src" property: {}'
 * Safely handles null, undefined, empty strings, empty objects, and structured storage payloads.
 */

/**
 * Known-broken image references still present in stored content (Supabase rows / JSON stores).
 * These files were never shipped in /public, or the remote asset was removed upstream.
 * Each one is remapped to an asset that actually exists so cards, hero images and og:image never 404.
 */
const FLEET_FALLBACK_IMAGE = "/images/home/fleet-digital-twin-desktop.webp";

const BROKEN_IMAGE_REPLACEMENTS: Record<string, string> = {
  "/images/blog/highway-truck.jpg": FLEET_FALLBACK_IMAGE,
  "/images/blog/digital-twin.jpg": FLEET_FALLBACK_IMAGE,
  "/images/case-studies/fleet-default.jpg": FLEET_FALLBACK_IMAGE,
  "/images/case-studies/vrl-fleet.jpg": FLEET_FALLBACK_IMAGE,
  "/images/case-studies/kallada-bus.jpg": FLEET_FALLBACK_IMAGE,
  "/images/blog/car-highway.jpg":
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
  // Removed upstream on Unsplash (HTTP 404) — swapped for car/tyre covers already used on the Personal TPMS blog
  "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80":
    "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1510519138195-068d82f53489?auto=format&fit=crop&w=1200&q=80":
    "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
};

function replaceBrokenImage(src: string): string {
  const exact = BROKEN_IMAGE_REPLACEMENTS[src];
  if (exact) return exact;
  // Match the dead Unsplash photo ids regardless of query-string variations
  if (src.includes("images.unsplash.com/photo-1486006920555-c77dce18193b")) {
    return BROKEN_IMAGE_REPLACEMENTS["https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&q=80"];
  }
  if (src.includes("images.unsplash.com/photo-1510519138195-068d82f53489")) {
    return BROKEN_IMAGE_REPLACEMENTS["https://images.unsplash.com/photo-1510519138195-068d82f53489?auto=format&fit=crop&w=1200&q=80"];
  }
  return src;
}

export function getValidImageSrc(img: unknown): string | null {
  const src = getRawValidImageSrc(img);
  return src ? replaceBrokenImage(src) : null;
}

function getRawValidImageSrc(img: unknown): string | null {
  if (img === null || img === undefined) {
    return null;
  }

  // If string, validate that it is non-empty and not a stringified object / placeholder error
  if (typeof img === "string") {
    const trimmed = img.trim();
    if (
      !trimmed ||
      trimmed === "{}" ||
      trimmed === "null" ||
      trimmed === "undefined" ||
      trimmed === "[object Object]"
    ) {
      return null;
    }
    return trimmed;
  }

  // If structured object, inspect supported properties (url, src, secure_url)
  if (typeof img === "object") {
    const obj = img as Record<string, unknown>;

    if (typeof obj.src === "string" && obj.src.trim() && obj.src !== "[object Object]") {
      return obj.src.trim();
    }

    if (typeof obj.url === "string" && obj.url.trim() && obj.url !== "[object Object]") {
      return obj.url.trim();
    }

    if (typeof obj.secure_url === "string" && obj.secure_url.trim() && obj.secure_url !== "[object Object]") {
      return obj.secure_url.trim();
    }
  }

  return null;
}

export function isValidImageSrc(img: unknown): boolean {
  return getValidImageSrc(img) !== null;
}

/**
 * Remote hosts that the Next.js image optimizer is allowed to fetch from.
 * MUST stay in sync with `images.remotePatterns` in next.config.ts — a host listed here
 * but missing there makes /_next/image return HTTP 400 for that image.
 */
export const OPTIMIZABLE_REMOTE_IMAGE_HOSTS = [
  "res.cloudinary.com",
  "treel-ecommerce.s3.ap-south-1.amazonaws.com",
];

/**
 * True when next/image can serve a resized AVIF/WebP variant of `src`
 * (local /public assets, or remote hosts allowed in next.config remotePatterns).
 * Use as `unoptimized={!canOptimizeImage(src)}`.
 */
export function canOptimizeImage(src: string): boolean {
  if (src.startsWith("/") && !src.startsWith("//")) return true;
  try {
    const { protocol, hostname } = new URL(src);
    return protocol === "https:" && OPTIMIZABLE_REMOTE_IMAGE_HOSTS.includes(hostname);
  } catch {
    return false;
  }
}
