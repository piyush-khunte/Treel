import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <div className="bg-[#050A17] text-[#F1F5F9] font-ibm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-semibold">
              CASE STUDIES
            </div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              What customers actually built with TMIP.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl">
              Full case studies with the numbers, the operations, and the trade-offs. No hero worship. Just what
              happened, what worked, and what the fleet operator does now that they didn&apos;t do before.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section · Interactive Filter & Case Study Cards */}
      <section className="py-20 lg:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <CaseStudiesClient />
        </div>
      </section>

      {/* CTA band */}
      <section className="py-20 lg:py-24 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              Not seeing your industry?
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              We have deployments across every commercial vehicle industry in India. Some customers do not publicly
              disclose their fleet intelligence stack. If you would like to talk to a reference customer in your
              industry, we can arrange it as part of the sales process.
            </p>
            <div className="pt-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
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