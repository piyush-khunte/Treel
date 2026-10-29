"use client";

import React, { useState } from "react";
import { Send, Loader2, CheckCircle2, AlertCircle, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const SUPPORT_PURPOSES = [
  "Technical Support & Sensor Diagnostics",
  "Product Installation Assistance",
  "Order & Shipment Tracking",
  "Warranty Registration & Claims",
  "General Inquiries & Feedback",
];

export function SupportClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [purpose, setPurpose] = useState(SUPPORT_PURPOSES[0]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!message.trim()) {
      setError("Please describe your issue or inquiry.");
      return;
    }

    if (phone.trim()) {
      const cleanPhone = phone.replace(/\D/g, "");
      if (cleanPhone.length !== 10 || !/^[6-9]\d{9}$/.test(cleanPhone)) {
        setError("Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.");
        return;
      }
    }



    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          subject: purpose,
          message: message.trim(),
          landing_page: typeof window !== "undefined" ? window.location.href : "https://treel.in/support",
          page_path: "/support",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit support request. Please try again.");
      }

      setTicketId(data.ticketId || data.leadId || null);
      setSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-8 sm:p-12 rounded-xl bg-[#141B22] border border-white/10 text-center space-y-5">
        <div className="w-14 h-14 rounded-full bg-[#059669]/10 border border-[#059669]/30 flex items-center justify-center text-[#059669] mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
          Thank you for reaching out to TREEL Support.
        </h3>
        <p className="text-[#94A3B8] max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
          We&apos;ve received your request and dispatched an acknowledgement to{" "}
          <strong className="text-white">{email}</strong>. Our support engineering team will review your inquiry and follow up promptly.
        </p>
        {ticketId && (
          <div className="inline-block px-4 py-2 rounded bg-white/5 border border-white/10 font-mono text-xs text-[#D5573B]">
            Support Reference: {ticketId}
          </div>
        )}
        <div className="pt-4">
          <Button
            variant="outline"
            onClick={() => {
              setSubmitted(false);
              setName("");
              setEmail("");
              setPhone("");
              setMessage("");
              setTicketId(null);
            }}
            className="text-xs font-mono uppercase tracking-wider"
          >
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Support Form */}
      <div className="lg:col-span-7 bg-[#141B22] border border-white/10 rounded-xl p-6 sm:p-10 space-y-6">
        <div className="space-y-2">
          <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
            Mr. TREEL Customer Support
          </h2>
          <p className="text-sm text-[#94A3B8]">
            Need help with your TPMS kit, sensor pairing, warranty, or delivery? Send us your message below.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-3 text-sm text-rose-300">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
              Full Name <span className="text-[#D5573B]">*</span>
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Vikramaditya Sharma"
              className="w-full px-4 py-3 rounded-lg bg-[#0F1419] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                Email Address <span className="text-[#D5573B]">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full px-4 py-3 rounded-lg bg-[#0F1419] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                pattern="[0-9]{10}"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10-digit mobile number"
                className="w-full px-4 py-3 rounded-lg bg-[#0F1419] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
              Purpose / Category <span className="text-[#D5573B]">*</span>
            </label>
            <div className="space-y-2">
              {SUPPORT_PURPOSES.map((item) => (
                <label
                  key={item}
                  className={`flex items-center gap-3 p-3 rounded-lg border text-sm cursor-pointer transition-colors ${
                    purpose === item
                      ? "bg-[#D5573B]/10 border-[#D5573B]/40 text-white"
                      : "bg-[#0F1419] border-white/5 text-[#94A3B8] hover:border-white/15"
                  }`}
                >
                  <input
                    type="radio"
                    name="purpose"
                    value={item}
                    checked={purpose === item}
                    onChange={() => setPurpose(item)}
                    className="accent-[#D5573B]"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
              Message / Description <span className="text-[#D5573B]">*</span>
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Please provide order details, kit serial number, or a description of your issue..."
              className="w-full px-4 py-3 rounded-lg bg-[#0F1419] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
            />
          </div>

          <Button
            type="submit"
            variant="treel"
            disabled={loading}
            className="w-full py-4 text-base font-semibold flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Sending Request...</span>
              </>
            ) : (
              <>
                <span>Submit Support Request</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </Button>
        </form>
      </div>

      {/* Direct Contact Information Cards */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-[#141B22] border border-white/10 rounded-xl p-8 space-y-6">
          <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">Direct Helpline</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">Toll-Free Helpline</p>
                <a href="tel:18008330233" className="text-lg font-bold text-white hover:text-[#D5573B] transition-colors">
                  1800 833 0233
                </a>
                <p className="text-xs text-[#94A3B8] mt-0.5">Mon–Sat, 9:00 AM – 6:30 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">Email Desk</p>
                <a href="mailto:hello@treel.in" className="text-base font-medium text-white hover:text-[#D5573B] transition-colors">
                  hello@treel.in
                </a>
                <p className="text-xs text-[#94A3B8] mt-0.5">Avg response time: at earliest</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">Headquarters</p>
                <p className="text-sm text-[#FAF7F2] leading-relaxed mt-0.5">
                  Treel Mobility Solutions Private Limited<br />
                  S.No.6/1B, 6/4, 7/4, Laxmi Vishnupuram Amenities,<br />
                  NDA Road, Vill. Shivane, Pune, Maharashtra 411023
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-[#141B22] to-[#1A232C] border border-white/10 space-y-3">
          <h4 className="text-sm font-semibold text-white">Need Installation Support?</h4>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Our certified Tyre Care Centers across India provide professional mounting, valve stem replacement, and calibration for trucks, fleets, and passenger cars.
          </p>
        </div>
      </div>
    </div>
  );
}
