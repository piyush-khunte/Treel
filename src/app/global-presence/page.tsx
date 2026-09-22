import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  Globe2, 
  ShieldCheck, 
  Cpu, 
  Radio, 
  Server, 
  ThermometerSnowflake, 
  CheckCircle2, 
  Mail, 
  Building2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Global Presence & Export · Treel Mobility Solutions",
  description: "Treel's international export readiness, global telematics architecture, and commercial distribution network for automotive OEMs and commercial fleets worldwide.",
  alternates: {
    canonical: "https://treel.in/global-presence",
  },
  openGraph: {
    title: "Global Presence & Export · Treel Mobility Solutions",
    description: "Treel's international export readiness, global telematics architecture, and commercial distribution network for automotive OEMs and commercial fleets worldwide.",
    url: "https://treel.in/global-presence",
  },
};

export default function GlobalPresencePage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Global Presence / Export" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                GLOBAL PRESENCE &amp; EXPORT
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Engineering mobility intelligence for <span className="italic font-normal text-[#D5573B]">international markets.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Treel&apos;s tyre telematics sensors, vehicle digital twin platform, and enterprise intelligence systems are engineered for cross-border compatibility, regional regulatory compliance, and demanding operating environments worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* 2. EXPORT READINESS & ARCHITECTURAL FOUNDATIONS */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-12">
            <div className="space-y-3">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#D5573B]">
                Export Infrastructure
              </span>
              <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium text-[#FAF7F2] tracking-tight">
                Built for Cross-Border Deployment
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Commercial transport demands uncompromised reliability across international borders, varied cellular bands, extreme climates, and multi-tier fleet governance. Treel systems are architected from the physical layer up to satisfy global distribution specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-[#0F1419]/90 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5573B]">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="font-fraunces text-lg sm:text-xl font-medium text-[#FAF7F2]">
                  Multi-Band Cellular &amp; RF Telemetry
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Support for global 4G LTE-M, NB-IoT, and 2G fallback frequencies, coupled with 433 MHz and Bluetooth LE sensor links, ensuring continuous data transmission across multi-country transit routes.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-[#0F1419]/90 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5573B]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-fraunces text-lg sm:text-xl font-medium text-[#FAF7F2]">
                  International Compliance Standards
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Engineered in conformity with international automotive EMC standards, IP67 environmental sealing specifications, and automotive grade manufacturing processes for OE integration.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-[#0F1419]/90 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5573B]">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="font-fraunces text-lg sm:text-xl font-medium text-[#FAF7F2]">
                  Distributed Cloud &amp; Regional Residency
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Cloud platform deployment options accommodating regional data sovereignty regulations, low-latency streaming endpoints, and multi-tenant fleet isolation.
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-[#0F1419]/90 space-y-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5573B]">
                  <ThermometerSnowflake className="w-5 h-5" />
                </div>
                <h3 className="font-fraunces text-lg sm:text-xl font-medium text-[#FAF7F2]">
                  Extreme Climate Envelope
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Wheel-end sensor hardware validated for continuous operation from sub-zero refrigerated transit conditions up to high-ambient desert hauling and heavy quarry duty.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. REGIONAL MARKETS & ENGAGEMENT FRAMEWORK */}
      <section className="py-20 border-b border-white/10 bg-[#0F1419]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-12">
            <div className="space-y-3">
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-[#D5573B]">
                Engagement Framework
              </span>
              <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium text-[#FAF7F2] tracking-tight">
                Global Market Channels &amp; Operations
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Treel structures its international market engagement across defined distribution models, OEM factory-fit partnerships, and cross-border commercial fleets.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl border border-white/10 bg-[#121820] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#D5573B]" />
                    <h3 className="text-base font-semibold text-[#FAF7F2]">
                      International Commercial Fleets &amp; Logistics
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl">
                    Turnkey TPMS and fleet telematics kits for long-haul freight carriers, bus operators, dangerous goods (HAZMAT) transports, and heavy mining assets.
                  </p>
                </div>
                <span className="text-xs font-mono text-[#D5573B] border border-[#D5573B]/30 bg-[#D5573B]/10 px-3 py-1 rounded-full whitespace-nowrap">
                  Fleet Solutions
                </span>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-[#121820] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <h3 className="text-base font-semibold text-[#FAF7F2]">
                      Automotive OEM &amp; Tier-1 Supplier Integration
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl">
                    Factory-installed sensor modules, CAN-bus integration interfaces, and white-label digital twin APIs for vehicle manufacturers and axle assemblers.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 rounded-full whitespace-nowrap">
                  OEM Fitment
                </span>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-[#121820] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <h3 className="text-base font-semibold text-[#FAF7F2]">
                      Authorized Regional Distributors &amp; Value-Added Resellers
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-[#94A3B8] max-w-2xl">
                    Structured distribution programs offering commercial margins, technical certification, calibration tooling, and regional warranty support.
                  </p>
                </div>
                <span className="text-xs font-mono text-blue-400 border border-blue-400/30 bg-blue-400/10 px-3 py-1 rounded-full whitespace-nowrap">
                  Distribution Network
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERNATIONAL INQUIRY & CONTACT */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5573B]">
              <Globe2 className="w-6 h-6" />
            </div>
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Initiate an Export or Regional Inquiry
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              If you represent an automotive manufacturer, regional distributor, or commercial fleet operator outside India seeking technical specifications, export documentation, or deployment trials, connect with our international business team.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Button asChild variant="treel" size="lg">
                <Link href="/contact?subject=Export+Inquiry" className="inline-flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Contact International Desk <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white/20 text-[#FAF7F2] hover:bg-white/5">
                <Link href="/contact" className="inline-flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Corporate Headquarters
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
