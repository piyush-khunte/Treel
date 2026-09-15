import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  X, 
  ExternalLink, 
  ChevronRight,
  Truck,
  Layers,
  Users
} from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";

export const metadata: Metadata = {
  title: "A JK Tyre Technology Company  ·  Treel",
  description: "Treel Mobility Solutions is a JK Tyre technology company. We operate independently on product, platform, and go-to-market. The JK Tyre backing brings five decades of tyre engineering, national distribution, and industrial credibility.",
  alternates: {
    canonical: "https://treel.in/jk-tyre",
  },
  openGraph: {
    title: "A JK Tyre Technology Company  ·  Treel",
    description: "Treel Mobility Solutions is a JK Tyre technology company. We operate independently on product, platform, and go-to-market. The JK Tyre backing brings five decades of tyre engineering, national distribution, and industrial credibility.",
    url: "https://treel.in/jk-tyre",
  },
};

export default function JkTyrePage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                OWNERSHIP
              </span>
              <TreelSignature variant="compact" />
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              A JK Tyre technology company.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Treel Mobility Solutions is JK Tyre&apos;s technology arm for mobility intelligence. This is what that means, in practical terms.
            </p>
          </div>
        </div>
      </section>

      {/* Section · What the relationship is */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              A technology company backed by a tyre company.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              JK Tyre is one of India&apos;s most established commercial tyre manufacturers, with five decades of engineering, a national distribution network, and long-standing relationships with fleet operators, OEMs, and the aftermarket.
            </p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              Treel is a technology company. We build sensors, platforms, and software. We operate on product cycles measured in weeks, not seasons. Our engineering team is independent. Our product roadmap is independent. Our commercial decisions are made in our office in Pune.
            </p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              JK Tyre backs us with capital, industrial credibility, and access to a national distribution reach that would take a young platform company years to build alone. We in turn give JK Tyre a technology company positioned to lead an emerging category.
            </p>
          </div>
        </div>
      </section>

      {/* Section · What the relationship is not */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              What Treel is not.
            </h2>

            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                  <X className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-base text-[#FAF7F2]">Not a business unit of JK Tyre</h3>
                  <p className="text-sm text-[#94A3B8] mt-1 leading-relaxed">
                    Treel is an independent company with its own leadership, its own P&amp;L, and its own operating decisions.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                  <X className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-base text-[#FAF7F2]">Not JK Tyre&apos;s marketing arm</h3>
                  <p className="text-sm text-[#94A3B8] mt-1 leading-relaxed">
                    We do not exist to sell JK tyres. We work with every tyre brand a fleet operator uses.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
                  <X className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-medium text-base text-[#FAF7F2]">Not restricted to JK Tyre customers</h3>
                  <p className="text-sm text-[#94A3B8] mt-1 leading-relaxed">
                    Our platform serves fleet operators regardless of their tyre supplier. Our data insights apply across the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · What this means for you */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              What it means, in practice.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-4">
                    <Truck className="w-5 h-5" />
                  </div>
                  <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">For Fleet Operators</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                    You are buying an independent mobility intelligence platform. The JK Tyre backing means the company will be here for the long run and the engineering has industrial-grade credibility. Your tyre brand choice is not part of the conversation.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">For Partners &amp; OEMs</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                    You work with Treel directly. JK Tyre does not sit in the middle of technical or commercial decisions.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-4">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">For Candidates</h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-2 leading-relaxed">
                    You are joining a technology company. The compensation, benefits, and culture are Treel&apos;s, not a manufacturer&apos;s.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Read more */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl font-medium tracking-tight text-[#FAF7F2]">
              Read more
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Link href="/about" className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">About Treel</h3>
                <p className="text-xs text-[#94A3B8] mt-1">Our mission and origin story.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link href="/our-story" className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Our story</h3>
                <p className="text-xs text-[#94A3B8] mt-1">How we got from sensors to platform.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <a 
                href="https://www.jktyre.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block"
              >
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors flex items-center gap-1.5">
                  <span>Visit JK Tyre</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1">Official corporate portal.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  External site <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
