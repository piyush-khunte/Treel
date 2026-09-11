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
      highlight: "Direct JK Tyre & Treel backing"
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
    <div className="bg-white text-slate-900 font-manrope min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              FEATURES
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              What Personal TPMS actually does.
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              Six features. Six deep-dive pages. Read the summary here, or click through for the details on any one.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div
                  key={idx}
                  className="p-8 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {card.highlight}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed">
                      {card.desc}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-100 mt-6">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors group-hover:translate-x-1 duration-200"
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
      <section className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl space-y-4 mb-16">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              ENTERPRISE HERITAGE
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              What makes Personal TPMS different.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We built Personal TPMS on the same sensor family, cloud infrastructure, and engineering team that powers TMIP — Treel's enterprise fleet intelligence platform. When you buy Personal TPMS, you are getting consumer packaging on enterprise-grade technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pillars.map((p, idx) => {
              const PillarIcon = p.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <PillarIcon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-lg">{p.title}</h3>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed pl-13">
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
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
                Special Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                Equip your personal vehicle today.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Launch price of ₹8,999 (MRP ₹12,999). Includes 4 wireless smart sensors, lifetime Treel app access, and 1-year full replacement warranty.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <div className="text-center sm:text-right">
                <div className="text-3xl font-extrabold text-white">₹8,999</div>
                <div className="text-xs text-slate-400 line-through">MRP ₹12,999</div>
              </div>
              <Link
                href="/personal/buy/cart"
                className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-lg flex items-center gap-2"
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
