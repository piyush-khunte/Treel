"use client";

import { CheckCircle2,Download,Eye,Loader2 } from "lucide-react";
import React,{ useState } from "react";

export interface WhitepaperGatedFormProps {
  slug?: string;
  whitepaperId?: string;
  whitepaperTitle?: string;
  paperFormat?: string;
  pageCount?: string;
}

export function WhitepaperGatedForm({
  slug = "roi-fleet-intelligence",
  whitepaperId,
  whitepaperTitle = "The Fleet ROI and Fuel Savings Paper",
  paperFormat = "PDF",
  pageCount = "28 Pages",
}: WhitepaperGatedFormProps = {}) {
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
  const [accessResult, setAccessResult] = useState<{
    token: string;
    viewUrl: string;
    downloadUrl: string;
    emailStatus: string;
    message: string;
    format: string;
  } | null>(null);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Please tell us your name.";
    }
    if (!formData.workEmail.trim()) {
      errs.workEmail = "We need your email to send the whitepaper.";
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
    try {
      const res = await fetch("/api/tmip/whitepapers/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whitepaperId: whitepaperId || undefined,
          slug,
          email: formData.workEmail.trim().toLowerCase(),
          fullName: formData.fullName.trim(),
          company: formData.company.trim(),
          phone: formData.phone.trim(),
          fleetSize: formData.fleetSize,
          consent: formData.consent,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAccessResult({
          token: data.token,
          viewUrl: data.viewUrl,
          downloadUrl: data.downloadUrl,
          emailStatus: data.emailStatus,
          message: data.message,
          format: data.whitepaper?.format || "PDF",
        });
        setIsSubmitted(true);
      } else {
        setErrors({ form: data.error || "Unable to grant document access. Please try again." });
      }
    } catch (err: any) {
      setErrors({ form: err.message || "Failed to process request. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && accessResult) {
    return (
      <div className="p-6 rounded-lg bg-white/[0.04] border border-[#D5573B]/30 space-y-5 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-full bg-[#D5573B]/10 text-[#D5573B] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div className="text-center space-y-1">
          <h4 className="font-fraunces text-xl font-medium text-[#FAF7F2]">Access Granted</h4>
          <p className="text-xs text-[#94A3B8] leading-relaxed max-w-sm mx-auto">
            {accessResult.message}
          </p>
        </div>

        <div className="p-3.5 rounded-md bg-black/40 border border-white/10 text-left space-y-1">
          <div className="text-[10px] font-mono uppercase text-[#D5573B] font-semibold">
            {accessResult.format} Document Ready
          </div>
          <div className="text-xs font-semibold text-white">
            {whitepaperTitle}
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Format: {accessResult.format || paperFormat} · {pageCount}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
          {accessResult.format.toUpperCase() === "PDF" && (
            <a
              href={accessResult.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[3px] bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-white font-mono text-xs font-semibold transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-[#D5573B]" />
              <span>View Online</span>
            </a>
          )}
          <a
            href={accessResult.downloadUrl}
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[3px] bg-[#D5573B] hover:bg-[#CB4831] text-white font-mono text-xs font-semibold transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download File</span>
          </a>
        </div>
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
          Email <span className="text-[#D5573B]">*</span>
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
