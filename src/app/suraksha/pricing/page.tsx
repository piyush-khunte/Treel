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
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

import { PricingBuyButton } from "./pricing-buy-button";

export const metadata: Metadata = {
  title: "Suraksha Kit · Configurations & Pricing · ₹1,700/Tyre",
  description:
    "Suraksha safety kit pricing at ₹1,700 per tyre for 6-wheeler, 10-wheeler, 12-wheeler, 14-wheeler, 16-wheeler, and 18-wheeler trucks. No hidden fees. 3-year warranty included.",
  alternates: {
    canonical: "https://treel.in/suraksha/pricing",
  },
  openGraph: {
    title: "Suraksha Kit · Configurations & Pricing · ₹1,700/Tyre",
    description:
      "Suraksha safety kit pricing at ₹1,700 per tyre for 6-wheeler, 10-wheeler, 12-wheeler, 14-wheeler, 16-wheeler, and 18-wheeler trucks. No hidden fees. 3-year warranty included.",
    url: "https://treel.in/suraksha/pricing",
  },
};

const configurations = [
  {
    type: "6-wheeler",
    tyres: 6,
    price: 10200,
    axleSetup: "2 Axles · Steer & Drive",
    included: "1 in-cab display + 6 tyre sensors + mounting kit + wiring harness",
    popular: false,
  },
  {
    type: "10-wheeler",
    tyres: 10,
    price: 17000,
    axleSetup: "3 Axles · Multi-Axle Haulage",
    included: "1 in-cab display + 10 tyre sensors + mounting kit + wiring harness",
    popular: true,
  },
  {
    type: "12-wheeler",
    tyres: 12,
    price: 20400,
    axleSetup: "4 Axles · Heavy Commercial",
    included: "1 in-cab display + 12 tyre sensors + mounting kit + wiring harness",
    popular: false,
  },
  {
    type: "14-wheeler",
    tyres: 14,
    price: 23800,
    axleSetup: "4-5 Axles · Multi-Axle Goods",
    included: "1 in-cab display + 14 tyre sensors + mounting kit + wiring harness",
    popular: false,
  },
  {
    type: "16-wheeler",
    tyres: 16,
    price: 27200,
    axleSetup: "5 Axles · Heavy Haulage",
    included: "1 in-cab display + 16 tyre sensors + mounting kit + wiring harness",
    popular: false,
  },
  {
    type: "18-wheeler",
    tyres: 18,
    price: 30600,
    axleSetup: "Prime Mover + Multi-Axle Trailer",
    included: "1 in-cab display + 18 tyre sensors + mounting kit + wiring harness",
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
  "Installation labour at puncture shop (paid to installer directly)",
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
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Pricing" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <Truck className="w-3.5 h-3.5" />
              PRICING
            </div>

            <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95] uppercase">
              PRICED FOR YOUR TRUCK.<br />
              <span className="italic text-[#DC2626]">NO HIDDEN FEES.</span>
            </h1>

            <SurakshaRotator
              page="5.4"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide"
            >
              आपके ट्रक के पहियों के हिसाब से सही कीमत।
            </SurakshaRotator>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Commercial vehicle safety kit priced transparently at <strong>₹1,700 per tyre</strong>. Select your truck configuration below to proceed directly to checkout. EMI options and fitment centre pickup available nationwide.
            </p>
          </div>
        </div>
      </section>

      {/* Configurations by Truck Setup */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              CONFIGURATIONS BY TRUCK SETUP
            </h2>
            <p className="text-[#78350F] text-base mt-2 font-medium">
              Standard Indian commercial vehicle kit options priced at ₹1,700 per tyre.
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
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase">
                      {item.type}
                    </div>
                    <div className="text-right">
                      <div className="font-anton text-2xl text-[#DC2626]">
                        ₹{item.price.toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] font-semibold text-[#78350F]">
                        (₹1,700 × {item.tyres} tyres)
                      </div>
                    </div>
                  </div>

                  <div className="inline-block px-3 py-1 rounded bg-[#FEF3C7] border border-[#451A03]/15 text-[#78350F] font-rubik text-xs font-bold">
                    {item.axleSetup}
                  </div>

                  <p className="text-[#78350F] text-sm leading-relaxed">
                    {item.included}
                  </p>

                  <div className="space-y-1.5 pt-2 text-xs font-semibold text-[#451A03]">
                    <div className="flex items-center gap-2 text-[#047857]">
                      <Check className="w-3.5 h-3.5" /> 3-Year Sensor Warranty
                    </div>
                    <div className="flex items-center gap-2 text-[#047857]">
                      <Check className="w-3.5 h-3.5" /> Zero Monthly Subscription
                    </div>
                    <div className="flex items-center gap-2 text-[#047857]">
                      <Check className="w-3.5 h-3.5" /> Zero-Downpayment EMI Available
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#451A03]/10 flex items-center justify-between gap-3">
                  <PricingBuyButton tyres={item.tyres} type={item.type} />
                  <Link
                    href="/suraksha/centres"
                    className="font-rubik text-xs font-bold text-[#78350F] hover:text-[#DC2626] hover:underline flex items-center gap-1"
                  >
                    Find location <ChevronRight className="w-3.5 h-3.5" />
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
              9 MONTHS PAYBACK.<br />
              <span className="italic text-[#EA580C]">LESS THAN A DAILY CUP OF TEA.</span>
            </h2>

            <p className="text-[#78350F] text-lg leading-relaxed font-medium">
              With a three-year sensor warranty and continuous fuel savings, Suraksha pays for itself in the first 9–12 months. Drive with complete confidence on every highway.
            </p>

            <div className="font-anton text-2xl uppercase tracking-wider text-[#DC2626]">
              FULL VALUE RECOVERY
            </div>

            <div className="pt-4 border-t-2 border-[#EA580C]/20 text-xs font-semibold text-[#78350F]">
              0.5–0.6% diesel savings + 5–7% extended tyre life + 100% roadside blowout prevention
            </div>
          </div>
        </div>
      </section>

      {/* What's Included (No Hidden Fees) */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              EVERYTHING INCLUDED
            </h2>
            <p className="text-[#DC2626] font-rubik text-lg font-bold mt-2">
              Everything included in the kit
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
                Cash, UPI, card, or net banking. Instant bill and warranty activation at Truck Wheels centres.
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
                Flexible 3, 6, 9, 12, 18, 24-month tenures. Zero-cost EMI options available at select Truck Wheels centres.
              </p>
              <div className="pt-2">
                <Link
                  href="/suraksha/emi"
                  className="font-rubik text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1"
                >
                  Explore EMI Plans <ArrowRight className="w-3.5 h-3.5" />
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
                Can be bundled directly with your commercial truck loan. Consult your vehicle financier.
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
              FOR FLEET OPERATORS
            </h2>

            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
              Fleet pricing and dedicated deployment support are available for operators with 5 or more trucks. Contact our team via WhatsApp or phone for a tailored quote.
            </p>

            <div className="p-4 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/10 text-sm text-[#451A03] flex items-center justify-between flex-wrap gap-4">
              <span>
                For fleets with 10 or more commercial vehicles, explore our TMIP enterprise mobility intelligence platform.
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
              Find your nearest Truck Wheels centre or explore flexible EMI plans.
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