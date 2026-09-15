"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Phone, Mail, MessageSquare, CheckCircle2, ArrowRight, Clock, AlertTriangle } from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";
import { Button } from "@/components/ui/button";

export default function MaintenancePage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <TreelSignature variant="compact" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
                SYSTEM STATUS
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Scheduled <span className="italic font-normal text-[#D5573B]">Maintenance.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter">
              treel.in is currently undergoing scheduled platform upgrades and database routine maintenance. We will be back online shortly.
            </p>
          </div>
        </div>
      </section>

      {/* 2. NOTIFICATION FORM */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl rounded-xl border border-white/10 bg-[#0F1419] p-8 sm:p-10 space-y-6 shadow-xl">
            <div className="space-y-2">
              <h2 className="font-fraunces text-2xl font-medium text-[#FAF7F2]">
                Want us to email you when we&apos;re back?
              </h2>
              <p className="text-sm text-[#94A3B8]">
                Leave your work email address and we will automatically ping you the moment all services are restored.
              </p>
            </div>

            {submitted ? (
              <div className="p-4 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/30 flex items-center gap-3 text-[#FAF7F2]">
                <CheckCircle2 className="w-5 h-5 text-[#D5573B] shrink-0" />
                <span className="text-sm font-medium">
                  Thanks. We&apos;ll email you at <strong className="text-[#FAF7F2]">{email}</strong> as soon as we&apos;re back.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="flex-1 px-4 py-3 rounded-md bg-white/[0.04] border border-white/10 text-[#FAF7F2] placeholder-[#94A3B8] focus:outline-none focus:border-[#D5573B] text-sm"
                />
                <Button type="submit" variant="treel" disabled={isSubmitting} className="whitespace-nowrap">
                  {isSubmitting ? "Submitting..." : "Notify me"}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. URGENT SUPPORT */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-2">
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Urgent fleet support during maintenance
              </h2>
              <p className="text-sm text-[#94A3B8]">
                Vehicle telemetry ingestion continues unaffected. For operational emergency support, our fleet support team remains accessible 24/7.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">Toll-Free (India)</div>
                <div className="text-base font-semibold text-[#FAF7F2]">1800 833 0233</div>
                <div className="text-xs text-[#94A3B8]">Mon–Fri, 9 AM – 6 PM IST</div>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-3">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">WhatsApp Hotline</div>
                <div className="text-base font-semibold text-[#FAF7F2]">+91 91120 00174</div>
                <div className="text-xs text-[#94A3B8]">24/7 Emergency Support</div>
              </div>

              <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02] space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] mb-3">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-xs uppercase font-mono tracking-wider text-[#94A3B8]">Email Desk</div>
                <div className="text-base font-semibold text-[#FAF7F2]">hello@treel.in</div>
                <div className="text-xs text-[#94A3B8]">Priority ticket routing</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}