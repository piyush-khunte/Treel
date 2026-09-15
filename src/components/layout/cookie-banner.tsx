"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const isConsent = localStorage.getItem("treel_cookie_consent");
    if (!isConsent) {
      setAccepted(false);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("treel_cookie_consent", "accepted");
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 sm:right-auto sm:max-w-md z-50 bg-[#0F1419] text-[#FAF7F2] p-5 rounded-2xl shadow-2xl border border-[#D5573B]/30 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#D5573B]/20 text-[#D5573B] shrink-0 mt-0.5">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <h4 className="text-sm font-semibold font-fraunces text-[#FAF7F2]">
            Cookie & Telemetry Privacy
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            We use essential and analytics cookies to optimize your browsing experience and improve our mobility intelligence algorithms. Read our{" "}
            <Link href="/privacy" className="text-[#D5573B] underline hover:text-[#FAF7F2]">
              Privacy Policy
            </Link>.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <Button onClick={handleAccept} variant="treel" size="sm" className="text-xs h-8 px-4 font-medium">
              Accept All
            </Button>
            <Button onClick={handleAccept} variant="outline" size="sm" className="text-xs h-8 px-3 border-white/20 text-slate-200 hover:bg-white/10 hover:text-white">
              Essential Only
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
