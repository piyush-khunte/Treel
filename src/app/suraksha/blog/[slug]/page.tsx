import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  BookOpen,
  ShieldCheck,
  CheckCircle2,
  Wrench,
  Fuel,
  Navigation,
  FileText,
  AlertTriangle,
  Share2,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WhatsAppCircularIcon } from "@/components/ui/whatsapp-circular-icon";
import { slugifyAuthor } from "@/lib/authors/author-utils";
import {
  getPublishedSurakshaArticleBySlug,
  getPublishedSurakshaArticles,
} from "@/lib/content/suraksha-storage";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const articles = await getPublishedSurakshaArticles();
  return articles
    .map((article) => ({
      slug: article.slug || article._id,
    }))
    .filter((param) => Boolean(param.slug));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedSurakshaArticleBySlug(slug);

  if (!article) {
    return {
      title: "Article Not Found · Suraksha Drivers' Blog",
      description: "The requested Suraksha article could not be found.",
    };
  }

  const title = `${article.title} · Suraksha Drivers' Blog`;
  const description =
    article.excerpt || "Practical guidance for commercial highway drivers.";
  const canonicalUrl = `https://treel.in/suraksha/blog/${article.slug || article._id}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      images: article.image ? [{ url: article.image }] : undefined,
    },
  };
}

export default async function SurakshaArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublishedSurakshaArticleBySlug(slug);

  if (!article || article.status !== "Published") {
    notFound();
  }

  const allArticles = await getPublishedSurakshaArticles();
  const currentKey = (article.slug || article._id).toLowerCase();
  const relatedArticles = allArticles
    .filter((a) => (a.slug || a._id).toLowerCase() !== currentKey)
    .slice(0, 3);

  const hasHtmlContent = /<[a-z][\s\S]*>/i.test(article.content || "");

  const getCategoryIcon = (cat?: string) => {
    const c = (cat || "").toLowerCase();
    if (c.includes("fuel")) return Fuel;
    if (c.includes("safety")) return ShieldCheck;
    if (c.includes("route")) return Navigation;
    if (c.includes("maint")) return Wrench;
    if (c.includes("gst") || c.includes("business")) return FileText;
    return BookOpen;
  };
  const CategoryIcon = getCategoryIcon(article.category);

  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* 1. TOP ARTICLE HERO */}
      <section className="relative overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10 space-y-6">
          {/* Breadcrumb & Back button row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Blog", href: "/suraksha/blog" },
                { label: article.category || "Article" },
              ]}
            />
            <Link
              href="/suraksha/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#DC2626] hover:text-[#B91C1C] transition-colors w-fit"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to The Drivers&apos; Blog
            </Link>
          </div>

          {/* Category & Badge */}
          <div className="flex items-center gap-2.5 flex-wrap pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <CategoryIcon className="w-3.5 h-3.5" />
              {article.category || "The Drivers' Blog"}
            </div>
            {article.isFeatured && (
              <span className="px-2.5 py-0.5 bg-[#451A03] text-[#FEF3C7] text-xs font-bold uppercase rounded-[4px]">
                Featured Article
              </span>
            )}
          </div>

          {/* Main Title */}
          <h1 className="font-anton uppercase tracking-normal text-3xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
            {article.title}
          </h1>

          {/* Article Meta Bar */}
          <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-[#78350F] flex-wrap pt-2 border-t border-[#451A03]/10">
            <Link
              href={`/authors/${slugifyAuthor(article.author || "Suraksha Fleet Team")}`}
              className="flex items-center gap-1.5 hover:text-[#DC2626] hover:underline transition-colors"
            >
              <User className="w-4 h-4 text-[#DC2626]" />
              {article.author || "Suraksha Fleet Team"}
            </Link>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#DC2626]" />
              {article.date || "October 2026"}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#DC2626]" />
              {article.readTime || "5 min read"}
            </span>
          </div>
        </div>
      </section>

      {/* 2. ARTICLE CONTENT CONTAINER */}
      <section className="py-12 sm:py-16 bg-[#FEF3C7]">
        <div className="max-w-[900px] mx-auto px-6 sm:px-10 space-y-10">
          {/* Optional Featured Image */}
          {article.image && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border-2 border-[#451A03]/15 shadow-md">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}

          {/* Lead Excerpt */}
          {article.excerpt && (
            <div className="p-6 sm:p-8 bg-[#FFFBEB] border-l-4 border-[#DC2626] border-y border-r border-[#451A03]/10 rounded-r-2xl shadow-sm">
              <p className="text-[#451A03] text-lg sm:text-xl font-rubik font-medium leading-relaxed">
                {article.excerpt}
              </p>
            </div>
          )}

          {/* Key Takeaway Box */}
          {article.keyTakeaway && (
            <div className="p-6 sm:p-8 bg-[#FFFBEB] rounded-2xl border-2 border-[#DC2626] space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-xs font-anton tracking-wider text-[#DC2626] uppercase">
                <ShieldCheck className="w-4 h-4 text-[#DC2626]" />
                Key Takeaway for Indian Highway Drivers:
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-[#78350F] font-medium">
                {article.keyTakeaway}
              </p>
            </div>
          )}

          {/* Full Content (Custom HTML or Text) */}
          {article.content && (
            <div className="space-y-6 text-base sm:text-lg leading-relaxed text-[#451A03] font-rubik">
              {hasHtmlContent ? (
                <div
                  className="prose prose-amber max-w-none text-[#451A03] prose-headings:font-anton prose-headings:text-[#451A03] prose-headings:uppercase prose-a:text-[#DC2626] prose-a:font-bold prose-strong:text-[#451A03] prose-li:text-[#78350F]"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              ) : (
                article.content.split("\n\n").map((para, i) => (
                  <p key={i} className="text-[#451A03] leading-relaxed">
                    {para}
                  </p>
                ))
              )}
            </div>
          )}

          {/* Practical Highway Guidance & Best Practices */}
          <div className="bg-[#FFFBEB] border-2 border-[#451A03]/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
            <h3 className="font-anton text-2xl sm:text-3xl uppercase tracking-normal text-[#451A03]">
              Highway Operating Best Practices
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#451A03]/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626] uppercase">
                  <CheckCircle2 className="w-4 h-4" />
                  Pre-Trip Cold PSI Verification
                </div>
                <p className="text-xs text-[#78350F] leading-relaxed">
                  Always inspect cold tyre pressure before wheels heat up on the highway. Maintaining recommended manufacturer pressure protects crown rubber from excessive flex.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FEF3C7] border border-[#451A03]/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#DC2626] uppercase">
                  <AlertTriangle className="w-4 h-4" />
                  Real-Time Slow Leak Detection
                </div>
                <p className="text-xs text-[#78350F] leading-relaxed">
                  Over 75% of commercial tyre blowouts originate as slow pinhole punctures. Continuous cab telematics alert the driver in seconds before tyre sidewalls disintegrate.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#451A03]/10 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-[#78350F] font-semibold">
                Need on-ground assistance or sensor fitment?
              </div>
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#DC2626] hover:underline"
              >
                Find Nearest Suraksha Centre <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bottom Article Actions & Share */}
          <div className="pt-6 border-t-2 border-[#451A03]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/suraksha/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-sm w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" /> Back to The Drivers&apos; Blog
            </Link>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <WhatsAppCircularIcon
                href="/suraksha/whatsapp"
                size="md"
                title="Share or Ask on WhatsApp"
                ariaLabel="Share or Ask on WhatsApp"
              />
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[4px] border border-[#451A03]/20 bg-[#FFFBEB] text-xs font-bold text-[#451A03] hover:border-[#DC2626] transition-colors"
              >
                <span>Nearest Centre</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#DC2626]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED ARTICLES */}
      {relatedArticles.length > 0 && (
        <section className="py-16 sm:py-20 border-t-2 border-[#451A03]/10 bg-[#FFFBEB]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  MORE PRACTICAL GUIDANCE
                </span>
                <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-normal text-[#451A03]">
                  RECOMMENDED READS FOR HIGHWAY DRIVERS
                </h2>
              </div>
              <Link
                href="/suraksha/blog"
                className="text-xs font-bold uppercase tracking-wider text-[#DC2626] hover:underline flex items-center gap-1"
              >
                View all articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedArticles.map((rel) => {
                const relSlug = rel.slug || rel._id;
                return (
                  <div
                    key={rel._id}
                    className="bg-[#FEF3C7] border-2 border-[#451A03]/10 hover:border-[#DC2626] rounded-xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 shadow-sm group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                        <span className="text-[#DC2626]">{rel.category}</span>
                        <span className="text-[#78350F]/70 flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#DC2626]" />
                          {rel.readTime}
                        </span>
                      </div>

                      <h3 className="font-anton text-xl uppercase tracking-normal text-[#451A03] group-hover:text-[#DC2626] transition-colors leading-tight">
                        <Link href={`/suraksha/blog/${relSlug}`} className="hover:underline">
                          {rel.title}
                        </Link>
                      </h3>

                      <p className="text-[#78350F] text-xs leading-relaxed line-clamp-3">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#451A03]/10 mt-5 flex items-center justify-between">
                      <div className="text-[10px] text-[#78350F] font-semibold">
                        {rel.author}
                      </div>
                      <Link
                        href={`/suraksha/blog/${relSlug}`}
                        className="font-rubik font-bold text-xs uppercase tracking-wider text-[#DC2626] hover:text-[#B91C1C] flex items-center gap-1"
                      >
                        Read article <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 4. BOTTOM SURAKSHA CTA BAND */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton text-5xl sm:text-6xl font-normal tracking-tight text-[#FEF3C7] uppercase">
              SAFETY AND SAVINGS GO HAND IN HAND.
            </h2>

            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
              Save ₹25,000+ per truck every year on diesel and tyre wear with Suraksha TPMS.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#FEF3C7] text-[#451A03] hover:bg-white active:scale-[0.98]"
              >
                Nearest Centre <ArrowRight className="w-5 h-5 text-[#DC2626]" />
              </Link>
              <WhatsAppCircularIcon
                href="/suraksha/whatsapp"
                size="lg"
                title="Chat on WhatsApp"
                ariaLabel="Chat on WhatsApp"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
