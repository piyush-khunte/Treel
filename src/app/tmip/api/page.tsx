import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  Terminal, 
  Key, 
  Layers, 
  Radio, 
  Cpu, 
  Database, 
  Bell, 
  BarChart3, 
  RefreshCw, 
  ShieldCheck, 
  CheckCircle2, 
  Clock 
} from "lucide-react";

export const metadata: Metadata = {
  title: "API  ·  TMIP",
  description: "TMIP's API-first architecture. Public introduction to the platform's programmatic interface, integration philosophy, and how to request API access.",
  alternates: {
    canonical: "https://treel.in/tmip/api",
  },
  openGraph: {
    title: "API  ·  TMIP",
    description: "TMIP's API-first architecture. Public introduction to the platform's programmatic interface, integration philosophy, and how to request API access.",
    url: "https://treel.in/tmip/api",
  },
};

export default function TmipApiPage() {
  const consequences = [
    {
      title: "You are never locked into our interface.",
      body: "Push TMIP data into your BI stack, your custom dashboards, your Slack, your operations tooling. The data belongs to you and flows freely."
    },
    {
      title: "Automation is native.",
      body: "Alert workflows, maintenance scheduling, report generation, integration into your TMS or ERP — all buildable through the API without touching the UI."
    },
    {
      title: "Integrations are peers, not add-ons.",
      body: "Native integrations with Fleetx, Locus, LogiNext, SAP, Oracle, and custom stacks are built on the same API our own dashboard uses. There is no privileged or hidden interface."
    }
  ];

  const operatorBuildItems = [
    {
      title: "Custom dashboards",
      desc: "Connect your own BI stack (Tableau, Power BI, Looker, custom internal tools) to raw and aggregated fleet telemetry.",
      icon: BarChart3
    },
    {
      title: "Alert routing",
      desc: "Direct critical pressure, temperature, and vehicle anomaly alerts to Slack, Microsoft Teams, PagerDuty, or custom incident desks.",
      icon: Bell
    },
    {
      title: "Data warehousing",
      desc: "Automate continuous high-volume data pipeline exports directly into Snowflake, Google BigQuery, or Amazon Redshift.",
      icon: Database
    },
    {
      title: "TMS integration",
      desc: "Enable bi-directional data exchange with your Transport Management System for route dispatch and asset allocation.",
      icon: Radio
    },
    {
      title: "ERP integration",
      desc: "Synchronize component wear and fuel metrics with SAP, Oracle, or custom financial backends for cost attribution.",
      icon: Layers
    },
    {
      title: "Automated maintenance workflows",
      desc: "Trigger work orders, inventory allocation, and depot inspection queues automatically based on predictive component alerts.",
      icon: RefreshCw
    },
    {
      title: "Custom reporting",
      desc: "Generate scheduled regulatory compliance summaries, carbon accounting data, and executive board reports programmatically.",
      icon: Terminal
    }
  ];

  const rateLimitTiers = [
    {
      tier: "Starter",
      description: "Standard API access for baseline data integration and telemetry queries.",
      limits: "Standard rate limits per vehicle allotment"
    },
    {
      tier: "Growth",
      description: "Enhanced throughput for multi-depot fleet management and real-time event routing.",
      limits: "High-frequency rate limits with priority burst capacity"
    },
    {
      tier: "Enterprise",
      description: "Dedicated endpoints, custom rate limits per contract, and tailored SLA guarantees.",
      limits: "Custom rate limits per contract"
    }
  ];

  return (
    <div className="space-y-0 bg-[#050A17] text-[#E5E7EB] font-ibm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">
              API
            </div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              TMIP is an API-first platform.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm max-w-3xl">
              Every capability in the TMIP dashboard is available programmatically. This page explains the architecture, the integration philosophy, and how to get API access.
            </p>
          </div>
        </div>
      </section>

      {/* API-first architecture */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Why API-first matters.
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">
                When we started building TMIP, we made a deliberate architectural decision: the dashboard would be a client of the API, not a separate product. Every feature you see in the UI is a call the API can serve. This has three consequences:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {consequences.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <h3 className="font-space text-lg font-bold text-[#F1F5F9]">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What the API enables */}
      <section className="py-20 border-b border-white/10 bg-[#070D1D]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                What operators build on the API.
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">
                From real-time operations dashboards to deep enterprise ERP syncs, fleet teams leverage the TMIP API across their operational software stack:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {operatorBuildItems.map((item, idx) => {
                const IconComp = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="p-5 rounded-xl bg-[#0B1220] border border-white/10 space-y-2.5 hover:border-[#3B82F6]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-space text-base font-bold text-[#F1F5F9]">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-ibm">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#3B82F6] uppercase tracking-wider font-semibold">
                <Key className="w-4 h-4" /> Security & Access
              </div>
              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Authentication overview
              </h2>
            </div>
            
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">
              TMIP API uses signed API keys with configurable scopes. Enterprise customers can issue multiple API keys with role-based scopes for different integrations. Keys are rotatable, revocable, and auditable. Full authentication documentation is provided at onboarding.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#0B1220] border border-white/10 space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider text-[#3B82F6] font-semibold">Granular Scopes</div>
                <p className="text-xs text-[#94A3B8]">Role-based access tokens tailored per microservice or external partner.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0B1220] border border-white/10 space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider text-[#3B82F6] font-semibold">Key Rotation</div>
                <p className="text-xs text-[#94A3B8]">Zero-downtime key rotation with grace periods and instant revocation.</p>
              </div>
              <div className="p-4 rounded-xl bg-[#0B1220] border border-white/10 space-y-1">
                <div className="text-xs font-mono uppercase tracking-wider text-[#3B82F6] font-semibold">Audit Logging</div>
                <p className="text-xs text-[#94A3B8]">Every programmatic API call is cryptographically signed and logged.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Access model */}
      <section className="py-20 border-b border-white/10 bg-[#070D1D]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                How to get API access
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">
                API access is included with every TMIP contract tier. Rate limits vary by tier:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {rateLimitTiers.map((tier, idx) => (
                <div 
                  key={idx} 
                  className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-xs font-mono font-semibold uppercase">
                      {tier.tier}
                    </span>
                    <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm pt-1">
                      {tier.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/10 text-xs font-mono text-[#F59E0B]">
                    {tier.limits}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm">
              Full API reference documentation is provided to customers post-contract. This page is a public introduction, not a substitute for the reference documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Request API access CTA */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0B1220] to-[#070D1D] border border-white/15 space-y-6">
            <div className="space-y-2">
              <h2 className="font-space text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                Evaluate the TMIP API.
              </h2>
              <p className="text-base text-[#94A3B8] leading-relaxed font-ibm max-w-2xl">
                If you would like to evaluate the API as part of your buying process, we can arrange a technical walkthrough during the demo call.
              </p>
            </div>

            <div className="pt-2">
              <Link 
                href="/tmip/demo?subject=API%20access" 
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-[#050A17] hover:bg-[#60A5FA]"
              >
                <span>Request API access</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
