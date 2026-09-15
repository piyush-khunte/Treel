import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { WhitepapersClient } from "./whitepapers-client";

export const metadata: Metadata = {
  title: "Whitepapers · TMIP",
  description:
    "TMIP research library. ROI analysis, case studies, technical papers on the Vehicle Digital Twin. Free downloads for fleet operations leaders and technical buyers.",
  alternates: {
    canonical: "https://treel.in/tmip/whitepapers",
  },
  openGraph: {
    title: "Whitepapers · TMIP",
    description:
      "TMIP research library. ROI analysis, case studies, technical papers on the Vehicle Digital Twin. Free downloads for fleet operations leaders and technical buyers.",
    url: "https://treel.in/tmip/whitepapers",
  },
};

export default function TmipWhitepapersPage() {
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

      {/* Header & Hero */}
      <section className="relative z-10 pt-24 pb-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-4">
              <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
                TMIP
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[#3B82F6]">Whitepapers</span>
            </nav>

            <div className="inline-flex items-center gap-2 rounded-[2px] font-jetbrains text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20">
              WHITEPAPERS
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Research from Treel&apos;s team.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              Whitepapers, technical papers, and deep-dive case studies. Written for fleet operations directors, CFOs,
              and technical buyers who need substance, not marketing pages.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Whitepapers Directory */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <WhitepapersClient />
        </div>
      </section>

      {/* Suggest a Topic CTA Band */}
      <section className="relative z-10 py-20">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-10 sm:p-14 rounded-[4px] bg-[#0B1220]/90 border border-blue-500/30 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Suggest a research topic.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-ibm-plex">
              We publish research based on what fleet operators actually need to know. If there is a topic you would
              want us to cover, let us know.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                <span>Suggest a topic</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
