import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

export const metadata: Metadata = {
  title: "Simplicity  \u00b7  No App, No Subscription  \u00b7  Suraksha",
  description: "Suraksha is designed for simplicity. No app to download. No monthly subscription. No mechanic needed. 15-minute installation at any puncture shop.",
  alternates: {
    canonical: "https://treel.in/suraksha/simplicity",
  },
  openGraph: {
    title: "Simplicity  \u00b7  No App, No Subscription  \u00b7  Suraksha",
    description: "Suraksha is designed for simplicity. No app to download. No monthly subscription. No mechanic needed. 15-minute installation at any puncture shop.",
    url: "https://treel.in/suraksha/simplicity",
  },
};

export default function SurakshaSimplicityPage() {
  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Simplicity" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              SIMPLICITY
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              FIT AT ANY PUNCTURE SHOP.<br /><span className="italic text-[#DC2626]">WATCH IN YOUR CABIN.</span>
            </h1>
            <SurakshaRotator
              page="5.11"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-2"
            >
              न ऐप, न सब्सक्रिप्शन, न मैकेनिक।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha is built for drivers, not technicians. The cabin display shows everything you need, with no smartphone required. See everything Suraksha doesn't need below.
            </p>
          </div>
        </div>
      </section>

      {/* What's Not Needed */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                HASSLE-FREE PROMISE
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                WHAT SURAKSHA DOES NOT REQUIRE
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                No extra complexity, no hidden dependencies:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] ">
                  Item 1: Smartphone app
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  The in-cab display is completely standalone. No smartphone is required—making it effortless for every driver.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] ">
                  Item 2: Internet connection
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  Sensors communicate directly with the cabin display via radio frequency (RF). No Wi-Fi or mobile data plan needed.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] ">
                  Item 3: Subscription or monthly fee
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  Buy it once and it is yours. Zero recurring fees, zero hidden service charges.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] ">
                  Item 4: Certified mechanic
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  Any roadside puncture shop or tyre technician can fit it in minutes. Truck Wheels centres and roadside shops alike can complete the installation.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] ">
                  Item 5: Specific tyre brand
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  Compatible with all commercial truck tyre brands—JK Tyre, MRF, Apollo, CEAT, Bridgestone, Michelin, and retreads.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-2">
                <div className="font-anton text-lg uppercase text-[#DC2626] ">
                  Item 6: Truck downtime for installation
                </div>
                <p className="text-sm text-[#451A03] leading-relaxed">
                  Installation takes just 15 minutes. Fit it during a routine tyre check without losing a haul.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15 Minute, 3 Steps */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                FAST INSTALLATION
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                15 MINUTES, 3 SIMPLE STEPS
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Step-by-step visual:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="font-anton text-2xl text-[#DC2626]">01</div>
                <div className="font-anton text-lg uppercase text-[#451A03]">
                  Step 1 (5 min): Mount Display
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Mount the compact display on the cabin dashboard or windshield. Connect power to the 12V/24V socket or battery. Complete.
                </p>
                <div className="pt-2 text-xs font-semibold text-[#DC2626]">
                  Display mounted in cabin
                </div>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="font-anton text-2xl text-[#EA580C]">02</div>
                <div className="font-anton text-lg uppercase text-[#451A03]">
                  Step 2: Fit Sensors
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  One sensor per tyre with anti-theft locking hardware. Fits securely on any standard commercial wheel. Fitting takes ~1–2 minutes per tyre.
                </p>
                <div className="pt-2 text-xs font-semibold text-[#EA580C]">
                  Sensors mounted on tyre valves
                </div>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="font-anton text-2xl text-[#0891B2]">03</div>
                <div className="font-anton text-lg uppercase text-[#451A03]">
                  Step 3 (3 min): Pair & Confirm
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  The display automatically pairs with every sensor. Confirm pressures show green. Baselines are established and you are ready to roll.
                </p>
                <div className="pt-2 text-xs font-semibold text-[#0891B2]">
                  Display showing all tyres green
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Suraksha Delivers On */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                THE DELIVERABLES
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                What Suraksha delivers on
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Core commitments:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "✓ No app required",
                "✓ No monthly fees",
                "✓ No subscription",
                "✓ No mechanic needed",
                "✓ Any tyre brand",
                "✓ Any truck",
                "✓ Any puncture shop",
                "✓ 15-minute install",
                "✓ 3-year warranty",
                "✓ Toll-free + WhatsApp support",
              ].map((badge) => (
                <div
                  key={badge}
                  className="p-4 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 font-rubik font-semibold text-sm text-[#451A03] shadow-sm flex items-center gap-2"
                >
                  <span className="text-[#10B981] font-bold">✓</span>
                  <span>{badge.replace("✓ ", "")}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                QUESTIONS
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                Common questions
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Everything answered:
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Is there really no mobile app to download?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Yes, none at all. The in-cab display is completely standalone—everything you need is clearly visible right on your dashboard.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Will it work without WhatsApp or internet?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Yes. Daily operation requires no internet connection or smartphone. WhatsApp is purely optional if you ever wish to contact customer support.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  Can any roadside puncture shop install it?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Yes. Every kit includes a 1-page visual guide, and helpline support is always available. Any puncture shop or tyre mechanic can fit it in minutes.
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="font-rubik font-bold text-base text-[#451A03]">
                  What happens after the 3-year warranty period?
                </div>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Suraksha comes with a comprehensive 3-year replacement warranty. If you ever need spare sensors or service thereafter, replacements are available across our partner centres.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FEF3C7]">
              THAT IS TRUE SIMPLICITY.
            </h2>
            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              Get your kit, install in 15 minutes, and drive with complete peace of mind.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#FEF3C7] text-[#451A03] hover:bg-white active:scale-[0.98]"
              >
                Nearest Centre <ArrowRight className="w-4 h-4 text-[#DC2626]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}