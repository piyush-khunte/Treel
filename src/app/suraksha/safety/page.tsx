import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Truck Safety  \u00b7  Front-Tyre Blowouts Prevented  \u00b7  Suraksha",
  description: "Prevent front-tyre blowouts before they happen. Suraksha real-time pressure and temperature monitoring alerts you 24-48 hours before a tyre fails. For your family's safety.",
  alternates: {
    canonical: "https://treel.in/suraksha/safety",
  },
  openGraph: {
    title: "Truck Safety  \u00b7  Front-Tyre Blowouts Prevented  \u00b7  Suraksha",
    description: "Prevent front-tyre blowouts before they happen. Suraksha real-time pressure and temperature monitoring alerts you 24-48 hours before a tyre fails. For your family's safety.",
    url: "https://treel.in/suraksha/safety",
  },
};

export default function SurakshaSafetyPage() {
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
                { label: "Safety" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              SAFETY
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              THE WARNING<br /><span className="italic text-[#DC2626]">BEFORE THE BLOWOUT.</span>
            </h1>
            <SurakshaRotator
              page="5.9"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-2"
            >
              हर टायर पर नज़र, हर सफ़र सुरक्षित।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              A front-tyre blowout on an Indian highway can cost a human life and shatter a family&apos;s sole livelihood. Suraksha continuously tracks the pressure and temperature of every tyre, alerting drivers 24–48 hours before failure so they can stop safely, save crucial transit time, and protect their vehicle.
            </p>

            {/* National Road Safety & Livelihood Stat Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-lg bg-[#FEF3C7] border-2 border-[#DC2626]/30">
                <div className="font-anton text-2xl sm:text-3xl text-[#DC2626]">~1.83–1.9 LAKH</div>
                <div className="text-xs font-bold text-[#451A03] uppercase tracking-wider mt-0.5">Annual Road Fatalities</div>
                <p className="text-[11px] text-[#78350F] mt-1 leading-snug">National road statistics across Indian highways.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#FEF3C7] border-2 border-[#DC2626]/30">
                <div className="font-anton text-2xl sm:text-3xl text-[#DC2626]">~13% TIED TO TYRES</div>
                <div className="text-xs font-bold text-[#451A03] uppercase tracking-wider mt-0.5">Catastrophic Failures</div>
                <p className="text-[11px] text-[#78350F] mt-1 leading-snug">Caused by burst tyres, overheating, and sudden blowouts.</p>
              </div>
              <div className="p-4 rounded-lg bg-[#FEF3C7] border-2 border-[#DC2626]/30">
                <div className="font-anton text-2xl sm:text-3xl text-[#DC2626]">LIVELIHOOD SHIELD</div>
                <div className="text-xs font-bold text-[#451A03] uppercase tracking-wider mt-0.5">Zero Lost Days</div>
                <p className="text-[11px] text-[#78350F] mt-1 leading-snug">Saves 8–14 hours per run and protects the family&apos;s truck.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detection Categories */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                DETECTION SYSTEM
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                WHAT SURAKSHA DETECTS
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Three categories with examples:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category 1 */}
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-4">
                <div className="font-anton text-xl uppercase text-[#451A03]">
                  Category 1 · Slow leaks:
                </div>
                <div className="space-y-2 text-sm text-[#78350F]">
                  <div><strong className="text-[#451A03]">What:</strong> Pressure gradually drops over hours (nail puncture, valve leak, sidewall crack)</div>
                  <div><strong className="text-[#451A03]">Warning window:</strong> Usually 12-48 hours before critical failure</div>
                  <div><strong className="text-[#451A03]">Display shows:</strong> Yellow pressure indicator, gradual decrease alert</div>
                </div>
              </div>

              {/* Category 2 */}
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#EA580C] transition-all shadow-sm space-y-4">
                <div className="font-anton text-xl uppercase text-[#451A03]">
                  Category 2 · Temperature spikes:
                </div>
                <div className="space-y-2 text-sm text-[#78350F]">
                  <div><strong className="text-[#451A03]">What:</strong> Tyre temperature rises abnormally (overloading, prolonged high-speed driving, internal damage, brake dragging)</div>
                  <div><strong className="text-[#451A03]">Warning window:</strong> Immediate — as temperature rises, display shows warning</div>
                  <div><strong className="text-[#451A03]">Display shows:</strong> Orange or red temperature indicator, high-temp beep</div>
                </div>
              </div>

              {/* Category 3 */}
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-4">
                <div className="font-anton text-xl uppercase text-[#451A03]">
                  Category 3 · Rapid deflation:
                </div>
                <div className="space-y-2 text-sm text-[#78350F]">
                  <div><strong className="text-[#451A03]">What:</strong> Sudden pressure drop (large puncture, valve failure, sidewall cut)</div>
                  <div><strong className="text-[#451A03]">Warning window:</strong> Seconds to minutes before complete tyre failure</div>
                  <div><strong className="text-[#451A03]">Display shows:</strong> Red flashing alert, continuous alarm — pull over immediately</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Driver Stories */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                TESTIMONIALS
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                REAL DRIVER STORIES
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-[#DC2626]">
                  Story 1: Driver: Narender K. · North India route
                </div>
                <p className="text-base text-[#451A03] italic font-medium leading-relaxed">
                  &ldquo;During a highway drive from Pune to Mumbai, I received a slow-leak warning for my front-right tyre. I pulled over and discovered a nail in the tyre. If I had continued driving at 100 km/h, it could have resulted in a tyre blowout. Suraksha helped me get home safely with my family.&rdquo;
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                  Story 2: Driver:
                </div>
              </div>

              <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
                  Story 3: Driver:
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Numbers */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                STATISTICS
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                KEY SAFETY METRICS
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Critical highway data that every commercial vehicle operator should know:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626]/20 shadow-sm space-y-2">
                <div className="font-anton text-4xl text-[#DC2626]">40%</div>
                <p className="text-sm text-[#451A03] font-medium leading-relaxed">
                  of truck accidents in India involve tyre failures (Source: Ministry of Road Transport & Highways)
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626]/20 shadow-sm space-y-2">
                <div className="font-anton text-4xl text-[#DC2626]">80%</div>
                <p className="text-sm text-[#451A03] font-medium leading-relaxed">
                  of tyre failures show warning signs 24-48 hours in advance
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626]/20 shadow-sm space-y-2">
                <div className="font-anton text-4xl text-[#EA580C]">60 km/h</div>
                <p className="text-sm text-[#451A03] font-medium leading-relaxed">
                  is the typical loaded truck highway speed where a blowout becomes life-threatening
                </p>
              </div>

              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626]/20 shadow-sm space-y-2">
                <div className="font-anton text-4xl text-[#0891B2]">60%</div>
                <p className="text-sm text-[#451A03] font-medium leading-relaxed">
                  of tyre-related fatalities are preventable with monitoring (industry estimates)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family Promise */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-12 rounded-lg bg-[#FEF3C7] border-3 border-[#DC2626] max-w-4xl space-y-6 shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase">
              FAMILY FIRST
            </div>

            <h2 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl font-normal text-[#451A03]">
              BUILT FOR YOUR FAMILY
            </h2>

            <p className="text-[#451A03] text-lg sm:text-xl leading-relaxed font-medium">
              Every truck driver has family waiting at home—spouses, children, and parents. The true measure of every highway journey is returning home safely. That is the core mission of Suraksha: ensuring you get home safely every time.
            </p>

            <p className="text-[#78350F] text-base leading-relaxed">
              Beyond product specifications and hardware, Suraksha is fundamentally built for your family&apos;s peace of mind.
            </p>

            <div className="pt-4 border-t-2 border-[#DC2626]/20">
              <div className="font-anton text-2xl tracking-wide uppercase text-[#DC2626]">
                SAFE RETURN ON EVERY TRIP
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
              INSTALL SURAKSHA FOR YOUR FAMILY
            </h2>
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