"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, PhoneCall, CheckCircle2, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

export default function SurakshaCallbackPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/suraksha/callback/success");
    }, 600);
  };

  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Request Callback" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-3.5 h-3.5" />
              CALLBACK REQUEST
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              WE'LL <span className="italic text-[#0891B2]">CALL YOU.</span>
            </h1>
            <SurakshaRotator
              page="5.19"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-2"
            >
              अपना समय और अपनी भाषा चुनिए।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Share your number, preferred time and language, and our team will call you back. Prefer WhatsApp? Let us know in the form below.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 sm:py-20 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-md mx-auto bg-[#FFFBEB] border-2 border-[#451A03]/15 p-6 sm:p-8 rounded-lg shadow-sm space-y-6">
            <h2 className="font-anton text-2xl uppercase tracking-normal text-[#451A03]">
              15-Minute Callback
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-[4px] font-rubik font-bold uppercase tracking-wider text-xs bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <PhoneCall className="w-4 h-4" /> {isSubmitting ? "Sending..." : "Request Callback Now"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}