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
    <div className="bg-[#050A17] text-[#F1F5F9] font-ibm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] mb-4">
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

            <div className="border text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">
              PLATFORM · INTEGRATIONS
            </div>

            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              API-first architecture.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm max-w-3xl">
              TMIP fits your stack, not the reverse. Native integrations with the transport management systems fleet operators already use. Data flows in both directions.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/api"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all border border-white/20 text-[#F1F5F9] hover:bg-white/5 hover:border-white/40"
              >
                See the API overview <Code className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Native integrations */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              ECOSYSTEM CONNECTOR SUITE
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Integrations available at launch.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg mt-3">
              Pre-built bidirectional connectors spanning transport management, enterprise ERPs, and business intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.category}
                  className="p-8 rounded-2xl bg-[#080E1E] border border-white/10 hover:border-blue-500/30 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border border-blue-500/30 text-[#3B82F6] bg-blue-500/10">
                        {cat.badge}
                      </span>
                    </div>

                    <h3 className="font-space text-2xl font-bold text-[#F1F5F9]">
                      {cat.category}
                    </h3>

                    <p className="text-[#94A3B8] text-sm leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/5 space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2 font-semibold">
                      Supported Connectors
                    </div>
                    {cat.partners.map((partner) => (
                      <div key={partner} className="flex items-center gap-2 text-xs font-mono text-[#CBD5E1]">
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
      <section className="py-20 border-b border-white/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
                BIDIRECTIONAL ARCHITECTURE
              </div>
              <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                How TMIP fits into your stack.
              </h2>
            </div>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">
              TMIP is API-first. Every feature available in the dashboard is available programmatically. Every integration is bidirectional: TMIP consumes from your stack, and TMIP data flows back into your stack, in the format your team expects.
            </p>

            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">
              Integration setup is handled by our solutions team as part of onboarding. Typical integration time: 2–5 business days for supported systems, 2–4 weeks for custom integrations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {archFeatures.map((feat) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={feat.title}
                    className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#3B82F6]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-space text-lg font-bold text-[#F1F5F9]">
                      {feat.title}
                    </h4>
                    <p className="text-[#94A3B8] text-xs leading-relaxed">
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
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              BESPOKE CONNECTIVITY
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Not seeing your stack?
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">
              If your TMS or ERP is not listed above, we build the integration. Our solutions engineering team has integrated TMIP with proprietary logistics platforms, in-house maintenance systems, custom fuel management tools, and legacy vehicle management systems across every commercial vehicle class.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Request a custom integration <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: API documentation */}
      <section className="py-20 border-b border-white/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-[#3B82F6] font-semibold mb-2">
              DEVELOPER HUB
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              For developer teams.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">
              If your team wants to evaluate the API before committing to a demo, see our public API introduction.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/api"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all border border-blue-500/30 text-[#3B82F6] bg-blue-500/10 hover:bg-blue-500/20"
              >
                See the API overview <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-10 sm:p-16 rounded-3xl bg-gradient-to-br from-[#0B1220] to-[#050A17] border border-blue-500/30 relative overflow-hidden text-center max-w-4xl mx-auto">
            <div className="space-y-6 max-w-2xl mx-auto">
              <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Connect TMIP to your enterprise stack.
              </h2>
              <p className="text-[#94A3B8] text-base leading-relaxed">
                Stream live digital twin telemetry, automated work orders, and fuel intelligence directly into your existing systems of record.
              </p>
              <div className="pt-4 flex justify-center">
                <Link
                  href="/tmip/demo"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
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
