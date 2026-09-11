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
    <div className="bg-[#050A17] text-[#F1F5F9] font-ibm">
      {/* Header & Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] mb-4">
              <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
                TMIP
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">Whitepapers</span>
            </nav>

            <div className="inline-flex items-center gap-2 border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-full text-xs font-mono text-[#3B82F6] uppercase tracking-widest font-semibold">
              WHITEPAPERS
            </div>

            <h1 className="font-space text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Research from Treel&apos;s team.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl">
              Whitepapers, technical papers, and deep-dive case studies. Written for fleet operations directors, CFOs,
              and technical buyers who need substance, not marketing pages.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Whitepapers Directory */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <WhitepapersClient />
        </div>
      </section>

      {/* Suggest a Topic CTA Band */}
      <section className="py-20 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#080E1E] to-[#0B1220] border border-white/10 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Suggest a research topic.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              We publish research based on what fleet operators actually need to know. If there is a topic you would
              want us to cover, let us know.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Suggest a topic <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
