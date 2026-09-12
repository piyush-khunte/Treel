import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, Factory, Cpu, ShieldCheck, CheckCircle2, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "OEM Fleet Solutions  ·  TMIP",
  description:
    "TMIP for commercial vehicle OEMs: integrated at vehicle delivery. Co-branded fleet intelligence for Tata, Mahindra, and OEM partners.",
  alternates: {
    canonical: "https://treel.in/tmip/solutions/oem-fleet",
  },
  openGraph: {
    title: "OEM Fleet Solutions  ·  TMIP",
    description:
      "TMIP for commercial vehicle OEMs: integrated at vehicle delivery. Co-branded fleet intelligence for Tata, Mahindra, and OEM partners.",
    url: "https://treel.in/tmip/solutions/oem-fleet",
  },
};

const oemPillars = [
  {
    icon: Factory,
    title: "Pre-Delivery Fitment",
    desc: "Direct integration on the manufacturing floor or pre-delivery inspection (PDI) bays. Sensors and edge gateways fitted before asset registration.",
  },
  {
    icon: Cpu,
    title: "Instant Digital Twin Provisioning",
    desc: "Every VIN is pre-mapped into TMIP's Vehicle Digital Twin database, enabling instant telemetry streaming the moment the buyer drives off the yard.",
  },
  {
    icon: Award,
    title: "Co-Branded Platform Experience",
    desc: "Deploy under an OEM-branded interface or Treel co-branded configuration, keeping your brand front-and-center throughout the vehicle ownership lifecycle.",
  },
  {
    icon: ShieldCheck,
    title: "Dedicated Executive Governance",
    desc: "Direct engineering collaboration and executive alignment with Treel's leadership to support custom telemetry architectures and warranty programs.",
  },
];

export default function TmipSolutionsOemFleetPage() {
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
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-4xl space-y-6">
            <nav className="flex items-center gap-2 text-xs font-jetbrains text-[#94A3B8] mb-4">
              <Link href="/tmip" className="hover:text-[#F1F5F9] transition-colors">
                TMIP
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <Link href="/tmip/solutions" className="hover:text-[#F1F5F9] transition-colors">
                Solutions
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#3B82F6]">OEM Fleet</span>
            </nav>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[3px] bg-[#3B82F6]/10 border border-[#3B82F6]/30 text-[#3B82F6] font-jetbrains text-xs tracking-wider uppercase font-semibold">
              SOLUTIONS · OEM FLEET
            </div>

            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.12]">
              TMIP at the vehicle-delivery stage.
            </h1>

            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl font-ibm-plex">
              For commercial vehicle OEMs — Tata, Mahindra, and others — TMIP integrates at the point of vehicle delivery.
              Fleet buyers receive mobility intelligence as part of the vehicle, co-branded, ready to run.
            </p>
          </div>
        </div>
      </section>

      {/* Section · What OEM integration looks like */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]/50">
        <div className="max-w-[1440px] mx-auto space-y-12">
          <div className="max-w-3xl space-y-4">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              TMIP as an OEM offering.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Commercial vehicle OEMs increasingly offer connected vehicle solutions as part of their fleet buyer
              proposition. TMIP is available for OEM integration under a co-branded arrangement, where Treel provides the
              mobility intelligence platform and the OEM manages the customer relationship.
            </p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Integration happens at manufacturing or pre-delivery. Sensors are fitted, the Vehicle Digital Twin is
              registered, and the fleet buyer receives a connected vehicle from day one of ownership.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {oemPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-[4px] bg-[#0B1220] border border-slate-400/10 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-[4px] bg-[#3B82F6]/10 border border-[#3B82F6]/20 flex items-center justify-center text-[#3B82F6]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-space-grotesk text-lg font-bold text-[#F1F5F9]">{p.title}</h3>
                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-ibm-plex">{p.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section · Partnership model */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-jetbrains text-[#F59E0B] uppercase tracking-wider font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Direct Executive Partnership</span>
            </div>
            <h2 className="font-space-grotesk text-3xl sm:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              How we work with OEM partners.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              OEM engagements are handled directly by Treel&apos;s founder and executive team. This is not a
              self-service offering. Every OEM partnership is structured around the OEM&apos;s product roadmap,
              distribution model, and customer relationships.
            </p>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative z-10 py-20 lg:py-24 px-6 sm:px-10 border-b border-slate-400/10 bg-[#080E1E]">
        <div className="max-w-[1440px] mx-auto">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-space-grotesk text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F1F5F9]">
              Explore an OEM partnership.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Contact our executive partnerships group to discuss factory-line integration, warranty telemetry programs,
              and joint go-to-market strategies.
            </p>
            <div className="pt-4">
              <Link
                href="/contact?subject=Partners"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB]"
              >
                Contact partnerships <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}