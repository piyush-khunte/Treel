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
    <div className="bg-[#050A17] text-[#F1F5F9] font-ibm">
      {/* Header & Breadcrumb */}
      <section className="pt-24 pb-16 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <nav className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] mb-6">
            <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
              TMIP
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link href="/tmip/whitepapers" className="hover:text-[#F1F5F9] transition-colors">
              Whitepapers
            </Link>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-full text-xs font-mono text-[#3B82F6] uppercase tracking-widest font-semibold">
              RESEARCH ARCHIVE
            </div>

            <h1 className="font-space text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              TMIP Technical Papers & Research
            </h1>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-3xl">
              In-depth research and empirical findings on Vehicle Digital Twins, high-frequency IoT telemetry, and fleet
              payback economics.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Whitepapers Grid */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/tmip/whitepapers/roi-fleet-intelligence"
              className="p-8 rounded-2xl bg-[#080E1E] border border-white/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-2.5 py-0.5 rounded-full text-xs font-mono text-[#3B82F6] uppercase font-semibold">
                    ROI & PAYBACK
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">28 Pages</span>
                </div>
                <h3 className="font-space text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  The Fleet ROI Paper — How TMIP customers reach payback in nine months
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  The economics of mobility intelligence deployment across 200+ enterprise fleets. Payback drivers and
                  unit cost savings.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6]">
                Download whitepaper <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/insights/vehicle-digital-twins-architecture"
              className="p-8 rounded-2xl bg-[#080E1E] border border-white/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-2.5 py-0.5 rounded-full text-xs font-mono text-[#3B82F6] uppercase font-semibold">
                    VEHICLE DIGITAL TWIN
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">24 Pages</span>
                </div>
                <h3 className="font-space text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  The Vehicle Digital Twin — Architecture and Applications
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  The technical paper behind TMIP&apos;s Vehicle Digital Twin architecture: data model, state layers, and
                  prediction pipelines.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6]">
                Read technical paper <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              href="/tmip/customers/case-studies/1000-truck-case-study"
              className="p-8 rounded-2xl bg-[#080E1E] border border-white/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-2.5 py-0.5 rounded-full text-xs font-mono text-[#3B82F6] uppercase font-semibold">
                    CASE STUDY
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">32 Pages</span>
                </div>
                <h3 className="font-space text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  1,000 trucks. 12 months. What changed.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  The full operational story of a large logistics fleet running TMIP for one year. Deployment timeline
                  and measured outcomes.
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold text-[#3B82F6]">
                Read full report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#080E1E] to-[#0B1220] border border-white/10 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Explore the TMIP Research Library
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Access all published technical papers, ROI models, and commercial case studies across multiple industry
              verticals.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/whitepapers"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Browse Whitepapers <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
