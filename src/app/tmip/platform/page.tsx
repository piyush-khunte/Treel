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
    <div className="bg-[#050A17] text-[#F1F5F9] font-ibm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-semibold">
              PLATFORM
            </div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              One architecture. Five layers. Every vehicle a signal.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl">
              TMIP is built on a five-layer architecture that turns raw sensor data into operating decisions. This is how
              the platform works, layer by layer.
            </p>
          </div>
        </div>
      </section>

      {/* Section · The five-layer architecture */}
      <section className="py-20 lg:py-24 border-b border-white/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              How TMIP is put together.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
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
                  className="p-6 sm:p-7 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-[#3B82F6]/50 transition-all shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border"
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
                        <span className="font-mono text-xs font-bold text-[#3B82F6] uppercase">{layer.num}</span>
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#94A3B8]">
                          {layer.badge}
                        </span>
                      </div>
                      <h3 className="font-space text-xl font-bold text-[#F1F5F9]">{layer.title}</h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed max-w-2xl">{layer.desc}</p>
                    </div>
                  </div>

                  <div className="shrink-0 flex md:flex-col items-center md:items-end justify-between border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                    <span className="text-[11px] font-mono text-[#64748B]">Bi-directional Sync</span>
                    <span className="text-xs font-mono text-[#10B981] font-semibold">Active · 99.7%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section · What you get across all five layers */}
      <section className="py-20 lg:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-semibold">
              DIFFERENTIATORS
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Six things TMIP does that legacy fleet software does not.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {differentiators.map((item, idx) => (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#0B1220] border border-white/10 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h3 className="font-space text-lg font-bold text-[#F1F5F9]">{item.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section · Feature detail links */}
      <section className="py-20 lg:py-24 border-b border-white/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <div className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-semibold">
              CORE CAPABILITIES
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
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
                  className="p-8 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-[#3B82F6]/50 transition-all group flex flex-col justify-between space-y-6"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-space text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">{feat.desc}</p>
                  </div>
                  <div className="text-xs font-mono text-[#3B82F6] flex items-center gap-1.5 font-semibold">
                    Learn more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section · Integration snapshot */}
      <section className="py-20 lg:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-10">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Native integrations, out of the box.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              TMIP integrates natively with the transport management systems fleet operators already use. Fleetx,
              Locus, LogiNext, SAP, Oracle, and custom middleware are supported today. If your stack is not listed, we
              build the integration.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {integrations.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-[#0B1220] border border-white/10 flex items-center justify-center text-center font-mono text-xs font-semibold text-[#CBD5E1] hover:border-[#3B82F6]/40 transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section · Security snapshot */}
      <section className="py-20 lg:py-24 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-12 rounded-3xl bg-[#0B1220] border border-white/10 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#10B981] uppercase tracking-wider font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise Security &amp; Compliance</span>
              </div>
              <h2 className="font-space text-2xl sm:text-3xl font-bold text-[#F1F5F9]">
                Enterprise-grade security posture.
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                TMIP runs on cloud infrastructure with 99.7 percent trailing 90-day uptime, encrypted data in transit and
                at rest, and role-based access controls. Compliance with India DPDP Act 2023 is standard. Full security
                posture available on request.
              </p>
            </div>
            <div className="shrink-0">
              <Link
                href="/tmip/security"
                className="px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md inline-flex items-center gap-2 border border-white/20 text-[#F1F5F9] hover:bg-white/10"
              >
                Read the security page <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-20 lg:py-24 border-b border-white/10 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              See it running on your fleet.
            </h2>
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