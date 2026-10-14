import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, User, ShoppingCart } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getPublicBlogBySlug, getPublicBlogs } from "@/lib/admin/admin-actions";
import { slugifyAuthor } from "@/lib/authors/author-utils";
import { getValidImageSrc } from "@/lib/utils/image-utils";

export const revalidate = 60;

function formatBlogDate(dateStr?: string): string {
  if (!dateStr) return "Recent";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPublicBlogBySlug(slug);
  const article = result.data;

  if (!article) return { title: "Article Not Found · Treel Personal TPMS" };

  const metaTitle = article.metatitle || article.title;
  const metaDesc = article.metadescription || article.description;

  return {
    title: `${metaTitle} · Treel Personal TPMS Blog`,
    description: metaDesc,
    alternates: {
      canonical: `https://treel.in/personal/blog/${article.slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDesc,
      url: `https://treel.in/personal/blog/${article.slug}`,
      images: getValidImageSrc(article.image) ? [{ url: getValidImageSrc(article.image)! }] : undefined,
    },
  };
}

export default async function PersonalArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getPublicBlogBySlug(slug);
  const article = result.data;

  if (!article) {
    notFound();
  }

  const allBlogsResult = await getPublicBlogs();
  const otherArticles = (allBlogsResult.data || [])
    .filter((a) => a.slug !== slug)
    .slice(0, 2);

  const hasHtml = /<[a-z][\s\S]*>/i.test(article.blogContent || "");

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Header / Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1000px] mx-auto px-6 sm:px-10 space-y-6">
          <Breadcrumb
            variant="personal"
            items={[
              { label: "Personal TPMS", href: "/personal" },
              { label: "Blog", href: "/personal/blog" },
              { label: article.category || "General" },
            ]}
          />

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
            {article.category || "General"}
          </div>

          <h1 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
            {article.title}
          </h1>

          {article.description && (
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium">
              {article.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4 text-xs text-[#6B7280] font-semibold pt-2 border-t border-black/[0.06]">
            <Link
              href={`/authors/${slugifyAuthor(article.author || "Treel Automotive Team")}`}
              className="flex items-center gap-1.5 text-[#111827] hover:text-[#2563EB] hover:underline transition-colors"
            >
              <User className="w-3.5 h-3.5 text-[#2563EB]" /> {article.author || "Treel Automotive Team"}
            </Link>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#2563EB]" /> {formatBlogDate(article.date)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#2563EB]" /> {article.readTime || "5 min read"}
            </span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="py-16 bg-white">
        <div className="max-w-[840px] mx-auto px-6 sm:px-10 space-y-8">
          {(() => {
            const validImageSrc = getValidImageSrc(article.image);
            if (!validImageSrc) return null;
            return (
              <div className="rounded-2xl overflow-hidden border border-black/[0.08] shadow-sm mb-8">
                <img
                  src={validImageSrc}
                  alt={article.title || "Personal blog post cover"}
                  className="w-full h-auto max-h-[460px] object-cover"
                />
              </div>
            );
          })()}

          {/* Body Content (Dynamic Sections, or Custom HTML/Text) */}
          {article.sections && article.sections.length > 0 ? (
            <div className="space-y-8 text-base sm:text-lg text-[#374151] leading-relaxed">
              {article.sections.map((sec, idx) => {
                const text = sec.content || (Array.isArray(sec.paragraphs) ? sec.paragraphs.join("\n\n") : "");
                return (
                  <div key={sec.id || idx} className="space-y-3">
                    {sec.heading && (
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">
                        {sec.heading}
                      </h2>
                    )}
                    {text && (
                      <div className="space-y-4">
                        {text.split("\n\n").map((para, pIdx) => {
                          if (para.includes("\n•") || para.startsWith("•") || para.includes("\n-") || para.startsWith("-")) {
                            const lines = para.split("\n").filter(Boolean);
                            const intro = lines.filter((l) => !l.startsWith("•") && !l.startsWith("-"));
                            const bullets = lines.filter((l) => l.startsWith("•") || l.startsWith("-"));
                            return (
                              <div key={pIdx} className="space-y-2">
                                {intro.length > 0 && <p className="leading-relaxed">{intro.join(" ")}</p>}
                                <ul className="space-y-2 pl-4 border-l-2 border-[#2563EB]/40 text-sm sm:text-base text-[#4B5563]">
                                  {bullets.map((b, bIdx) => (
                                    <li key={bIdx}>{b.replace(/^[•\-]\s*/, "")}</li>
                                  ))}
                                </ul>
                              </div>
                            );
                          }
                          return (
                            <p key={pIdx} className="leading-relaxed">
                              {para}
                            </p>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : hasHtml ? (
            <div
              className="prose prose-lg max-w-none text-[#374151] leading-relaxed space-y-6 [&>p]:leading-relaxed [&>p]:text-base [&>p]:sm:text-lg [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-[#111827] [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#111827] [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
              dangerouslySetInnerHTML={{ __html: article.blogContent || "" }}
            />
          ) : (
            <div className="space-y-6 text-base sm:text-lg text-[#374151] leading-relaxed">
              {(article.blogContent || "").split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}

          {/* Back to Blog & Purchase CTA */}
          <div className="pt-12 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/personal/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to all articles
            </Link>

            <Link
              href="/personal/buy"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2563EB] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#1D4ED8] transition-all shadow-md"
            >
              <ShoppingCart className="w-4 h-4" /> Buy Personal TPMS
            </Link>
          </div>
        </div>
      </article>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="py-16 bg-[#F9FAFB] border-t border-black/[0.06]">
          <div className="max-w-[1000px] mx-auto px-6 sm:px-10 space-y-8">
            <h3 className="text-xl font-extrabold text-[#111827]">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {otherArticles.map((rel) => (
                <Link
                  key={rel._id || rel.slug}
                  href={`/personal/blog/${rel.slug}`}
                  className="p-6 rounded-2xl bg-white border border-black/[0.06] hover:border-[#2563EB]/40 hover:shadow-md transition-all space-y-3 group block"
                >
                  <span className="text-[11px] font-bold text-[#2563EB] uppercase tracking-wider">
                    {rel.category || "General"} · {rel.readTime || "5 min read"}
                  </span>
                  <h4 className="text-lg font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-[#6B7280] line-clamp-2">
                    {rel.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
