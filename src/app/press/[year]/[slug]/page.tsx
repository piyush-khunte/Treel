import { getPressItemBySlug, getPublishedPressItems } from "@/lib/content/press-storage";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PressShareBar } from "./press-share-bar";

export const revalidate = 60;

export async function generateStaticParams() {
  const items = await getPublishedPressItems();
  return items.map((item) => ({
    year: item.year || "2026",
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}): Promise<Metadata> {
  const { year, slug } = await params;
  const release = await getPressItemBySlug(slug, year);

  if (!release) {
    return {
      title: "Press Release Not Found · Treel",
    };
  }

  const excerpt = release.leadParagraph || release.excerpt || release.headline;

  return {
    title: `${release.headline} · Treel Press`,
    description: excerpt.slice(0, 150) + "...",
    alternates: {
      canonical: `https://treel.in/press/${year}/${slug}`,
    },
    openGraph: {
      title: `${release.headline} · Treel Press`,
      description: excerpt.slice(0, 150) + "...",
      url: `https://treel.in/press/${year}/${slug}`,
      type: "article",
    },
  };
}

export default async function PressReleasePage({
  params,
}: {
  params: Promise<{ year: string; slug: string }>;
}) {
  const { year, slug } = await params;
  const release = await getPressItemBySlug(slug, year);

  if (!release) {
    notFound();
  }

  const allReleases = await getPublishedPressItems();

  // Find related releases: first check relatedSlugs, otherwise take 2 other recent releases
  const relatedItems = (release.relatedSlugs && release.relatedSlugs.length > 0)
    ? release.relatedSlugs
        .map((rSlug) => allReleases.find((item) => item.slug === rSlug))
        .filter((item): item is NonNullable<typeof item> => Boolean(item))
        .slice(0, 2)
    : allReleases
        .filter((item) => item.slug !== release.slug)
        .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: release.headline,
    datePublished: release.createdAt || `${year}-01-01`,
    description: release.leadParagraph || release.excerpt,
    publisher: {
      "@type": "Organization",
      name: "Treel Mobility Solutions",
      logo: {
        "@type": "ImageObject",
        url: "https://treel.in/images/treel%20main%20logo.jpg",
      },
    },
  };

  return (
    <article className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. ARTICLE HEADER */}
      <header className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Link href="/press" className="hover:text-[#FAF7F2] transition-colors">
                Press
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href="/press" className="hover:text-[#FAF7F2] transition-colors">
                {release.year || year}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#D5573B] truncate max-w-xs">{release.category}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase px-3 py-0.5 rounded-[4px] bg-[#D5573B]/10 text-[#D5573B] border border-[#D5573B]/20 font-semibold tracking-wider">
                {release.category}
              </span>
            </div>

            <h1 className="font-fraunces text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              {release.headline}
            </h1>

            {/* Dateline & Byline */}
            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
              <div>
                <span>{release.city || "PUNE"}, India</span>
                <span className="mx-2 text-white/20">·</span>
                <span>{release.date}</span>
                <span className="mx-2 text-white/20">·</span>
                <span className="text-[#FAF7F2]">Byline: {release.source || "Treel Communications"}</span>
              </div>

              <PressShareBar headline={release.headline} url={`https://treel.in/press/${release.year || year}/${slug}`} />
            </div>
          </div>
        </div>
      </header>

      {/* 2. BODY CONTENT */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-8 text-base sm:text-lg text-[#CBD5E1] leading-relaxed font-inter">
            {release.leadParagraph && (
              <p className="font-medium text-[#FAF7F2] text-lg sm:text-xl leading-relaxed">
                {release.leadParagraph}
              </p>
            )}

            {/* Supporting Executive Quote Block */}
            {release.quote && release.quote.text && (
              <div className="my-10 p-8 rounded-lg bg-white/[0.03] border-l-4 border-[#D5573B] space-y-4">
                <p className="font-fraunces text-xl sm:text-2xl text-[#FAF7F2] italic leading-snug">
                  &ldquo;{release.quote.text}&rdquo;
                </p>
                <div className="text-xs font-mono text-[#94A3B8] pt-2">
                  <span className="text-[#FAF7F2] font-semibold">{release.quote.speaker}</span>
                  {release.quote.role && (
                    <>
                      <span className="mx-2 text-white/20">·</span>
                      <span>{release.quote.role}</span>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Body Paragraphs */}
            {release.bodyParagraphs && release.bodyParagraphs.length > 0 ? (
              release.bodyParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))
            ) : release.excerpt ? (
              <p>{release.excerpt}</p>
            ) : null}

            {/* Standard Corporate Boilerplate */}
            <div className="mt-16 pt-10 border-t border-white/10 space-y-4">
              <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                About Treel Mobility Solutions
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                Treel Mobility Solutions Private Limited is the mobility intelligence company operating India&apos;s largest connected commercial vehicle dataset. Founded in 2018, Treel serves two hundred enterprise customers with sixty-eight thousand vehicles under active management. Its three product families — TMIP for enterprise fleets, Project Suraksha for owner-drivers, and Personal TPMS for consumers — operate on a shared Vehicle Digital Twin architecture. Headquartered in Pune. Learn more at{" "}
                <Link href="/" className="text-[#D5573B] underline hover:text-[#FAF7F2]">
                  treel.in
                </Link>.
              </p>
            </div>

            {/* Media Contact Block */}
            <div className="mt-8 p-6 rounded-lg bg-[#141B22] border border-white/10 space-y-3">
              <h4 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                Media Contact
              </h4>
              <div className="text-xs font-mono text-[#94A3B8] space-y-1">
                <div>Treel Communications Team</div>
                <div>
                  Email:{" "}
                  <a href="mailto:hello@treel.in" className="text-[#D5573B] underline">
                    hello@treel.in
                  </a>
                </div>
                <div>
                  Toll-Free: <span className="text-[#FAF7F2]">1800 833 0233</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RELATED RELEASES STRIP */}
      {relatedItems.length > 0 && (
        <section className="py-20 border-b border-white/10 bg-white/[0.01]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                  Related news
                </h2>
                <Link href="/press" className="text-xs font-semibold text-[#D5573B] hover:underline flex items-center gap-1">
                  <span>View all news</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedItems.map((rel) => (
                  <div 
                    key={rel._id || rel.slug}
                    className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-[#94A3B8]">{rel.date}</div>
                      <h4 className="font-fraunces text-base font-medium text-[#FAF7F2] leading-snug">
                        {rel.headline}
                      </h4>
                    </div>
                    <div className="pt-4 mt-4 border-t border-white/5">
                      <Link
                        href={rel.externalUrl || `/press/${rel.year || '2026'}/${rel.slug}`}
                        target={rel.externalUrl ? "_blank" : undefined}
                        rel={rel.externalUrl ? "noopener noreferrer" : undefined}
                        className="text-xs font-semibold text-[#D5573B] hover:text-[#FAF7F2] inline-flex items-center gap-1"
                      >
                        <span>{rel.externalUrl ? "Read coverage" : "Read statement"}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </article>
  );
}