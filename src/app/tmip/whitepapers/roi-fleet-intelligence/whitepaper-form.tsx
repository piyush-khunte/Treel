"use client";

import { useState } from "react";
import { CheckCircle2, Lock, ArrowRight, AlertCircle } from "lucide-react";

export function WhitepaperForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    role: "Fleet Operations Director",
    phone: "",
    fleetSize: "100-500",
    consent: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const freeEmailDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
    "icloud.com",
    "aol.com",
    "rediffmail.com",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.company.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    const domain = formData.email.split("@")[1]?.toLowerCase();
    if (domain && freeEmailDomains.includes(domain)) {
      setError("Please provide a business work email (free email domains are not accepted).");
      return;
    }

    if (!formData.consent) {
      setError("Please agree to receive the whitepaper and research communications.");
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-[#10B981]/30 bg-[#0B1220] p-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 flex items-center justify-center text-[#10B981] mx-auto">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-space text-2xl font-bold text-[#F1F5F9]">Check your inbox.</h3>
        <p className="text-sm sm:text-base text-[#94A3B8] max-w-md mx-auto leading-relaxed">
          We&apos;ve emailed the full 28-page whitepaper to <strong className="text-[#F1F5F9]">{formData.email}</strong>. If you
          don&apos;t see it in a few minutes, check your spam folder.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-[#0B1220] p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-2 text-xs font-mono text-[#3B82F6] uppercase tracking-wider mb-3">
        <Lock className="w-3.5 h-3.5" />
        <span>Gated Industry Report · Instant Access</span>
      </div>
      <h3 className="font-space text-2xl font-bold text-[#F1F5F9] mb-2">Unlock the full paper</h3>
      <p className="text-sm text-[#94A3B8] mb-6 leading-relaxed">
        Enter your details to receive the complete whitepaper by email. No spam. Unsubscribe anytime.
      </p>

      {error && (
        <div className="mb-6 p-3.5 rounded-lg bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 uppercase tracking-wide">
            Full name <span className="text-[#3B82F6]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rajesh Sharma"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-[#050A17] border border-white/10 text-sm text-[#F1F5F9] placeholder-white/20 focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div>
          <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 uppercase tracking-wide">
            Work email <span className="text-[#3B82F6]">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg bg-[#050A17] border border-white/10 text-sm text-[#F1F5F9] placeholder-white/20 focus:outline-none focus:border-[#3B82F6]"
          />
          <p className="text-[11px] text-[#64748B] mt-1">Please use your business email address.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 uppercase tracking-wide">
              Company <span className="text-[#3B82F6]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Logistics"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#050A17] border border-white/10 text-sm text-[#F1F5F9] placeholder-white/20 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 uppercase tracking-wide">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#050A17] border border-white/10 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 uppercase tracking-wide">
              Phone <span className="text-[#64748B]">(Optional)</span>
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#050A17] border border-white/10 text-sm text-[#F1F5F9] placeholder-white/20 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-[#94A3B8] mb-1.5 uppercase tracking-wide">
              Fleet size <span className="text-[#64748B]">(Optional)</span>
            </label>
            <select
              value={formData.fleetSize}
              onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg bg-[#050A17] border border-white/10 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="Under 25">Under 25</option>
              <option value="25-100">25-100</option>
              <option value="100-500">100-500</option>
              <option value="500+">500+</option>
              <option value="Not a fleet">Not a fleet</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={formData.consent}
              onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
              className="mt-1 rounded border-white/20 bg-[#050A17] text-[#3B82F6] focus:ring-[#3B82F6]"
            />
            <span className="text-xs text-[#94A3B8] leading-relaxed">
              I agree to receive the requested whitepaper and periodic intelligence research updates from Treel. I can
              unsubscribe at any time.
            </span>
          </label>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            className="w-full py-3 px-6 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#3B82F6] text-white hover:bg-[#2563EB] flex items-center justify-center gap-2"
          >
            Download full paper (PDF) <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
