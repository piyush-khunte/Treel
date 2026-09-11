import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Technology  \u00b7  Treel Platform Architecture",
  description: "The Treel technology stack: proprietary sensors, edge processing, cloud infrastructure, machine learning, and the Vehicle Digital Twin architecture that powers TMIP.",
  alternates: {
    canonical: "https://treel.in/technology",
  },
  openGraph: {
    title: "Technology  \u00b7  Treel Platform Architecture",
    description: "The Treel technology stack: proprietary sensors, edge processing, cloud infrastructure, machine learning, and the Vehicle Digital Twin architecture that powers TMIP.",
    url: "https://treel.in/technology",
  },
};

export default function TechnologyPage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">TECHNOLOGY</div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">The technology behind mobility intelligence.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">Treel is built on a five-layer architecture: sensors, edge processing, cloud infrastructure, machine learning, and the operator interface. Each layer is engineered for scale, reliability, and openness.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">The five-layer stack.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">The diagram below shows how data flows from a physical vehicle through Treel's platform to the operator's dashboard.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Layer 1 — Sensors.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel sensors are proprietary. ARAI certified. Benchmarked against international TPMS standards. Made in India by our engineering team. Two sensor families: automotive (5-year warranty) and two-wheeler (3-year warranty). The sensor is where the physical vehicle enters the data layer.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Layer 2 — Edge processing.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Edge devices at the vehicle level aggregate sensor data, filter noise, apply first-pass analytics, and stream to the cloud. Edge processing reduces bandwidth cost and enables offline resilience: if connectivity drops, the vehicle continues to log locally.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Layer 3 — Cloud infrastructure.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">The Treel cloud is where the Vehicle Digital Twin lives. Every vehicle has a persistent Twin that receives updates continuously, records state history, and serves queries. Infrastructure is designed for 99.7 percent uptime (current trailing 90-day average) with regional redundancy.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Layer 4 — Machine learning.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Models run continuously against the Vehicle Digital Twin data to forecast component wear, detect anomalies, predict maintenance windows, and identify driver behaviour risks. Model accuracy is tracked, versioned, and validated against real-world outcomes.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Layer 5 — Operator interface.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">The dashboard, the API, the alerts, the reports, the mobile app — all draw from the same Digital Twin data. Enterprise customers access via TMIP. Owner-drivers access via the Suraksha in-cab display. Consumers access via the Personal TPMS mobile app.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">API-first, always.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">The Treel platform is API-first. Every dashboard function is available programmatically. Integrations with Fleetx, Locus, LogiNext, SAP, Oracle, and custom TMS stacks are native, not adapted. If your fleet operates on a stack, Treel fits into it. See our <Link href="/tmip/platform/integrations" className="underline hover:text-white transition-colors">integrations page</Link> for the full list.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <Link href="/data-infrastructure" className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/30 transition-all group block">
                <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Data infrastructure</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/vehicle-digital-twin" className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/30 transition-all group block">
                <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Vehicle Digital Twin</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/tmip/platform" className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/30 transition-all group block">
                <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">TMIP platform</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Curious about the engineering behind this?</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">We are hiring engineers who want to build mobility intelligence at scale.</p>
            <div className="pt-6">
              <Link href="/careers" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                See engineering roles <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}