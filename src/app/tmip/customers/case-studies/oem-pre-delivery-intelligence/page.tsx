import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Clock,
  CheckCircle2,
  Layers,
  Award,
  Radio,
} from "lucide-react";

export const metadata: Metadata = {
  title: "OEM Pre-Delivery Intelligence · TMIP Case Study",
  description:
    "How a Tier-1 commercial vehicle OEM embedded TMIP edge telematics at the factory line to deliver pre-configured smart fleets to enterprise buyers on Day 1.",
  alternates: {
    canonical: "https://treel.in/tmip/customers/case-studies/oem-pre-delivery-intelligence",
  },
  openGraph: {
    title: "OEM Pre-Delivery Intelligence · TMIP Case Study",
    description:
      "How a Tier-1 commercial vehicle OEM embedded TMIP edge telematics at the factory line to deliver pre-configured smart fleets to enterprise buyers on Day 1.",
    url: "https://treel.in/tmip/customers/case-studies/oem-pre-delivery-intelligence",
  },
};

const results = [
  {
    value: "100%",
    label: "Pre-Configured Telematics",
    delta: "At factory gate release",
    desc: "Sensors, edge gateway, and cryptographic digital twins fully verified before dealership handover.",
  },
  {
    value: "0 Days",
    label: "Commissioning Lag",
    delta: "Zero depot retrofit delay",
    desc: "Commercial buyers deploy vehicles into revenue-generating service immediately upon delivery.",
  },
  {
    value: "14.2%",
    label: "Warranty Dispute Drop",
    delta: "Objective operational history",
    desc: "Verifiable telemetry logs on thermal stress, overload, and inflation resolved component warranty claims.",
  },
  {
    value: "99.7%",
    label: "Initial Signal Capture",
    delta: "Pan-India delivery tracking",
    desc: "Seamless activation and tenant binding across multi-state dealer delivery networks.",
  },
];

export default function OemPreDeliveryCaseStudyPage() {
  return (
    <div className="bg-[#050A17] text-[#F1F5F9] font-ibm">
      {/* Header & Breadcrumb */}
      <section className="pt-24 pb-16 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <nav className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] mb-6">
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
            <span className="text-[#3B82F6] truncate">OEM Pre-Delivery Intelligence</span>
          </nav>

          <div className="max-w-4xl space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-full text-xs font-mono tracking-widest text-[#3B82F6] uppercase font-semibold">
                OEM FLEET
              </span>
              <span className="border border-white/10 bg-white/[0.03] px-3 py-1 rounded-full text-xs font-mono text-[#94A3B8]">
                2,000+ VEHICLES
              </span>
              <span className="text-xs font-mono text-[#94A3B8] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3B82F6]" />
                Factory Line Deployment
              </span>
            </div>

            <h1 className="font-space text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Tier-1 OEM factory integration delivering smart connected fleets from Day 1.
            </h1>

            <p className="text-sm font-mono text-[#94A3B8]">
              TMIP Partner Case Study · Commercial Vehicle OEM Group · Published 2026
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Banner */}
      <section className="py-12 border-b border-white/10 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((res, i) => (
              <div key={i} className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-2">
                <div className="font-space text-3xl sm:text-4xl font-bold text-[#10B981]">{res.value}</div>
                <div className="text-sm font-semibold text-[#F1F5F9]">{res.label}</div>
                <div className="text-xs font-mono text-[#3B82F6]">{res.delta}</div>
                <p className="text-xs text-[#94A3B8] pt-1 leading-relaxed">{res.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Narrative Body */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-16">
            {/* Who they are */}
            <div className="space-y-4">
              <h2 className="font-space text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Who they are</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                <p>
                  A leading Indian commercial vehicle OEM producing multi-axle heavy haulage tractors, tippers, and
                  intermediate commercial vehicles for enterprise logistics fleets, state transport corporations, and
                  mining conglomerates.
                </p>
                <p>
                  As enterprise fleet operators shifted from raw vehicle procurement to total cost of ownership (TCO)
                  lifecycle agreements, the OEM sought to deliver natively connected, intelligence-ready trucks directly
                  off the assembly line.
                </p>
              </div>
            </div>

            {/* What they came to us for */}
            <div className="space-y-4">
              <h2 className="font-space text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What they came to us for</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                <p>
                  Fleet operators increasingly required real-time wheel-end telemetry and digital twin models on Day 1.
                  The traditional delivery workflow created three critical pain points:
                </p>
                <ul className="space-y-3 pl-4 border-l-2 border-[#3B82F6]/40 text-base text-[#CBD5E1]">
                  <li>
                    <strong className="text-[#F1F5F9]">Aftermarket retrofit delays:</strong> Fleets had to immobilize
                    newly delivered trucks for 3–5 days at regional depots for third-party sensor fitment, delaying
                    revenue service.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Wiring harness tampering:</strong> Non-standardized aftermarket
                    installations frequently spliced factory electrical harnesses, triggering electrical faults and
                    invalidating OEM warranty clauses.
                  </li>
                  <li>
                    <strong className="text-[#F1F5F9]">Warranty dispute ambiguities:</strong> OEMs lacked objective,
                    verifiable operating history logs to determine whether premature component failures were due to
                    manufacturing defects or operator overload.
                  </li>
                </ul>
              </div>
            </div>

            {/* What we built together */}
            <div className="space-y-4">
              <h2 className="font-space text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What we built together</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                <p>
                  Treel collaborated with the OEM&apos;s vehicle engineering and plant quality teams to embed TMIP
                  intelligence directly into the manufacturing process:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-xl bg-[#080E1E] border border-white/10 space-y-2">
                    <div className="text-xs font-mono font-bold text-[#3B82F6] uppercase">Factory Line PDI Integration</div>
                    <p className="text-xs text-[#94A3B8]">
                      Sensors are calibrated and paired to vehicle chassis numbers during final assembly line testing.
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-[#080E1E] border border-white/10 space-y-2">
                    <div className="text-xs font-mono font-bold text-[#10B981] uppercase">Instant Tenant Binding</div>
                    <p className="text-xs text-[#94A3B8]">
                      Automated digital twin provisioning links vehicle telemetry directly to the purchasing fleet&apos;s
                      enterprise TMIP portal at handover.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What changed */}
            <div className="space-y-4">
              <h2 className="font-space text-2xl sm:text-3xl font-bold text-[#F1F5F9]">What changed</h2>
              <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                <p>
                  Over 2,500 commercial vehicles were rolled out with pre-configured TMIP factory intelligence across a
                  12-month period. Fleet buyers were able to deploy vehicles into commercial operation immediately upon
                  delivery with zero retrofit downtime.
                </p>
                <p>
                  The OEM&apos;s service engineering group reduced warranty claim disputes by 14.2% by utilizing
                  verifiable historical operating logs (inflation pressure, thermal cycles, and axle load patterns) to
                  resolve warranty inquiries objectively.
                </p>
              </div>
            </div>

            {/* Customer Quote */}
            <div className="p-8 rounded-2xl bg-[#080E1E] border-l-4 border-[#3B82F6] space-y-4">
              <p className="text-lg sm:text-xl text-[#F1F5F9] italic leading-relaxed">
                &ldquo;Embedding TMIP directly into our pre-delivery inspection transformed our commercial value
                proposition. Our fleet buyers get an intelligent, connected truck ready for work on Day 1, and our
                service teams get transparent operating data for lifecycle support.&rdquo;
              </p>
              <div className="text-xs font-mono text-[#94A3B8]">
                Executive Vice President · Commercial Vehicle Product Planning
              </div>
            </div>

            {/* Life on TMIP */}
            <div className="space-y-4">
              <h2 className="font-space text-2xl sm:text-3xl font-bold text-[#F1F5F9]">Life on TMIP</h2>
              <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                Dealership sales teams now provide enterprise buyers with instant QR-code vehicle onboarding at delivery.
                The OEM&apos;s engineering headquarters monitors aggregate reliability benchmarks across different
                geographies, using real-world operational stress telemetry to guide future chassis and powertrain
                refinements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies Strip */}
      <section className="py-20 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="font-space text-2xl sm:text-3xl font-bold text-[#F1F5F9]">More customer stories</h2>
            <Link
              href="/tmip/customers/case-studies"
              className="text-xs font-mono text-[#3B82F6] hover:underline flex items-center gap-1.5"
            >
              All case studies <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/tmip/customers/case-studies/1000-truck-case-study"
              className="p-6 rounded-2xl bg-[#050A17] border border-white/10 hover:border-[#3B82F6]/50 transition-all space-y-3 group"
            >
              <div className="text-xs font-mono text-[#3B82F6]">LOGISTICS · 1,000 TRUCKS</div>
              <h3 className="font-space font-bold text-base text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                1,000 trucks. 12 months. What changed.
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                5.2% fuel savings, 6.8% tyre life extension, 34% downtime reduction across pan-India routes.
              </p>
            </Link>

            <Link
              href="/tmip/customers/case-studies/open-cast-haulage-analytics"
              className="p-6 rounded-2xl bg-[#050A17] border border-white/10 hover:border-[#3B82F6]/50 transition-all space-y-3 group"
            >
              <div className="text-xs font-mono text-[#3B82F6]">MINING · RIGID DUMP TRUCKS</div>
              <h3 className="font-space font-bold text-base text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                Preventing high-tonnage dumper downtime in mining pits.
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                99.4% haul fleet uptime and ₹2.1 Cr savings in central India mining corridors.
              </p>
            </Link>

            <Link
              href="/tmip/customers/case-studies/intercity-passenger-express"
              className="p-6 rounded-2xl bg-[#050A17] border border-white/10 hover:border-[#3B82F6]/50 transition-all space-y-3 group"
            >
              <div className="text-xs font-mono text-[#3B82F6]">PASSENGER · 650 COACHES</div>
              <h3 className="font-space font-bold text-base text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                Eliminating high-speed tyre failures on expressways.
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Zero roadside blowouts in 18 months across high-speed western expressway corridors.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#080E1E] to-[#0B1220] border border-white/10 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Discuss OEM factory integration.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Partner with Treel to embed native intelligence into your commercial vehicle manufacturing and
              pre-delivery inspection lines.
            </p>
            <div className="pt-2">
              <Link
                href="/contact?subject=Partners"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Schedule partnership briefing <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
