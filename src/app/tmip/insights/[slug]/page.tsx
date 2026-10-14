import { Breadcrumb } from "@/components/ui/breadcrumb";
import { slugifyAuthor } from "@/lib/authors/author-utils";
import { getInsightBySlug,getPublishedInsights } from "@/lib/content/insights-storage";
import {
Activity,
ArrowLeft,
ArrowRight,
Calendar,
Clock
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getInsightBySlug(slug, false);

  if (!article) {
    return {
      title: "Insight Not Found  ·  TMIP",
    };
  }

  return {
    title: `${article.title}  ·  TMIP Insights`,
    description: article.deck || article.tldr || article.title,
    alternates: {
      canonical: `https://treel.in/tmip/insights/${article.slug}`,
    },
    openGraph: {
      title: `${article.title}  ·  TMIP Insights`,
      description: article.deck || article.tldr || article.title,
      url: `https://treel.in/tmip/insights/${article.slug}`,
      type: "article",
    },
  };
}

export default async function TmipInsightsSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getInsightBySlug(slug, false);

  if (!article || article.status === "Draft") {
    notFound();
  }

  const allPublished = await getPublishedInsights();
  const relatedArticles = (article.relatedSlugs && article.relatedSlugs.length > 0)
    ? allPublished.filter((a) => article.relatedSlugs?.includes(a.slug))
    : allPublished.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Blueprint Grid Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Header & Hero Section */}
      <header className="relative z-10 pt-24 pb-16 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="tmip"
              items={[
                { label: "TMIP", href: "/tmip" },
                { label: "Fleet Insights", href: "/tmip/insights" },
                { label: article.category || "Article" },
              ]}
            />

            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#3B82F6] text-white text-[11px] font-jetbrains font-bold px-2.5 py-0.5 rounded-[2px] uppercase tracking-wider">
                {article.category || "FLEET INTELLIGENCE"}
              </span>
              <span className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                TELEMETRY RESEARCH
              </span>
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              {article.title}
            </h1>

            {article.deck && (
              <p className="text-base sm:text-xl text-[#94A3B8] leading-relaxed font-ibm-plex max-w-3xl">
                {article.deck}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-jetbrains text-[#94A3B8] pt-2 border-t border-slate-400/10">
              <Link
                href={`/authors/${slugifyAuthor(article.author)}`}
                className="text-[#F1F5F9] hover:text-[#3B82F6] transition-colors font-medium"
              >
                {article.author}
              </Link>
              {article.authorRole && (
                <>
                  <span>·</span>
                  <span className="text-[#64748B]">{article.authorRole}</span>
                </>
              )}
              <span>·</span>
              <span className="flex items-center gap-1 text-[#94A3B8]">
                <Calendar className="w-3.5 h-3.5 text-[#3B82F6]" />
                {article.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#F1F5F9]">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                {article.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Narrative Content */}
      <div className="relative z-10 py-16 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-12">
            
            {/* Key Takeaway Callout if present */}
            {article.tldr && (
              <div className="p-6 rounded-[4px] bg-[#0B1220] border-l-4 border-[#3B82F6] border-y border-r border-slate-400/15 space-y-2">
                <span className="font-jetbrains text-xs font-bold uppercase tracking-wider text-[#3B82F6]">
                  Key Takeaway
                </span>
                <p className="text-sm sm:text-base text-[#CBD5E1] leading-relaxed font-ibm-plex">
                  {article.tldr}
                </p>
              </div>
            )}

            {/* Article Sections */}
            <div className="space-y-12">
              {article.body?.sections?.map((section, idx) => (
                <div key={idx} className="space-y-5">
                  <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9] tracking-tight">
                    {section.heading}
                  </h2>

                  <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] font-ibm-plex leading-relaxed">
                    {section.paragraphs.map((para, pIdx) => (
                      <p key={pIdx}>{para}</p>
                    ))}
                  </div>

                  {/* Inline Pull Quote after Section 1 if present */}
                  {idx === 0 && article.body?.pullQuote?.quote && (
                    <div className="my-8 py-6 px-8 border-l-2 border-[#3B82F6] bg-blue-950/20 rounded-r-[4px] space-y-3">
                      <blockquote className="font-space-grotesk text-xl sm:text-2xl italic font-normal text-[#93C5FD] leading-snug">
                        &ldquo;{article.body.pullQuote.quote}&rdquo;
                      </blockquote>
                      {article.body.pullQuote.attribution && (
                        <cite className="block text-xs font-jetbrains text-[#64748B] not-italic uppercase tracking-wider">
                          {article.body.pullQuote.attribution}
                        </cite>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Author Attribution Card */}
            {article.author && (
              <div className="p-8 rounded-[4px] bg-[#0B1220] border border-slate-400/10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-blue-950/60 border border-blue-500/30 flex items-center justify-center font-space-grotesk text-xl font-bold text-[#93C5FD] shrink-0">
                  {article.author.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="space-y-2 flex-1">
                  <div>
                    <Link
                      href={`/authors/${slugifyAuthor(article.author)}`}
                      className="font-space-grotesk text-xl font-bold text-[#F1F5F9] hover:text-[#3B82F6] transition-colors"
                    >
                      {article.author}
                    </Link>
                    {article.authorRole && (
                      <div className="text-xs font-jetbrains uppercase tracking-wider text-[#3B82F6] font-semibold mt-0.5">
                        {article.authorRole}
                      </div>
                    )}
                  </div>
                  {article.authorBio && (
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                      {article.authorBio}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation & CTA Controls */}
            <div className="pt-8 border-t border-slate-400/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/tmip/insights"
                className="inline-flex items-center gap-2 text-sm font-jetbrains text-[#3B82F6] hover:text-[#60A5FA] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back to all TMIP Insights
              </Link>
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[3px] bg-[#3B82F6] text-white font-jetbrains text-xs font-bold uppercase tracking-wider hover:bg-[#2563EB] transition-all shadow-md"
              >
                Request Enterprise TMIP Pilot <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Related Insights Strip */}
      {relatedArticles.length > 0 && (
        <section className="relative z-10 py-16 border-b border-slate-400/10 bg-[#0B1220]/40">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-8">
            <h2 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">
              Related Telemetry Intelligence
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel, idx) => (
                <Link
                  key={idx}
                  href={`/tmip/insights/${rel.slug}`}
                  className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <span className="text-[10px] font-jetbrains uppercase tracking-wider text-[#3B82F6] font-semibold">
                      {rel.category}
                    </span>
                    <h3 className="font-space-grotesk text-lg font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors leading-snug">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex line-clamp-2 leading-relaxed">
                      {rel.deck}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-slate-400/10 flex items-center justify-between text-xs font-jetbrains text-[#94A3B8] mt-4">
                    <span>{rel.readTime}</span>
                    <span className="text-[#3B82F6] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}