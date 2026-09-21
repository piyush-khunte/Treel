import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

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
              NINE MONTHS.<br /><span className="italic text-[#DC2626]">पूरी कीमत वापस।</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              ₹17,500 का kit nine months में पूरा पैसा वापस दे देता है। कैसे? Fuel, tyre life, और roadside events — तीनों जगहों से savings आती है। Calculator use करिए अपने truck के लिए।
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
                पैसा कहाँ से आता है?
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
                  Underinflated tyres 5-6% extra fuel burn करते हैं। यह most drivers को पता ही नहीं होता — क्योंकि eye से check करना मुश्किल है, especially heavy load पर।
                </p>
                <div className="pt-3 border-t border-[#451A03]/10 space-y-2 text-xs text-[#78350F]">
                  <div className="font-bold text-[#451A03]">Numbers:</div>
                  <div>• 10-wheeler monthly fuel expense: ₹80,000-₹1,20,000 (typical, varies by route)</div>
                  <div>• 5% savings = ₹4,000-₹6,000 per month</div>
                  <div className="font-bold text-[#DC2626]">• Annual savings = ₹48,000-₹72,000</div>
                  <div className="pt-1 text-[#451A03]">Explanation: Suraksha के साथ आपको हर trip पे correct pressure का confirmation मिलता है। Long-run में this is the biggest savings bucket।</div>
                </div>
              </div>

              {/* Bucket 2 */}
              <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#EA580C] transition-all shadow-sm space-y-4">
                <div className="font-anton text-xl uppercase text-[#EA580C]">
                  Bucket 2 · Tyre life extension (5-7%)
                </div>
                <p className="text-[#451A03] text-sm leading-relaxed">
                  Correct pressure पे tyres uniform wear करते हैं। Uneven wear (जो underinflation या overinflation से होती है) tyre life 5-7% कम कर देती है।
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
                  एक blowout या major puncture में direct costs (towing, repair) + indirect costs (delayed delivery, driver time, customer complaints) होते हैं।
                </p>
                <div className="pt-3 border-t border-[#451A03]/10 space-y-2 text-xs text-[#78350F]">
                  <div className="font-bold text-[#451A03]">Numbers per event:</div>
                  <div>• Towing charges: ₹5,00,0-₹15,000</div>
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
                Calculator inputs:
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-4">
              <ul className="space-y-2.5 text-sm text-[#451A03]">
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span><strong>Truck configuration (dropdown):</strong> 6-wheeler, 10-wheeler, 12-wheeler, 14-wheeler, 16-wheeler, 18-wheeler</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span><strong>Monthly kilometres (number):</strong> typical 8,000-25,000 km</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span><strong>Current fuel expense per month (₹):</strong> typical 60,000-1,50,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span><strong>Current tyre expense per year (₹):</strong> typical 60,000-1,50,000</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DC2626] font-bold">•</span>
                  <span><strong>Roadside events per year (estimate):</strong> 0, 1, 2, 3, 4+</span>
                </li>
              </ul>

              <div className="pt-3 border-t border-[#451A03]/10 flex flex-wrap items-center gap-4">
                <button className="px-6 py-3 rounded-[4px] font-rubik font-bold text-sm shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] transition-all">
                  Calculate my payback →
                </button>
                <Link
                  href="/suraksha/emi"
                  className="px-6 py-3 rounded-[4px] font-rubik font-bold text-sm border-2 border-[#DC2626] text-[#DC2626] bg-[#FEF3C7] hover:bg-[#DC2626]/10 transition-all"
                >
                  EMI Options →
                </Link>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-[#78350F] mb-4">
                Results section: Result cards (post-calculation):
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                  <h3 className="font-anton uppercase tracking-wide text-lg text-[#451A03]">Kit price for your configuration</h3>
                  <p className="font-anton text-2xl text-[#DC2626]">₹[amount]</p>
                  <div className="pt-2 font-bold text-xs text-[#DC2626] flex items-center gap-1">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                  <h3 className="font-anton uppercase tracking-wide text-lg text-[#451A03]">Estimated monthly fuel savings</h3>
                  <p className="font-anton text-2xl text-[#DC2626]">₹[amount]</p>
                  <div className="pt-2 font-bold text-xs text-[#DC2626] flex items-center gap-1">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                  <h3 className="font-anton uppercase tracking-wide text-lg text-[#451A03]">Estimated monthly tyre life savings</h3>
                  <p className="font-anton text-2xl text-[#DC2626]">₹[amount]</p>
                  <div className="pt-2 font-bold text-xs text-[#DC2626] flex items-center gap-1">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                  <h3 className="font-anton uppercase tracking-wide text-lg text-[#451A03]">Estimated annual downtime avoidance</h3>
                  <p className="font-anton text-2xl text-[#DC2626]">₹[amount]</p>
                  <div className="pt-2 font-bold text-xs text-[#DC2626] flex items-center gap-1">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#DC2626] shadow-sm space-y-2">
                  <h3 className="font-anton uppercase tracking-wide text-lg text-[#DC2626]">**Payback period</h3>
                  <p className="font-anton text-2xl text-[#DC2626]">[X] months**</p>
                  <div className="pt-2 font-bold text-xs text-[#DC2626] flex items-center gap-1">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 shadow-sm space-y-2">
                  <h3 className="font-anton uppercase tracking-wide text-lg text-[#451A03]">3-year net savings</h3>
                  <p className="font-anton text-2xl text-[#0891B2]">₹[amount]</p>
                  <div className="pt-2 font-bold text-xs text-[#0891B2] flex items-center gap-1">
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs font-semibold text-[#78350F] mb-3">Below results:</div>
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
              यह graph typical 10-wheeler के लिए है। आपके truck के exact numbers calculator में try करिए।
            </p>
            <div className="text-xs font-bold uppercase tracking-wider text-[#78350F]">
              Body (Hinglish):
            </div>
            <ul className="space-y-2.5 pt-2 text-sm text-[#451A03]">
              <li className="flex items-start gap-2">
                <span className="text-[#DC2626] font-bold">•</span>
                <span><strong>Month 0:</strong> Buy kit (₹17,500)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#EA580C] font-bold">•</span>
                <span><strong>Month 1-9:</strong> Monthly savings accumulate</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#10B981] font-bold">•</span>
                <span><strong>Month 9:</strong> Payback point reached</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#0891B2] font-bold">•</span>
                <span><strong>Month 10-36 (3-year warranty period):</strong> Pure profit</span>
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
              ₹16 PER DAY. एक कप चाय जैसा।
            </h2>
            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
              3-year warranty के हिसाब से, Suraksha का effective cost ₹16 per day है — एक कप चाय जितना। और वह भी 9 months के बाद savings में बदल जाता है।
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