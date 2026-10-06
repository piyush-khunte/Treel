"use client";

import React, { useState, useEffect } from "react";
import { Sliders, ShieldCheck, Check, AlertCircle, Trash2 } from "lucide-react";
import {
  getStoredConsent,
  saveConsentPreference,
  withdrawAllConsent,
  ACCEPTED_ALL_CATEGORIES,
  DEFAULT_CATEGORIES,
  ConsentCategories,
  StoredConsent,
} from "@/lib/privacy/cookie-consent";

export function CookiePreferencesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentConsent, setCurrentConsent] = useState<StoredConsent | null>(null);
  const [preferences, setPreferences] = useState<ConsentCategories>(DEFAULT_CATEGORIES);
  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) {
      setCurrentConsent(stored);
      setPreferences(stored.categories);
    }

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<StoredConsent>;
      if (customEvent.detail) {
        setCurrentConsent(customEvent.detail);
        setPreferences(customEvent.detail.categories);
      }
    };

    window.addEventListener("treel_consent_updated", handleUpdate);
    return () => {
      window.removeEventListener("treel_consent_updated", handleUpdate);
    };
  }, []);

  const handleSave = (customPrefs?: ConsentCategories) => {
    const toSave = customPrefs || preferences;
    const result = saveConsentPreference("customized", toSave, "update");
    setCurrentConsent(result);
    setSavedMessage("Cookie preferences saved successfully.");
    setTimeout(() => setSavedMessage(null), 4000);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    const result = saveConsentPreference("accepted", ACCEPTED_ALL_CATEGORIES, "consent");
    setCurrentConsent(result);
    setPreferences(ACCEPTED_ALL_CATEGORIES);
    setSavedMessage("All cookie categories accepted.");
    setTimeout(() => setSavedMessage(null), 4000);
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    const result = saveConsentPreference("rejected", DEFAULT_CATEGORIES, "consent");
    setCurrentConsent(result);
    setPreferences(DEFAULT_CATEGORIES);
    setSavedMessage("Non-essential cookies rejected. Essential cookies remain active.");
    setTimeout(() => setSavedMessage(null), 4000);
    setIsOpen(false);
  };

  const handleWithdraw = () => {
    const result = withdrawAllConsent();
    setCurrentConsent(result);
    setPreferences(DEFAULT_CATEGORIES);
    setSavedMessage("Consent withdrawn. Non-essential tracking cookies cleared.");
    setTimeout(() => setSavedMessage(null), 4000);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831] focus:outline-none focus:ring-2 focus:ring-[#D5573B] focus:ring-offset-2 focus:ring-offset-[#0F1419] cursor-pointer"
          >
            <Sliders className="w-4 h-4" />
            Manage cookie preferences
          </button>

          {currentConsent && currentConsent.status !== "withdrawn" && (
            <button
              type="button"
              onClick={handleWithdraw}
              className="inline-flex items-center gap-2 px-4 py-3.5 rounded-[4px] font-semibold text-xs transition-all border border-white/20 text-[#94A3B8] hover:text-rose-400 hover:border-rose-400/40 hover:bg-rose-500/10 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Withdraw Consent
            </button>
          )}
        </div>

        {/* Current status display badge */}
        {currentConsent && (
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/[0.08] text-xs space-y-1 font-mono text-[#94A3B8]">
            <div className="flex items-center justify-between">
              <span>Current Status:</span>
              <span className="capitalize font-bold text-[#FAF7F2]">{currentConsent.status}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span>Consent ID:</span>
              <span className="text-[#D5573B]">{currentConsent.consentId}</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span>Active Categories:</span>
              <span className="text-[#FAF7F2]">
                {[
                  "Necessary",
                  currentConsent.categories.functional ? "Functional" : null,
                  currentConsent.categories.analytics ? "Analytics" : null,
                  currentConsent.categories.marketing ? "Marketing" : null,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </span>
            </div>
          </div>
        )}

        {savedMessage && (
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#D5573B] bg-[#D5573B]/10 border border-[#D5573B]/20 px-3.5 py-2 rounded-lg animate-in fade-in">
            <Check className="w-4 h-4" />
            {savedMessage}
          </div>
        )}
      </div>

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-xl bg-[#141B22] border border-white/[0.08] rounded-lg p-6 sm:p-8 shadow-2xl space-y-6 text-[#FAF7F2]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="text-[#D5573B] font-mono text-xs uppercase tracking-widest font-semibold mb-1">
                  CONSENT MANAGEMENT
                </div>
                <h3 id="cookie-modal-title" className="font-fraunces text-2xl font-medium text-[#FAF7F2] leading-[1.12]">
                  Manage Cookie Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[#94A3B8] hover:text-white text-sm p-1 rounded-md hover:bg-white/10"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="text-[#94A3B8] text-sm leading-relaxed font-inter">
              Configure which categories of cookies and telemetry you authorize during your visits to treel.in. Strictly necessary cookies remain active to provide essential security and cart functions.
            </p>

            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-1">
              {/* Strictly Necessary */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#FAF7F2]">Strictly Necessary Cookies</span>
                    <span className="text-[10px] font-mono uppercase bg-[#D5573B]/20 text-[#D5573B] px-2 py-0.5 rounded">Always Active</span>
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    Essential for session preservation, shopping cart checkout, and digital consent compliance.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled={true}
                  className="w-4 h-4 rounded text-[#D5573B] opacity-60 cursor-not-allowed"
                />
              </div>

              {/* Functional */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <div className="space-y-1 pr-4">
                  <span className="font-semibold text-sm text-[#FAF7F2]">Functional Cookies</span>
                  <p className="text-xs text-[#94A3B8]">
                    Remembers language, regional settings, and pre-fills form fields for returning visitors.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.functional}
                  onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                  className="w-4 h-4 rounded text-[#D5573B] focus:ring-[#D5573B] cursor-pointer"
                />
              </div>

              {/* Analytics */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <div className="space-y-1 pr-4">
                  <span className="font-semibold text-sm text-[#FAF7F2]">Analytics &amp; Telemetry</span>
                  <p className="text-xs text-[#94A3B8]">
                    Aggregated usage metrics (Google Analytics, Microsoft Clarity) to optimize platform responsiveness.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                  className="w-4 h-4 rounded text-[#D5573B] focus:ring-[#D5573B] cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <div className="space-y-1 pr-4">
                  <span className="font-semibold text-sm text-[#FAF7F2]">Marketing &amp; Campaign Attribution</span>
                  <p className="text-xs text-[#94A3B8]">
                    Attribution tags (Meta, Google Ads, LinkedIn) to evaluate relevant campaigns.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                  className="w-4 h-4 rounded text-[#D5573B] focus:ring-[#D5573B] cursor-pointer"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleRejectAll}
                  className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-[#94A3B8] hover:text-white border border-white/15 rounded-[4px] hover:bg-white/5 cursor-pointer"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-[#FAF7F2] bg-white/10 rounded-[4px] hover:bg-white/20 cursor-pointer"
                >
                  Accept All
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleSave()}
                className="w-full sm:w-auto px-6 py-2 text-xs font-semibold bg-[#D5573B] text-[#FAF7F2] rounded-[4px] hover:bg-[#CB4831] cursor-pointer"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
