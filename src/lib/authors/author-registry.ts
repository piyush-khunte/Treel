import { getAllInsights } from "@/lib/content/insights-storage";
import { getAllSurakshaArticles } from "@/lib/content/suraksha-storage";
import { getAllCaseStudies } from "@/lib/content/casestudies-storage";
import { getAllBlogsFromDb } from "@/lib/blogs/blog-storage";
import { 
  AuthorProfile, 
  AuthoredArticleItem, 
  slugifyAuthor, 
  VERIFIED_AUTHORS,
  getLeadershipPhotoForAuthor
} from "./author-utils";

export { 
  type AuthorProfile, 
  type AuthoredArticleItem, 
  slugifyAuthor, 
  VERIFIED_AUTHORS,
  getLeadershipPhotoForAuthor
};

export async function getAuthorProfile(slugOrName: string): Promise<{
  profile: AuthorProfile;
  articles: AuthoredArticleItem[];
}> {
  const normalizedSlug = slugifyAuthor(slugOrName);
  
  // 1. Fetch articles from all categories
  const [insights, surakshaArticles, personalBlogs, caseStudies] = await Promise.all([
    getAllInsights(false).catch(() => []),
    getAllSurakshaArticles(false).catch(() => []),
    getAllBlogsFromDb().catch(() => []),
    getAllCaseStudies(false).catch(() => []),
  ]);

  const authoredArticles: AuthoredArticleItem[] = [];

  const normalizeToken = (t: string) =>
    slugifyAuthor(t)
      .replace(/^(mr\.|mrs\.|ms\.|dr\.)-?/i, "")
      .replace(/choudh/g, "chaudh")
      .replace(/nithin/g, "nitin");

  const normalizedKey = normalizeToken(normalizedSlug);

  // Match helper
  const isMatch = (authorName?: string) => {
    if (!authorName) return false;
    const s = normalizeToken(authorName);
    return s === normalizedKey || s.includes(normalizedKey) || normalizedKey.includes(s);
  };

  // Insights
  for (const item of insights) {
    if (isMatch(item.author)) {
      authoredArticles.push({
        id: item._id || item.slug,
        slug: item.slug,
        title: item.title,
        deckOrExcerpt: item.deck,
        category: item.category,
        categoryUrl: `/insights/category/${item.categorySlug}`,
        url: `/insights/${item.slug}`,
        date: item.date,
        readTime: item.readTime,
        source: "insights",
        sourceLabel: "Treel Insights",
      });
    }
  }

  // Suraksha
  for (const item of surakshaArticles) {
    if (isMatch(item.author)) {
      authoredArticles.push({
        id: item._id || item.slug || "suraksha-article",
        slug: item.slug || item._id || "suraksha-article",
        title: item.title,
        deckOrExcerpt: item.excerpt,
        category: item.category || "Safety",
        url: `/suraksha/blog/${item.slug || item._id}`,
        date: item.date || "Recent",
        readTime: item.readTime || "5 min read",
        source: "suraksha",
        sourceLabel: "Suraksha Blog",
      });
    }
  }

  // Personal Blogs
  for (const item of personalBlogs) {
    if (isMatch(item.author)) {
      authoredArticles.push({
        id: item._id || item.slug || "personal-blog",
        slug: item.slug || item._id || "personal-blog",
        title: item.title,
        deckOrExcerpt: item.description,
        category: item.category || "General",
        url: `/personal/blog/${item.slug}`,
        date: item.date ? new Date(item.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" }) : "Recent",
        readTime: item.readTime || "4 min read",
        source: "personal",
        sourceLabel: "Personal TPMS",
      });
    }
  }

  // Case Studies (TMIP)
  for (const item of caseStudies) {
    const caseAuthor = item.author || "Treel Research";
    if (isMatch(caseAuthor)) {
      authoredArticles.push({
        id: item._id || item.slug,
        slug: item.slug,
        title: item.headline,
        deckOrExcerpt: item.excerpt,
        category: item.industry || "Case Study",
        categoryUrl: `/tmip/customers/case-studies`,
        url: `/tmip/customers/case-studies/${item.slug}`,
        date: "Deployment Review",
        readTime: "5 min read",
        source: "tmip",
        sourceLabel: "TMIP Case Study",
      });
    }
  }

  // 2. Identify or compose profile
  let profile = VERIFIED_AUTHORS[normalizedSlug];

  if (!profile) {
    // Check if an insight article has author bio and role
    const matchingInsight = insights.find((i) => isMatch(i.author));
    const matchingSuraksha = surakshaArticles.find((s) => isMatch(s.author));
    const matchingPersonal = personalBlogs.find((p) => isMatch(p.author));

    const displayName =
      matchingInsight?.author ||
      matchingSuraksha?.author ||
      matchingPersonal?.author ||
      slugOrName
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    const displayRole =
      matchingInsight?.authorRole ||
      (matchingSuraksha ? "Safety Specialist, Treel Suraksha" : "Technical Contributor, Treel Mobility");

    const displayBio =
      matchingInsight?.authorBio ||
      `Technical specialist and domain author contributing to research, engineering, and fleet safety across Treel Mobility Solutions.`;

    profile = {
      slug: normalizedSlug,
      name: displayName,
      role: displayRole,
      company: "Treel Mobility Solutions",
      location: "Pune, India",
      bio: displayBio,
    };
  }

  if (profile) {
    const leadershipPhoto = getLeadershipPhotoForAuthor(profile.name);
    profile.avatarUrl = leadershipPhoto || profile.avatarUrl || undefined;
  }

  return {
    profile,
    articles: authoredArticles,
  };
}
