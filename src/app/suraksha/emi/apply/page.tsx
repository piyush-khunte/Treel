"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck, PhoneCall } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export default function SurakshaEMIApplyPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    vehicleReg: "",
    tyreCount: "6 Tyres (₹1,199/mo)",
    tenure: "12 Months",
    state: "Maharashtra"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/suraksha/emi/apply/success");
    }, 600);
  };

  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-[#451A03]/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "EMI Plans", href: "/suraksha/emi" },
                { label: "Apply" },
              ]}
            />
            <div className="border text-[#DC2626] bg-[#DC2626]/10 border-[#DC2626]/20 font-rubik text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              SURAKSHA EMI
            </div>
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-[#DC2626] leading-[1.15]">
              Apply for Suraksha Kit EMI.
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Zero downpayment. Easy monthly instalments starting at ₹1,199/month. Instant approval at any of our 400+ highway Suraksha centres across India.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 border-b border-[#451A03]/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mx-auto bg-[#FFFBEB] border border-[#451A03]/10 p-8 sm:p-10 rounded-2xl shadow-xl space-y-6">
            <h2 className="font-anton text-2xl uppercase tracking-wider text-[#451A03]">
              Quick Application Form
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                  Owner / Driver Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Apna poora naam likhein"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FEF3C7]/60 border border-[#451A03]/20 rounded-lg text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FEF3C7]/60 border border-[#451A03]/20 rounded-lg text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                    Vehicle Reg Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MH 12 AB 1234"
                    value={formData.vehicleReg}
                    onChange={(e) => setFormData({ ...formData, vehicleReg: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FEF3C7]/60 border border-[#451A03]/20 rounded-lg text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                    Kit Configuration *
                  </label>
                  <select
                    value={formData.tyreCount}
                    onChange={(e) => setFormData({ ...formData, tyreCount: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FEF3C7]/60 border border-[#451A03]/20 rounded-lg text-[#451A03] focus:outline-none focus:border-[#DC2626] text-sm font-medium"
                  >
                    <option>6 Tyres (₹1,199/mo)</option>
                    <option>10 Tyres (₹1,899/mo)</option>
                    <option>12 Tyres (₹2,299/mo)</option>
                    <option>18+ Tyres (₹3,199/mo)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                    Preferred State *
                  </label>
                  <select
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FEF3C7]/60 border border-[#451A03]/20 rounded-lg text-[#451A03] focus:outline-none focus:border-[#DC2626] text-sm font-medium"
                  >
                    <option>Maharashtra</option>
                    <option>Gujarat</option>
                    <option>Rajasthan</option>
                    <option>Punjab & Haryana</option>
                    <option>Uttar Pradesh</option>
                    <option>Tamil Nadu</option>
                    <option>Karnataka</option>
                    <option>Andhra Pradesh & Telangana</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg font-anton uppercase tracking-wider text-base bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit EMI Application"} <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
