import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ChevronRight,
  Coffee,
  Check,
  X,
  CreditCard,
  Building,
  Truck,
  Sparkles,
  PhoneCall,
  MessageCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Suraksha Price · ₹17,500 for 10-Wheeler · EMI Available",
  description:
    "Suraksha kit price: ₹17,500 for 10-wheeler truck. Pricing for 6-wheeler, 10-wheeler, 12-wheeler, and 14-wheeler configurations. No hidden fees. EMI on Bajaj Finance.",
  alternates: {
    canonical: "https://treel.in/suraksha/pricing",
  },
  openGraph: {
    title: "Suraksha Price · ₹17,500 for 10-Wheeler · EMI Available",
    description:
      "Suraksha kit price: ₹17,500 for 10-wheeler truck. Pricing for 6-wheeler, 10-wheeler, 12-wheeler, and 14-wheeler configurations. No hidden fees. EMI on Bajaj Finance.",
    url: "https://treel.in/suraksha/pricing",
  },
};

const configurations = [
  {
    type: "6-wheeler",
    price: "₹10,500",
    included: "1 in-cab display + 6 tyre sensors + mounting + wiring",
    popular: false,
  },
  {
    type: "10-wheeler",
    price: "₹17,500",
    included: "1 in-cab display + 10 tyre sensors + mounting + wiring",
    popular: true,
  },
  {
    type: "12-wheeler",
    price: "₹21,000",
    included: "1 in-cab display + 12 tyre sensors + mounting + wiring",
    popular: false,
  },
  {
    type: "14-wheeler",
    price: "₹24,500",
    included: "1 in-cab display + 14 tyre sensors + mounting + wiring",
    popular: false,
  },
  {
    type: "16-wheeler",
    price: "₹28,000",
    included: "1 in-cab display + 16 tyre sensors + mounting + wiring",
    popular: false,
  },
  {
    type: "18-wheeler",
    price: "₹31,500",
    included: "1 in-cab display + 18 tyre sensors + mounting + wiring",
    popular: false,
  },
];

const includedList = [
  "Complete Suraksha kit (display + sensors + mounting + wiring)",
  "3-year warranty on tyre sensors",
  "1-year warranty on display and upgrade kit",
  "Installation guidance (video, phone support, WhatsApp)",
  "Toll-free customer support",
  "WhatsApp support",
];

const notIncludedList = [
  "Installation labour at puncture shop (typically ₹200-500, paid to installer directly)",
  "GST (applicable at checkout — will be shown transparently)",
  "Delivery charges for home delivery (free at Truck Wheels centres)",
];

export default function SurakshaPricingPage() {
  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              PRICING
            </div>

            <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95] uppercase">
              SEEDHI BAAT.<br />
              <span className="italic text-[#DC2626]">NO HIDDEN FEES.</span>
            </h1>

            <p className="text-[#DC2626] font-rubik text-xl sm:text-2xl font-bold">
              Simple pricing. No hidden fees.
            </p>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              ₹17,500 for a 10-wheeler truck. Wheel configuration ke hisaab se pricing thodi alag hoti hai. Sab kuch neeche hai — dekhiye aur nirnay lijiye.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing by Truck Configuration */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              PRICING BY TRUCK CONFIGURATION
            </h2>
            <p className="text-[#78350F] text-base mt-2 font-medium">
              Transparent per-truck pricing across standard Indian commercial configurations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configurations.map((item) => (
              <div
                key={item.type}
                className={`p-6 sm:p-8 rounded-lg border-3 transition-all relative flex flex-col justify-between space-y-6 shadow-md ${
                  item.popular
                    ? "bg-[#FFFBEB] border-[#DC2626] ring-4 ring-[#DC2626]/20"
                    : "bg-[#FFFBEB] border-[#451A03]/15 hover:border-[#DC2626]"
                }`}
              >
                {item.popular && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-[#DC2626] text-[#FEF3C7] font-rubik text-xs font-bold uppercase tracking-wider shadow-sm">
                    MOST POPULAR
                  </div>
                )}

                <div className="space-y-4">
                  <div className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase">
                    {item.type}
                  </div>

                  <div className="font-anton text-4xl sm:text-5xl font-normal text-[#DC2626]">
                    {item.price}
                  </div>

                  <p className="text-[#78350F] text-sm leading-relaxed">
                    {item.included}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#451A03]/10 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#78350F]">
                    EMI from ₹1,500/mo
                  </span>
                  <Link
                    href="/suraksha/centres"
                    className="font-rubik text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1"
                  >
                    Find Centre <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cup of Tea Maths (Payback Framing) */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-12 rounded-lg bg-[#FEF3C7] border-3 border-[#EA580C] max-w-4xl space-y-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[4px] bg-[#EA580C]/10 border border-[#EA580C]/30 flex items-center justify-center text-[#EA580C]">
                <Coffee className="w-6 h-6" />
              </div>
              <div className="font-rubik text-xs font-bold uppercase tracking-widest text-[#EA580C]">
                CUP-OF-TEA MATHS
              </div>
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl font-normal text-[#451A03] uppercase leading-tight">
              ₹16 PER DAY PER TRUCK.<br />
              <span className="italic text-[#EA580C]">EK CUP CHAI JAISA.</span>
            </h2>

            <p className="text-[#78350F] text-lg leading-relaxed font-medium">
              10-wheeler configuration ₹17,500 mein. Three-year warranty ke hisaab se calculate kariye — approximately ₹16 per day. Ek cup chai jitna.
            </p>

            <div className="font-baloo text-3xl font-extrabold text-[#DC2626]">
              पैसा वसूल
            </div>

            <div className="pt-4 border-t-2 border-[#EA580C]/20 text-xs font-semibold text-[#78350F]">
              Calculation: ₹17,500 ÷ (3 years × 365 days) ≈ ₹16 per day per truck
            </div>
          </div>
        </div>
      </section>

      {/* What's Included (No Hidden Fees) */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              SAB KUCH INCLUDED
            </h2>
            <p className="text-[#DC2626] font-rubik text-lg font-bold mt-2">
              Everything's in the price
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Included */}
            <div className="p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#10B981]/40 space-y-5 shadow-sm">
              <div className="font-anton text-xl text-[#047857] uppercase tracking-wider">
                Included in every kit
              </div>
              <ul className="space-y-3">
                {includedList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#451A03]">
                    <div className="w-5 h-5 rounded-full bg-[#10B981] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not Included */}
            <div className="p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 space-y-5 shadow-sm">
              <div className="font-anton text-xl text-[#78350F] uppercase tracking-wider">
                Separate or optional costs
              </div>
              <ul className="space-y-3">
                {notIncludedList.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-[#78350F]">
                    <div className="w-5 h-5 rounded-full bg-[#451A03]/10 text-[#451A03] flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-xs">
                      •
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              PAYMENT OPTIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 space-y-3">
              <div className="w-10 h-10 rounded-[4px] bg-[#FFFBEB] border border-[#451A03]/10 flex items-center justify-center text-[#DC2626]">
                <CreditCard className="w-5 h-5" />
              </div>
              <h3 className="font-anton text-xl uppercase text-[#451A03]">
                Option 1 · Full payment
              </h3>
              <p className="text-[#78350F] text-sm leading-relaxed">
                Cash, UPI, card, or net banking. Full payment se ₹500 ka discount milta hai.
              </p>
            </div>

            <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#DC2626]/40 space-y-3">
              <div className="w-10 h-10 rounded-[4px] bg-[#FFFBEB] border border-[#DC2626]/20 flex items-center justify-center text-[#EA580C]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="font-anton text-xl uppercase text-[#451A03]">
                Option 2 · EMI (Bajaj Finance)
              </h3>
              <p className="text-[#78350F] text-sm leading-relaxed">
                EMI starts from ~₹1,500 per month on 12-month tenure. Zero-cost EMI available at select Truck Wheels centres.
              </p>
              <div className="pt-2">
                <Link
                  href="/suraksha/emi"
                  className="font-rubik text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1"
                >
                  EMI Options dekhiye <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 space-y-3">
              <div className="w-10 h-10 rounded-[4px] bg-[#FFFBEB] border border-[#451A03]/10 flex items-center justify-center text-[#0891B2]">
                <Building className="w-5 h-5" />
              </div>
              <h3 className="font-anton text-xl uppercase text-[#451A03]">
                Option 3 · Truck financing
              </h3>
              <p className="text-[#78350F] text-sm leading-relaxed">
                Truck financing ke saath bundle karwa sakte hai. Financier se baat kariye.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Pricing for Fleet Operators */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-12 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/20 max-w-4xl space-y-6">
            <h2 className="font-anton text-3xl sm:text-4xl font-normal text-[#451A03] uppercase">
              FLEET OPERATORS KE LIYE?
            </h2>

            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
              5+ trucks ke liye bulk discount available. WhatsApp par baat kijiye ya call kariye — customized quote milega.
            </p>

            <div className="p-4 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/10 text-sm text-[#451A03] flex items-center justify-between flex-wrap gap-4">
              <span>
                10+ trucks ke fleet operators ke liye TMIP enterprise platform bhi consider kariye — bahut zyada features milte hai.
              </span>
              <Link
                href="/tmip"
                className="font-rubik font-bold text-xs text-[#DC2626] hover:underline flex items-center gap-1 flex-shrink-0"
              >
                Learn about TMIP <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton text-5xl sm:text-6xl font-normal tracking-tight text-[#FEF3C7] uppercase">
              READY TO PROTECT YOUR TRUCK?
            </h2>

            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
              Nearest Truck Wheels centre find kariye ya flexible EMI options dekhiye.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#FEF3C7] text-[#451A03] hover:bg-white active:scale-[0.98]"
              >
                Nearest Centre <ArrowRight className="w-5 h-5 text-[#DC2626]" />
              </Link>
              <Link
                href="/suraksha/emi"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all border-2 border-[#FEF3C7] text-[#FEF3C7] hover:bg-white/10 active:scale-[0.98]"
              >
                EMI Options
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
