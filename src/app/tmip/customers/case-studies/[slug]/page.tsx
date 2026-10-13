import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";
import { getCaseStudyBySlug, getPublishedCaseStudies } from "@/lib/content/casestudies-storage";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study || study.status === "Draft") {
    return {
      title: "Customer Case Studies · TMIP",
      description: "Explore how enterprise fleet operators run TMIP to reduce downtime and extend tyre life.",
    };
  }

  return {
    title: `${study.headline} · TMIP Case Study`,
    description: study.excerpt,
    alternates: {
      canonical: `https://treel.in/tmip/customers/case-studies/${study.slug}`,
    },
    openGraph: {
      title: `${study.headline} · TMIP Case Study`,
      description: study.excerpt,
      url: `https://treel.in/tmip/customers/case-studies/${study.slug}`,
    },
  };
}

export default async function TmipCustomersCaseStudiesSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  // If dynamic case study exists and is published, render its detailed study page
  if (study && study.status === "Published") {
    const results = study.results && study.results.length > 0 ? study.results : [
      {
        value: study.metricValue,
        label: study.metricLabel,
        delta: "Measured outcome",
        desc: study.excerpt,
      }
    ];

    return (
      <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
        {/* Subtle Blueprint Grid */}
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

              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                {study.excerpt}
              </p>
            </div>
          </div>
        </section>

        {/* Metrics Banner */}
        <section className="relative z-10 py-12 border-b border-slate-400/10 bg-[#050A17]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {results.map((res, i) => (
                <div key={i} className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-2">
                  <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#10B981]">{res.value}</div>
                  <div className="text-sm font-semibold text-[#F1F5F9] font-ibm-plex">{res.label}</div>
                  {res.delta && <div className="text-xs font-jetbrains text-[#3B82F6]">{res.delta}</div>}
                  {res.desc && <p className="text-xs text-[#94A3B8] pt-1 leading-relaxed font-ibm-plex">{res.desc}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Narrative & Details */}
        <section className="relative z-10 py-20 border-b border-slate-400/10">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <div className="max-w-4xl space-y-16">
              {study.customerProfile && (
                <div className="space-y-4">
                  <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Fleet Profile</h2>
                  <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                    {study.customerProfile}
                  </p>
                </div>
              )}

              {study.challenge && (
                <div className="space-y-4">
                  <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">The Operational Challenge</h2>
                  <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                    {study.challenge}
                  </p>
                </div>
              )}

              {study.solution && (
                <div className="space-y-4">
                  <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">The TMIP Solution</h2>
                  <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                    {study.solution}
                  </p>
                </div>
              )}

              {study.quote && (
                <div className="p-8 rounded-[4px] bg-[#080E1E] border-l-4 border-[#3B82F6] space-y-3">
                  <blockquote className="font-space-grotesk text-lg sm:text-xl text-[#F1F5F9] italic">
                    &ldquo;{study.quote.text}&rdquo;
                  </blockquote>
                  <cite className="block text-xs font-jetbrains text-[#3B82F6] not-italic uppercase tracking-wider">
                    — {study.quote.author}, {study.quote.title}
                  </cite>
                </div>
              )}

              {study.content && (
                <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex" dangerouslySetInnerHTML={{ __html: study.content }} />
              )}

              <div className="pt-8 border-t border-slate-400/10 flex items-center justify-between">
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
      </div>
    );
  }

  // Fallback: render directory archive
  const allStudies = await getPublishedCaseStudies();

  return (
    <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Subtle Blueprint Grid */}
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
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
              CASE STUDY ARCHIVE
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Enterprise Fleet Case Studies
            </h1>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-3xl font-ibm-plex">
              Proven outcomes from commercial deployments across India&apos;s leading logistics, transit, mining, and
              infrastructure fleets.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Case Studies Directory Grid */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allStudies.map((s) => (
              <Link
                key={s._id}
                href={`/tmip/customers/case-studies/${s.slug}`}
                className="p-8 rounded-[4px] bg-[#080E1E] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#3B82F6] uppercase font-semibold">
                      {s.industry}
                    </span>
                    <span className="text-xs font-jetbrains text-[#94A3B8]">{s.fleetSize}</span>
                  </div>
                  <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                    {s.headline}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                    {s.excerpt}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6] font-jetbrains">
                  Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative z-10 py-20 bg-[#050A17]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-10 sm:p-14 rounded-[4px] bg-gradient-to-br from-[#080E1E] to-[#0B1220] border border-blue-500/30 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              See if TMIP fits your fleet.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-ibm-plex">
              Book a live demo to explore how TMIP&apos;s Vehicle Digital Twin models reduce operating costs across your
              exact vehicle types and operating routes.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[3px] font-semibold text-base transition-all shadow-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
