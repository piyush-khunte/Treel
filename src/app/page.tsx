import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Radio, Cpu, ShieldCheck, BarChart3 } from "lucide-react";
import { TreelHeroVisual } from "@/components/home/treel-hero-visual";
import { ExplorePlatformVideoModal } from "@/components/home/explore-platform-video-modal";

export const metadata: Metadata = {
  title: "Treel — Mobility Intelligence & Vehicle Digital Twin",
  description: "Treel operates India's largest connected commercial vehicle dataset. Three product families, one Vehicle Digital Twin architecture. Turn raw motion into operating intelligence.",
  alternates: {
    canonical: "https://treel.in/",
  },
  openGraph: {
    title: "Treel — Mobility Intelligence & Vehicle Digital Twin",
    description: "Treel operates India's largest connected commercial vehicle dataset. Three product families, one Vehicle Digital Twin architecture. Turn raw motion into operating intelligence.",
    url: "https://treel.in/",
    images: [{ url: "/images/og/treel-og.jpg", width: 1200, height: 630, alt: "Treel Mobility Intelligence" }],
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Treel",
    "alternateName": "Treel Mobility Solutions Private Limited",
    "url": "https://treel.in",
    "foundingDate": "2018-04-12",
    "description": "Treel operates India's largest connected commercial vehicle dataset. Three product families, one Vehicle Digital Twin architecture."
  };

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-5 pb-8 sm:pt-14 sm:pb-20 lg:pt-[120px] lg:pb-[100px] border-b border-white/10 min-h-0 lg:min-h-[calc(100vh-140px)] flex items-center">
        {/* Subtle Treel Red ambient radial glow */}
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.15) 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 sm:gap-12 lg:gap-[80px] items-center">
            {/* Left Column: Typography & CTAs */}
            <div>
              <div className="font-inter text-[12px] font-semibold tracking-[0.25em] uppercase text-[#D5573B] mb-3 sm:mb-8">
                THE MOBILITY INTELLIGENCE COMPANY
              </div>

              <h1
                suppressHydrationWarning
                className="font-fraunces text-[32px] sm:text-5xl lg:text-[76px] xl:text-[84px] font-medium tracking-[-0.03em] text-[#FAF7F2] leading-[1.08] sm:leading-[0.98] mb-3.5 sm:mb-8"
              >
                <span suppressHydrationWarning>{"Turn Every Vehicle into "}</span>
                <span
                  suppressHydrationWarning
                  className="italic text-[#D5573B] font-normal opsz-144"
                >
                  Operating Intelligence
                </span>
              </h1>

              <p className="font-fraunces text-base sm:text-xl font-normal leading-[1.4] text-[#94A3B8] mb-4 sm:mb-10 max-w-[560px]">
                Treel operates India's largest connected commercial vehicle dataset. Three product families, one architecture, and a single mission: turn raw motion into operating intelligence.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <ExplorePlatformVideoModal />
              </div>
            </div>

            {/* Right Column: Treel Product Ecosystem Motion Visual */}
            <div className="w-full flex justify-center items-center mt-4 lg:mt-0">
              <TreelHeroVisual />
            </div>
          </div>
        </div>
      </section>

      {/* 2. METRICS BAND */}
      <section className="py-16 sm:py-20 bg-[#D5573B]/[0.03] border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            <div className="border-l-2 border-[#D5573B] pl-5">
              <div className="font-fraunces text-4xl sm:text-5xl lg:text-[48px] font-medium text-[#FAF7F2] tracking-[-0.03em] leading-none mb-2.5">68K</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8] leading-relaxed">Vehicles under active management</div>
            </div>
            <div className="border-l-2 border-[#D5573B] pl-5">
              <div className="font-fraunces text-4xl sm:text-5xl lg:text-[48px] font-medium text-[#FAF7F2] tracking-[-0.03em] leading-none mb-2.5">200+</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8] leading-relaxed">Enterprise fleet customers</div>
            </div>
            <div className="border-l-2 border-[#D5573B] pl-5">
              <div className="font-fraunces text-4xl sm:text-5xl lg:text-[48px] font-medium text-[#FAF7F2] tracking-[-0.03em] leading-none mb-2.5">99.7%</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8] leading-relaxed">Platform uptime, trailing 90 days</div>
            </div>
            <div className="border-l-2 border-[#D5573B] pl-5">
              <div className="font-fraunces text-4xl sm:text-5xl lg:text-[48px] font-medium text-[#FAF7F2] tracking-[-0.03em] leading-none mb-2.5">9–12 mo</div>
              <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8] leading-relaxed">Median payback (varies by application &amp; fleet operation)</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE PRODUCT FAMILIES */}
      <section className="py-20 sm:py-28 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-14 sm:mb-16">
            <div className="font-mono text-[11px] font-medium tracking-[0.15em] uppercase text-[#D5573B] mb-3">
              THREE PRODUCT FAMILIES
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-[52px] font-medium text-[#FAF7F2] tracking-tight leading-[1.05] mb-4">
              One architecture. Three audiences.
            </h2>
            <p className="font-fraunces text-lg sm:text-xl font-normal leading-[1.45] text-[#94A3B8]">
              Today Treel operates three product families on one shared data infrastructure. All three share the Vehicle Digital Twin architecture, the sensor family, and the operational DNA that binds Treel together.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: TMIP */}
            <Link prefetch={false} href="/tmip"
              className="group p-8 sm:p-10 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="h-10 flex items-center">
                  <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                    <g fill="#3B82F6">
                      <rect x="5" y="4" width="90" height="9" rx="1.5" opacity="0.55" />
                      <rect x="5" y="16" width="90" height="9" rx="1.5" opacity="0.8" />
                      <rect x="5" y="28" width="90" height="9" rx="1.5" />
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="font-fraunces text-2xl sm:text-[32px] font-medium text-[#FAF7F2] tracking-[-0.02em]">
                    TMIP
                  </div>
                  <div className="font-mono text-[10px] text-[#94A3B8] tracking-[0.12em] uppercase mt-1.5">
                    ENTERPRISE FLEET INTELLIGENCE
                  </div>
                </div>
                <p className="text-[#CBD5E1] text-sm leading-[1.6] font-inter">
                  Vehicle Digital Twin platform for fleet operators with ten or more vehicles. Uptime, predicted maintenance, in one dashboard.
                </p>
              </div>
              <div className="pt-8 font-inter text-[13px] font-semibold text-[#E26D54] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Enter TMIP <span className="ml-1">→</span>
              </div>
            </Link>

            {/* Card 2: Suraksha */}
            <Link prefetch={false} href="/suraksha"
              className="group p-8 sm:p-10 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="h-10 flex items-center">
                  <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                    <rect x="5" y="4" width="90" height="9" rx="1.5" fill="#DC2626" />
                    <rect x="5" y="16" width="90" height="9" rx="1.5" fill="#EA580C" />
                    <rect x="5" y="28" width="90" height="9" rx="1.5" fill="#DC2626" />
                  </svg>
                </div>
                <div>
                  <div className="font-fraunces text-2xl sm:text-[32px] font-medium text-[#FAF7F2] tracking-[-0.02em]">
                    Suraksha
                  </div>
                  <div className="font-mono text-[10px] text-[#94A3B8] tracking-[0.12em] uppercase mt-1.5">
                    OWNER-DRIVER SAFETY KIT
                  </div>
                </div>
                <p className="text-[#CBD5E1] text-sm leading-[1.6] font-inter">
                  A DIY tyre safety kit for India's owner-drivers. Safety, savings, simplicity.
                </p>
              </div>
              <div className="pt-8 font-inter text-[13px] font-semibold text-[#E26D54] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Enter Suraksha <span className="ml-1">→</span>
              </div>
            </Link>

            {/* Card 3: Personal TPMS */}
            <Link prefetch={false} href="/personal"
              className="group p-8 sm:p-10 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="h-10 flex items-center">
                  <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                    <g fill="#2563EB">
                      <rect x="12" y="8" width="76" height="5" rx="1" />
                      <rect x="12" y="18" width="76" height="5" rx="1" />
                      <rect x="12" y="28" width="76" height="5" rx="1" />
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="font-fraunces text-2xl sm:text-[32px] font-medium text-[#FAF7F2] tracking-[-0.02em]">
                    Personal TPMS
                  </div>
                  <div className="font-mono text-[10px] text-[#94A3B8] tracking-[0.12em] uppercase mt-1.5">
                    CONSUMER VEHICLE SAFETY
                  </div>
                </div>
                <p className="text-[#CBD5E1] text-sm leading-[1.6] font-inter">
                  Real-time tyre pressure on your phone, vehicle infotainment screen, or dedicated display. Alerts before a puncture. Peace of mind before every drive. Fits any car or two-wheeler.
                </p>
              </div>
              <div className="pt-8 font-inter text-[13px] font-semibold text-[#E26D54] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Enter Personal <span className="ml-1">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. THE COMPANY */}
      <section className="py-20 sm:py-28 border-b border-white/10 font-inter">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Narrative */}
            <div className="space-y-6">
              <div className="font-mono text-[11px] font-medium tracking-[0.15em] uppercase text-[#D5573B]">
                THE COMPANY
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-[48px] font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                Mobility Intelligence Built on Data from 2 Million+ Tyres.
              </h2>
              <p className="font-fraunces text-lg sm:text-xl font-normal leading-[1.45] text-[#94A3B8] italic">
                Treel is a pioneer in delivering a 360-degree view of connected vehicle telemetry, transforming data from over 2 million tyres into operational analysis that drives daily fleet performance and safety. The category has moved from monitoring components to reasoning about the vehicle. Treel is the company that moved it.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link prefetch={false} href="/founder-note"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-[4px] bg-[#C64529] text-white font-semibold text-sm hover:bg-[#B53D23] transition-all group shadow-sm"
                >
                  Read the founder note <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link prefetch={false} href="/leadership"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-[4px] border border-[#94A3B8]/30 hover:border-[#D5573B] text-[#FAF7F2] font-medium text-sm transition-all"
                >
                  Meet the team
                </Link>
              </div>
            </div>

            {/* Right Column: Credibility Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-2 hover:border-white/20 transition-all">
                <div className="w-8 h-8 rounded bg-[#D5573B]/10 flex items-center justify-center text-[#D5573B]">
                  <Radio className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">30 Million</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">Data points per day captured on platform</div>
              </div>
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-2 hover:border-white/20 transition-all">
                <div className="w-8 h-8 rounded bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">70+ Critical Alerts</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">Sent on average per day which could have been hazardous</div>
              </div>
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-2 hover:border-white/20 transition-all">
                <div className="w-8 h-8 rounded bg-[#D5573B]/10 flex items-center justify-center text-[#D5573B]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">ARAI</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">Commercial automotive standard certification</div>
              </div>
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-2 hover:border-white/20 transition-all">
                <div className="w-8 h-8 rounded bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">99.98%</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">Cloud telemetry ingestion SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORPORATE DISCLOSURE STRIP */}
      
    </div>
  );
}
