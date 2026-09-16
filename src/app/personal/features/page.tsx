import type { Metadata } from "next";
import Link from "next/link";
import { 
  Gauge, 
  Bell, 
  Smartphone, 
  BatteryCharging, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Cpu, 
  Cloud, 
  Award, 
  Flag,
  ShoppingCart
} from "lucide-react";

export const metadata: Metadata = {
  title: "Features · Personal TPMS",
  description: "Six features of Personal TPMS: real-time monitoring, instant alerts, mobile app, 2-year battery, iOS and Android, 1-year warranty. Explore each in depth.",
  alternates: {
    canonical: "https://treel.in/personal/features",
  },
  openGraph: {
    title: "Features · Personal TPMS",
    description: "Six features of Personal TPMS: real-time monitoring, instant alerts, mobile app, 2-year battery, iOS and Android, 1-year warranty. Explore each in depth.",
    url: "https://treel.in/personal/features",
  },
};

export default function PersonalFeaturesPage() {
  const featureCards = [
    {
      icon: Gauge,
      title: "Real-time monitoring",
      desc: "Pressure and temperature updated every three seconds when driving. Every tyre. Continuous visibility.",
      href: "/personal/features/monitoring",
      cta: "See how it works",
      highlight: "±0.5 PSI medical precision"
    },
    {
      icon: Bell,
      title: "Instant alerts",
      desc: "Notification before a slow leak becomes a puncture. Configurable thresholds. iOS, Android, Apple Watch.",
      href: "/personal/features/alerts",
      cta: "See how it works",
      highlight: "Multi-channel push alerts"
    },
    {
      icon: Smartphone,
      title: "Mobile app",
      desc: "Native iOS and Android app. Home screen widget. Apple Watch complications. Dark mode. Multi-vehicle support.",
      href: "/personal/features/app",
      cta: "See the app",
      highlight: "iOS 15+ & Android 10+"
    },
    {
      icon: BatteryCharging,
      title: "2-year battery life",
      desc: "Replaceable CR1632 cells. Six-week advance warning when battery is low. No mid-drive surprises.",
      href: "/personal/features/battery",
      cta: "See how it works",
      highlight: "CR1632 coin cells"
    },
    {
      icon: Clock,
      title: "10-minute setup",
      desc: "Four sensors screw on. Pair with the app. Done. No mechanic. No tools beyond what's in the box.",
      href: "/personal/support/setup",
      cta: "See the setup guide",
      highlight: "Zero wiring required"
    },
    {
      icon: ShieldCheck,
      title: "1-year warranty",
      desc: "Full replacement warranty on all four sensors and the app. Simple claim process. No questions.",
      href: "/personal/support/warranty",
      cta: "Read the warranty",
      highlight: "Official 1-Year Treel backing"
    },
  ];

  const pillars = [
    {
      icon: Cpu,
      title: "Enterprise Sensor Family",
      desc: "Uses the identical high-precision pressure transducers that power heavy commercial mining and logistics fleets across India."
    },
    {
      icon: Cloud,
      title: "Resilient Cloud Platform",
      desc: "Backed by the same enterprise infrastructure maintaining 99.7% uptime over trailing 90 days for millions of telemetry packets."
    },
    {
      icon: Award,
      title: "ARAI Certified Engineering",
      desc: "Automotive Research Association of India approved. Fully compliant with national vehicle safety standards."
    },
    {
      icon: Flag,
      title: "Engineered in India",
      desc: "Designed, calibrated, and manufactured specifically for Indian highway topography, extreme monsoon waterlogging, and summer heat."
    },
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              FEATURES
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              What Personal TPMS actually does.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Six features. Six deep-dive pages. Read the summary here, or click through for the details on any one.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white border border-black/[0.06] hover:border-[#2563EB]/30 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] border border-[#2563EB]/15 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-[#6B7280] bg-[#F3F4F6] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {card.highlight}
                      </span>
                    </div>

                    <h3 className="font-manrope text-2xl font-bold text-[#111827] group-hover:text-[#2563EB] transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-[#4B5563] text-sm leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-black/[0.06] mt-6">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group-hover:translate-x-1 duration-200"
                    >
                      {card.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Snippet: Enterprise Heritage Section */}
      <section className="py-20 bg-[#F9FAFB] border-b border-black/[0.06]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              ENTERPRISE HERITAGE
            </div>
            <h2 className="font-manrope text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              What makes Personal TPMS different.
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed font-medium">
              We built Personal TPMS on the same sensor family, cloud infrastructure, and engineering team that powers TMIP — Treel&apos;s enterprise fleet intelligence platform. When you buy Personal TPMS, you are getting consumer packaging on enterprise-grade technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, idx) => {
              const PillarIcon = p.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-black/[0.06] shadow-xs space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] border border-[#2563EB]/15 flex items-center justify-center text-[#2563EB]">
                      <PillarIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-manrope font-bold text-[#111827] text-lg">{p.title}</h3>
                  </div>
                  <p className="text-[#4B5563] text-sm leading-relaxed pl-13">
                    {p.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] border border-[#2563EB]/15 text-center max-w-4xl mx-auto space-y-6 shadow-sm">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-black/[0.08] text-[#2563EB] text-xs font-bold uppercase tracking-wider shadow-xs">
              Special Offer
            </div>
            <h2 className="font-manrope text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111827]">
              Equip your personal vehicle today.
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-medium">
              Launch price of ₹8,999 (MRP ₹12,999). Includes 4 wireless smart sensors, lifetime Treel app access, and 1-year full replacement warranty.
            </p>

            <div className="inline-flex items-baseline justify-center gap-3 px-6 py-3 rounded-full bg-white border border-black/[0.08] shadow-xs">
              <span className="font-manrope text-3xl sm:text-4xl font-extrabold text-[#111827]">
                ₹8,999
              </span>
              <span className="text-[#6B7280] line-through text-base font-medium">
                MRP ₹12,999
              </span>
            </div>

            <div className="pt-2 flex justify-center">
              <Link
                href="/personal/buy/cart"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-manrope font-bold text-sm uppercase tracking-wider transition-all shadow-md bg-[#2563EB] text-white hover:bg-[#1D4ED8]"
              >
                <ShoppingCart className="w-4 h-4" /> Add to cart →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
