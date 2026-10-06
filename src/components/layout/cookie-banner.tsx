"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Cookie, Sliders, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getStoredConsent,
  saveConsentPreference,
  ACCEPTED_ALL_CATEGORIES,
  DEFAULT_CATEGORIES,
  ConsentCategories,
} from "@/lib/privacy/cookie-consent";

export function CookieBanner() {
  const pathname = usePathname();
  const [hasConsent, setHasConsent] = useState<boolean>(true); // default true to prevent SSR flash
  const [showConfigModal, setShowConfigModal] = useState<boolean>(false);
  const [customCategories, setCustomCategories] = useState<ConsentCategories>(DEFAULT_CATEGORIES);

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      setHasConsent(false);
    } else {
      setHasConsent(true);
      setCustomCategories(existing.categories);
    }

    // Listen for custom open requests (e.g. from footer links)
    const handleOpenModal = () => {
      setShowConfigModal(true);
    };

    window.addEventListener("treel_open_cookie_modal", handleOpenModal);
    return () => {
      window.removeEventListener("treel_open_cookie_modal", handleOpenModal);
    };
  }, []);

  const handleAcceptAll = () => {
    saveConsentPreference("accepted", ACCEPTED_ALL_CATEGORIES, "consent");
    setHasConsent(true);
    setShowConfigModal(false);
  };

  const handleRejectAll = () => {
    saveConsentPreference("rejected", DEFAULT_CATEGORIES, "consent");
    setHasConsent(true);
    setShowConfigModal(false);
  };

  const handleSaveCustom = () => {
    saveConsentPreference("customized", customCategories, "consent");
    setHasConsent(true);
    setShowConfigModal(false);
  };

  // Hide on thank-you / confirmation routes or if consent already recorded
  if ((hasConsent && !showConfigModal) || pathname === "/thank-you" || pathname?.startsWith("/thank-you")) {
    return null;
  }

  return (
    <>
      {/* Banner popup at bottom */}
      {!hasConsent && !showConfigModal && (
        <aside
          aria-label="Cookie and Privacy Consent"
          className="fixed bottom-6 left-6 right-6 sm:right-auto sm:max-w-md z-50 bg-[#0F1419] text-[#FAF7F2] p-5 rounded-2xl shadow-2xl border border-[#D5573B]/30 animate-in slide-in-from-bottom-5 duration-300"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-[#D5573B]/20 text-[#D5573B] shrink-0 mt-0.5">
              <Cookie className="w-5 h-5" />
            </div>
            <div className="space-y-2.5">
              <h4 className="text-sm font-semibold font-fraunces text-[#FAF7F2]">
                Cookie & Telemetry Privacy
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                We use strictly necessary cookies to ensure site security and basic functions. With your consent, we also use optional telemetry and analytics cookies to optimize performance. Review our{" "}
                <Link href="/cookies" className="text-[#D5573B] underline hover:text-[#FAF7F2]">
                  Cookie Policy
                </Link>.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Button
                  onClick={handleAcceptAll}
                  variant="treel"
                  size="sm"
                  className="text-xs h-8 px-3.5 font-semibold bg-[#D5573B] hover:bg-[#CB4831] text-white cursor-pointer"
                >
                  Accept All
                </Button>
                <Button
                  onClick={handleRejectAll}
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 px-3 border-white/20 text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer"
                >
                  Essential Only
                </Button>
                <button
                  type="button"
                  onClick={() => setShowConfigModal(true)}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-2 px-1 py-1 cursor-pointer flex items-center gap-1"
                >
                  <Sliders className="w-3 h-3" />
                  Preferences
                </button>
              </div>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences Modal Dialog */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className="w-full max-w-lg bg-[#141B22] border border-white/[0.12] rounded-xl p-6 sm:p-8 shadow-2xl space-y-6 text-[#FAF7F2]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="banner-cookie-modal-title"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div>
                <div className="text-[#D5573B] font-mono text-xs uppercase tracking-widest font-semibold mb-1">
                  PRIVACY PREFERENCES
                </div>
                <h3 id="banner-cookie-modal-title" className="font-fraunces text-2xl font-medium text-[#FAF7F2] leading-[1.12]">
                  Customize Cookie Consent
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (!hasConsent) {
                    setShowConfigModal(false);
                  } else {
                    setShowConfigModal(false);
                  }
                }}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Choose which categories of cookies and telemetry you authorize. Essential cookies cannot be disabled as they are required for security and core navigation.
            </p>

            <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
              {/* Necessary */}
              <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#FAF7F2]">Strictly Necessary</span>
                    <span className="text-[10px] font-mono uppercase bg-[#D5573B]/20 text-[#D5573B] px-1.5 py-0.5 rounded">
                      Required
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Maintains secure sessions, cart preservation, and core platform functionality.
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
              <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-[#FAF7F2]">Functional Cookies</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Stores regional preferences, language options, and returning visitor form states.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={customCategories.functional}
                  onChange={(e) =>
                    setCustomCategories({ ...customCategories, functional: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#D5573B] focus:ring-[#D5573B] cursor-pointer"
                />
              </div>

              {/* Analytics */}
              <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-[#FAF7F2]">Analytics &amp; Telemetry</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Aggregated usage insights (Google Analytics, Clarity) to optimize platform speed and UX.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={customCategories.analytics}
                  onChange={(e) =>
                    setCustomCategories({ ...customCategories, analytics: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#D5573B] focus:ring-[#D5573B] cursor-pointer"
                />
              </div>

              {/* Marketing */}
              <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-[#FAF7F2]">Marketing &amp; Campaigns</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Helps us evaluate marketing performance across search and social channels.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={customCategories.marketing}
                  onChange={(e) =>
                    setCustomCategories({ ...customCategories, marketing: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#D5573B] focus:ring-[#D5573B] cursor-pointer"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-3 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRejectAll}
                  className="w-1/2 sm:w-auto text-xs h-8 px-3 border-white/15 text-slate-300 hover:bg-white/10 hover:text-white"
                >
                  Reject Non-Essential
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAcceptAll}
                  className="w-1/2 sm:w-auto text-xs h-8 px-3 bg-white/10 text-white hover:bg-white/20 border-transparent"
                >
                  Accept All
                </Button>
              </div>
              <Button
                type="button"
                variant="treel"
                size="sm"
                onClick={handleSaveCustom}
                className="w-full sm:w-auto text-xs h-8 px-5 bg-[#D5573B] hover:bg-[#CB4831] text-white font-semibold"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
