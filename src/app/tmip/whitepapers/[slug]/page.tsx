import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "TMIP Whitepaper & Research Library",
  description:
    "Explore Treel's technical research, ROI analyses, and mobility intelligence papers for enterprise fleet operators.",
  alternates: {
    canonical: "https://treel.in/tmip/whitepapers",
  },
  openGraph: {
    title: "TMIP Whitepaper & Research Library",
    description:
      "Explore Treel's technical research, ROI analyses, and mobility intelligence papers for enterprise fleet operators.",
    url: "https://treel.in/tmip/whitepapers",
  },
};

export default function TmipWhitepapersSlugPage() {
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
      <section className="relative z-10 pt-24 pb-16 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-6">
            <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
              TMIP
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
            <Link href="/tmip/whitepapers" className="hover:text-[#F1F5F9] transition-colors">
              Whitepapers
            </Link>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-[2px] font-jetbrains text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20">
              RESEARCH ARCHIVE
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              TMIP Technical Papers & Research
            </h1>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex max-w-3xl">
              In-depth research and empirical findings on Vehicle Digital Twins, high-frequency IoT telemetry, and fleet
              payback economics.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Whitepapers Grid */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/tmip/whitepapers/roi-fleet-intelligence"
              className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 rounded-[2px] text-xs font-jetbrains text-blue-400 uppercase font-semibold">
                    ROI & PAYBACK
                  </span>
                  <span className="text-xs font-jetbrains text-[#94A3B8]">28 Pages</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  The Fleet ROI Paper — How TMIP customers reach payback in nine months
                </h3>
                <p className="text-sm text-[#94A3B8] font-ibm-plex leading-relaxed">
                  The economics of mobility intelligence deployment across 200+ enterprise fleets. Payback drivers and
                  unit cost savings.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6]">
                <span>Download whitepaper</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/insights/vehicle-digital-twins-architecture"
              className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 rounded-[2px] text-xs font-jetbrains text-blue-400 uppercase font-semibold">
                    VEHICLE DIGITAL TWIN
                  </span>
                  <span className="text-xs font-jetbrains text-[#94A3B8]">24 Pages</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  The Vehicle Digital Twin — Architecture and Applications
                </h3>
                <p className="text-sm text-[#94A3B8] font-ibm-plex leading-relaxed">
                  The technical paper behind TMIP&apos;s Vehicle Digital Twin architecture: data model, state layers, and
                  prediction pipelines.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6]">
                <span>Read technical paper</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/tmip/customers/case-studies/1000-truck-case-study"
              className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 rounded-[2px] text-xs font-jetbrains text-blue-400 uppercase font-semibold">
                    CASE STUDY
                  </span>
                  <span className="text-xs font-jetbrains text-[#94A3B8]">32 Pages</span>
                </div>
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  1,000 trucks. 12 months. What changed.
                </h3>
                <p className="text-sm text-[#94A3B8] font-ibm-plex leading-relaxed">
                  The full operational story of a large logistics fleet running TMIP for one year. Deployment timeline
                  and measured outcomes.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6]">
                <span>Read full report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative z-10 py-20">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-10 sm:p-14 rounded-[4px] bg-[#0B1220]/90 border border-blue-500/30 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Explore the TMIP Research Library
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-ibm-plex">
              Access all published technical papers, ROI models, and commercial case studies across multiple industry
              verticals.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/whitepapers"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[3px] font-semibold text-base transition-all shadow-md bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                <span>Browse Whitepapers</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
