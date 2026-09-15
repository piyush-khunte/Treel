"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComingSoonFormProps {
  sectionTitle: string;
}

export function ComingSoonForm({ sectionTitle }: ComingSoonFormProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  if (isSubmitted) {
    return (
      <div className="p-6 sm:p-8 rounded-xl bg-[#D5573B]/10 border border-[#D5573B]/30 max-w-xl space-y-3 animate-in fade-in duration-300">
        <div className="flex items-center gap-2 text-[#D5573B]">
          <CheckCircle2 className="w-5 h-5" />
          <span className="font-semibold text-sm">Notification Registered</span>
        </div>
        <p className="text-sm text-[#FAF7F2]">
          Thank you. We&apos;ll notify <span className="font-mono text-[#D5573B] font-medium">{email}</span> as soon as <span className="font-semibold">{sectionTitle}</span> is officially released.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your work or personal email..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-black/40 border border-white/[0.12] text-[#FAF7F2] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#D5573B] transition-colors text-sm font-inter"
          />
        </div>
        <Button
          type="submit"
          variant="treel"
          disabled={isSubmitting}
          className="cursor-pointer whitespace-nowrap px-6"
        >
          {isSubmitting ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Registering...
            </>
          ) : (
            <>
              Notify Me <ArrowRight className="w-4 h-4 ml-1.5" />
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-[#94A3B8]">
        Zero spam. We only send notifications directly pertaining to this release.
      </p>
    </form>
  );
}
