import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Treel Products  \u00b7  TMIP, Suraksha, Personal TPMS",
  description: "Three products from Treel Mobility Solutions: TMIP for enterprise fleets, Project Suraksha for owner-drivers, Personal TPMS for consumers. One architecture, three audiences.",
  alternates: {
    canonical: "https://treel.in/products",
  },
  openGraph: {
    title: "Treel Products  \u00b7  TMIP, Suraksha, Personal TPMS",
    description: "Three products from Treel Mobility Solutions: TMIP for enterprise fleets, Project Suraksha for owner-drivers, Personal TPMS for consumers. One architecture, three audiences.",
    url: "https://treel.in/products",
  },
};

export default function ProductsPage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">PRODUCTS</div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Three products. One architecture.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">Treel operates three product families on one shared data infrastructure. Each carries its own visual language, tone, price point, and audience. All three share the Vehicle Digital Twin architecture, the sensor family, and the operational DNA that binds Treel together.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Find the right product for your situation.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">If you run a fleet of ten or more vehicles, look at TMIP. If you own between one and five trucks, look at Suraksha. If you want tyre safety for your car or SUV, look at Personal TPMS.</p>
            <div className="pt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                Talk to us and we will help <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}