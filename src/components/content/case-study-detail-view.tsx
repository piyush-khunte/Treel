import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, User } from "lucide-react";
import { TmipCaseStudy } from "@/types/content";
import { slugifyAuthor } from "@/lib/authors/author-utils";
import { AuthorAvatar } from "@/components/authors/author-avatar";

interface CaseStudyDetailViewProps {
  study: TmipCaseStudy;
}

export function CaseStudyDetailView({ study }: CaseStudyDetailViewProps) {
  const authorName = study.author || "Treel Research";
  const authorRole = study.authorRole || "Mobility Intelligence Research Group";
  const authorSlug = slugifyAuthor(authorName);

  const results = study.results && study.results.length > 0
    ? study.results
    : [
        {
          value: study.metricValue || "0.5–0.6%",
          label: study.metricLabel || "Operating advantage",
          delta: "Measured outcome",
          desc: study.excerpt || "Observed improvement under active TMIP telemetry.",
        },
      ];

  const hasHtml = /<[a-z][\s\S]*>/i.test(study.content || "");

  // Format challenge text with bullet points if present
  const renderFormattedBlock = (text: string) => {
    const paragraphs = text.split("\n\n").filter(Boolean);
    return (
      <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
        {paragraphs.map((p, idx) => {
          if (p.includes("\n•") || p.startsWith("•") || p.includes("\n-") || p.startsWith("-")) {
            const lines = p.split("\n").filter(Boolean);
            const intro = lines.filter((l) => !l.startsWith("•") && !l.startsWith("-"));
            const bullets = lines.filter((l) => l.startsWith("•") || l.startsWith("-"));

            return (
              <div key={idx} className="space-y-3">
                {intro.length > 0 && <p>{intro.join(" ")}</p>}
                <ul className="space-y-3 pl-4 border-l-2 border-[#3B82F6]/40 text-base text-[#CBD5E1]">
                  {bullets.map((b, bIdx) => {
                    const cleanText = b.replace(/^[•\-]\s*/, "");
                    const colonIdx = cleanText.indexOf(":");
                    if (colonIdx > 0) {
                      const heading = cleanText.slice(0, colonIdx);
                      const rest = cleanText.slice(colonIdx + 1);
                      return (
                        <li key={bIdx}>
                          <strong className="text-[#F1F5F9]">{heading}:</strong>
                          {rest}
                        </li>
                      );
                    }
                    return <li key={bIdx}>{cleanText}</li>;
                  })}
                </ul>
              </div>
            );
          }
          return <p key={idx}>{p}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Subtle Blueprint Grid: 60px x 60px */}
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

      {/* Header & Breadcrumb */}
      <section className="relative z-10 pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-6">
            <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
              TMIP
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link href="/tmip/customers" className="hover:text-[#F1F5F9] transition-colors">
              Customers
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link href="/tmip/customers/case-studies" className="hover:text-[#F1F5F9] transition-colors">
              Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-[#3B82F6] truncate max-w-[200px] sm:max-w-xs">{study.headline}</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#3B82F6] uppercase font-semibold">
                {study.industry}
              </span>
              <span className="border border-slate-400/10 bg-white/[0.03] px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#94A3B8]">
                {study.fleetSize} FLEET
              </span>
              <span className="text-xs font-jetbrains text-[#94A3B8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                Deployment Review
              </span>
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              {study.headline}
            </h1>

            {study.excerpt && (
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex max-w-3xl">
                {study.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-xs font-jetbrains text-[#94A3B8] pt-4 border-t border-slate-400/10">
              <span className="text-[#64748B]">Documented by</span>
              <Link
                href={`/authors/${authorSlug}`}
                className="text-[#F1F5F9] hover:text-[#3B82F6] transition-colors font-medium inline-flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#3B82F6] rounded"
                aria-label={`View author profile for ${authorName}`}
              >
                <User className="w-3.5 h-3.5 text-[#3B82F6]" />
                <span>{authorName}</span>
              </Link>
              <span>·</span>
              <span className="text-[#64748B]">{authorRole}</span>
              <span>·</span>
              <span className="text-[#94A3B8]">Treel Mobility Solutions</span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="relative z-10 py-12 border-b border-slate-400/10 bg-[#050A17]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((res, i) => (
              <div key={i} className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-2">
                <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#10B981]">
                  {res.value}
                </div>
                <div className="text-sm font-semibold text-[#F1F5F9] font-ibm-plex">{res.label}</div>
                {res.delta && <div className="text-xs font-jetbrains text-[#3B82F6]">{res.delta}</div>}
                {res.desc && (
                  <p className="text-xs text-[#94A3B8] pt-1 leading-relaxed font-ibm-plex">{res.desc}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative & Details */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-16">
            {/* Dynamic Sections (Custom headings, paragraphs, and bullet points) */}
            {study.sections && study.sections.length > 0 ? (
              study.sections.map((sec, idx) => {
                const sectionText = sec.content || (Array.isArray(sec.paragraphs) ? sec.paragraphs.join("\n\n") : "");
                if (!sec.heading && !sectionText) return null;
                return (
                  <div key={sec.id || idx} className="space-y-4">
                    {sec.heading && (
                      <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                        {sec.heading}
                      </h2>
                    )}
                    {sectionText && renderFormattedBlock(sectionText)}
                  </div>
                );
              })
            ) : (
              /* Backward-compatibility fallback for unmigrated legacy case studies */
              <>
                {study.customerProfile && (
                  <div className="space-y-4">
                    <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                      Who they are
                    </h2>
                    {renderFormattedBlock(study.customerProfile)}
                  </div>
                )}

                {study.challenge && (
                  <div className="space-y-4">
                    <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                      What they came to us for
                    </h2>
                    {renderFormattedBlock(study.challenge)}
                  </div>
                )}

                {study.solution && (
                  <div className="space-y-4">
                    <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                      What we built together
                    </h2>
                    {renderFormattedBlock(study.solution)}
                  </div>
                )}
              </>
            )}

            {/* Customer Quote */}
            {study.quote && study.quote.text && (
              <div className="p-8 sm:p-10 rounded-[4px] bg-gradient-to-br from-[#0B1220] to-[#080E1E] border border-blue-500/20 relative space-y-4">
                <blockquote className="space-y-3">
                  <p className="font-space-grotesk text-xl sm:text-2xl text-[#F1F5F9] italic leading-relaxed">
                    &ldquo;{study.quote.text}&rdquo;
                  </p>
                  {(study.quote.author || study.quote.title) && (
                    <footer className="pt-4 border-t border-slate-400/10 space-y-3">
                      <div>
                        {study.quote.author && (
                          <div className="font-space-grotesk font-bold text-[#F1F5F9]">
                            {study.quote.author}
                          </div>
                        )}
                        {study.quote.title && (
                          <div className="text-xs font-jetbrains text-[#3B82F6]">
                            {study.quote.title}
                          </div>
                        )}
                      </div>
                      <div className="pt-3 border-t border-slate-400/10 flex flex-wrap items-center justify-between gap-2 text-xs font-jetbrains text-[#94A3B8]">
                        <span className="text-[#64748B]">Case Study Attribution</span>
                        <Link
                          href={`/authors/${authorSlug}`}
                          className="text-[#F1F5F9] hover:text-[#3B82F6] transition-colors font-medium inline-flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#3B82F6] rounded"
                          aria-label={`View author profile for ${authorName}`}
                        >
                          <User className="w-3.5 h-3.5 text-[#3B82F6]" />
                          <span>Researched by {authorName}</span>
                          <ArrowRight className="w-3 h-3 text-[#3B82F6]" />
                        </Link>
                      </div>
                    </footer>
                  )}
                </blockquote>
              </div>
            )}

            {/* Full Content / Outcomes / Life on TMIP */}
            {study.content && (
              <div className="space-y-6">
                {hasHtml ? (
                  <div
                    className="prose prose-invert max-w-none text-base sm:text-lg text-[#94A3B8] leading-relaxed [&>h2]:font-space-grotesk [&>h2]:text-2xl [&>h2]:sm:text-3xl [&>h2]:font-bold [&>h2]:text-[#F1F5F9] [&>h3]:font-space-grotesk [&>h3]:text-xl [&>h3]:sm:text-2xl [&>h3]:font-bold [&>h3]:text-[#F1F5F9] [&>p]:leading-relaxed [&>ul]:space-y-3 [&>ul]:pl-4 [&>ul]:border-l-2 [&>ul]:border-[#3B82F6]/40 [&>ul]:text-base [&>ul]:text-[#CBD5E1] [&>table]:w-full [&>table]:border-collapse [&>table]:border [&>table]:border-slate-400/20 [&>table_th]:border [&>table_th]:border-slate-400/20 [&>table_th]:p-3 [&>table_th]:bg-[#0B1220] [&>table_th]:text-[#F1F5F9] [&>table_td]:border [&>table_td]:border-slate-400/20 [&>table_td]:p-3 [&>table_td]:text-[#94A3B8]"
                    dangerouslySetInnerHTML={{ __html: study.content }}
                  />
                ) : (
                  renderFormattedBlock(study.content)
                )}
              </div>
            )}

            {/* Author Profile / Research Attribution Card */}
            <div className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <AuthorAvatar name={authorName} size="md" shape="circle" />
                <div>
                  <div className="text-[11px] font-jetbrains text-[#64748B] uppercase tracking-wider">
                    Author & Telemetry Research
                  </div>
                  <Link
                    href={`/authors/${authorSlug}`}
                    className="font-space-grotesk font-bold text-lg text-[#F1F5F9] hover:text-[#3B82F6] transition-colors inline-flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#3B82F6] rounded"
                    aria-label={`View author profile for ${authorName}`}
                  >
                    <span>{authorName}</span>
                  </Link>
                  <div className="text-xs text-[#94A3B8] font-jetbrains">
                    {authorRole} · Treel Mobility Solutions
                  </div>
                </div>
              </div>
              <Link
                href={`/authors/${authorSlug}`}
                className="text-xs font-jetbrains uppercase tracking-wider text-[#3B82F6] hover:text-[#60A5FA] transition-colors inline-flex items-center gap-1.5 shrink-0 self-start sm:self-center focus:outline-none focus:ring-1 focus:ring-[#3B82F6] rounded p-1"
                aria-label={`View full author profile for ${authorName}`}
              >
                <span>View Author Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Navigation & CTA Row */}
            <div className="pt-8 border-t border-slate-400/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href="/tmip/customers/case-studies"
                className="text-xs font-jetbrains uppercase tracking-wider text-[#3B82F6] hover:text-[#60A5FA] transition-colors flex items-center gap-1.5"
              >
                <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                <span>Back to all case studies</span>
              </Link>

              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative z-10 py-20 lg:py-24 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              See if TMIP fits your fleet.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              If your operating profile looks similar to this customer&apos;s, the outcomes tend to look similar too.
              Book a demo and our solutions engineering team will walk through your fleet payback math.
            </p>
            <div className="pt-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
