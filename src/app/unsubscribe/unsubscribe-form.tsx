"use client";

import { useState } from "react";
import { Check, CheckCircle2, AlertCircle, ShieldAlert, RefreshCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PreferenceOption {
  id: string;
  label: string;
  description: string;
}

const PREFERENCE_OPTIONS: PreferenceOption[] = [
  {
    id: "product_updates",
    label: "Product Updates",
    description: "New features, sensor firmware releases, capability launches, and technical platform news.",
  },
  {
    id: "insights",
    label: "Insights & Thought Leadership",
    description: "Monthly editorial covering mobility intelligence, tyre telematics, and commercial fleet economics.",
  },
  {
    id: "whitepapers",
    label: "Whitepapers & Research",
    description: "Notified whenever our research teams publish new engineering benchmarks and telematics papers.",
  },
  {
    id: "events",
    label: "Events & Industry Keynotes",
    description: "Upcoming industry summits, OEM expos, and technical webinars featuring Treel engineering leads.",
  },
  {
    id: "marketing",
    label: "Consumer Offers & Promotions",
    description: "Special seasonal discounts and offers for Personal TPMS consumer kits.",
  },
];

const TRANSACTIONAL_NOTICES = [
  "Hardware order confirmations and purchase invoices",
  "Shipment tracking and logistics delivery updates",
  "Warranty registrations, hardware claims, and RMA updates",
  "Security alerts, password verifications, and compliance notices",
];

export function UnsubscribeForm() {
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    product_updates: true,
    insights: true,
    whitepapers: true,
    events: false,
    marketing: false,
  });

  const [emailInput, setEmailInput] = useState("");
  const [savedStatus, setSavedStatus] = useState<"idle" | "saved" | "unsubscribed_all">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUnsubscribeModal, setShowUnsubscribeModal] = useState(false);

  const togglePreference = (id: string) => {
    setPreferences((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
    if (savedStatus !== "idle") setSavedStatus("idle");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSavedStatus("saved");
    }, 600);
  };

  const handleUnsubscribeAll = () => {
    setIsSubmitting(true);
    setShowUnsubscribeModal(false);
    setTimeout(() => {
      setPreferences({
        product_updates: false,
        insights: false,
        whitepapers: false,
        events: false,
        marketing: false,
      });
      setIsSubmitting(false);
      setSavedStatus("unsubscribed_all");
    }, 600);
  };

  return (
    <div className="space-y-12">
      {savedStatus === "saved" && (
        <div className="p-5 rounded-xl bg-[#D5573B]/10 border border-[#D5573B]/30 flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#D5573B] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[#FAF7F2]">Preferences Successfully Saved</h4>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              Your email communication preferences have been updated. Changes will propagate through our delivery systems within 24 hours.
            </p>
          </div>
        </div>
      )}

      {savedStatus === "unsubscribed_all" && (
        <div className="p-5 rounded-xl bg-white/[0.04] border border-white/[0.12] flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#D5573B] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-semibold text-[#FAF7F2]">You have been unsubscribed from all marketing emails</h4>
            <p className="text-xs sm:text-sm text-[#94A3B8]">
              You will no longer receive marketing communications, announcements, or editorial dispatches. Essential transactional emails related to your hardware or orders will still be delivered.
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        <div className="p-6 sm:p-8 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-6">
          <div>
            <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-[#94A3B8] mb-2 font-medium">
              Registered Work or Personal Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="e.g. yourname@company.com"
              className="w-full max-w-md px-4 py-3 rounded-lg bg-black/40 border border-white/[0.12] text-[#FAF7F2] placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#D5573B] transition-colors text-sm font-inter"
            />
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] mb-2">
              Subscription Channels
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] mb-6">
              Select which categories of updates you would like to receive in your inbox:
            </p>

            <div className="space-y-4">
              {PREFERENCE_OPTIONS.map((option) => {
                const isChecked = !!preferences[option.id];
                return (
                  <label
                    key={option.id}
                    onClick={() => togglePreference(option.id)}
                    className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                      isChecked
                        ? "bg-[#D5573B]/[0.06] border-[#D5573B]/40 text-[#FAF7F2]"
                        : "bg-white/[0.01] border-white/[0.06] text-[#94A3B8] hover:border-white/[0.12]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded mt-0.5 flex items-center justify-center border transition-all ${
                        isChecked
                          ? "bg-[#D5573B] border-[#D5573B] text-[#FAF7F2]"
                          : "border-white/30 bg-black/40"
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <div className="space-y-1 select-none">
                      <div className="text-sm font-medium text-[#FAF7F2]">
                        {option.label}
                      </div>
                      <div className="text-xs text-[#94A3B8] leading-relaxed">
                        {option.description}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
            <Button
              type="submit"
              variant="treel"
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> Saving Preferences...
                </>
              ) : (
                <>Save Preferences</>
              )}
            </Button>

            <button
              type="button"
              onClick={() => setShowUnsubscribeModal(true)}
              className="text-xs font-mono tracking-wider uppercase text-[#94A3B8] hover:text-[#D5573B] underline underline-offset-4 transition-colors cursor-pointer"
            >
              Unsubscribe from all communications
            </button>
          </div>
        </div>
      </form>

      {/* Transactional Notice */}
      <div className="p-6 sm:p-8 rounded-xl bg-white/[0.01] border border-white/[0.06] space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#94A3B8]">
          <ShieldAlert className="w-4 h-4 text-[#D5573B]" /> Essential Transactional Notifications
        </div>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          Regardless of your marketing preferences, you will continue to receive critical operational communications required for security and service fulfillment:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          {TRANSACTIONAL_NOTICES.map((item) => (
            <li key={item} className="flex items-center gap-2 text-xs text-[#94A3B8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D5573B] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Unsubscribe Confirmation Modal */}
      {showUnsubscribeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="max-w-md w-full p-6 sm:p-8 rounded-2xl bg-[#0F1419] border border-white/[0.12] shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                <AlertCircle className="w-5 h-5" />
              </div>
              <button
                onClick={() => setShowUnsubscribeModal(false)}
                className="text-[#94A3B8] hover:text-[#FAF7F2] transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="font-fraunces text-2xl font-medium text-[#FAF7F2]">
                Unsubscribe from all updates?
              </h3>
              <p className="text-sm text-[#94A3B8] leading-relaxed">
                You will stop receiving all product announcements, engineering research whitepapers, and mobility insights. You can re-subscribe at any time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="treel"
                onClick={handleUnsubscribeAll}
                className="w-full justify-center cursor-pointer"
              >
                Yes, Unsubscribe All
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setShowUnsubscribeModal(false)}
                className="w-full justify-center text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/[0.05] cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
