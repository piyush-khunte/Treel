import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";
import { SavingsCalculator } from "@/components/suraksha/savings-calculator";

export const metadata: Metadata = {
  title: "Savings  \u00b7  Nine-Month Payback on Suraksha Kit  \u00b7  ROI Calculator",
  description: "Suraksha kit pays back in 9 months through fuel savings (5-6%), tyre life extension (5-7%), and roadside downtime avoidance. Calculate your truck's savings.",
  alternates: {
    canonical: "https://treel.in/suraksha/savings",
  },
  openGraph: {
    title: "Savings  \u00b7  Nine-Month Payback on Suraksha Kit  \u00b7  ROI Calculator",
    description: "Suraksha kit pays back in 9 months through fuel savings (5-6%), tyre life extension (5-7%), and roadside downtime avoidance. Calculate your truck's savings.",
    url: "https://treel.in/suraksha/savings",
  },
};

export default function SurakshaSavingsPage() {
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
                { label: "Savings" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              SAVINGS
            </div>
            <h1 className="font-anton uppercase tracking-wide text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95]">
              9–12 MONTHS.<br /><span className="italic text-[#DC2626]">FULL PAYBACK.</span>
            </h1>
            <SurakshaRotator
              page="5.10"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-2"
            >
              डीज़ल, टायर और सड़क पर होने वाले खर्च में बचत।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha pays for itself in 9–12 months through fuel savings, longer tyre life and fewer roadside breakdowns. Payback varies by application and fleet operation. Use the calculator below to see the savings for your truck.
            </p>
          </div>
        </div>
      </section>

      {/* Savings Buckets */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                SAVINGS BREAKDOWN
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                WHERE THE SAVINGS COME FROM
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Three savings buckets with detailed explanations:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bucket 1 */}
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm space-y-4">
                <div className="font-anton text-xl uppercase text-[#DC2626]">
                  Bucket 1 · Fuel savings (5-6%)
                </div>
                <p className="text-[#451A03] text-sm leading-relaxed">
                  Underinflated tyres burn 5-6% extra fuel. Most drivers never notice this, because judging tyre pressure by eye is nearly impossible—especially under heavy loads.
                </p>
                <div className="pt-3 border-t border-[#451A03]/10 space-y-2 text-xs text-[#78350F]">
                  <div className="font-bold text-[#451A03]">Numbers:</div>
                  <div>• 10-wheeler monthly fuel expense: ₹80,000-₹1,20,000 (typical, varies by route)</div>
                  <div>• 5% savings = ₹4,000-₹6,000 per month</div>
                  <div className="font-bold text-[#DC2626]">• Annual savings = ₹48,000-₹72,000</div>
                  <div className="pt-1 text-[#451A03]">Explanation: With Suraksha, you get confirmed correct pressure on every single trip. In the long run, this is the single largest savings contributor.</div>
                </div>
              </div>

              {/* Bucket 2 */}
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#EA580C] transition-all shadow-sm space-y-4">
                <div className="font-anton text-xl uppercase text-[#EA580C]">
                  Bucket 2 · Tyre life extension (5-7%)
                </div>
                <p className="text-[#451A03] text-sm leading-relaxed">
                  Tyres wear evenly when maintained at the correct pressure. Uneven wear caused by under- or over-inflation reduces total tyre life by 5-7%.
                </p>
                <div className="pt-3 border-t border-[#451A03]/10 space-y-2 text-xs text-[#78350F]">
                  <div className="font-bold text-[#451A03]">Numbers:</div>
                  <div>• Set of truck tyres cost: ₹2,00,000-₹3,50,000</div>
                  <div className="font-bold text-[#EA580C]">• 5-7% extension over tyre lifecycle: ₹10,000-₹24,500 savings per tyre cycle</div>
                  <div>• Typical tyre cycle: 18-24 months for heavy commercial use</div>
                  <div>• Monthly effective savings: ₹500-₹1,500</div>
                </div>
              </div>

              {/* Bucket 3 */}
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#0891B2] transition-all shadow-sm space-y-4">
                <div className="font-anton text-xl uppercase text-[#0891B2]">
                  Bucket 3 · Roadside downtime avoidance
                </div>
                <p className="text-[#451A03] text-sm leading-relaxed">
                  A roadside blowout or major puncture incurs direct costs (towing, repair) plus indirect costs (delivery delays, driver lost time, customer penalties).
                </p>
                <div className="pt-3 border-t border-[#451A03]/10 space-y-2 text-xs text-[#78350F]">
                  <div className="font-bold text-[#451A03]">Numbers per event:</div>
                  <div>• Towing charges: ₹5,000-₹15,000</div>
                  <div>• Emergency repair: ₹3,000-₹8,000</div>
                  <div>• Delivery delay penalty (contract-based): Variable, often ₹5,000-₹25,000</div>
                  <div>• Driver overtime + waiting cost: ₹1,000-₹3,000</div>
                  <div className="font-bold text-[#0891B2]">• Total per event: ₹14,000-₹51,000</div>
                  <div className="pt-1 text-[#451A03]">Frequency: Even 1-2 events per year avoided pays for the entire kit.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Savings Calculator Section */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
                ESTIMATE YOUR ROI
              </div>
              <h2 className="font-anton uppercase tracking-wide text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-[#451A03]">
                CALCULATE YOUR TRUCK'S SAVINGS
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                Adjust the parameters below to see estimated diesel savings, tyre life extensions, and exact payback timing for your commercial vehicle.
              </p>
            </div>

            <SavingsCalculator />

            <div className="pt-4 flex items-center justify-between flex-wrap gap-4 border-t border-[#451A03]/10">
              <span className="text-sm font-semibold text-[#78350F]">
                Ready to install at an authorized Truck Wheels hub?
              </span>
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C]"
              >
                Nearest Centre <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-4">
            <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626]">
              TIMELINE VISUALIZATION
            </div>
            <p className="text-base text-[#451A03] font-medium leading-relaxed">
              This timeline illustrates payback for a typical 10-wheeler truck. Use the calculator above to see exact figures for your truck.
            </p>
            <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Payback Milestones:
            </div>
            <ul className="space-y-2.5 pt-2 text-sm text-[#451A03]">
              <li className="flex items-start gap-2">
                <span className="text-[#DC2626] font-bold">•</span>
                <span><strong>Month 0:</strong> Fit Suraksha kit</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EA580C] font-bold">•</span>
                <span><strong>Months 1–9:</strong> Fuel and tyre savings accumulate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] font-bold">•</span>
                <span><strong>Month 9:</strong> Full investment recovered</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0891B2] font-bold">•</span>
                <span><strong>Months 10–36 (3-year warranty period):</strong> Pure profit</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Chai Framing CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#FEF3C7]">
              9-MONTH PAYBACK · PEACE OF MIND FOR LESS THAN A DAILY CUP OF TEA
            </h2>
            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              With a 3-year warranty and zero monthly subscriptions, Suraksha's daily operational cost is less than a cup of roadside tea—and within 9 to 12 months, fuel and tyre savings recover your entire investment.
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