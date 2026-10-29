"use client";

import React, { useState } from "react";
import { CalendarPlus, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EventRegisterFormProps {
  eventName: string;
  eventSlug?: string;
  dateTime: string;
  location?: string;
  isOnline?: boolean;
  googleCalendarUrl?: string;
  outlookCalendarUrl?: string;
}

export function EventRegisterForm({
  eventName,
  eventSlug,
  dateTime,
  location,
  isOnline,
  googleCalendarUrl,
  outlookCalendarUrl,
}: EventRegisterFormProps) {
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
    setErrors({});
    try {
      const res = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName,
          eventSlug,
          dateTime,
          location,
          isOnline,
          fullName: formData.fullName,
          email: formData.email,
          company: formData.company,
          role: formData.role,
          googleCalendarUrl,
          outlookCalendarUrl,
        }),
      });

      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        setIsRegistered(true);
      } else {
        setErrors({ form: data?.error || "Registration could not be completed. Please try again." });
      }
    } catch {
      setErrors({ form: "Network error while connecting. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="p-8 rounded-lg bg-white/[0.04] border border-[#D5573B]/40 space-y-5 animate-in fade-in duration-300">
        <div className="w-12 h-12 rounded-full bg-[#D5573B]/10 text-[#D5573B] flex items-center justify-center">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-1">
          <h3 className="font-fraunces text-2xl font-medium text-[#FAF7F2]">
            You&apos;re registered.
          </h3>
          <p className="text-sm text-[#94A3B8] leading-relaxed">
            We&apos;ve dispatched a confirmation email from <span className="text-[#D5573B] font-mono">hello@treel.in</span> to{" "}
            <span className="text-[#FAF7F2] font-semibold">{formData.email}</span>. See you at{" "}
            <span className="text-[#FAF7F2] font-medium">{eventName}</span> on {dateTime}.
          </p>
        </div>

        {(googleCalendarUrl || outlookCalendarUrl) && (
          <div className="pt-2 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
              Add to your calendar
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {googleCalendarUrl && (
                <a
                  href={googleCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white/[0.06] border border-white/10 text-xs font-medium text-[#FAF7F2] hover:bg-white/10 hover:border-[#D5573B] transition-colors"
                >
                  <CalendarPlus className="w-4 h-4 text-[#D5573B]" />
                  <span>Google Calendar</span>
                </a>
              )}
              {outlookCalendarUrl && (
                <a
                  href={outlookCalendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white/[0.06] border border-white/10 text-xs font-medium text-[#FAF7F2] hover:bg-white/10 hover:border-[#D5573B] transition-colors"
                >
                  <CalendarPlus className="w-4 h-4 text-[#D5573B]" />
                  <span>Outlook Calendar</span>
                </a>
              )}
            </div>
          </div>
        )}

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
          Registration is complimentary. We&apos;ll send your access pass and calendar reminder from hello@treel.in.
        </p>
      </div>

      {errors.form && (
        <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-xs text-red-400">
          {errors.form}
        </div>
      )}

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
            placeholder="e.g. ramesh@logistics-corp.com"
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
              placeholder="e.g. National Freight"
              className="w-full px-3.5 py-2.5 rounded-md bg-[#141B22] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider block mb-1.5">
              Job Title / Role
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

        <div className="pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 rounded bg-[#141B22] border-white/20 text-[#D5573B] focus:ring-0 focus:ring-offset-0 cursor-pointer"
            />
            <span className="text-xs text-[#94A3B8] leading-relaxed">
              I agree to receive event access details, session recordings, and mobility intelligence updates from Treel. Unsubscribe anytime.
            </span>
          </label>
          {errors.consent && <p className="text-xs text-[#D5573B] mt-1">{errors.consent}</p>}
        </div>

        <Button
          type="submit"
          variant="treel"
          disabled={isSubmitting}
          className="w-full py-3 font-semibold text-sm flex items-center justify-center gap-2 mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Registering...</span>
            </>
          ) : (
            <>
              <span>Reserve My Seat</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
