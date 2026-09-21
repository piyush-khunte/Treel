"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function SurakshaFAQsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const faqs = [
    {
      cat: "Installation",
      q: "Suraksha kit install कैसे होती है और कितना time लगता है?",
      a: "Suraksha install करना बहुत आसान है। 15 minute में 3 steps में install हो जाता है: (1) In-cab display cabin में 12V/24V socket में mount करो, (2) हर tyre के valve stem पे एक smart sensor लगाओ, (3) Display auto-detect करेगा और tyre pressure तुरंत screen पे दिखा देगा। कोई wiring cut करने की ज़रूरत नहीं होती।"
    },
    {
      cat: "Installation",
      q: "क्या किसी certified mechanic के पास जाना पड़ेगा?",
      a: "नहीं। किसी भी highway puncture shop वाला या driver खुद 15 minute में fit कर लेता है। Kit के अंदर एक page का vernacular manual और video QR code आता है।"
    },
    {
      cat: "Pricing",
      q: "Suraksha kit की क्या कीमत है?",
      a: "Standard 10-wheeler truck के लिए ₹17,500 है। 6-wheeler के लिए ₹10,500, 12-wheeler के लिए ₹21,000, 14-wheeler के लिए ₹24,500, और 18-wheeler trailer के लिए ₹31,500। Price में display, sensors, mounting kit, official JK Tyre warranty, और helpline support सब शामिल है।"
    },
    {
      cat: "Pricing",
      q: "क्या कोई monthly subscription या renewal fee है?",
      a: "बिल्कुल नहीं! Suraksha zero-subscription product है। एक बार kit खरीद ली, उसके बाद कोई monthly app fee या SIM recharge charge नहीं होता।"
    },
    {
      cat: "EMI",
      q: "क्या Suraksha पर easy EMI मिल सकती है?",
      a: "हाँ। Bajaj Finance के साथ zero-downpayment easy EMI available है। Monthly instalment ₹1,199/month से शुरू होती है। सिर्फ Aadhar और RC book पर तुरंत approval मिल जाता है।"
    },
    {
      cat: "Warranty",
      q: "Warranty कितने साल की है और sensor battery कितना चलती है?",
      a: "Suraksha sensors में 5-year battery life आती है। पूरे hardware पर 1-year direct replacement warranty मिलती है किसी भी JK Truck Wheels centre पर।"
    },
    {
      cat: "Product",
      q: "Puncture होने से पहले Suraksha कैसे alert करता है?",
      a: "Sensor continuous micro-pressure drop detect करता है। जैसे ही tyre में slow puncture या abnormal heating होती है, display लाल light और audible buzzer बजाता है ताकि tyre burst होने से पहले truck safely रोका जा सके।"
    },
    {
      cat: "Support",
      q: "रास्ते में मदद के लिए कहाँ contact करें?",
      a: "हमारी 24x7 Toll-Free Suraksha Helpline 1800 258 4567 पर call करें या WhatsApp helpline पर message करें। Hindi, Punjabi, Tamil, Telugu और Marathi में instant support मिलता है।"
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
              आपके सवाल. हमारे जवाब.
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha kit के बारे में common questions. Category-wise filter कर सकते हैं। कोई और सवाल हो तो toll-free helpline या WhatsApp पर बात कीजिए।
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
                  कोई और सवाल है?
                </h3>
                <p className="text-xs text-[#FEF3C7]/80 mt-1 font-rubik">
                  Suraksha helpline पर तुरंत बात करें: 1800 258 4567 (Toll-Free)
                </p>
              </div>

              <Link
                href="/suraksha/whatsapp"
                className="px-6 py-3 rounded-[4px] bg-[#EA580C] text-white font-rubik font-bold text-xs uppercase tracking-wider hover:bg-[#DC2626] transition-all flex items-center gap-2 whitespace-nowrap shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp पे बात करें
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
