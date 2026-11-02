"use client";

import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { WhatsAppCircularIcon } from "@/components/ui/whatsapp-circular-icon";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";
import { SURAKSHA_FAQS } from "./faqs-data";

export default function SurakshaFAQsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredFaqs = SURAKSHA_FAQS.filter(
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
              Your questions. Our answers.
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
                type="button"
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
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg overflow-hidden shadow-sm transition-all"
                >
                  <button
                    id={`faq-btn-${idx}`}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-ans-${idx}`}
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-lg text-[#451A03] hover:text-[#DC2626] transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#DC2626] shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#DC2626] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#78350F] shrink-0" />
                    )}
                  </button>

                  <div
                    id={`faq-ans-${idx}`}
                    role="region"
                    aria-labelledby={`faq-btn-${idx}`}
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-2 text-[#78350F] text-base leading-relaxed pl-14 border-t-2 border-[#451A03]/10">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="max-w-3xl pt-12">
            <div className="bg-[#451A03] text-[#FEF3C7] p-8 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border-2 border-[#451A03]/20">
              <div>
                <h3 className="font-anton text-2xl uppercase tracking-normal text-white">
                  Still have questions?
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
