import { DEFAULT_OG_IMAGES, SITE_URL } from "@/lib/seo/metadata";
import { getPublishedInsights } from "@/lib/content/insights-storage";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import type { Metadata } from "next";
import Link from "next/link";

function titleCaseFromSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

async function resolveCategoryName(categorySlug: string): Promise<string> {
  const articles = await getPublishedInsights().catch(() => []);
  const match = articles.find((article) => article.categorySlug === categorySlug);
  return match?.category || titleCaseFromSlug(categorySlug);
}

export async function generateStaticParams() {
  const articles = await getPublishedInsights().catch(() => []);
  const slugs = Array.from(new Set(articles.map((article) => article.categorySlug).filter(Boolean)));
  return slugs.map((slug) => ({ "category-slug": slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ "category-slug": string }>;
}): Promise<Metadata> {
  const { "category-slug": categorySlug } = await params;
  const categoryName = await resolveCategoryName(categorySlug);
  const title = `${categoryName} Articles — Insights`;
  const description = `${categoryName} articles and analysis from Treel: field-tested perspectives on fleet telemetry, tyre intelligence and Vehicle Digital Twins.`;
  const url = `${SITE_URL}/resources/insights/category/${categorySlug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      images: DEFAULT_OG_IMAGES,
      title,
      description,
      url,
    },
  };
}

export default async function InsightsCategoryCategorySlugPage({
  params,
}: {
  params: Promise<{ "category-slug": string }>;
}) {
  const { "category-slug": categorySlug } = await params;
  const articles = (await getPublishedInsights().catch(() => [])).filter(
    (article) => article.categorySlug === categorySlug
  );
  const categoryName = articles[0]?.category || titleCaseFromSlug(categorySlug);

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Resources", href: "/resources" },
                { label: "Insights", href: "/resources/insights" },
                { label: categoryName },
              ]}
            />
            <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#E07A5F]">
              INSIGHTS  ›  {categoryName.toUpperCase()}
            </p>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12] mb-6">
              {categoryName}
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              {categoryName} articles and analysis from Treel on fleet telemetry, tyre intelligence and Vehicle Digital Twins.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          {articles.length === 0 ? (
            <p className="text-[#94A3B8]">
              No articles in this category yet.{" "}
              <Link href="/resources/insights" className="text-[#E07A5F] underline underline-offset-4">
                Browse all insights
              </Link>
            </p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <li key={article.slug}>
                  <Link
                    href={`/resources/insights/${article.slug}`}
                    className="block h-full p-6 rounded-lg border border-white/10 bg-white/[0.03] hover:border-[#E07A5F]/60 transition-colors"
                  >
                    <p className="text-xs text-[#94A3B8] mb-3">
                      {article.date} · {article.readTime}
                    </p>
                    <h2 className="font-fraunces text-xl text-[#FAF7F2] mb-3 leading-snug">{article.title}</h2>
                    <p className="text-sm text-[#CBD5E1] leading-relaxed">{article.deck}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
