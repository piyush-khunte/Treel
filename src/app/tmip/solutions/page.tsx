import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Truck, Bus, HardHat, Pickaxe, Award, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Solutions by Industry  ·  TMIP",
  description:
    "TMIP for logistics, passenger transport, construction, mining, and OEM fleet operators. Same platform, industry-tuned deployments.",
  alternates: {
    canonical: "https://treel.in/tmip/solutions",
  },
  openGraph: {
    title: "Solutions by Industry  ·  TMIP",
    description:
      "TMIP for logistics, passenger transport, construction, mining, and OEM fleet operators. Same platform, industry-tuned deployments.",
    url: "https://treel.in/tmip/solutions",
  },
};

const industryCards = [
  {
    icon: Truck,
    title: "Logistics",
    body: "Long-haul and last-mile logistics operators managing dispatch, delivery windows, and route optimization at scale.",
    href: "/tmip/solutions/logistics",
    cta: "See logistics",
  },
  {
    icon: Bus,
    title: "Passenger transport",
    body: "Bus operators, corporate transport, school transport, and inter-city passenger fleets where safety and uptime matter.",
    href: "/tmip/solutions/passenger-transport",
    cta: "See passenger transport",
  },
  {
    icon: HardHat,
    title: "Construction",
    body: "Ready-mix concrete, tipper, and construction equipment fleets operating in demanding terrain and dust-heavy environments.",
    href: "/tmip/solutions/construction",
    cta: "See construction",
  },
  {
    icon: Pickaxe,
    title: "Mining",
    body: "Off-highway mining fleets where downtime costs are extreme and maintenance windows are unforgiving.",
    href: "/tmip/solutions/mining",
    cta: "See mining",
  },
  {
    icon: Award,
    title: "OEM fleet",
    body: "OEM-branded fleet solutions for Tata, Mahindra, and other commercial vehicle manufacturers. Integrated at the vehicle-delivery stage.",
    href: "/tmip/solutions/oem-fleet",
    cta: "See OEM fleet",
  },
];

export default function TmipSolutionsPage() {
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
      <section className="relative z-10 pt-24 sm:pt-28 pb-20 sm:pb-24 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="tmip"
              items={[
                { label: "TMIP", href: "/tmip" },
                { label: "Solutions" },
              ]}
            />
            <div className="font-jetbrains text-[11px] tracking-[0.2em] uppercase text-[#3B82F6] font-medium">
              SOLUTIONS
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              One platform. Five industries.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl font-ibm-plex">
              TMIP serves fleet operators across five commercial vehicle industries. The platform is the same. The
              deployments are tuned to how each industry actually runs its fleet.
            </p>
          </div>
        </div>
      </section>

      {/* Section · Industry cards */}
      <section className="relative z-10 py-20 lg:py-24 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {industryCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6] group-hover:bg-[#3B82F6] group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">{card.title}</h3>
                    <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-ibm-plex">{card.body}</p>
                  </div>
                  <div className="pt-2">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] group-hover:text-white transition-colors"
                    >
                      {card.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section · Industry-agnostic value */}
      <section className="relative z-10 py-20 lg:py-24 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-jetbrains text-[#F59E0B] uppercase tracking-wider font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Universal Value Proposition</span>
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              What works across every industry.
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
              Regardless of industry, TMIP customers see the same fundamentals: reduced cost per kilometre, extended
              component life, fewer unscheduled downtime events, and better data for capital allocation. The industry
              tuning is in the alert thresholds, the maintenance patterns, and the integrations — not in the platform
              architecture.
            </p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative z-10 py-20 lg:py-24 border-b border-slate-400/10 bg-[#050A17]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              See how TMIP fits your industry.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Schedule a technical walk-through tailored to your vehicle specifications, route topologies, and depot
              workflows.
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