import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Clock, ShieldCheck, Truck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Customer Case Studies · TMIP",
  description:
    "Explore how enterprise fleet operators across logistics, passenger transport, mining, and construction run TMIP to reduce downtime, extend tyre life, and optimize fuel efficiency.",
  alternates: {
    canonical: "https://treel.in/tmip/customers/case-studies",
  },
  openGraph: {
    title: "Customer Case Studies · TMIP",
    description:
      "Explore how enterprise fleet operators across logistics, passenger transport, mining, and construction run TMIP to reduce downtime, extend tyre life, and optimize fuel efficiency.",
    url: "https://treel.in/tmip/customers/case-studies",
  },
};

export default function TmipCustomersCaseStudiesSlugPage() {
  return (
    <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Subtle Blueprint Grid: 60px x 60px rgba(59,130,246,0.04) */}
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-jetbrains text-xs tracking-wider uppercase font-semibold">
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
            <Link
              href="/tmip/customers/case-studies/1000-truck-case-study"
              className="p-8 rounded-[4px] bg-[#080E1E] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#3B82F6] uppercase font-semibold">
                    LOGISTICS
                  </span>
                  <span className="text-xs font-jetbrains text-[#94A3B8]">1,000 Trucks</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  1,000 trucks. 12 months. What changed.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  5.2% fuel savings, 6.8% tyre life extension, and 34% downtime reduction across pan-India linehaul routes.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6] font-jetbrains">
                Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/tmip/customers/case-studies/open-cast-haulage-analytics"
              className="p-8 rounded-[4px] bg-[#080E1E] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#3B82F6] uppercase font-semibold">
                    MINING
                  </span>
                  <span className="text-xs font-jetbrains text-[#94A3B8]">Rigid Dump Trucks</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  Preventing high-tonnage dumper downtime in mining pits.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  99.4% haul fleet availability and ₹2.1 Cr savings in central India mining corridors.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6] font-jetbrains">
                Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/tmip/customers/case-studies/cold-chain-express-transit"
              className="p-8 rounded-[4px] bg-[#080E1E] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#3B82F6] uppercase font-semibold">
                    COLD CHAIN
                  </span>
                  <span className="text-xs font-jetbrains text-[#94A3B8]">320 Reefers</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  Protecting perishable pharmaceutical corridors.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  Zero roadside cargo spoilage events and ₹1.4 Cr saved annually with synchronized sensor telemetry.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6] font-jetbrains">
                Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/tmip/customers/case-studies/intercity-passenger-express"
              className="p-8 rounded-[4px] bg-[#080E1E] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#3B82F6] uppercase font-semibold">
                    PASSENGER TRANSPORT
                  </span>
                  <span className="text-xs font-jetbrains text-[#94A3B8]">650 Coaches</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  Eliminating high-speed tyre failures on expressways.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  Zero roadside blowouts in 18 months across high-speed western expressway corridors.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6] font-jetbrains">
                Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/tmip/customers/case-studies/quarry-transit-tippers"
              className="p-8 rounded-[4px] bg-[#080E1E] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#3B82F6] uppercase font-semibold">
                    CONSTRUCTION
                  </span>
                  <span className="text-xs font-jetbrains text-[#94A3B8]">280 Tippers</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  Extending tipper tyre life in severe quarry routes.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  14% lower scrap rate and 31% downtime reduction across harsh highway paving contracts.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6] font-jetbrains">
                Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/tmip/customers/case-studies/oem-pre-delivery-intelligence"
              className="p-8 rounded-[4px] bg-[#080E1E] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#3B82F6] uppercase font-semibold">
                    OEM
                  </span>
                  <span className="text-xs font-jetbrains text-[#94A3B8]">2,000+ Vehicles</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  Tier-1 OEM factory integration delivering smart fleets.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  Pre-configured factory telematics delivering zero-lag vehicle digital twins on Day 1.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6] font-jetbrains">
                Read case study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
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
