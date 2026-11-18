import { slugifyAuthor, VERIFIED_AUTHORS } from "@/lib/authors/author-utils";

/**
 * Canonical slug for an author profile. Some authors are registered under more
 * than one slug (spelling variants such as "pradnya-chaudhari"); the variant
 * whose slug matches the slugified display name is treated as canonical.
 */
export function canonicalAuthorSlug(profile: { slug: string; name: string }): string {
  const nameSlug = slugifyAuthor(profile.name);
  return nameSlug !== profile.slug && VERIFIED_AUTHORS[nameSlug] ? nameSlug : profile.slug;
}

/** Unique canonical author slugs (alias keys removed), e.g. for the sitemap. */
export function canonicalAuthorSlugs(): string[] {
  return Array.from(new Set(Object.values(VERIFIED_AUTHORS).map((author) => canonicalAuthorSlug(author))));
}
