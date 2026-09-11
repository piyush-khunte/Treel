"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, ArrowRight, Upload } from "lucide-react";

interface RoleApplicationFormProps {
  roleTitle: string;
}

export function RoleApplicationForm({ roleTitle }: RoleApplicationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fileName, setFileName] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [source, setSource] = useState("");
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please enter your full name.";
    if (!email.trim()) {
      errs.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!phone.trim()) errs.phone = "Please enter your phone number with country code.";
    if (!fileName) errs.resume = "Please attach your resume (PDF or DOCX, max 5MB).";
    if (!consent) errs.consent = "Please confirm your consent to process your application.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, resume: "File size exceeds 5MB." }));
        setFileName("");
      } else {
        setFileName(file.name);
        setErrors((prev) => {
          const rest = { ...prev };
          delete rest.resume;
          return rest;
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
    }, 700);
  };

  if (status === "success") {
    return (
      <div className="p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-fraunces text-2xl font-bold text-[#FAF7F2]">
          Thanks. Your application is in.
        </h3>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-inter max-w-xl">
          We received your application for <span className="text-[#FAF7F2] font-semibold">{roleTitle}</span>. Our team will review and get back to you within two weeks. If you have questions in the meantime, reach us at{" "}
          <a href="mailto:hello@treel.in" className="text-[#D5573B] underline hover:text-[#CB4831]">
            hello@treel.in
          </a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-8 sm:p-10 rounded-2xl bg-white/[0.03] border border-white/10 space-y-6">
      <div className="space-y-1">
        <h3 className="font-fraunces text-2xl font-bold text-[#FAF7F2]">
          Apply for {roleTitle}
        </h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] font-inter">
          Submit your details below. We respond to every applicant within two weeks.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
            Full name <span className="text-[#D5573B]">*</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Priya Sharma"
            className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm focus:outline-none focus:border-[#D5573B] transition-all"
          />
          {errors.name && <p className="text-xs text-[#D5573B] font-inter">{errors.name}</p>}
        </div>

        {/* Email & Phone Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
              Email <span className="text-[#D5573B]">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="priya@example.com"
              className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm focus:outline-none focus:border-[#D5573B] transition-all"
            />
            {errors.email && <p className="text-xs text-[#D5573B] font-inter">{errors.email}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
              Phone <span className="text-[#D5573B]">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm focus:outline-none focus:border-[#D5573B] transition-all"
            />
            {errors.phone && <p className="text-xs text-[#D5573B] font-inter">{errors.phone}</p>}
          </div>
        </div>

        {/* Resume upload */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
            Resume upload (PDF, DOCX, max 5MB) <span className="text-[#D5573B]">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept=".pdf,.docx,.doc"
              onChange={handleFileChange}
              id="resume-file"
              className="hidden"
            />
            <label
              htmlFor="resume-file"
              className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-dashed border-white/20 text-[#FAF7F2] text-sm flex items-center justify-between cursor-pointer hover:border-[#D5573B]/60 transition-colors"
            >
              <span className={fileName ? "text-[#FAF7F2]" : "text-[#94A3B8]/60"}>
                {fileName || "Choose file to upload (PDF or DOCX)..."}
              </span>
              <span className="px-3 py-1 rounded bg-white/10 text-xs font-mono text-[#FAF7F2] flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" /> Browse
              </span>
            </label>
          </div>
          {errors.resume && <p className="text-xs text-[#D5573B] font-inter">{errors.resume}</p>}
        </div>

        {/* LinkedIn Profile */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
            LinkedIn profile URL (optional)
          </label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm focus:outline-none focus:border-[#D5573B] transition-all"
          />
        </div>

        {/* Cover letter or introduction */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
              Cover letter or introduction (optional)
            </label>
            <span className="text-[10px] font-mono text-[#94A3B8]">
              {coverLetter.length}/2000
            </span>
          </div>
          <textarea
            value={coverLetter}
            maxLength={2000}
            rows={4}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Tell us why you want to work on mobility intelligence at Treel..."
            className="w-full px-4 py-3 rounded-lg bg-white/[0.05] border border-white/15 text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm focus:outline-none focus:border-[#D5573B] transition-all resize-y"
          />
        </div>

        {/* How did you hear about this role? */}
        <div className="space-y-1.5">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
            How did you hear about this role?
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-[#182234] border border-white/15 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#D5573B] transition-all cursor-pointer"
          >
            <option value="">Select an option</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
            <option value="Website">Website</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Consent checkbox */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-1 rounded bg-white/10 border-white/20 text-[#D5573B] focus:ring-[#D5573B] focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-xs text-[#94A3B8] leading-relaxed group-hover:text-[#FAF7F2] transition-colors">
              I consent to Treel processing my data for this application. See{" "}
              <Link href="/privacy" className="text-[#FAF7F2] underline hover:text-[#D5573B]">
                Privacy Policy
              </Link>. <span className="text-[#D5573B]">*</span>
            </span>
          </label>
          {errors.consent && <p className="text-xs text-[#D5573B] font-inter mt-1">{errors.consent}</p>}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto px-8 py-3.5 rounded-lg bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 cursor-pointer"
        >
          {status === "loading" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Submitting application...</span>
            </>
          ) : (
            <>
              <span>Apply now</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
