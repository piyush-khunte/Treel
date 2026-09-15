import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { CaseStudiesClient } from "./case-studies-client";

export const metadata: Metadata = {
  title: "Case Studies  ·  TMIP Customers",
  description:
    "Real customer stories from TMIP deployments. Logistics, passenger transport, construction, mining. Outcomes measured in fuel savings, tyre life, uptime, cost per kilometre.",
  alternates: {
    canonical: "https://treel.in/tmip/customers/case-studies",
  },
  openGraph: {
    title: "Case Studies  ·  TMIP Customers",
    description:
      "Real customer stories from TMIP deployments. Logistics, passenger transport, construction, mining. Outcomes measured in fuel savings, tyre life, uptime, cost per kilometre.",
    url: "https://treel.in/tmip/customers/case-studies",
  },
};

export default function TmipCustomersCaseStudiesPage() {
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

      {/* Hero Section */}
      <section className="relative z-10 pt-24 sm:pt-28 pb-20 sm:pb-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-4xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-4">
              <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
                TMIP
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href="/tmip/customers" className="hover:text-[#F1F5F9] transition-colors">
                Customers
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">Case Studies</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-jetbrains text-xs tracking-wider uppercase font-semibold">
              CASE STUDIES
            </div>

            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              What customers actually built with TMIP.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl font-ibm-plex">
              Full case studies with the numbers, the operations, and the trade-offs. No hero worship. Just what
              happened, what worked, and what the fleet operator does now that they didn&apos;t do before.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section · Interactive Filter & Case Study Cards */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto">
          <CaseStudiesClient />
        </div>
      </section>

      {/* CTA band */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              Not seeing your industry?
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              We have deployments across every commercial vehicle industry in India. Some customers do not publicly
              disclose their fleet intelligence stack. If you would like to talk to a reference customer in your
              industry, we can arrange it as part of the sales process.
            </p>
            <div className="pt-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}