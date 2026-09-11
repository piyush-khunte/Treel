import type { Metadata } from "next";
import Link from "next/link";
import { ResearchLibrary } from "./research-client";
import { ArrowRight, BookOpen, FileCheck, Layers, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Research & Whitepapers  ·  Treel",
  description: "Treel research library: whitepapers, case studies, and technical papers on mobility intelligence, Vehicle Digital Twin, and fleet ROI. Free downloads.",
  alternates: {
    canonical: "https://treel.in/research",
  },
  openGraph: {
    title: "Research & Whitepapers  ·  Treel",
    description: "Treel research library: whitepapers, case studies, and technical papers on mobility intelligence, Vehicle Digital Twin, and fleet ROI. Free downloads.",
    url: "https://treel.in/research",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResearchPage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">
              RESEARCH
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">
              Whitepapers, case studies, and deep-dives.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Treel's research library. Free to download. Written for fleet operations directors, CFOs, and technical buyers who need substance, not marketing.
            </p>
          </div>
        </div>
      </section>

      {/* Main Research Library Section with Filters and Cards */}
      <section className="py-16 sm:py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <ResearchLibrary />
        </div>
      </section>

      {/* CTA Band (Bottom) */}
      <section className="py-20 border-b border-white/10 relative overflow-hidden bg-white/[0.01]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="w-10 h-10 rounded-xl bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#D5573B]" />
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F2]">
              Suggest a research topic.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              If there's a topic you'd want us to research — a fleet operation question, a category analysis, a market study — let us know. Our research topics are driven by what operators actually need to know.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831] focus:outline-none focus:ring-2 focus:ring-[#D5573B] focus:ring-offset-2 focus:ring-offset-[#111927]"
              >
                Suggest a topic
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
