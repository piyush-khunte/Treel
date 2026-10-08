"use client";

import { useEffect } from "react";

export function ThankYouTracker() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      win.dataLayer = win.dataLayer || [];
      let first = true;
      try {
        first = !sessionStorage.getItem("treel_ty_seen");
        sessionStorage.setItem("treel_ty_seen", "1");
      } catch {
        // storage fallback
      }
      win.dataLayer.push({
        event: "lead_thank_you_view",
        page_path: "/thank-you",
        first_view: first,
      });
    }
  }, []);

  return null;
}
