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
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

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
    desc: "15-minute installation guides, step-by-step videos, and puncture shop fitment instructions.",
    cta: "Installation guide →",
    href: "/suraksha/how-it-works",
    icon: Wrench,
    accent: "text-[#DC2626]",
    bg: "bg-[#DC2626]/10"
  },
  {
    id: "product",
    title: "PRODUCT INFO",
    desc: "How Suraksha works, technical specifications, vehicle compatibility.",
    cta: "Product details →",
    href: "/suraksha/product",
    icon: HelpCircle,
    accent: "text-[#EA580C]",
    bg: "bg-[#EA580C]/10"
  },
  {
    id: "warranty",
    title: "WARRANTY",
    desc: "3-year replacement warranty. Rapid claim submission process.",
    cta: "Warranty details →",
    href: "#warranty-claim",
    icon: ShieldCheck,
    accent: "text-[#0891B2]",
    bg: "bg-[#0891B2]/10"
  },
  {
    id: "emi",
    title: "EMI & PAYMENT",
    desc: "Bajaj Finance financing plans, payment options, zero-cost EMI terms.",
    cta: "EMI info →",
    href: "/suraksha/emi",
    icon: CreditCard,
    accent: "text-[#DC2626]",
    bg: "bg-[#DC2626]/10"
  },
  {
    id: "centres",
    title: "FIND CENTRE",
    desc: "Find authorized Truck Wheels centres, dealers, and roadside fitment points.",
    cta: "Find nearest centre →",
    href: "/suraksha/centres",
    icon: MapPin,
    accent: "text-[#EA580C]",
    bg: "bg-[#EA580C]/10"
  },
  {
    id: "faqs",
    title: "COMMON QUESTIONS",
    desc: "30+ common driver questions and detailed answers.",
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
    question: "How do I contact customer support?",
    answer:
      "There are three easy options: WhatsApp us at +91 91120 00174 (24/7 automated assistance with live specialist support during business hours), Call our toll-free helpline at 1800 833 0233 (Monday to Friday, 8:00 AM - 8:00 PM IST), or request a callback directly through our contact page."
  },
  {
    id: "faq-2",
    question: "What languages is driver support available in?",
    answer:
      "Our customer support team assists in English, Hindi, Marathi, Gujarati, Tamil, Kannada, Telugu, Malayalam, and Bengali. Speak or text in your preferred language anytime you call or message."
  },
  {
    id: "faq-3",
    question: "Is there a step-by-step video installation guide?",
    answer:
      "Yes. Comprehensive step-by-step video demonstrations are available. Visit our videos page to watch complete 15-minute cabin display mounting and tyre sensor installation guides."
  },
  {
    id: "faq-4",
    question: "Where can I get in-person technical assistance?",
    answer:
      "Visit any of our 400+ authorized JK Truck Wheels centres across major highway corridors for direct physical inspection. For highway emergency support, share a photo on WhatsApp (+91 91120 00174) for immediate guidance."
  },
  {
    id: "faq-5",
    question: "How do I submit a warranty claim for a sensor or display?",
    answer:
      "The claim process is straightforward and fast: Message our WhatsApp helpline with (1) A photo of the defective unit showing its serial number, (2) Your truck registration number, and (3) A brief description of the issue. We will verify your warranty and dispatch a replacement promptly."
  },
  {
    id: "faq-6",
    question: "What should I do if the cabin display does not turn on?",
    answer:
      "First check the 12V/24V power cord and dashboard socket connection. If power is confirmed and the display still does not illuminate, call our toll-free helpline at 1800 833 0233 or message WhatsApp support for quick diagnostic assistance and replacement."
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
              NEED HELP?<br />
              <span className="italic text-[#0891B2]">WE'RE HERE.</span>
            </h1>

            <div className="space-y-2 max-w-3xl">
              <SurakshaRotator
              page="5.16"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide"
            >
              कॉल कीजिए, व्हाट्सऐप कीजिए या जवाब पढ़िए।
            </SurakshaRotator>
              <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium">
                Suraksha support is built for drivers. Call toll-free, chat on WhatsApp or browse the FAQs below. Choose whatever works best for you.
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
                  Fastest response. Send photos and videos directly for instant help.
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
                  We will call you back. Mention your convenient time and preferred language.
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
                Browse All FAQs <ArrowRight className="w-4 h-4" />
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
                Experiencing an issue with a sensor or display? Send these 3 details on WhatsApp for immediate replacement assistance:
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
                  Truck registration number so our team can verify your warranty validity in the system.
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
                  Brief description of the problem in English, Hindi, or your preferred regional language.
                </p>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[4px] bg-[#0891B2] text-white font-rubik font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-[#0E7490] transition-all shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                Submit Warranty Claim on WhatsApp →
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
              Chat on WhatsApp for our fastest response.
            </p>
            <div className="pt-2">
              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[4px] bg-[#FFFBEB] text-[#451A03] font-rubik font-bold text-xs sm:text-sm uppercase tracking-wider hover:bg-white transition-all shadow-xl"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                Chat on WhatsApp →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}