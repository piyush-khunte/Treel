import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Cpu,
  Radio,
  Server,
  Code2,
  CheckCircle2,
  Box,
  Wrench,
  Lock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Platform Overview  ·  TMIP",
  description:
    "The TMIP platform architecture: five layers from sensor to interface. Vehicle Digital Twin at the core. API-first. Real-time telemetry, predictive maintenance, integrations.",
  alternates: {
    canonical: "https://treel.in/tmip/platform",
  },
  openGraph: {
    title: "Platform Overview  ·  TMIP",
    description:
      "The TMIP platform architecture: five layers from sensor to interface. Vehicle Digital Twin at the core. API-first. Real-time telemetry, predictive maintenance, integrations.",
    url: "https://treel.in/tmip/platform",
  },
};

const layers = [
  {
    num: "Layer 5",
    title: "Operator interface",
    desc: "Executive dashboards, fleet dispatch consoles, REST/GraphQL APIs, real-time threshold & anomaly alerts, and exportable CFO reports.",
    badge: "CONSUMPTION & CONTROL",
    color: "#3B82F6",
    icon: Layers,
  },
  {
    num: "Layer 4",
    title: "Machine learning",
    desc: "Longitudinal predictive degradation models, thermal & pressure anomaly detection engines, and automated replacement window forecasting.",
    badge: "INTELLIGENCE ENGINE",
    color: "#F59E0B",
    icon: Cpu,
  },
  {
    num: "Layer 3",
    title: "Cloud infrastructure",
    desc: "Vehicle Digital Twin queryable store, high-throughput distributed event streaming, multi-region database replication, and historical data lake.",
    badge: "STATE & HISTORY",
    color: "#3B82F6",
    icon: Server,
  },
  {
    num: "Layer 2",
    title: "Edge processing",
    desc: "In-vehicle edge gateway, telematics preprocessing, high-frequency filtering, local anomaly scoring, and store-and-forward offline resilience.",
    badge: "LOCAL EDGE GATEWAY",
    color: "#10B981",
    icon: Radio,
  },
  {
    num: "Layer 1",
    title: "Sensors",
    desc: "ARAI-certified industrial TPMS sensors, valve-stem & internal rim mountings, CAN bus transceivers, and temperature/pressure transducers.",
    badge: "PHYSICAL SENSING",
    color: "#3B82F6",
    icon: Activity,
  },
];

const differentiators = [
  {
    title: "Vehicle-level reasoning",
    desc: "Instead of isolated tyre alerts, TMIP models entire chassis dynamics, linking pressure variance directly to fuel consumption and driver behaviour.",
  },
  {
    title: "Predictive analytics",
    desc: "Built on longitudinal telemetry across 68,000+ commercial vehicles, not static high/low alert thresholds that cause operator alarm fatigue.",
  },
  {
    title: "API-first architecture",
    desc: "Bi-directional webhooks and REST endpoints integrate cleanly with your existing TMS, ERP, and workshop management software stacks.",
  },
  {
    title: "Sub-second telemetry",
    desc: "Live 180ms sensor-to-cloud latency streaming via 5G edge networks rather than 5-minute delayed polling intervals.",
  },
  {
    title: "Cost per kilometre",
    desc: "Continuous financial attribution showing true tyre and fuel expense per kilometre indexed by vehicle class, route, driver, and depot.",
  },
  {
    title: "Multi-region deployment",
    desc: "Unified global control console engineered to support India-scale deployments, expanding seamlessly into Middle East and European corridors.",
  },
];

const featureCards = [
  {
    title: "Vehicle Digital Twin",
    desc: "The category-defining core. Every commercial vehicle rendered as an addressable, queryable digital asset.",
    href: "/tmip/platform/vehicle-digital-twin",
    icon: Box,
  },
  {
    title: "Real-time telemetry",
    desc: "Sub-second streaming of pressure, temperature, load, and velocity across your entire multi-depot fleet.",
    href: "/tmip/platform/telemetry",
    icon: Activity,
  },
  {
    title: "Predictive maintenance",
    desc: "Machine-learning algorithms that pinpoint irregular wear patterns 14 to 21 days before catastrophic tyre failure.",
    href: "/tmip/platform/predictive-maintenance",
    icon: Wrench,
  },
  {
    title: "Integrations",
    desc: "Plug-and-play connectors for major commercial transport management systems, telematics hubs, and enterprise ERPs.",
    href: "/tmip/platform/integrations",
    icon: Layers,
  },
  {
    title: "API",
    desc: "Developer-first developer portal with OpenAPI specs, webhook management, and programmatic vehicle query endpoints.",
    href: "/tmip/api",
    icon: Code2,
  },
  {
    title: "Security & compliance",
    desc: "Enterprise data governance, AES-256 encryption, role-based access control, and DPDP Act 2023 compliance.",
    href: "/tmip/security",
    icon: Lock,
  },
];

const integrations = [
  "Fleetx",
  "Locus",
  "LogiNext",
  "SAP",
  "Oracle",
  "+ your custom TMS",
];

export default function TmipPlatformPage() {
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
      <section className="relative z-10 pt-24 sm:pt-28 pb-20 sm:pb-24 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl space-y-6">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
              PLATFORM
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.12]">
              One architecture. Five layers. Every vehicle a signal.
            </h1>
            <p className="font-ibm-plex text-lg sm:text-xl leading-[1.55] text-[#94A3B8] max-w-3xl">
              TMIP is built on a five-layer architecture that turns raw sensor data into operating decisions. This is how
              the platform works, layer by layer.
            </p>
          </div>
        </div>
      </section>

      {/* Section · The five-layer architecture */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#F1F5F9]">
              How TMIP is put together.
            </h2>
            <p className="font-ibm-plex text-base sm:text-lg leading-[1.55] text-[#94A3B8]">
              Every layer of TMIP is engineered independently and integrated cleanly. The sensor layer captures. The
              edge layer filters. The cloud layer models. The intelligence layer predicts. The interface layer serves. Data
              flows up; decisions flow down.
            </p>
          </div>

          {/* Architecture Diagram (5-layer vertical stack) */}
          <div className="space-y-4 max-w-4xl">
            {layers.map((layer, idx) => {
              const Icon = layer.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-[#3B82F6]/40 transition-all duration-200 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div
                      className="w-12 h-12 rounded-[4px] flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: `${layer.color}15`,
                        borderColor: `${layer.color}40`,
                        color: layer.color,
                      }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-3">
                        <span className="font-jetbrains text-xs font-bold text-[#3B82F6] uppercase">{layer.num}</span>
                        <span className="text-[10px] font-jetbrains px-2.5 py-0.5 rounded-[3px] bg-white/[0.04] border border-slate-400/10 text-[#94A3B8]">
                          {layer.badge}
                        </span>
                      </div>
                      <h3 className="font-space-grotesk text-xl font-semibold text-[#F1F5F9]">{layer.title}</h3>
                      <p className="font-ibm-plex text-sm text-[#94A3B8] leading-relaxed max-w-2xl">{layer.desc}</p>
                    </div>
                  </div>

                  <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-slate-400/10 pt-3 md:pt-0">
                    <span className="text-[11px] font-jetbrains text-[#64748B]">Bi-directional Sync</span>
                    <span className="text-xs font-jetbrains text-[#10B981] font-semibold">Active · 99.7%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section · What you get across all five layers */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
              DIFFERENTIATORS
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#F1F5F9]">
              Six things TMIP does that legacy fleet software does not.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {differentiators.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-[#3B82F6]/30 transition-all duration-200 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-space-grotesk text-lg font-semibold text-[#F1F5F9]">{item.title}</h3>
                  <p className="font-ibm-plex text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section · Feature detail links */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-semibold">
              CORE CAPABILITIES
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#F1F5F9]">
              Explore the platform, feature by feature.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featureCards.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <Link
                  key={idx}
                  href={feat.href}
                  className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-[#3B82F6]/40 hover:-translate-y-1 transition-all duration-200 group flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-[#050A17] transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-space-grotesk text-xl font-semibold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="font-ibm-plex text-sm text-[#94A3B8] leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="font-jetbrains text-xs text-[#3B82F6] flex items-center gap-1.5 font-semibold">
                    Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section · Integration snapshot */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto space-y-10">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold tracking-[-0.03em] text-[#F1F5F9]">
              Native integrations, out of the box.
            </h2>
            <p className="font-ibm-plex text-base sm:text-lg leading-[1.55] text-[#94A3B8]">
              TMIP integrates natively with the transport management systems fleet operators already use. Fleetx,
              Locus, LogiNext, SAP, Oracle, and custom middleware are supported today. If your stack is not listed, we
              build the integration.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[3px] bg-[#0B1220]/80 border border-slate-400/10 flex items-center justify-center text-center font-jetbrains text-xs font-semibold text-[#CBD5E1] hover:border-[#3B82F6]/40 transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section · Security snapshot */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl p-8 sm:p-12 rounded-[4px] bg-[#0B1220]/90 border border-slate-400/10 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-jetbrains text-[#10B981] uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise Security &amp; Compliance</span>
              </div>
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-semibold text-[#F1F5F9]">
                Enterprise-grade security posture.
              </h2>
              <p className="font-ibm-plex text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                TMIP runs on cloud infrastructure with 99.7 percent trailing 90-day uptime, encrypted data in transit and
                at rest, and role-based access controls. Compliance with India DPDP Act 2023 is standard. Full security
                posture available on request.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/tmip/security"
                className="px-7 py-3.5 rounded-[3px] font-ibm-plex font-medium text-sm text-[#F1F5F9] border border-[rgba(59,130,246,0.3)] hover:border-[#3B82F6] hover:bg-[#3B82F6]/[0.08] inline-flex items-center gap-2 transition-all duration-200"
              >
                Read the security page <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-t border-[rgba(59,130,246,0.15)] bg-gradient-to-br from-[#3B82F6]/[0.06] to-[#F59E0B]/[0.04]">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-[#F1F5F9]">
              See it running on your fleet.
            </h2>
            <div className="pt-2">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[3px] font-space-grotesk font-semibold text-sm sm:text-base bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] shadow-lg shadow-[#3B82F6]/20 transition-all duration-200"
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