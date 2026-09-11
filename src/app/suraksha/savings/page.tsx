import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

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
    <div className="space-y-0 bg-[#111315] text-[#FAF7F2] font-rubik">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#E65100] bg-[#E65100]/10 border-[#E65100]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">SAVINGS</div>
            <h1 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">NINE MONTHS.<br />*POORI KIMAT WAPAS.*</h1>
            <p className="text-[#A3A3A3] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl">₹17,500 ka kit nine months mein poora paisa wapas de deta hai. Kaise? Fuel, tyre life, aur roadside events — teenon jaghon se savings aati hai. Calculator use kariye apne truck ke liye.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">PAISA KAHAAN SE AATA HAI?</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Three savings buckets with detailed explanations:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Bucket 1 · Fuel savings (5-6%)**</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Bucket 2 · Tyre life extension (5-7%)**</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Bucket 3 · Roadside downtime avoidance**</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Body (Hinglish): Underinflated tyres 5-6% extra fuel burn karte hai. Yeh most drivers ko pata hi nahi hota — kyunki eye se check karna mushkil hai, especially heavy load par.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Numbers:</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>10-wheeler monthly fuel expense: ₹80,000-₹1,20,000 (typical, varies by route)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>5% savings = ₹4,000-₹6,000 per month</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Annual savings = ₹48,000-₹72,000</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Explanation: Suraksha ke saath aapko har trip pe correct pressure ka confirmation milta hai. Long-run mein this is the biggest savings bucket.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Body (Hinglish): Correct pressure pe tyres uniform wear karte hai. Uneven wear (jo underinflation ya overinflation se hoti hai) tyre life 5-7% kam kar deti hai.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Numbers:</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Set of truck tyres cost: ₹2,00,000-₹3,50,000</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>5-7% extension over tyre lifecycle: ₹10,000-₹24,500 savings per tyre cycle</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Typical tyre cycle: 18-24 months for heavy commercial use</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Monthly effective savings: ₹500-₹1,500</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Body (Hinglish): Ek blowout ya major puncture mein direct costs (towing, repair) + indirect costs (delayed delivery, driver time, customer complaints) hote hai.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Numbers per event:</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Towing charges: ₹5,000-₹15,000</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Emergency repair: ₹3,000-₹8,000</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Delivery delay penalty (contract-based): Variable, often ₹5,000-₹25,000</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Driver overtime + waiting cost: ₹1,000-₹3,000</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Total per event: ₹14,000-₹51,000</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Frequency: Even 1-2 events per year avoided pays for the entire kit.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">CALCULATE YOUR TRUCK'S SAVINGS</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Calculator inputs:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Calculate button:** `Calculate my payback  →`</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Results section:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Result cards (post-calculation):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Below results:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Truck configuration (dropdown): 6-wheeler, 10-wheeler, 12-wheeler, 14-wheeler, 16-wheeler, 18-wheeler</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Monthly kilometres (number): typical 8,000-25,000 km</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Current fuel expense per month (₹): typical 60,000-1,50,000</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Current tyre expense per year (₹): typical 60,000-1,50,000</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Roadside events per year (estimate): 0, 1, 2, 3, 4+</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Alt CTA: `EMI Options  →` → `/suraksha/emi</span>
              </li>
            </ul>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <Link href="#" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">Kit price for your configuration</h3>
                <p className="text-[#A3A3A3] text-sm mt-2 font-rubik leading-relaxed">₹[amount]</p>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="#" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">Estimated monthly fuel savings</h3>
                <p className="text-[#A3A3A3] text-sm mt-2 font-rubik leading-relaxed">₹[amount]</p>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="#" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">Estimated monthly tyre life savings</h3>
                <p className="text-[#A3A3A3] text-sm mt-2 font-rubik leading-relaxed">₹[amount]</p>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="#" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">Estimated annual downtime avoidance</h3>
                <p className="text-[#A3A3A3] text-sm mt-2 font-rubik leading-relaxed">₹[amount]</p>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="#" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">**Payback period</h3>
                <p className="text-[#A3A3A3] text-sm mt-2 font-rubik leading-relaxed">[X] months**</p>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="#" className="p-6 rounded-xl bg-[#1C1F22] border border-white/10 hover:border-[#E65100]/40 transition-all group block">
                <h3 className="font-anton uppercase tracking-wide text-xl font-bold text-[#FAF7F2] group-hover:text-[#E65100] transition-colors">3-year net savings</h3>
                <p className="text-[#A3A3A3] text-sm mt-2 font-rubik leading-relaxed">₹[amount]</p>
                <div className="mt-4 font-semibold text-xs text-[#E65100] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
            <div className="pt-6">
              <Link href="/suraksha/centres" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                Nearest Centre <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Timeline visualization:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Body (Hinglish):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Yeh graph typical 10-wheeler ke liye hai. Aapke truck ke exact numbers calculator mein try kariye.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Month 0: Buy kit (₹17,500)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Month 1-9: Monthly savings accumulate</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Month 9: Payback point reached</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Month 10-36 (3-year warranty period): Pure profit</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">₹16 PER DAY. EK CUP CHAI JAISA.</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">3-year warranty ke hisaab se, Suraksha ka effective cost ₹16 per day hai — ek cup chai jitna. Aur woh bhi 9 months ke baad savings mein badal jata hai.</p>
            <div className="pt-6">
              <Link href="/suraksha/centres" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                Nearest Centre <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}