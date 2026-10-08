"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import "@/app/personal/personal-campaign.css";
import { TpmsLandingFooter } from "./tpms-landing-footer";

// SVG Icon Helper Component
function Icon({ id, className = "ic" }: { id: string; className?: string }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false">
      <use href={`#${id}`} />
    </svg>
  );
}

// DataLayer Push Helper
function pushDataLayer(data: Record<string, any>) {
  if (typeof window !== "undefined") {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(data);
  }
}

export function PersonalCarCampaignPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 1. Marketing Attribution Capture
  const [attribution, setAttribution] = useState({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    gclid: "",
    fbclid: "",
    landing_page: "",
  });

  useEffect(() => {
    const keys = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "gclid",
      "fbclid",
    ] as const;

    const captured: Record<string, string> = {};

    keys.forEach((k) => {
      let v = searchParams?.get(k);
      try {
        if (v) {
          sessionStorage.setItem("treel4w_" + k, v);
        } else {
          v = sessionStorage.getItem("treel4w_" + k) || "";
        }
      } catch {
        // sessionStorage restricted
      }
      if (v) captured[k] = v;
    });

    const currentUrl = typeof window !== "undefined" ? window.location.href.split("?")[0] : "";

    setAttribution((prev) => ({
      ...prev,
      ...captured,
      landing_page: currentUrl,
    }));

    pushDataLayer({
      event: "page_view",
      page_path: typeof window !== "undefined" ? window.location.pathname : "/lp-tpms/car",
      product_line: "personal_tpms_4w",
    });
  }, [searchParams]);

  // 2. Form State Management
  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    city: "",
    vehicle_model: "",
    kit_interest: "not_sure",
    call_time: "anytime",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 3. Compact Modal Popup State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((kit?: string, ctaLabel?: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      lastTriggerRef.current = e.currentTarget as HTMLElement;
    }
    if (kit) {
      setFormData((prev) => ({ ...prev, kit_interest: kit }));
    }
    pushDataLayer({
      event: "cta_click",
      link_label: ctaLabel || "get_a_callback",
      product_line: "personal_tpms_4w",
    });
    setIsModalOpen(true);
    setSubmitSuccess(false);
    setSubmitError(null);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const timer = setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isModalOpen, closeModal]);

  // Mobile Navigation Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>, source: "popup" | "inpage") => {
    e.preventDefault();
    const phoneClean = formData.mobile.replace(/\D/g, "");
    if (!formData.full_name || formData.full_name.trim().length < 2) {
      setSubmitError("Please enter your full name.");
      return;
    }
    if (phoneClean.length !== 10 || !/^[6-9]/.test(phoneClean)) {
      setSubmitError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!formData.city || formData.city.trim().length < 2) {
      setSubmitError("Please enter your city.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        full_name: formData.full_name.trim(),
        mobile: phoneClean,
        mobile_number: phoneClean,
        city: formData.city.trim(),
        vehicle_model: formData.vehicle_model.trim(),
        kit_interest: formData.kit_interest,
        call_time: formData.call_time,
        product_line: "personal_tpms_4w",
        lead_source: source === "popup" ? "car_tpms_popup" : "car_tpms_enquiry",
        ...attribution,
      };

      const res = await fetch("/api/personal/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Submission failed. Please try again.");
      }

      pushDataLayer({
        event: "generate_lead",
        form_id: source === "popup" ? "car_tpms_popup" : "car_tpms_enquiry",
        kit_interest: formData.kit_interest,
        product_line: "personal_tpms_4w",
      });

      setSubmitSuccess(true);
      const queryParams = new URLSearchParams();
      if (attribution.utm_source) queryParams.set("utm_source", attribution.utm_source);
      if (attribution.utm_medium) queryParams.set("utm_medium", attribution.utm_medium);
      if (attribution.utm_campaign) queryParams.set("utm_campaign", attribution.utm_campaign);
      if (attribution.utm_term) queryParams.set("utm_term", attribution.utm_term);
      if (attribution.utm_content) queryParams.set("utm_content", attribution.utm_content);
      if (attribution.gclid) queryParams.set("gclid", attribution.gclid);
      if (attribution.fbclid) queryParams.set("fbclid", attribution.fbclid);
      if ((attribution as any).ad_group) queryParams.set("ad_group", (attribution as any).ad_group);
      const queryString = queryParams.toString();
      router.push(`/thank-you${queryString ? `?${queryString}` : ""}`);
    } catch (err: any) {
      setSubmitError(err?.message || "Something went wrong. Please check your details and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="personal-campaign">
      {/* Tabler Icons SVG Sprite definition */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M5 12l14 0" /><path d="M13 18l6 -6" /><path d="M13 6l6 6" /></symbol>
        <symbol id="i-gauge" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M13.41 10.59l2.59 -2.59" /><path d="M7 12a5 5 0 0 1 5 -5" /></symbol>
        <symbol id="i-bell-ringing" viewBox="0 0 24 24"><path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /><path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" /><path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" /></symbol>
        <symbol id="i-bell" viewBox="0 0 24 24"><path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" /><path d="M9 17v1a3 3 0 0 0 6 0v-1" /></symbol>
        <symbol id="i-shield-check" viewBox="0 0 24 24"><path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" /><path d="M15 19l2 2l4 -4" /></symbol>
        <symbol id="i-circle-check" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l2 2l4 -4" /></symbol>
        <symbol id="i-temperature" viewBox="0 0 24 24"><path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" /><path d="M10 9l4 0" /></symbol>
        <symbol id="i-gas-station" viewBox="0 0 24 24"><path d="M14 11h1a2 2 0 0 1 2 2v3a1.5 1.5 0 0 0 3 0v-7l-3 -3" /><path d="M4 20v-14a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v14" /><path d="M3 20l12 0" /><path d="M18 7v1a1 1 0 0 0 1 1h1" /><path d="M4 11l10 0" /></symbol>
        <symbol id="i-motorbike" viewBox="0 0 24 24"><path d="M2 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" /><path d="M13 6h2l1.5 3l2 4" /></symbol>
        <symbol id="i-scooter" viewBox="0 0 24 24"><path d="M16 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M4 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M8 17h5a6 6 0 0 1 5 -5v-5a2 2 0 0 0 -2 -2h-1" /></symbol>
        <symbol id="i-bluetooth" viewBox="0 0 24 24"><path d="M7 8l10 8l-5 4l0 -16l5 4l-10 8" /></symbol>
        <symbol id="i-device-mobile" viewBox="0 0 24 24"><path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14" /><path d="M11 4h2" /><path d="M12 17v.01" /></symbol>
        <symbol id="i-check" viewBox="0 0 24 24"><path d="M5 12l5 5l10 -10" /></symbol>
        <symbol id="i-route" viewBox="0 0 24 24"><path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4" /><path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5" /></symbol>
        <symbol id="i-road" viewBox="0 0 24 24"><path d="M4 19l4 -14" /><path d="M16 5l4 14" /><path d="M12 8v-2" /><path d="M12 13v-2" /><path d="M12 18v-2" /></symbol>
        <symbol id="i-package" viewBox="0 0 24 24"><path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" /><path d="M12 12l8 -4.5" /><path d="M12 12l0 9" /><path d="M12 12l-8 -4.5" /><path d="M16 5.25l-8 4.5" /></symbol>
        <symbol id="i-users" viewBox="0 0 24 24"><path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /><path d="M21 21v-2a4 4 0 0 0 -3 -3.85" /></symbol>
        <symbol id="i-user" viewBox="0 0 24 24"><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></symbol>
        <symbol id="i-calendar-event" viewBox="0 0 24 24"><path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" /><path d="M16 3l0 4" /><path d="M8 3l0 4" /><path d="M4 11l16 0" /><path d="M8 15h2v2h-2l0 -2" /></symbol>
        <symbol id="i-map-pin" viewBox="0 0 24 24"><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" /></symbol>
        <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></symbol>
        <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5l0 14" /><path d="M5 12l14 0" /></symbol>
        <symbol id="i-share" viewBox="0 0 24 24"><path d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M8.7 10.7l6.6 -3.4" /><path d="M8.7 13.3l6.6 3.4" /></symbol>
        <symbol id="i-car" viewBox="0 0 24 24"><path d="M5 17a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M15 17a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" /></symbol>
        <symbol id="i-antenna-bars-5" viewBox="0 0 24 24"><path d="M6 18l0 -3" /><path d="M10 18l0 -6" /><path d="M14 18l0 -9" /><path d="M18 18l0 -12" /></symbol>
        <symbol id="i-wifi" viewBox="0 0 24 24"><path d="M12 18l.01 0" /><path d="M9.172 15.172a4 4 0 0 1 5.656 0" /><path d="M6.343 12.343a8 8 0 0 1 11.314 0" /><path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" /></symbol>
        <symbol id="i-battery-3" viewBox="0 0 24 24"><path d="M6 7h11a2 2 0 0 1 2 2v.5a.5 .5 0 0 0 .5 .5a.5 .5 0 0 1 .5 .5v3a.5 .5 0 0 1 -.5 .5a.5 .5 0 0 0 -.5 .5v.5a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2" /><path d="M7 10l0 4" /><path d="M10 10l0 4" /><path d="M13 10l0 4" /></symbol>
        <symbol id="i-brand-apple" viewBox="0 0 24 24"><path d="M8.286 7.008c-3.216 0 -4.286 3.23 -4.286 5.92c0 3.229 2.143 8.072 4.286 8.072c1.165 -.05 1.799 -.538 3.214 -.538c1.406 0 1.607 .538 3.214 .538s4.286 -3.229 4.286 -5.381c-.03 -.011 -2.649 -.434 -2.679 -3.23c-.02 -2.335 2.589 -3.179 2.679 -3.228c-1.096 -1.606 -3.162 -2.113 -3.75 -2.153c-1.535 -.12 -3.032 1.077 -3.75 1.077c-.729 0 -2.036 -1.077 -3.214 -1.077" /><path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2" /></symbol>
        <symbol id="i-brand-google-play" viewBox="0 0 24 24"><path d="M4 3.71v16.58a.7 .7 0 0 0 1.05 .606l14.622 -8.42a.55 .55 0 0 0 0 -.953l-14.622 -8.419a.7 .7 0 0 0 -1.05 .607l0 -.001" /><path d="M15 9l-10.5 11.5" /><path d="M4.5 3.5l10.5 11.5" /></symbol>
        <symbol id="i-brand-facebook" viewBox="0 0 24 24"><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></symbol>
        <symbol id="i-brand-instagram" viewBox="0 0 24 24"><path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M16.5 7.5v.01" /></symbol>
        <symbol id="i-brand-youtube" viewBox="0 0 24 24"><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" /><path d="M10 9l5 3l-5 3l0 -6" /></symbol>
        <symbol id="i-brand-linkedin" viewBox="0 0 24 24"><path d="M8 11v5" /><path d="M8 8v.01" /><path d="M12 16v-5" /><path d="M16 16v-3a2 2 0 1 0 -4 0" /><path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" /></symbol>
        <symbol id="i-coin-rupee" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M15 8h-6h1a3 3 0 0 1 0 6h-1l3 3" /><path d="M9 11h6" /></symbol>
        <symbol id="i-heart" viewBox="0 0 24 24"><path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" /></symbol>
        <symbol id="i-heartbeat" viewBox="0 0 24 24"><path d="M19.5 13.572l-7.5 7.428l-2.896 -2.868m-6.117 -8.104a5 5 0 0 1 9.013 -3.022a5 5 0 1 1 7.5 6.572" /><path d="M3 13h2l2 3l2 -6l1 3h3" /></symbol>
        <symbol id="i-rosette" viewBox="0 0 24 24"><path d="M5 7.2a2.2 2.2 0 0 1 2.2 -2.2h1a2.2 2.2 0 0 0 1.55 -.64l.7 -.7a2.2 2.2 0 0 1 3.12 0l.7 .7c.412 .41 .97 .64 1.55 .64h1a2.2 2.2 0 0 1 2.2 2.2v1c0 .58 .23 1.138 .64 1.55l.7 .7a2.2 2.2 0 0 1 0 3.12l-.7 .7a2.2 2.2 0 0 0 -.64 1.55v1a2.2 2.2 0 0 1 -2.2 2.2h-1a2.2 2.2 0 0 0 -1.55 .64l-.7 .7a2.2 2.2 0 0 1 -3.12 0l-.7 -.7a2.2 2.2 0 0 0 -1.55 -.64h-1a2.2 2.2 0 0 1 -2.2 -2.2v-1a2.2 2.2 0 0 0 -.64 -1.55l-.7 -.7a2.2 2.2 0 0 1 0 -3.12l.7 -.7a2.2 2.2 0 0 0 .64 -1.55v-1" /></symbol>
        <symbol id="i-circle-dot" viewBox="0 0 24 24"><path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></symbol>
        <symbol id="i-device-desktop" viewBox="0 0 24 24"><path d="M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10" /><path d="M7 20h10" /><path d="M9 16v4" /><path d="M15 16v4" /></symbol>
        <symbol id="i-lifebuoy" viewBox="0 0 24 24"><path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M15 15l3.35 3.35" /><path d="M9 15l-3.35 3.35" /><path d="M5.65 5.65l3.35 3.35" /><path d="M18.35 5.65l-3.35 3.35" /></symbol>
        <symbol id="i-steering-wheel" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" /><path d="M12 14l0 7" /><path d="M10 12l-6.75 -2" /><path d="M14 12l6.75 -2" /></symbol>
        <symbol id="i-car-suv" viewBox="0 0 24 24"><path d="M5 17a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M16 17a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M5 9l2 -4h7.438a2 2 0 0 1 1.94 1.515l.622 2.485h3a2 2 0 0 1 2 2v3" /><path d="M10 9v-4" /><path d="M2 7v4" /><path d="M22.001 14.001a4.992 4.992 0 0 0 -4.001 -2.001a4.992 4.992 0 0 0 -4 2h-3a4.998 4.998 0 0 0 -8.003 .003" /><path d="M5 12v-3h13" /></symbol>
        <symbol id="i-gps" viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 17l-1 -4l-4 -1l9 -4l-4 9" /></symbol>
        <symbol id="i-brand-whatsapp" viewBox="0 0 24 24"><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></symbol>
        <symbol id="i-x" viewBox="0 0 24 24"><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></symbol>
      </svg>

      <a className="skip" href="#main">
        Skip to content
      </a>

      {/* HEADER */}
      <header className="site-header">
        <div className="wrap">
          <Link className="brand" href="/" aria-label="Treel home">
            <Image
              src="https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png"
              alt="Treel"
              width={160}
              height={50}
              className="h-8 sm:h-9 w-auto object-contain"
              priority
            />
            <span className="brand-divider" aria-hidden="true"></span>
            <span className="lockup">
              <svg className="marks" viewBox="0 0 180 60" aria-hidden="true" focusable="false">
                <g fill="#2563EB">
                  <rect x="0" y="0" width="180" height="10" rx="2" />
                  <rect x="0" y="25" width="180" height="10" rx="2" />
                  <rect x="0" y="50" width="180" height="10" rx="2" />
                </g>
              </svg>
              Personal
            </span>
          </Link>
          <nav className="nav" aria-label="Page sections">
            <a href="#sensor">The sensor</a>
            <a href="#how">How it works</a>
            <a href="#features">Benefits</a>
            <a href="#kits">Car kits</a>
            <a href="#faq">FAQ</a>
          </nav>
          <div className="header-actions">
            <a
              href="tel:18008330233"
              className="header-phone"
              onClick={() => pushDataLayer({ event: "call_click", link_label: "header_phone" })}
              aria-label="Call toll-free 1800 833 0233"
            >
              <Icon id="i-phone" />
              <span>1800 833 0233</span>
            </a>
            <button
              type="button"
              className="btn btn-primary btn-sm header-callback-btn"
              onClick={(e) => openModal(undefined, "header_callback", e)}
            >
              Request a call back
            </button>
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="car-tpms-mobile-menu"
            >
              {isMobileMenuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div id="car-tpms-mobile-menu" className="mobile-menu-drawer">
            <nav className="mobile-nav-links" aria-label="Mobile sections">
              <a href="#sensor" onClick={() => setIsMobileMenuOpen(false)}>
                <span>The sensor</span>
                <span className="nav-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#how" onClick={() => setIsMobileMenuOpen(false)}>
                <span>How it works</span>
                <span className="nav-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Benefits</span>
                <span className="nav-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#kits" onClick={() => setIsMobileMenuOpen(false)}>
                <span>Car kits</span>
                <span className="nav-arrow" aria-hidden="true">→</span>
              </a>
              <a href="#faq" onClick={() => setIsMobileMenuOpen(false)}>
                <span>FAQ</span>
                <span className="nav-arrow" aria-hidden="true">→</span>
              </a>

              <div className="mobile-nav-actions">
                <a
                  href="tel:18008330233"
                  className="mobile-call-row"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    pushDataLayer({ event: "call_click", link_label: "mobile_menu_phone" });
                  }}
                >
                  <Icon id="i-phone" />
                  <span>1800 833 0233</span>
                </a>

                <button
                  type="button"
                  className="btn btn-primary mobile-cb-btn"
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    openModal(undefined, "mobile_menu_callback", e);
                  }}
                >
                  Request a call back
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main id="main">
        {/* 1 · ABOVE THE FOLD: HERO */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow-row">
                <span className="chip">Personal</span>
                <span className="eyebrow-text">TPMS for cars, SUVs &amp; MPVs</span>
              </div>
              <h1 id="hero-title">
                Your car&apos;s tyre pressure. <span className="accent">Live on your phone.</span>
              </h1>
              <p className="lede">
                Treel sensors watch all four tyres and send live pressure and temperature to the free TREEL CARE app. If a tyre starts to lose air, you&apos;ll know early, long before the drive feels wrong.
              </p>
              <div className="cta-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => openModal(undefined, "hero_callback", e)}
                >
                  <span>Get a call back</span> <Icon id="i-arrow-right" />
                </button>
                <a className="btn btn-secondary" href="#kits">
                  See the car kits
                </a>
              </div>
              <ul className="benefits">
                <li>
                  <Icon id="i-gauge" /> All four tyres, live
                </li>
                <li>
                  <Icon id="i-bell-ringing" /> Early leak alerts
                </li>
                <li>
                  <Icon id="i-shield-check" /> 5-year sensor warranty
                </li>
                <li>
                  <Icon id="i-circle-check" /> ARAI certified · Made in India
                </li>
              </ul>
            </div>
            <div className="hero-visual">
              <div className="toast" aria-hidden="true">
                <span className="app-ico">
                  <svg viewBox="0 0 180 64" aria-hidden="true" focusable="false">
                    <g fill="#FFFFFF">
                      <rect x="0" y="0" width="180" height="14" rx="3" />
                      <rect x="0" y="25" width="180" height="14" rx="3" />
                      <rect x="0" y="50" width="180" height="14" rx="3" />
                    </g>
                  </svg>
                </span>
                <div>
                  <div className="toast-meta">
                    <span>TREEL CARE</span>
                    <span>now</span>
                  </div>
                  <div className="toast-title">Your rear-left tyre is a little low.</div>
                  <div className="toast-body">29 psi. Top up when you can.</div>
                </div>
              </div>
              <div className="phone" role="img" aria-label="Illustrative app screen: live pressure for all four car tyres, with the rear-left tyre a little low">
                <div className="screen" aria-hidden="true">
                  <div className="island"></div>
                  <div className="sbar">
                    <span>9:41</span>
                    <span className="sbar-icons">
                      <Icon id="i-antenna-bars-5" />
                      <Icon id="i-wifi" />
                      <Icon id="i-battery-3" />
                    </span>
                  </div>
                  <div className="app-top">
                    <div>
                      <div className="app-hello">Good morning</div>
                      <div className="app-title">My car</div>
                      <span className="plate">MH 12 XX 0000</span>
                    </div>
                    <span className="app-btn">
                      <Icon id="i-bell" />
                    </span>
                  </div>
                  <div className="status">
                    <span className="dot"></span>Rear-left tyre is 4 psi below usual
                  </div>
                  <div className="car4">
                    <div className="tyre t-fl">
                      <div className="tyre-label">Front left</div>
                      <div className="tyre-psi">
                        33<small>psi</small>
                      </div>
                      <div className="tyre-temp">31 °C</div>
                      <div className="tyre-state">
                        <span className="dot ok"></span>Normal
                      </div>
                    </div>
                    <div className="car-top">
                      <svg viewBox="0 0 60 150" fill="none">
                        <rect x="8" y="4" width="44" height="142" rx="18" fill="#111827" />
                        <rect x="12" y="8" width="10" height="4" rx="2" fill="#F3F4F6" />
                        <rect x="38" y="8" width="10" height="4" rx="2" fill="#F3F4F6" />
                        <path d="M13 40 Q30 32 47 40 L44 56 Q30 51 16 56 Z" fill="#6B7280" />
                        <rect x="15" y="58" width="30" height="44" rx="6" fill="#1F2937" />
                        <path d="M16 104 Q30 108 44 104 L46 118 Q30 124 14 118 Z" fill="#6B7280" />
                        <rect x="12" y="138" width="9" height="3" rx="1.5" fill="#2563EB" />
                        <rect x="39" y="138" width="9" height="3" rx="1.5" fill="#2563EB" />
                        <g stroke="#fff" strokeWidth="2.5">
                          <rect x="0.5" y="22" width="10" height="27" rx="3.5" fill="#374151" />
                          <rect x="49.5" y="22" width="10" height="27" rx="3.5" fill="#374151" />
                          <rect x="0.5" y="101" width="10" height="27" rx="3.5" fill="#2563EB" />
                          <rect x="49.5" y="101" width="10" height="27" rx="3.5" fill="#374151" />
                        </g>
                      </svg>
                    </div>
                    <div className="tyre t-fr">
                      <div className="tyre-label">Front right</div>
                      <div className="tyre-psi">
                        33<small>psi</small>
                      </div>
                      <div className="tyre-temp">31 °C</div>
                      <div className="tyre-state">
                        <span className="dot ok"></span>Normal
                      </div>
                    </div>
                    <div className="tyre t-rl attn">
                      <div className="tyre-label">Rear left</div>
                      <div className="tyre-psi">
                        29<small>psi</small>
                      </div>
                      <div className="tyre-temp">34 °C</div>
                      <div className="tyre-state">
                        <span className="dot"></span>A little low
                      </div>
                    </div>
                    <div className="tyre t-rr">
                      <div className="tyre-label">Rear right</div>
                      <div className="tyre-psi">
                        33<small>psi</small>
                      </div>
                      <div className="tyre-temp">32 °C</div>
                      <div className="tyre-state">
                        <span className="dot ok"></span>Normal
                      </div>
                    </div>
                  </div>
                  <div className="updated">Updated just now</div>
                  <div className="tabbar">
                    <Icon id="i-gauge" className="ic on" />
                    <Icon id="i-bell" />
                    <Icon id="i-calendar-event" />
                    <Icon id="i-user" />
                  </div>
                  <div className="home-ind"></div>
                </div>
              </div>
              <span className="illus-note">Illustrative app screen</span>
            </div>
          </div>
        </section>

        {/* SPECS STRIP */}
        <div className="specs" role="region" aria-label="Sensor specifications">
          <div className="wrap" style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div className="specs-grid">
              <div className="spec">
                <div className="spec-v">0–100 psi</div>
                <div className="spec-k">Pressure range</div>
              </div>
              <div className="spec">
                <div className="spec-v">−20 to 100 °C</div>
                <div className="spec-k">Temperature range</div>
              </div>
              <div className="spec">
                <div className="spec-v">24/7</div>
                <div className="spec-k">Tracking, every drive</div>
              </div>
              <div className="spec">
                <div className="spec-v">Up to 100 ft</div>
                <div className="spec-k">Wireless range</div>
              </div>
              <div className="spec">
                <div className="spec-v">5 years</div>
                <div className="spec-k">Car sensor warranty</div>
              </div>
            </div>
          </div>
        </div>

        {/* CHANGE 5: FULL ENQUIRY FORM MOVED ABOVE "Why it matters" */}
        <section id="enquire" className="bg-blue final" aria-labelledby="final-title">
          <div className="wrap final-grid">
            <div>
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Free expert call back</p>
              <h2 id="final-title">Find the right kit for your car.</h2>
              <p className="sec-sub">
                Tell us about your car and a Treel expert will call you back. No pressure, just the right answer for your car.
              </p>
              <ul className="gets">
                <li>
                  <Icon id="i-circle-check" /> A kit recommendation for your make and model
                </li>
                <li>
                  <Icon id="i-circle-check" /> Help finding a Treel tyre shop for fitment
                </li>
                <li>
                  <Icon id="i-circle-check" /> Straight answers on the app, display and warranty
                </li>
              </ul>
              <div className="cta-row">
                <button
                  type="button"
                  className="btn btn-ghost-white"
                  onClick={(e) => openModal(undefined, "final_callback", e)}
                >
                  Get a free call back
                </button>
              </div>
              <p className="help-line">
                Have questions? Write to <a href="mailto:hello@treel.in">hello@treel.in</a>
              </p>
            </div>
            <div className="form-card">
              {!submitSuccess ? (
                <form id="enquiryForm" onSubmit={(e) => handleSubmit(e, "inpage")} noValidate>
                  <h3>Get a free call back</h3>
                  <p className="sub">Takes under a minute.</p>
                  {submitError && (
                    <p className="text-red-500 text-xs font-semibold mb-3 p-2 bg-red-50 rounded border border-red-200">
                      {submitError}
                    </p>
                  )}
                  <div className="field">
                    <label htmlFor="f-name">Full name</label>
                    <input
                      id="f-name"
                      name="full_name"
                      type="text"
                      autoComplete="name"
                      value={formData.full_name}
                      onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="field">
                    <label htmlFor="f-phone">Mobile number</label>
                    <div className="tel">
                      <span>+91</span>
                      <input
                        id="f-phone"
                        name="mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        pattern="[6-9][0-9]{9}"
                        maxLength={10}
                        placeholder="10-digit number"
                        value={formData.mobile}
                        onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                        required
                      />
                    </div>
                  </div>
                  <div className="row2">
                    <div className="field">
                      <label htmlFor="f-city">City</label>
                      <input
                        id="f-city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="field">
                      <label htmlFor="f-model">Your car</label>
                      <input
                        id="f-model"
                        name="vehicle_model"
                        type="text"
                        placeholder="Make and model"
                        value={formData.vehicle_model}
                        onChange={(e) => setFormData({ ...formData, vehicle_model: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <label htmlFor="f-kit">Kit you&apos;re interested in</label>
                    <select
                      id="f-kit"
                      name="kit_interest"
                      value={formData.kit_interest}
                      onChange={(e) => setFormData({ ...formData, kit_interest: e.target.value })}
                      required
                    >
                      <option value="not_sure">Not sure, help me choose</option>
                      <option value="car_4_sensors_app">4 sensors + free app</option>
                      <option value="car_4_sensors_display">4 sensors + in-cabin display</option>
                      <option value="car_5_sensors_display">5 sensors + display (covers the spare)</option>
                      <option value="car_5_sensors_gps">5 sensors + GPS tracking</option>
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="f-time">Best time to call</label>
                    <select
                      id="f-time"
                      name="call_time"
                      value={formData.call_time}
                      onChange={(e) => setFormData({ ...formData, call_time: e.target.value })}
                    >
                      <option value="anytime">Any time</option>
                      <option value="morning">Morning</option>
                      <option value="afternoon">Afternoon</option>
                      <option value="evening">Evening</option>
                    </select>
                  </div>
                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Request my free call back"}
                  </button>
                  <p className="form-note">
                    By submitting, you agree to be contacted by Treel about this enquiry. See our{" "}
                    <Link href="/privacy">Privacy Policy</Link>.
                  </p>
                </form>
              ) : (
                <div className="thanks">
                  <Icon id="i-circle-check" />
                  <h3>Thanks. We&apos;ll call you soon.</h3>
                  <p>Our tyre specialist will get in touch with you shortly.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 2 · THE PROBLEM */}
        <section aria-labelledby="why-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Why it matters</p>
              <h2 id="why-title">Four tyres. A slow leak in one is easy to miss.</h2>
              <p className="sec-sub">From the driver&apos;s seat, a tyre that&apos;s a few psi low feels just like one that&apos;s fine.</p>
            </div>
            <div className="cards-3">
              <div className="pcard">
                <Icon id="i-gauge" />
                <h3>Slow leaks are quiet.</h3>
                <p>Air escapes over days, not seconds. You rarely notice until the car starts to pull or a tyre wears unevenly.</p>
              </div>
              <div className="pcard">
                <Icon id="i-temperature" />
                <h3>Highways warm your tyres.</h3>
                <p>Long drives, a full car and hot afternoons all raise tyre temperature. It&apos;s worth being able to see it.</p>
              </div>
              <div className="pcard">
                <Icon id="i-lifebuoy" />
                <h3>The spare nobody checks.</h3>
                <p>The stepney can sit untouched for months. A 5-sensor Treel kit watches it too.</p>
              </div>
            </div>
          </div>
        </section>

        {/* MEET THE SENSOR */}
        <section id="sensor" className="bg-mist" aria-labelledby="sensor-title">
          <div className="wrap sensor-grid">
            <div className="sensor-panel">
              <svg viewBox="0 0 460 320" fill="none" role="img" aria-label="Illustration of a Treel clamp-in valve tyre pressure sensor">
                <defs>
                  <linearGradient id="sah" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2B3444" />
                    <stop offset="1" stopColor="#111827" />
                  </linearGradient>
                  <linearGradient id="sap" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#3B4656" />
                    <stop offset="1" stopColor="#1F2937" />
                  </linearGradient>
                  <linearGradient id="sam" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#F3F4F6" />
                    <stop offset=".5" stopColor="#9CA3AF" />
                    <stop offset="1" stopColor="#D1D5DB" />
                  </linearGradient>
                </defs>
                <ellipse cx="270" cy="298" rx="176" ry="13" fill="#111827" opacity=".10" />
                <rect x="196" y="96" width="222" height="190" rx="44" fill="url(#sah)" />
                <path d="M240 100 H374" stroke="#fff" strokeOpacity=".14" strokeWidth="3" strokeLinecap="round" />
                <circle cx="330" cy="132" r="60" fill="url(#sap)" />
                <g stroke="#4B5563" strokeWidth="3" strokeLinecap="round">
                  <line x1="379.0" y1="132.0" x2="387.0" y2="132.0" />
                  <line x1="377.8" y1="142.9" x2="385.6" y2="144.7" />
                  <line x1="374.1" y1="153.3" x2="381.4" y2="156.7" />
                  <line x1="368.3" y1="162.6" x2="374.6" y2="167.5" />
                  <line x1="360.6" y1="170.3" x2="365.5" y2="176.6" />
                  <line x1="351.3" y1="176.1" x2="354.7" y2="183.4" />
                  <line x1="340.9" y1="179.8" x2="342.7" y2="187.6" />
                  <line x1="330.0" y1="181.0" x2="330.0" y2="189.0" />
                  <line x1="319.1" y1="179.8" x2="317.3" y2="187.6" />
                  <line x1="308.7" y1="176.1" x2="305.3" y2="183.4" />
                  <line x1="299.4" y1="170.3" x2="294.5" y2="176.6" />
                  <line x1="291.7" y1="162.6" x2="285.4" y2="167.5" />
                  <line x1="285.9" y1="153.3" x2="278.6" y2="156.7" />
                  <line x1="282.2" y1="142.9" x2="274.4" y2="144.7" />
                  <line x1="281.0" y1="132.0" x2="273.0" y2="132.0" />
                  <line x1="282.2" y1="121.1" x2="274.4" y2="119.3" />
                  <line x1="285.9" y1="110.7" x2="278.6" y2="107.3" />
                  <line x1="291.7" y1="101.4" x2="285.4" y2="96.5" />
                  <line x1="299.4" y1="93.7" x2="294.5" y2="87.4" />
                  <line x1="308.7" y1="87.9" x2="305.3" y2="80.6" />
                  <line x1="319.1" y1="84.2" x2="317.3" y2="76.4" />
                  <line x1="330.0" y1="83.0" x2="330.0" y2="75.0" />
                  <line x1="340.9" y1="84.2" x2="342.7" y2="76.4" />
                  <line x1="351.3" y1="87.9" x2="354.7" y2="80.6" />
                  <line x1="360.6" y1="93.7" x2="365.5" y2="87.4" />
                  <line x1="368.3" y1="101.4" x2="374.6" y2="96.5" />
                  <line x1="374.1" y1="110.7" x2="381.4" y2="107.3" />
                  <line x1="377.8" y1="121.1" x2="385.6" y2="119.3" />
                </g>
                <circle cx="330" cy="132" r="36" fill="#1F2937" stroke="#2563EB" strokeOpacity=".45" strokeWidth="2" />
                <circle cx="330" cy="132" r="7" fill="#2563EB" />
                <rect x="222" y="206" width="170" height="56" rx="10" fill="#fff" />
                <g fill="#2563EB">
                  <rect x="236" y="219" width="40" height="4.5" rx="1.5" />
                  <rect x="236" y="231" width="40" height="4.5" rx="1.5" />
                  <rect x="236" y="243" width="40" height="4.5" rx="1.5" />
                </g>
                <rect x="290" y="218" width="86" height="6" rx="3" fill="#D1D5DB" />
                <rect x="290" y="230" width="62" height="6" rx="3" fill="#E5E7EB" />
                <rect x="290" y="242" width="74" height="6" rx="3" fill="#E5E7EB" />
                <rect x="168" y="158" width="40" height="56" rx="8" fill="#374151" />
                <g transform="rotate(10 150 186)">
                  <rect x="40" y="174" width="104" height="24" rx="12" fill="url(#sam)" stroke="#9CA3AF" strokeWidth="1.5" />
                  <g stroke="#9CA3AF" strokeWidth="1.6">
                    <line x1="68" y1="176" x2="68" y2="196" />
                    <line x1="75" y1="176" x2="75" y2="196" />
                    <line x1="82" y1="176" x2="82" y2="196" />
                    <line x1="89" y1="176" x2="89" y2="196" />
                  </g>
                  <rect x="14" y="168" width="46" height="36" rx="9" fill="#111827" />
                  <g stroke="#374151" strokeWidth="2.4" strokeLinecap="round">
                    <line x1="25" y1="175" x2="25" y2="197" />
                    <line x1="33" y1="175" x2="33" y2="197" />
                    <line x1="41" y1="175" x2="41" y2="197" />
                    <line x1="49" y1="175" x2="49" y2="197" />
                  </g>
                </g>
                <polygon points="130,173 150,160 170,173 170,199 150,212 130,199" fill="url(#sam)" stroke="#6B7280" strokeWidth="2" />
                <path className="wave w0" d="M378.2 62.7 A30 30 0 0 1 400.5 82.7" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" opacity="1" />
                <path className="wave w1" d="M381.6 47.0 A46 46 0 0 1 415.7 77.8" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" opacity="0.6" />
                <path className="wave w2" d="M384.9 31.4 A62 62 0 0 1 431.0 72.8" stroke="#2563EB" strokeWidth="5" strokeLinecap="round" opacity="0.3" />
              </svg>
              <div className="sensor-tags" aria-hidden="true">
                <span>0–100 psi</span>
                <span>−20 to 100 °C</span>
                <span>Up to 100 ft</span>
              </div>
            </div>
            <div>
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">The sensor</p>
              <h2 id="sensor-title">Meet the car TPMS sensor.</h2>
              <p className="sec-sub">Each Treel sensor sits at the valve of its tyre and reads it around the clock, so you never have to guess.</p>
              <ol className="spoints">
                <li>
                  <div className="numblock" aria-hidden="true">01</div>
                  <div>
                    <h3>Clamp-in valve design</h3>
                    <p>A high-grade sensor built into the valve and fitted securely at each wheel.</p>
                  </div>
                </li>
                <li>
                  <div className="numblock" aria-hidden="true">02</div>
                  <div>
                    <h3>Pressure and temperature</h3>
                    <p>Reads 0–100 psi and −20 to 100 °C, 24/7, on every drive.</p>
                  </div>
                </li>
                <li>
                  <div className="numblock" aria-hidden="true">03</div>
                  <div>
                    <h3>Fast leak and inflation detection</h3>
                    <p>A falling reading is spotted early, so a slow leak stays a small problem.</p>
                  </div>
                </li>
                <li>
                  <div className="numblock" aria-hidden="true">04</div>
                  <div>
                    <h3>Wireless, up to 100 ft</h3>
                    <p>Sends its readings over Bluetooth, before you even reach the car.</p>
                  </div>
                </li>
              </ol>
              <p className="sensor-trust">ARAI certified · Made in India · 5-year warranty on car sensors</p>
              <div className="cta-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => openModal(undefined, "sensor_callback", e)}
                >
                  Get a call back <Icon id="i-arrow-right" />
                </button>
                <a className="btn btn-secondary" href="#kits">
                  See the car kits
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 3 · HOW IT WORKS */}
        <section id="how" aria-labelledby="how-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">How car TPMS works</p>
              <h2 id="how-title">Fitted once. Watching every drive.</h2>
            </div>
            <div className="steps">
              <div className="step">
                <div className="numblock" aria-hidden="true">01</div>
                <h3>Choose your kit</h3>
                <p>Four sensors with the free app, a dedicated in-cabin display, a sensor for the spare, or GPS tracking too.</p>
                <a className="textlink" href="#kits">
                  Compare car kits <Icon id="i-arrow-right" />
                </a>
              </div>
              <div className="step">
                <div className="numblock" aria-hidden="true">02</div>
                <h3>Get it fitted</h3>
                <p>Treel&apos;s clamp-in valve sensors are fitted at each wheel&apos;s valve. Find a Treel tyre shop near you to have it done.</p>
                <a className="textlink" href="https://treel.in/buy-products">
                  Find a tyre shop <Icon id="i-arrow-right" />
                </a>
              </div>
              <div className="step">
                <div className="numblock" aria-hidden="true">03</div>
                <h3>Drive. Treel keeps watch.</h3>
                <p>Readings update 24/7. If a tyre starts to lose air, an alert reaches your phone or your display.</p>
                <a className="textlink" href="#app">
                  See the app <Icon id="i-arrow-right" />
                </a>
              </div>
            </div>
            <div className="flow" aria-hidden="true">
              <span className="flow-node"><Icon id="i-circle-dot" /> Sensor in each tyre</span>
              <span className="flow-line"></span>
              <span className="flow-node"><Icon id="i-bluetooth" /> Bluetooth</span>
              <span className="flow-line"></span>
              <span className="flow-node"><Icon id="i-device-mobile" /> Phone or display</span>
            </div>
          </div>
        </section>

        {/* BEFORE / AFTER */}
        <section className="bg-mist" aria-labelledby="compare-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Before and after</p>
              <h2 id="compare-title">Guesswork out. Numbers in.</h2>
            </div>
            <div className="compare" role="table" aria-label="Driving without tyre sensors compared with Treel car TPMS">
              <div className="crow head" role="row">
                <div role="columnheader"></div>
                <div className="c-without" role="columnheader">Without sensors</div>
                <div className="c-with" role="columnheader">With Treel sensors</div>
              </div>
              <div className="crow" role="row">
                <div className="c-aspect" role="rowheader">Checking pressure</div>
                <div className="c-without" role="cell" data-label="Without sensors">At the petrol pump, when you remember</div>
                <div className="c-with" role="cell" data-label="With Treel sensors"><Icon id="i-check" /><span>Live, all four tyres, on every drive</span></div>
              </div>
              <div className="crow" role="row">
                <div className="c-aspect" role="rowheader">A slow leak</div>
                <div className="c-without" role="cell" data-label="Without sensors">Noticed when the car pulls or feels heavy</div>
                <div className="c-with" role="cell" data-label="With Treel sensors"><Icon id="i-check" /><span>An early alert on your phone or display</span></div>
              </div>
              <div className="crow" role="row">
                <div className="c-aspect" role="rowheader">Tyre temperature</div>
                <div className="c-without" role="cell" data-label="Without sensors">You can&apos;t see it</div>
                <div className="c-with" role="cell" data-label="With Treel sensors"><Icon id="i-check" /><span>Shown live, from −20 to 100 °C</span></div>
              </div>
              <div className="crow" role="row">
                <div className="c-aspect" role="rowheader">The spare tyre</div>
                <div className="c-without" role="cell" data-label="Without sensors">Checked the day you need it</div>
                <div className="c-with" role="cell" data-label="With Treel sensors"><Icon id="i-check" /><span>Watched too, with a 5-sensor kit</span></div>
              </div>
              <div className="crow" role="row">
                <div className="c-aspect" role="rowheader">Before a long drive</div>
                <div className="c-without" role="cell" data-label="Without sensors">A walk around with a gauge</div>
                <div className="c-with" role="cell" data-label="With Treel sensors"><Icon id="i-check" /><span>One glance, every tyre</span></div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 · BENEFITS */}
        <section id="features" aria-labelledby="features-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Benefits</p>
              <h2 id="features-title">Know your tyres. Know your drive.</h2>
              <p className="sec-sub">What driving with Treel sensors does for you and your family, every day.</p>
            </div>
            <div className="fgrid">
              <article className="fcard">
                <div className="ficon"><Icon id="i-shield-check" /></div>
                <h3>Fewer tyre-related breakdowns</h3>
                <p>A slow leak shows up early, long before it can leave you stranded on the road.</p>
              </article>
              <article className="fcard">
                <div className="ficon"><Icon id="i-coin-rupee" /></div>
                <h3>Saves fuel and money</h3>
                <p>Driving at the right pressure is kinder to your tyres and to your fuel bill.</p>
              </article>
              <article className="fcard">
                <div className="ficon"><Icon id="i-heart" /></div>
                <h3>Keeps your loved ones safe</h3>
                <p>Set off knowing every tyre is where it should be, with the whole family on board.</p>
              </article>
              <article className="fcard">
                <div className="ficon"><Icon id="i-heartbeat" /></div>
                <h3>Better overall car health</h3>
                <p>Tyres are the first thing worth checking. Now they check themselves.</p>
              </article>
              <article className="fcard">
                <div className="ficon"><Icon id="i-device-mobile" /></div>
                <h3>Alerts on your phone or display</h3>
                <p>Leak alerts appear on your phone screen, or on the in-cabin display with a display kit.</p>
              </article>
              <article className="fcard">
                <div className="ficon"><Icon id="i-rosette" /></div>
                <h3>Built to last</h3>
                <p>High-grade clamp-in valve sensors, ARAI certified, with a 5-year warranty on car sensors.</p>
              </article>
            </div>
          </div>
        </section>

        {/* APP SECTION */}
        <section id="app" className="bg-charcoal" aria-labelledby="app-title">
          <div className="wrap app-grid">
            <div>
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">The TREEL CARE app</p>
              <h2 id="app-title">Your sensors report here.</h2>
              <p className="sec-sub">
                Pair your sensors once with the free TREEL CARE app. The sensors do the watching; the app shows you what they see, and keeps track of the rest of your car&apos;s life too.
              </p>
              <ul className="app-list">
                <li><span className="tick"><Icon id="i-check" /></span>Live pressure and temperature from every sensor</li>
                <li><span className="tick"><Icon id="i-check" /></span>Leak alerts that appear on your screen, hands-free</li>
                <li><span className="tick"><Icon id="i-check" /></span>Mileage, fuel, insurance and service reminders in one place</li>
                <li><span className="tick"><Icon id="i-check" /></span>Up to 10 vehicles, with stats you can share with family</li>
                <li><span className="tick"><Icon id="i-check" /></span>Cloud backup, so nothing is lost when you change phones</li>
              </ul>
              <div className="stores">
                <a className="store" href="https://apps.apple.com/app/smart-tyre-car-bike/id1403399301" target="_blank" rel="noopener noreferrer">
                  <Icon id="i-brand-apple" />
                  <span><small>Download on the</small><b>App Store</b></span>
                </a>
                <a className="store" href="https://play.google.com/store/apps/details?id=com.treel.android" target="_blank" rel="noopener noreferrer">
                  <Icon id="i-brand-google-play" />
                  <span><small>Get it on</small><b>Google Play</b></span>
                </a>
              </div>
              <p className="store-note">Listed on both stores as SMART TYRE CAR &amp; BIKE. Prefer a screen in the car? Choose a display kit.</p>
            </div>
            <div>
              <div className="phones" role="region" aria-label="Illustrative TREEL CARE app screens" tabIndex={0}>
                <div className="shot">
                  <div className="phone" role="img" aria-label="Illustrative app screen: live pressure for all four car tyres">
                    <div className="screen" aria-hidden="true">
                      <div className="island"></div>
                      <div className="sbar"><span>9:41</span><span className="sbar-icons"><Icon id="i-antenna-bars-5" /><Icon id="i-wifi" /><Icon id="i-battery-3" /></span></div>
                      <div className="app-top"><div><div className="app-hello">Good morning</div><div className="app-title">My car</div><span className="plate">MH 12 XX 0000</span></div><span className="app-btn"><Icon id="i-bell" /></span></div>
                      <div className="status"><span className="dot"></span>Rear-left tyre is 4 psi below usual</div>
                      <div className="car4">
                        <div className="tyre t-fl"><div className="tyre-label">Front left</div><div className="tyre-psi">33<small>psi</small></div><div className="tyre-temp">31 °C</div><div className="tyre-state"><span className="dot ok"></span>Normal</div></div>
                        <div className="car-top"><svg viewBox="0 0 60 150" fill="none"><rect x="8" y="4" width="44" height="142" rx="18" fill="#111827"/><rect x="12" y="8" width="10" height="4" rx="2" fill="#F3F4F6"/><rect x="38" y="8" width="10" height="4" rx="2" fill="#F3F4F6"/><path d="M13 40 Q30 32 47 40 L44 56 Q30 51 16 56 Z" fill="#6B7280"/><rect x="15" y="58" width="30" height="44" rx="6" fill="#1F2937"/><path d="M16 104 Q30 108 44 104 L46 118 Q30 124 14 118 Z" fill="#6B7280"/><rect x="12" y="138" width="9" height="3" rx="1.5" fill="#2563EB"/><rect x="39" y="138" width="9" height="3" rx="1.5" fill="#2563EB"/><g stroke="#fff" strokeWidth="2.5"><rect x="0.5" y="22" width="10" height="27" rx="3.5" fill="#374151"/><rect x="49.5" y="22" width="10" height="27" rx="3.5" fill="#374151"/><rect x="0.5" y="101" width="10" height="27" rx="3.5" fill="#2563EB"/><rect x="49.5" y="101" width="10" height="27" rx="3.5" fill="#374151"/></g></svg></div>
                        <div className="tyre t-fr"><div className="tyre-label">Front right</div><div className="tyre-psi">33<small>psi</small></div><div className="tyre-temp">31 °C</div><div className="tyre-state"><span className="dot ok"></span>Normal</div></div>
                        <div className="tyre t-rl attn"><div className="tyre-label">Rear left</div><div className="tyre-psi">29<small>psi</small></div><div className="tyre-temp">34 °C</div><div className="tyre-state"><span className="dot"></span>A little low</div></div>
                        <div className="tyre t-rr"><div className="tyre-label">Rear right</div><div className="tyre-psi">33<small>psi</small></div><div className="tyre-temp">32 °C</div><div className="tyre-state"><span className="dot ok"></span>Normal</div></div>
                      </div>
                      <div className="updated">Updated just now</div>
                      <div className="tabbar"><Icon id="i-gauge" className="ic on" /><Icon id="i-bell" /><Icon id="i-calendar-event" /><Icon id="i-user" /></div>
                      <div className="home-ind"></div>
                    </div>
                  </div>
                  <span className="shot-cap">Live tyres</span>
                </div>
                <div className="shot">
                  <div className="phone" role="img" aria-label="Illustrative app screen: rear-left tyre pressure over seven days">
                    <div className="screen" aria-hidden="true">
                      <div className="island"></div>
                      <div className="sbar"><span>9:41</span><span className="sbar-icons"><Icon id="i-antenna-bars-5" /><Icon id="i-wifi" /><Icon id="i-battery-3" /></span></div>
                      <div className="app-top"><div><div className="app-hello">My car · MH 12 XX 0000</div><div className="app-title">Rear-left tyre</div></div><span className="app-btn"><Icon id="i-share" /></span></div>
                      <div className="big-read"><div className="n">29<small>psi</small></div><span className="pill"><span className="dot"></span>A little low · 34 °C</span></div>
                      <div className="card-s"><h5>Last 7 days</h5><svg className="spark" viewBox="0 0 220 68"><line x1="10" y1="12" x2="210" y2="12" stroke="#6B7280" strokeWidth="1" strokeDasharray="3 4" opacity=".6"/><text x="210" y="8" textAnchor="end" fontSize="9" fontWeight="600" fill="#6B7280">usual 33 psi</text><polygon points="10,64 10.0,12.0 43.3,16.6 76.6,23.5 109.9,31.5 143.2,39.6 176.5,48.8 209.8,58.0 209.8,64" fill="rgba(37,99,235,.10)"/><polyline points="10.0,12.0 43.3,16.6 76.6,23.5 109.9,31.5 143.2,39.6 176.5,48.8 209.8,58.0" fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/><circle cx="209.8" cy="58.0" r="4" fill="#2563EB" stroke="#fff" strokeWidth="2"/></svg><div className="spark-days"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div>
                      <div className="card-s msg">Pressure has dropped 4 psi since Monday. Top up when you can, and have it checked at a tyre shop.</div>
                      <div className="app-cta"><Icon id="i-map-pin" />Find a tyre shop</div>
                      <div className="tabbar"><Icon id="i-gauge" /><Icon id="i-bell" className="ic on" /><Icon id="i-calendar-event" /><Icon id="i-user" /></div>
                      <div className="home-ind"></div>
                    </div>
                  </div>
                  <span className="shot-cap">Leak alert</span>
                </div>
                <div className="shot">
                  <div className="phone" role="img" aria-label="Illustrative app screen: garage with car and reminders">
                    <div className="screen" aria-hidden="true">
                      <div className="island"></div>
                      <div className="sbar"><span>9:41</span><span className="sbar-icons"><Icon id="i-antenna-bars-5" /><Icon id="i-wifi" /><Icon id="i-battery-3" /></span></div>
                      <div className="app-top"><div><div className="app-hello">2 of 10 vehicles</div><div className="app-title">Your garage</div></div><span className="app-btn"><Icon id="i-plus" /></span></div>
                      <div className="card-s"><div className="veh"><span className="veh-ic"><Icon id="i-car" /></span><div><b>My car</b><span>MH 12 XX 0000</span></div><span className="dot"></span></div><div className="veh"><span className="veh-ic"><Icon id="i-motorbike" /></span><div><b>Family bike</b><span>MH 12 YY 0000 · Shared</span></div><span className="dot ok"></span></div></div>
                      <div className="card-s"><h5>Coming up</h5><div className="rem"><b>Insurance renewal</b><span>in 12 days</span></div><div className="rem"><b>General service</b><span>18 Oct</span></div></div>
                      <div className="card-s"><h5>This month · My car</h5><div className="rem"><b>Mileage</b><span>16 km/l</span></div><div className="rem"><b>Fuel logged</b><span>38 litres</span></div></div>
                      <div className="tabbar"><Icon id="i-gauge" /><Icon id="i-bell" /><Icon id="i-calendar-event" className="ic on" /><Icon id="i-user" /></div>
                      <div className="home-ind"></div>
                    </div>
                  </div>
                  <span className="shot-cap">Your garage</span>
                </div>
              </div>
              <p className="phones-note">Illustrative screens. The live app may look different.</p>
            </div>
          </div>
        </section>

        {/* 5 · WHO IT'S FOR */}
        <section aria-labelledby="who-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Who it&apos;s for</p>
              <h2 id="who-title">Made for the way India drives.</h2>
            </div>
            <div className="agrid">
              <article className="acard">
                <Icon id="i-route" />
                <h3>Daily city commuters</h3>
                <p>Start every drive knowing all four tyres are right.</p>
              </article>
              <article className="acard">
                <Icon id="i-road" />
                <h3>Road-trip families</h3>
                <p>Keep an eye on pressure and temperature on long highway drives.</p>
              </article>
              <article className="acard">
                <Icon id="i-car-suv" />
                <h3>SUV and MPV owners</h3>
                <p>Bigger cars carry more. Keep every tyre at the pressure it needs.</p>
              </article>
              <article className="acard">
                <Icon id="i-steering-wheel" />
                <h3>Cars without built-in TPMS</h3>
                <p>Add live, per-tyre readings to a car that didn&apos;t come with them.</p>
              </article>
              <article className="acard">
                <Icon id="i-users" />
                <h3>Multi-vehicle households</h3>
                <p>Manage up to 10 vehicles and share stats in one app.</p>
              </article>
            </div>
          </div>
        </section>

        {/* CAR KITS (CHANGE 4: "See price on treel.in →" REMOVED FROM ALL CARDS) */}
        <section id="kits" className="bg-mist" aria-labelledby="kits-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Car TPMS kits</p>
              <h2 id="kits-title">Four ways to watch your tyres.</h2>
              <p className="sec-sub">Every kit uses the same clamp-in valve sensors. Choose how you&apos;d like to see your readings, and whether to cover the spare.</p>
            </div>
            <div className="kits four">
              {/* KIT 1 */}
              <article className="kit">
                <div className="kit-art" aria-hidden="true"><Icon id="i-device-mobile" /></div>
                <h3>Sensors + free app</h3>
                <p className="kit-sku">Car TPMS Kit – 4 Sensors</p>
                <ul>
                  <li><Icon id="i-check" /> Four clamp-in valve sensors, one per tyre</li>
                  <li><Icon id="i-check" /> Live pressure and temperature in the free TREEL CARE app</li>
                  <li><Icon id="i-check" /> Fast leak and inflation alerts on your phone</li>
                  <li><Icon id="i-check" /> 5-year warranty on the sensors</li>
                </ul>
                <div className="kit-foot">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => openModal("car_4_sensors_app", "kit_enquire_car_4_sensors_app", e)}
                  >
                    Enquire about this kit
                  </button>
                </div>
              </article>

              {/* KIT 2 */}
              <article className="kit">
                <div className="kit-art" aria-hidden="true"><Icon id="i-device-desktop" /></div>
                <h3>With an in-cabin display</h3>
                <p className="kit-sku">Car TPMS Kit – 4 Sensors with Dedicated Display</p>
                <ul>
                  <li><Icon id="i-check" /> Four clamp-in valve sensors, one per tyre</li>
                  <li><Icon id="i-check" /> All four tyres on a dedicated in-cabin display</li>
                  <li><Icon id="i-check" /> Fast leak and inflation alerts at a glance</li>
                  <li><Icon id="i-check" /> 5-year warranty on the sensors</li>
                </ul>
                <div className="kit-foot">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => openModal("car_4_sensors_display", "kit_enquire_car_4_sensors_display", e)}
                  >
                    Enquire about this kit
                  </button>
                </div>
              </article>

              {/* KIT 3 */}
              <article className="kit">
                <div className="kit-art" aria-hidden="true"><Icon id="i-lifebuoy" /></div>
                <span className="kit-tag">Covers the spare</span>
                <h3>Display, spare included</h3>
                <p className="kit-sku">Car TPMS Kit – 5 Sensors with Dedicated Display</p>
                <ul>
                  <li><Icon id="i-check" /> Five sensors, including one for the spare</li>
                  <li><Icon id="i-check" /> All tyres on a dedicated in-cabin display</li>
                  <li><Icon id="i-check" /> Fast leak and inflation alerts at a glance</li>
                  <li><Icon id="i-check" /> 5-year warranty on the sensors</li>
                </ul>
                <div className="kit-foot">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => openModal("car_5_sensors_display", "kit_enquire_car_5_sensors_display", e)}
                  >
                    Enquire about this kit
                  </button>
                </div>
              </article>

              {/* KIT 4 */}
              <article className="kit">
                <div className="kit-art" aria-hidden="true"><Icon id="i-gps" /></div>
                <span className="kit-tag">Tyres + tracking</span>
                <h3>Sensors + GPS tracking</h3>
                <p className="kit-sku">4W TPMS Kit with GPS Tracking – 5 Sensors</p>
                <ul>
                  <li><Icon id="i-check" /> Five sensors, including one for the spare</li>
                  <li><Icon id="i-check" /> Tracks your tyres and your car&apos;s location</li>
                  <li><Icon id="i-check" /> Fast leak and inflation alerts</li>
                  <li><Icon id="i-check" /> 5-year warranty on the sensors</li>
                </ul>
                <div className="kit-foot">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={(e) => openModal("car_5_sensors_gps", "kit_enquire_car_5_sensors_gps", e)}
                  >
                    Enquire about this kit
                  </button>
                </div>
              </article>
            </div>
            <div className="notch">
              <p>
                Not sure which kit suits your car?
                <span>Tell us your car and how you drive. We&apos;ll recommend the right kit.</span>
              </p>
              <a
                className="btn btn-wa"
                href="https://wa.me/918380087000?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Treel%20Car%20TPMS%20kits"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  pushDataLayer({
                    event: "whatsapp_click",
                    link_label: "kits_whatsapp",
                    product_line: "personal_tpms_4w",
                  })
                }
              >
                <Icon id="i-brand-whatsapp" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </section>

        {/* SEO EXPLAINER */}
        <section aria-labelledby="explain-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Car TPMS, explained</p>
              <h2 id="explain-title">What a tyre pressure monitoring system does.</h2>
            </div>
            <div className="explain">
              <article>
                <h3>What is TPMS?</h3>
                <p>A tyre pressure monitoring system, or TPMS, keeps an eye on the air pressure in your car&apos;s tyres and tells you when one of them drops. Treel adds it to your car with a sensor at each tyre&apos;s valve and the free TREEL CARE app, or a dedicated in-cabin display.</p>
              </article>
              <article>
                <h3>Direct vs indirect TPMS</h3>
                <p>Indirect systems estimate pressure from how fast each wheel spins. A direct TPMS like Treel measures the actual pressure and temperature inside every tyre, so you see a real number for each wheel, not a single warning light.</p>
              </article>
              <article>
                <h3>Why it helps on Indian roads</h3>
                <p>Potholes, highway heat and long gaps between petrol-pump checks make slow leaks easy to miss. With a sensor in every tyre, you find out early and top up before it matters.</p>
              </article>
            </div>
          </div>
        </section>

        {/* PROOF / WHY TREEL */}
        <section className="bg-mist" aria-labelledby="trust-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Why Treel</p>
              <h2 id="trust-title">Why drivers trust Treel.</h2>
            </div>
            <div className="why">
              <div className="why-item"><b>ARAI certified</b><span>Tested and certified in India.</span></div>
              <div className="why-item"><b>Made in India</b><span>Tested against international benchmarks.</span></div>
              <div className="why-item"><b>5-year warranty</b><span>On every Treel car sensor.</span></div>
              <div className="why-item"><b>Patented technology</b><span>Patents in India, US &amp; EU.</span></div>
            </div>
            <div className="rgrid">
              <figure className="quote">
                <blockquote>“TPMS is really a life saving tool for Indian roads. TREEL TPMS is really a great product that I have installed in my all cars. Even after sale service of TREEL team is very responsive. I recommend all safety conscious guys to go for it.”</blockquote>
                <figcaption>Narender Kirar</figcaption>
              </figure>
              <figure className="quote">
                <blockquote>“Amazing Gadget &amp; After Sales Service is very prompt and responsive”</blockquote>
                <figcaption>Rajiv Tiwari</figcaption>
              </figure>
            </div>
            <p className="rev-note">Customer reviews as published on treel.in.</p>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" aria-labelledby="faq-title">
          <div className="wrap">
            <div className="sec-head center">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-title">Car TPMS questions, answered.</h2>
            </div>
            <div className="faq">
              <details open>
                <summary>What is TPMS in a car?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>TPMS stands for tyre pressure monitoring system. Treel&apos;s car TPMS puts a sensor at the valve of each tyre, reads pressure and temperature 24/7, and alerts you early if a tyre starts to lose air.</p>
              </details>
              <details>
                <summary>Which Treel car TPMS kit should I choose?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>Choose the 4-sensor kit if you&apos;re happy to see readings in the free app. Pick a display kit to see your tyres on a screen in the cabin, a 5-sensor kit to cover the spare too, or the GPS kit to track your car&apos;s location as well. Not sure? Request a free call back and we&apos;ll help.</p>
              </details>
              <details>
                <summary>Can I see tyre pressure without using my phone?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>Yes. The display kits show your tyres on a dedicated in-cabin display.</p>
              </details>
              <details>
                <summary>Does Treel monitor the spare tyre?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>Yes, with the 5-sensor kits. The fifth sensor goes on your spare.</p>
              </details>
              <details>
                <summary>How are the car sensors fitted?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>Treel&apos;s clamp-in valve sensors are fitted at each wheel&apos;s valve at a tyre shop. Find a Treel tyre shop near you on treel.in.</p>
              </details>
              <details>
                <summary>Will it fit my car?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>Share your car&apos;s make and model in the enquiry form, and we&apos;ll confirm the right kit before you buy.</p>
              </details>
              <details>
                <summary>What does the car TPMS sensor measure?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>Tyre pressure from 0 to 100 psi and tyre temperature from −20 to 100 °C, around the clock.</p>
              </details>
              <details>
                <summary>What is the warranty on Treel car sensors?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>Treel car sensors come with a 5-year warranty.</p>
              </details>
              <details>
                <summary>Is Treel TPMS certified?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>Yes. Treel TPMS is ARAI certified, made in India and tested against international benchmarks.</p>
              </details>
              <details>
                <summary>How far can my phone be from the sensors?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>The wireless range is up to 100 ft, so you can check every tyre before you reach the car.</p>
              </details>
              <details>
                <summary>Is the TREEL CARE app free?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>Yes. It&apos;s free on Android and iOS, and it also tracks mileage, fuel, insurance renewals and services for up to 10 vehicles.</p>
              </details>
              <details>
                <summary>What is the right tyre pressure for my car?<span className="pm" aria-hidden="true"><Icon id="i-plus" /></span></summary>
                <p>It&apos;s usually on a sticker on the driver&apos;s door frame or fuel flap, and in your owner&apos;s manual. With Treel you see each tyre&apos;s live reading, so topping up to exactly that number is easy.</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* APPROVED PERSONAL TPMS FOOTER */}
      <TpmsLandingFooter />

      {/* COMPACT MODAL POPUP */}
      {isModalOpen && (
        <div
          className="personal-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="personal-modal-card modal-compact" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button
              ref={modalCloseBtnRef}
              className="personal-modal-close"
              type="button"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <Icon id="i-x" />
            </button>

            {!submitSuccess ? (
              <form onSubmit={(e) => handleSubmit(e, "popup")} noValidate>
                <p className="modal-eyebrow">Free expert call back</p>
                <h3 id="modal-title">Get a call back for your vehicle</h3>
                <p className="sub">Leave your details and a Treel expert will call you back.</p>

                {submitError && (
                  <p className="text-red-500 text-xs font-semibold mb-2 p-2 bg-red-50 rounded border border-red-200">
                    {submitError}
                  </p>
                )}

                <div className="field">
                  <label htmlFor="m-name">Your name</label>
                  <input
                    id="m-name"
                    name="full_name"
                    type="text"
                    autoComplete="name"
                    placeholder="Enter your name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="m-phone">Mobile number</label>
                  <div className="tel">
                    <span>+91</span>
                    <input
                      id="m-phone"
                      name="mobile"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      pattern="[6-9][0-9]{9}"
                      maxLength={10}
                      placeholder="10-digit number"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                      required
                    />
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="m-city">City / district</label>
                  <input
                    id="m-city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    placeholder="Enter your city or district"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                  />
                </div>

                <div className="field">
                  <label htmlFor="m-kit">Kit you&apos;re interested in</label>
                  <select
                    id="m-kit"
                    name="kit_interest"
                    value={formData.kit_interest}
                    onChange={(e) => setFormData({ ...formData, kit_interest: e.target.value })}
                    required
                  >
                    <option value="not_sure">Not sure, help me choose</option>
                    <option value="car_4_sensors_app">4 sensors + free app</option>
                    <option value="car_4_sensors_display">4 sensors + in-cabin display</option>
                    <option value="car_5_sensors_display">5 sensors + display (covers the spare)</option>
                    <option value="car_5_sensors_gps">5 sensors + GPS tracking</option>
                  </select>
                </div>

                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Request a callback"}
                </button>
                <p className="form-note">
                  By submitting, you agree to be contacted by Treel about this enquiry. See our{" "}
                  <Link href="/privacy">Privacy Policy</Link>.
                </p>
              </form>
            ) : (
              <div className="thanks">
                <Icon id="i-circle-check" />
                <h3>Thanks. We&apos;ll call you soon.</h3>
                <p>Our tyre specialist will get in touch with you shortly.</p>
                <button className="btn btn-secondary mt-4" type="button" onClick={closeModal}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE STICKY BAR */}
      <div className="mbar">
        <div>
          <b>Treel car tyre sensors</b>
          <span>5-year sensor warranty</span>
        </div>
        <div className="mbar-actions">
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={(e) => openModal(undefined, "mobile_bar_callback", e)}
          >
            Get a call back
          </button>
        </div>
      </div>
    </div>
  );
}
