import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Contact Suraksha  \u00b7  Toll-Free, WhatsApp, or Form",
  description: "Contact Suraksha support. Toll-free 1800 833 0233. WhatsApp 91120 00174. Or fill out the contact form for a callback.",
  alternates: {
    canonical: "https://treel.in/suraksha/contact",
  },
  openGraph: {
    title: "Contact Suraksha  \u00b7  Toll-Free, WhatsApp, or Form",
    description: "Contact Suraksha support. Toll-free 1800 833 0233. WhatsApp 91120 00174. Or fill out the contact form for a callback.",
    url: "https://treel.in/suraksha/contact",
  },
};

export default function SurakshaContactPage() {
  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      <section className="relative overflow-hidden pt-16 pb-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Contact & Inquiries" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-3.5 h-3.5" />
              CONTACT
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              HUM SE <span className="italic text-[#DC2626]">BAAT KIJIYE.</span>
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl font-medium">
              Suraksha ke baare mein koi bhi baat — product query, pricing, installation, warranty, ya just general question. Neeche kisi bhi channel se contact kijiye.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-bold">Two large contact tiles:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Tile 1 · Toll-Free:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Tile 2 · WhatsApp:</p>
            <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
              <ul className="space-y-3">
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: Phone (large)</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Label: TOLL-FREE</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Number: <code className="font-mono bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#451A03]/20 text-[#451A03] font-bold text-xl">1800 833 0233</code> (very large text)</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Sub-text: Monday to Friday · 9 AM to 6 PM IST</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Action: <a href="tel:18008330233" className="text-[#DC2626] font-bold underline">tel:18008330233</a></span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Icon: WhatsApp logo (large)</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Label: WHATSAPP</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Number: <code className="font-mono bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#451A03]/20 text-[#451A03] font-bold text-xl">+91 91120 00174</code></span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Sub-text: 24/7 automated + business hours human</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Action: WhatsApp deep-link</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl lg:text-4xl text-[#451A03]">FORM BHARIYE — HUM CALL KARENGE</h2>
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Form fields:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik"><strong>Submit button:</strong> <code className="font-mono bg-[#FEF3C7] px-2 py-0.5 rounded border border-[#451A03]/20 font-bold">Send  →</code></p>
            <div className="bg-[#FEF3C7] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
              <ul className="space-y-3">
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Full name (required)</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Mobile number (required, 10-digit)</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>City (required)</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Truck configuration (optional, dropdown): 6-wheeler, 10-wheeler, 12-wheeler, etc.</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Preferred language (dropdown): Hindi, English, Marathi, Gujarati, Tamil, Kannada, Telugu, Malayalam, Bengali, Oriya</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>What can we help with? (dropdown):</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>General inquiry</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Product information</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Pricing and payment</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>EMI application</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Installation help</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Warranty claim</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Centre location</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Other</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Message (required, textarea, max 1000 chars, placeholder: "Aap ka sawaal ya baat jo aapko puchni hai...")</span>
                </li>
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                  <span>Consent checkbox: Mai aap ke saath contact kar sakte hai iski permission deta hoon. Privacy policy padhi. (Required)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl lg:text-4xl text-[#451A03]">DHANYAWAAD! MESSAGE MIL GAYA.</h2>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">Aap ka message hum tak pahunch gaya. 4 business hours mein humari team aap ko call ya WhatsApp karegi. Urgent ho toh direct 1800 833 0233 par call kariye.</p>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-medium">Aapke area ka nearest Suraksha centre find karne ke liye:</p>
            <div className="pt-2">
              <Link href="/suraksha/centres" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#DC2626] text-white hover:bg-[#B91C1C]">
                Nearest Centre <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-medium">Sabse fastest — WhatsApp par direct message kariye.</p>
            <div className="pt-2">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#25D366] text-white hover:bg-[#1EBE5D]">
                WhatsApp Kariye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}