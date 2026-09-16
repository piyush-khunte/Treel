import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Activity, Cpu, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "What is Mobility Intelligence? · Treel",
  description: "Mobility intelligence is the category that replaces tyre monitoring for fleet operators. It treats every vehicle as a queryable data object. Definition, adoption, and why the category emerged.",
  alternates: {
    canonical: "https://treel.in/mobility-intelligence",
  },
  openGraph: {
    title: "What is Mobility Intelligence? · Treel",
    description: "Mobility intelligence is the category that replaces tyre monitoring for fleet operators. It treats every vehicle as a queryable data object. Definition, adoption, and why the category emerged.",
    url: "https://treel.in/mobility-intelligence",
  },
};

export default function MobilityIntelligencePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "DefinedTerm",
        "@id": "https://treel.in/mobility-intelligence#term",
        "name": "Mobility Intelligence",
        "description": "Mobility intelligence is the operational category that treats every vehicle as a queryable data object rather than a monitored component, replacing older tyre monitoring with an architecture built around the Vehicle Digital Twin.",
        "inDefinedTermSet": "https://treel.in/mobility-intelligence#glossary"
      },
      {
        "@type": "Article",
        "headline": "What is Mobility Intelligence?",
        "description": "Mobility intelligence is the category that replaces tyre monitoring for fleet operators. It treats every vehicle as a queryable data object.",
        "author": {
          "@type": "Organization",
          "name": "Treel Mobility Solutions",
          "url": "https://treel.in"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Treel Mobility Solutions",
          "url": "https://treel.in"
        },
        "about": "Vehicle Digital Twin",
        "mentions": ["mobility intelligence", "TMIP", "fleet intelligence"]
      }
    ]
  };

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                CATEGORY DEFINITION
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              What is <span className="italic font-normal text-[#D5573B]">mobility intelligence?</span>
            </h1>
            <p className="text-[#FAF7F2] text-xl sm:text-2xl leading-relaxed font-inter max-w-3xl font-medium">
              Mobility intelligence is the operational category that treats every vehicle as a queryable data object rather than a monitored component.
            </p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter max-w-3xl">
              It replaces the older &ldquo;tyre monitoring&rdquo; and &ldquo;fleet telematics&rdquo; categories with an architecture built around the Vehicle Digital Twin. Treel is the company that operates this category in India across 68,000+ commercial vehicles.
            </p>
          </div>
        </div>
      </section>

      {/* 2. AT A GLANCE SUMMARY */}
      <section className="py-16 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-8 rounded-xl border border-white/10 bg-[#0F1419] space-y-3">
            <div className="text-xs font-jetbrains font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
              AT A GLANCE
            </div>
            <p className="text-[#FAF7F2] text-lg leading-relaxed font-inter">
              Mobility intelligence is the category that replaces tyre monitoring and fleet telematics with a Vehicle Digital Twin architecture. Fleet operators reason about vehicles the way software engineers reason about data.
            </p>
          </div>
        </div>
      </section>

      {/* 3. EVOLUTION */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
                From tyre monitoring to mobility intelligence.
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Ten years ago, the fleet intelligence category was called tyre monitoring. Sensors on tyres reported pressure and temperature. Fleet owners received alerts when a tyre needed attention. It was useful, but small.
              </p>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Five years ago, the category expanded into fleet telematics. GPS, fuel data, and driver behaviour joined the mix. Fleet owners could see where their trucks were and how they were being driven. Better, but still fragmented across separate tools.
              </p>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Today, the category has expanded again into mobility intelligence. Every subsystem of every vehicle is represented as a queryable data object. The fleet is no longer a collection of trucks with tyres and fuel sensors; it is a portfolio of Vehicle Digital Twins operating on a shared platform.
              </p>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                The name changed because the architecture changed. And the architecture changed because the operator&apos;s job changed: from reacting to component alerts, to reasoning about the fleet as a business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. OPERATING MODEL: REACTIVE -> PROACTIVE -> PREDICTIVE */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-10">
            <div className="space-y-4">
              <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
                The mobility intelligence operating model.
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                How fleet decision-making transforms across three generations of technology:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stage 1: Reactive */}
              <div className="rounded-xl border border-white/10 bg-[#0F1419] p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono">Stage 1</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-[#94A3B8]">Legacy</span>
                  </div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                    Reactive
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Old-model fleet management was reactive. A tyre blew out; the truck stopped; the fleet operator reacted. The response was correct but expensive: towing fees, delayed shipments, driver downtime.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#94A3B8] pt-4 border-t border-white/10">
                  Response window: Minutes after failure
                </div>
              </div>

              {/* Stage 2: Proactive */}
              <div className="rounded-xl border border-white/10 bg-[#0F1419] p-6 sm:p-8 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono">Stage 2</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-[#94A3B8]">Telematics</span>
                  </div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                    Proactive
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Mid-generation fleet telematics moved operators to proactive. Sensors flagged risks before they became failures. Tyre pressure warnings gave a 24-hour window to act. Better, but the operator was still responding to a signal from a single component.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#94A3B8] pt-4 border-t border-white/10">
                  Response window: 24 hours prior
                </div>
              </div>

              {/* Stage 3: Predictive */}
              <div className="rounded-xl border border-[#D5573B]/40 bg-[#0F1419] p-6 sm:p-8 space-y-4 flex flex-col justify-between relative shadow-lg shadow-[#D5573B]/5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-widest text-[#D5573B] font-mono font-semibold">Stage 3</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#D5573B]/10 text-[#D5573B] border border-[#D5573B]/30 font-semibold">Mobility Intelligence</span>
                  </div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                    Predictive
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Mobility intelligence enables predictive. Machine learning models forecast component failure days or weeks in advance, based on the full history of the Vehicle Digital Twin. Maintenance happens during planned downtime.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#D5573B] pt-4 border-t border-white/10 font-semibold">
                  Response window: Days to weeks ahead
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHO OPERATES */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Who operates in this category.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              Mobility intelligence adoption in India follows the pattern most enterprise software categories follow: early adopters in logistics and passenger transport lead, followed by construction, mining, and OEM fleets. Treel operates across all five verticals. Two hundred enterprise customers now run on the platform. The category is still in its first decade of scale.
            </p>
          </div>
        </div>
      </section>

      {/* 6. FOUNDER CALLOUT */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Treel is the mobility intelligence company.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              We are not the only company operating in this category. What we claim, and what our customers validate, is that we operate the platform, own the largest dataset, and are moving fastest to define what mobility intelligence means as an operating discipline. Read our founder note for the fuller story.
            </p>
            <div className="pt-4">
              <Button asChild variant="treel" size="lg">
                <Link href="/founder-note" className="inline-flex items-center gap-2">
                  Read the founder note <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RELATED READING */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Related reading.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/vehicle-digital-twin" className="p-6 sm:p-8 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <div className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mb-2">Architecture</div>
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">What is a Vehicle Digital Twin?</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/tmip" className="p-6 sm:p-8 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <div className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mb-2">Enterprise Platform</div>
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Explore TMIP</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/insights" className="p-6 sm:p-8 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <div className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mb-2">Field Notes &amp; Data</div>
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Read our insights</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}