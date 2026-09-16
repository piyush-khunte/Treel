import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  TrendingDown,
  Clock,
  ShieldCheck,
  Pickaxe,
  CheckCircle2,
  AlertTriangle,
  Layers,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Open-Cast Haulage Analytics · TMIP Case Study",
  description:
    "How TMIP helped a heavy open-cast mining operation achieve 99.4% uptime and save ₹2.1 Cr annually across high-tonnage rigid dump trucks.",
  alternates: {
    canonical: "https://treel.in/tmip/customers/case-studies/open-cast-haulage-analytics",
  },
  openGraph: {
    title: "Open-Cast Haulage Analytics · TMIP Case Study",
    description:
      "How TMIP helped a heavy open-cast mining operation achieve 99.4% uptime and save ₹2.1 Cr annually across high-tonnage rigid dump trucks.",
    url: "https://treel.in/tmip/customers/case-studies/open-cast-haulage-analytics",
  },
};

const results = [
  {
    value: "99.4%",
    label: "Haul Fleet Availability",
    delta: "vs. 92.1% pre-deployment baseline",
    desc: "Eliminated catastrophic wheel-end failures stalling single-lane haul ramps during round-the-clock extraction shifts.",
  },
  {
    value: "22%",
    label: "Lower Tyre Scrap Rate",
    delta: "Cut-and-chip failure reduction",
    desc: "Real-time thermal threshold alerts prevented ply separation and extended casing lifespan under abrasive haulage.",
  },
  {
    value: "₹2.1 Cr",
    label: "Annualized Operating Savings",
    delta: "Direct parts & downtime savings",
    desc: "Measured across heavy OTR tyre replacements, emergency towing costs, and saved production hours.",
  },
  {
    value: "8.2 mo",
    label: "Capital Payback",
    delta: "Full deployment payback",
    desc: "Hardware installation, on-site edge gateways, and platform subscriptions fully amortized in under nine months.",
  },
];

export default function OpenCastHaulageCaseStudyPage() {
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
            <span className="text-[#3B82F6] truncate">Open-Cast Haulage Analytics</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains tracking-widest text-[#3B82F6] uppercase font-semibold">
                MINING
              </span>
              <span className="border border-slate-400/10 bg-white/[0.03] px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#94A3B8]">
                100–500 VEHICLES
              </span>
              <span className="text-xs font-jetbrains text-[#94A3B8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                18-Month Operational Review
              </span>
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Preventing high-tonnage dumper downtime in central India mining corridors.
            </h1>

            <p className="text-sm font-jetbrains text-[#94A3B8]">
              TMIP Customer Story · Heavy Mining Operations Group · Published 2026
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

      {/* Narrative Body */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-16">
            {/* Who they are */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Who they are</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  A premier open-cast mining contractor operating in central India, managing a dedicated fleet of over
                  180 rigid dump trucks, heavy tippers, and articulated excavators. Their operations haul overburden and
                  high-grade mineral ore from pit floors to primary crushing plants across round-the-clock shift
                  schedules.
                </p>
                <p>
                  With haul trucks operating on severe gradient ramps under 40+ ton payloads, wheel-end assemblies
                  experience intense mechanical torque, abrasive rock friction, and high thermal stress.
                </p>
              </div>
            </div>

            {/* What they came to us for */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What they came to us for</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  In high-tonnage mining, unscheduled downtime is measured in lakhs of rupees per hour. The operator
                  faced three structural challenges:
                </p>
                <ul className="space-y-3 pl-4 border-l-2 border-[#3B82F6]/40 text-base text-[#CBD5E1]">
                  <li>
                    <strong className="text-[#F1F5F9]">Haul ramp bottlenecks:</strong> A single tyre failure on a steep,
                    single-lane pit exit halted all trailing dumpers, freezing extraction cycles across the entire pit.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Cellular connectivity blackouts:</strong> Deep quarry excavations
                    frequently lost cellular signal, causing legacy cloud telematics systems to drop warning signals.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Premature OTR tyre scrapping:</strong> Undetected slow leaks and
                    uneven load-drag caused intense heat buildup, destroying multi-lakh tyre casings before their first
                    scheduled retread.
                  </li>
                </ul>
              </div>
            </div>

            {/* What we built together */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What we built together</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  Treel deployed ARAI-certified, heavy-duty TMIP industrial sensors with IP68-rated enclosures across all
                  wheel positions. The edge hardware included:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-2">
                    <div className="text-xs font-jetbrains font-bold text-[#3B82F6] uppercase">Offline Edge Buffer</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      On-vehicle edge gateways processing anomaly models locally with instant cab alarms during zero-signal
                      runs.
                    </p>
                  </div>
                  <div className="p-4 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-2">
                    <div className="text-xs font-jetbrains font-bold text-[#10B981] uppercase">Thermal Stress Models</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      Physics-informed algorithms that correlate ambient pit temperatures, axle load, and tyre inflation
                      levels.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What changed */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What changed</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  Within 90 days of deployment, the mining operation achieved continuous sub-second visibility into wheel
                  temperatures and pressure dynamics across all shifts.
                </p>
                <p>
                  Catastrophic tyre blowouts on active haul ramps dropped to zero over the 18-month evaluation period. Mine
                  superintendents received predictive alerts allowing drivers to pull into maintenance lay-bys before
                  casings suffered permanent structural damage.
                </p>
              </div>
            </div>

            {/* Customer Quote */}
            <div className="p-8 rounded-[4px] bg-[#080E1E] border-l-4 border-[#3B82F6] space-y-4">
              <p className="text-lg sm:text-xl text-[#F1F5F9] italic leading-relaxed font-space-grotesk">
                &ldquo;In an open-cast pit, one stalled dumper stops twenty other trucks behind it. TMIP gave us the
                offline reliability we needed to catch heat spikes before a tyre blew on the ramp. It paid for itself in
                less than nine months.&rdquo;
              </p>
              <div className="text-xs font-jetbrains text-[#94A3B8]">
                Operations Director · Heavy Mining & Infrastructure Group
              </div>
            </div>

            {/* Life on TMIP */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Life on TMIP</h2>
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                Today, the central mine dispatch room tracks real-time thermal curves for every active dumper. Shift
                handover reports highlight vehicles operating near threshold tolerances, allowing workshop crews to
                perform targeted tyre pressure balancing and wheel rotation during scheduled shift changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies Strip */}
      <section className="relative z-10 py-20 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">More customer stories</h2>
            <Link
              href="/tmip/customers/case-studies"
              className="text-xs font-jetbrains text-[#3B82F6] hover:underline flex items-center gap-1.5"
            >
              All case studies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/tmip/customers/case-studies/quarry-transit-tippers"
              className="p-6 rounded-[4px] bg-[#050A17] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all space-y-3 group"
            >
              <div className="text-xs font-jetbrains text-[#3B82F6]">CONSTRUCTION · 280 TIPPERS</div>
              <h3 className="font-space-grotesk font-bold text-base text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                Extending tipper tyre life in severe dust-heavy quarry routes.
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-ibm-plex">
                Protecting heavy transit tippers against severe puncture cycles and carcass fatigue.
              </p>
            </Link>

            <Link
              href="/tmip/customers/case-studies/1000-truck-case-study"
              className="p-6 rounded-[4px] bg-[#050A17] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all space-y-3 group"
            >
              <div className="text-xs font-jetbrains text-[#3B82F6]">LOGISTICS · 1,000 TRUCKS</div>
              <h3 className="font-space-grotesk font-bold text-base text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                1,000 trucks. 12 months. What changed.
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-ibm-plex">
                5.2% fuel savings, 6.8% tyre life extension, 34% downtime reduction across pan-India routes.
              </p>
            </Link>

            <Link
              href="/tmip/customers/case-studies/oem-pre-delivery-intelligence"
              className="p-6 rounded-[4px] bg-[#050A17] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all space-y-3 group"
            >
              <div className="text-xs font-jetbrains text-[#3B82F6]">OEM · 2,000+ VEHICLES</div>
              <h3 className="font-space-grotesk font-bold text-base text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                Tier-1 OEM factory integration delivering smart fleets.
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-ibm-plex">
                Factory-installed edge telematics delivering pre-configured digital twins on Day 1.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative z-10 py-20 bg-[#050A17]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-10 sm:p-14 rounded-[4px] bg-gradient-to-br from-[#080E1E] to-[#0B1220] border border-blue-500/30 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              See if TMIP fits your fleet.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-ibm-plex">
              If your operating profile looks similar to this customer&apos;s, the outcomes tend to look similar too.
              Book a demo and we will walk through the fit.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[3px] font-semibold text-base transition-all shadow-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
