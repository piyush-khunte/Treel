"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Phone,
  PhoneCall,
  Clock,
  Wrench,
  HelpCircle,
  ShieldCheck,
  CreditCard,
  MapPin,
  ChevronDown,
  ArrowRight,
  CheckCircle2,
  Camera,
  Truck,
  MessageSquare,
  AlertCircle
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

// WhatsApp inline SVG icon
function WhatsAppIcon({ className = "w-5 h-5 text-[#25D366]" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.953 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.15-.176.201-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.677-1.631-.928-2.233-.244-.585-.492-.505-.677-.515-.176-.01-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.43.25-.703.25-1.305.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 21.786h-.005a9.832 9.832 0 0 1-5.01-1.377l-.36-.214-3.725.976.994-3.63-.235-.374a9.858 9.858 0 0 1-1.512-5.263c0-5.446 4.435-9.879 9.886-9.879 2.639 0 5.118 1.028 6.982 2.894a9.824 9.824 0 0 1 2.891 6.985c0 5.448-4.434 9.882-9.886 9.882zm0-18.286c-4.636 0-8.406 3.768-8.406 8.404a8.38 8.38 0 0 0 1.29 4.474l.199.317-.588 2.148 2.2-.577.308.183a8.356 8.356 0 0 0 4.997 1.459h.004c4.636 0 8.406-3.769 8.406-8.405a8.344 8.344 0 0 0-2.463-5.942 8.345 8.345 0 0 0-5.947-2.461z" />
    </svg>
  );
}

// 6 Help Categories from content.md
const HELP_CATEGORIES = [
  {
    id: "installation",
    title: "INSTALLATION",
    desc: "15-minute installation guide, video, aur puncture shop guidance.",
    cta: "Installation guide →",
    href: "/suraksha/how-it-works",
    icon: Wrench,
    accent: "text-[#DC2626]",
    bg: "bg-[#DC2626]/10"
  },
  {
    id: "product",
    title: "PRODUCT INFO",
    desc: "How Suraksha works, specifications, compatibility.",
    cta: "Product details →",
    href: "/suraksha/product",
    icon: HelpCircle,
    accent: "text-[#EA580C]",
    bg: "bg-[#EA580C]/10"
  },
  {
    id: "warranty",
    title: "WARRANTY",
    desc: "3-year sensor warranty. Claim submission process.",
    cta: "Warranty details →",
    href: "#warranty-claim",
    icon: ShieldCheck,
    accent: "text-[#0891B2]",
    bg: "bg-[#0891B2]/10"
  },
  {
    id: "emi",
    title: "EMI & PAYMENT",
    desc: "Bajaj Finance EMI, payment options, billing questions.",
    cta: "EMI info →",
    href: "/suraksha/emi",
    icon: CreditCard,
    accent: "text-[#DC2626]",
    bg: "bg-[#DC2626]/10"
  },
  {
    id: "centres",
    title: "FIND CENTRE",
    desc: "Truck Wheels centres, dealers, aur puncture shops.",
    cta: "Find nearest centre →",
    href: "/suraksha/centres",
    icon: MapPin,
    accent: "text-[#EA580C]",
    bg: "bg-[#EA580C]/10"
  },
  {
    id: "faqs",
    title: "COMMON QUESTIONS",
    desc: "30+ common questions aur answers.",
    cta: "All FAQs →",
    href: "/suraksha/faqs",
    icon: MessageSquare,
    accent: "text-[#0891B2]",
    bg: "bg-[#0891B2]/10"
  }
];

// Top 6 Driver Support FAQs from content.md
const FAQS = [
  {
    id: "faq-1",
    question: "Support kaise contact karein?",
    answer:
      "3 aasaan tareeke hain: WhatsApp +91 91120 00174 (24/7 automated + business hours human agent), Toll-free 1800 833 0233 (Monday to Friday, 8:00 AM - 8:00 PM IST), aur /suraksha/contact par direct form bharke callback request kar sakte hain."
  },
  {
    id: "faq-2",
    question: "Support kis language mein milta hai?",
    answer:
      "Humari driver support team Hindi aur English ke alawa select regional languages provide karti hai: Marathi, Gujarati, Tamil, Kannada, Telugu, Malayalam aur Bengali. Call ya WhatsApp karte waqt aap apni preferred boli mein baat kar sakte hain."
  },
  {
    id: "faq-3",
    question: "Kya installation ke liye video guide hai?",
    answer:
      "Haan! Complete step-by-step installation video Hindi mein narrated hai. Aap /suraksha/videos par jaakar 15-minute cabin display mounting aur tyre sensor fitment ka detailed practical video dekh sakte hain."
  },
  {
    id: "faq-4",
    question: "Problem aaye toh kaha jaana chahiye?",
    answer:
      "Aapke area ke kisi bhi official Truck Wheels centre par direct physical inspection aur support milti hai. Highway par emergency guidance ke liye WhatsApp (+91 91120 00174) par photo ya query bhejiye, humari team turant assistance degi."
  },
  {
    id: "faq-5",
    question: "Sensor ya display mein problem aaye toh warranty claim kaise karein?",
    answer:
      "Claim process bilkul simple aur fast hai: WhatsApp par (1) Defective unit ki photo jismein serial number saaf dikhe, (2) Truck registration number, aur (3) Problem ka chhota description bhejiye. Hum turant verify karke nearest centre se replacement initiate karenge."
  },
  {
    id: "faq-6",
    question: "Display screen chalna band ho jaye toh kya karein?",
    answer:
      "Pehle 12V/24V power cord aur dashboard socket check karein. Agar fuse intact hai aur screen fir bhi nahi jal rahi, toh toll-free 1800 833 0233 par call karein ya WhatsApp par connect karein. Hum free diagnostic aur quick replacement support provide karenge."
  }
];

export default function SurakshaSupportPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* 1. Support Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Support" }
              ]}
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <HelpCircle className="w-3.5 h-3.5" />
              SUPPORT
            </div>

            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              HELP CHAHIYE?<br />
              <span className="italic text-[#0891B2]">HUM HAI YAHAN.</span>
            </h1>

            <div className="space-y-2 max-w-3xl">
              <p className="text-xl sm:text-2xl font-anton text-[#EA580C] uppercase tracking-wide">
                Need help? We&apos;re here.
              </p>
              <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium">
                Suraksha ka support driver-first hai. Toll-free, WhatsApp, aur FAQs. Jo aap ke liye convenient ho, wahi use kariye.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Contact Options (Three Prominent Support Cards) */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626]">
              DIRECT CHANNELS
            </span>
            <h2 className="font-anton text-3xl sm:text-4xl text-[#451A03] uppercase">
              CHOOSE YOUR SUPPORT CHANNEL
            </h2>
            <p className="text-[#78350F] text-base font-medium">
              Call toll-free, message us on WhatsApp, or request a fast callback in your preferred language.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {/* CARD 1 — TOLL-FREE (Largest / Primary Focus) */}
            <div className="bg-[#FFFBEB] border-3 border-[#DC2626] rounded-xl p-6 sm:p-8 shadow-lg flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#DC2626] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                TOLL-FREE
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>

                <div>
                  <div className="font-rubik text-xs font-bold uppercase tracking-wider text-[#78350F]">
                    CALL TOLL-FREE
                  </div>
                  <div className="font-anton text-2xl sm:text-3xl text-[#451A03] uppercase mt-0.5">
                    TOLL-FREE
                  </div>
                </div>

                <a
                  href="tel:18008330233"
                  className="block font-anton text-3xl sm:text-4xl text-[#DC2626] hover:underline tracking-wider"
                >
                  1800 833 0233
                </a>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#78350F]">
                  <Clock className="w-4 h-4 text-[#DC2626] shrink-0" />
                  <span>Monday to Friday · 8:00 AM - 8:00 PM IST</span>
                </div>

                <p className="text-xs text-[#78350F] leading-relaxed pt-2 border-t border-[#451A03]/10 font-medium">
                  Toll-free India-wide. Regional language support available.
                </p>
              </div>

              <a
                href="tel:18008330233"
                className="w-full py-3.5 px-6 rounded-[4px] bg-[#DC2626] text-white font-rubik font-bold text-xs uppercase tracking-wider hover:bg-[#B91C1C] transition-all shadow-md text-center block"
              >
                Call Now
              </a>
            </div>

            {/* CARD 2 — WHATSAPP (Fastest Response) */}
            <div className="bg-[#FFFBEB] border-2 border-[#0891B2] rounded-xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#0891B2] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                FASTEST
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 text-[#25D366] flex items-center justify-center">
                  <WhatsAppIcon className="w-6 h-6 text-[#25D366]" />
                </div>

                <div>
                  <div className="font-rubik text-xs font-bold uppercase tracking-wider text-[#78350F]">
                    CHAT SUPPORT
                  </div>
                  <div className="font-anton text-2xl sm:text-3xl text-[#451A03] uppercase mt-0.5">
                    WHATSAPP
                  </div>
                </div>

                <Link
                  href="/suraksha/whatsapp"
                  className="block font-anton text-3xl sm:text-4xl text-[#0891B2] hover:underline tracking-wider"
                >
                  +91 91120 00174
                </Link>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#78350F]">
                  <Clock className="w-4 h-4 text-[#0891B2] shrink-0" />
                  <span>24/7 automated + business hours human</span>
                </div>

                <p className="text-xs text-[#78350F] leading-relaxed pt-2 border-t border-[#451A03]/10 font-medium">
                  Fastest response. Photos aur videos bhi bhej sakte hai.
                </p>
              </div>

              <Link
                href="/suraksha/whatsapp"
                className="w-full py-3.5 px-6 rounded-[4px] bg-[#0891B2] text-white font-rubik font-bold text-xs uppercase tracking-wider hover:bg-[#0E7490] transition-all shadow-md text-center block"
              >
                Chat on WhatsApp
              </Link>
            </div>

            {/* CARD 3 — CALLBACK (Convenient) */}
            <div className="bg-[#FFFBEB] border-2 border-[#EA580C] rounded-xl p-6 sm:p-8 shadow-md flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#EA580C] text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-bl-lg">
                WE CALL YOU
              </div>

              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-[#EA580C]/10 text-[#EA580C] flex items-center justify-center">
                  <PhoneCall className="w-6 h-6" />
                </div>

                <div>
                  <div className="font-rubik text-xs font-bold uppercase tracking-wider text-[#78350F]">
                    LEAVE YOUR DETAILS
                  </div>
                  <div className="font-anton text-2xl sm:text-3xl text-[#451A03] uppercase mt-0.5">
                    CALLBACK
                  </div>
                </div>

                <p className="text-base sm:text-lg text-[#451A03] font-medium leading-snug">
                  Hum aap ko call kar sakte hai. Preferred time aur language mention kariye.
                </p>

                <div className="flex items-center gap-2 text-xs font-semibold text-[#78350F]">
                  <Clock className="w-4 h-4 text-[#EA580C] shrink-0" />
                  <span>Response within 2 business hours</span>
                </div>

                <p className="text-xs text-[#78350F] leading-relaxed pt-2 border-t border-[#451A03]/10 font-medium">
                  Hindi, English, Marathi, Gujarati, Tamil, Kannada, Telugu, Bengali.
                </p>
              </div>

              <Link
                href="/suraksha/callback"
                className="w-full py-3.5 px-6 rounded-[4px] bg-[#EA580C] text-white font-rubik font-bold text-xs uppercase tracking-wider hover:bg-[#C2410C] transition-all shadow-md text-center block"
              >
                Request Callback
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Help Categories (6 Defined by content.md) */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0891B2]">
              SELF-SERVICE & GUIDES
            </span>
            <h2 className="font-anton text-3xl sm:text-4xl text-[#451A03] uppercase">
              EXPLORE HELP BY TOPIC
            </h2>
            <p className="text-[#78350F] text-base font-medium">
              Find technical documentation, 15-minute installation guides, EMI terms, or authorized fitment hubs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HELP_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className="p-6 sm:p-7 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-3">
                    <div className={`w-11 h-11 rounded-lg ${cat.bg} ${cat.accent} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="font-anton text-2xl text-[#451A03] uppercase tracking-wide">
                      {cat.title}
                    </h3>

                    <p className="text-[#78350F] text-sm leading-relaxed font-medium">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#451A03]/10">
                    <Link
                      href={cat.href}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#DC2626] hover:text-[#B91C1C] transition-colors"
                    >
                      {cat.cta}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Quick FAQ Accordion */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#DC2626]">
                QUICK ANSWERS
              </span>
              <h2 className="font-anton text-3xl sm:text-4xl text-[#451A03] uppercase">
                COMMON QUESTIONS
              </h2>
              <p className="text-[#78350F] text-base font-medium">
                Frequently asked questions from truck drivers, mechanics, and fleet owners.
              </p>
            </div>

            {/* Accordion Component */}
            <div className="space-y-4">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={faq.id}
                    className="border-2 border-[#451A03]/15 rounded-lg bg-[#FFFBEB] overflow-hidden transition-all shadow-sm"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${faq.id}`}
                      id={`faq-btn-${faq.id}`}
                      className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 font-anton text-lg sm:text-xl text-[#451A03] hover:text-[#DC2626] transition-colors cursor-pointer select-none"
                    >
                      <span className="leading-snug">{faq.question}</span>
                      <ChevronDown
                        className={`w-5 h-5 text-[#DC2626] shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div
                        id={`faq-answer-${faq.id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${faq.id}`}
                        className="px-6 pb-6 pt-1 text-[#78350F] text-sm sm:text-base leading-relaxed font-rubik border-t border-[#451A03]/10 font-medium"
                      >
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="text-center pt-4">
              <Link
                href="/suraksha/faqs"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] bg-[#DC2626] text-white font-rubik font-bold text-xs uppercase tracking-wider hover:bg-[#B91C1C] transition-all shadow-md"
              >
                All FAQs padhiye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Warranty Claim Quick Start */}
      <section 
        id="warranty-claim" 
        className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB] scroll-mt-12"
      >
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#0891B2] bg-[#0891B2]/10 text-[#0891B2] font-rubik text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                HASSLE-FREE REPLACEMENT
              </div>
              <h2 className="font-anton text-3xl sm:text-4xl text-[#451A03] uppercase">
                WARRANTY CLAIM
              </h2>
              <p className="text-[#451A03] text-base sm:text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                Sensor ya display mein problem? WhatsApp par yeh 3 cheezein bhejiye aur hum turant help karenge:
              </p>
            </div>

            {/* 3 Step Tiles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#DC2626] text-white font-anton text-lg flex items-center justify-center">
                  1
                </div>
                <h3 className="font-anton text-xl text-[#451A03] uppercase">
                  Defective Unit Photo
                </h3>
                <p className="text-[#78350F] text-sm leading-relaxed font-medium">
                  Photo of the defective sensor/display with serial number visible.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#EA580C] text-white font-anton text-lg flex items-center justify-center">
                  2
                </div>
                <h3 className="font-anton text-xl text-[#451A03] uppercase">
                  Truck Number
                </h3>
                <p className="text-[#78350F] text-sm leading-relaxed font-medium">
                  Truck registration number taaki aapki warranty validity system mein check ho sake.
                </p>
              </div>

              <div className="p-6 rounded-xl bg-[#FEF3C7] border-2 border-[#451A03]/15 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#0891B2] text-white font-anton text-lg flex items-center justify-center">
                  3
                </div>
                <h3 className="font-anton text-xl text-[#451A03] uppercase">
                  Problem Description
                </h3>
                <p className="text-[#78350F] text-sm leading-relaxed font-medium">
                  Description of the problem — Hindi/English/regional, jo comfortable ho.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[4px] bg-[#0891B2] text-white font-rubik font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#0E7490] transition-all shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                WhatsApp par claim submit kariye →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final Support CTA Band */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="font-anton text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-white leading-tight">
              PROBLEM SOLVED IN MINUTES.
            </h2>
            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium">
              WhatsApp par baat kijiye — fastest response.
            </p>
            <div className="pt-2">
              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[4px] bg-[#FFFBEB] text-[#451A03] font-rubik font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all shadow-xl"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                WhatsApp Kariye →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}