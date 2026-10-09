import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

export const metadata: Metadata = {
  title: "Why Suraksha  \u00b7  Safety, Savings, Simplicity for Truck Owner-Drivers",
  description: "Three reasons truck owner-drivers install Suraksha. Safety for the driver. Savings for the business. Simplicity for the family. Full breakdown of each pillar.",
  alternates: {
    canonical: "https://treel.in/suraksha/why-suraksha",
  },
  openGraph: {
    title: "Why Suraksha  \u00b7  Safety, Savings, Simplicity for Truck Owner-Drivers",
    description: "Three reasons truck owner-drivers install Suraksha. Safety for the driver. Savings for the business. Simplicity for the family. Full breakdown of each pillar.",
    url: "https://treel.in/suraksha/why-suraksha",
  },
};

export default function SurakshaWhySurakshaPage() {
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
                { label: "Why Suraksha" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              WHY SURAKSHA?
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              SAFETY. SAVINGS.<br /><span className="italic text-[#DC2626]">SIMPLICITY.</span>
            </h1>
            <SurakshaRotator
              page="5.8"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-2"
            >
              तीन वजह, क्यों ड्राइवर सुरक्षा लगवाते हैं।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Safety, savings, and simplicity. Each pillar is explained in detail below. Read, explore, and decide.
            </p>
          </div>
        </div>
      </section>

      {/* Pillar 1: Safety */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-10 rounded-lg bg-[#FFFBEB] border-3 border-[#DC2626] shadow-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-rubik text-xs font-bold px-3 py-1 rounded-full border border-[#DC2626]/30 bg-[#DC2626]/10 text-[#DC2626]">
                01 · SAFETY
              </span>
              <span className="text-xs font-semibold text-[#78350F]">Pillar 1: Suraksha Red</span>
            </div>

            <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal text-[#451A03]">
              FRONT-TYRE BLOWOUTS, PREVENTED.
            </h2>

            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-medium">
              Every truck driver knows what a front-tyre blowout on the highway means. You lose control of the vehicle. Managing a loaded truck even at 60 km/h becomes nearly impossible. In the worst-case scenario, the driver&apos;s family only finds out through an emergency phone call.
            </p>

            <p className="text-[#78350F] text-base leading-relaxed">
              Suraksha&apos;s purpose is simple: warn you before a blowout happens. The cabin display continuously shows the pressure and temperature of every tyre. When a slow leak begins or temperature spikes, the display flashes red and beeps. You can pull over, check the tyre in time, and stay safe.
            </p>

            <div className="pt-2 border-t border-[#451A03]/10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-3">
                Key safety facts:
              </div>
              <ul className="space-y-2.5 text-sm text-[#451A03]">
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>40% of truck accidents in India involve tyre failures (source: Ministry of Road Transport & Highways data)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>Front-tyre blowouts at 60+ km/h are among the deadliest single-vehicle accidents on Indian highways</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span>80% of tyre failures show warning signs 24-48 hours before the actual failure — signs a driver cannot see without a sensor</span>
                </li>
              </ul>
            </div>

            <div className="pt-2">
              <p className="text-[#451A03] text-sm font-semibold">
                The Suraksha promise: You receive early warning 24 to 48 hours before failure occurs.
              </p>
            </div>

            <div className="pt-4 border-t-2 border-[#DC2626]/20 flex items-center justify-between flex-wrap gap-4">
              <div className="font-anton text-2xl tracking-wide uppercase text-[#DC2626]">
                SAFETY FOR YOUR FAMILY
              </div>
              <Link
                href="/suraksha/safety"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-sm bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] transition-all shadow-md"
              >
                Explore Safety In Detail → <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 2: Savings */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-10 rounded-lg bg-[#FEF3C7] border-3 border-[#EA580C] shadow-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-rubik text-xs font-bold px-3 py-1 rounded-full border border-[#EA580C]/30 bg-[#EA580C]/10 text-[#EA580C]">
                02 · SAVINGS
              </span>
              <span className="text-xs font-semibold text-[#78350F]">Pillar 2: Marigold</span>
            </div>

            <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal text-[#451A03]">
              NINE MONTHS. FULL PAYBACK.
            </h2>

            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-medium">
              From a business perspective, Suraksha&apos;s return on investment is straightforward. Operational savings recover the full cost of the kit within 9 to 12 months.
            </p>

            <p className="text-[#78350F] text-base font-semibold">
              Where do these savings come from?
            </p>

            <div className="space-y-3 text-sm text-[#451A03]">
              <p>
                <strong>Fuel savings (0.5–0.6%):</strong> Underinflated tyres consume 0.5–0.6% extra diesel. With Suraksha, tyres stay at optimal operating pressure. For a typical 10-wheeler truck with a monthly fuel bill of ₹80,000–₹1,20,000, a 5% saving delivers ₹4,000–₹6,000 back every month.
              </p>
              <p>
                <strong>Tyre life extension (5–7%):</strong> Properly inflated tyres last 5–7% longer. With a fresh set of truck tyres costing ₹2,00,000–₹3,50,000, extending tyre life saves thousands across every tyre cycle.
              </p>
              <p>
                <strong>Zero roadside breakdown costs (₹5,000–₹15,000 per event):</strong> Every blowout leads to towing charges, vehicle downtime, and missed delivery penalties. Preventing even a single roadside event recovers substantial operational expense.
              </p>
            </div>

            <div className="pt-2 border-t border-[#451A03]/10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-3">
                Nine-month payback calculation:
              </div>
              <ul className="space-y-2 text-sm text-[#451A03]">
                <li className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold">•</span>
                  <span>Fuel savings: ₹4,000–₹6,000 per month × 9 months = ₹36,000–₹54,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold">•</span>
                  <span>Tyre life extension: Proportional to km driven, typically ₹1,500–₹3,000 per month</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#EA580C] font-bold">•</span>
                  <span>Downtime avoidance: Prevents costly highway emergency callouts</span>
                </li>
              </ul>
            </div>

            <p className="text-sm font-semibold text-[#451A03]">
              Total 9-month savings: Typically ₹40,000–₹70,000, easily exceeding initial kit investment.
            </p>

            <div className="pt-4 border-t-2 border-[#EA580C]/20 flex items-center justify-between flex-wrap gap-4">
              <div className="font-anton text-2xl tracking-wide uppercase text-[#DC2626]">
                FULL PAYBACK
              </div>
              <Link
                href="/suraksha/savings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-sm bg-[#EA580C] text-[#FEF3C7] hover:bg-[#C2410C] transition-all shadow-md"
              >
                Explore Savings In Detail → <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillar 3: Simplicity */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-8 sm:p-10 rounded-lg bg-[#FFFBEB] border-3 border-[#0891B2] shadow-md space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-rubik text-xs font-bold px-3 py-1 rounded-full border border-[#0891B2]/30 bg-[#0891B2]/10 text-[#0891B2]">
                03 · SIMPLICITY
              </span>
              <span className="text-xs font-semibold text-[#78350F]">Pillar 3: Ganga Teal</span>
            </div>

            <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal text-[#451A03]">
              FIT AT ANY PUNCTURE SHOP. WATCH IN YOUR CABIN.
            </h2>

            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-medium">
              Above all, Suraksha is simple: no app required, no subscriptions, no monthly fees, and no certified mechanic needed.
            </p>

            <p className="text-[#78350F] text-base leading-relaxed">
              Get your kit at any Truck Wheels centre or via WhatsApp. Fit it in 15 minutes at any puncture shop. Monitor tyre pressure and temperature directly on your in-cabin display during every trip.
            </p>

            <div className="pt-2 border-t border-[#451A03]/10">
              <div className="text-xs font-bold uppercase tracking-wider text-[#78350F] mb-3">
                What you never need to do:
              </div>
              <ul className="space-y-2 text-sm text-[#451A03]">
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>No app to download</strong> — the in-cabin display is fully standalone</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>No WiFi or mobile data needed</strong> — sensors communicate directly via wireless RF</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>No mechanic needed</strong> — any roadside puncture shop can complete the fitment</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>No tyre brand restrictions</strong> — works seamlessly with any tyre brand</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#0891B2] font-bold">•</span>
                  <span><strong>No monthly fees</strong> — one-time purchase with zero recurring cost</span>
                </li>
              </ul>
            </div>

            <div className="inline-block px-3 py-1 rounded-[4px] bg-[#0891B2]/10 border border-[#0891B2]/30 text-[#0891B2] font-rubik text-xs font-bold">
              No monthly fees. No app needed.
            </div>

            <p className="text-[#78350F] text-sm leading-relaxed">
              Real driver experience: Hundreds of trucks install Suraksha every month across transport clusters in India at puncture shops and Truck Wheels centres. Zero training required, zero complications.
            </p>

            <div className="pt-4 border-t-2 border-[#0891B2]/20 flex items-center justify-between flex-wrap gap-4">
              <div className="text-xs font-bold uppercase tracking-wider text-[#0891B2]">
                SIMPLICITY GUARANTEED
              </div>
              <Link
                href="/suraksha/simplicity"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-sm bg-[#0891B2] text-[#FEF3C7] hover:bg-[#0E7490] transition-all shadow-md"
              >
                Explore Simplicity In Detail → <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FEF3C7]">
              THREE PROMISES. ONE COMPLETE KIT.<br />COMPLETE SAFETY.
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