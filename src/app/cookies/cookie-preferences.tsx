"use client";

import React, { useState, useEffect } from "react";
import { Sliders, ShieldCheck, Check } from "lucide-react";

export function CookiePreferencesManager() {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: false,
    analytics: false,
    marketing: false,
  });
  const [savedMessage, setSavedMessage] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("treel_cookie_consent");
      if (stored === "accepted") {
        setPreferences({
          necessary: true,
          functional: true,
          analytics: true,
          marketing: true,
        });
      } else if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === "object" && parsed !== null) {
          setPreferences({
            necessary: true,
            functional: Boolean(parsed.functional),
            analytics: Boolean(parsed.analytics),
            marketing: Boolean(parsed.marketing),
          });
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  const handleSave = (customPrefs?: typeof preferences) => {
    const toSave = customPrefs || preferences;
    localStorage.setItem("treel_cookie_consent", JSON.stringify(toSave));
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
    setIsOpen(false);
  };

  const handleAcceptAll = () => {
    const all = { necessary: true, functional: true, analytics: true, marketing: true };
    setPreferences(all);
    localStorage.setItem("treel_cookie_consent", "accepted");
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
    setIsOpen(false);
  };

  const handleRejectAll = () => {
    const essentialOnly = { necessary: true, functional: false, analytics: false, marketing: false };
    setPreferences(essentialOnly);
    localStorage.setItem("treel_cookie_consent", JSON.stringify(essentialOnly));
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831] focus:outline-none focus:ring-2 focus:ring-[#D5573B] focus:ring-offset-2 focus:ring-offset-[#0F1419]"
        >
          <Sliders className="w-4 h-4" />
          Manage cookie preferences
        </button>

        {savedMessage && (
          <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#D5573B] bg-[#D5573B]/10 border border-[#D5573B]/20 px-3 py-1.5 rounded-full animate-in fade-in">
            <Check className="w-3.5 h-3.5" />
            Preferences updated successfully
          </span>
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
              Configure which categories of cookies you authorize during your visits to treel.in. Strictly necessary cookies remain active to provide core platform functions.
            </p>

            <div className="space-y-4">
              {/* Strictly Necessary */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-[#FAF7F2]">Strictly Necessary Cookies</span>
                    <span className="text-[10px] font-mono uppercase bg-white/10 text-white/70 px-2 py-0.5 rounded">Always Active</span>
                  </div>
                  <p className="text-xs text-[#94A3B8]">
                    Essential for session management, form safety, and persistent consent state.
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
                  <span className="font-semibold text-sm text-[#FAF7F2]">Analytics Cookies</span>
                  <p className="text-xs text-[#94A3B8]">
                    Aggregated telemetry (Google Analytics, Microsoft Clarity) to understand visitor flows.
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
                  <span className="font-semibold text-sm text-[#FAF7F2]">Marketing Cookies</span>
                  <p className="text-xs text-[#94A3B8]">
                    Measurement pixels (Meta, Google Ads, LinkedIn) to evaluate relevant campaigns.
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
                  className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-[#94A3B8] hover:text-white border border-white/15 rounded-[4px] hover:bg-white/5"
                >
                  Reject Non-Essential
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="w-1/2 sm:w-auto px-4 py-2 text-xs font-semibold text-[#FAF7F2] bg-white/10 rounded-[4px] hover:bg-white/20"
                >
                  Accept All
                </button>
              </div>
              <button
                type="button"
                onClick={() => handleSave()}
                className="w-full sm:w-auto px-6 py-2 text-xs font-semibold bg-[#D5573B] text-[#FAF7F2] rounded-[4px] hover:bg-[#CB4831]"
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
