"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck, PhoneCall, Building2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

function SurakshaEMIApplyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    ownerName: "",
    phone: "",
    vehicleReg: "",
    tyreCount: "10 Tyres (Most Popular)",
    tenure: "12 Months",
    state: "Maharashtra",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const configParam = searchParams.get("config");
    const tenureParam = searchParams.get("tenure");
    if (configParam || tenureParam) {
      setFormData((prev) => ({
        ...prev,
        tyreCount: configParam || prev.tyreCount,
        tenure: tenureParam ? (tenureParam.includes("Month") ? tenureParam : `${tenureParam} Months`) : prev.tenure,
      }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const randomSuffix = Math.floor(100000 + Math.random() * 900000).toString();
    let finalReference = `SRK-EMI-${randomSuffix}`;

    try {
      const res = await fetch("/api/suraksha/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.ownerName.trim(),
          mobile: formData.phone.trim(),
          truckConfig: formData.tyreCount,
          city: formData.state,
          topic: "Suraksha EMI Application",
          message: `Vehicle Reg: ${formData.vehicleReg.trim()}, Kit: ${formData.tyreCount}, Tenure: ${formData.tenure}, State: ${formData.state}`,
          form_id: "suraksha_emi_apply",
          lead_source: "Suraksha EMI Apply",
          type: "suraksha_emi",
          page_path: "/suraksha/emi/apply",
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (data?.leadId) {
        const refSuffix = data.leadId.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase();
        if (refSuffix) finalReference = `SRK-EMI-${refSuffix}`;
      }
    } catch (err) {
      console.warn("[Suraksha EMI] Network submission fallback:", err);
    } finally {
      const submissionPayload = {
        referenceNumber: finalReference,
        ownerName: formData.ownerName.trim(),
        phone: formData.phone.trim(),
        vehicleReg: formData.vehicleReg.trim(),
        tyreCount: formData.tyreCount,
        state: formData.state,
        tenure: formData.tenure,
        downPayment: "Zero Down Payment Plan",
        financingPartner: "Bajaj Finance",
        applicationDate: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        submittedAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        try {
          sessionStorage.setItem("suraksha_emi_confirmed", JSON.stringify(submissionPayload));
        } catch {
          // Session storage quota or private mode
        }
      }

      router.push(
        `/suraksha/emi/apply/success?ref=${finalReference}&kit=${encodeURIComponent(
          formData.tyreCount
        )}&tenure=${encodeURIComponent(formData.tenure)}`
      );
      setIsSubmitting(false);
    }
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
              EMI APPLICATION
            </div>
            <h1 className="font-anton text-4xl sm:text-5xl lg:text-6xl uppercase tracking-wider text-[#451A03] leading-[1.15]">
              APPLY IN <span className="italic text-[#EA580C]">4 STEPS.</span>
            </h1>
            <SurakshaRotator
              page="5.6"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-2"
            >
              लगभग 10 मिनट में आपकी एप्लिकेशन पूरी।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Share your personal and truck details to initiate your Bajaj Finance zero down payment EMI plan. Keep your Aadhaar, PAN and truck registration (RC) ready.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 border-b border-[#451A03]/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mx-auto bg-[#FFFBEB] border border-[#451A03]/10 p-8 sm:p-10 rounded-2xl shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-[#451A03]/10 pb-4">
              <h2 className="font-anton text-2xl uppercase tracking-wider text-[#451A03]">
                Quick Application Form
              </h2>
              <span className="text-xs font-bold text-[#78350F] flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-[#EA580C]" />
                Partner: Bajaj Finance
              </span>
            </div>

            {errorMessage && (
              <div className="p-4 rounded-lg bg-[#DC2626]/10 border border-[#DC2626]/30 text-xs font-bold text-[#DC2626]">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                  Owner / Driver Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
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
                    pattern="[0-9]{10}"
                    maxLength={10}
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/[^0-9]/g, "") })}
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
                    onChange={(e) => setFormData({ ...formData, vehicleReg: e.target.value.toUpperCase() })}
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
                    <option value="6-wheeler (6 Tyres)">6 Tyres (6-wheeler)</option>
                    <option value="10 Tyres (Most Popular)">10 Tyres (10-wheeler - Most Popular)</option>
                    <option value="12-wheeler (12 Tyres)">12 Tyres (12-wheeler)</option>
                    <option value="14-wheeler (14 Tyres)">14 Tyres (14-wheeler)</option>
                    <option value="16-wheeler (16 Tyres)">16 Tyres (16-wheeler)</option>
                    <option value="18+ Tyres (Trailer)">18+ Tyres (Prime Mover / Trailer)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                    Tenure Plan *
                  </label>
                  <select
                    value={formData.tenure}
                    onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FEF3C7]/60 border border-[#451A03]/20 rounded-lg text-[#451A03] focus:outline-none focus:border-[#DC2626] text-sm font-medium"
                  >
                    <option value="9 Months (Zero-Cost EMI)">9 Months (Zero-Cost EMI)</option>
                    <option value="12 Months">12 Months (Standard)</option>
                    <option value="6 Months">6 Months</option>
                    <option value="18 Months">18 Months</option>
                    <option value="24 Months">24 Months</option>
                    <option value="3 Months">3 Months</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                  Preferred State / Region *
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
                  <option>Madhya Pradesh</option>
                  <option>Tamil Nadu</option>
                  <option>Karnataka</option>
                  <option>Andhra Pradesh & Telangana</option>
                  <option>West Bengal & Odisha</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-lg font-anton uppercase tracking-wider text-base bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
              >
                {isSubmitting ? "Submitting Application..." : "Submit EMI Application"}{" "}
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SurakshaEMIApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FEF3C7] text-[#451A03] flex items-center justify-center font-rubik p-6">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#DC2626] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-[#78350F]">Loading application...</p>
          </div>
        </div>
      }
    >
      <SurakshaEMIApplyForm />
    </Suspense>
  );
}