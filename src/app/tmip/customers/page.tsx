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
    <div className="bg-[#050A17] text-[#F1F5F9] font-ibm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3.5 py-1 rounded-full text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-semibold">
              CUSTOMERS
            </div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Two hundred fleets. Sixty-eight thousand vehicles.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl">
              TMIP&apos;s customer base spans logistics, passenger transport, construction, mining, and OEM fleet
              operators. Below are the companies we work with, the industries they represent, and how they measure success
              on TMIP.
            </p>
          </div>
        </div>
      </section>

      {/* Section · Trust signals */}
      <section className="py-12 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-1.5">
              <div className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                68,412
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Vehicles under management</div>
              <div className="text-xs font-mono text-[#10B981] font-medium">Pan-India deployed</div>
            </div>

            <div className="space-y-1.5">
              <div className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                200+
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Enterprise customers</div>
              <div className="text-xs font-mono text-[#3B82F6] font-medium">Across 5 sectors</div>
            </div>

            <div className="space-y-1.5">
              <div className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                99.7%
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Platform uptime</div>
              <div className="text-xs font-mono text-[#10B981] font-medium">Trailing 90 days</div>
            </div>

            <div className="space-y-1.5">
              <div className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F1F5F9] tracking-tight">
                &lt;4 hr
              </div>
              <div className="text-xs sm:text-sm text-[#94A3B8]">Support SLA</div>
              <div className="text-xs font-mono text-[#F59E0B] font-medium">Dedicated solutions engineers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Customer logo wall / Roster */}
      <section className="py-20 lg:py-24 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              A partial list of who runs on TMIP.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Enterprise fleets deploy TMIP to protect tyres, save fuel, and transform operations into queryable
              intelligence surfaces.
            </p>
          </div>

          <div className="space-y-10">
            {customerGroups.map((group, idx) => {
              const Icon = group.icon;
              return (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-2.5 text-sm font-space font-bold text-[#F1F5F9] border-b border-white/10 pb-2">
                    <Icon className="w-4 h-4 text-[#3B82F6]" />
                    <span>{group.category}</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.customers.map((c, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-xl bg-[#0B1220] border border-white/10 hover:border-[#3B82F6]/40 transition-all space-y-2"
                      >
                        <div className="text-sm font-semibold text-[#F1F5F9]">{c.name}</div>
                        <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
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
      <section className="py-20 lg:py-24 border-b border-white/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-3xl space-y-4">
              <div className="text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-semibold">
                PROVEN RESULTS
              </div>
              <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
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
                className="p-8 rounded-2xl bg-[#0B1220] border border-white/10 hover:border-[#3B82F6]/50 transition-all flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#3B82F6] font-semibold">
                    {study.tag}
                  </span>
                  <h3 className="font-space text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                    {study.headline}
                  </h3>
                  <div className="font-mono text-xs text-[#10B981] font-semibold bg-[#10B981]/10 px-3 py-1.5 rounded-lg border border-[#10B981]/20">
                    {study.metric}
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{study.body}</p>
                </div>
                <div className="pt-2">
                  <Link
                    href={study.href}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#3B82F6] group-hover:text-white transition-colors"
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
      <section className="py-20 lg:py-24 border-b border-white/10 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-12 rounded-3xl bg-[#0B1220] border border-white/10 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[#10B981] uppercase tracking-wider font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Retention &amp; Payback</span>
            </div>
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Retention rate that speaks for itself.
            </h2>
            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
              TMIP customer retention holds where category peers see churn. Our net revenue retention across the
              trailing 12 months exceeds industry benchmarks for enterprise fleet software. The reason is simple: we
              sell only when the payback math works.
            </p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-20 lg:py-24 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              Join them.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Find out how TMIP can generate positive net operating payback across your fleet within nine months.
            </p>
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