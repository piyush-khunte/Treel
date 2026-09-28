import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TmipHeader } from "@/components/layout/tmip-header";
import {
  ArrowRight,
  Shield,
  Radio,
  Cpu,
  Activity,
  ChevronDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "OTR TPMS for Mining, Construction and Ports | Treel",
  description:
    "Tyre pressure monitoring built for mining, quarry and port fleets. OTR TPMS sensors feed TMIP, which predicts tyre failures before they stop production.",
  alternates: {
    canonical: "https://treel.in/products/otr-tpms",
  },
  openGraph: {
    title: "OTR TPMS for Mining, Construction and Ports | Treel",
    description:
      "Tyre pressure monitoring built for mining, quarry and port fleets. OTR TPMS sensors feed TMIP, which predicts tyre failures before they stop production.",
    url: "https://treel.in/products/otr-tpms",
    type: "website",
    siteName: "Treel",
  },
  twitter: {
    card: "summary_large_image",
    title: "OTR TPMS for Mining, Construction and Ports | Treel",
    description:
      "Tyre pressure monitoring built for mining, quarry and port fleets. OTR TPMS sensors feed TMIP, which predicts tyre failures before they stop production.",
  },
};

const faqItems = [
  {
    q: "Which OTR tyre sizes does OTR TPMS fit?",
    a: "Supported tyre sizes and wheel positions are evaluated and confirmed during the initial site walkthrough and fleet audit.",
  },
  {
    q: "Does OTR TPMS work at remote sites with limited network coverage?",
    a: "Data is stored on the machine when the network drops and syncs when it returns.",
  },
  {
    q: "How is OTR TPMS different from a standard TPMS?",
    a: "A standard TPMS shows pressure readings. OTR TPMS sends every reading to TMIP, which combines tyre, engine and operator data, learns each machine's baseline and predicts failures before they happen.",
  },
  {
    q: "Do I need TMIP to use OTR TPMS?",
    a: "OTR TPMS is the physical sensor system on the machine that measures every tyre continuously and hands the data to TMIP.",
  },
  {
    q: "Which OTR machines can OTR TPMS be fitted to?",
    a: "OTR TPMS is built for off-highway fleets including mining haulers, earthmovers, loaders, dumpers, and port terminal equipment.",
  },
  {
    q: "How long does deployment take for a site fleet?",
    a: "Sensors and gateways are fitted with minimal disruption to shifts, scheduled around your active site operations.",
  },
  {
    q: "Can alerts reach both supervisors and operators?",
    a: "Yes. Alerts go to the site dashboard and can be routed to supervisors and the operator cab.",
  },
];

export default function OtrTpmsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#050A17] text-[#E6ECF5] font-ibm-plex antialiased selection:bg-[#3B82F6]/30 selection:text-white">
      {/* JSON-LD FAQPage Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* TMIP Standard Header */}
      <TmipHeader />

      {/* Blueprint Grid Background Pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-40 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <main id="top" className="relative z-10">
        {/* ============================================================== */}
        {/* 01 HERO                                                        */}
        {/* ============================================================== */}
        <section className="relative pt-12 sm:pt-16 pb-20 sm:pb-24 border-b border-slate-400/15 overflow-hidden">
          {/* Subtle radial blueprint glow */}
          <div
            className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none opacity-20"
            style={{
              background:
                "radial-gradient(60% 70% at 70% 35%, rgba(59,130,246,0.3), transparent 70%)",
            }}
          />

          <div className="max-w-[1200px] mx-auto px-6">
            {/* Breadcrumb */}
            <nav className="font-jetbrains text-xs text-[#94A3B8] mb-8" aria-label="Breadcrumb">
              <Link href="/products" className="hover:text-white transition-colors">
                Products
              </Link>
              <span className="mx-2 text-slate-600">/</span>
              <span className="text-[#3B82F6]">OTR TPMS</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Copy */}
              <div className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 font-jetbrains text-xs px-3 py-1 rounded-full bg-[#3B82F6]/15 text-[#9CC2FF] border border-[#3B82F6]/30">
                  <span className="font-semibold text-white">OTR TPMS</span>
                  <span className="text-slate-400">|</span>
                  <span>Powered by TMIP</span>
                </div>

                <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-[54px] font-semibold tracking-[-0.03em] text-[#F1F5F9] leading-[1.08]">
                  Where the road ends, the intelligence doesn&apos;t.
                </h1>

                <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-2xl font-ibm-plex">
                  Mining haulers, earthmovers and port equipment work under loads and heat that
                  road fleets never see. OTR TPMS puts a sensor on every tyre, and TMIP turns those
                  readings into predictions, so failures don&apos;t stop the shift.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    href="/tmip/demo"
                    className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-ibm-plex font-semibold text-sm px-6 py-3.5 rounded-[4px] inline-flex items-center gap-2 shadow-lg shadow-[#3B82F6]/20 transition-all duration-200"
                  >
                    Book a site assessment
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href="#how"
                    className="border border-[#3B82F6]/40 hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 text-[#E6ECF5] font-ibm-plex font-medium text-sm px-6 py-3.5 rounded-[4px] inline-flex items-center gap-2 transition-all duration-200"
                  >
                    See how it works
                  </a>
                </div>

                {/* Hero Metadata Segments */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-400/15 text-sm text-[#94A3B8]">
                  <div>
                    <strong className="block font-jetbrains text-xs sm:text-[13px] font-medium text-[#F59E0B]">
                      Mining
                    </strong>
                    <span className="text-xs text-[#94A3B8]">Haul fleets</span>
                  </div>
                  <div>
                    <strong className="block font-jetbrains text-xs sm:text-[13px] font-medium text-[#F59E0B]">
                      Construction
                    </strong>
                    <span className="text-xs text-[#94A3B8]">Earthmoving</span>
                  </div>
                  <div>
                    <strong className="block font-jetbrains text-xs sm:text-[13px] font-medium text-[#F59E0B]">
                      Quarries
                    </strong>
                    <span className="text-xs text-[#94A3B8]">Loaders, dumpers</span>
                  </div>
                  <div>
                    <strong className="block font-jetbrains text-xs sm:text-[13px] font-medium text-[#F59E0B]">
                      Ports
                    </strong>
                    <span className="text-xs text-[#94A3B8]">Terminal equipment</span>
                  </div>
                </div>
              </div>

              {/* Right Column: OTR Haul-Truck Digital-Twin Visual */}
              <div className="lg:col-span-6">
                <figure
                  className="relative p-2 bg-[#0F1729] border border-[#3B82F6]/40 shadow-2xl overflow-hidden"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)",
                  }}
                >
                  <Image
                    src="/images/otr-haul-truck-digital-twin.jpg"
                    alt="TMIP Vehicle Digital Twin for a mining haul truck, showing health score, breakdown risk, component health and live status"
                    width={1486}
                    height={704}
                    className="w-full h-auto object-contain rounded-[2px]"
                    priority
                  />
                </figure>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 02 THE PROBLEM                                                 */}
        {/* ============================================================== */}
        <section className="py-20 sm:py-24 border-b border-slate-400/15">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12">
              <div className="w-[60px] h-[3px] bg-[#3B82F6] mb-7" />
              <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#F1F5F9] max-w-2xl leading-tight">
                Off-road, a single tyre can halt a production line.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Card 1 */}
              <article
                className="bg-[#0F1729] p-7 border-t-2 border-[#3B82F6] rounded-b-[4px] space-y-3"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
                }}
              >
                <span className="block font-jetbrains text-xs text-[#F59E0B] tracking-wider uppercase">
                  HEAT + LOAD
                </span>
                <h3 className="font-space-grotesk text-xl font-semibold text-white">
                  Heat and load
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Heavy payloads, long haul cycles and steep ramps build heat inside the tyre faster
                  than any manual check can catch.
                </p>
              </article>

              {/* Card 2 */}
              <article
                className="bg-[#0F1729] p-7 border-t-2 border-[#3B82F6] rounded-b-[4px] space-y-3"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
                }}
              >
                <span className="block font-jetbrains text-xs text-[#F59E0B] tracking-wider uppercase">
                  IMPACT
                </span>
                <h3 className="font-space-grotesk text-xl font-semibold text-white">
                  Harsh ground
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Rock cuts, impacts and underinflation cause sudden sidewall and casing failures
                  that end a tyre&apos;s life early.
                </p>
              </article>

              {/* Card 3 */}
              <article
                className="bg-[#0F1729] p-7 border-t-2 border-[#3B82F6] rounded-b-[4px] space-y-3"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
                }}
              >
                <span className="block font-jetbrains text-xs text-[#F59E0B] tracking-wider uppercase">
                  UPTIME
                </span>
                <h3 className="font-space-grotesk text-xl font-semibold text-white">
                  Downtime costs production
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  When a hauler stops, the loader, the crusher and the schedule stop with it.
                </p>
              </article>

              {/* Card 4 */}
              <article
                className="bg-[#0F1729] p-7 border-t-2 border-[#3B82F6] rounded-b-[4px] space-y-3"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
                }}
              >
                <span className="block font-jetbrains text-xs text-[#F59E0B] tracking-wider uppercase">
                  SAFETY
                </span>
                <h3 className="font-space-grotesk text-xl font-semibold text-white">
                  Safety at the machine
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Failures on large OTR tyres put operators and ground crew at serious risk.
                  Catching them early is a safety outcome, not only a cost outcome.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 03 THE SHIFT                                                   */}
        {/* ============================================================== */}
        <section className="py-20 sm:py-24 border-b border-slate-400/15 bg-gradient-to-b from-[#0B1220] to-[#050A17]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12 max-w-3xl">
              <div className="w-[60px] h-[3px] bg-[#3B82F6] mb-7" />
              <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#F1F5F9] leading-tight mb-4">
                From tyre checks at the workshop to predictive intelligence at the pit.
              </h2>
              <p className="text-[#94A3B8] text-lg leading-relaxed font-ibm-plex">
                Most sites still rely on scheduled inspections and operator reports. OTR TPMS
                replaces periodic checks with continuous monitoring, and TMIP learns each machine&apos;s
                normal behaviour and flags drift before it becomes a failure.
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-400/20 rounded-[4px] overflow-hidden">
              {/* Column 1: Today */}
              <div className="p-8 sm:p-10 bg-[#0B1220]">
                <h3 className="font-jetbrains text-sm uppercase text-[#94A3B8] font-medium tracking-wide mb-6">
                  How most sites run today
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-base text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-slate-500 mt-2 shrink-0 opacity-70" />
                    <span>Scheduled inspections, days or weeks apart</span>
                  </li>
                  <li className="flex items-start gap-3 text-base text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-slate-500 mt-2 shrink-0 opacity-70" />
                    <span>Issues reported by the operator, if noticed</span>
                  </li>
                  <li className="flex items-start gap-3 text-base text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-slate-500 mt-2 shrink-0 opacity-70" />
                    <span>Failure found after the machine stops</span>
                  </li>
                </ul>
              </div>

              {/* Column 2: With OTR TPMS */}
              <div className="p-8 sm:p-10 bg-[#0F1729] border-t md:border-t-0 md:border-l border-[#3B82F6]/30 bg-[#3B82F6]/[0.05]">
                <h3 className="font-jetbrains text-sm uppercase text-[#9CC2FF] font-medium tracking-wide mb-6">
                  With OTR TPMS and TMIP
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-base text-white">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span>Continuous pressure and temperature on every tyre</span>
                  </li>
                  <li className="flex items-start gap-3 text-base text-white">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span>A learned baseline for every machine</span>
                  </li>
                  <li className="flex items-start gap-3 text-base text-white">
                    <span className="w-2 h-2 rounded-full bg-[#10B981] mt-2 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span>Failure predicted before the shift is lost</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 04 WHAT THE SENSORS MEASURE (Hardware)                         */}
        {/* ============================================================== */}
        <section id="sensors" className="py-20 sm:py-24 border-b border-slate-400/15">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
              {/* Left Column: Heading and Flow */}
              <div className="lg:col-span-5 space-y-5">
                <div className="w-[60px] h-[3px] bg-[#3B82F6] mb-5" />
                <span className="inline-flex items-center gap-2 font-jetbrains text-xs px-3 py-1 rounded-full bg-[#3B82F6]/15 text-[#9CC2FF] border border-[#3B82F6]/30">
                  <span className="font-semibold text-white">OTR TPMS</span>
                  <span className="text-slate-400">|</span>
                  <span>The hardware</span>
                </span>
                <h2 className="font-space-grotesk text-3xl sm:text-4xl font-semibold text-[#F1F5F9] leading-tight">
                  A sensor on every tyre. A reading every few seconds.
                </h2>
                <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
                  OTR TPMS is the physical system on the machine. It measures every tyre continuously
                  and hands the data to TMIP.
                </p>

                {/* Sensor Flow Architecture */}
                <div className="pt-3">
                  <div className="text-xs font-jetbrains text-slate-400 mb-2 uppercase tracking-wider">
                    Data flow architecture
                  </div>
                  <div className="flex flex-wrap items-center gap-2 font-jetbrains text-xs">
                    <span className="px-3 py-2 rounded bg-[#0F1729] border border-blue-900/40 text-slate-300">
                      Tyre sensor
                    </span>
                    <span className="text-[#3B82F6] font-bold">→</span>
                    <span className="px-3 py-2 rounded bg-[#0F1729] border border-blue-900/40 text-slate-300">
                      On-machine gateway
                    </span>
                    <span className="text-[#3B82F6] font-bold">→</span>
                    <span className="px-3 py-2 rounded bg-[#3B82F6] text-white font-semibold shadow-sm">
                      TMIP
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Confirmed Specs */}
              <div className="lg:col-span-7">
                <ol className="divide-y divide-slate-400/15 border-t border-b border-slate-400/15">
                  <li className="py-6 grid grid-cols-[48px_1fr] gap-4 items-start">
                    <span className="font-jetbrains text-sm font-semibold text-[#F59E0B]">
                      01
                    </span>
                    <div>
                      <h3 className="font-space-grotesk text-lg font-semibold text-white mb-1.5">
                        Pressure and temperature
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        Continuous pressure and temperature at every tyre position, including inner
                        and outer rear duals.
                      </p>
                    </div>
                  </li>

                  <li className="py-6 grid grid-cols-[48px_1fr] gap-4 items-start">
                    <span className="font-jetbrains text-sm font-semibold text-[#F59E0B]">
                      02
                    </span>
                    <div>
                      <h3 className="font-space-grotesk text-lg font-semibold text-white mb-1.5">
                        Built for OTR tyres
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        Sensors built for OTR tyre sizes and mounted to stay in place through impacts
                        and heat.
                      </p>
                    </div>
                  </li>

                  <li className="py-6 grid grid-cols-[48px_1fr] gap-4 items-start">
                    <span className="font-jetbrains text-sm font-semibold text-[#F59E0B]">
                      03
                    </span>
                    <div>
                      <h3 className="font-space-grotesk text-lg font-semibold text-white mb-1.5">
                        On-machine gateway
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        A gateway on each machine collects every sensor reading and sends it to TMIP.
                      </p>
                    </div>
                  </li>

                  <li className="py-6 grid grid-cols-[48px_1fr] gap-4 items-start">
                    <span className="font-jetbrains text-sm font-semibold text-[#F59E0B]">
                      04
                    </span>
                    <div>
                      <h3 className="font-space-grotesk text-lg font-semibold text-white mb-1.5">
                        Alerts in the cab
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        Instant alerts for the operator when a tyre moves outside its safe range.
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 05 WHAT TMIP DOES WITH THE DATA (Platform)                     */}
        {/* ============================================================== */}
        <section id="capabilities" className="py-20 sm:py-24 border-b border-slate-400/15">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12">
              <div className="w-[60px] h-[3px] bg-[#3B82F6] mb-5" />
              <span className="inline-flex items-center gap-2 font-jetbrains text-xs px-3 py-1 rounded-full bg-[#3B82F6]/15 text-[#9CC2FF] border border-[#3B82F6]/30 mb-3">
                <span className="font-semibold text-white">TMIP</span>
                <span className="text-slate-400">|</span>
                <span>The platform</span>
              </span>
              <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#F1F5F9] leading-tight">
                Readings become predictions.
              </h2>
            </div>

            {/* 6 Capabilities Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x border-t border-b border-slate-400/15">
              {/* Item 1 */}
              <article className="p-7 sm:p-8 space-y-3">
                <h3 className="font-space-grotesk text-xl font-semibold text-white">
                  Live site view
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Every sensor reading on one live view, with alerts to the supervisor and the
                  operator cab.
                </p>
                <Link
                  href="/tmip/features/tyres"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9CC2FF] hover:text-white hover:underline transition-colors pt-2"
                >
                  Explore live site view <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>

              {/* Item 2 */}
              <article className="p-7 sm:p-8 space-y-3">
                <h3 className="font-space-grotesk text-xl font-semibold text-white">
                  Predictive failure alerts
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Remaining useful life and breakdown probability for every tyre and component.
                </p>
                <Link
                  href="/tmip/features/predictive-intelligence"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9CC2FF] hover:text-white hover:underline transition-colors pt-2"
                >
                  Explore predictive failure alerts <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>

              {/* Item 3 */}
              <article className="p-7 sm:p-8 space-y-3">
                <h3 className="font-space-grotesk text-xl font-semibold text-white">
                  Fleet health score
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  One view of which machines are fit for the next shift.
                </p>
                <Link
                  href="/tmip/features/health-score"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9CC2FF] hover:text-white hover:underline transition-colors pt-2"
                >
                  Explore fleet health score <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>

              {/* Item 4 */}
              <article className="p-7 sm:p-8 space-y-3 border-t border-slate-400/15">
                <h3 className="font-space-grotesk text-xl font-semibold text-white">
                  Operator behaviour
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Driver score covering overloading, overspeed on ramps and harsh operation.
                </p>
                <Link
                  href="/tmip/features/driver-management"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9CC2FF] hover:text-white hover:underline transition-colors pt-2"
                >
                  Explore operator behaviour <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>

              {/* Item 5 */}
              <article className="p-7 sm:p-8 space-y-3 border-t border-slate-400/15">
                <h3 className="font-space-grotesk text-xl font-semibold text-white">
                  Maintenance planning
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  A component-level view for the workshop, so tyre rotation and replacement are
                  planned, not reactive.
                </p>
                <Link
                  href="/tmip/features/maintenance"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9CC2FF] hover:text-white hover:underline transition-colors pt-2"
                >
                  Explore maintenance planning <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>

              {/* Item 6 */}
              <article className="p-7 sm:p-8 space-y-3 border-t border-slate-400/15">
                <h3 className="font-space-grotesk text-xl font-semibold text-white">
                  Machine baselines
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  TMIP learns each vehicle&apos;s normal pattern and flags anomalies early.
                </p>
                <Link
                  href="/tmip/features/how-it-learns"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9CC2FF] hover:text-white hover:underline transition-colors pt-2"
                >
                  Explore machine baselines <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 06 BUILT FOR SITE CONDITIONS                                   */}
        {/* ============================================================== */}
        <section className="py-20 sm:py-24 border-b border-slate-400/15">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12">
              <div className="w-[60px] h-[3px] bg-[#3B82F6] mb-7" />
              <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#F1F5F9] leading-tight max-w-3xl">
                Engineered for dust, heat, vibration and patchy networks.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-slate-400/15 border border-slate-400/15 rounded-[4px] overflow-hidden">
              {/* Item 1 */}
              <div className="p-8 bg-[#0F1729] flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
                  <Shield className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-space-grotesk text-lg font-semibold text-white">
                    Sensor durability
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Sensors rated for OTR tyre sizes and the dust, heat and vibration of active sites.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-8 bg-[#0F1729] flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
                  <Radio className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-space-grotesk text-lg font-semibold text-white">
                    Works offline
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Data is stored on the machine when the network drops and syncs when it returns.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-8 bg-[#0F1729] flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-space-grotesk text-lg font-semibold text-white">
                    Load-cycle monitoring
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Tonne-kilometre-per-hour tracking against each tyre&apos;s working limit.
                  </p>
                </div>
              </div>

              {/* Item 4 */}
              <div className="p-8 bg-[#0F1729] flex items-start gap-5">
                <div className="w-10 h-10 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] shrink-0 mt-0.5">
                  <Cpu className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-space-grotesk text-lg font-semibold text-white">
                    Fits your site systems
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    Works alongside the dispatch and ERP systems already running your site.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 07 WHO IT'S FOR                                                */}
        {/* ============================================================== */}
        <section className="py-20 sm:py-24 border-b border-slate-400/15">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12">
              <div className="w-[60px] h-[3px] bg-[#3B82F6] mb-7" />
              <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#F1F5F9] leading-tight">
                Built for the fleets that work off the highway.
              </h2>
            </div>

            <div className="divide-y divide-slate-400/15 border-t border-b border-[#3B82F6]/30">
              {/* Mining */}
              <div className="py-7 grid grid-cols-1 md:grid-cols-[240px_1fr_220px] gap-4 md:gap-8 items-baseline">
                <h3 className="font-space-grotesk text-2xl font-semibold text-white">
                  Mining
                </h3>
                <p className="text-[#94A3B8] text-base">
                  Coal, iron ore and limestone haul fleets.
                </p>
                <div className="font-jetbrains text-sm text-[#F59E0B] md:text-right">
                  <small className="block text-slate-500 text-[11px] mb-0.5">What matters most</small>
                  tonnes per shift
                </div>
              </div>

              {/* Construction */}
              <div className="py-7 grid grid-cols-1 md:grid-cols-[240px_1fr_220px] gap-4 md:gap-8 items-baseline">
                <h3 className="font-space-grotesk text-2xl font-semibold text-white">
                  Construction and infrastructure
                </h3>
                <p className="text-[#94A3B8] text-base">
                  Highway, earthmoving and tipper fleets.
                </p>
                <div className="font-jetbrains text-sm text-[#F59E0B] md:text-right">
                  <small className="block text-slate-500 text-[11px] mb-0.5">What matters most</small>
                  project timelines
                </div>
              </div>

              {/* Quarries */}
              <div className="py-7 grid grid-cols-1 md:grid-cols-[240px_1fr_220px] gap-4 md:gap-8 items-baseline">
                <h3 className="font-space-grotesk text-2xl font-semibold text-white">
                  Quarries and aggregates
                </h3>
                <p className="text-[#94A3B8] text-base">
                  Loader and dumper fleets.
                </p>
                <div className="font-jetbrains text-sm text-[#F59E0B] md:text-right">
                  <small className="block text-slate-500 text-[11px] mb-0.5">What matters most</small>
                  cost per tonne
                </div>
              </div>

              {/* Ports */}
              <div className="py-7 grid grid-cols-1 md:grid-cols-[240px_1fr_220px] gap-4 md:gap-8 items-baseline">
                <h3 className="font-space-grotesk text-2xl font-semibold text-white">
                  Ports and terminals
                </h3>
                <p className="text-[#94A3B8] text-base">
                  Terminal tractors and container-handling equipment.
                </p>
                <div className="font-jetbrains text-sm text-[#F59E0B] md:text-right">
                  <small className="block text-slate-500 text-[11px] mb-0.5">What matters most</small>
                  turnaround time
                </div>
              </div>

              {/* Cement and steel */}
              <div className="py-7 grid grid-cols-1 md:grid-cols-[240px_1fr_220px] gap-4 md:gap-8 items-baseline">
                <h3 className="font-space-grotesk text-2xl font-semibold text-white">
                  Cement and steel plants
                </h3>
                <p className="text-[#94A3B8] text-base">
                  In-plant logistics vehicles.
                </p>
                <div className="font-jetbrains text-sm text-[#F59E0B] md:text-right">
                  <small className="block text-slate-500 text-[11px] mb-0.5">What matters most</small>
                  uptime and safety compliance
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 08 OUTCOMES AND PROOF                                          */}
        {/* ============================================================== */}
        <section className="py-20 sm:py-24 border-b border-slate-400/15">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12">
              <div className="w-[60px] h-[3px] bg-[#3B82F6] mb-7" />
              <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#F1F5F9] leading-tight">
                What the numbers say.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Stat 1 */}
              <div className="bg-[#0F1729] p-7 border border-slate-400/15 rounded-[4px] flex flex-col justify-between">
                <div className="font-jetbrains text-4xl sm:text-5xl font-semibold text-[#F59E0B] tracking-tight">
                  TBC
                </div>
                <div className="mt-4 text-sm text-[#94A3B8]">
                  Tyre-life extension on OTR fleets
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-[#0F1729] p-7 border border-slate-400/15 rounded-[4px] flex flex-col justify-between">
                <div className="font-jetbrains text-4xl sm:text-5xl font-semibold text-[#F59E0B] tracking-tight">
                  TBC
                </div>
                <div className="mt-4 text-sm text-[#94A3B8]">
                  Unplanned stops avoided per site
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-[#0F1729] p-7 border border-slate-400/15 rounded-[4px] flex flex-col justify-between">
                <div className="font-jetbrains text-4xl sm:text-5xl font-semibold text-[#F59E0B] tracking-tight">
                  TBC
                </div>
                <div className="mt-4 text-sm text-[#94A3B8]">
                  OTR machines under active monitoring
                </div>
              </div>

              {/* Case Study Card */}
              <div
                className="bg-[#0B1220] border border-dashed border-[#3B82F6]/40 p-7 rounded-[4px] flex flex-col justify-between"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
                }}
              >
                <div>
                  <span className="inline-flex items-center gap-1.5 font-jetbrains text-[11px] px-2.5 py-0.5 rounded-full bg-[#3B82F6]/15 text-[#9CC2FF] border border-[#3B82F6]/30 mb-4">
                    Case study · Coming soon
                  </span>
                  <h3 className="font-space-grotesk text-xl font-semibold text-white leading-snug">
                    An OTR deployment, in the operator&apos;s numbers.
                  </h3>
                </div>
                <p className="mt-4 text-sm text-[#94A3B8] leading-relaxed">
                  A mining or construction site running TMIP. Verified operational telemetry and deployment benchmarks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 09 HOW IT WORKS                                                */}
        {/* ============================================================== */}
        <section id="how" className="py-20 sm:py-24 border-b border-slate-400/15">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12">
              <div className="w-[60px] h-[3px] bg-[#3B82F6] mb-7" />
              <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#F1F5F9] leading-tight">
                From site walkthrough to live predictions.
              </h2>
            </div>

            {/* OTR System-Flow Visual */}
            <figure
              className="mb-14 p-2.5 bg-[#0F1729] border border-[#3B82F6]/30 shadow-2xl overflow-hidden"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%)",
              }}
            >
              <Image
                src="/images/otr-system-flow.jpg"
                alt="How TMIP connects mining and port equipment to a central command and analytics layer and on to management dashboards and maintenance alerts"
                width={1408}
                height={768}
                className="w-full h-auto object-contain rounded-[2px]"
              />
            </figure>

            {/* 3 Steps */}
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 md:divide-x divide-slate-400/20 list-none p-0 m-0">
              <li className="md:pr-8 space-y-3">
                <div className="w-[52px] h-[52px] grid place-items-center bg-[#3B82F6] text-white font-space-grotesk font-bold text-[22px] rounded-[3px]">
                  1
                </div>
                <h3 className="font-space-grotesk text-2xl font-semibold text-white pt-2">
                  Assess
                </h3>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  Site walkthrough, fleet and tyre audit.
                </p>
              </li>

              <li className="md:px-8 space-y-3">
                <div className="w-[52px] h-[52px] grid place-items-center bg-[#3B82F6] text-white font-space-grotesk font-bold text-[22px] rounded-[3px]">
                  2
                </div>
                <h3 className="font-space-grotesk text-2xl font-semibold text-white pt-2">
                  Deploy
                </h3>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  OTR TPMS sensors and gateways fitted, with minimal disruption to shifts.
                </p>
              </li>

              <li className="md:pl-8 space-y-3">
                <div className="w-[52px] h-[52px] grid place-items-center bg-[#3B82F6] text-white font-space-grotesk font-bold text-[22px] rounded-[3px]">
                  3
                </div>
                <h3 className="font-space-grotesk text-2xl font-semibold text-white pt-2">
                  Predict
                </h3>
                <p className="text-base text-[#94A3B8] leading-relaxed">
                  TMIP dashboard live, baselines learned, alerts flowing to your team.
                </p>
              </li>
            </ol>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 10 ROI HOOK                                                    */}
        {/* ============================================================== */}
        <section className="py-20 sm:py-24 border-b border-slate-400/15 bg-gradient-to-b from-[#0B1220] to-[#050A17]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_auto] gap-8 lg:gap-12 items-end">
              <div>
                <div className="w-[60px] h-[3px] bg-[#3B82F6] mb-7" />
                <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#F1F5F9] leading-tight">
                  Calculate what unplanned downtime is costing your site.
                </h2>
                <p className="text-[#94A3B8] text-lg leading-relaxed mt-4 max-w-2xl">
                  Estimate the savings from fewer tyre failures, fewer unplanned stops and planned maintenance.
                </p>
              </div>

              <div>
                <Link
                  href="/tmip/roi-calculator"
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-ibm-plex font-semibold text-sm px-7 py-3.5 rounded-[4px] inline-flex items-center gap-2 whitespace-nowrap shadow-lg shadow-[#3B82F6]/20 transition-all duration-200"
                >
                  Open the ROI calculator
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 11 FAQ                                                         */}
        {/* ============================================================== */}
        <section className="py-20 sm:py-24 border-b border-slate-400/15">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="mb-12">
              <div className="w-[60px] h-[3px] bg-[#3B82F6] mb-7" />
              <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-[42px] font-semibold text-[#F1F5F9] leading-tight">
                Questions site teams ask.
              </h2>
            </div>

            <div className="max-w-3xl divide-y divide-slate-400/15 border-t border-b border-slate-400/15">
              {faqItems.map((item, idx) => (
                <details
                  key={idx}
                  className="group py-6 cursor-pointer"
                  open={idx === 2 ? true : undefined}
                >
                  <summary className="list-none flex items-center justify-between gap-4 font-space-grotesk text-lg sm:text-xl font-medium text-white hover:text-[#9CC2FF] transition-colors focus:outline-none">
                    <span>{item.q}</span>
                    <span className="shrink-0 w-5 h-5 rounded-full border border-blue-500/40 flex items-center justify-center text-blue-400 group-open:rotate-180 transition-transform">
                      <ChevronDown className="w-3.5 h-3.5" />
                    </span>
                  </summary>
                  <div className="pt-4 text-base text-[#94A3B8] leading-relaxed pr-8">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ============================================================== */}
        {/* 12 CLOSING CTA                                                 */}
        {/* ============================================================== */}
        <section id="assess" className="py-20 sm:py-24 bg-[#0F1729] border-b border-slate-400/15">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-8 lg:gap-10 items-center">
              {/* TMIP 3-Bar Brand Emblem */}
              <div className="shrink-0">
                <svg
                  viewBox="0 0 100 40"
                  className="w-16 h-7 sm:w-20 sm:h-9"
                  fill="#3B82F6"
                  aria-hidden="true"
                >
                  <rect x="5" y="4" width="90" height="8" rx="1.5" opacity="0.6" />
                  <rect x="5" y="16" width="90" height="8" rx="1.5" opacity="0.85" />
                  <rect x="5" y="28" width="90" height="8" rx="1.5" />
                </svg>
              </div>

              {/* Headline */}
              <div>
                <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-semibold text-white leading-tight">
                  Every machine on your site is already generating signals. Start reading them.
                </h2>
              </div>

              {/* Action Button */}
              <div className="shrink-0">
                <Link
                  href="/tmip/demo"
                  className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-ibm-plex font-semibold text-sm px-7 py-4 rounded-[4px] inline-flex items-center gap-2 whitespace-nowrap shadow-lg shadow-[#3B82F6]/25 transition-all duration-200"
                >
                  Book a site assessment
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
