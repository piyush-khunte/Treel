import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Radio, Cpu, ShieldCheck, BarChart3 } from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";

export const metadata: Metadata = {
  title: "Treel · The Mobility Intelligence Company",
  description: "Treel operates India's largest connected commercial vehicle dataset. Three product families, one Vehicle Digital Twin architecture. Turn raw motion into operating intelligence.",
  alternates: {
    canonical: "https://treel.in/",
  },
  openGraph: {
    title: "Treel · The Mobility Intelligence Company",
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
      <section className="relative overflow-hidden pt-[100px] pb-[80px] lg:pt-[140px] lg:pb-[100px] border-b border-white/10 min-h-[calc(100vh-140px)] flex items-center">
        {/* Subtle Treel Red ambient radial glow */}
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.15) 0%, transparent 65%)" }}
          aria-hidden="true"
        />

        <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-[80px] items-center">
            {/* Left Column: Typography & CTAs */}
            <div>
              <div className="font-inter text-[12px] font-semibold tracking-[0.25em] uppercase text-[#D5573B] mb-6 sm:mb-8">
                THE MOBILITY INTELLIGENCE COMPANY
              </div>

              <h1 className="font-fraunces text-5xl sm:text-7xl lg:text-[80px] xl:text-[88px] font-medium tracking-[-0.03em] text-[#FAF7F2] leading-[0.98] mb-6 sm:mb-8">
                Every vehicle <span className="italic text-[#D5573B] font-normal" style={{ fontVariationSettings: '"opsz" 144' }}>a signal</span>.<br />
                Every signal an insight.
              </h1>

              <p className="font-fraunces text-lg sm:text-[22px] font-normal leading-[1.45] text-[#94A3B8] mb-8 sm:mb-10 max-w-[560px]">
                Treel operates India's largest connected commercial vehicle dataset. Three product families, one Vehicle Digital Twin architecture, and a single mission: turn raw motion into operating intelligence.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/vehicle-digital-twin"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all group shadow-sm"
                >
                  Explore the platform <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/research/roi-fleet-intelligence"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-[4px] border border-[#94A3B8]/30 hover:border-[#D5573B] text-[#FAF7F2] font-medium text-sm transition-all"
                >
                  Read the ROI paper
                </Link>
              </div>
            </div>

            {/* Right Column: Treel Signature Visual */}
            <div className="hidden lg:flex justify-center items-center p-6 xl:p-10">
              <TreelSignature variant="hero" />
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
              <div className="font-jetbrains font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8] leading-relaxed">Vehicles under active management</div>
            </div>
            <div className="border-l-2 border-[#D5573B] pl-5">
              <div className="font-fraunces text-4xl sm:text-5xl lg:text-[48px] font-medium text-[#FAF7F2] tracking-[-0.03em] leading-none mb-2.5">200+</div>
              <div className="font-jetbrains font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8] leading-relaxed">Enterprise fleet customers</div>
            </div>
            <div className="border-l-2 border-[#D5573B] pl-5">
              <div className="font-fraunces text-4xl sm:text-5xl lg:text-[48px] font-medium text-[#FAF7F2] tracking-[-0.03em] leading-none mb-2.5">99.7%</div>
              <div className="font-jetbrains font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8] leading-relaxed">Platform uptime, trailing 90 days</div>
            </div>
            <div className="border-l-2 border-[#D5573B] pl-5">
              <div className="font-fraunces text-4xl sm:text-5xl lg:text-[48px] font-medium text-[#FAF7F2] tracking-[-0.03em] leading-none mb-2.5">9mo</div>
              <div className="font-jetbrains font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8] leading-relaxed">Median payback across fleet class</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE PRODUCT FAMILIES */}
      <section className="py-20 sm:py-28 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mb-14 sm:mb-16">
            <div className="font-jetbrains font-mono text-[11px] font-medium tracking-[0.15em] uppercase text-[#D5573B] mb-3">
              THREE PRODUCT FAMILIES
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-[52px] font-medium text-[#FAF7F2] tracking-tight leading-[1.05] mb-4">
              One architecture. Three audiences.
            </h2>
            <p className="font-fraunces text-lg sm:text-xl font-normal leading-[1.45] text-[#94A3B8] italic">
              Each product carries its own visual language, tone, and typography, calibrated for its audience. What binds them is the Motion Marks signature, the shared data infrastructure, and the operational DNA of Treel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Card 1: TMIP */}
            <Link
              href="/tmip"
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
                  <div className="font-jetbrains font-mono text-[10px] text-[#64748B] tracking-[0.12em] uppercase mt-1.5">
                    ENTERPRISE FLEET INTELLIGENCE
                  </div>
                </div>
                <p className="text-[#CBD5E1] text-sm leading-[1.6] font-inter">
                  Vehicle Digital Twin platform for fleet operators with ten or more vehicles. Cost per kilometre, uptime, predicted maintenance, in one dashboard.
                </p>
              </div>
              <div className="pt-8 font-inter text-[13px] font-semibold text-[#D5573B] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Enter TMIP <span className="ml-1">→</span>
              </div>
            </Link>

            {/* Card 2: Suraksha */}
            <Link
              href="/suraksha"
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
                  <div className="font-jetbrains font-mono text-[10px] text-[#64748B] tracking-[0.12em] uppercase mt-1.5">
                    OWNER-DRIVER SAFETY KIT
                  </div>
                </div>
                <p className="text-[#CBD5E1] text-sm leading-[1.6] font-inter">
                  A ₹17,500 DIY tyre safety kit for India's owner-drivers. Safety, savings, simplicity. Six regional clusters, vernacular first, on the ground.
                </p>
              </div>
              <div className="pt-8 font-inter text-[13px] font-semibold text-[#D5573B] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                Enter Suraksha <span className="ml-1">→</span>
              </div>
            </Link>

            {/* Card 3: Personal TPMS */}
            <Link
              href="/personal"
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
                  <div className="font-jetbrains font-mono text-[10px] text-[#64748B] tracking-[0.12em] uppercase mt-1.5">
                    CONSUMER VEHICLE SAFETY
                  </div>
                </div>
                <p className="text-[#CBD5E1] text-sm leading-[1.6] font-inter">
                  Real-time tyre pressure on your phone. Alerts before a puncture. Peace of mind before every drive. Fits any car or SUV.
                </p>
              </div>
              <div className="pt-8 font-inter text-[13px] font-semibold text-[#D5573B] inline-flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
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
              <div className="font-jetbrains font-mono text-[11px] font-medium tracking-[0.15em] uppercase text-[#D5573B]">
                THE COMPANY
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-[48px] font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                Built on a decade of tyre data. Rebuilt as mobility intelligence.
              </h2>
              <p className="font-fraunces text-lg sm:text-xl font-normal leading-[1.45] text-[#94A3B8] italic">
                Treel started with a tyre sensor. Today the same architecture operates as a full Vehicle Digital Twin across two hundred enterprise customers. The category has moved from monitoring components to reasoning about the vehicle. Treel is the company that moved it.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/founder-note"
                  className="inline-flex items-center justify-center px-7 py-3.5 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all group shadow-sm"
                >
                  Read the founder note <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/leadership"
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
                <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">24 Hz</div>
                <div className="font-jetbrains font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">High-frequency steer-axle telemetry</div>
              </div>
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-2 hover:border-white/20 transition-all">
                <div className="w-8 h-8 rounded bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">IP69K</div>
                <div className="font-jetbrains font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">Pressure-wash rated military sensors</div>
              </div>
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-2 hover:border-white/20 transition-all">
                <div className="w-8 h-8 rounded bg-[#D5573B]/10 flex items-center justify-center text-[#D5573B]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">ARAI</div>
                <div className="font-jetbrains font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">Commercial automotive standard certification</div>
              </div>
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-2 hover:border-white/20 transition-all">
                <div className="w-8 h-8 rounded bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">99.98%</div>
                <div className="font-jetbrains font-mono text-[11px] uppercase tracking-[0.08em] text-[#94A3B8]">Cloud telemetry ingestion SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CORPORATE DISCLOSURE STRIP */}
      <section className="py-6 bg-[#0B0F14] border-b border-white/10 text-center font-jetbrains font-mono text-xs uppercase tracking-[0.1em] text-[#64748B]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          Treel Mobility Solutions Pvt. Ltd.
        </div>
      </section>
    </div>
  );
}
