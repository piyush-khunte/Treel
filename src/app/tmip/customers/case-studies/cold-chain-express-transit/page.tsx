import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  TrendingDown,
  Clock,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ThermometerSnowflake,
  Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cold Chain Express Transit · TMIP Case Study",
  description:
    "How a national cold-chain freight fleet running 320 reefers saved ₹1.4 Cr annually and eliminated roadside temperature breaches with TMIP telemetry.",
  alternates: {
    canonical: "https://treel.in/tmip/customers/case-studies/cold-chain-express-transit",
  },
  openGraph: {
    title: "Cold Chain Express Transit · TMIP Case Study",
    description:
      "How a national cold-chain freight fleet running 320 reefers saved ₹1.4 Cr annually and eliminated roadside temperature breaches with TMIP telemetry.",
    url: "https://treel.in/tmip/customers/case-studies/cold-chain-express-transit",
  },
};

const results = [
  {
    value: "₹1.4 Cr",
    label: "Annual Operating Savings",
    delta: "Fuel & maintenance reduction",
    desc: "Measured across optimized rolling resistance, reduced reefer generator draw, and extended tyre casing life.",
  },
  {
    value: "4.8%",
    label: "Fleet Fuel Savings",
    delta: "vs. pre-deployment baseline",
    desc: "Maintaining optimal tyre inflation reduced aggregate engine drag across high-speed Western Express corridors.",
  },
  {
    value: "38%",
    label: "Fewer Transit Delays",
    delta: "Trailing 12 months",
    desc: "Pre-dispatch pressure validation eliminated en-route slow-puncture stops and roadside emergency repairs.",
  },
  {
    value: "99.8%",
    label: "On-Time SLA Adherence",
    delta: "Zero cargo spoilage events",
    desc: "Protecting high-value pharmaceutical and perishable cargo against unscheduled highway thermal breakdowns.",
  },
];

export default function ColdChainCaseStudyPage() {
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
            <span className="text-[#3B82F6] truncate">Cold Chain Express Transit</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains tracking-widest text-[#3B82F6] uppercase font-semibold">
                LOGISTICS · COLD CHAIN
              </span>
              <span className="border border-slate-400/10 bg-white/[0.03] px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#94A3B8]">
                100–500 VEHICLES
              </span>
              <span className="text-xs font-jetbrains text-[#94A3B8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                14-Month Operational Review
              </span>
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Protecting perishable pharmaceutical corridors with synchronized sensor telemetry.
            </h1>

            <p className="text-sm font-jetbrains text-[#94A3B8]">
              TMIP Customer Story · Cold Chain Logistics Group · Published 2026
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="relative z-10 py-12 px-6 sm:px-10 border-b border-slate-400/10 bg-[#050A17]">
        <div className="max-w-[1320px] mx-auto">
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
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto">
          <div className="max-w-4xl space-y-16">
            {/* Who they are */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Who they are</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  A specialized national cold-chain logistics enterprise operating 320 temperature-controlled
                  refrigerated trucks across north-south pharmaceutical and perishable food corridors. They serve major
                  biopharma manufacturers and national grocery chains requiring continuous 2°C–8°C thermal compliance.
                </p>
                <p>
                  Their tractors and reefers log over 3.5 million cumulative kilometres monthly, where unscheduled delays
                  risk catastrophic cargo spoilage and SLA penalty defaults.
                </p>
              </div>
            </div>

            {/* What they came to us for */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What they came to us for</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  Cold chain freight combines the tight delivery windows of express logistics with high product liability.
                  The operator faced three specific challenges:
                </p>
                <ul className="space-y-3 pl-4 border-l-2 border-[#3B82F6]/40 text-base text-[#CBD5E1]">
                  <li>
                    <strong className="text-[#F1F5F9]">Vulnerability to roadside breakdowns:</strong> A single roadside
                    tyre failure in remote stretches placed multi-crore active pharmaceutical consignments at risk of
                    reefer generator thermal exhaustion.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Rolling resistance &amp; fuel draw:</strong> Tyres running at 15 PSI
                    under-inflation increased rolling drag by 8%, compounding diesel consumption across both prime mover
                    and trailer reefer units.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Pre-departure blind spots:</strong> Yard mechanics lacked automated
                    systems to confirm tyre pressure and casing integrity before reefers departed hub facilities.
                  </li>
                </ul>
              </div>
            </div>

            {/* What we built together */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What we built together</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  Treel fitted TMIP high-frequency wireless wheel-end sensors across all tractor and reefer trailer axle
                  positions, synchronizing telemetry into the central fleet management interface:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-2">
                    <div className="text-xs font-jetbrains font-bold text-[#3B82F6] uppercase">Hub Pre-Dispatch Gateway</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      Automated gate readers verify nominal tyre pressure and wheel-end temperature before a reefer
                      clears hub departure barriers.
                    </p>
                  </div>
                  <div className="p-4 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-2">
                    <div className="text-xs font-jetbrains font-bold text-[#10B981] uppercase">Corridor Thermal Tracking</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      Continuous cloud monitoring correlating highway ambient temperatures with internal tyre inflation
                      curves.
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
                  Over 14 months of operation, the cold-chain fleet recorded zero catastrophic tyre failures in transit.
                  Pre-departure automated gate checks detected 142 slow punctures at the depot before vehicles commenced
                  expressway transit.
                </p>
                <p>
                  Operating at calibrated nominal pressures lowered total fuel expenditure by 4.8%, delivering ₹1.4 Cr in
                  annualized operating cost reductions while maintaining a 99.8% on-time delivery record.
                </p>
              </div>
            </div>

            {/* Customer Quote */}
            <div className="p-8 rounded-[4px] bg-[#080E1E] border-l-4 border-[#3B82F6] space-y-4">
              <p className="text-lg sm:text-xl text-[#F1F5F9] italic leading-relaxed font-space-grotesk">
                &ldquo;When you carry temperature-sensitive pharma, an unscheduled stop in summer heat is a multi-crore
                emergency. TMIP eliminated roadside tyre failures from our transit equations and cut our fuel bill
                substantially.&rdquo;
              </p>
              <div className="text-xs font-jetbrains text-[#94A3B8]">
                Chief Operating Officer · National Cold Chain Logistics
              </div>
            </div>

            {/* Life on TMIP */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Life on TMIP</h2>
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                Reefer dispatch controllers now manage vehicle readiness with green-light departure validation on their
                TMS screens. Fleet managers receive instant exception alerts if a trailer tyre loses more than 2 PSI
                during transit, directing the vehicle to scheduled service points without interrupting temperature
                integrity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies Strip */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1320px] mx-auto space-y-8">
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
              href="/tmip/customers/case-studies/intercity-passenger-express"
              className="p-6 rounded-[4px] bg-[#050A17] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all space-y-3 group"
            >
              <div className="text-xs font-jetbrains text-[#3B82F6]">PASSENGER · 650 COACHES</div>
              <h3 className="font-space-grotesk font-bold text-base text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                Eliminating high-speed tyre failures on expressways.
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-ibm-plex">
                Zero roadside blowouts in 18 months across high-speed western expressway corridors.
              </p>
            </Link>

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
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="relative z-10 py-20 px-6 sm:px-10 bg-[#050A17]">
        <div className="max-w-[1320px] mx-auto">
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
