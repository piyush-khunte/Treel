import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story  \u00b7  Treel Mobility Solutions",
  description: "From a JK Tyre R&D idea in 2018 to India's largest connected commercial vehicle dataset in 2026. The Treel story, in milestones.",
  alternates: {
    canonical: "https://treel.in/our-story",
  },
  openGraph: {
    title: "Our Story  \u00b7  Treel Mobility Solutions",
    description: "From a JK Tyre R&D idea in 2018 to India's largest connected commercial vehicle dataset in 2026. The Treel story, in milestones.",
    url: "https://treel.in/our-story",
  },
};

export default function OurStoryPage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B] mb-6 sm:mb-8">
              OUR STORY
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Eight years. One category.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              From a JK Tyre R&D idea in 2018 to India's largest connected commercial vehicle dataset in 2026. The milestones that got us here.
            </p>
          </div>
        </div>
      </section>

      {/* 2. DAY ONE, STILL */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Day One, still.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              India's commercial vehicle fleet will grow to three hundred million vehicles in the next decade. Middle Eastern and European deployments follow the Indian launch in Month 4 and beyond. The category is not close to settled. Treel is here for the long build.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PLATFORM CTA */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              See what we are building today.
            </h2>
            <div className="pt-6">
              <Link href="/vehicle-digital-twin" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-sm bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                Explore the platform <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}