"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Download, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function WhitepaperGatedForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    role: "Fleet Operations Director",
    phone: "",
    fleetSize: "25-100",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Please tell us your name.";
    }
    if (!formData.workEmail.trim()) {
      errs.workEmail = "We need your work email to send the whitepaper.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.workEmail.trim())) {
      errs.workEmail = "That doesn't look like a valid email address.";
    }
    if (!formData.company.trim()) {
      errs.company = "Please provide your company name.";
    }
    if (!formData.consent) {
      errs.consent = "Please confirm your consent to proceed.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="p-6 rounded-lg bg-white/[0.04] border border-[#D5573B]/30 space-y-4 animate-in fade-in duration-300">
        <div className="w-10 h-10 rounded-full bg-[#D5573B]/10 text-[#D5573B] flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h4 className="font-fraunces text-xl font-medium text-[#FAF7F2]">Check your inbox.</h4>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          We&apos;ve emailed the whitepaper to <span className="text-white font-medium">{formData.workEmail}</span>. If you don&apos;t see it in a few minutes, check your spam folder. Any questions? Reach us at{" "}
          <a href="mailto:hello@treel.in" className="text-[#D5573B] underline">hello@treel.in</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Full name */}
      <div className="space-y-1.5">
        <label htmlFor="wp-fullName" className="block text-xs font-mono uppercase text-[#FAF7F2]">
          Full Name <span className="text-[#D5573B]">*</span>
        </label>
        <input
          id="wp-fullName"
          type="text"
          required
          placeholder="Your full name"
          value={formData.fullName}
          onChange={(e) => {
            setFormData({ ...formData, fullName: e.target.value });
            if (errors.fullName) setErrors({ ...errors, fullName: "" });
          }}
          className={`w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border ${
            errors.fullName ? "border-red-500" : "border-white/15 focus:border-[#D5573B]"
          } text-[#FAF7F2] text-xs outline-none transition-all placeholder-[#94A3B8]/50`}
        />
        {errors.fullName && <p className="text-red-400 text-[11px]">{errors.fullName}</p>}
      </div>

      {/* Work email */}
      <div className="space-y-1.5">
        <label htmlFor="wp-workEmail" className="block text-xs font-mono uppercase text-[#FAF7F2]">
          Work Email <span className="text-[#D5573B]">*</span>
        </label>
        <input
          id="wp-workEmail"
          type="email"
          required
          placeholder="you@company.com"
          value={formData.workEmail}
          onChange={(e) => {
            setFormData({ ...formData, workEmail: e.target.value });
            if (errors.workEmail) setErrors({ ...errors, workEmail: "" });
          }}
          className={`w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border ${
            errors.workEmail ? "border-red-500" : "border-white/15 focus:border-[#D5573B]"
          } text-[#FAF7F2] text-xs outline-none transition-all placeholder-[#94A3B8]/50`}
        />
        {errors.workEmail && <p className="text-red-400 text-[11px]">{errors.workEmail}</p>}
      </div>

      {/* Company */}
      <div className="space-y-1.5">
        <label htmlFor="wp-company" className="block text-xs font-mono uppercase text-[#FAF7F2]">
          Company <span className="text-[#D5573B]">*</span>
        </label>
        <input
          id="wp-company"
          type="text"
          required
          placeholder="Company / Fleet name"
          value={formData.company}
          onChange={(e) => {
            setFormData({ ...formData, company: e.target.value });
            if (errors.company) setErrors({ ...errors, company: "" });
          }}
          className={`w-full px-3.5 py-2.5 rounded-lg bg-white/[0.04] border ${
            errors.company ? "border-red-500" : "border-white/15 focus:border-[#D5573B]"
          } text-[#FAF7F2] text-xs outline-none transition-all placeholder-[#94A3B8]/50`}
        />
        {errors.company && <p className="text-red-400 text-[11px]">{errors.company}</p>}
      </div>

      {/* Role */}
      <div className="space-y-1.5">
        <label htmlFor="wp-role" className="block text-xs font-mono uppercase text-[#FAF7F2]">
          Role
        </label>
        <select
          id="wp-role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#182234] border border-white/15 text-[#FAF7F2] text-xs outline-none focus:border-[#D5573B] transition-all cursor-pointer"
        >
          <option value="Fleet Operations Director">Fleet Operations Director</option>
          <option value="CFO">CFO</option>
          <option value="CTO">CTO</option>
          <option value="Procurement">Procurement</option>
          <option value="Founder/CEO">Founder/CEO</option>
          <option value="Analyst">Analyst</option>
          <option value="Consultant">Consultant</option>
          <option value="Media">Media</option>
          <option value="Student/Academic">Student/Academic</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Fleet size */}
      <div className="space-y-1.5">
        <label htmlFor="wp-fleetSize" className="block text-xs font-mono uppercase text-[#FAF7F2]">
          Fleet Size
        </label>
        <select
          id="wp-fleetSize"
          value={formData.fleetSize}
          onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-lg bg-[#182234] border border-white/15 text-[#FAF7F2] text-xs outline-none focus:border-[#D5573B] transition-all cursor-pointer"
        >
          <option value="Under 25">Under 25 vehicles</option>
          <option value="25-100">25-100 vehicles</option>
          <option value="100-500">100-500 vehicles</option>
          <option value="500+">500+ vehicles</option>
          <option value="Not a fleet">Not a fleet</option>
        </select>
      </div>

      {/* Consent */}
      <div className="space-y-1 pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#94A3B8]">
          <input
            type="checkbox"
            required
            checked={formData.consent}
            onChange={(e) => {
              setFormData({ ...formData, consent: e.target.checked });
              if (errors.consent) setErrors({ ...errors, consent: "" });
            }}
            className="mt-0.5 w-3.5 h-3.5 rounded border-white/20 bg-white/[0.04] text-[#D5573B] focus:ring-[#D5573B]"
          />
          <span>I consent to Treel contacting me about mobility intelligence and related research.</span>
        </label>
        {errors.consent && <p className="text-red-400 text-[11px] pl-6">{errors.consent}</p>}
      </div>

      {/* Submit button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-7 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-xs hover:bg-[#CB4831] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Preparing download...</span>
            </>
          ) : (
            <>
              <span>Download Whitepaper</span>
              <Download className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
