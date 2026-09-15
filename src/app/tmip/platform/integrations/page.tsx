import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Layers,
  BarChart3,
  Fuel,
  Code,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Integrations · TMIP",
  description:
    "TMIP integrates natively with Fleetx, Locus, LogiNext, SAP, Oracle, and custom TMS stacks. API-first architecture. Data flows both ways.",
  alternates: {
    canonical: "https://treel.in/tmip/platform/integrations",
  },
  openGraph: {
    title: "Integrations · TMIP",
    description:
      "TMIP integrates natively with Fleetx, Locus, LogiNext, SAP, Oracle, and custom TMS stacks. API-first architecture. Data flows both ways.",
    url: "https://treel.in/tmip/platform/integrations",
  },
};

const categories = [
  {
    category: "TMS Platforms",
    badge: "Transport Management",
    desc: "Bi-directional trip dispatch sync, automated geofence triggers, and en-route tyre health telemetry directly inside your dispatch workflow.",
    partners: ["Fleetx", "Locus", "LogiNext", "Enterprise Custom TMS"],
    icon: Workflow,
  },
  {
    category: "ERP Systems",
    badge: "Enterprise Resource Planning",
    desc: "Seamless synchronization of maintenance work orders, inventory spare parts consumption, and true cost-per-kilometre asset depreciation.",
    partners: ["SAP Logistics & S/4HANA", "Oracle Transportation (OTM)", "Microsoft Dynamics 365", "Custom Enterprise ERPs"],
    icon: Layers,
  },
  {
    category: "Fuel & Fleet-Adjacent",
    badge: "Operational Inputs",
    desc: "Correlating real-time tyre rolling resistance with calibrated fuel tank sensors, automated tolling systems, and depot fuel bowser logs.",
    partners: ["Connected Fuel Level Sensors", "Automated Tolling (FASTag)", "Depot Fuel Dispenser Logs", "Fleet Card Networks"],
    icon: Fuel,
  },
  {
    category: "Business Intelligence",
    badge: "Analytics & Data Warehousing",
    desc: "High-throughput data streaming into enterprise data lakes for cross-functional CFO dashboards and customized operational analytics.",
    partners: [
      "Snowflake Data Cloud",
      "Google BigQuery",
      "Amazon Redshift",
      "Tableau / Power BI / Looker",
    ],
    icon: BarChart3,
  },
];

const archFeatures = [
  {
    title: "100% API Parity",
    desc: "Every metric, twin parameter, alert, and report available in the TMIP UI is fully accessible via high-throughput REST APIs and webhooks.",
    icon: Code,
  },
  {
    title: "Bidirectional Data Flow",
    desc: "TMIP consumes dispatch and route schedules from your stack, and pushes real-time health telemetry back into your system of record.",
    icon: Zap,
  },
  {
    title: "Rapid Deployment Timelines",
    desc: "Native connectors deploy in 2–5 business days. Dedicated solutions engineers deliver full custom ERP integrations within 2–4 weeks.",
    icon: ShieldCheck,
  },
];

export default function TmipPlatformIntegrationsPage() {
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
              <Link href="/tmip/platform" className="hover:text-[#F1F5F9] transition-colors">
                Platform
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">Integrations</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-jetbrains text-xs tracking-wider uppercase font-semibold">
              PLATFORM · INTEGRATIONS
            </div>

            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              API-first architecture.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              TMIP fits your stack, not the reverse. Native integrations with the transport management systems fleet operators already use. Data flows in both directions.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/api"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all border border-slate-400/20 text-[#F1F5F9] hover:bg-white/5 hover:border-slate-400/40"
              >
                See the API overview <Code className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Native integrations */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              ECOSYSTEM CONNECTOR SUITE
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Integrations available at launch.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-3 font-ibm-plex">
              Pre-built bidirectional connectors spanning transport management, enterprise ERPs, and business intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.category}
                  className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-blue-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-[4px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-jetbrains font-semibold px-2.5 py-1 rounded-[2px] border border-blue-500/30 text-[#3B82F6] bg-blue-500/10">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">
                      {cat.category}
                    </h3>

                    <p className="text-[#94A3B8] text-sm leading-relaxed font-ibm-plex">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-slate-400/10 space-y-2">
                    <div className="text-xs font-jetbrains uppercase tracking-wider text-[#94A3B8] mb-2 font-semibold">
                      Supported Connectors
                    </div>
                    {cat.partners.map((partner) => (
                      <div key={partner} className="flex items-center gap-2 text-xs font-jetbrains text-[#CBD5E1]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" />
                        <span>{partner}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2: Integration architecture */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
                BIDIRECTIONAL ARCHITECTURE
              </div>
              <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                How TMIP fits into your stack.
              </h2>
            </div>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              TMIP is API-first. Every feature available in the dashboard is available programmatically. Every integration is bidirectional: TMIP consumes from your stack, and TMIP data flows back into your stack, in the format your team expects.
            </p>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Integration setup is handled by our solutions team as part of onboarding. Typical integration time: 2–5 business days for supported systems, 2–4 weeks for custom integrations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {archFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-3"
                  >
                    <div className="w-10 h-10 rounded-[4px] bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h4 className="font-space-grotesk text-lg font-bold text-[#F1F5F9]">
                      {feat.title}
                    </h4>
                    <p className="text-[#94A3B8] text-xs leading-relaxed font-ibm-plex">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Custom integrations */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-4xl space-y-6">
            <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              BESPOKE CONNECTIVITY
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Not seeing your stack?
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              If your TMS or ERP is not listed above, we build the integration. Our solutions engineering team has integrated TMIP with proprietary logistics platforms, in-house maintenance systems, custom fuel management tools, and legacy vehicle management systems across every commercial vehicle class.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Request a custom integration <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: API documentation */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-4xl space-y-6">
            <div className="font-jetbrains text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              DEVELOPER HUB
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              For developer teams.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              If your team wants to evaluate the API before committing to a demo, see our public API introduction.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/api"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all border border-blue-500/30 text-[#3B82F6] bg-blue-500/10 hover:bg-blue-500/20"
              >
                See the API overview <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative z-10 py-20 px-6 sm:px-10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto">
          <div className="p-10 sm:p-16 rounded-[4px] bg-gradient-to-br from-[#0B1220] to-[#050A17] border border-blue-500/30 relative overflow-hidden text-center max-w-4xl mx-auto">
            <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Connect TMIP to your enterprise stack.
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed font-ibm-plex">
                Stream live digital twin telemetry, automated work orders, and fuel intelligence directly into your existing systems of record.
              </p>
              <div className="pt-4 flex justify-center">
                <Link
                  href="/tmip/demo"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
                >
                  Book a demo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
