import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Cpu, Landmark, Truck } from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Partners · Treel",
  description: "Treel partners across OEMs, telematics platforms, finance, and distribution. Our partnership philosophy: build what only we can build, partner for everything else.",
  alternates: {
    canonical: "https://treel.in/partners",
  },
  openGraph: {
    title: "Partners · Treel",
    description: "Treel partners across OEMs, telematics platforms, finance, and distribution. Our partnership philosophy: build what only we can build, partner for everything else.",
    url: "https://treel.in/partners",
  },
};

const partnerCategories = [
  {
    icon: Building2,
    category: "OEM Partners",
    tag: "Factory & Delivery Integration",
    body: "We work with commercial vehicle OEMs to integrate Treel intelligence into new vehicle deliveries and provide co-branded solutions for fleet operators.",
    partners: [
      { name: "Tata Motors", role: "Commercial Vehicle Lineup Integration" },
      { name: "Mahindra & Mahindra", role: "Factory Fitment & Fleet Architecture" },
      { name: "Ashok Leyland", role: "Direct Telematics Integration" },
    ],
  },
  {
    icon: Cpu,
    category: "Telematics and TMS",
    tag: "Native Stack Integrations",
    body: "Treel integrates natively with the transport management systems fleet operators already use. If you run Fleetx, Locus, LogiNext, or a custom TMS, we fit into your stack, not the other way around.",
    partners: [
      { name: "Fleetx", role: "Enterprise Fleet Telematics API" },
      { name: "Locus", role: "Dispatch & Routing Optimization Sync" },
      { name: "LogiNext", role: "Supply Chain & Delivery Telemetry" },
    ],
  },
  {
    icon: Landmark,
    category: "Finance Partners",
    tag: "Equipment & Platform Financing",
    body: "Suraksha's EMI programme runs on Bajaj Finance. For enterprise customers considering financed platform deployments, we work with select NBFCs and banking partners.",
    partners: [
      { name: "Bajaj Finance", role: "Suraksha EMI & Hardware Leasing" },
      { name: "Shriram Finance", role: "Commercial Vehicle Fleet Financing" },
    ],
  },
  {
    icon: Truck,
    category: "Distribution Partners",
    tag: "Pan-India Ground Network",
    body: "JK Tyre's national distribution network powers Suraksha's on-ground reach. Truck Wheels centres serve as installation and support points across India.",
    partners: [
      { name: "JK Tyre", role: "National Distribution & OEM Channel" },
      { name: "Truck Wheels", role: "500+ Fitment & Service Hubs" },
    ],
  },
];

export default function PartnersPage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <TreelSignature variant="compact" />
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                PARTNERS
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              We built Treel with partners, <span className="italic font-normal text-[#D5573B]">not around them.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Our partnership philosophy is simple: we build the mobility intelligence platform and Vehicle Digital Twin architecture that only we can build. For everything else, we partner with the best in the category. Below are the partners that make Treel work.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PARTNERS GRID */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {partnerCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={cat.category}
                  className="rounded-xl border border-white/10 bg-[#0F1419] p-8 sm:p-10 flex flex-col justify-between hover:border-[#D5573B]/40 transition-colors"
                >
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs uppercase tracking-widest px-2.5 py-1 rounded bg-white/5 text-[#94A3B8] font-mono">
                        {cat.tag}
                      </span>
                    </div>
                    <div>
                      <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                        {cat.category}
                      </h2>
                      <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed mt-3">
                        {cat.body}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 space-y-3">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
                        Featured Partners
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {cat.partners.map((partner) => (
                          <div 
                            key={partner.name}
                            className="rounded-lg bg-white/[0.03] border border-white/5 p-3.5 hover:border-white/15 transition-colors"
                          >
                            <div className="font-fraunces text-base font-semibold text-[#FAF7F2]">
                              {partner.name}
                            </div>
                            <div className="text-xs text-[#94A3B8] mt-0.5">
                              {partner.role}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. PARTNER INQUIRY */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Interested in partnering with Treel?
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              If your company builds fleet software, provides financing, distributes commercial vehicle products, or operates in an adjacent category, we would like to talk. Partnership decisions are made by the founder directly; we do not partner casually.
            </p>
            <div className="pt-4">
              <Button asChild variant="treel" size="lg">
                <Link href="/contact?subject=Partners" className="inline-flex items-center gap-2">
                  Send us a note <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}