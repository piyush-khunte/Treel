"use client";

import React, { useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

export function EventSubscribeForm() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitting(true);
    try {
      await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "events_portal",
          interest: "Events & Announcements",
        }),
      });
    } catch (err) {
      console.warn("Event subscription request fallback", err);
    } finally {
      setSubmitting(false);
      setSubscribed(true);
    }
  };

  if (subscribed) {
    return (
      <div className="p-6 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/30 flex items-start gap-4 animate-in fade-in duration-300">
        <CheckCircle2 className="w-5 h-5 text-[#D5573B] mt-0.5 shrink-0" />
        <div className="space-y-1">
          <h4 className="font-fraunces text-base font-medium text-[#FAF7F2]">You&apos;re subscribed.</h4>
          <p className="text-xs text-[#94A3B8]">
            We&apos;ll notify <span className="text-white font-medium">{email}</span> whenever we schedule new events.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubscribe} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your work email"
          className="flex-1 px-4 py-3 rounded-md bg-[#141B22] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
        />
        <Button
          type="submit"
          variant="treel"
          disabled={submitting}
          className="px-6 py-3 font-semibold text-sm flex items-center justify-center gap-2"
        >
          <span>{submitting ? "Subscribing..." : "Subscribe"}</span>
          <Send className="w-3.5 h-3.5" />
        </Button>
      </div>
      <p className="text-[11px] text-[#64748B] font-mono">
        No spam. Event alerts only. Unsubscribe with one click anytime.
      </p>
    </form>
  );
}
