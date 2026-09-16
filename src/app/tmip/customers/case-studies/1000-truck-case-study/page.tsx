import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, CheckCircle2, TrendingDown, Clock, ShieldCheck, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "1,000 trucks. 12 months. What changed. · TMIP Case Study",
  description:
    "The full operational story of a large logistics fleet running TMIP for one year. 5.2% fuel savings, 6.8% tyre life extension, 34% reduction in unscheduled downtime.",
  alternates: {
    canonical: "https://treel.in/tmip/customers/case-studies/1000-truck-case-study",
  },
  openGraph: {
    title: "1,000 trucks. 12 months. What changed. · TMIP Case Study",
    description:
      "The full operational story of a large logistics fleet running TMIP for one year. 5.2% fuel savings, 6.8% tyre life extension, 34% reduction in unscheduled downtime.",
    url: "https://treel.in/tmip/customers/case-studies/1000-truck-case-study",
  },
};

const results = [
  {
    value: "5.2%",
    label: "Fuel Savings",
    delta: "vs. pre-deployment baseline",
    desc: "Measured across 18 million cumulative fleet kilometres on NH-48 and NH-44 corridors.",
  },
  {
    value: "6.8%",
    label: "Tyre-Life Extension",
    delta: "Fleet median improvement",
    desc: "Average steer and drive axle casing life extended by 14,000+ kilometres before first retread.",
  },
  {
    value: "34%",
    label: "Downtime Reduction",
    delta: "Trailing 12 months",
    desc: "Punctures, slow-leaks, and thermal blowouts detected and rectified at scheduled depot stops.",
  },
  {
    value: "8.6 mo",
    label: "Capital Payback",
    delta: "Full deployment payback",
    desc: "Hardware fitment, cloud subscriptions, and integration costs fully amortized by operational savings.",
  },
];

export default function OneThousandTruckCaseStudyPage() {
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

      {/* Header & Breadcrumb */}
      <section className="relative z-10 pt-24 sm:pt-28 pb-16 sm:pb-20 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-6">
            <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
              TMIP
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link href="/tmip/customers" className="hover:text-[#F1F5F9] transition-colors">
              Customers
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <Link href="/tmip/customers/case-studies" className="hover:text-[#F1F5F9] transition-colors">
              Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/30" />
            <span className="text-[#3B82F6] truncate">1,000-Truck Deployment</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains tracking-widest text-[#3B82F6] uppercase font-semibold">
                LOGISTICS
              </span>
              <span className="border border-slate-400/10 bg-white/[0.03] px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#94A3B8]">
                1,000+ VEHICLES
              </span>
              <span className="text-xs font-jetbrains text-[#94A3B8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                12-Month Deployment Review
              </span>
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              1,000 trucks. 12 months. What changed.
            </h1>

            <p className="text-sm font-jetbrains text-[#94A3B8]">
              TMIP Customer Story · Operational Audit Group · Published October 2026
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="relative z-10 py-12 border-b border-slate-400/10 bg-[#050A17]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((res, i) => (
              <div key={i} className="p-6 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-2">
                <div className="font-space-grotesk text-3xl sm:text-4xl font-bold text-[#10B981]">{res.value}</div>
                <div className="text-sm font-semibold text-[#F1F5F9] font-ibm-plex">{res.label}</div>
                <div className="text-xs font-jetbrains text-[#3B82F6]">{res.delta}</div>
                <p className="text-xs text-[#94A3B8] pt-1 leading-relaxed font-ibm-plex">{res.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Narrative Content */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-16">
            {/* The Customer */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Who they are</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  A Tier-1 Pan-India logistics enterprise operating a linehaul fleet of over 1,000 heavy commercial
                  vehicles across long-haul freight corridors. Their operations connect primary manufacturing clusters in
                  western India to distribution hubs across northern, eastern, and southern metropolitan markets.
                </p>
                <p>
                  With tractors logging between 10,000 and 14,000 kilometres per month, tyre replacement and diesel
                  consumption constitute the two largest controllable line items in their operating expense structure.
                </p>
              </div>
            </div>

            {/* The Challenge */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What they came to us for</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  Prior to deploying TMIP, tyre maintenance relied on manual yard checks using handheld mechanical
                  gauges during scheduled depot returns. This approach presented three structural liabilities:
                </p>
                <ul className="space-y-3 pl-4 border-l-2 border-[#3B82F6]/40 text-base text-[#CBD5E1]">
                  <li>
                    <strong className="text-[#F1F5F9]">Slow pressure loss in transit:</strong> Punctures occurring
                    between transit hubs went undetected until tyre temperatures spiked to critical failure levels,
                    destroying valuable casings.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Under-inflation rolling resistance:</strong> A significant portion
                    of the fleet operated at 10-15 PSI below optimal pressure, driving up fuel burn across high-speed
                    highway stretches.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Unscheduled breakdown disruption:</strong> En-route roadside
                    tyre changes averaged 4.5 hours of vehicle downtime, triggering customer delivery SLA penalties and
                    driver fatigue.
                  </li>
                </ul>
              </div>
            </div>

            {/* The Deployment */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What we built together</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  Treel executed a phased 90-day rollout across seven major maintenance hubs:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-5 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-2">
                    <div className="font-jetbrains text-xs text-[#3B82F6] font-bold">STAGE 01 · DAYS 1-30</div>
                    <div className="font-space-grotesk font-bold text-[#F1F5F9]">Hardware Retrofit</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      ARAI-certified valve-stem sensors fitted to all 18 tyre positions per tractor-trailer unit, synced
                      to in-cabin edge telematics gateways.
                    </p>
                  </div>

                  <div className="p-5 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-2">
                    <div className="font-jetbrains text-xs text-[#3B82F6] font-bold">STAGE 02 · DAYS 31-60</div>
                    <div className="font-space-grotesk font-bold text-[#F1F5F9]">TMS Integration</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      Native bi-directional REST webhooks linked TMIP telemetry directly into the client&apos;s custom
                      enterprise dispatch ERP and workshop tools.
                    </p>
                  </div>

                  <div className="p-5 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-2">
                    <div className="font-jetbrains text-xs text-[#3B82F6] font-bold">STAGE 03 · DAYS 61-90</div>
                    <div className="font-space-grotesk font-bold text-[#F1F5F9]">Digital Twin Activation</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      Predictive degradation models trained on live corridor telemetry, enabling automated dispatch
                      notifications to route workshops.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Quote */}
            <div className="p-8 sm:p-10 rounded-[4px] bg-gradient-to-br from-[#0B1220] to-[#080E1E] border border-blue-500/20 relative">
              <blockquote className="space-y-4">
                <p className="font-space-grotesk text-xl sm:text-2xl text-[#F1F5F9] italic leading-relaxed">
                  &ldquo;Before TMIP, we managed tyre maintenance in hindsight. If a tyre blew out on the highway, we
                  paid the roadside fee, replaced the casing, and took the SLA hit. Today, our control room knows an axle
                  has a 4 PSI slow leak 120 kilometres before the driver stops for fuel. That single capability changed our
                  entire operating rhythm.&rdquo;
                </p>
                <footer className="pt-4 border-t border-slate-400/10">
                  <div className="font-space-grotesk font-bold text-[#F1F5F9]">Head of Fleet Engineering &amp; Maintenance</div>
                  <div className="text-xs font-jetbrains text-[#3B82F6]">Tier-1 Pan-India Logistics Operator</div>
                </footer>
              </blockquote>
            </div>

            {/* What they do differently now */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Life on TMIP</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  Today, the operator&apos;s central control tower monitors 18,000+ active tyre nodes in real time. Yard
                  inspection shifts no longer waste hours checking 1,000 healthy vehicles; instead, workshop dispatch
                  queues are automatically generated, directing mechanics only to assets displaying active pressure or
                  thermal variances.
                </p>
                <p>
                  By eliminating running on under-inflated tyres and preventing heat-induced blowouts, the fleet achieved
                  a documented 5.2% fuel savings and extended median casing life by 6.8%, reaching full project capital
                  payback in 8.6 months.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative z-10 py-20 lg:py-24 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              See if TMIP fits your fleet.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              If your operating profile looks similar to this customer&apos;s, the outcomes tend to look similar too.
              Book a demo and our solutions engineering team will walk through your fleet payback math.
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
