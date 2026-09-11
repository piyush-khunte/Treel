"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, PhoneCall, CheckCircle2, ShieldCheck } from "lucide-react";

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
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-[#451A03]/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#DC2626] bg-[#DC2626]/10 border-[#DC2626]/20 font-rubik text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              CALLBACK REQUEST
            </div>
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-[#DC2626] leading-[1.15]">
              Request a Driver Helpline Callback.
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Enter your mobile number. A Suraksha support advisor will call you back within 15 minutes in Hindi, Punjabi, Tamil, Telugu, or Marathi.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 border-b border-[#451A03]/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-md mx-auto bg-[#FFFBEB] border border-[#451A03]/10 p-8 sm:p-10 rounded-2xl shadow-xl space-y-6">
            <h2 className="font-anton text-2xl uppercase tracking-wider text-[#451A03]">
              15-Minute Callback
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                  Aapka Naam *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Naam darj karein"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FEF3C7]/60 border border-[#451A03]/20 rounded-lg text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium"
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
                  className="w-full px-4 py-3 bg-[#FEF3C7]/60 border border-[#451A03]/20 rounded-lg text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg font-anton uppercase tracking-wider text-base bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <PhoneCall className="w-5 h-5" /> {isSubmitting ? "Sending..." : "Request Callback Now"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
