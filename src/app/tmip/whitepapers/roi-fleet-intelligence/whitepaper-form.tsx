"use client";

import { useState } from "react";
import { CheckCircle2, Lock, ArrowRight, AlertCircle, Eye, Download } from "lucide-react";

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [accessResult, setAccessResult] = useState<{
    token: string;
    viewUrl: string;
    downloadUrl: string;
    emailStatus: string;
    message: string;
    format: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.fullName.trim() || !formData.email.trim() || !formData.company.trim()) {
      setError("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setError("Please provide a valid email address.");
      return;
    }

    if (!formData.consent) {
      setError("Please agree to receive the whitepaper and research communications.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/tmip/whitepapers/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: "roi-fleet-intelligence",
          email: formData.email.trim().toLowerCase(),
          fullName: formData.fullName.trim(),
          company: formData.company.trim(),
          phone: formData.phone.trim(),
          fleetSize: formData.fleetSize,
          consent: formData.consent,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setAccessResult({
          token: data.token,
          viewUrl: data.viewUrl,
          downloadUrl: data.downloadUrl,
          emailStatus: data.emailStatus,
          message: data.message,
          format: data.whitepaper?.fileFormat || "PDF",
        });
        setSubmitted(true);
      } else {
        setError(data.error || "Unable to grant document access. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to process document request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted && accessResult) {
    return (
      <div className="rounded-[4px] border border-blue-500/30 bg-[#0B1220] p-8 text-center space-y-6">
        <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h3 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9]">Access Granted</h3>
          <p className="text-sm text-[#94A3B8] max-w-md mx-auto leading-relaxed font-ibm-plex">
            {accessResult.message}
          </p>
        </div>

        <div className="p-4 rounded-[4px] bg-[#050A17] border border-blue-500/20 text-left space-y-1 max-w-md mx-auto">
          <div className="text-xs font-jetbrains text-[#3B82F6] uppercase font-bold">
            {accessResult.format} Document Ready
          </div>
          <div className="text-sm font-semibold text-white">
            The Fleet ROI Paper — How TMIP customers reach payback in nine months
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Format: {accessResult.format} · 28 pages
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {accessResult.format.toUpperCase() === "PDF" && (
            <a
              href={accessResult.viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] bg-white/[0.08] hover:bg-white/[0.15] border border-slate-400/20 text-white font-jetbrains text-xs font-semibold transition-all"
            >
              <Eye className="w-4 h-4 text-[#3B82F6]" />
              <span>View PDF in Browser</span>
            </a>
          )}
          <a
            href={accessResult.downloadUrl}
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[3px] bg-[#3B82F6] hover:bg-[#2563EB] text-white font-jetbrains text-xs font-semibold transition-all shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download {accessResult.format} File</span>
          </a>
        </div>

        <p className="text-[11px] text-slate-500 font-jetbrains">
          Authenticated link valid for 48 hours. If you requested email delivery, check your inbox at{" "}
          <strong className="text-slate-300 font-normal">{formData.email}</strong>.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[4px] border border-slate-400/10 bg-[#0B1220]/80 p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-2 text-xs font-jetbrains text-[#3B82F6] uppercase tracking-wider mb-3 font-semibold">
        <Lock className="w-3.5 h-3.5" />
        <span>Gated Industry Report · Instant Access</span>
      </div>
      <h3 className="font-space-grotesk text-2xl font-bold text-[#F1F5F9] mb-2">Unlock the full paper</h3>
      <p className="text-sm text-[#94A3B8] mb-6 leading-relaxed font-ibm-plex">
        Enter your details to receive the complete whitepaper by email. No spam. Unsubscribe anytime.
      </p>

      {error && (
        <div className="mb-6 p-3.5 rounded-[3px] bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-300">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-jetbrains text-[#94A3B8] mb-1.5 uppercase tracking-wide">
            Full name <span className="text-[#3B82F6]">*</span>
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Rajesh Sharma"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2.5 rounded-[3px] bg-[#050A17] border border-slate-400/20 text-sm text-[#F1F5F9] placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
          />
        </div>

        <div>
          <label className="block text-xs font-jetbrains text-[#94A3B8] mb-1.5 uppercase tracking-wide">
            Email <span className="text-[#3B82F6]">*</span>
          </label>
          <input
            type="email"
            required
            placeholder="name@company.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-[3px] bg-[#050A17] border border-slate-400/20 text-sm text-[#F1F5F9] placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
          />
          <p className="text-[11px] text-[#64748B] mt-1 font-ibm-plex">We will send document access instructions to this email address.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-jetbrains text-[#94A3B8] mb-1.5 uppercase tracking-wide">
              Company <span className="text-[#3B82F6]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Apex Logistics"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-2.5 rounded-[3px] bg-[#050A17] border border-slate-400/20 text-sm text-[#F1F5F9] placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-jetbrains text-[#94A3B8] mb-1.5 uppercase tracking-wide">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2.5 rounded-[3px] bg-[#050A17] border border-slate-400/20 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
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
            <label className="block text-xs font-jetbrains text-[#94A3B8] mb-1.5 uppercase tracking-wide">
              Phone <span className="text-[#64748B]">(Optional)</span>
            </label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-2.5 rounded-[3px] bg-[#050A17] border border-slate-400/20 text-sm text-[#F1F5F9] placeholder-slate-500 focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div>
            <label className="block text-xs font-jetbrains text-[#94A3B8] mb-1.5 uppercase tracking-wide">
              Fleet size <span className="text-[#64748B]">(Optional)</span>
            </label>
            <select
              value={formData.fleetSize}
              onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
              className="w-full px-4 py-2.5 rounded-[3px] bg-[#050A17] border border-slate-400/20 text-sm text-[#F1F5F9] focus:outline-none focus:border-[#3B82F6]"
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
              className="mt-1 rounded border-slate-400/30 bg-[#050A17] text-[#3B82F6] focus:ring-[#3B82F6]"
            />
            <span className="text-xs text-[#94A3B8] leading-relaxed font-ibm-plex">
              I agree to receive the requested whitepaper and periodic intelligence research updates from Treel. I can
              unsubscribe at any time.
            </span>
          </label>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 px-6 rounded-[3px] font-semibold text-sm transition-all shadow-md bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-blue-800 text-white flex items-center justify-center gap-2 cursor-pointer"
          >
            {submitting ? (
              <span>Verifying &amp; Unlocking...</span>
            ) : (
              <>
                <span>Download full paper (PDF)</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
