import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  HardHat,
  Clock,
  CheckCircle2,
  TrendingDown,
  Layers,
  Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Quarry Transit Tippers · TMIP Case Study",
  description:
    "How an infrastructure contractor running 280 heavy tippers reduced tyre scrap by 14% and cut site downtime by 31% on harsh quarry routes with TMIP.",
  alternates: {
    canonical: "https://treel.in/tmip/customers/case-studies/quarry-transit-tippers",
  },
  openGraph: {
    title: "Quarry Transit Tippers · TMIP Case Study",
    description:
      "How an infrastructure contractor running 280 heavy tippers reduced tyre scrap by 14% and cut site downtime by 31% on harsh quarry routes with TMIP.",
    url: "https://treel.in/tmip/customers/case-studies/quarry-transit-tippers",
  },
};

const results = [
  {
    value: "14% Lower",
    label: "Tyre Scrap Rate",
    delta: "Preserved casing retreadability",
    desc: "Real-time thermal monitoring prevented ply separation, unlocking two additional retread cycles per casing.",
  },
  {
    value: "31%",
    label: "Downtime Reduction",
    delta: "Trailing 12-month average",
    desc: "Eliminated en-route punctures on unpaved quarry approach roads that previously stalled paving operations.",
  },
  {
    value: "6.1%",
    label: "Fuel Efficiency Improvement",
    delta: "Under maximum payload cycles",
    desc: "Calibrated tyre inflation minimized rolling drag across mixed asphalt and unpaved gravel road stretches.",
  },
  {
    value: "7.4 mo",
    label: "Capital Payback",
    delta: "Full deployment payback",
    desc: "Hardware fitment and software subscriptions fully amortized by casing savings and avoided batch delays.",
  },
];

export default function QuarryTransitCaseStudyPage() {
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
            <span className="text-[#3B82F6] truncate">Quarry Transit Tippers</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains tracking-widest text-[#3B82F6] uppercase font-semibold">
                CONSTRUCTION
              </span>
              <span className="border border-slate-400/10 bg-white/[0.03] px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#94A3B8]">
                100–500 VEHICLES
              </span>
              <span className="text-xs font-jetbrains text-[#94A3B8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                12-Month Project Audit
              </span>
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Extending tipper tyre life in severe dust-heavy quarry routes.
            </h1>

            <p className="text-sm font-jetbrains text-[#94A3B8]">
              TMIP Customer Story · Infrastructure Fleets Group · Published 2026
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
                  A major highway engineering contractor executing multi-lane expressway and corridor paving packages.
                  Their operations deploy 280 multi-axle tippers and heavy transit concrete mixers transporting crushed
                  aggregate, gravel, and asphalt from crushing plants to active highway paving sectors.
                </p>
                <p>
                  Vehicles operate under intense 35-ton payloads across rugged quarry approaches, unpaved work sites, and
                  paved highways, making tyre preservation and equipment availability critical to project timelines.
                </p>
              </div>
            </div>

            {/* What they came to us for */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What they came to us for</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  Aggressive site conditions caused severe operational friction for the construction fleet:
                </p>
                <ul className="space-y-3 pl-4 border-l-2 border-[#3B82F6]/40 text-base text-[#CBD5E1]">
                  <li>
                    <strong className="text-[#F1F5F9]">Premature casing destruction:</strong> Jagged quarry rocks and
                    under-inflation punctures caused deep sidewall flex and carcass fatigue, reducing casing retreadability
                    to under 20%.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Paving train delays:</strong> When a transit mixer or tipper blew
                    a tyre on a single-lane site haul road, continuous paving machines were forced to halt, risking
                    concrete setting failures.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Heavy dust and vibration sensor failures:</strong> Third-party
                    commercial telematics failed repeatedly due to fine stone dust immersion and severe suspension shocks.
                  </li>
                </ul>
              </div>
            </div>

            {/* What we built together */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What we built together</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  Treel deployed ARAI-certified ruggedized TMIP IoT hardware engineered specifically for heavy earthmoving
                  and construction applications:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-2">
                    <div className="text-xs font-jetbrains font-bold text-[#3B82F6] uppercase">Dust & Shock Shielding</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      IP67-rated internal wheel sensors protected against high-pressure washdown jets and quarry dust
                      immersion.
                    </p>
                  </div>
                  <div className="p-4 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-2">
                    <div className="text-xs font-jetbrains font-bold text-[#10B981] uppercase">Off-Highway Data Buffer</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      Autonomous edge memory logging 48+ hours of continuous vibration and pressure metrics during
                      off-grid quarry runs.
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
                  With real-time pressure monitoring, tipper tyre casings were protected from under-inflated heat
                  delamination. Scrap rates dropped by 14%, and average casing retreadability increased from 1.1 cycles
                  to 2.4 cycles per tyre.
                </p>
                <p>
                  Site project managers synchronized wheel-end inspections with scheduled batching plant maintenance
                  breaks, cutting unexpected site downtime by 31% and achieving capital payback in 7.4 months.
                </p>
              </div>
            </div>

            {/* Customer Quote */}
            <div className="p-8 rounded-[4px] bg-[#080E1E] border-l-4 border-[#3B82F6] space-y-4">
              <p className="text-lg sm:text-xl text-[#F1F5F9] italic leading-relaxed font-space-grotesk">
                &ldquo;Our tippers run in brutal conditions—deep gravel, dust, and maximum loads. TMIP sensors survived
                the punishment and showed us exactly which tyres were losing pressure before a blowout stopped our paving
                gang.&rdquo;
              </p>
              <div className="text-xs font-jetbrains text-[#94A3B8]">
                Plant & Machinery Head · National Highway Infrastructure Developer
              </div>
            </div>

            {/* Life on TMIP */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Life on TMIP</h2>
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                Project site supervisors now monitor live vehicle health on ruggedized mobile tablets at the batching
                plant gate. Tippers showing pressure loss are automatically flagged for immediate top-up at the site
                service bay before returning to the quarry run.
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
              href="/tmip/customers/case-studies/open-cast-haulage-analytics"
              className="p-6 rounded-[4px] bg-[#050A17] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all space-y-3 group"
            >
              <div className="text-xs font-jetbrains text-[#3B82F6]">MINING · RIGID DUMP TRUCKS</div>
              <h3 className="font-space-grotesk font-bold text-base text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                Preventing high-tonnage dumper downtime in mining pits.
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-ibm-plex">
                99.4% haul fleet uptime and ₹2.1 Cr savings in central India mining corridors.
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
              href="/tmip/customers/case-studies/cold-chain-express-transit"
              className="p-6 rounded-[4px] bg-[#050A17] border border-slate-400/10 hover:border-[#3B82F6]/50 transition-all space-y-3 group"
            >
              <div className="text-xs font-jetbrains text-[#3B82F6]">LOGISTICS · 320 REEFERS</div>
              <h3 className="font-space-grotesk font-bold text-base text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                Protecting perishable pharmaceutical corridors.
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed font-ibm-plex">
                Zero roadside cargo spoilage events and ₹1.4 Cr saved annually.
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
