import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Bus,
  Clock,
  CheckCircle2,
  TrendingDown,
  Activity,
  AlertOctagon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Intercity Passenger Express · TMIP Case Study",
  description:
    "How an intercity coach operator running 650 luxury buses eliminated thermal blowouts on expressways and achieved a 100% safety record with TMIP.",
  alternates: {
    canonical: "https://treel.in/tmip/customers/case-studies/intercity-passenger-express",
  },
  openGraph: {
    title: "Intercity Passenger Express · TMIP Case Study",
    description:
      "How an intercity coach operator running 650 luxury buses eliminated thermal blowouts on expressways and achieved a 100% safety record with TMIP.",
    url: "https://treel.in/tmip/customers/case-studies/intercity-passenger-express",
  },
};

const results = [
  {
    value: "0 Bursts",
    label: "Zero Highway Blowouts",
    delta: "18 months continuous operations",
    desc: "Sub-second internal temperature monitoring eliminated high-speed thermal blowouts across concrete expressways.",
  },
  {
    value: "100%",
    label: "Passenger Safety Record",
    delta: "Zero roadside safety incidents",
    desc: "Conservative alert thresholds caught slow leaks and abnormal drag miles before structural failure occurred.",
  },
  {
    value: "5.8%",
    label: "Fleet Fuel Savings",
    delta: "Optimized highway inflation",
    desc: "Maintaining precise manufacturer cold-inflation targets reduced rolling resistance across long-distance routes.",
  },
  {
    value: "99.6%",
    label: "Schedule Punctuality",
    delta: "Trailing 12-month average",
    desc: "Prevented emergency passenger-stranding events, ensuring uninterrupted intercity timetable reliability.",
  },
];

export default function IntercityPassengerCaseStudyPage() {
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
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
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
            <span className="text-[#3B82F6] truncate">Intercity Passenger Express</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-[2px] text-xs font-jetbrains tracking-widest text-[#3B82F6] uppercase font-semibold">
                PASSENGER TRANSPORT
              </span>
              <span className="border border-slate-400/10 bg-white/[0.03] px-3 py-1 rounded-[2px] text-xs font-jetbrains text-[#94A3B8]">
                500–2,000 VEHICLES
              </span>
              <span className="text-xs font-jetbrains text-[#94A3B8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                18-Month Operational Review
              </span>
            </div>

            <h1 className="font-space-grotesk text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Eliminating high-speed tyre failures across 650 luxury intercity coaches.
            </h1>

            <p className="text-sm font-jetbrains text-[#94A3B8]">
              TMIP Customer Story · Intercity Passenger Mobility Group · Published 2026
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="relative z-10 py-12 px-6 sm:px-10 border-b border-slate-400/10 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto">
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
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl space-y-16">
            {/* Who they are */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Who they are</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  A leading private intercity coach operator managing 650 premium multi-axle sleeper and seater buses.
                  They operate high-density overnight and express services connecting major commercial hubs across
                  Maharashtra, Gujarat, Karnataka, and Telangana.
                </p>
                <p>
                  Operating over 8 million fleet kilometres per month on high-speed concrete expressways, vehicle safety,
                  passenger comfort, and strict timetable adherence are paramount to their brand reputation.
                </p>
              </div>
            </div>

            {/* What they came to us for */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What they came to us for</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  In passenger transit, tyre failures are life-safety hazards. The operator sought to eliminate three
                  critical operational liabilities:
                </p>
                <ul className="space-y-3 pl-4 border-l-2 border-[#3B82F6]/40 text-base text-[#CBD5E1]">
                  <li>
                    <strong className="text-[#F1F5F9]">Expressway thermal blowouts:</strong> Concrete highways during
                    summer months caused intense heat buildup in steer and drive tyres, risking catastrophic blowouts at
                    cruising speeds of 90 km/h.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Passenger stranding liabilities:</strong> Roadside punctures
                    delayed overnight passenger services by hours, causing safety concerns and damaging customer loyalty.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Driver habit inconsistencies:</strong> Aggressive braking and
                    cornering accelerated uneven tyre wear and caused discomfort for sleeping passengers.
                  </li>
                </ul>
              </div>
            </div>

            {/* What we built together */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What we built together</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                <p>
                  Treel implemented a safety-prioritized TMIP configuration tailored for passenger transport operations:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-2">
                    <div className="text-xs font-jetbrains font-bold text-[#3B82F6] uppercase">In-Cab Safety Telemetry</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      Drivers receive clear audio-visual alerts on cab console screens 15–20 minutes before a slow leak
                      reaches critical thermal limits.
                    </p>
                  </div>
                  <div className="p-4 rounded-[4px] bg-[#080E1E] border border-slate-400/10 space-y-2">
                    <div className="text-xs font-jetbrains font-bold text-[#10B981] uppercase">Passenger Comfort Scoring</div>
                    <p className="text-xs text-[#94A3B8] font-ibm-plex">
                      Driver scoring algorithms evaluate smooth deceleration, steady throttle, and gentle cornering to
                      optimize passenger ride quality.
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
                  Across 18 months of monitored highway operations, the coach fleet experienced zero high-speed tyre
                  blowouts. Early warning alerts allowed drivers to execute controlled stops at scheduled highway food
                  plazas for technician tyre changes.
                </p>
                <p>
                  Standardized tyre pressure compliance across the fleet reduced rolling friction, resulting in a 5.8%
                  reduction in diesel consumption and elevating overall timetable punctuality to 99.6%.
                </p>
              </div>
            </div>

            {/* Customer Quote */}
            <div className="p-8 rounded-[4px] bg-[#080E1E] border-l-4 border-[#3B82F6] space-y-4">
              <p className="text-lg sm:text-xl text-[#F1F5F9] italic leading-relaxed font-space-grotesk">
                &ldquo;When forty passengers are asleep in a coach doing 90 km/h on an expressway, safety is
                everything. TMIP took the guesswork out of tyre condition. In eighteen months, we haven&apos;t had a
                single roadside tyre emergency.&rdquo;
              </p>
              <div className="text-xs font-jetbrains text-[#94A3B8]">
                Managing Director · Luxury Intercity Transit Network
              </div>
            </div>

            {/* Life on TMIP */}
            <div className="space-y-4">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Life on TMIP</h2>
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-ibm-plex">
                Depot technicians perform automated pre-trip tyre health inspections on tablet terminals prior to every
                evening departure. Operations controllers in Pune and Bangalore monitor live passenger comfort scores
                and corridor thermal alerts in real time, proactively coaching drivers on route management.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies Strip */}
      <section className="relative z-10 py-20 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto space-y-8">
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
        <div className="max-w-[1440px] mx-auto">
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
