import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Cpu, Radio, BarChart3 } from "lucide-react";

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
      <section className="treel-hero relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-block font-mono text-xs uppercase tracking-widest text-[#D5573B] font-semibold bg-[#D5573B]/10 px-3 py-1 rounded-full border border-[#D5573B]/20">
              THE MOBILITY INTELLIGENCE COMPANY
            </div>
            <h1 className="font-fraunces text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FAF7F2] leading-[1.1]">
              Every vehicle <span className="italic text-[#D5573B]">a signal</span>.<br />
              Every signal an insight.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-2xl font-inter">
              Treel operates India's largest connected commercial vehicle dataset. Three product families, one Vehicle Digital Twin architecture, and a single mission: turn raw motion into operating intelligence.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4 font-inter">
              <Link
                href="/vehicle-digital-twin"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-[#D5573B] text-white font-medium hover:bg-[#CB4831] transition-all shadow-lg hover:shadow-[#D5573B]/20 group"
              >
                Explore the platform <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/research/roi-fleet-intelligence"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-lg bg-white/5 border border-white/10 text-[#FAF7F2] font-medium hover:bg-white/10 transition-all"
              >
                Read the ROI paper
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. METRICS BAND */}
      <section className="py-12 bg-[#0B0F14] border-b border-white/10 font-inter">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="border-l-2 border-[#D5573B] pl-4">
              <div className="font-fraunces text-3xl sm:text-4xl font-bold text-[#FAF7F2]">68K</div>
              <div className="text-xs text-[#94A3B8] mt-1 font-medium">Vehicles under active management</div>
            </div>
            <div className="border-l-2 border-[#3B82F6] pl-4">
              <div className="font-fraunces text-3xl sm:text-4xl font-bold text-[#FAF7F2]">200+</div>
              <div className="text-xs text-[#94A3B8] mt-1 font-medium">Enterprise fleet customers</div>
            </div>
            <div className="border-l-2 border-[#10B981] pl-4">
              <div className="font-fraunces text-3xl sm:text-4xl font-bold text-[#FAF7F2]">99.7%</div>
              <div className="text-xs text-[#94A3B8] mt-1 font-medium">Platform uptime, trailing 90 days</div>
            </div>
            <div className="border-l-2 border-[#F59E0B] pl-4">
              <div className="font-fraunces text-3xl sm:text-4xl font-bold text-[#FAF7F2]">9mo</div>
              <div className="text-xs text-[#94A3B8] mt-1 font-medium">Median payback across fleet class</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THREE PRODUCT FAMILIES */}
      <section className="py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-2xl mb-16">
            <div className="font-mono text-xs uppercase tracking-widest text-[#D5573B] font-semibold mb-3">
              THREE PRODUCT FAMILIES
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F2] tracking-tight">
              One architecture. Three audiences.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-4 leading-relaxed font-inter">
              Each product carries its own visual language, tone, and typography, calibrated for its audience. What binds them is the Motion Marks signature, the shared data infrastructure, and the operational DNA of Treel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: TMIP */}
            <Link
              href="/tmip"
              className="group p-8 rounded-2xl bg-[#050A17] border border-blue-900/30 hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-6">
                <div className="flex items-center">
                  <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                    <g fill="#3B82F6">
                      <rect x="5" y="4" width="90" height="9" rx="1.5" opacity="0.55" />
                      <rect x="5" y="16" width="90" height="9" rx="1.5" opacity="0.8" />
                      <rect x="5" y="28" width="90" height="9" rx="1.5" />
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="font-space-grotesk text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    TMIP
                  </div>
                  <div className="font-mono text-xs text-blue-400 font-semibold tracking-wider uppercase mt-1">
                    ENTERPRISE FLEET INTELLIGENCE
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed font-ibm-plex">
                  Vehicle Digital Twin platform for fleet operators with ten or more vehicles. Cost per kilometre, uptime, predicted maintenance, in one dashboard.
                </p>
              </div>
              <div className="pt-6 font-ibm-plex text-sm font-semibold text-blue-400 flex items-center group-hover:translate-x-1 transition-transform">
                Enter TMIP <span className="ml-1">→</span>
              </div>
            </Link>

            {/* Card 2: Suraksha */}
            <Link
              href="/suraksha"
              className="group p-8 rounded-2xl bg-[#FEF3C7] border border-[#DC2626]/20 hover:border-[#DC2626]/60 transition-all flex flex-col justify-between text-[#451A03]"
            >
              <div className="space-y-6">
                <div className="flex items-center">
                  <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                    <rect x="5" y="4" width="90" height="9" rx="1.5" fill="#DC2626" />
                    <rect x="5" y="16" width="90" height="9" rx="1.5" fill="#EA580C" />
                    <rect x="5" y="28" width="90" height="9" rx="1.5" fill="#DC2626" />
                  </svg>
                </div>
                <div>
                  <div className="font-anton text-3xl uppercase tracking-wider text-[#DC2626]">
                    Suraksha
                  </div>
                  <div className="font-rubik text-xs font-bold text-[#EA580C] uppercase tracking-wider mt-1">
                    OWNER-DRIVER SAFETY KIT
                  </div>
                </div>
                <p className="text-[#78350F] text-sm leading-relaxed font-rubik font-medium">
                  A ₹17,500 DIY tyre safety kit for India's owner-drivers. Safety, savings, simplicity. Six regional clusters, vernacular first, on the ground.
                </p>
              </div>
              <div className="pt-6 font-rubik text-sm font-bold text-[#DC2626] flex items-center group-hover:translate-x-1 transition-transform">
                Enter Suraksha <span className="ml-1">→</span>
              </div>
            </Link>

            {/* Card 3: Personal TPMS */}
            <Link
              href="/personal"
              className="group p-8 rounded-2xl bg-[#0B132B] border border-blue-500/20 hover:border-blue-400/50 transition-all flex flex-col justify-between text-slate-100"
            >
              <div className="space-y-6">
                <div className="flex items-center">
                  <svg viewBox="0 0 100 40" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                    <g fill="#2563EB">
                      <rect x="12" y="8" width="76" height="5" rx="1" />
                      <rect x="12" y="18" width="76" height="5" rx="1" />
                      <rect x="12" y="28" width="76" height="5" rx="1" />
                    </g>
                  </svg>
                </div>
                <div>
                  <div className="font-manrope text-2xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    Personal TPMS
                  </div>
                  <div className="font-manrope text-xs font-bold text-blue-400 uppercase tracking-wider mt-1">
                    CONSUMER VEHICLE SAFETY
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed font-manrope">
                  Real-time tyre pressure on your phone. Alerts before a puncture. Peace of mind before every drive. Fits any car or SUV.
                </p>
              </div>
              <div className="pt-6 font-manrope text-sm font-bold text-blue-400 flex items-center group-hover:translate-x-1 transition-transform">
                Enter Personal <span className="ml-1">→</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. THE COMPANY */}
      <section className="py-24 border-b border-white/10 font-inter">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="font-mono text-xs uppercase tracking-widest text-[#D5573B] font-semibold">
                THE COMPANY
              </div>
              <h2 className="font-fraunces text-3xl sm:text-4xl lg:text-5xl font-bold text-[#FAF7F2] tracking-tight leading-[1.15]">
                Built on a decade of tyre data. Rebuilt as mobility intelligence.
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Treel started with a tyre sensor. Today the same architecture operates as a full Vehicle Digital Twin across two hundred enterprise customers. The category has moved from monitoring components to reasoning about the vehicle. Treel is the company that moved it.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  href="/founder-note"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[#D5573B] text-white font-medium hover:bg-[#CB4831] transition-all group"
                >
                  Read the founder note <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/leadership"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-white/5 border border-white/10 text-[#FAF7F2] font-medium hover:bg-white/10 transition-all"
                >
                  Meet the team
                </Link>
              </div>
            </div>

            {/* Credibility Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded bg-[#D5573B]/10 flex items-center justify-center text-[#D5573B]">
                  <Radio className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl font-bold text-[#FAF7F2]">24 Hz</div>
                <div className="text-xs text-[#94A3B8]">High-frequency steer-axle telemetry</div>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6]">
                  <Cpu className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl font-bold text-[#FAF7F2]">IP69K</div>
                <div className="text-xs text-[#94A3B8]">Pressure-wash rated military sensors</div>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded bg-[#D5573B]/10 flex items-center justify-center text-[#D5573B]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl font-bold text-[#FAF7F2]">ARAI</div>
                <div className="text-xs text-[#94A3B8]">Commercial automotive standard certification</div>
              </div>
              <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="w-8 h-8 rounded bg-[#10B981]/10 flex items-center justify-center text-[#10B981]">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div className="font-fraunces text-2xl font-bold text-[#FAF7F2]">99.98%</div>
                <div className="text-xs text-[#94A3B8]">Cloud telemetry ingestion SLA</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. JK TYRE DISCLOSURE STRIP */}
      <section className="py-6 bg-[#0B0F14] border-b border-white/10 text-center font-inter text-xs text-[#94A3B8]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          A JK Tyre technology company · Treel Mobility Solutions Pvt. Ltd.
        </div>
      </section>
    </div>
  );
}
