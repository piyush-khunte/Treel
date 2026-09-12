"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  PhoneCall, 
  Search,
  MessageSquare
} from "lucide-react";

export default function PersonalFaqsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndices, setExpandedIndices] = useState<Record<number, boolean>>({ 0: true, 1: true });

  const categories = ["All", "Product", "Installation", "App", "Pricing & purchase", "Warranty", "Support"];

  const faqItems = [
    {
      cat: "Product",
      q: "What is Personal TPMS?",
      a: "Personal TPMS is a wireless tyre pressure monitoring system for personal vehicles. Four sensors mount on your tyre valve stems and transmit real-time pressure and temperature readings to your phone via Bluetooth."
    },
    {
      cat: "Product",
      q: "How is it different from my car's built-in TPMS?",
      a: "Factory TPMS in most cars only alerts you when pressure drops significantly below target. Personal TPMS shows you continuous readings for every tyre on every drive, so you see leading indicators (slow leaks, temperature drift) instead of just outcome alerts."
    },
    {
      cat: "Product",
      q: "Will it damage my tyres or valve stems?",
      a: "No. Personal TPMS sensors are lightweight (8 grams each) and mount using the same threading as a standard valve cap. They do not damage tyres or valve stems."
    },
    {
      cat: "Product",
      q: "Are the sensors safe at highway speeds?",
      a: "Yes. Personal TPMS sensors are tested at speeds up to 200 km/h. The lightweight design and locking rings ensure they stay in place at any legal highway speed."
    },
    {
      cat: "Product",
      q: "Will they work in monsoon or heavy rain?",
      a: "Yes. Sensors are IP67 rated — fully protected against dust and water immersion up to 1 meter for 30 minutes. Monsoon and car washes are not an issue."
    },
    {
      cat: "Installation",
      q: "How long does installation take?",
      a: "10 minutes for a typical car. The sensors screw onto valve stems finger-tight; no tools required. Follow the setup guide or watch the video."
    },
    {
      cat: "Installation",
      q: "Do I need a mechanic to install it?",
      a: "No. Personal TPMS is designed for DIY installation. If you can screw on a valve cap, you can install a Personal TPMS sensor."
    },
    {
      cat: "Installation",
      q: "Which tyre position does each sensor go on?",
      a: "The sensors are labeled FL (front-left), FR (front-right), RL (rear-left), RR (rear-right). Install each in its labeled position."
    },
    {
      cat: "Installation",
      q: "Can I install it on a car with alloy wheels?",
      a: "Yes. Personal TPMS works with any wheel type that uses a standard Schrader valve stem — alloy, steel, or aftermarket."
    },
    {
      cat: "App",
      q: "Which phones does the app work with?",
      a: "iOS 15 or later (any iPhone from 2018 onward) and Android 10 or later. Requires Bluetooth 5.0."
    },
    {
      cat: "App",
      q: "Does the app cost extra?",
      a: "No. The app is free to download and use. There are no in-app purchases or subscriptions."
    },
    {
      cat: "App",
      q: "Can I use the app on multiple phones?",
      a: "Yes. You can pair the same Personal TPMS setup with multiple phones on the same Treel account."
    },
    {
      cat: "App",
      q: "Does the app work offline?",
      a: "The app shows last-known readings when your phone is out of Bluetooth range of the sensors. Real-time data requires being in Bluetooth range (roughly 10 meters from the car)."
    },
    {
      cat: "App",
      q: "Does the app track my location?",
      a: "Only if you grant location permission and enable geofenced alerts. Location is optional; the app works without it."
    },
    {
      cat: "Pricing & purchase",
      q: "How much does Personal TPMS cost?",
      a: "₹8,999 launch pricing (MRP ₹12,999). Free express shipping across India."
    },
    {
      cat: "Pricing & purchase",
      q: "Where can I buy Personal TPMS?",
      a: "Directly from treel.in with free express shipping across India."
    },
    {
      cat: "Pricing & purchase",
      q: "Do you offer EMI?",
      a: "Yes. EMI options are available at checkout via Razorpay for cart values above a minimum threshold."
    },
    {
      cat: "Pricing & purchase",
      q: "What is your return policy?",
      a: "7-day return policy for unopened kits. See Returns Policy for full details."
    },
    {
      cat: "Pricing & purchase",
      q: "Do you ship internationally?",
      a: "Not currently. Personal TPMS is available for India delivery only at launch. International availability is planned for 2027."
    },
    {
      cat: "Warranty",
      q: "What is the warranty period?",
      a: "1 year full replacement warranty on all four sensors and the app."
    },
    {
      cat: "Warranty",
      q: "What does the warranty cover?",
      a: "Manufacturing defects on sensors, IP67 seal integrity, and app functionality. Does not cover physical damage, water damage below IP67, battery replacement, or loss/theft."
    },
    {
      cat: "Warranty",
      q: "How do I submit a warranty claim?",
      a: "Go to the Warranty page and follow the claim submission process. You'll need your order ID and email."
    },
    {
      cat: "Warranty",
      q: "Do I have to register my warranty?",
      a: "Registration is optional but recommended — it helps us serve you faster if you ever need to claim."
    },
    {
      cat: "Support",
      q: "How do I contact support?",
      a: "Email via the Contact Support form (2 business day response), toll-free 1800 833 0233 (business hours), or chat widget on the site."
    },
    {
      cat: "Support",
      q: "What are your business hours?",
      a: "Monday to Friday, 9:00 AM to 6:00 PM IST."
    },
    {
      cat: "Support",
      q: "Can I speak to someone in my language?",
      a: "Our support team responds in English and Hindi. For other languages, please indicate your preference in the support form and we will arrange a callback."
    }
  ];

  const filteredFaqs = faqItems.filter(item => {
    const matchesCat = activeCategory === "All" || item.cat === activeCategory;
    const matchesQuery = !searchQuery.trim() || 
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const toggleAccordion = (idx: number) => {
    setExpandedIndices(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              FAQS
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              Frequently asked questions.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Answers to common questions about Personal TPMS. If you don't find what you need, our support team is available to assist you.
            </p>

            {/* Search Input */}
            <div className="pt-2 max-w-xl">
              <div className="relative">
                <Search className="w-5 h-5 text-[#6B7280] absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions by keyword…"
                  className="w-full pl-12 pr-4 py-3.5 rounded-full bg-white border border-black/[0.12] text-sm text-[#111827] placeholder:text-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#2563EB] shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Chips & Accordions */}
      <section className="py-16 bg-white border-b border-black/[0.06]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10 space-y-10">
          {/* Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#2563EB] text-white shadow-sm"
                    : "bg-[#F9FAFB] text-[#4B5563] border border-black/[0.08] hover:border-[#2563EB]/40 hover:bg-[#F3F4F6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Accordion List */}
          <div className="max-w-4xl space-y-4">
            {filteredFaqs.length === 0 ? (
              <div className="p-8 text-center bg-[#F9FAFB] rounded-3xl border border-black/[0.06] space-y-2">
                <h4 className="font-bold text-[#111827]">No questions found</h4>
                <p className="text-xs text-[#6B7280]">Try searching for a different keyword or select another category.</p>
              </div>
            ) : (
              filteredFaqs.map((faq, idx) => {
                const isExpanded = !!expandedIndices[idx];
                return (
                  <div
                    key={idx}
                    className="rounded-3xl bg-[#F9FAFB] border border-black/[0.06] overflow-hidden transition-all hover:border-[#2563EB]/30"
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-[#2563EB] shrink-0" />
                        <span className="font-bold text-base text-[#111827]">{faq.q}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-white border border-black/[0.06] flex items-center justify-center shrink-0 text-[#6B7280]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>
                    {isExpanded && (
                      <div className="px-6 pb-6 pt-1 text-sm text-[#4B5563] leading-relaxed border-t border-black/[0.04]">
                        <p className="pl-8">{faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-8 sm:p-14 rounded-[32px] bg-[#111827] text-white shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Still have questions?
              </h2>
              <p className="text-[#94A3B8] text-sm sm:text-base font-normal">
                Reach our customer support team directly. We are ready to assist you.
              </p>
            </div>
            <Link
              href="/personal/support/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white font-manrope font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-[0_4px_14px_rgba(37,99,235,0.3)] shrink-0 cursor-pointer"
            >
              Contact support →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
