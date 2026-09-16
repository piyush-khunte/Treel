import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Rss, Layers, Clock, FileText } from "lucide-react";
import { InsightsClient } from "./insights-client";

export const metadata: Metadata = {
  title: "TMIP Insights  ·  Treel",
  description:
    "TMIP-specific insights: product deep-dives, deployment lessons, fleet analytics techniques, and commentary from Treel's engineering and operations team.",
  alternates: {
    canonical: "https://treel.in/tmip/insights",
  },
  openGraph: {
    title: "TMIP Insights  ·  Treel",
    description:
      "TMIP-specific insights: product deep-dives, deployment lessons, fleet analytics techniques, and commentary from Treel's engineering and operations team.",
    url: "https://treel.in/tmip/insights",
  },
};

export default function TmipInsightsPage() {
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

      {/* Hero (Featured Article) */}
      <section className="relative z-10 pt-24 pb-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#3B82F6] text-white text-[11px] font-jetbrains font-bold px-2.5 py-0.5 rounded-[2px] uppercase tracking-wider">
                FEATURED
              </span>
              <span className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
                FLEET ANALYTICS
              </span>
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              The Fleet ROI Paper — How TMIP customers reach payback in nine months
            </h1>

            <p className="text-base sm:text-xl text-[#94A3B8] leading-relaxed font-ibm-plex max-w-3xl">
              An empirical analysis of fleet economics across 200 enterprises and 68,000+ assets. How vehicle digital twin
              telemetry correlates tyre pressure disciplines directly to 5.2% fuel savings and full capital payback.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-jetbrains text-[#94A3B8] pt-2">
              <span>By Treel Research &amp; Analytics</span>
              <span>·</span>
              <span>October 2026</span>
              <span>·</span>
              <span className="flex items-center gap-1 text-[#F1F5F9]">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                12 min read
              </span>
            </div>

            <div className="pt-4">
              <Link
                href="/tmip/whitepapers/roi-fleet-intelligence"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                <span>Read the paper</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Category Filter & Grid */}
      <section className="relative z-10 py-20 lg:py-24 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <InsightsClient />
        </div>
      </section>

      {/* Section · Related Content Strip & RSS */}
      <section className="relative z-10 py-20 lg:py-24 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space-grotesk text-3xl font-bold tracking-tight text-[#F1F5F9]">
              More Research from Treel
            </h2>
            <p className="text-base text-[#94A3B8] font-ibm-plex">
              Explore our technical whitepapers or read how peer fleet directors transformed their operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">Read our whitepapers</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  Deep-dive empirical papers on vehicle digital twin architectures, tyre economics, and capital allocation.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/tmip/whitepapers"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:text-white transition-colors"
                >
                  <span>Explore whitepapers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-[3px] bg-[#F59E0B]/10 border border-[#F59E0B]/20 flex items-center justify-center text-[#F59E0B]">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">See customer case studies</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">
                  Read full case studies from logistics, passenger, and mining fleets detailing measured outcomes and
                  ROI.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/tmip/customers/case-studies"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:text-white transition-colors"
                >
                  <span>View case studies</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* RSS Link Strip */}
          <div className="p-6 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Rss className="w-5 h-5 text-[#F59E0B]" />
              <span className="text-sm text-[#CBD5E1] font-ibm-plex">
                Prefer RSS? Subscribe to TMIP platform updates and research releases.
              </span>
            </div>
            <Link
              href="/tmip/insights/rss.xml"
              className="px-4 py-2 rounded-[3px] bg-white/[0.04] border border-slate-400/20 text-xs font-jetbrains text-[#F1F5F9] hover:bg-[#3B82F6] hover:border-[#3B82F6] transition-all flex items-center gap-1.5"
            >
              <span>Subscribe via RSS</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}