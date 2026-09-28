"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WhatsAppCircularIcon } from "@/components/ui/whatsapp-circular-icon";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

export default function SurakshaFAQsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const faqs = [
    {
      cat: "Installation",
      q: "How is the Suraksha kit installed and how long does it take?",
      a: "Installing Suraksha is simple and takes just 15 minutes across 3 steps: (1) Mount the in-cab display onto your dashboard and connect power via the 12V/24V socket, (2) Fit one smart sensor onto each tyre valve stem using the anti-theft locking nut, and (3) The display automatically pairs with sensors and instantly illuminates tyre pressures. No complex wiring or vehicle modifications required."
    },
    {
      cat: "Installation",
      q: "Do I need to visit a certified technician or dealership?",
      a: "No. Any roadside puncture shop or tyre technician can fit it in 15 minutes. Every kit includes an illustrated quick-start guide and video QR code."
    },
    {
      cat: "Pricing",
      q: "What configurations does Suraksha support and what is included in the kit?",
      a: "Suraksha is available for all commercial configurations: 6-wheeler, 10-wheeler, 12-wheeler, 14-wheeler, 16-wheeler, and 18-wheeler trailers. Every kit includes a solar-assisted in-cab display, high-precision wheel sensors, anti-theft mounting hardware, official JK Tyre warranty, and 24x7 helpline access. Contact your nearest Truck Wheels centre or chat on WhatsApp for current pricing and fleet offers."
    },
    {
      cat: "Pricing",
      q: "Is there any monthly subscription, software fee, or recharge?",
      a: "None at all. Suraksha is a zero-subscription product. Once you purchase the kit, there are zero monthly software fees, SIM card charges, or recurring renewals."
    },
    {
      cat: "EMI",
      q: "Is easy monthly EMI financing available on Suraksha?",
      a: "Yes. Flexible EMI financing is available through Bajaj Finance with flexible 3, 6, 9, 12, 18, and 24-month tenures—including zero-cost EMI on selected 9-month plans. Instant approval is available with just your Aadhaar and truck RC."
    },
    {
      cat: "Warranty",
      q: "How long is the warranty and what is the sensor battery life?",
      a: "Suraksha sensors feature a 5-year internal battery life. The entire hardware kit is backed by a 3-year official JK Tyre replacement warranty serviceable at any Truck Wheels centre across India."
    },
    {
      cat: "Product",
      q: "How does Suraksha warn drivers before a blowout or puncture?",
      a: "Sensors continuously monitor micro-pressure drop and abnormal internal temperature. If a tyre experiences a slow leak, rapid deflation, or dangerous overheating, the cabin display immediately triggers an audible alarm and flashes red so you can stop safely before a blowout occurs."
    },
    {
      cat: "Support",
      q: "How do I reach emergency roadside assistance or support?",
      a: "Call our 24x7 toll-free helpline at 1800 258 4567 or message us directly on WhatsApp. Assistance is available in Hindi, Punjabi, Tamil, Telugu, Marathi, and English."
    }
  ];

  const filteredFaqs = faqs.filter(
    (f) => selectedCategory === "All" || f.cat === selectedCategory
  );

  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "FAQs" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              FAQS
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#DC2626] leading-[1.05]">
              YOUR QUESTIONS. OUR ANSWERS.
            </h1>
            <SurakshaRotator
              page="5.15"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-2"
            >
              सुरक्षा के बारे में सब कुछ, आसान भाषा में।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Answers to the most common questions about installation, pricing, EMI, warranty and support. Filter by category below, or chat with us on WhatsApp if you don't find your answer.
            </p>
          </div>
        </div>
      </section>

      {/* Categories & Filter */}
      <section className="py-12 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="flex flex-wrap gap-3 items-center text-xs font-bold uppercase tracking-wider">
            {["All", "Installation", "Pricing", "EMI", "Warranty", "Product", "Support"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-[4px] font-rubik text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#DC2626] text-white shadow-sm border-2 border-[#DC2626]"
                    : "bg-[#FEF3C7] text-[#78350F] border-2 border-[#451A03]/20 hover:bg-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion FAQ Section */}
      <section className="py-20 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-4">
            {filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-lg text-[#451A03] hover:text-[#DC2626] transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#DC2626] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {openIdx === idx ? (
                    <ChevronUp className="w-5 h-5 text-[#DC2626] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[#78350F] shrink-0" />
                  )}
                </button>

                {openIdx === idx && (
                  <div className="px-6 pb-6 pt-2 text-[#78350F] text-base leading-relaxed pl-14 border-t-2 border-[#451A03]/10">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="max-w-3xl pt-12">
            <div className="bg-[#451A03] text-[#FEF3C7] p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border-2 border-[#451A03]/20">
              <div>
                <h3 className="font-anton text-2xl uppercase tracking-normal text-white">
                  STILL HAVE QUESTIONS?
                </h3>
                <p className="text-xs text-[#FEF3C7]/80 mt-1 font-rubik">
                  Speak with our Suraksha support team: 1800 258 4567 (Toll-Free)
                </p>
              </div>

              <WhatsAppCircularIcon
                href="/suraksha/whatsapp"
                size="md"
                title="Chat on WhatsApp"
                ariaLabel="Chat on WhatsApp"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}