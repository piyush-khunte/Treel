"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  Clock, 
  FileText, 
  PhoneCall, 
  Upload, 
  AlertTriangle,
  Sparkles
} from "lucide-react";

export default function PersonalSupportWarrantyPage() {
  // Registration Form State
  const [regOrderId, setRegOrderId] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regStep, setRegStep] = useState<"input" | "verified" | "completed">("input");
  const [regError, setRegError] = useState("");

  // Claim Form State
  const [claimOrderId, setClaimOrderId] = useState("");
  const [claimEmail, setClaimEmail] = useState("");
  const [claimStep, setClaimStep] = useState<"input" | "verified" | "submitted">("input");
  const [claimIssueType, setClaimIssueType] = useState("Sensor not working");
  const [claimDesc, setClaimDesc] = useState("");
  const [claimResolution, setClaimResolution] = useState("Replacement");
  const [generatedClaimId, setGeneratedClaimId] = useState("");
  const [claimError, setClaimError] = useState("");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleVerifyRegistration = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regOrderId.trim() || !regEmail.trim()) {
      setRegError("Please enter both your Order ID and Email address.");
      return;
    }
    setRegError("");
    setRegStep("verified");
  };

  const handleConfirmRegistration = () => {
    setRegStep("completed");
  };

  const handleVerifyClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimOrderId.trim() || !claimEmail.trim()) {
      setClaimError("Please enter both your Order ID and Email address.");
      return;
    }
    setClaimError("");
    setClaimStep("verified");
  };

  const handleSubmitClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimDesc.trim()) {
      setClaimError("Please provide a brief description of the issue.");
      return;
    }
    setClaimError("");
    const randomId = `CLM-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedClaimId(randomId);
    setClaimStep("submitted");
  };

  const faqs = [
    {
      q: "How long is the warranty?",
      a: "12 months from the date of purchase for all four smart sensors and ongoing firmware/app support."
    },
    {
      q: "What does \"full replacement\" cover?",
      a: "If a sensor is deemed defective due to manufacturing or internal transducer faults, we ship a brand new replacement sensor directly to your address free of charge."
    },
    {
      q: "Do I need to ship the defective sensor back?",
      a: "Sometimes, depending on the claim type and diagnostic requirements. Our support team will provide a pre-paid return label if physical inspection is required."
    },
    {
      q: "What if my sensor is more than 1 year old?",
      a: "If the 1-year warranty period has lapsed, replacement sensors are available for direct single-unit purchase so you don't need to buy a full kit."
    },
    {
      q: "How do I extend my warranty?",
      a: "Extended warranty options are not currently offered, but our team provides lifetime app updates and technical guidance."
    }
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em] inline-block">
              WARRANTY & SUPPORT
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
              1 year. Full replacement. No questions.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              Every Personal TPMS kit ships with a 1-year full replacement warranty on all four sensors and the app. Register below, or submit a claim if something has gone wrong.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Breakdown Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* What's Covered */}
            <div className="p-8 rounded-3xl bg-[#10B981]/10/50 border border-[#10B981]/20 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-[#059669] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-emerald-950">Coverage Summary</h2>
              </div>
              <ul className="space-y-4 text-sm text-emerald-900">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong>Sensor manufacturing defects</strong> — Full replacement of affected sensor(s).
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong>App connectivity issues</strong> — Free updates and priority support to resolve.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong>Sensor housing integrity</strong> — Full replacement if IP67 seal fails under normal driving conditions.
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <strong>Coverage duration</strong> — 12 months from the date of purchase.
                  </div>
                </li>
              </ul>
            </div>

            {/* What's Not Covered */}
            <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#E5E7EB] text-[#374151] flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-[#111827]">Not Covered</h2>
              </div>
              <ul className="space-y-4 text-sm text-[#374151]">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#9CA3AF] shrink-0 mt-0.5" />
                  <span>Physical damage from severe impact, crushing, kerbing, or misuse.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#9CA3AF] shrink-0 mt-0.5" />
                  <span>Water damage below or beyond the specified IP67 rating.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#9CA3AF] shrink-0 mt-0.5" />
                  <span>Battery replacement (CR1632 is a standard consumable, easily replaced).</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#9CA3AF] shrink-0 mt-0.5" />
                  <span>Damage resulting from unauthorized tampering, disassembly, or third-party repair.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-[#9CA3AF] shrink-0 mt-0.5" />
                  <span>Loss or theft of individual sensors.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Forms Section */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Register Your Warranty Form */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#2563EB] font-extrabold mb-1">Step 1</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">Register your warranty</h2>
                <p className="text-[#4B5563] text-sm mt-1">
                  Warranty registration helps us serve you faster if you ever need to claim. It only takes a minute.
                </p>
              </div>

              {regStep === "input" && (
                <form onSubmit={handleVerifyRegistration} className="space-y-4">
                  {regError && (
                    <div className="p-3 text-xs bg-red-50 text-red-700 rounded-lg border border-red-200">
                      {regError}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                      Order ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={regOrderId}
                      onChange={(e) => setRegOrderId(e.target.value)}
                      placeholder="e.g. TR-98241"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="you@email.com (used during purchase)"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-md cursor-pointer"
                  >
                    Verify Order →
                  </button>
                </form>
              )}

              {regStep === "verified" && (
                <div className="space-y-5">
                  <div className="p-4 rounded-full bg-[#2563EB]/10 border border-[#2563EB]/20 space-y-2">
                    <div className="text-xs font-bold text-blue-900">Order Verified: {regOrderId}</div>
                    <div className="text-xs text-blue-800">
                      Product: <strong>Personal TPMS (4-Tyre Kit)</strong><br />
                      Registered to: <strong>{regEmail}</strong><br />
                      Standard 1-Year Coverage: <strong>Active</strong>
                    </div>
                  </div>

                  <button
                    onClick={handleConfirmRegistration}
                    className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Confirm Registration
                  </button>
                </div>
              )}

              {regStep === "completed" && (
                <div className="p-6 rounded-3xl bg-[#10B981]/10 border border-[#10B981]/20 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-[#10B981] mx-auto" />
                  <h3 className="font-bold text-emerald-950 text-lg">Warranty Registered!</h3>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Confirmation sent to <strong>{regEmail}</strong>. Your 12-month full replacement coverage is now officially recorded.
                  </p>
                  <button
                    onClick={() => {
                      setRegStep("input");
                      setRegOrderId("");
                      setRegEmail("");
                    }}
                    className="text-xs font-bold text-[#2563EB] hover:underline pt-2 inline-block cursor-pointer"
                  >
                    Register another kit
                  </button>
                </div>
              )}
            </div>

            {/* Submit a Warranty Claim Form */}
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#2563EB] font-extrabold mb-1">Step 2</div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">Submit a warranty claim</h2>
                <p className="text-[#4B5563] text-sm mt-1">
                  If something has gone wrong with your Personal TPMS, submit a claim below. We'll respond within 2 business days.
                </p>
              </div>

              {claimStep === "input" && (
                <form onSubmit={handleVerifyClaim} className="space-y-4">
                  {claimError && (
                    <div className="p-3 text-xs bg-red-50 text-red-700 rounded-lg border border-red-200">
                      {claimError}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                      Order ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={claimOrderId}
                      onChange={(e) => setClaimOrderId(e.target.value)}
                      placeholder="e.g. TR-98241"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={claimEmail}
                      onChange={(e) => setClaimEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#111827] text-white font-bold text-sm hover:bg-black transition-all shadow-md cursor-pointer"
                  >
                    Verify Order & Continue →
                  </button>
                </form>
              )}

              {claimStep === "verified" && (
                <form onSubmit={handleSubmitClaim} className="space-y-4">
                  {claimError && (
                    <div className="p-3 text-xs bg-red-50 text-red-700 rounded-lg border border-red-200">
                      {claimError}
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                      Issue Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={claimIssueType}
                      onChange={(e) => setClaimIssueType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      <option value="Sensor not working">Sensor not working</option>
                      <option value="App issue">App issue</option>
                      <option value="Physical damage (limited coverage)">Physical damage (limited coverage)</option>
                      <option value="Battery issue (not covered but we can help)">Battery issue (guidance)</option>
                      <option value="Other">Other issue</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                      Describe the issue <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      maxLength={2000}
                      value={claimDesc}
                      onChange={(e) => setClaimDesc(e.target.value)}
                      placeholder="Please explain the issue you are facing..."
                      className="w-full px-4 py-2.5 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-1.5">
                      Preferred Resolution
                    </label>
                    <select
                      value={claimResolution}
                      onChange={(e) => setClaimResolution(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      <option value="Replacement">Replacement Sensor</option>
                      <option value="Refund (if within return window)">Refund (if eligible)</option>
                      <option value="Repair guidance">Technical Troubleshooting Guidance</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-md cursor-pointer"
                  >
                    Submit Claim →
                  </button>
                </form>
              )}

              {claimStep === "submitted" && (
                <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#1D4ED8] text-xs font-bold">
                    Claim ID: {generatedClaimId}
                  </div>
                  <h3 className="font-bold text-[#111827] text-xl">Claim submitted.</h3>
                  <p className="text-xs text-[#4B5563] leading-relaxed">
                    Your claim ID is <strong>{generatedClaimId}</strong>. We've emailed a confirmation to <strong>{claimEmail}</strong>. Our support team will respond within 2 business days. If your issue is urgent, call us at <strong>1800 833 0233</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setClaimStep("input");
                      setClaimOrderId("");
                      setClaimEmail("");
                      setClaimDesc("");
                    }}
                    className="text-xs font-bold text-[#2563EB] hover:underline pt-2 inline-block cursor-pointer"
                  >
                    Submit another claim
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em] inline-block mb-3">
                QUESTIONS & ANSWERS
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111827] tracking-tight">
                Warranty FAQs
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-black/[0.06] overflow-hidden bg-white shadow-xs"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-[#111827] text-base hover:bg-[#F9FAFB] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-5 h-5 text-[#2563EB] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-[#9CA3AF] shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 pb-6 pt-1 text-sm text-[#4B5563] leading-relaxed border-t border-black/[0.04]">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
