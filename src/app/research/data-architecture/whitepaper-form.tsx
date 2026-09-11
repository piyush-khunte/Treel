"use client";

import React, { useState } from "react";
import { 
  Download, 
  CheckCircle2, 
  Loader2, 
  Mail, 
  Building2, 
  User, 
  Phone, 
  Truck, 
  Briefcase 
} from "lucide-react";

const FREE_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "aol.com",
  "icloud.com",
  "zoho.com",
  "mail.com",
  "protonmail.com",
  "yandex.com"
];

export function DataArchWhitepaperGatedForm() {
  const [fullName, setFullName] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [fleetSize, setFleetSize] = useState("");
  const [consent, setConsent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }

    if (!workEmail.trim()) {
      errs.workEmail = "Please enter your work email.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(workEmail)) {
        errs.workEmail = "Please enter a valid work email address.";
      } else {
        const domain = workEmail.split("@")[1]?.toLowerCase();
        if (domain && FREE_EMAIL_DOMAINS.includes(domain)) {
          errs.workEmail = "Please provide an enterprise or work email (personal domains not accepted).";
        }
      }
    }

    if (!company.trim()) {
      errs.company = "Please enter your company or organization.";
    }

    if (!role) {
      errs.role = "Please select your primary role.";
    }

    if (!consent) {
      errs.consent = "You must consent to receive the research paper.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      try {
        const blob = new Blob(
          ["Treel Research: Data Architecture & Telemetry Ingestion at Enterprise Scale (Technical Whitepaper)"],
          { type: "application/pdf" }
        );
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = "Treel-Research-Data-Architecture-Whitepaper.pdf";
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      } catch (err) {
        console.error("Download simulation error:", err);
      }
    }, 800);
  };

  if (submitted) {
    return (
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 sm:p-10 space-y-6 text-left">
        <div className="w-12 h-12 rounded-md bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
        </div>

        <div className="space-y-2">
          <h3 className="font-fraunces text-2xl font-medium text-[#FAF7F2]">
            Check your inbox.
          </h3>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-inter">
            We&apos;ve emailed the technical whitepaper to <span className="text-[#FAF7F2] font-semibold">{workEmail}</span>. If you don&apos;t see it in a few minutes, check your spam folder. Any questions? Reach us at <a href="mailto:hello@treel.in" className="text-[#D5573B] underline">hello@treel.in</a>.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-white/[0.02] border border-white/[0.08] text-xs text-[#94A3B8] font-mono flex items-center gap-2">
          <span>✓ Direct download initiated</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/[0.03] border border-white/[0.08] rounded-lg p-8 sm:p-10 space-y-6 text-left shadow-2xl">
      <div className="space-y-2">
        <h3 className="font-fraunces text-2xl font-medium text-[#FAF7F2]">
          Unlock the full paper
        </h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed font-inter">
          Enter your details to receive the full whitepaper by email. No spam. Unsubscribe anytime.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
            Full name <span className="text-[#D5573B]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Ramesh Kumar"
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/60 text-sm focus:outline-none focus:border-[#D5573B] transition-all"
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-[#D5573B] font-inter">{errors.fullName}</p>
          )}
        </div>

        {/* Work Email */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
            Work email <span className="text-[#D5573B]">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              value={workEmail}
              onChange={(e) => setWorkEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/60 text-sm focus:outline-none focus:border-[#D5573B] transition-all"
            />
          </div>
          {errors.workEmail && (
            <p className="text-xs text-[#D5573B] font-inter">{errors.workEmail}</p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
            Company <span className="text-[#D5573B]">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Acme Logistics Pvt Ltd"
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/60 text-sm focus:outline-none focus:border-[#D5573B] transition-all"
            />
          </div>
          {errors.company && (
            <p className="text-xs text-[#D5573B] font-inter">{errors.company}</p>
          )}
        </div>

        {/* Role Dropdown */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
            Role <span className="text-[#D5573B]">*</span>
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-[#111927] border border-white/15 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#D5573B] transition-all"
          >
            <option value="" disabled>Select your role</option>
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
          {errors.role && (
            <p className="text-xs text-[#D5573B] font-inter">{errors.role}</p>
          )}
        </div>

        {/* Phone & Fleet Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
              Phone (optional)
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/60 text-sm focus:outline-none focus:border-[#D5573B] transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
              Fleet size (optional)
            </label>
            <select
              value={fleetSize}
              onChange={(e) => setFleetSize(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-[#111927] border border-white/15 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#D5573B] transition-all"
            >
              <option value="">Select fleet size</option>
              <option value="Under 25">Under 25</option>
              <option value="25-100">25-100</option>
              <option value="100-500">100-500</option>
              <option value="500+">500+</option>
              <option value="Not a fleet">Not a fleet</option>
            </select>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 rounded border-white/20 bg-white/5 text-[#D5573B] focus:ring-0 focus:ring-offset-0"
            />
            <span className="text-xs text-[#94A3B8] leading-relaxed font-inter">
              I consent to Treel contacting me about mobility intelligence and related topics. (Required)
            </span>
          </label>
          {errors.consent && (
            <p className="text-xs text-[#D5573B] font-inter mt-1">{errors.consent}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 px-7 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 mt-4 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Preparing whitepaper...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
