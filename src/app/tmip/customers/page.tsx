import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, CheckCircle2, Building2, Truck, Bus, HardHat, Pickaxe, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Customers  ·  TMIP",
  description:
    "Two hundred enterprise fleet operators run on TMIP. Sixty-eight thousand vehicles under management. See the customers, the industries, and the outcomes.",
  alternates: {
    canonical: "https://treel.in/tmip/customers",
  },
  openGraph: {
    title: "Customers  ·  TMIP",
    description:
      "Two hundred enterprise fleet operators run on TMIP. Sixty-eight thousand vehicles under management. See the customers, the industries, and the outcomes.",
    url: "https://treel.in/tmip/customers",
  },
};

const customerGroups = [
  {
    category: "Logistics",
    icon: Truck,
    customers: [
      { name: "National Linehaul Logistics", fleetSize: "1,200+ Heavy Commercials", region: "Pan-India Corridor" },
      { name: "Express Cargo Networks", fleetSize: "850 Multi-Axle Trucks", region: "Western & Southern India" },
      { name: "Cold-Chain Fleet Operators", fleetSize: "420 Temperature-Controlled Units", region: "National Transit" },
    ],
  },
  {
    category: "Passenger Transport",
    icon: Bus,
    customers: [
      { name: "Intercity Luxury Coach Lines", fleetSize: "650 Premium Buses", region: "South & West Corridors" },
      { name: "Metropolitan Corporate Mobility", fleetSize: "320 Electric & CNG Shuttles", region: "NCR & Bengaluru" },
    ],
  },
  {
    category: "Construction & Infrastructure",
    icon: HardHat,
    customers: [
      { name: "Infrastructure Ready-Mix Fleet", fleetSize: "500 Heavy Transit Mixers", region: "Western Region" },
      { name: "Highway Construction Haulers", fleetSize: "380 Multi-Axle Tippers", region: "Northern Expressways" },
    ],
  },
  {
    category: "Mining & Heavy Industrial",
    icon: Pickaxe,
    customers: [
      { name: "Open-Cast Haulage Fleet", fleetSize: "280 Heavy-Duty Dumpers", region: "Central Mining Belt" },
    ],
  },
  {
    category: "OEM Partners",
    icon: Award,
    customers: [
      { name: "Tata Commercial Vehicles Tier-1 Deployment", fleetSize: "Pre-Delivery Fitment", region: "National Distribution" },
      { name: "Mahindra Commercial Vehicles Mobility Partner", fleetSize: "OEM Telemetry Standard", region: "Factory Fitted" },
    ],
  },
];

const featuredCaseStudies = [
  {
    tag: "LOGISTICS",
    headline: "1,000 trucks. 12 months. What changed.",
    metric: "5.2% Fuel Savings · 6.8% Tyre Life Extension",
    body: "A comprehensive Pan-India linehaul operator reduced roadside punctures by 34% and hit complete capital payback in under 9 months.",
    href: "/tmip/customers/case-studies/1000-truck-case-study",
  },
  {
    tag: "PASSENGER",
    headline: "Zero unscheduled highway tyre events across 450 coaches.",
    metric: "99.8% On-Time Scheduled Departures",
    body: "Predictive thermal anomaly detection eliminated catastrophic tyre bursts on 100 km/h expressway routes.",
    href: "/tmip/customers/case-studies",
  },
  {
    tag: "CONSTRUCTION",
    headline: "Extending tipper tyre life in severe quarry environments.",
    metric: "14% Lower Tyre Scrap Rate",
    body: "High-frequency pressure telemetry prevented under-inflation carcass damage under maximum payload conditions.",
    href: "/tmip/customers/case-studies",
  },
];

export default function TmipCustomersPage() {
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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-jetbrains text-xs tracking-wider uppercase font-semibold">
              CUSTOMERS
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Two hundred fleets. Sixty-eight thousand vehicles.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl font-ibm-plex">
              TMIP&apos;s customer base spans logistics, passenger transport, construction, mining, and OEM fleet
              operators. Below are the companies we work with, the industries they represent, and how they measure success
              on TMIP.
            </p>
          </div>
        </div>
      </section>

      {/* Section · Trust signals */}
      <section className="relative z-10 py-12 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1.5">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                68,412
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8] font-ibm-plex">Vehicles under management</div>
              <div className="text-xs font-jetbrains text-[#10B981] font-medium">Pan-India deployed</div>
            </div>

            <div className="space-y-1.5">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                200+
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8] font-ibm-plex">Enterprise customers</div>
              <div className="text-xs font-jetbrains text-[#3B82F6] font-medium">Across 5 sectors</div>
            </div>

            <div className="space-y-1.5">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                99.7%
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8] font-ibm-plex">Platform uptime</div>
              <div className="text-xs font-jetbrains text-[#10B981] font-medium">Trailing 90 days</div>
            </div>

            <div className="space-y-1.5">
              <div className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                &lt;4 hr
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8] font-ibm-plex">Support SLA</div>
              <div className="text-xs font-jetbrains text-[#F59E0B] font-medium">Dedicated solutions engineers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Customer logo wall / Roster */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              A partial list of who runs on TMIP.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Enterprise fleets deploy TMIP to protect tyres, save fuel, and transform operations into queryable
              intelligence surfaces.
            </p>
          </div>

          <div className="space-y-10">
            {customerGroups.map((group, idx) => {
              const Icon = group.icon;
              return (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-2.5 text-sm font-space-grotesk font-bold text-[#F1F5F9] border-b border-slate-400/10 pb-2">
                    <Icon className="w-4 h-4 text-[#3B82F6]" />
                    <span>{group.category}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.customers.map((c, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-[4px] bg-[#0B1220] border border-slate-400/10 hover:border-[#3B82F6]/40 transition-all space-y-2"
                      >
                        <div className="text-sm font-semibold text-[#F1F5F9] font-ibm-plex">{c.name}</div>
                        <div className="flex items-center justify-between text-xs font-jetbrains text-[#94A3B8]">
                          <span>{c.fleetSize}</span>
                          <span className="text-[#3B82F6]">{c.region}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section · Featured case studies */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1320px] mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-4">
              <div className="text-xs font-jetbrains tracking-widest text-[#3B82F6] uppercase font-semibold">
                PROVEN RESULTS
              </div>
              <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Read the full stories.
              </h2>
            </div>
            <Link
              href="/tmip/customers/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:underline"
            >
              See all case studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredCaseStudies.map((study, idx) => (
              <div
                key={idx}
                className="p-8 rounded-[4px] bg-[#0B1220] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <span className="text-[11px] font-jetbrains uppercase tracking-wider text-[#3B82F6] font-semibold">
                    {study.tag}
                  </span>
                  <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                    {study.headline}
                  </h3>
                  <div className="font-jetbrains text-xs text-[#10B981] font-semibold bg-[#10B981]/10 px-3 py-1.5 rounded-[2px] border border-[#10B981]/20">
                    {study.metric}
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">{study.body}</p>
                </div>
                <div className="pt-2">
                  <Link
                    href={study.href}
                    className="inline-flex items-center gap-1.5 text-xs font-jetbrains font-semibold text-[#3B82F6] group-hover:text-white transition-colors"
                  >
                    Read case study <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section · What our customers report back */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#050A17]">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-4xl p-8 sm:p-12 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-jetbrains text-[#10B981] uppercase tracking-wider font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Retention &amp; Payback</span>
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Retention rate that speaks for itself.
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
              TMIP customer retention holds where category peers see churn. Our net revenue retention across the
              trailing 12 months exceeds industry benchmarks for enterprise fleet software. The reason is simple: we
              sell only when the payback math works.
            </p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              Join them.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Find out how TMIP can generate positive net operating payback across your fleet within nine months.
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