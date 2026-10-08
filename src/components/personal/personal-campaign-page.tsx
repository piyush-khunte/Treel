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

export function PersonalCampaignPage() {
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
    ad_group: "",
    landing_page: "",
    first_landing_page: "",
    referrer: "",
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
      "ad_group",
    ] as const;

    const captured: Record<string, string> = {};

    keys.forEach((k) => {
      let v = searchParams?.get(k);
      try {
        if (v) {
          sessionStorage.setItem("treel2w_" + k, v);
        } else {
          v = sessionStorage.getItem("treel2w_" + k) || "";
        }
      } catch {
        // sessionStorage restricted
      }
      if (v) captured[k] = v;
    });

    const currentUrl = typeof window !== "undefined" ? window.location.href.split("#")[0] : "";
    let firstLanding = "";
    try {
      firstLanding = sessionStorage.getItem("treel2w_first_landing") || "";
      if (!firstLanding && currentUrl) {
        sessionStorage.setItem("treel2w_first_landing", currentUrl);
        firstLanding = currentUrl;
      }
    } catch {
      firstLanding = currentUrl;
    }

    setAttribution((prev) => ({
      ...prev,
      ...captured,
      landing_page: currentUrl,
      first_landing_page: firstLanding,
      referrer: typeof document !== "undefined" ? document.referrer || "" : "",
    }));

    // Initial page_view event
    pushDataLayer({
      event: "page_view",
      page_path: typeof window !== "undefined" ? window.location.pathname : "/lp-tpms/bike",
      product_line: "personal_tpms_2w",
    });
  }, [searchParams]);

  // 2. Form State Management (Shared between In-Page Form and Modal)
  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    email: "",
    city: "",
    kit_interest: "not_sure",
    vehicle_model: "",
  });

  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const formStartedRef = useRef(false);
  const inPageFormRef = useRef<HTMLFormElement>(null);
  const modalFormRef = useRef<HTMLFormElement>(null);

  const handleFocus = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      pushDataLayer({
        event: "form_start",
        form_id: "bike_tpms_callback",
        product_line: "personal_tpms_2w",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let finalVal = value;
    if (name === "mobile") {
      finalVal = value.replace(/\D/g, "").slice(0, 10);
    }
    setFormData((prev) => ({ ...prev, [name]: finalVal }));
    if (submitError) setSubmitError(null);
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, boolean> = {};
    if (!formData.full_name || formData.full_name.trim().length < 2) {
      errors.full_name = true;
    }
    if (!formData.mobile || !/^[6-9]\d{9}$/.test(formData.mobile.trim())) {
      errors.mobile = true;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/personal/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          ...attribution,
          product_line: "personal_tpms_2w",
          lead_source: "Personal TPMS Bike Landing Page",
          page_path: "/lp-tpms/bike",
          landing_page: "https://treel.in/lp-tpms/bike",
          form_id: "bike_tpms_callback",
          campaign_type: "personal_tpms_2w_campaign",
        }),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.success) {
        const msg =
          result?.error ||
          "Unable to submit your request at this time. Please check your details and try again.";
        setSubmitError(msg);
        setIsSubmitting(false);
        return;
      }

      // Success confirmed by server database persistence
      setIsSubmitting(false);
      setIsSuccess(true);

      pushDataLayer({
        event: "generate_lead",
        form_id: "bike_tpms_callback",
        lead_id: result.leadId,
        kit_interest: formData.kit_interest,
        product_line: "personal_tpms_2w",
      });

      const queryParams = new URLSearchParams();
      if (attribution.utm_source) queryParams.set("utm_source", attribution.utm_source);
      if (attribution.utm_medium) queryParams.set("utm_medium", attribution.utm_medium);
      if (attribution.utm_campaign) queryParams.set("utm_campaign", attribution.utm_campaign);
      if (attribution.utm_term) queryParams.set("utm_term", attribution.utm_term);
      if (attribution.utm_content) queryParams.set("utm_content", attribution.utm_content);
      if (attribution.gclid) queryParams.set("gclid", attribution.gclid);
      if (attribution.fbclid) queryParams.set("fbclid", attribution.fbclid);
      if (attribution.ad_group) queryParams.set("ad_group", attribution.ad_group);
      const queryString = queryParams.toString();
      router.push(`/thank-you${queryString ? `?${queryString}` : ""}`);
    } catch (err) {
      console.error("Callback submission network error:", err);
      setSubmitError("Network connection error. Please check your connection and try again.");
      setIsSubmitting(false);
    }
  };

  // 3. Full-Page Callback Modal Dialog State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((ctaLabel: string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      lastTriggerRef.current = e.currentTarget as HTMLElement;
    }
    pushDataLayer({
      event: "cta_click",
      link_label: ctaLabel,
      product_line: "personal_tpms_2w",
    });
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    if (lastTriggerRef.current) {
      lastTriggerRef.current.focus();
    }
  }, []);

  // Mobile Navigation Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const handleCtaClick = (label: string) => {
    pushDataLayer({
      event: "cta_click",
      link_label: label,
      product_line: "personal_tpms_2w",
    });
  };

  return (
    <div className="personal-campaign">
      {/* Tabler Icons SVG Sprite definition */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
        <symbol id="i-arrow-right" viewBox="0 0 24 24">
          <path d="M5 12l14 0" />
          <path d="M13 18l6 -6" />
          <path d="M13 6l6 6" />
        </symbol>
        <symbol id="i-gauge" viewBox="0 0 24 24">
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          <path d="M13.41 10.59l2.59 -2.59" />
          <path d="M7 12a5 5 0 0 1 5 -5" />
        </symbol>
        <symbol id="i-bell-ringing" viewBox="0 0 24 24">
          <path d="M10 5a2 2 0 0 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
          <path d="M21 6.727a11.05 11.05 0 0 0 -2.794 -3.727" />
          <path d="M3 6.727a11.05 11.05 0 0 1 2.792 -3.727" />
        </symbol>
        <symbol id="i-bell" viewBox="0 0 24 24">
          <path d="M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6" />
          <path d="M9 17v1a3 3 0 0 0 6 0v-1" />
        </symbol>
        <symbol id="i-shield-check" viewBox="0 0 24 24">
          <path d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06" />
          <path d="M15 19l2 2l4 -4" />
        </symbol>
        <symbol id="i-circle-check" viewBox="0 0 24 24">
          <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
          <path d="M9 12l2 2l4 -4" />
        </symbol>
        <symbol id="i-temperature" viewBox="0 0 24 24">
          <path d="M10 13.5a4 4 0 1 0 4 0v-8.5a2 2 0 0 0 -4 0v8.5" />
          <path d="M10 9l4 0" />
        </symbol>
        <symbol id="i-gas-station" viewBox="0 0 24 24">
          <path d="M14 11h1a2 2 0 0 1 2 2v3a1.5 1.5 0 0 0 3 0v-7l-3 -3" />
          <path d="M4 20v-14a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v14" />
          <path d="M3 20l12 0" />
          <path d="M18 7v1a1 1 0 0 0 1 1h1" />
          <path d="M4 11l10 0" />
        </symbol>
        <symbol id="i-motorbike" viewBox="0 0 24 24">
          <path d="M2 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M16 16a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M7.5 14h5l4 -4h-10.5m1.5 4l4 -4" />
          <path d="M13 6h2l1.5 3l2 4" />
        </symbol>
        <symbol id="i-scooter" viewBox="0 0 24 24">
          <path d="M16 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M4 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M8 17h5a6 6 0 0 1 5 -5v-5a2 2 0 0 0 -2 -2h-1" />
        </symbol>
        <symbol id="i-bluetooth" viewBox="0 0 24 24">
          <path d="M7 8l10 8l-5 4l0 -16l5 4l-10 8" />
        </symbol>
        <symbol id="i-device-mobile" viewBox="0 0 24 24">
          <path d="M6 5a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2v-14" />
          <path d="M11 4h2" />
          <path d="M12 17v.01" />
        </symbol>
        <symbol id="i-check" viewBox="0 0 24 24">
          <path d="M5 12l5 5l10 -10" />
        </symbol>
        <symbol id="i-route" viewBox="0 0 24 24">
          <path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
          <path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4" />
          <path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5" />
        </symbol>
        <symbol id="i-road" viewBox="0 0 24 24">
          <path d="M4 19l4 -14" />
          <path d="M16 5l4 14" />
          <path d="M12 8v-2" />
          <path d="M12 13v-2" />
          <path d="M12 18v-2" />
        </symbol>
        <symbol id="i-package" viewBox="0 0 24 24">
          <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
          <path d="M12 12l8 -4.5" />
          <path d="M12 12l0 9" />
          <path d="M12 12l-8 -4.5" />
          <path d="M16 5.25l-8 4.5" />
        </symbol>
        <symbol id="i-users" viewBox="0 0 24 24">
          <path d="M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
          <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
        </symbol>
        <symbol id="i-user" viewBox="0 0 24 24">
          <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
          <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
        </symbol>
        <symbol id="i-calendar-event" viewBox="0 0 24 24">
          <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2l0 -12" />
          <path d="M16 3l0 4" />
          <path d="M8 3l0 4" />
          <path d="M4 11l16 0" />
          <path d="M8 15h2v2h-2l0 -2" />
        </symbol>
        <symbol id="i-map-pin" viewBox="0 0 24 24">
          <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" />
        </symbol>
        <symbol id="i-phone" viewBox="0 0 24 24">
          <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
        </symbol>
        <symbol id="i-plus" viewBox="0 0 24 24">
          <path d="M12 5l0 14" />
          <path d="M5 12l14 0" />
        </symbol>
        <symbol id="i-share" viewBox="0 0 24 24">
          <path d="M3 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M15 6a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
          <path d="M8.7 10.7l6.6 -3.4" />
          <path d="M8.7 13.3l6.6 3.4" />
        </symbol>
        <symbol id="i-car" viewBox="0 0 24 24">
          <path d="M5 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M15 17a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
          <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
        </symbol>
        <symbol id="i-antenna-bars-5" viewBox="0 0 24 24">
          <path d="M6 18l0 -3" />
          <path d="M10 18l0 -6" />
          <path d="M14 18l0 -9" />
          <path d="M18 18l0 -12" />
        </symbol>
        <symbol id="i-wifi" viewBox="0 0 24 24">
          <path d="M12 18l.01 0" />
          <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
          <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
          <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
        </symbol>
        <symbol id="i-battery-3" viewBox="0 0 24 24">
          <path d="M6 7h11a2 2 0 0 1 2 2v.5a.5 .5 0 0 0 .5 .5a.5 .5 0 0 1 .5 .5v3a.5 .5 0 0 1 -.5 .5a.5 .5 0 0 0 -.5 .5v.5a2 2 0 0 1 -2 2h-11a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2" />
          <path d="M7 10l0 4" />
          <path d="M10 10l0 4" />
          <path d="M13 10l0 4" />
        </symbol>
        <symbol id="i-brand-apple" viewBox="0 0 24 24">
          <path d="M8.286 7.008c-3.216 0 -4.286 3.23 -4.286 5.92c0 3.229 2.143 8.072 4.286 8.072c1.165 -.05 1.799 -.538 3.214 -.538c1.406 0 1.607 .538 3.214 .538s4.286 -3.229 4.286 -5.381c-.03 -.011 -2.649 -.434 -2.679 -3.23c-.02 -2.335 2.589 -3.179 2.679 -3.228c-1.096 -1.606 -3.162 -2.113 -3.75 -2.153c-1.535 -.12 -3.032 1.077 -3.75 1.077c-.729 0 -2.036 -1.077 -3.214 -1.077" />
          <path d="M12 4a2 2 0 0 0 2 -2a2 2 0 0 0 -2 2" />
        </symbol>
        <symbol id="i-brand-google-play" viewBox="0 0 24 24">
          <path d="M4 3.71v16.58a.7 .7 0 0 0 1.05 .606l14.622 -8.42a.55 .55 0 0 0 0 -.953l-14.622 -8.419a.7 .7 0 0 0 -1.05 .607l0 -.001" />
          <path d="M15 9l-10.5 11.5" />
          <path d="M4.5 3.5l10.5 11.5" />
        </symbol>
        <symbol id="i-brand-facebook" viewBox="0 0 24 24">
          <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
        </symbol>
        <symbol id="i-brand-instagram" viewBox="0 0 24 24">
          <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4l0 -8" />
          <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
          <path d="M16.5 7.5v.01" />
        </symbol>
        <symbol id="i-brand-youtube" viewBox="0 0 24 24">
          <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8" />
          <path d="M10 9l5 3l-5 3l0 -6" />
        </symbol>
        <symbol id="i-brand-linkedin" viewBox="0 0 24 24">
          <path d="M8 11v5" />
          <path d="M8 8v.01" />
          <path d="M12 16v-5" />
          <path d="M16 16v-3a2 2 0 1 0 -4 0" />
          <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4l0 -10" />
        </symbol>
        <symbol id="i-x" viewBox="0 0 24 24">
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </symbol>
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
            <a href="#kits">Bike kits</a>
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
              onClick={(e) => openModal("header_callback", e)}
            >
              Request a call back
            </button>
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="bike-tpms-mobile-menu"
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
          <div id="bike-tpms-mobile-menu" className="mobile-menu-drawer">
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
                <span>Bike kits</span>
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
                    openModal("mobile_menu_callback", e);
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
        {/* =========================================================================
            SECTION 1: HERO (ABOVE THE FOLD)
            ========================================================================= */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="wrap hero-grid">
            <div>
              <div className="eyebrow-row">
                <span className="chip">Personal</span>
                <span className="eyebrow-text">TPMS for bikes &amp; scooters</span>
              </div>
              <h1 id="hero-title">
                Your bike&apos;s tyre pressure. <span className="accent">Live on your phone.</span>
              </h1>
              <p className="lede">
                Treel sensors watch both tyres and send live pressure and temperature to the free TREEL CARE app. If
                air starts to leak, you&apos;ll know early, long before the ride feels wrong.
              </p>
              <div className="cta-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => openModal("hero_request_callback", e)}
                >
                  <span>Get a call back</span> <Icon id="i-arrow-right" />
                </button>
                <a className="btn btn-secondary" href="#how" onClick={() => handleCtaClick("hero_see_how")}>
                  See how it works
                </a>
              </div>
              <ul className="benefits">
                <li>
                  <Icon id="i-gauge" /> Front and rear, live
                </li>
                <li>
                  <Icon id="i-bell-ringing" /> Early leak alerts
                </li>
                <li>
                  <Icon id="i-shield-check" /> 3-year sensor warranty
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
                  <div className="toast-title">Your rear tyre is a little low.</div>
                  <div className="toast-body">28 psi. Top up when you can.</div>
                </div>
              </div>

              {/* Illustrative Phone Mockup */}
              <div
                className="phone"
                role="img"
                aria-label="Illustrative app screen: live front and rear tyre pressure for a bike, with the rear tyre a little low"
              >
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
                      <div className="app-title">My bike</div>
                      <span className="plate">MH 12 XX 0000</span>
                    </div>
                    <span className="app-btn">
                      <Icon id="i-bell" />
                    </span>
                  </div>
                  <div className="status">
                    <span className="dot"></span>Rear tyre is 4 psi below usual
                  </div>
                  <div className="bike-art">
                    <svg viewBox="0 0 240 150" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="10" y1="136" x2="230" y2="136" stroke="#E5E7EB" strokeWidth="2" />
                      <circle cx="52" cy="100" r="29" stroke="#2563EB" strokeWidth="11" />
                      <circle cx="52" cy="100" r="17" stroke="#D1D5DB" strokeWidth="2.5" />
                      <circle cx="190" cy="100" r="29" stroke="#111827" strokeWidth="11" />
                      <circle cx="190" cy="100" r="17" stroke="#D1D5DB" strokeWidth="2.5" />
                      <path d="M106 95 L52 100" stroke="#111827" strokeWidth="7" />
                      <path d="M62 96 L86 62" stroke="#6B7280" strokeWidth="5" />
                      <path d="M163 44 L124 70 L106 95" stroke="#111827" strokeWidth="7" />
                      <rect x="104" y="70" width="42" height="32" rx="7" fill="#111827" />
                      <path d="M113 78h24M113 85h24M113 92h24" stroke="#6B7280" strokeWidth="2.2" />
                      <path d="M140 102 C134 115 112 117 90 111" stroke="#6B7280" strokeWidth="6" />
                      <path d="M10 94 A42 42 0 0 1 88 78" stroke="#111827" strokeWidth="5" />
                      <path d="M163 68 A42 42 0 0 1 222 73" stroke="#111827" strokeWidth="5" />
                      <path d="M56 60 Q70 49 106 53 L109 63 L60 67 Z" fill="#111827" />
                      <path d="M102 56 Q110 38 138 39 Q156 41 163 51 L155 67 L111 67 Z" fill="#111827" />
                      <path d="M116 50 Q132 44 150 47" stroke="#6B7280" strokeWidth="2.5" />
                      <path d="M190 100 L165 42" stroke="#6B7280" strokeWidth="7" />
                      <path d="M159 40 L176 32" stroke="#111827" strokeWidth="5" />
                      <circle cx="177" cy="52" r="7.5" fill="#F3F4F6" stroke="#111827" strokeWidth="3" />
                      <rect x="16" y="70" width="10" height="5" rx="2" fill="#2563EB" />
                      <circle cx="52" cy="100" r="5" fill="#111827" />
                      <circle cx="190" cy="100" r="5" fill="#111827" />
                      <circle cx="52" cy="83" r="3.2" fill="#fff" stroke="#2563EB" strokeWidth="2" />
                      <circle cx="190" cy="83" r="3.2" fill="#fff" stroke="#111827" strokeWidth="2" />
                      <text x="52" y="149" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563EB" letterSpacing="1">
                        REAR
                      </text>
                      <text x="190" y="149" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6B7280" letterSpacing="1">
                        FRONT
                      </text>
                    </svg>
                  </div>
                  <div className="tyres">
                    <div className="tyre attn">
                      <div className="tyre-label">Rear</div>
                      <div className="tyre-psi">
                        28<small>psi</small>
                      </div>
                      <div className="tyre-temp">36 °C</div>
                      <div className="tyre-state">
                        <span className="dot"></span>A little low
                      </div>
                    </div>
                    <div className="tyre">
                      <div className="tyre-label">Front</div>
                      <div className="tyre-psi">
                        25<small>psi</small>
                      </div>
                      <div className="tyre-temp">34 °C</div>
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

        {/* =========================================================================
            SECTION: REQUEST A CALLBACK (DIRECTLY BELOW HERO)
            ========================================================================= */}
        <section id="callback" className="bg-blue final" aria-labelledby="callback-title" style={{ scrollMarginTop: "80px" }}>
          <div className="wrap">
            <div className="final-grid" style={{ alignItems: "center" }}>
              <div>
                <div className="divider" aria-hidden="true" />
                <p className="eyebrow" style={{ color: "rgba(255, 255, 255, 0.85)" }}>READY WHEN YOU ARE</p>
                <h2 id="callback-title" style={{ color: "#ffffff" }}>Know before you ride.</h2>
                <p className="sec-sub" style={{ color: "rgba(255, 255, 255, 0.9)", margin: "0 0 32px" }}>
                  Choose your kit, have it fitted at a Treel tyre shop, and pair it with the free app. That’s it.
                </p>
                <div className="cta-row" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center", marginBottom: "24px" }}>
                  <a
                    href="#kits"
                    className="btn btn-white"
                  >
                    Shop the bike kit <span aria-hidden="true" style={{ marginLeft: "4px" }}>→</span>
                  </a>
                  <a
                  >
                  </a>
                </div>
                <p className="help-line" style={{ color: "rgba(255, 255, 255, 0.86)", margin: 0 }}>
                  Toll-free support. Or write to{" "}
                  <a href="mailto:hello@treel.in" style={{ color: "#ffffff", fontWeight: "700", textDecoration: "none" }}>
                    hello@treel.in
                  </a>
                </p>
              </div>

              <div className="form-card">
                {!isSuccess ? (
                  <form
                    id="heroCallbackForm"
                    method="POST"
                    action="/api/personal/lead"
                    ref={inPageFormRef}
                    noValidate
                    onSubmit={handleSubmit}
                    onFocus={handleFocus}
                  >
                    <h3>Have a question first?</h3>
                    <p className="sub">Leave your number and we&apos;ll call you back.</p>

                    <div className="field">
                      <label htmlFor="f-name">Full name</label>
                      <input
                        id="f-name"
                        name="full_name"
                        type="text"
                        autoComplete="name"
                        required
                        value={formData.full_name}
                        onChange={handleInputChange}
                        aria-invalid={formErrors.full_name ? "true" : "false"}
                      />
                      {formErrors.full_name && <span className="err">Please enter your full name.</span>}
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
                          required
                          value={formData.mobile}
                          onChange={handleInputChange}
                          aria-invalid={formErrors.mobile ? "true" : "false"}
                        />
                      </div>
                      {formErrors.mobile && <span className="err">Please enter a valid 10-digit mobile number.</span>}
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
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="field">
                        <label htmlFor="f-kit">I’m looking at</label>
                        <select
                          id="f-kit"
                          name="kit_interest"
                          value={formData.kit_interest}
                          onChange={handleInputChange}
                        >
                          <option value="not_sure">Not sure yet</option>
                          <option value="motorbike_kit">Motorbike kit</option>
                          <option value="scooter_kit">Scooter kit</option>
                        </select>
                      </div>
                    </div>

                    <div className="field">
                      <label htmlFor="f-model">Your bike or scooter</label>
                      <input
                        id="f-model"
                        name="vehicle_model"
                        type="text"
                        placeholder="Make and model"
                        value={formData.vehicle_model}
                        onChange={handleInputChange}
                      />
                    </div>

                    {submitError && (
                      <div
                        role="alert"
                        style={{
                          background: "#FEE2E2",
                          border: "1px solid #EF4444",
                          borderRadius: "8px",
                          padding: "10px 14px",
                          marginBottom: "12px",
                          fontSize: "0.85rem",
                          color: "#991B1B",
                        }}
                      >
                        {submitError}
                      </div>
                    )}

                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting…" : "Request a call back"}
                    </button>
                    <p className="form-note">
                      We&apos;ll only use your number to answer your question.
                    </p>
                  </form>
                ) : (
                  <div className="thanks" id="formThanks">
                    <Icon id="i-circle-check" />
                    <h3>Thanks. We&apos;ll call you soon.</h3>
                    <p>Our tyre specialist will get in touch with you shortly.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 2: SPECS STRIP
            ========================================================================= */}
        <div className="specs" role="region" aria-label="Key specifications">
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
                <div className="spec-v">Up to 100 ft</div>
                <div className="spec-k">Wireless range</div>
              </div>
              <div className="spec">
                <div className="spec-v">3 years</div>
                <div className="spec-k">Bike sensor warranty</div>
              </div>
              <div className="spec">
                <div className="spec-v">Free</div>
                <div className="spec-k">TREEL CARE app, Android &amp; iOS</div>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            SECTION 3: THE PROBLEM (WHY IT MATTERS)
            ========================================================================= */}
        <section aria-labelledby="why-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Why it matters</p>
              <h2 id="why-title">On two wheels, tyre pressure is the whole ride.</h2>
              <p className="sec-sub">
                Two small contact patches handle your grip, your braking and how the bike turns. When pressure drifts,
                all three change quietly. Most of us only find out at the petrol pump, if we check at all.
              </p>
            </div>
            <div className="cards-3">
              <div className="pcard">
                <Icon id="i-gauge" />
                <h3>Slow leaks are quiet.</h3>
                <p>
                  Air escapes over days, not seconds. By the time the bike feels heavy, you&apos;ve been riding on it
                  for a while.
                </p>
              </div>
              <div className="pcard">
                <Icon id="i-temperature" />
                <h3>Long rides warm your tyres.</h3>
                <p>
                  Highway runs, a pillion and hot afternoons all raise tyre temperature. It&apos;s worth being able to
                  see it.
                </p>
              </div>
              <div className="pcard">
                <Icon id="i-gas-station" />
                <h3>The pump is a snapshot.</h3>
                <p>A weekly check tells you about one moment. Treel tells you about every ride.</p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: HOW IT WORKS
            ========================================================================= */}
        <section id="how" className="bg-mist" aria-labelledby="how-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">How it works</p>
              <h2 id="how-title">Fitted once. Watching every ride.</h2>
            </div>
            <div className="steps">
              <div className="step">
                <div className="numblock" aria-hidden="true">
                  01
                </div>
                <h3>Get your sensors fitted</h3>
                <p>
                  Treel uses high-grade clamp-in valve sensors that sit at each wheel&apos;s valve. Find a Treel tyre
                  shop near you to have them fitted.
                </p>
                <Link
                  className="textlink"
                  href="/suraksha/centres"
                  onClick={() => handleCtaClick("how_find_tyre_shop")}
                >
                  Find a tyre shop <Icon id="i-arrow-right" />
                </Link>
              </div>
              <div className="step">
                <div className="numblock" aria-hidden="true">
                  02
                </div>
                <h3>Pair with the app</h3>
                <p>Download the free TREEL CARE app on Android or iOS and pair your sensors over Bluetooth.</p>
                <a className="textlink" href="#app" onClick={() => handleCtaClick("how_get_app")}>
                  Get the app <Icon id="i-arrow-right" />
                </a>
              </div>
              <div className="step">
                <div className="numblock" aria-hidden="true">
                  03
                </div>
                <h3>Ride. Treel keeps watch.</h3>
                <p>
                  Pressure and temperature update around the clock. If a leak starts, an alert arrives on your phone.
                </p>
              </div>
            </div>
            <div className="flow" aria-hidden="true">
              <span className="flow-node">
                <Icon id="i-motorbike" /> Sensors in both tyres
              </span>
              <span className="flow-line"></span>
              <span className="flow-node">
                <Icon id="i-bluetooth" /> Bluetooth
              </span>
              <span className="flow-line"></span>
              <span className="flow-node">
                <Icon id="i-device-mobile" /> TREEL CARE app
              </span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: BEFORE / AFTER COMPARISON
            ========================================================================= */}
        <section aria-labelledby="compare-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Before and after</p>
              <h2 id="compare-title">Guesswork out. Numbers in.</h2>
            </div>
            <div className="compare" role="table" aria-label="Riding without TPMS compared with Treel TPMS">
              <div className="crow head" role="row">
                <div role="columnheader"></div>
                <div className="c-without" role="columnheader">
                  Without TPMS
                </div>
                <div className="c-with" role="columnheader">
                  With Treel TPMS
                </div>
              </div>
              <div className="crow" role="row">
                <div className="c-aspect" role="rowheader">
                  Checking pressure
                </div>
                <div className="c-without" role="cell" data-label="Without TPMS">
                  At the pump, when you remember
                </div>
                <div className="c-with" role="cell" data-label="With Treel TPMS">
                  <Icon id="i-check" />
                  <span>Live, front and rear, on every ride</span>
                </div>
              </div>
              <div className="crow" role="row">
                <div className="c-aspect" role="rowheader">
                  A slow leak
                </div>
                <div className="c-without" role="cell" data-label="Without TPMS">
                  Noticed when the bike feels off
                </div>
                <div className="c-with" role="cell" data-label="With Treel TPMS">
                  <Icon id="i-check" />
                  <span>An early alert on your phone</span>
                </div>
              </div>
              <div className="crow" role="row">
                <div className="c-aspect" role="rowheader">
                  Tyre temperature
                </div>
                <div className="c-without" role="cell" data-label="Without TPMS">
                  You can&apos;t see it
                </div>
                <div className="c-with" role="cell" data-label="With Treel TPMS">
                  <Icon id="i-check" />
                  <span>Shown live, from −20 to 100 °C</span>
                </div>
              </div>
              <div className="crow" role="row">
                <div className="c-aspect" role="rowheader">
                  Service and insurance
                </div>
                <div className="c-without" role="cell" data-label="Without TPMS">
                  Remembered, mostly
                </div>
                <div className="c-with" role="cell" data-label="With Treel TPMS">
                  <Icon id="i-check" />
                  <span>Reminders in the app</span>
                </div>
              </div>
              <div className="crow" role="row">
                <div className="c-aspect" role="rowheader">
                  The family&apos;s vehicles
                </div>
                <div className="c-without" role="cell" data-label="Without TPMS">
                  Tracked separately, or not at all
                </div>
                <div className="c-with" role="cell" data-label="With Treel TPMS">
                  <Icon id="i-check" />
                  <span>Up to 10 vehicles in one app</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: FEATURES
            ========================================================================= */}
        <section id="features" className="bg-mist" aria-labelledby="features-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Features</p>
              <h2 id="features-title">Know your tyres. Know your ride.</h2>
              <p className="sec-sub">Everything a bike TPMS should do, and nothing you have to think about.</p>
            </div>
            <div className="fgrid">
              <article className="fcard">
                <div className="ficon">
                  <Icon id="i-gauge" />
                </div>
                <h3>Live pressure, both tyres</h3>
                <p>
                  Front and rear readings update continuously, so you know your pressure before you start the engine.
                </p>
              </article>
              <article className="fcard">
                <div className="ficon">
                  <Icon id="i-bell-ringing" />
                </div>
                <h3>Early leak alerts</h3>
                <p>Super-fast leak detection spots a pressure drop while it&apos;s still a small problem.</p>
              </article>
              <article className="fcard">
                <div className="ficon">
                  <Icon id="i-temperature" />
                </div>
                <h3>Temperature, too</h3>
                <p>See how warm your tyres run on long rides and hot days, from −20 to 100 °C.</p>
              </article>
              <article className="fcard">
                <div className="ficon">
                  <Icon id="i-bluetooth" />
                </div>
                <h3>Up to 100 ft range</h3>
                <p>Check both tyres from your phone before you even walk out to the bike.</p>
              </article>
              <article className="fcard">
                <div className="ficon">
                  <Icon id="i-device-mobile" />
                </div>
                <h3>Hands-free notifications</h3>
                <p>Tyre alerts appear right on your screen, so you don&apos;t have to open the app to know.</p>
              </article>
              <article className="fcard">
                <div className="ficon">
                  <Icon id="i-shield-check" />
                </div>
                <h3>Built to last</h3>
                <p>High-grade clamp-in valve sensors, ARAI certified, with a 3-year warranty on the bike sensor.</p>
              </article>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: TREEL CARE APP
            ========================================================================= */}
        <section id="app" className="bg-charcoal" aria-labelledby="app-title">
          <div className="wrap app-grid">
            <div>
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">The TREEL CARE app</p>
              <h2 id="app-title">More than a pressure gauge.</h2>
              <p className="sec-sub">
                Tyre data is where it starts. The free app also keeps track of the rest of your bike&apos;s life.
              </p>
              <ul className="app-list">
                <li>
                  <span className="tick">
                    <Icon id="i-check" />
                  </span>
                  Mileage and fuel consumption, logged in one place
                </li>
                <li>
                  <span className="tick">
                    <Icon id="i-check" />
                  </span>
                  Reminders for insurance renewals and services
                </li>
                <li>
                  <span className="tick">
                    <Icon id="i-check" />
                  </span>
                  Up to 10 vehicles in one app, your bike and the family car
                </li>
                <li>
                  <span className="tick">
                    <Icon id="i-check" />
                  </span>
                  Share vehicle stats with family members
                </li>
                <li>
                  <span className="tick">
                    <Icon id="i-check" />
                  </span>
                  Cloud backup, so nothing is lost when you change phones
                </li>
                <li>
                  <span className="tick">
                    <Icon id="i-check" />
                  </span>
                  Works on its own, even before you add sensors
                </li>
              </ul>
              <div className="stores">
                <a
                  className="store"
                  href="https://apps.apple.com/in/app/smart-tyre-car-bike/id1403399301"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCtaClick("app_store")}
                >
                  <Icon id="i-brand-apple" />
                  <span>
                    <small>Download on the</small>
                    <b>App Store</b>
                  </span>
                </a>
                <a
                  className="store"
                  href="https://play.google.com/store/apps/details?id=com.treel.android"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleCtaClick("google_play")}
                >
                  <Icon id="i-brand-google-play" />
                  <span>
                    <small>Get it on</small>
                    <b>Google Play</b>
                  </span>
                </a>
              </div>
              <p className="store-note">Listed on both stores as SMART TYRE CAR &amp; BIKE.</p>
            </div>

            <div>
              <div className="phones" role="region" aria-label="Illustrative TREEL CARE app screens" tabIndex={0}>
                {/* Screen 1: Live tyres */}
                <div className="shot">
                  <div
                    className="phone"
                    role="img"
                    aria-label="Illustrative app screen: live front and rear tyre pressure for a bike, with the rear tyre a little low"
                  >
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
                          <div className="app-title">My bike</div>
                          <span className="plate">MH 12 XX 0000</span>
                        </div>
                        <span className="app-btn">
                          <Icon id="i-bell" />
                        </span>
                      </div>
                      <div className="status">
                        <span className="dot"></span>Rear tyre is 4 psi below usual
                      </div>
                      <div className="bike-art">
                        <svg viewBox="0 0 240 150" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="10" y1="136" x2="230" y2="136" stroke="#E5E7EB" strokeWidth="2" />
                          <circle cx="52" cy="100" r="29" stroke="#2563EB" strokeWidth="11" />
                          <circle cx="52" cy="100" r="17" stroke="#D1D5DB" strokeWidth="2.5" />
                          <circle cx="190" cy="100" r="29" stroke="#111827" strokeWidth="11" />
                          <circle cx="190" cy="100" r="17" stroke="#D1D5DB" strokeWidth="2.5" />
                          <path d="M106 95 L52 100" stroke="#111827" strokeWidth="7" />
                          <path d="M62 96 L86 62" stroke="#6B7280" strokeWidth="5" />
                          <path d="M163 44 L124 70 L106 95" stroke="#111827" strokeWidth="7" />
                          <rect x="104" y="70" width="42" height="32" rx="7" fill="#111827" />
                          <path d="M113 78h24M113 85h24M113 92h24" stroke="#6B7280" strokeWidth="2.2" />
                          <path d="M140 102 C134 115 112 117 90 111" stroke="#6B7280" strokeWidth="6" />
                          <path d="M10 94 A42 42 0 0 1 88 78" stroke="#111827" strokeWidth="5" />
                          <path d="M163 68 A42 42 0 0 1 222 73" stroke="#111827" strokeWidth="5" />
                          <path d="M56 60 Q70 49 106 53 L109 63 L60 67 Z" fill="#111827" />
                          <path d="M102 56 Q110 38 138 39 Q156 41 163 51 L155 67 L111 67 Z" fill="#111827" />
                          <path d="M116 50 Q132 44 150 47" stroke="#6B7280" strokeWidth="2.5" />
                          <path d="M190 100 L165 42" stroke="#6B7280" strokeWidth="7" />
                          <path d="M159 40 L176 32" stroke="#111827" strokeWidth="5" />
                          <circle cx="177" cy="52" r="7.5" fill="#F3F4F6" stroke="#111827" strokeWidth="3" />
                          <rect x="16" y="70" width="10" height="5" rx="2" fill="#2563EB" />
                          <circle cx="52" cy="100" r="5" fill="#111827" />
                          <circle cx="190" cy="100" r="5" fill="#111827" />
                          <circle cx="52" cy="83" r="3.2" fill="#fff" stroke="#2563EB" strokeWidth="2" />
                          <circle cx="190" cy="83" r="3.2" fill="#fff" stroke="#111827" strokeWidth="2" />
                          <text x="52" y="149" textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563EB" letterSpacing="1">
                            REAR
                          </text>
                          <text x="190" y="149" textAnchor="middle" fontSize="11" fontWeight="700" fill="#6B7280" letterSpacing="1">
                            FRONT
                          </text>
                        </svg>
                      </div>
                      <div className="tyres">
                        <div className="tyre attn">
                          <div className="tyre-label">Rear</div>
                          <div className="tyre-psi">
                            28<small>psi</small>
                          </div>
                          <div className="tyre-temp">36 °C</div>
                          <div className="tyre-state">
                            <span className="dot"></span>A little low
                          </div>
                        </div>
                        <div className="tyre">
                          <div className="tyre-label">Front</div>
                          <div className="tyre-psi">
                            25<small>psi</small>
                          </div>
                          <div className="tyre-temp">34 °C</div>
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
                  <span className="shot-cap">Live tyres</span>
                </div>

                {/* Screen 2: Leak alert */}
                <div className="shot">
                  <div
                    className="phone"
                    role="img"
                    aria-label="Illustrative app screen: rear tyre pressure over seven days, easing from 32 to 28 psi, with a prompt to top up"
                  >
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
                          <div className="app-hello">My bike · MH 12 XX 0000</div>
                          <div className="app-title">Rear tyre</div>
                        </div>
                        <span className="app-btn">
                          <Icon id="i-share" />
                        </span>
                      </div>
                      <div className="big-read">
                        <div className="n">
                          28<small>psi</small>
                        </div>
                        <span className="pill">
                          <span className="dot"></span>A little low · 36 °C
                        </span>
                      </div>
                      <div className="card-s">
                        <h5>Last 7 days</h5>
                        <svg className="spark" viewBox="0 0 220 68">
                          <line x1="10" y1="12" x2="210" y2="12" stroke="#6B7280" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
                          <text x="210" y="8" textAnchor="end" fontSize="9" fontWeight="600" fill="#6B7280">
                            usual 32 psi
                          </text>
                          <polygon
                            points="10,64 10.0,12.0 43.3,16.6 76.6,23.5 109.9,31.5 143.2,39.6 176.5,48.8 209.8,58.0 209.8,64"
                            fill="rgba(37,99,235,.10)"
                          />
                          <polyline
                            points="10.0,12.0 43.3,16.6 76.6,23.5 109.9,31.5 143.2,39.6 176.5,48.8 209.8,58.0"
                            fill="none"
                            stroke="#2563EB"
                            strokeWidth="2.5"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                          />
                          <circle cx="209.8" cy="58.0" r="4" fill="#2563EB" stroke="#fff" strokeWidth="2" />
                        </svg>
                        <div className="spark-days">
                          <span>Mon</span>
                          <span>Tue</span>
                          <span>Wed</span>
                          <span>Thu</span>
                          <span>Fri</span>
                          <span>Sat</span>
                          <span>Sun</span>
                        </div>
                      </div>
                      <div className="card-s msg">
                        Pressure has dropped 4 psi since Monday. Top up when you can, and have it checked at a tyre shop.
                      </div>
                      <Link
                        className="app-cta"
                        href="/suraksha/centres"
                        onClick={() => handleCtaClick("app_mockup_find_tyre_shop")}
                      >
                        <Icon id="i-map-pin" /> Find a tyre shop
                      </Link>
                      <div className="tabbar">
                        <Icon id="i-gauge" />
                        <Icon id="i-bell" className="ic on" />
                        <Icon id="i-calendar-event" />
                        <Icon id="i-user" />
                      </div>
                      <div className="home-ind"></div>
                    </div>
                  </div>
                  <span className="shot-cap">Leak alert</span>
                </div>

                {/* Screen 3: Your garage */}
                <div className="shot">
                  <div
                    className="phone"
                    role="img"
                    aria-label="Illustrative app screen: a garage with a bike and a shared family car, upcoming insurance and service reminders, and this month's mileage"
                  >
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
                          <div className="app-hello">2 of 10 vehicles</div>
                          <div className="app-title">Your garage</div>
                        </div>
                        <span className="app-btn">
                          <Icon id="i-plus" />
                        </span>
                      </div>
                      <div className="card-s">
                        <div className="veh">
                          <span className="veh-ic">
                            <Icon id="i-motorbike" />
                          </span>
                          <div>
                            <b>My bike</b>
                            <span>MH 12 XX 0000</span>
                          </div>
                          <span className="dot"></span>
                        </div>
                        <div className="veh">
                          <span className="veh-ic">
                            <Icon id="i-car" />
                          </span>
                          <div>
                            <b>Family car</b>
                            <span>MH 12 YY 0000 · Shared</span>
                          </div>
                          <span className="dot ok"></span>
                        </div>
                      </div>
                      <div className="card-s">
                        <h5>Coming up</h5>
                        <div className="rem">
                          <b>Insurance renewal</b>
                          <span>in 12 days</span>
                        </div>
                        <div className="rem">
                          <b>General service</b>
                          <span>18 Oct</span>
                        </div>
                      </div>
                      <div className="card-s">
                        <h5>This month · My bike</h5>
                        <div className="rem">
                          <b>Mileage</b>
                          <span>46 km/l</span>
                        </div>
                        <div className="rem">
                          <b>Fuel logged</b>
                          <span>9.4 litres</span>
                        </div>
                      </div>
                      <div className="tabbar">
                        <Icon id="i-gauge" />
                        <Icon id="i-bell" />
                        <Icon id="i-calendar-event" className="ic on" />
                        <Icon id="i-user" />
                      </div>
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

        {/* =========================================================================
            SECTION 8: WHO IT'S FOR
            ========================================================================= */}
        <section aria-labelledby="who-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Who it&apos;s for</p>
              <h2 id="who-title">Made for the way India rides.</h2>
            </div>
            <div className="agrid">
              <article className="acard">
                <Icon id="i-route" />
                <h3>Daily commuters</h3>
                <p>Start every ride knowing your pressure is right.</p>
              </article>
              <article className="acard">
                <Icon id="i-road" />
                <h3>Highway and touring riders</h3>
                <p>Keep an eye on pressure and temperature over long distances.</p>
              </article>
              <article className="acard">
                <Icon id="i-package" />
                <h3>Delivery riders</h3>
                <p>More kilometres, more wear. Catch a slow leak before it cuts your day short.</p>
              </article>
              <article className="acard">
                <Icon id="i-scooter" />
                <h3>Scooter riders</h3>
                <p>A dedicated Treel kit, made for scooters.</p>
              </article>
              <article className="acard">
                <Icon id="i-users" />
                <h3>Families with more than one vehicle</h3>
                <p>Manage up to 10 vehicles and share stats in one app.</p>
              </article>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: CHOOSE YOUR KIT (PRODUCT CATALOG INTEGRATION)
            ========================================================================= */}
        <section id="kits" className="bg-mist" aria-labelledby="kits-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Choose your kit</p>
              <h2 id="kits-title">Pick the kit for your two-wheeler.</h2>
              <p className="sec-sub">
                Separate kits for motorbikes and scooters. Both come with the free TREEL CARE app.
              </p>
            </div>
            <div className="kits">
              {/* Motorbike Kit */}
              <article className="kit">
                <div className="kit-art" aria-hidden="true">
                  <svg viewBox="4 28 232 116" fill="none" strokeLinecap="round" strokeLinejoin="round" width="72" height="36">
                    <circle cx="52" cy="100" r="28" stroke="#2563EB" strokeWidth="11" />
                    <circle cx="190" cy="100" r="28" stroke="#2563EB" strokeWidth="11" />
                    <path d="M106 95 L52 100" stroke="#2563EB" strokeWidth="8" />
                    <path d="M163 44 L124 70 L106 95" stroke="#2563EB" strokeWidth="8" />
                    <rect x="104" y="70" width="42" height="32" rx="7" fill="#2563EB" />
                    <path d="M56 60 Q70 49 106 53 L109 63 L60 67 Z" fill="#2563EB" />
                    <path d="M102 56 Q110 38 138 39 Q156 41 163 51 L155 67 L111 67 Z" fill="#2563EB" />
                    <path d="M190 100 L165 42" stroke="#2563EB" strokeWidth="8" />
                    <path d="M159 40 L176 32" stroke="#2563EB" strokeWidth="6" />
                    <circle cx="177" cy="52" r="7" fill="#2563EB" />
                    <path d="M10 94 A42 42 0 0 1 88 78" stroke="#2563EB" strokeWidth="5" />
                    <path d="M163 68 A42 42 0 0 1 222 73" stroke="#2563EB" strokeWidth="5" />
                    <circle cx="52" cy="100" r="6" fill="#2563EB" />
                    <circle cx="190" cy="100" r="6" fill="#2563EB" />
                  </svg>
                </div>
                <h3>For motorbikes</h3>
                <p className="kit-sku">2W TPMS Kit · Motorbikes</p>
                <ul>
                  <li>
                    <Icon id="i-check" /> Clamp-in valve sensors for front and rear
                  </li>
                  <li>
                    <Icon id="i-check" /> Live pressure, temperature and leak alerts
                  </li>
                  <li>
                    <Icon id="i-check" /> 3-year sensor warranty
                  </li>
                </ul>
                <div className="kit-foot">
                  <Link
                    className="btn btn-primary"
                    href="/personal/buy"
                    onClick={() => handleCtaClick("motorbike_kit_buy")}
                  >
                    Buy the motorbike kit <Icon id="i-arrow-right" />
                  </Link>
                </div>
              </article>

              {/* Scooter Kit */}
              <article className="kit">
                <div className="kit-art" aria-hidden="true">
                  <svg viewBox="16 22 208 116" fill="none" strokeLinecap="round" strokeLinejoin="round" width="72" height="40">
                    <circle cx="62" cy="108" r="21" stroke="#2563EB" strokeWidth="10" />
                    <circle cx="184" cy="108" r="21" stroke="#2563EB" strokeWidth="10" />
                    <path d="M26 96 Q28 66 70 64 L122 66 L130 98 Z" fill="#2563EB" />
                    <rect x="104" y="90" width="62" height="10" rx="4" fill="#2563EB" />
                    <path d="M150 99 L168 42 L182 45 L170 99 Z" fill="#2563EB" />
                    <path d="M40 60 Q58 46 114 52 L114 62 L44 64 Z" fill="#2563EB" />
                    <path d="M176 46 L184 108" stroke="#2563EB" strokeWidth="7" />
                    <path d="M162 34 L190 29" stroke="#2563EB" strokeWidth="7" />
                    <path d="M160 82 A32 32 0 0 1 210 88" stroke="#2563EB" strokeWidth="5" />
                    <circle cx="62" cy="108" r="5" fill="#2563EB" />
                    <circle cx="184" cy="108" r="5" fill="#2563EB" />
                  </svg>
                </div>
                <h3>For scooters</h3>
                <p className="kit-sku">Smart Sensor Bike Kit (Valve) · Scooters</p>
                <ul>
                  <li>
                    <Icon id="i-check" /> Clamp-in valve sensors for front and rear
                  </li>
                  <li>
                    <Icon id="i-check" /> Live pressure, temperature and leak alerts
                  </li>
                  <li>
                    <Icon id="i-check" /> 3-year sensor warranty
                  </li>
                </ul>
                <div className="kit-foot">
                  <Link
                    className="btn btn-primary"
                    href="/personal/buy"
                    onClick={() => handleCtaClick("scooter_kit_buy")}
                  >
                    Buy the scooter kit <Icon id="i-arrow-right" />
                  </Link>
                </div>
              </article>
            </div>

            {/* Notch Callback CTA */}
            <div className="notch">
              <p>
                Not sure which kit fits your two-wheeler?
                <span>Tell us your make and model and we&apos;ll confirm before you buy.</span>
              </p>
              <button
                type="button"
                className="btn btn-white"
                onClick={(e) => openModal("kits_request_callback", e)}
              >
                Request a call back
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: PROOF / WHY TREEL & REVIEWS
            ========================================================================= */}
        <section aria-labelledby="trust-title">
          <div className="wrap">
            <div className="sec-head">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">Why Treel</p>
              <h2 id="trust-title">Why riders trust Treel.</h2>
            </div>
            <div className="why">
              <div className="why-item">
                <b>ARAI certified</b>
                <span>Tested and certified in India.</span>
              </div>
              <div className="why-item">
                <b>Made in India</b>
                <span>Tested against international benchmarks.</span>
              </div>
              <div className="why-item">
                <b>3-year warranty</b>
                <span>On every Treel bike sensor.</span>
              </div>
              <div className="why-item">
                <b>One free app</b>
                <span>For every vehicle in the family.</span>
              </div>
            </div>
            <div className="rgrid">
              <figure className="quote">
                <blockquote>“Amazing Gadget &amp; After Sales Service is very prompt and responsive”</blockquote>
                <figcaption>Rajiv Tiwari</figcaption>
              </figure>
              <figure className="quote">
                <blockquote>“Customer support and service are very satisfying.”</blockquote>
                <figcaption>Dinanath Kavanekar</figcaption>
              </figure>
            </div>
            <p className="rev-note">Customer reviews as published on treel.in.</p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: READY TO RIDE / FINAL CTA
            ========================================================================= */}
        <section className="bg-blue final" aria-labelledby="final-title">
          <div className="wrap" style={{ textAlign: "center", maxWidth: "780px" }}>
            <div className="divider" style={{ margin: "0 auto 20px" }} aria-hidden="true"></div>
            <p className="eyebrow" style={{ color: "rgba(255, 255, 255, 0.85)" }}>Ready when you are</p>
            <h2 id="final-title">Know before you ride.</h2>
            <p className="sec-sub" style={{ color: "rgba(255, 255, 255, 0.9)", margin: "0 auto 32px" }}>
              Have questions about compatibility or fitment? Speak with our 2W TPMS experts today or request a callback.
            </p>
            <div className="cta-row" style={{ justifyContent: "center", marginBottom: "20px" }}>
              <button
                type="button"
                className="btn btn-white"
                onClick={(e) => openModal("final_request_callback", e)}
              >
                Request a call back <Icon id="i-arrow-right" />
              </button>
            </div>
            <p className="help-line" style={{ marginTop: "16px", color: "rgba(255, 255, 255, 0.75)" }}>
              ARAI Certified · 3-Year Warranty · Made in India
            </p>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: FAQ
            ========================================================================= */}
        <section id="faq" aria-labelledby="faq-title">
          <div className="wrap">
            <div className="sec-head center">
              <div className="divider" aria-hidden="true"></div>
              <p className="eyebrow">FAQ</p>
              <h2 id="faq-title">Questions riders ask.</h2>
            </div>
            <div className="faq">
              <details open>
                <summary>
                  Does TPMS work on bikes and scooters?
                  <span className="pm" aria-hidden="true">
                    <Icon id="i-plus" />
                  </span>
                </summary>
                <p>
                  Yes. Treel makes a 2W TPMS kit for motorbikes and a separate kit for scooters. Both send live tyre
                  pressure and temperature to the free TREEL CARE app.
                </p>
              </details>
              <details>
                <summary>
                  How are the bike sensors fitted?
                  <span className="pm" aria-hidden="true">
                    <Icon id="i-plus" />
                  </span>
                </summary>
                <p>
                  Treel uses high-grade clamp-in valve sensors, fitted at each wheel&apos;s valve. Find a Treel tyre
                  shop near you on treel.in to have them fitted.
                </p>
              </details>
              <details>
                <summary>
                  Will it fit my bike?
                  <span className="pm" aria-hidden="true">
                    <Icon id="i-plus" />
                  </span>
                </summary>
                <p>
                  Treel has separate kits for motorbikes and scooters. Share your make and model in the call-back form,
                  and we&apos;ll confirm the right kit before you buy.
                </p>
              </details>
              <details>
                <summary>
                  Do I need to look at my phone while riding?
                  <span className="pm" aria-hidden="true">
                    <Icon id="i-plus" />
                  </span>
                </summary>
                <p>No. Alerts appear as on-screen notifications. Check them once you&apos;ve stopped somewhere safe.</p>
              </details>
              <details>
                <summary>
                  How far can my phone be from the sensors?
                  <span className="pm" aria-hidden="true">
                    <Icon id="i-plus" />
                  </span>
                </summary>
                <p>
                  The wireless range is up to 100 ft, so you can check both tyres before you reach the bike.
                </p>
              </details>
              <details>
                <summary>
                  What else can the TREEL CARE app do?
                  <span className="pm" aria-hidden="true">
                    <Icon id="i-plus" />
                  </span>
                </summary>
                <p>
                  It tracks mileage, fuel consumption, insurance renewals and services, handles up to 10 vehicles, lets
                  you share stats with family, and backs up your data to the cloud.
                </p>
              </details>
              <details>
                <summary>
                  Is the app free?
                  <span className="pm" aria-hidden="true">
                    <Icon id="i-plus" />
                  </span>
                </summary>
                <p>
                  Yes. TREEL CARE is free on Android and iOS, and you can start using it before you add sensors.
                </p>
              </details>
              <details>
                <summary>
                  What is the warranty on the bike sensor?
                  <span className="pm" aria-hidden="true">
                    <Icon id="i-plus" />
                  </span>
                </summary>
                <p>The bike sensor comes with a 3-year warranty.</p>
              </details>
              <details>
                <summary>
                  Is Treel TPMS certified?
                  <span className="pm" aria-hidden="true">
                    <Icon id="i-plus" />
                  </span>
                </summary>
                <p>Yes. Treel TPMS is ARAI certified, made in India and tested against international benchmarks.</p>
              </details>
              <details>
                <summary>
                  What is the right tyre pressure for my bike?
                  <span className="pm" aria-hidden="true">
                    <Icon id="i-plus" />
                  </span>
                </summary>
                <p>
                  It&apos;s in your owner&apos;s manual, and often on a sticker on the bike itself. With Treel you can see
                  your live reading, so topping up to exactly that number is easy.
                </p>
              </details>
            </div>
          </div>
        </section>
      </main>

      {/* APPROVED PERSONAL TPMS FOOTER */}
      <TpmsLandingFooter />
     

      {/* =========================================================================
          MOBILE STICKY BAR
          ========================================================================= */}
      <div className="mbar">
        <div>
          <b>Treel TPMS for bikes</b>
          <span>3-year sensor warranty</span>
        </div>
        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={(e) => openModal("mobile_bar_callback", e)}
        >
          Request a call back
        </button>
      </div>

      {/* =========================================================================
          FULL-PAGE CALLBACK POPUP MODAL DIALOG
          ========================================================================= */}
      {isModalOpen && (
        <div
          className="personal-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="personal-modal-card modal-compact">
            <button
              ref={modalCloseBtnRef}
              type="button"
              className="personal-modal-close"
              onClick={closeModal}
              aria-label="Close modal"
            >
              <Icon id="i-x" />
            </button>

            <form
              ref={modalFormRef}
              method="POST"
              action="/api/personal/lead"
              noValidate
              onSubmit={handleSubmit}
              onFocus={handleFocus}
            >
              {!isSuccess ? (
                <div>
                  <p className="modal-eyebrow">Free expert call back</p>
                  <h3 id="modalTitle">Get a call back for your vehicle</h3>
                  <p className="sub">Leave your details and a Treel expert will call you back.</p>

                  {submitError && (
                    <p className="text-red-500 text-xs font-semibold mb-2 p-2 bg-red-50 rounded border border-red-200">
                      {submitError}
                    </p>
                  )}

                  <div className="field">
                    <label htmlFor="m-f-name">Your name</label>
                    <input
                      id="m-f-name"
                      name="full_name"
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your name"
                      required
                      value={formData.full_name}
                      onChange={handleInputChange}
                    />
                    {formErrors.full_name && <span className="err">Please enter your name.</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="m-f-phone">Mobile number</label>
                    <div className="tel">
                      <span>+91</span>
                      <input
                        id="m-f-phone"
                        name="mobile"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        pattern="[6-9][0-9]{9}"
                        maxLength={10}
                        placeholder="10-digit number"
                        required
                        value={formData.mobile}
                        onChange={handleInputChange}
                      />
                    </div>
                    {formErrors.mobile && <span className="err">Please enter a valid 10-digit mobile number.</span>}
                  </div>

                  <div className="field">
                    <label htmlFor="m-f-city">City / district</label>
                    <input
                      id="m-f-city"
                      name="city"
                      type="text"
                      placeholder="Enter your city or district"
                      autoComplete="address-level2"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="field">
                    <label htmlFor="m-f-kit">Kit you&apos;re interested in</label>
                    <select
                      id="m-f-kit"
                      name="kit_interest"
                      value={formData.kit_interest}
                      onChange={handleInputChange}
                    >
                      <option value="motorbike_kit">Motorbike kit</option>
                      <option value="scooter_kit">Scooter kit</option>
                      <option value="not_sure">Not sure yet</option>
                    </select>
                  </div>

                  <div className="field">
                    <label htmlFor="m-f-model">Your bike or scooter</label>
                    <input
                      id="m-f-model"
                      name="vehicle_model"
                      type="text"
                      placeholder="Make and model, e.g. Royal Enfield Hunter 350"
                      value={formData.vehicle_model}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Request a callback"}
                  </button>
                  <p className="form-note">
                    By submitting, you agree to be contacted by Treel about this enquiry. See our{" "}
                    <Link href="/privacy">Privacy Policy</Link>.
                  </p>
                </div>
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
