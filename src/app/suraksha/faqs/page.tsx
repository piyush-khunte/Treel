"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, HelpCircle, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

export default function SurakshaFAQsPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const faqs = [
    {
      cat: "Installation",
      q: "Suraksha kit install kaise hoti hai aur kitna time lagta hai?",
      a: "Suraksha install karna bahut asaan hai. 15 minute mein 3 steps mein install ho jata hai: (1) In-cab display cabin mein 12V/24V socket mein mount karo, (2) Har tyre ke valve stem pe ek smart sensor lagao, (3) Display auto-detect karega aur tyre pressure turant screen pe dikha dega. Koi wiring cut karne ki zaroorat nahi hoti."
    },
    {
      cat: "Installation",
      q: "Kya kisi certified mechanic ke paas jana padega?",
      a: "Nahi. Kisi bhi highway puncture shop wala ya driver khud 15 minute mein fit kar leta hai. Kit ke andar ek page ka vernacular manual aur video QR code aata hai."
    },
    {
      cat: "Pricing",
      q: "Suraksha kit ki kya keemat hai?",
      a: "Standard 10-wheeler truck ke liye ₹17,500 hai. 6-wheeler ke liye ₹10,500, 12-wheeler ke liye ₹21,000, 14-wheeler ke liye ₹24,500, aur 18-wheeler trailer ke liye ₹31,500. Price mein display, sensors, mounting kit, official JK Tyre warranty, aur helpline support sab shamil hai."
    },
    {
      cat: "Pricing",
      q: "Kya koi monthly subscription ya renewal fee hai?",
      a: "Bilkul nahi! Suraksha zero-subscription product hai. Ek baar kit khareed li, uske baad koi monthly app fee ya SIM recharge charge nahi hota."
    },
    {
      cat: "EMI",
      q: "Kya Suraksha par easy EMI mil sakti hai?",
      a: "Haan. Bajaj Finance ke saath zero-downpayment easy EMI available hai. Monthly instalment ₹1,199/month se shuru hoti hai. Sirf Aadhar aur RC book par turant approval mil jata hai."
    },
    {
      cat: "Warranty",
      q: "Warranty kitne saal ki hai aur sensor battery kitna chalti hai?",
      a: "Suraksha sensors mein 5-year battery life aati hai. Pure hardware par 1-year direct replacement warranty milti hai kisi bhi JK Truck Wheels centre par."
    },
    {
      cat: "Product",
      q: "Puncture hone se pehle Suraksha kaise alert karta hai?",
      a: "Sensor continuous micro-pressure drop detect karta hai. Jaise hi tyre mein slow puncture ya abnormal heating hoti hai, display laal light aur audible buzzer bajata hai taaki tyre burst hone se pehle truck safely roka ja sake."
    },
    {
      cat: "Support",
      q: "Raste mein madad ke liye kahan contact karein?",
      a: "Humari 24x7 Toll-Free Suraksha Helpline 1800 258 4567 par call karein ya WhatsApp helpline par message karein. Hindi, Punjabi, Tamil, Telugu aur Marathi mein instant support milta hai."
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              FAQS
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#DC2626] leading-[1.05]">
              Aapke Sawaal. Hamare Jawaab.
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha kit ke baare mein common questions. Category-wise filter kar sakte hai. Koi aur sawaal ho toh toll-free helpline ya WhatsApp par baat kijiye.
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
                  Koi Aur Sawaal Hai?
                </h3>
                <p className="text-xs text-[#FEF3C7]/80 mt-1 font-rubik">
                  Suraksha helpline par turant baat karein: 1800 258 4567 (Toll-Free)
                </p>
              </div>

              <Link
                href="/suraksha/whatsapp"
                className="px-6 py-3 rounded-[4px] bg-[#EA580C] text-white font-rubik font-bold text-xs uppercase tracking-wider hover:bg-[#DC2626] transition-all flex items-center gap-2 whitespace-nowrap shadow-sm"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Pe Baat Karein
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
