import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, Cpu, Server, Database, BrainCircuit, LayoutDashboard, Code, ShieldCheck } from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Technology · Treel Platform Architecture",
  description: "The Treel technology stack: proprietary sensors, edge processing, cloud infrastructure, machine learning, and the Vehicle Digital Twin architecture that powers TMIP.",
  alternates: {
    canonical: "https://treel.in/technology",
  },
  openGraph: {
    title: "Technology · Treel Platform Architecture",
    description: "The Treel technology stack: proprietary sensors, edge processing, cloud infrastructure, machine learning, and the Vehicle Digital Twin architecture that powers TMIP.",
    url: "https://treel.in/technology",
  },
};

const layers = [
  {
    layer: "Layer 05",
    title: "Operator Interface",
    subtitle: "Enterprise console, driver display, consumer apps & programmatic APIs",
    description: "The dashboard, the API, the alerts, the reports, the mobile app — all draw from the same Digital Twin data. Enterprise customers access via TMIP. Owner-drivers access via the Suraksha in-cab display. Consumers access via the Personal TPMS mobile app.",
    icon: LayoutDashboard,
    tags: ["TMIP Enterprise", "Suraksha In-Cab", "Personal TPMS App", "REST & Webhooks"],
    highlight: "Single Source of Truth",
  },
  {
    layer: "Layer 04",
    title: "Machine Learning",
    subtitle: "Continuous state estimation & predictive maintenance algorithms",
    description: "Models run continuously against the Vehicle Digital Twin data to forecast component wear, detect anomalies, predict maintenance windows, and identify driver behaviour risks. Model accuracy is tracked, versioned, and validated against real-world outcomes.",
    icon: BrainCircuit,
    tags: ["Wear Forecasting", "Anomaly Detection", "Maintenance Prediction", "Driver Risk Scoring"],
    highlight: "Automated Diagnostics",
  },
  {
    layer: "Layer 03",
    title: "Cloud Infrastructure",
    subtitle: "Persistent Vehicle Digital Twin running on high-availability distributed cloud",
    description: "The Treel cloud is where the Vehicle Digital Twin lives. Every vehicle has a persistent Twin that receives updates continuously, records state history, and serves queries. Infrastructure is designed for 99.7 percent uptime (current trailing 90-day average) with regional redundancy.",
    icon: Database,
    tags: ["99.7% Trailing Uptime", "Sub-Second Ingestion", "Immutable History", "Regional Failover"],
    highlight: "Persistent Twin",
  },
  {
    layer: "Layer 02",
    title: "Edge Processing",
    subtitle: "Vehicle-level gateway, signal conditioning & store-and-forward buffering",
    description: "Edge devices at the vehicle level aggregate sensor data, filter noise, apply first-pass analytics, and stream to the cloud. Edge processing reduces bandwidth cost and enables offline resilience: if connectivity drops, the vehicle continues to log locally.",
    icon: Server,
    tags: ["Store-and-Forward", "Noise Filtering", "Dead-Zone Buffering", "Low-Power Mesh"],
    highlight: "Offline Resilient",
  },
  {
    layer: "Layer 01",
    title: "Sensors & Telemetry",
    subtitle: "Proprietary wheel-end transducers engineered and manufactured in India",
    description: "Treel sensors are proprietary. ARAI certified. Benchmarked against international TPMS standards. Made in India by our engineering team. Two sensor families: automotive (5-year warranty) and two-wheeler (3-year warranty). The sensor is where the physical vehicle enters the data layer.",
    icon: Cpu,
    tags: ["ARAI Certified", "5-Year Automotive Warranty", "3-Year 2W Warranty", "Made in India"],
    highlight: "Proprietary Hardware",
  },
];

export default function TechnologyPage() {
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
                TECHNOLOGY
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              The technology behind <span className="italic font-normal text-[#D5573B]">mobility intelligence.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Treel is built on a five-layer architecture: sensors, edge processing, cloud infrastructure, machine learning, and the operator interface. Each layer is engineered for scale, reliability, and openness.
            </p>
          </div>
        </div>
      </section>

      {/* 2. THE FIVE-LAYER ARCHITECTURAL STACK */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4 mb-12">
            <div className="text-xs font-jetbrains font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
              SYSTEM ARCHITECTURE
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              The five-layer stack.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              How telemetry flows from physical commercial vehicle wheel-ends through edge gateways, cloud ingestion, and machine learning models to the operator&apos;s interface:
            </p>
          </div>

          {/* Vertical Stack Diagram */}
          <div className="space-y-4 max-w-4xl">
            {layers.map((l) => {
              const Icon = l.icon;
              return (
                <div 
                  key={l.layer}
                  className="rounded-xl border border-white/10 bg-[#0F1419] p-6 sm:p-8 hover:border-[#D5573B]/50 transition-all duration-300 relative group shadow-lg"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="w-12 h-12 rounded-xl bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] shrink-0 mt-1">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[#D5573B]">
                            {l.layer}
                          </span>
                          <span className="text-white/20">•</span>
                          <span className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                            {l.highlight}
                          </span>
                        </div>
                        <h3 className="font-fraunces text-2xl font-medium text-[#FAF7F2] tracking-tight">
                          {l.title}
                        </h3>
                        <p className="text-sm font-medium text-[#94A3B8]">
                          {l.subtitle}
                        </p>
                        <p className="text-sm text-[#94A3B8] leading-relaxed pt-2 max-w-2xl">
                          {l.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                    {l.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/5 text-[#FAF7F2]/80 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. API-FIRST, ALWAYS */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
              <Code className="w-6 h-6" />
            </div>
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              API-first, always.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              The Treel platform is API-first. Every dashboard function is available programmatically. Integrations with Fleetx, Locus, LogiNext, SAP, Oracle, and custom TMS stacks are native, not adapted. If your fleet operates on an existing software stack, Treel fits cleanly into it.
            </p>
            <div className="pt-2">
              <Button asChild variant="outline" className="border-white/20 text-[#FAF7F2] hover:border-[#D5573B] hover:text-[#D5573B]">
                <Link href="/tmip/platform/integrations" className="inline-flex items-center gap-2">
                  View TMS &amp; ERP integrations <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EXPLORE ARCHITECTURE LINKS */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Deep dives.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/data-infrastructure" className="p-6 sm:p-8 rounded-xl bg-[#0F1419] border border-white/10 hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <div className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mb-2">Ingestion &amp; Storage</div>
                <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Data infrastructure</h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">68,000+ active commercial vehicles and sub-second ingestion latency.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/vehicle-digital-twin" className="p-6 sm:p-8 rounded-xl bg-[#0F1419] border border-white/10 hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <div className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mb-2">Core Concept</div>
                <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Vehicle Digital Twin</h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">Treating commercial vehicles as persistent queryable software objects.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/tmip/platform" className="p-6 sm:p-8 rounded-xl bg-[#0F1419] border border-white/10 hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <div className="text-xs uppercase tracking-widest text-[#94A3B8] font-mono mb-2">Enterprise Suite</div>
                <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">TMIP platform</h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">The tyre &amp; mobility intelligence platform deployed by 200+ fleets.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CAREERS CALLOUT */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Curious about the engineering behind this?
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              We are hiring firmware, edge compute, distributed cloud, and machine learning engineers who want to build mobility intelligence at national scale from our Pune technical headquarters.
            </p>
            <div className="pt-2">
              <Button asChild variant="treel" size="lg">
                <Link href="/careers" className="inline-flex items-center gap-2">
                  See engineering roles <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}