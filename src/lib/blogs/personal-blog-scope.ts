import type { MongoBlog } from "@/types/admin";
import { getAllSurakshaArticles } from "@/lib/content/suraksha-storage";
import { getAllCaseStudies } from "@/lib/content/casestudies-storage";
import { getPublishedInsights } from "@/lib/content/insights-storage";

/**
 * The shared blogs table also contains Suraksha (truck owner-driver) articles and
 * TMIP case studies. The /personal/blog section is the consumer car & two-wheeler
 * TPMS blog, so those posts must not be listed or rendered there. Stray QA "test"
 * posts are hidden as well.
 */

const SURAKSHA_CATEGORIES = new Set(
  [
    "fuel efficiency",
    "safety",
    "business & gst",
    "route planning",
    "industry news",
    "maintenance",
    "driver safety",
  ]
);

const TMIP_CATEGORIES = new Set(
  [
    "case study",
    "case studies",
    "mobility intelligence",
    "logistics",
    "passenger transport",
    "construction",
    "mining",
    "oem",
    "cold chain",
  ]
);

export type PersonalBlogScope =
  | { scope: "personal" }
  | { scope: "suraksha"; redirectTo: string | null }
  | { scope: "tmip"; redirectTo: string | null }
  | { scope: "insights"; redirectTo: string }
  | { scope: "test"; redirectTo: null };

interface ScopeIndex {
  surakshaSlugs: Set<string>;
  caseStudySlugs: Set<string>;
  caseStudyIndustries: Set<string>;
  insightSlugs: Set<string>;
}

const norm = (v: unknown) => (typeof v === "string" ? v.trim().toLowerCase() : "");

async function buildScopeIndex(): Promise<ScopeIndex> {
  const [suraksha, caseStudies, insights] = await Promise.all([
    getAllSurakshaArticles(false).catch(() => []),
    getAllCaseStudies(false).catch(() => []),
    getPublishedInsights().catch(() => []),
  ]);

  return {
    surakshaSlugs: new Set(
      suraksha.flatMap((a) => [norm(a.slug), norm(a._id)]).filter(Boolean)
    ),
    caseStudySlugs: new Set(
      caseStudies.flatMap((c) => [norm(c.slug), norm(c._id)]).filter(Boolean)
    ),
    caseStudyIndustries: new Set(caseStudies.map((c) => norm(c.industry)).filter(Boolean)),
    insightSlugs: new Set(insights.map((i) => norm(i.slug)).filter(Boolean)),
  };
}

function classify(blog: MongoBlog, index: ScopeIndex): PersonalBlogScope {
  const slug = norm(blog.slug);
  const category = norm(blog.category);
  const text = `${norm(blog.title)} ${norm(blog.metatitle)} ${norm(blog.author)}`;

  // QA leftovers such as "test personal TPMS blog 1" must never be public.
  if (/^test\b/.test(norm(blog.title)) || slug.startsWith("test-")) {
    return { scope: "test", redirectTo: null };
  }

  if (slug && index.caseStudySlugs.has(slug)) {
    return { scope: "tmip", redirectTo: `/tmip/customers/case-studies/${blog.slug}` };
  }
  // Corporate Insights articles mirrored into the blogs table live at /insights/<slug>.
  if (slug && index.insightSlugs.has(slug)) {
    return { scope: "insights", redirectTo: `/insights/${blog.slug}` };
  }
  if (slug && index.surakshaSlugs.has(slug)) {
    return { scope: "suraksha", redirectTo: `/suraksha/blog/${blog.slug}` };
  }

  if (
    TMIP_CATEGORIES.has(category) ||
    index.caseStudyIndustries.has(category) ||
    slug.includes("case-study") ||
    text.includes("case study") ||
    text.includes("tmip")
  ) {
    return { scope: "tmip", redirectTo: null };
  }

  if (SURAKSHA_CATEGORIES.has(category) || text.includes("suraksha")) {
    return { scope: "suraksha", redirectTo: null };
  }

  return { scope: "personal" };
}

/** Classifies a single blog row for the /personal/blog/[slug] route. */
export async function getPersonalBlogScope(blog: MongoBlog): Promise<PersonalBlogScope> {
  const index = await buildScopeIndex();
  return classify(blog, index);
}

/** Keeps only consumer Personal TPMS posts. */
export async function filterPersonalBlogs(blogs: MongoBlog[]): Promise<MongoBlog[]> {
  const index = await buildScopeIndex();
  return blogs.filter((b) => classify(b, index).scope === "personal");
}
