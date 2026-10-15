"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Lock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Eye,
  Download,
  Loader2,
  FileText,
} from "lucide-react";
import { WhitepaperRecord } from "@/types/content";

interface WhitepaperAccessModalProps {
  paper: WhitepaperRecord | null;
  onClose: () => void;
  accentColor?: "blue" | "orange";
}

export function WhitepaperAccessModal({
  paper,
  onClose,
  accentColor = "blue",
}: WhitepaperAccessModalProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [fleetSize, setFleetSize] = useState("100-500");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(true);
  const [marketingConsent, setMarketingConsent] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [accessResult, setAccessResult] = useState<{
    token: string;
    viewUrl: string;
    downloadUrl: string;
    emailStatus: string;
    message: string;
  } | null>(null);

  const modalRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const isOrange = accentColor === "orange";
  const brandPrimary = isOrange ? "bg-[#D5573B] hover:bg-[#CB4831]" : "bg-[#3B82F6] hover:bg-[#2563EB]";
  const brandText = isOrange ? "text-[#D5573B]" : "text-[#3B82F6]";
  const brandBorder = isOrange ? "border-[#D5573B]/30" : "border-blue-500/30";
  const brandFocus = isOrange ? "focus:border-[#D5573B]" : "focus:border-[#3B82F6]";

  // Accessibility: store previously focused element & lock body scroll
  useEffect(() => {
    if (typeof document !== "undefined") {
      previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      // Focus modal container
      modalRef.current?.focus();

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
        previouslyFocusedElement.current?.focus();
      };
    }
  }, [onClose]);

  if (!paper) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const trimmedEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!fullName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }

    if (!company.trim()) {
      setFormError("Please enter your company or fleet organization.");
      return;
    }

    if (!consent) {
      setFormError("Please accept document delivery consent to receive your whitepaper.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/tmip/whitepapers/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          whitepaperId: paper._id,
          slug: paper.slug,
          email: trimmedEmail,
          fullName: fullName.trim(),
          company: company.trim(),
          fleetSize,
          phone: phone.trim(),
          consent,
          marketingConsent,
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
        });
      } else {
        setFormError(data.error || "Unable to grant document access. Please try again.");
      }
    } catch (err: any) {
      setFormError(err.message || "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="whitepaper-modal-title"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`relative w-full max-w-[620px] max-h-[min(92vh,700px)] flex flex-col bg-[#0B1220] border ${brandBorder} rounded-[6px] shadow-2xl overflow-hidden focus:outline-none`}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3 border-b border-slate-800/80 shrink-0">
          <div className="space-y-1 pr-6">
            <div className={`inline-flex items-center gap-1.5 text-[11px] font-mono ${brandText} uppercase font-semibold tracking-wider`}>
              <Lock className="w-3 h-3" />
              <span>Gated Industry Report · Instant Access</span>
            </div>
            <h2
              id="whitepaper-modal-title"
              className="font-space-grotesk text-lg sm:text-xl font-bold text-[#F1F5F9] leading-snug line-clamp-1"
            >
              {paper.title}
            </h2>
            <p className="text-[11px] sm:text-xs text-[#94A3B8] font-ibm-plex leading-normal line-clamp-1">
              Format: {paper.fileFormat} · {paper.length || "Complete Edition"} · {paper.topic || "Research"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="text-slate-400 hover:text-white p-1.5 rounded-[4px] hover:bg-slate-800/80 transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="overflow-y-auto px-5 py-4 space-y-4">
          {!accessResult ? (
            /* STAGE 1: B2B Lead Capture Form */
            <form onSubmit={handleSubmit} className="space-y-3.5 font-ibm-plex">
              {formError && (
                <div className="p-2.5 rounded-[3px] bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Two-Column Grid on Desktop: Name & Business Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-1">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rameshwar Patel"
                    className={`w-full px-3 py-2 rounded-[3px] bg-[#050A17] border border-slate-700/60 text-xs text-[#F1F5F9] placeholder-slate-500 focus:outline-none ${brandFocus}`}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-1">
                    Email <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className={`w-full px-3 py-2 rounded-[3px] bg-[#050A17] border border-slate-700/60 text-xs text-[#F1F5F9] placeholder-slate-500 focus:outline-none ${brandFocus}`}
                  />
                </div>
              </div>

              {/* Two-Column Grid on Desktop: Company Name & Fleet Size */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-1">
                    Company Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Patel Roadways"
                    className={`w-full px-3 py-2 rounded-[3px] bg-[#050A17] border border-slate-700/60 text-xs text-[#F1F5F9] placeholder-slate-500 focus:outline-none ${brandFocus}`}
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-1">
                    Fleet Size
                  </label>
                  <select
                    value={fleetSize}
                    onChange={(e) => setFleetSize(e.target.value)}
                    className={`w-full px-3 py-2 rounded-[3px] bg-[#050A17] border border-slate-700/60 text-xs text-[#F1F5F9] focus:outline-none ${brandFocus} cursor-pointer`}
                  >
                    <option value="10-50">10 – 50 Multi-Axle</option>
                    <option value="50-100">50 – 100 Multi-Axle</option>
                    <option value="100-500">100 – 500 Multi-Axle</option>
                    <option value="500-2000">500 – 2,000 Multi-Axle</option>
                    <option value="2000+">2,000+ Vehicles</option>
                    <option value="Not a fleet">Not a fleet operator</option>
                  </select>
                </div>
              </div>

              {/* Phone Number (Optional) */}
              <div>
                <label className="text-[11px] font-mono text-[#94A3B8] uppercase block mb-1">
                  Phone Number <span className="text-slate-500 font-normal lowercase">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98220 54321"
                  className={`w-full px-3 py-2 rounded-[3px] bg-[#050A17] border border-slate-700/60 text-xs text-[#F1F5F9] placeholder-slate-500 focus:outline-none ${brandFocus}`}
                />
              </div>

              {/* Consent Section: Compact & Readable */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#94A3B8] leading-snug">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded bg-[#050A17] border-slate-700 text-[#3B82F6] focus:ring-0 shrink-0"
                  />
                  <span>
                    I agree to receive the requested {paper.fileFormat} whitepaper and related research communications. <span className="text-rose-400">*</span>
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-[11px] sm:text-xs text-slate-400 leading-snug">
                  <input
                    type="checkbox"
                    checked={marketingConsent}
                    onChange={(e) => setMarketingConsent(e.target.checked)}
                    className="mt-0.5 rounded bg-[#050A17] border-slate-700 text-[#3B82F6] focus:ring-0 shrink-0"
                  />
                  <span>
                    (Optional) Keep me informed with monthly TMIP mobility intelligence notes.
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className={`w-full py-2.5 sm:py-3 px-5 rounded-[3px] ${brandPrimary} disabled:opacity-70 text-white font-semibold text-xs font-mono tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer`}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Validating &amp; Generating Access...</span>
                    </>
                  ) : (
                    <>
                      <span>Unlock &amp; Access Document</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* STAGE 2: Access Granted / View & Download Buttons */
            <div className="space-y-5 text-center py-2">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9]">
                  Access Granted
                </h3>
                <p className="text-xs text-[#94A3B8] font-ibm-plex max-w-sm mx-auto leading-relaxed">
                  {accessResult.message}
                </p>
              </div>

              <div className="p-3.5 rounded-[4px] bg-[#050A17] border border-blue-500/20 text-left space-y-1">
                <div className={`text-[11px] font-mono ${brandText} uppercase font-bold flex items-center gap-1.5`}>
                  <FileText className="w-3.5 h-3.5" />
                  <span>{paper.fileFormat} Document Ready</span>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-white line-clamp-2">
                  {paper.title}
                </div>
                <div className="text-[11px] font-mono text-slate-400">
                  Format: {paper.fileFormat} · {paper.length || "Complete Edition"}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                {paper.fileFormat?.toUpperCase() === "PDF" && (
                  <a
                    href={accessResult.viewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[3px] bg-white/[0.08] hover:bg-white/[0.15] border border-slate-700/60 text-white font-mono text-xs font-semibold transition-all"
                  >
                    <Eye className={`w-3.5 h-3.5 ${brandText}`} />
                    <span>View PDF Online</span>
                  </a>
                )}

                <a
                  href={accessResult.downloadUrl}
                  download
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[3px] ${brandPrimary} text-white font-mono text-xs font-semibold transition-all shadow-md`}
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {paper.fileFormat} File</span>
                </a>
              </div>

              <p className="text-[10px] text-slate-500 font-mono">
                Authenticated link valid for 48 hours for {email}.
              </p>

              <div className="pt-2 border-t border-slate-800/80">
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
