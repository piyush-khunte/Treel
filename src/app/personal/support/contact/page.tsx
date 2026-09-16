"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  Send, 
  Paperclip, 
  ShieldCheck,
  ArrowRight
} from "lucide-react";

export default function PersonalSupportContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [category, setCategory] = useState("Setup / installation");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Standard — 2 business days");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !description.trim()) {
      setError("Please complete all required fields (Name, Email, and Description).");
      return;
    }
    if (!consent) {
      setError("Please consent to support inquiry processing to continue.");
      return;
    }
    setError("");
    const randomTicket = `TCK-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(randomTicket);
    setSubmitted(true);
  };

  const contactOptions = [
    {
      icon: Mail,
      title: "Email",
      desc: "Fill out the form below. We respond within 2 business days.",
      badge: "Written Inquiry"
    },
    {
      icon: Phone,
      title: "Toll-free",
      desc: "1800 833 0233",
      timing: "Monday to Friday, 9:00 AM to 6:00 PM IST",
      badge: "Direct Phone"
    },
    {
      icon: MessageSquare,
      title: "Chat with Treel",
      desc: "Use the chat widget (bottom-right) for quick answers to common questions.",
      badge: "Quick Answers"
    }
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="personal"
              items={[
                { label: "Personal TPMS", href: "/personal" },
                { label: "Support", href: "/personal/support" },
                { label: "Contact" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em] inline-block">
              CONTACT SUPPORT
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
              Reach our support team.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              Response within 2 business days by email. Faster by phone during business hours.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Channels Grid */}
      <section className="py-16 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactOptions.map((opt, idx) => {
              const IconComp = opt.icon;
              return (
                <div key={idx} className="p-8 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-wider bg-black/[0.04] px-2 py-0.5 rounded-full">
                        {opt.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#111827]">{opt.title}</h3>
                    <p className="text-sm text-[#374151] font-medium">{opt.desc}</p>
                  </div>

                  {opt.timing && (
                    <div className="pt-2 text-xs text-[#6B7280] font-normal">
                      {opt.timing}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Form Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-black/[0.06] shadow-xl space-y-8">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827]">
                    Send a support inquiry
                  </h2>
                  <p className="text-[#4B5563] text-sm mt-1">
                    Provide the details below and our customer engineering team will get back to you.
                  </p>
                </div>

                {error && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 font-medium">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2">
                      Order Number (Optional)
                    </label>
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="e.g. TR-12345"
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2">
                      Issue Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                    >
                      <option value="Setup / installation">Setup / installation</option>
                      <option value="Sensor not working">Sensor not working</option>
                      <option value="App issue">App issue</option>
                      <option value="Alert configuration">Alert configuration</option>
                      <option value="Warranty claim">Warranty claim</option>
                      <option value="Order / delivery question">Order / delivery question</option>
                      <option value="Billing question">Billing question</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    maxLength={2000}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please describe what's happening in detail. If you can include screenshots, that helps us diagnose faster."
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <div className="text-[11px] text-[#9CA3AF] text-right mt-1">
                    {description.length}/2000 characters
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#374151] uppercase tracking-wider mb-2">
                    Priority Level
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-black/[0.12] text-sm font-medium text-[#111827] focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
                  >
                    <option value="Not urgent — reply when you can">Not urgent — reply when you can</option>
                    <option value="Standard — 2 business days">Standard — 2 business days</option>
                    <option value="Urgent — same day if possible">Urgent — same day if possible</option>
                  </select>
                </div>

                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-black/[0.12] text-[#2563EB] focus:ring-blue-500 cursor-pointer"
                  />
                  <label htmlFor="consent" className="text-xs text-[#4B5563] cursor-pointer leading-relaxed">
                    I consent to Treel processing my support inquiry. See <Link href="/privacy" className="text-[#2563EB] underline">Privacy Policy</Link>.
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#2563EB] text-white font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" /> Send to support →
                </button>
              </form>
            ) : (
              <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#059669] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold font-mono">
                  Ticket ID: {ticketId}
                </div>
                <h3 className="text-2xl font-bold text-[#111827]">Support ticket submitted.</h3>
                <p className="text-sm text-[#4B5563] leading-relaxed max-w-md mx-auto">
                  We've emailed a confirmation to <strong>{email}</strong>. Response time: <strong>{priority}</strong>. If your issue is urgent, call us at <strong>1800 833 0233</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setName("");
                      setEmail("");
                      setOrderNumber("");
                      setDescription("");
                      setConsent(false);
                    }}
                    className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
