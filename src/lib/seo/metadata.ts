/**
 * Shared SEO metadata helpers.
 *
 * Next.js merges `metadata.openGraph` shallowly: when a page defines its own
 * `openGraph` object, the root layout's `openGraph.images` are dropped. Every
 * page-level `openGraph` must therefore spread / include `DEFAULT_OG_IMAGES`.
 */

export const SITE_URL = "https://treel.in";

/** Default social share image (1200x630) served from /public/images/og. */
export const DEFAULT_OG_IMAGE = {
  url: "/images/og/treel-og.jpg",
  width: 1200,
  height: 630,
  alt: "Treel Mobility Intelligence",
} as const;

export const DEFAULT_OG_IMAGES = [DEFAULT_OG_IMAGE];

/** Absolute URL for a site path, e.g. absoluteUrl("/tmip") -> https://treel.in/tmip */
export function absoluteUrl(pathname: string): string {
  if (/^https?:\/\//i.test(pathname)) return pathname;
  const clean = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return clean === "/" ? SITE_URL : `${SITE_URL}${clean}`;
}

/**
 * Trim a meta description to a search-friendly length (default <= 160 chars),
 * cutting on a word boundary and appending an ellipsis when shortened.
 */
export function clampDescription(text: string | undefined | null, max = 160): string {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  const base = (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—·]+$/, "");
  return `${base}…`;
}

/**
 * Remove trailing site / section suffixes that editors sometimes bake into stored
 * SEO titles (e.g. "… · Suraksha Blog", "… — Blog", "… | Treel"), so the root
 * " | Treel" template does not produce doubled suffixes.
 */
export function stripTitleSuffix(text: string | undefined | null): string {
  let clean = (text || "").replace(/\s+/g, " ").trim();
  const suffix =
    /\s*[|·—–-]\s*(Treel(\s+Mobility(\s+Solutions)?)?|(Suraksha|Personal TPMS|Personal|Treel)?\s*(Drivers'?\s*)?Blog|Careers(\s+at\s+Treel)?|Research|Insights|Events)\s*$/i;
  let prev = "";
  while (prev !== clean) {
    prev = clean;
    clean = clean.replace(suffix, "").trim();
  }
  return clean;
}

/**
 * Build a page title (rendered with the root " | Treel" template) from a base
 * title and an optional section suffix. The suffix is only kept when the result
 * fits within `max` characters; otherwise the base title is shortened.
 */
export function composeTitle(base: string | undefined | null, sectionSuffix = "", max = 56): string {
  const clean = stripTitleSuffix(base);
  if (sectionSuffix && `${clean}${sectionSuffix}`.length <= max) return `${clean}${sectionSuffix}`;
  return clampTitle(clean, max);
}

/**
 * Shorten a page title (without the root " | Treel" template suffix) so the
 * rendered <title> stays around 65 characters. Strips trailing site/section
 * suffixes such as " · Treel" or " — Blog" first, then cuts on a word boundary.
 */
export function clampTitle(text: string | undefined | null, max = 56): string {
  let clean = (text || "").replace(/\s+/g, " ").trim();
  clean = clean.replace(/\s*[|·—–-]\s*Treel(\s+Mobility(\s+Solutions)?)?\s*$/i, "");
  if (clean.length <= max) return clean;
  // Prefer cutting at a natural separator (":", " — ", " · ") if it leaves a meaningful title.
  const sepMatch = clean.match(/^(.{20,}?)(?::\s| — | – | · | \| )/);
  if (sepMatch && sepMatch[1].length <= max) return sepMatch[1].trim();
  const cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:.\-–—·&]+$/, "");
}
