"use client";

import { useEffect, useRef } from "react";

export function ThankYouTracker() {
  const firedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const win = window as any;
      win.dataLayer = win.dataLayer || [];

      // Fire conversion event on client-side routing if the inline static script didn't fire it
      if (!win.__gtag_conversion_fired && !firedRef.current) {
        firedRef.current = true;
        win.__gtag_conversion_fired = true;
        if (typeof win.gtag === "function") {
          win.gtag("event", "conversion", {
            send_to: "AW-18528246360/XWzoCIuLz6QdENi0-oJF",
          });
        } else {
          const gtag = (...args: any[]) => {
            win.dataLayer.push(args);
          };
          win.gtag = gtag;
          gtag("event", "conversion", {
            send_to: "AW-18528246360/XWzoCIuLz6QdENi0-oJF",
          });
        }
      }

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

      return () => {
        // Reset when unmounting so if another lead is submitted in the same session, it fires again
        win.__gtag_conversion_fired = false;
      };
    }
  }, []);

  return null;
}
