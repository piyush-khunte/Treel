import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Activity, Truck, Car, Check, ChevronRight, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Treel Products · TMIP, Suraksha, Personal TPMS",
  description: "Three products from Treel Mobility Solutions: TMIP for enterprise fleets, Project Suraksha for owner-drivers, Personal TPMS for consumers. One architecture, three audiences.",
  alternates: {
    canonical: "https://treel.in/products",
  },
  openGraph: {
    title: "Treel Products · TMIP, Suraksha, Personal TPMS",
    description: "Three products from Treel Mobility Solutions: TMIP for enterprise fleets, Project Suraksha for owner-drivers, Personal TPMS for consumers. One architecture, three audiences.",
    url: "https://treel.in/products",
  },
};

export default function ProductsPage() {
  const comparisonRows = [
    {
      feature: "Target Audience",
      tmip: "Enterprise fleet operators",
      suraksha: "Owner-drivers & small fleet owners",
      personal: "Personal car, SUV & 2-wheeler owners",
    },
    {
      feature: "Fleet Size",
      tmip: "10 to 10,000+ commercial vehicles",
      suraksha: "1 to 5 commercial vehicles",
      personal: "Single vehicle / family garage",
    },
    {
      feature: "Pricing Model",
      tmip: "Enterprise SaaS contract",
      suraksha: "₹17,500 one-time kit (10-wheeler)",
      personal: "From ₹2,199 (2W) to ₹4,499 (4W)",
    },
    {
      feature: "Installation",
      tmip: "Managed depot deployment",
      suraksha: "15-minute DIY / Truck Wheels centre",
      personal: "10-minute DIY valve-stem install",
    },
    {
      feature: "Support & SLA",
      tmip: "Dedicated account team & 99.7% SLA",
      suraksha: "Toll-free 1800 + WhatsApp Vernacular",
      personal: "Consumer app support & warranty",
    },
    {
      feature: "Contract Terms",
      tmip: "Annual per-vehicle subscription",
      suraksha: "Zero subscription / One-time purchase",
      personal: "No recurring fees / Lifetime app access",
    },
    {
      feature: "Primary Interface",
      tmip: "Cloud Web Dashboard + REST APIs",
      suraksha: "Solar-powered in-cab display (No app required)",
      personal: "iOS & Android Bluetooth Mobile Apps",
    },
    {
      feature: "Telemetry Depth",
      tmip: "Full 5-Layer Vehicle Digital Twin",
      suraksha: "Sub-second blowout & pressure alerts",
      personal: "Real-time pressure & temperature sync",
    },
  ];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                PRODUCTS
              </span>
            </div>

            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Three products.<br />One architecture.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Treel operates three product families on one shared data infrastructure. Each carries its own visual language, tone, price point, and audience. All three share the Vehicle Digital Twin architecture, the sensor family, and the operational DNA that binds Treel together.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THREE PRODUCT ENTRY CARDS */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Card 1: TMIP */}
            <div className="p-8 sm:p-10 rounded-xl bg-[#0A0F1A] border border-[#00E5FF]/30 flex flex-col justify-between space-y-8 relative overflow-hidden group">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-[#00E5FF]/10 text-[#00E5FF] flex items-center justify-center">
                    <Activity className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 font-semibold tracking-wider">
                    ENTERPRISE FLEETS
                  </span>
                </div>

                <div>
                  <h3 className="font-fraunces text-2xl sm:text-3xl font-medium text-white">
                    TMIP Platform
                  </h3>
                  <div className="text-xs font-mono text-[#00E5FF] tracking-wider uppercase mt-1">
                    Enterprise Fleet Intelligence
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-inter">
                  The Vehicle Digital Twin platform for fleet operators. Cost per kilometre, uptime, predicted maintenance, and seamless integrations with your existing ERP or FMS stack.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/tmip"
                  className="inline-flex items-center justify-between w-full p-3.5 rounded-lg bg-[#00E5FF] text-[#0A0F1A] font-semibold text-sm hover:bg-[#00C2D6] transition-colors shadow-sm"
                >
                  <span>Enter TMIP</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: Suraksha */}
            <div className="p-8 sm:p-10 rounded-xl bg-[#1C160C] border border-[#F59E0B]/30 flex flex-col justify-between space-y-8 relative overflow-hidden group">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 text-[#F59E0B] flex items-center justify-center">
                    <Truck className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20 font-semibold tracking-wider">
                    COMMERCIAL DRIVERS
                  </span>
                </div>

                <div>
                  <h3 className="font-fraunces text-2xl sm:text-3xl font-medium text-white">
                    Project Suraksha
                  </h3>
                  <div className="text-xs font-mono text-[#F59E0B] tracking-wider uppercase mt-1">
                    Owner-Driver Safety Kit
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-inter">
                  ₹17,500 DIY tyre safety kit for India&apos;s owner-drivers. Solar cab display, voice alerts in 6 languages, 15-minute install, and 9-month ROI. No app or monthly fees.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/suraksha"
                  className="inline-flex items-center justify-between w-full p-3.5 rounded-lg bg-[#F59E0B] text-[#18181B] font-bold text-sm hover:bg-[#D97706] transition-colors shadow-sm uppercase tracking-wide"
                >
                  <span>Enter Suraksha</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3: Personal TPMS */}
            <div className="p-8 sm:p-10 rounded-xl bg-[#0D1527] border border-[#3B82F6]/30 flex flex-col justify-between space-y-8 relative overflow-hidden group">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
                    <Car className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold tracking-wider">
                    CONSUMER MOTORISTS
                  </span>
                </div>

                <div>
                  <h3 className="font-fraunces text-2xl sm:text-3xl font-medium text-white">
                    Personal TPMS
                  </h3>
                  <div className="text-xs font-mono text-blue-400 tracking-wider uppercase mt-1">
                    Consumer Vehicle Safety
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed font-inter">
                  Real-time tyre pressure on your phone. Alerts before a puncture. ±0.5 PSI accuracy, 2-year battery life, and 10-minute setup. Fits any car, SUV, or motorbike.
                </p>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Link
                  href="/personal"
                  className="inline-flex items-center justify-between w-full p-3.5 rounded-lg bg-[#2563EB] text-white font-semibold text-sm hover:bg-[#1D4ED8] transition-colors shadow-sm"
                >
                  <span>Enter Personal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPARISON MATRIX TABLE */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
              SPECIFICATIONS
            </span>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Side-by-side product comparison
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Compare capabilities, commercial models, and technical architectures across Treel&apos;s product portfolio.
            </p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.04] text-xs font-mono uppercase tracking-wider text-[#FAF7F2]">
                  <th className="py-4 px-6 font-semibold w-1/4">Feature</th>
                  <th className="py-4 px-6 font-semibold w-1/4 text-[#00E5FF]">TMIP</th>
                  <th className="py-4 px-6 font-semibold w-1/4 text-[#F59E0B]">Suraksha</th>
                  <th className="py-4 px-6 font-semibold w-1/4 text-blue-400">Personal TPMS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm font-inter text-[#CBD5E1]">
                {comparisonRows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-6 font-mono text-xs text-[#94A3B8] font-medium">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6">
                      {row.tmip}
                    </td>
                    <td className="py-4 px-6">
                      {row.suraksha}
                    </td>
                    <td className="py-4 px-6">
                      {row.personal}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. GUIDANCE & ADVISORY CTA */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                RECOMMENDATION
              </span>
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Find the right product for your situation.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              If you run a fleet of ten or more vehicles, look at TMIP. If you own between one and five trucks, look at Suraksha. If you want tyre safety for your car or SUV, look at Personal TPMS.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]"
              >
                <span>Talk to us and we will help</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}