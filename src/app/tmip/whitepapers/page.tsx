import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { WhitepapersClient } from "./whitepapers-client";
import { getPublishedWhitepapers } from "@/lib/content/whitepapers-storage";

export const metadata: Metadata = {
  title: "Whitepapers · TMIP Research Library",
  description:
    "TMIP research library. ROI analysis and technical papers on the Vehicle Digital Twin. Free downloads for fleet operations leaders and technical buyers.",
  alternates: {
    canonical: "https://treel.in/tmip/whitepapers",
  },
  openGraph: {
    title: "Whitepapers · TMIP Research Library",
    description:
      "TMIP research library. ROI analysis and technical papers on the Vehicle Digital Twin. Free downloads for fleet operations leaders and technical buyers.",
    url: "https://treel.in/tmip/whitepapers",
  },
};

export const revalidate = 60;

export default async function TmipWhitepapersPage() {
  const publishedWhitepapers = await getPublishedWhitepapers();

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
      <section className="relative z-10 pt-12 sm:pt-16 pb-8 sm:pb-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-2 sm:mb-3">
              <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
                TMIP
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
              <span className="text-[#3B82F6]">Whitepapers</span>
            </nav>

            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
              WHITEPAPERS &amp; RESEARCH
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Research from Treel&apos;s team.
            </h1>

            <p className="text-[#94A3B8] text-base sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              Whitepapers and technical research papers. Written for fleet operations directors, CFOs,
              and technical buyers who need substance, not marketing pages.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Whitepapers Directory */}
      <section className="relative z-10 py-10 sm:py-12 lg:py-14 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <WhitepapersClient initialWhitepapers={publishedWhitepapers} />
        </div>
      </section>

      {/* Suggest a Topic CTA Band */}
      <section className="relative z-10 py-10 sm:py-14">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-12 rounded-[4px] bg-[#0B1220]/90 border border-blue-500/30 text-center space-y-5 max-w-4xl mx-auto">
            <h2 className="font-space-grotesk text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Suggest a research topic.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-ibm-plex">
              We publish research based on what fleet operators actually need to know. If there is a topic you would
              want us to cover, let us know.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] hover:bg-[#2563EB] text-white"
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
