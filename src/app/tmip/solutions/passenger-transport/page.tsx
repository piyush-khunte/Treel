import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  ShieldCheck,
  Activity,
  Bus,
  FileCheck2,
  Clock,
  Compass,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Passenger Transport Fleet Intelligence · TMIP",
  description:
    "TMIP for passenger transport fleets: buses, corporate transport, school transport, inter-city operators where safety and uptime are non-negotiable.",
  alternates: {
    canonical: "https://treel.in/tmip/solutions/passenger-transport",
  },
  openGraph: {
    title: "Passenger Transport Fleet Intelligence · TMIP",
    description:
      "TMIP for passenger transport fleets: buses, corporate transport, school transport, inter-city operators where safety and uptime are non-negotiable.",
    url: "https://treel.in/tmip/solutions/passenger-transport",
  },
};

const challenges = [
  {
    title: "Passenger safety as the non-negotiable first metric",
    desc: "When passenger lives are on board, thermal blowouts, brake fade, and sudden mechanical failures are unacceptable safety emergencies.",
  },
  {
    title: "Tyre and brake reliability across mixed routes",
    desc: "Continuous stop-and-go urban traffic combined with sustained high-speed concrete expressway runs creates intense thermal stress on wheel assemblies.",
  },
  {
    title: "Driver behaviour with passenger comfort as a variable",
    desc: "Harsh acceleration, sudden emergency braking, and aggressive cornering directly degrade passenger experience and increase rollover hazards.",
  },
  {
    title: "Severe schedule and uptime pressure",
    desc: "An off-road coach or urban transit bus strands paying passengers, missing scheduled route timings and causing severe reputational damage.",
  },
  {
    title: "Regulatory compliance and record-keeping",
    desc: "Meeting AIS-140 safety telemetry standards, state transport authority mandates, and maintaining defensible audit logs for insurance.",
  },
];

const capabilities = [
  {
    title: "Safety-First Alert Thresholds",
    desc: "Conservative, multi-stage pressure and temperature threshold alerts for tyres and braking systems, prioritizing early incident prevention.",
    icon: ShieldCheck,
  },
  {
    title: "Passenger Comfort Scoring",
    desc: "Sophisticated g-force and inertial telemetry algorithms that evaluate driver smoothness alongside standard fuel economy metrics.",
    icon: Activity,
  },
  {
    title: "Automated Regulatory Reporting",
    desc: "Turnkey compliance export engines structured for State Transport Undertakings (STUs), corporate commute audits, and safety authorities.",
    icon: FileCheck2,
  },
  {
    title: "Dedicated Uptime Dashboards",
    desc: "Real-time dispatch consoles designed for station managers and depot controllers overseeing high-frequency scheduled transit operations.",
    icon: Clock,
  },
  {
    title: "Route-Level Safety Analytics",
    desc: "Corridor-level hazard mapping that identifies high-thermal highway segments, sharp descent curves, and rough surface stress zones.",
    icon: Compass,
  },
];

export default function TmipSolutionsPassengerTransportPage() {
  return (
    <div className="bg-[#050A17] text-[#F1F5F9] font-ibm">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] mb-4">
              <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
                TMIP
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href="/tmip/solutions" className="hover:text-[#F1F5F9] transition-colors">
                Solutions
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">Passenger Transport</span>
            </nav>

            <div className="inline-flex items-center gap-2 border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-full text-xs font-mono text-[#3B82F6] uppercase tracking-widest font-semibold">
              SOLUTIONS · PASSENGER TRANSPORT
            </div>

            <h1 className="font-space text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              Where a tyre blowout is not an operational event. It is a safety event.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl">
              TMIP for passenger transport fleets. Buses, corporate transport, school transport, inter-city operators.
              Where the payload is people, the platform priorities shift.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Book a demo <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/tmip/platform"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all border border-white/15 text-[#F1F5F9] hover:bg-white/5"
              >
                View Safety Architecture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Proof Band */}
      <section className="py-12 border-b border-white/10 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-[#0B1220] border border-white/10">
              <div className="font-space text-3xl sm:text-4xl font-bold text-[#10B981]">0 Bursts</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1">Zero Expressway Blowouts</div>
              <div className="text-xs text-[#94A3B8] mt-1">Across 650 luxury intercity coaches over 18 continuous months</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0B1220] border border-white/10">
              <div className="font-space text-3xl sm:text-4xl font-bold text-[#3B82F6]">99.6%</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1">Schedule Reliability</div>
              <div className="text-xs text-[#94A3B8] mt-1">Eliminating roadside breakdown passenger stranding events</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0B1220] border border-white/10">
              <div className="font-space text-3xl sm:text-4xl font-bold text-[#F59E0B]">&lt;1.0s</div>
              <div className="text-sm font-semibold text-[#F1F5F9] mt-1">Sub-Second Telemetry</div>
              <div className="text-xs text-[#94A3B8] mt-1">Instantaneous audio-visual driver alerts on cab displays</div>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Challenges Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Industry Challenges in Passenger Operations
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Passenger transit leaders manage high passenger liability, tight public schedules, and regulatory
              scrutiny across diverse road conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-[#080E1E] border border-white/10 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-xs font-mono font-bold text-[#3B82F6]">
                  0{idx + 1}
                </div>
                <h3 className="font-space text-lg font-bold text-[#F1F5F9]">{item.title}</h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TMIP's Fit Section */}
      <section className="py-20 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-1 rounded-full text-xs font-mono text-[#10B981] uppercase tracking-widest font-semibold">
                SAFETY-FIRST ARCHITECTURE
              </div>
              <h2 className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                What TMIP does for passenger fleets.
              </h2>
              <div className="space-y-4 text-[#94A3B8] text-base sm:text-lg leading-relaxed">
                <p>
                  For passenger transport, TMIP&apos;s safety-relevant capabilities take precedence in the deployment
                  configuration. Tyre pressure and temperature alerts run at conservative thresholds. Driver behaviour
                  metrics weight passenger comfort factors (harsh braking, sharp cornering) alongside fuel efficiency.
                </p>
                <p>
                  Predictive maintenance prioritizes brake and tyre components, transforming unpredictable mechanical
                  failures into scheduled depot servicing before buses ever depart on their routes.
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-2xl bg-[#050A17] border border-white/10 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/30 flex items-center justify-center text-[#3B82F6]">
                  <Bus className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-space font-bold text-base text-[#F1F5F9]">Transit Safety Matrix</div>
                  <div className="text-xs font-mono text-[#94A3B8]">Passenger Transit Standards</div>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-sm text-[#94A3B8]">Thermal Alert Lead Time</span>
                  <span className="text-sm font-mono font-bold text-[#10B981]">18–25 min in advance</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-sm text-[#94A3B8]">Harsh Braking Index</span>
                  <span className="text-sm font-mono font-bold text-[#3B82F6]">-42% Reduction</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="text-sm text-[#94A3B8]">Compliance Audit Score</span>
                  <span className="text-sm font-mono font-bold text-[#F59E0B]">100% AIS-140 Defensible</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Relevant Capabilities Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Relevant Capabilities
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed">
              Focused entirely on rider safety, smooth transit dynamics, and uninterrupted service schedules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div key={i} className="p-6 rounded-2xl bg-[#0B1220] border border-white/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-space text-lg font-bold text-[#F1F5F9]">{cap.title}</h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Passenger Transport Case Studies Section */}
      <section className="py-20 border-b border-white/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl space-y-3">
              <div className="text-xs font-mono text-[#3B82F6] uppercase tracking-wider font-semibold">
                PROVEN RESULTS
              </div>
              <h2 className="font-space text-2xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
                Passenger transport operators running TMIP.
              </h2>
            </div>
            <Link
              href="/tmip/customers/case-studies"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:underline"
            >
              View all case studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="max-w-2xl">
            {/* Case Study Card */}
            <div className="p-8 rounded-2xl bg-[#050A17] border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-[#3B82F6]/30 bg-[#3B82F6]/10 px-3 py-1 rounded-full text-xs font-mono text-[#3B82F6] uppercase font-semibold">
                    PASSENGER EXPRESS
                  </span>
                  <span className="text-xs font-mono text-[#94A3B8]">650 Coaches</span>
                </div>
                <h3 className="font-space text-xl font-bold text-[#F1F5F9]">
                  Eliminating high-speed tyre failures across 650 luxury intercity coaches.
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  How continuous sub-second pressure and heat telemetry eliminated thermal blowouts on high-speed western
                  expressways, safeguarding passenger safety and route punctuality.
                </p>
                <div className="flex items-center gap-6 pt-2 font-mono text-sm">
                  <div>
                    <span className="text-[#10B981] font-bold">0 Bursts</span>
                    <span className="text-xs text-[#94A3B8] ml-1.5">Roadside incidents</span>
                  </div>
                  <div>
                    <span className="text-[#3B82F6] font-bold">5.8%</span>
                    <span className="text-xs text-[#94A3B8] ml-1.5">Fuel saved</span>
                  </div>
                </div>
              </div>
              <Link
                href="/tmip/customers/case-studies/intercity-passenger-express"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B82F6] hover:underline"
              >
                Read full case study <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band Section */}
      <section className="py-20 bg-[#050A17]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#080E1E] to-[#0B1220] border border-white/10 text-center space-y-6 max-w-4xl mx-auto">
            <h2 className="font-space text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Protect your passengers and schedules.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Schedule a consultation with our transit safety architects to deploy conservative alert thresholds and
              driver comfort metrics across your coach network.
            </p>
            <div className="pt-2">
              <Link
                href="/tmip/demo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base transition-all shadow-lg bg-[#3B82F6] text-white hover:bg-[#2563EB]"
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
