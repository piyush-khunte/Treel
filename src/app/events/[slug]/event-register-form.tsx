"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventRegisterFormProps {
  eventName: string;
  dateTime: string;
}

export function EventRegisterForm({ eventName, dateTime }: EventRegisterFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "",
    source: "Website",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = "Please enter your full name.";
    }
    if (!formData.email.trim()) {
      errs.email = "Please enter your work email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!formData.consent) {
      errs.consent = "Please agree to the registration consent to proceed.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setIsRegistered(true);
  };

  if (isRegistered) {
    return (
      <div className="p-8 rounded-lg bg-white/[0.04] border border-[#D5573B]/40 space-y-4 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-full bg-[#D5573B]/10 text-[#D5573B] flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-fraunces text-2xl font-medium text-[#FAF7F2]">
          You&apos;re registered.
        </h3>
        <p className="text-sm text-[#94A3B8] leading-relaxed">
          We&apos;ve sent a confirmation email and calendar invite to{" "}
          <span className="text-[#FAF7F2] font-semibold">{formData.email}</span>. See you at{" "}
          <span className="text-[#FAF7F2] font-medium">{eventName}</span> on {dateTime}.
        </p>
        <p className="text-xs text-[#64748B] font-mono pt-2">
          Questions or need to modify your registration? Email us at hello@treel.in.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 rounded-lg bg-white/[0.03] border border-white/10 space-y-6 shadow-xl">
      <div className="space-y-1">
        <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
          ATTEND THIS EVENT
        </span>
        <h3 className="font-fraunces text-2xl font-medium text-[#FAF7F2]">
          Register for free
        </h3>
        <p className="text-xs text-[#94A3B8] leading-relaxed">
          Registration is complimentary. We&apos;ll send your access pass and calendar reminder.
        </p>
      </div>

      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <div>
          <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block mb-1.5">
            Full Name <span className="text-[#D5573B]">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="e.g. Ramesh Kumar"
            className="w-full px-3.5 py-2.5 rounded-md bg-[#141B22] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
          />
          {errors.fullName && <p className="text-xs text-[#D5573B] mt-1">{errors.fullName}</p>}
        </div>

        <div>
          <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block mb-1.5">
            Work Email <span className="text-[#D5573B]">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="name@company.com"
            className="w-full px-3.5 py-2.5 rounded-md bg-[#141B22] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
          />
          {errors.email && <p className="text-xs text-[#D5573B] mt-1">{errors.email}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block mb-1.5">
              Company
            </label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="e.g. Acme Logistics"
              className="w-full px-3.5 py-2.5 rounded-md bg-[#141B22] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block mb-1.5">
              Job Role
            </label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="e.g. Fleet Director"
              className="w-full px-3.5 py-2.5 rounded-md bg-[#141B22] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block mb-1.5">
            How did you hear about this event?
          </label>
          <select
            value={formData.source}
            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-md bg-[#141B22] border border-white/10 text-sm text-[#FAF7F2] focus:outline-none focus:border-[#D5573B] transition-colors"
          >
            <option value="Website">Treel Website</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Industry Association">Industry Association / Media</option>
            <option value="Colleague">Colleague or Partner</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#94A3B8]">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-0.5 rounded border-white/20 text-[#D5573B] focus:ring-[#D5573B]"
            />
            <span>
              I consent to Treel processing my registration and sending me event updates.
            </span>
          </label>
          {errors.consent && <p className="text-xs text-[#D5573B] mt-1">{errors.consent}</p>}
        </div>

        <div className="pt-2">
          <Button
            type="submit"
            variant="treel"
            disabled={isSubmitting}
            className="w-full py-3 text-sm font-semibold flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Registering...</span>
              </>
            ) : (
              <>
                <span>Complete Free Registration</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </Button>
        </div>

        <p className="text-[11px] text-[#64748B] text-center font-mono">
          We respect your privacy. No promotional spam.
        </p>
      </form>
    </div>
  );
}
