"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MessageSquare, 
  Truck,
  RotateCcw
} from "lucide-react";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  fleetSize: string;
  message: string;
  consent: boolean;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  subject?: string;
  message?: string;
  consent?: string;
}

export function CorporateContactForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    subject: "General inquiry",
    fleetSize: "Under 25 vehicles",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ team: string; sla: string } | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name required: "Please tell us your name."
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please tell us your name.";
    }

    // Email required: "We need an email address to respond."
    // Email invalid: "That doesn't look like a valid email address."
    if (!formData.email.trim()) {
      newErrors.email = "We need an email address to respond.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "That doesn't look like a valid email address.";
    }

    // Subject required: "Please tell us what your message is about."
    if (!formData.subject.trim()) {
      newErrors.subject = "Please tell us what your message is about.";
    }

    // Message required: "Please write your message."
    if (!formData.message.trim()) {
      newErrors.message = "Please write your message.";
    }

    // Consent required: "Please confirm your consent to proceed."
    if (!formData.consent) {
      newErrors.consent = "Please confirm your consent to proceed.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Calculate routed team and SLA based on selected subject (from content.md)
    let team = "general inquiries";
    let sla = "within 2 business days";

    if (formData.subject === "Enterprise sales (TMIP)") {
      team = "enterprise sales";
      sla = "within 4 business hours";
    } else if (formData.subject === "Media inquiry") {
      team = "media relations";
      sla = "within 1 business day";
    } else if (formData.subject === "Partnership inquiry") {
      team = "partnerships";
      sla = "within 2 business days";
    }

    try {
      // Simulate network request / API dispatch
      await new Promise((resolve) => setTimeout(resolve, 800));

      setSubmittedData({ team, sla });
      setIsSubmitted(true);
      setErrors({});
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      company: "",
      subject: "General inquiry",
      fleetSize: "Under 25 vehicles",
      message: "",
      consent: false,
    });
    setErrors({});
    setIsSubmitted(false);
    setSubmittedData(null);
  };

  if (isSubmitted && submittedData) {
    return (
      <div 
        role="status" 
        aria-live="polite"
        className="bg-white/[0.03] border border-[#D5573B]/30 rounded-lg p-8 sm:p-10 space-y-6 animate-in fade-in duration-300"
      >
        <div className="w-14 h-14 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/30 flex items-center justify-center text-[#D5573B]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <div className="space-y-3">
          <h3 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
            Message received.
          </h3>
          <p className="text-[#94A3B8] text-base leading-relaxed font-inter">
            Thanks for reaching out. Your message is with our {submittedData.team} team and you&apos;ll hear back {submittedData.sla}. If it&apos;s urgent, call us at{" "}
            <a href="tel:+918008330233" className="text-[#FAF7F2] font-semibold hover:text-[#D5573B] underline underline-offset-4">
              1800 833 0233
            </a>.
          </p>
        </div>

        <div className="pt-4 border-t border-white/10 flex items-center gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] border border-white/20 text-sm font-semibold text-[#FAF7F2] hover:bg-white/10 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" /> Send another note
          </button>
        </div>
      </div>
    );
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      noValidate 
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Full name (required) */}
        <div className="space-y-2">
          <label 
            htmlFor="contact-fullName" 
            className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#FAF7F2]"
          >
            Full Name <span className="text-[#D5573B]">*</span>
          </label>
          <div className="relative">
            <input
              id="contact-fullName"
              name="fullName"
              type="text"
              required
              aria-required="true"
              aria-invalid={!!errors.fullName}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
              placeholder="e.g. Anand Mahindra"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              className={`w-full px-4 py-3 rounded-lg bg-white/[0.04] border ${
                errors.fullName ? "border-red-500 ring-1 ring-red-500" : "border-white/15 focus:border-[#D5573B] focus:ring-1 focus:ring-[#D5573B]"
              } text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm outline-none transition-all`}
            />
          </div>
          {errors.fullName && (
            <p id="fullName-error" className="text-red-400 text-xs flex items-center gap-1.5 pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.fullName}</span>
            </p>
          )}
        </div>

        {/* Email (required, validated) */}
        <div className="space-y-2">
          <label 
            htmlFor="contact-email" 
            className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#FAF7F2]"
          >
            Email Address <span className="text-[#D5573B]">*</span>
          </label>
          <div className="relative">
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="anand@company.com"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              className={`w-full px-4 py-3 rounded-lg bg-white/[0.04] border ${
                errors.email ? "border-red-500 ring-1 ring-red-500" : "border-white/15 focus:border-[#D5573B] focus:ring-1 focus:ring-[#D5573B]"
              } text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm outline-none transition-all`}
            />
          </div>
          {errors.email && (
            <p id="email-error" className="text-red-400 text-xs flex items-center gap-1.5 pt-0.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone (optional, with country code) */}
        <div className="space-y-2">
          <label 
            htmlFor="contact-phone" 
            className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#FAF7F2]"
          >
            Phone Number <span className="text-[#94A3B8] font-normal text-[11px]">(Optional, with country code)</span>
          </label>
          <div className="relative">
            <input
              id="contact-phone"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/15 focus:border-[#D5573B] focus:ring-1 focus:ring-[#D5573B] text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm outline-none transition-all"
            />
          </div>
        </div>

        {/* Company (optional) */}
        <div className="space-y-2">
          <label 
            htmlFor="contact-company" 
            className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#FAF7F2]"
          >
            Company <span className="text-[#94A3B8] font-normal text-[11px]">(Optional)</span>
          </label>
          <div className="relative">
            <input
              id="contact-company"
              name="company"
              type="text"
              placeholder="e.g. VRL Logistics"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/[0.04] border border-white/15 focus:border-[#D5573B] focus:ring-1 focus:ring-[#D5573B] text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* Subject (required, dropdown) */}
      <div className="space-y-2">
        <label 
          htmlFor="contact-subject" 
          className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#FAF7F2]"
        >
          Subject <span className="text-[#D5573B]">*</span>
        </label>
        <select
          id="contact-subject"
          name="subject"
          required
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? "subject-error" : undefined}
          value={formData.subject}
          onChange={(e) => {
            setFormData({ ...formData, subject: e.target.value });
            if (errors.subject) setErrors({ ...errors, subject: undefined });
          }}
          className="w-full px-4 py-3 rounded-lg bg-[#182234] border border-white/15 focus:border-[#D5573B] focus:ring-1 focus:ring-[#D5573B] text-[#FAF7F2] text-sm outline-none transition-all cursor-pointer"
        >
          <option value="General inquiry" className="bg-[#182234] text-[#FAF7F2]">General inquiry</option>
          <option value="Enterprise sales (TMIP)" className="bg-[#182234] text-[#FAF7F2]">Enterprise sales (TMIP)</option>
          <option value="Media inquiry" className="bg-[#182234] text-[#FAF7F2]">Media inquiry</option>
          <option value="Partnership inquiry" className="bg-[#182234] text-[#FAF7F2]">Partnership inquiry</option>
        </select>
        {errors.subject && (
          <p id="subject-error" className="text-red-400 text-xs flex items-center gap-1.5 pt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.subject}</span>
          </p>
        )}
      </div>

      {/* Fleet size (conditional, appears when Subject = Enterprise sales (TMIP)) */}
      {formData.subject === "Enterprise sales (TMIP)" && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <label 
            htmlFor="contact-fleetSize" 
            className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#FAF7F2]"
          >
            Fleet Size
          </label>
          <select
            id="contact-fleetSize"
            name="fleetSize"
            value={formData.fleetSize}
            onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-[#182234] border border-white/15 focus:border-[#D5573B] focus:ring-1 focus:ring-[#D5573B] text-[#FAF7F2] text-sm outline-none transition-all cursor-pointer"
          >
            <option value="Under 25 vehicles" className="bg-[#182234] text-[#FAF7F2]">Under 25 vehicles</option>
            <option value="25-100" className="bg-[#182234] text-[#FAF7F2]">25-100</option>
            <option value="100-500" className="bg-[#182234] text-[#FAF7F2]">100-500</option>
            <option value="500+" className="bg-[#182234] text-[#FAF7F2]">500+</option>
          </select>
        </div>
      )}

      {/* Message (required, textarea, max 2000 chars) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label 
            htmlFor="contact-message" 
            className="block text-xs font-mono uppercase tracking-wider font-semibold text-[#FAF7F2]"
          >
            Message <span className="text-[#D5573B]">*</span>
          </label>
          <span className="text-xs text-[#94A3B8] font-mono">
            {formData.message.length} / 2000
          </span>
        </div>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={2000}
          required
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="How can we help your operations?"
          value={formData.message}
          onChange={(e) => {
            setFormData({ ...formData, message: e.target.value });
            if (errors.message) setErrors({ ...errors, message: undefined });
          }}
          className={`w-full px-4 py-3 rounded-lg bg-white/[0.04] border ${
            errors.message ? "border-red-500 ring-1 ring-red-500" : "border-white/15 focus:border-[#D5573B] focus:ring-1 focus:ring-[#D5573B]"
          } text-[#FAF7F2] placeholder-[#94A3B8]/50 text-sm outline-none transition-all resize-y`}
        />
        {errors.message && (
          <p id="message-error" className="text-red-400 text-xs flex items-center gap-1.5 pt-0.5">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.message}</span>
          </p>
        )}
      </div>

      {/* Consent checkbox (Required) */}
      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            id="contact-consent"
            name="consent"
            type="checkbox"
            required
            aria-required="true"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            checked={formData.consent}
            onChange={(e) => {
              setFormData({ ...formData, consent: e.target.checked });
              if (errors.consent) setErrors({ ...errors, consent: undefined });
            }}
            className="mt-1 w-4 h-4 rounded border-white/20 bg-white/[0.04] text-[#D5573B] focus:ring-[#D5573B] focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-inter">
            I consent to Treel processing my contact details for this inquiry. See{" "}
            <Link href="/privacy" className="underline hover:text-white transition-colors">
              Privacy Policy
            </Link>.
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="text-red-400 text-xs flex items-center gap-1.5 pt-0.5 pl-7">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errors.consent}</span>
          </p>
        )}
      </div>

      {/* Button: Send message */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-3.5 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending message...</span>
            </>
          ) : (
            <>
              <span>Send message</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
