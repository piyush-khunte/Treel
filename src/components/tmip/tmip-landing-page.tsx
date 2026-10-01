"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { TmipLandingNavbar } from "@/components/tmip/tmip-landing-navbar";
import { TmipLandingFooter } from "@/components/tmip/tmip-landing-footer";
import "@/app/tmip/tmip-landing.css";

function pushDataLayer(eventData: Record<string, unknown>) {
  if (typeof window !== "undefined") {
    const w = window as unknown as { dataLayer?: unknown[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push(eventData);
  }
}

interface AdVariant {
  h1: string;
  lede: string;
}

const VARIANTS: Record<string, AdVariant> = {
  tpms: {
    h1: "Tyre pressure management that pays back in nine months.",
    lede: "TMIP monitors pressure, temperature and remaining life on every wheel, then links tyre health to the rest of the vehicle, so your fleet catches failures before they reach the highway.",
  },
  maintenance: {
    h1: "Fleet maintenance software that predicts failures.",
    lede: "TMIP learns how each vehicle normally behaves and flags component wear early, with breakdown probability and service due dates for every truck in your fleet.",
  },
  telematics: {
    h1: "Your GPS shows where trucks are. TMIP shows what's about to fail.",
    lede: "TMIP layers vehicle health, tyre intelligence and predictive maintenance on top of your existing telematics, with native connectors for Fleetx, Locus and LogiNext.",
  },
  cost: {
    h1: "Cut cost per kilometre across every vehicle.",
    lede: "TMIP brings fuel, tyre, maintenance and downtime into one live cost-per-km view, by vehicle, route, driver and region. Median payback across TMIP fleets is nine months.",
  },
  digitaltwin: {
    h1: "The Vehicle Digital Twin for enterprise fleets.",
    lede: "Every vehicle rendered as a live intelligence surface: component health, tyre state, fuel signature, driver behaviour and predicted maintenance windows, in one view.",
  },
};

const DEFAULT_VARIANT: AdVariant = {
  h1: "Predict breakdowns before they stop your fleet.",
  lede: "TMIP builds a live digital twin of every vehicle, covering tyres, engine, fuel, brakes and driver behaviour, and flags component wear before it turns into a roadside failure.",
};

const TABS = [
  {
    id: "t-tyre",
    controls: "p-tyre",
    title: "Tyre intelligence",
    sub: "Pressure, temperature, life per wheel",
  },
  {
    id: "t-pred",
    controls: "p-pred",
    title: "Breakdown prediction",
    sub: "AI forecasts and service windows",
  },
  {
    id: "t-alert",
    controls: "p-alert",
    title: "Real-time alerts",
    sub: "Every event, time-stamped",
  },
  {
    id: "t-driver",
    controls: "p-driver",
    title: "Driver behaviour",
    sub: "Scores your safety team can coach on",
  },
  {
    id: "t-maint",
    controls: "p-maint",
    title: "Maintenance planning",
    sub: "Component life and next action",
  },
  {
    id: "t-cost",
    controls: "p-cost",
    title: "Cost impact",
    sub: "Savings your CFO can verify",
  },
];

const SLIDES = [
  {
    src: "/images/Approved Images timp landing page/Vehicle_Status_Engine - New.png",
    alt: "TMIP live Vehicle Digital Twin: Engine and overall vehicle health dashboard showing commercial truck status with 4% breakdown probability",
    caption: "The live Vehicle Digital Twin: one view per vehicle, per fleet, per region.",
    badge: "Health 87/100 · Breakdown risk 4%",
  },
  {
    src: "/images/Approved Images timp landing page/Vehicle_Status_Engine_TPMS_View - New.png",
    alt: "TMIP Tyre Pressure Monitoring System view per wheel showing pressure, temperature and remaining useful life",
    caption: "Per-wheel telemetry: real-time pressure, thermal signatures and remaining useful life.",
    badge: "Tyre Life +7% · Median Payback 9 mo",
  },
  {
    src: "/images/Approved Images timp landing page/Vehicle_Status_Engine_TPMS_TrendView_Temp - New.png",
    alt: "TMIP Predictive Maintenance trend view and service window forecasting",
    caption: "Predictive intelligence: machine-learning wear models and service due windows.",
    badge: "Next Service: 17 Days · 0 Highway Stops",
  },
  {
    src: "/images/Approved Images timp landing page/fleet-overview_Grid - New.png",
    alt: "TMIP Multi-Fleet Overview Grid across national routes, depots and vehicle categories",
    caption: "Fleet-wide visibility: aggregate uptime, active alerts and driver safety scores.",
    badge: "68,000+ Vehicles Under Management",
  },
  {
    src: "/images/Approved Images timp landing page/AlertStatus_Status_Performance - New.png",
    alt: "TMIP Real-Time Alert Feed and Fleet Performance Dashboard",
    caption: "Severity-ranked alert feed: sub-second updates from roadside and highway sensors.",
    badge: "Sub-Second Telemetry · 99.7% Uptime",
  },
  {
    src: "/images/Approved Images timp landing page/dashboard_3.png",
    alt: "TMIP Executive Operations Dashboard showing total cost per kilometre and ROI metrics",
    caption: "Executive mobility intelligence: true cost per kilometre by vehicle, route and driver.",
    badge: "Median Payback 9 Months",
  },
  {
    src: "/images/Approved Images timp landing page/Vehicle_Status_Engine_TPMS_TrendView_Temp_1 - New.png",
    alt: "TMIP Thermal and Pressure Analytics view for commercial long-haul fleet vehicles",
    caption: "Component lifecycle analytics: highway blowout prevention before heat build-up spreads.",
    badge: "100% Carcass Salvage Rate",
  },
];

const FEATURE_SLIDES = [
  {
    num: "01",
    tag: "Fleet management software",
    headline: "Your whole fleet on one screen.",
    description:
      "One dashboard for every vehicle: which are active, which are idle, what is alerting and what is due, filtered by depot.",
    bullets: [
      "Fleet overview in list, grid and map views",
      "Active, inactive and in-progress vehicles at a glance",
      "Alert, inspection and tyre-life summaries",
    ],
    image: {
      src: "/images/tmip-features/fleet-management-software.jpg",
      alt: "TMIP fleet dashboard showing total, active, inactive and in-progress vehicles, distance and turnaround charts, active alerts and an inactive vehicles summary",
      width: 738,
      height: 552,
    },
  },
  {
    num: "02",
    tag: "Fleet telematics & GPS",
    headline: "Live location and telemetry, every truck.",
    description:
      "Sub-second updates across the fleet, on a live map, with engine and tyre data in the same view.",
    bullets: [
      "Live map with vehicle clusters by region",
      "Speed, RPM, engine load, fuel, DEF/AdBlue, battery and coolant",
      "Native integration with Fleetx, Locus, LogiNext and custom TMS",
    ],
    image: {
      src: "/images/tmip-features/fleet-telematics-gps.jpg",
      alt: "TMIP live map of the fleet across South India, with vehicle clusters by region",
      width: 1043,
      height: 545,
    },
  },
  {
    num: "03",
    tag: "Predictive maintenance",
    headline: "Fix it before it fails.",
    description:
      "Machine-learning models flag component wear before failure, so a roadside breakdown becomes a scheduled service.",
    bullets: [
      "A health score out of 100 for every vehicle",
      "Breakdown probability, per vehicle, every day",
      "Remaining useful life of each tyre, in km",
    ],
    image: {
      src: "/images/tmip-features/predictive-maintenance.jpg",
      alt: "TMIP vehicle health score of 75 out of 100 and a low breakdown risk of 6 percent",
      width: 524,
      height: 230,
    },
  },
  {
    num: "04",
    tag: "Fuel efficiency for fleets",
    navLabel: "Fuel efficiency",
    headline: "Stop losing fuel and tread to bad pressure.",
    description:
      "Under-inflation quietly eats tread and fuel. TMIP puts fuel use, mileage and tyre pressure side by side, so you can see where it is going.",
    bullets: [
      "Fuel consumption, distance and km/L, compared with yesterday",
      "Average pressure, temperature and pressure difference across the fleet",
      "5–7% tyre-life extension, fleet median",
    ],
    image: {
      src: "/images/tmip-features/fuel-efficiency.jpg",
      alt: "TMIP fleet tiles: fuel consumption, distance travelled and mileage, with average pressure, temperature, pressure difference and pressure-to-temperature ratio",
      width: 682,
      height: 468,
    },
  },
  {
    num: "05",
    tag: "Mobility intelligence",
    headline: "From tyre monitoring to mobility intelligence.",
    description:
      "Every truck becomes a Vehicle Digital Twin: a live record of component health, tyre state, fuel and driver behaviour, turned into the number your CFO asks for, true cost per kilometre by vehicle class, route, driver and region.",
    mstats: [
      { value: "68,412", label: "Vehicles under management" },
      { value: "99.7%", label: "Platform uptime" },
      { value: "9 mo", label: "Median payback" },
    ],
    image: {
      src: "/images/tmip-features/mobility-intelligence.jpg",
      alt: "TMIP Vehicle Digital Twin: a 3D truck showing battery, engine, tyres, brakes, fuel and driveline health",
      width: 858,
      height: 547,
    },
  },
];

export function TmipLandingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Dynamic ad-group message matching
  const agParam = (searchParams?.get("ag") || "").toLowerCase();
  const activeVariant = VARIANTS[agParam] || DEFAULT_VARIANT;

  // Attribution capture state
  const [attribution, setAttribution] = useState({
    gclid: "",
    fbclid: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_term: "",
    utm_content: "",
    ad_group: agParam,
    landing_page: "",
  });

  useEffect(() => {
    const keys = ["gclid", "fbclid", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
    const captured: Record<string, string> = {};

    keys.forEach((k) => {
      let v = searchParams?.get(k);
      try {
        if (v) {
          sessionStorage.setItem("tmip_" + k, v);
        } else {
          v = sessionStorage.getItem("tmip_" + k) || "";
        }
      } catch {
        // sessionStorage restricted
      }
      if (v) captured[k] = v;
    });

    setAttribution((prev) => ({
      ...prev,
      ...captured,
      ad_group: agParam,
      landing_page: typeof window !== "undefined" ? window.location.href.split("#")[0] : "",
    }));
  }, [searchParams, agParam]);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    fleet_size: "",
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formStartedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Validation rules
  const validateField = (field: string, value: string): boolean => {
    switch (field) {
      case "name":
        return value.trim().length >= 2;
      case "phone":
        return /^[6-9]\d{9}$/.test(value.trim());
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
      case "company":
        return value.trim().length >= 2;
      case "fleet_size":
        return value !== "";
      default:
        return true;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    let finalValue = value;

    if (name === "phone") {
      finalValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setFormData((prev) => ({ ...prev, [name]: finalValue }));
    if (submitError) {
      setSubmitError(null);
    }

    if (errors[name]) {
      const isValid = validateField(name, finalValue);
      setErrors((prev) => ({ ...prev, [name]: !isValid }));
    }
  };

  const handleBlur = (field: string) => {
    if (formData[field as keyof typeof formData]) {
      const isValid = validateField(field, formData[field as keyof typeof formData]);
      setErrors((prev) => ({ ...prev, [field]: !isValid }));
    }
  };
  const handleFocus = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      pushDataLayer({ event: "form_start", form_id: activeFormId || "tmip_demo" });
    }
  };

  const handleSubmit = async (e: React.FormEvent, submitFormId?: "tmip_demo" | "tmip_footer_demo") => {
    e.preventDefault();
    const currentFormId = submitFormId || activeFormId || "tmip_demo";

    const fields = ["name", "phone", "email", "company", "fleet_size"];
    const newErrors: Record<string, boolean> = {};
    let firstInvalid = "";

    fields.forEach((f) => {
      const valid = validateField(f, formData[f as keyof typeof formData]);
      if (!valid) {
        newErrors[f] = true;
        if (!firstInvalid) firstInvalid = f;
      }
    });

    setErrors(newErrors);

    if (firstInvalid) {
      const el = formRef.current?.elements.namedItem(firstInvalid) as HTMLElement | null;
      el?.focus();
      return;
    }

    setSubmitError(null);
    setIsSubmitting(true);

    const fullPhone = "+91" + formData.phone;

    try {
      const res = await fetch("/api/tmip/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: fullPhone,
          email: formData.email,
          company: formData.company,
          fleet_size: formData.fleet_size,
          form_id: currentFormId,
          campaign_type: "tmip_campaign",
          lead_source: "website",
          ...attribution,
        }),
      });

      const result = await res.json().catch(() => null);

      if (!res.ok || !result?.success) {
        const errorMsg =
          result?.error ||
          "Unable to submit your request at this time. Please check your details and try again, or call us at 1800 833 0233.";
        setSubmitError(errorMsg);
        setIsSubmitting(false);
        return;
      }

      // Success confirmed by database persistence
      pushDataLayer({
        event: "generate_lead",
        form_id: currentFormId,
        lead_id: result.leadId,
        fleet_size: formData.fleet_size,
        ad_group: attribution.ad_group,
        enhanced_conversion_data: {
          email: formData.email,
          phone_number: fullPhone,
        },
      });

      // Close modal and redirect directly to /tmip/demo/scheduled with attribution query params
      setIsModalOpen(false);
      setIsSubmitting(false);

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
      const redirectUrl = `/tmip/demo/scheduled${queryString ? `?${queryString}` : ""}`;
      router.push(redirectUrl);
    } catch (err) {
      console.error("Lead submission network error:", err);
      setSubmitError("Network connection error. Please check your internet and try again.");
      setIsSubmitting(false);
    }
  };

  // Hero Image Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderPaused, setIsSliderPaused] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mediaQuery.matches) return;
    }

    if (isSliderPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isSliderPaused]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  const handleGoToSlide = (idx: number) => {
    setCurrentSlide(idx);
  };

  // Feature Showcase Carousel State (Section 7)
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isFeaturePaused, setIsFeaturePaused] = useState(false);
  const featureTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleFeatureSelect = (index: number, focus = false) => {
    setActiveFeatureIndex(index);
    if (focus && featureTabRefs.current[index]) {
      featureTabRefs.current[index]?.focus();
    }
  };

  const handlePrevFeature = () => {
    setActiveFeatureIndex((prev) => (prev === 0 ? FEATURE_SLIDES.length - 1 : prev - 1));
  };

  const handleNextFeature = () => {
    setActiveFeatureIndex((prev) => (prev === FEATURE_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (index + 1) % FEATURE_SLIDES.length;
      handleFeatureSelect(next, true);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (index - 1 + FEATURE_SLIDES.length) % FEATURE_SLIDES.length;
      handleFeatureSelect(prev, true);
    } else if (e.key === "Home") {
      e.preventDefault();
      handleFeatureSelect(0, true);
    } else if (e.key === "End") {
      e.preventDefault();
      handleFeatureSelect(FEATURE_SLIDES.length - 1, true);
    }
  };

  useEffect(() => {
    if (isFeaturePaused) return;
    if (typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev === FEATURE_SLIDES.length - 1 ? 0 : prev + 1));
    }, 5500);
    return () => clearInterval(timer);
  }, [isFeaturePaused]);

  // Section 11 Image Card Carousel State
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    if (isCarouselHovered) return;
    const timer = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isCarouselHovered]);

  const handleNextCarousel = () => {
    setCarouselIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrevCarousel = () => {
    setCarouselIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // Full-Page Demo Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFormId, setActiveFormId] = useState<"tmip_demo" | "tmip_footer_demo">("tmip_demo");
  const modalCloseBtnRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((location: string, e?: React.MouseEvent, formId: "tmip_demo" | "tmip_footer_demo" = "tmip_demo") => {
    if (e) {
      e.preventDefault();
      lastTriggerRef.current = e.currentTarget as HTMLElement;
    }
    setActiveFormId(formId);
    pushDataLayer({ event: "cta_click", cta_location: location, form_id: formId });
    setIsModalOpen(true);
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
    const timeout = setTimeout(() => {
      modalCloseBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timeout);
    };
  }, [isModalOpen, closeModal]);

  useEffect(() => {
    const handleOpenModalEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ location?: string }>;
      openModal(customEvent?.detail?.location || "header");
    };

    window.addEventListener("open-tmip-demo-modal", handleOpenModalEvent);
    return () => {
      window.removeEventListener("open-tmip-demo-modal", handleOpenModalEvent);
    };
  }, [openModal]);

  useEffect(() => {
    if (searchParams?.get("open") === "demo") {
      openModal("url_param");
    }
  }, [searchParams, openModal]);

  // CTA Click handler: opens full-page demo modal for demo CTAs with attribution intact
  const handleCtaClick = useCallback(
    (location: string, e?: React.MouseEvent) => {
      if (location === "final-compare") {
        pushDataLayer({ event: "cta_click", cta_location: location });
        return;
      }
      openModal(location, e);
    },
    [openModal]
  );

  // Explorer Tab State
  const [activeTab, setActiveTab] = useState<string>("t-tyre");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabSelect = (tabId: string, focus = false) => {
    setActiveTab(tabId);
    pushDataLayer({ event: "platform_tab", tab: tabId });
    if (focus) {
      const idx = TABS.findIndex((t) => t.id === tabId);
      if (idx !== -1 && tabRefs.current[idx]) {
        tabRefs.current[idx]?.focus();
      }
    }
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      nextIndex = (index + 1) % TABS.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      nextIndex = (index - 1 + TABS.length) % TABS.length;
    } else if (e.key === "Home") {
      nextIndex = 0;
    } else if (e.key === "End") {
      nextIndex = TABS.length - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      handleTabSelect(TABS[nextIndex].id, true);
    }
  };

  // Mobile Sticky CTA state
  const [showMobileCta, setShowMobileCta] = useState(false);
  const demoRef = useRef<HTMLDivElement>(null);
  const finalRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    let formInView = true;
    let finalInView = false;

    const checkSticky = () => {
      const scrolled = window.scrollY > 300;
      setShowMobileCta(!formInView && !finalInView && scrolled);
    };

    const formObserver = new IntersectionObserver((entries) => {
      formInView = entries[0]?.isIntersecting ?? false;
      checkSticky();
    });

    const finalObserver = new IntersectionObserver((entries) => {
      finalInView = entries[0]?.isIntersecting ?? false;
      checkSticky();
    });

    if (demoRef.current) formObserver.observe(demoRef.current);
    if (finalRef.current) finalObserver.observe(finalRef.current);

    window.addEventListener("scroll", checkSticky, { passive: true });

    return () => {
      formObserver.disconnect();
      finalObserver.disconnect();
      window.removeEventListener("scroll", checkSticky);
    };
  }, []);

  return (
    <div className="tmip-landing">
      {/* TMIP APPROVED NAVBAR */}
      <TmipLandingNavbar onDemoClick={handleCtaClick} />

      {/* Skip Link */}
      <a href="#demo" className="skip">
        Skip to demo booking
      </a>

      {/* =========================================================================
          SECTION 2: HERO & SECTION 3: LEAD FORM & SECTION 4: READOUT METRICS
          ========================================================================= */}
      <section className="hero" id="top">
        <div className="wrap hero-grid">
          {/* Left Column: Hero Content */}
          <div className="hero-copy">
            <div className="kicker">
              <svg
                viewBox="0 0 100 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-3.5 w-auto shrink-0 -translate-y-px"
                aria-hidden="true"
              >
                <g fill="#3B82F6">
                  <rect x="5" y="4" width="90" height="8.5" rx="1.5" opacity="0.6" />
                  <rect x="5" y="16" width="90" height="8.5" rx="1.5" opacity="0.85" />
                  <rect x="5" y="28" width="90" height="8.5" rx="1.5" />
                </g>
              </svg>
              <span>
                <b>Vehicle Digital Twin</b> for enterprise fleets
              </span>
            </div>

            <h1 id="h1">{activeVariant.h1}</h1>

            <p className="lede" id="lede">
              {activeVariant.lede}
            </p>

            <ul className="checks">
              <li>
                <svg aria-hidden="true" height="20" viewBox="0 0 20 20" width="20">
                  <rect fill="rgba(16,185,129,.15)" height="20" width="20" rx="2" />
                  <path d="M5 10.5l3.2 3L15 7" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Tyre pressure and temperature on every wheel, with remaining useful life in km</span>
              </li>
              <li>
                <svg aria-hidden="true" height="20" viewBox="0 0 20 20" width="20">
                  <rect fill="rgba(16,185,129,.15)" height="20" width="20" rx="2" />
                  <path d="M5 10.5l3.2 3L15 7" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Breakdown probability and service due dates, per vehicle</span>
              </li>
              <li>
                <svg aria-hidden="true" height="20" viewBox="0 0 20 20" width="20">
                  <rect fill="rgba(16,185,129,.15)" height="20" width="20" rx="2" />
                  <path d="M5 10.5l3.2 3L15 7" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>True cost per kilometre by vehicle, route, driver and region</span>
              </li>
            </ul>

            {/* Readout Metrics */}
            <div aria-label="Platform results" className="readout">
              <div>
                <strong>68,412</strong>
                <span>Vehicles under management</span>
              </div>
              <div>
                <strong>9 mo</strong>
                <span>Median payback period</span>
              </div>
              <div>
                <strong>5–7%</strong>
                <span>Tyre-life extension, fleet median</span>
              </div>
              <div>
                <strong>99.7%</strong>
                <span>Platform uptime, trailing 90 days</span>
              </div>
            </div>

            <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "14px", alignItems: "center" }}>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleCtaClick("hero_primary", e)}
              >
                Book a demo
              </button>
              <a className="btn btn-ghost" href="#platform">
                Explore platform
              </a>
            </div>
          </div>

          {/* Right Column: Live Platform Hero Preview Card */}
          <div id="demo" ref={demoRef}>
            <div className="hero-preview-card">
              <div className="hero-preview-header">
                <h2>Live Vehicle Digital Twin</h2>
                <span className="hero-preview-badge">
                  <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#10B981", display: "inline-block" }} />
                  Live Platform
                </span>
              </div>

              <div
                className="hero-preview-img-wrap"
                onClick={(e) => handleCtaClick("hero_preview_img", e)}
                role="button"
                tabIndex={0}
                aria-label="Open TMIP demo booking popup"
              >
                <Image
                  src="/images/Approved Images timp landing page/Vehicle_Status_Engine - New.png"
                  alt="TMIP Live Vehicle Digital Twin dashboard interface"
                  width={560}
                  height={350}
                  priority
                />
              </div>

              <p className="sub">
                Sub-second telemetry, predictive breakdown forecasting, and cost-per-km analytics on your actual fleet.
              </p>

              <button
                type="button"
                className="btn btn-primary"
                style={{ width: "100%" }}
                onClick={(e) => handleCtaClick("hero_preview_card", e)}
              >
                Book a 30-minute demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: HERO SCREEN BAND — APPROVED IMAGE SLIDER
          ========================================================================= */}
      <section aria-label="TMIP dashboard gallery" className="screen-band">
        <div className="wrap">
          <div
            className="slider-container"
            onMouseEnter={() => setIsSliderPaused(true)}
            onMouseLeave={() => setIsSliderPaused(false)}
            onFocus={() => setIsSliderPaused(true)}
            onBlur={() => setIsSliderPaused(false)}
          >
            <figure className="screen" style={{ margin: 0, position: "relative" }}>
              {SLIDES.map((slide, idx) => (
                <div
                  key={slide.src}
                  className={`slide-item ${idx === currentSlide ? "active" : ""}`}
                  aria-hidden={idx !== currentSlide}
                >
                  <Image
                    alt={slide.alt}
                    src={slide.src}
                    width={1920}
                    height={911}
                    priority={idx === 0}
                    loading={idx === 0 ? "eager" : "lazy"}
                    className="w-full h-auto"
                    style={{ objectFit: "contain" }}
                  />
                </div>
              ))}

              {/* Slider Navigation Arrows */}
              <button
                type="button"
                className="slider-arrow slider-prev"
                onClick={handlePrevSlide}
                aria-label="Previous dashboard screen"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className="slider-arrow slider-next"
                onClick={handleNextSlide}
                aria-label="Next dashboard screen"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Pagination Dots */}
              <div className="slider-dots" role="tablist" aria-label="Dashboard slides">
                {SLIDES.map((slide, idx) => (
                  <button
                    key={slide.src}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentSlide}
                    aria-label={`Slide ${idx + 1}: ${slide.badge}`}
                    className={`slider-dot ${idx === currentSlide ? "active" : ""}`}
                    onClick={() => handleGoToSlide(idx)}
                  />
                ))}
              </div>
            </figure>
          </div>

          <div className="screen-cap">
            <span>{SLIDES[currentSlide].caption}</span>
            <span>
              <b>{SLIDES[currentSlide].badge}</b>
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: TRUST STRIP
          ========================================================================= */}
      <section aria-label="Certifications" className="trust">
        <div className="wrap">
          <p>Built by Treel</p>
          <ul>
            <li>ARAI certified</li>
            <li>ISO 9001:2015</li>
            <li>Patents in India, US &amp; EU</li>
            <li>Made in India</li>
          </ul>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: ONE PLATFORM. FIVE WAYS TO RUN A LEANER FLEET
          ========================================================================= */}
      <section className="sec light" id="features" aria-labelledby="features-title">
        <div className="wrap">
          <div className="sec-head">
            <div aria-hidden="true" className="divider"></div>
            <h2 id="features-title">One platform. Five ways to run a leaner fleet.</h2>
            <p>
              Fleet management, live telematics, predictive maintenance, fuel efficiency and mobility intelligence, all
              built on the Vehicle Digital Twin. Start with the problem that costs you most.
            </p>
          </div>
          <div
            className="feat-showcase"
            onMouseEnter={() => setIsFeaturePaused(true)}
            onMouseLeave={() => setIsFeaturePaused(false)}
            onFocus={() => setIsFeaturePaused(true)}
            onBlur={() => setIsFeaturePaused(false)}
          >
            {/* Feature Selectors / Jump Tabs */}
            <div className="feat-tabs" role="tablist" aria-label="TMIP platform capabilities">
              {FEATURE_SLIDES.map((f, idx) => {
                const isActive = idx === activeFeatureIndex;
                return (
                  <button
                    key={f.num}
                    ref={(el) => {
                      featureTabRefs.current[idx] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`feat-tab-${f.num}`}
                    aria-selected={isActive}
                    aria-controls={`feat-panel-${f.num}`}
                    tabIndex={isActive ? 0 : -1}
                    className={`feat-tab ${isActive ? "active" : ""}`}
                    onClick={() => handleFeatureSelect(idx)}
                    onKeyDown={(e) => handleFeatureKeyDown(e, idx)}
                  >
                    <span className="feat-tab-num">{f.num}</span>
                    <span className="feat-tab-label">{f.navLabel || f.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Slides Viewport - Only active slide visible */}
            <div className="feat-viewport">
              {FEATURE_SLIDES.map((f, idx) => {
                const isActive = idx === activeFeatureIndex;
                return (
                  <div
                    key={f.num}
                    id={`feat-panel-${f.num}`}
                    role="tabpanel"
                    aria-labelledby={`feat-tab-${f.num}`}
                    aria-hidden={!isActive}
                    className={`feat-slide ${isActive ? "active" : ""}`}
                  >
                    {/* Consistent Presentation Frame with Natural Proportions (Object-Fit: Contain) */}
                    <div className="feat-img-stage">
                      <div className="feat-img-frame">
                        <Image
                          src={f.image.src}
                          alt={f.image.alt}
                          width={f.image.width}
                          height={f.image.height}
                          priority={idx === 0}
                          loading={idx === 0 ? "eager" : "lazy"}
                          className="feat-showcase-img"
                        />
                      </div>
                    </div>

                    {/* Feature Details */}
                    <div className="feat-content">
                      <div className="feat-top">
                        <span className="fnum" aria-hidden="true">
                          {f.num}
                        </span>
                        <span className="tag">{f.tag}</span>
                      </div>

                      <h3 className="feat-headline">{f.headline}</h3>
                      <p className="feat-desc">{f.description}</p>

                      {f.bullets && (
                        <ul className="fl">
                          {f.bullets.map((b, bIdx) => (
                            <li key={bIdx}>{b}</li>
                          ))}
                        </ul>
                      )}

                      {f.mstats && (
                        <div className="mstats">
                          {f.mstats.map((st, sIdx) => (
                            <div key={sIdx}>
                              <b>{st.value}</b>
                              <span>{st.label}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Carousel Navigation Bar */}
            <div className="feat-nav-bar">
              <div className="feat-arrows">
                <button
                  type="button"
                  className="feat-arrow-btn"
                  onClick={handlePrevFeature}
                  aria-label="Previous feature slide"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Previous</span>
                </button>

                <div className="feat-counter" aria-live="polite">
                  <b>{FEATURE_SLIDES[activeFeatureIndex].num}</b>
                  <span className="feat-counter-sep">/</span>
                  <span>05</span>
                </div>

                <button
                  type="button"
                  className="feat-arrow-btn"
                  onClick={handleNextFeature}
                  aria-label="Next feature slide"
                >
                  <span>Next</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              <div className="feat-cta-wrap">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => handleCtaClick("features_carousel_demo", e)}
                >
                  Book a demo
                </button>
                <a className="btn btn-ghost" href="#platform">
                  Explore platform
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: VEHICLE DIGITAL TWIN EXPLORER
          ========================================================================= */}
      <section className="sec" id="platform">
        <div className="wrap">
          <div className="sec-head">
            <div aria-hidden="true" className="divider"></div>
            <h2>Explore the platform your team will use.</h2>
            <p>These are real TMIP screens. Pick a view to see what a fleet manager sees each morning.</p>
          </div>

          <div className="explorer">
            {/* Tabs List */}
            <div aria-label="TMIP views" className="tabs" role="tablist">
              {TABS.map((tab, idx) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    ref={(el) => {
                      tabRefs.current[idx] = el;
                    }}
                    aria-controls={tab.controls}
                    aria-selected={isSelected}
                    className="tab"
                    id={tab.id}
                    role="tab"
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => handleTabSelect(tab.id)}
                    onKeyDown={(e) => handleTabKeyDown(e, idx)}
                  >
                    <strong>{tab.title}</strong>
                    <span>{tab.sub}</span>
                  </button>
                );
              })}
            </div>

            {/* Panel 1: Tyre intelligence */}
            <div
              aria-labelledby="t-tyre"
              className="panel"
              id="p-tyre"
              role="tabpanel"
              hidden={activeTab !== "t-tyre"}
            >
              <figure className="fade">
                <Image
                  alt="TMIP tyre digital twin with four wheel cards showing pressure in bar, temperature, health percentage and remaining useful life in kilometres"
                  src="/images/Approved Images timp landing page/Vehicle_Status_Engine_TPMS_View - New.png"
                  width={1920}
                  height={911}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </figure>
              <div className="fade">
                <h3>Every wheel, measured continuously.</h3>
                <p>
                  Pressure, temperature and health for each tyre position, plus remaining useful life in kilometres.
                  Rapid pressure loss is flagged the moment it starts, not at the next yard check.
                </p>
                <div className="metric">
                  <div>
                    <strong>5–7%</strong>
                    <span>Longer tyre life, fleet median</span>
                  </div>
                  <div>
                    <strong>Per wheel</strong>
                    <span>Health and remaining km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 2: Breakdown prediction */}
            <div
              aria-labelledby="t-pred"
              className="panel"
              id="p-pred"
              role="tabpanel"
              hidden={activeTab !== "t-pred"}
            >
              <figure className="fade">
                <Image
                  alt="TMIP AI prediction screen: breakdown probability 4%, next service in 17 days, tyre rotation at 3,200 km, battery failure in 83 days, with an engine remaining-useful-life trend"
                  src="/images/Approved Images timp landing page/Vehicle_Status_Engine_TPMS_TrendView_Temp - New.png"
                  width={1920}
                  height={911}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </figure>
              <div className="fade">
                <h3>Know what fails next, and when.</h3>
                <p>
                  Machine-learning models learn each vehicle&apos;s normal behaviour and flag drift early: breakdown
                  probability, days to next service, kilometres to tyre rotation, days to battery failure.
                </p>
                <div className="metric">
                  <div>
                    <strong>4%</strong>
                    <span>Breakdown probability shown</span>
                  </div>
                  <div>
                    <strong>17 days</strong>
                    <span>To next service</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3: Real-time alerts */}
            <div
              aria-labelledby="t-alert"
              className="panel"
              id="p-alert"
              role="tabpanel"
              hidden={activeTab !== "t-alert"}
            >
              <figure className="fade">
                <Image
                  alt="TMIP event timeline with coolant temperature warning, rapid pressure loss on rear right tyre, harsh braking event and tyre pressure correction"
                  src="/images/Approved Images timp landing page/AlertStatus_Status_Performance - New.png"
                  width={1920}
                  height={911}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </figure>
              <div className="fade">
                <h3>One feed for everything that matters.</h3>
                <p>
                  Coolant warnings, rapid pressure loss, harsh braking, pressure corrections. Each event arrives
                  time-stamped and ranked by severity, with filters by type and time window.
                </p>
                <div className="metric">
                  <div>
                    <strong>Sub-second</strong>
                    <span>Telemetry updates</span>
                  </div>
                  <div>
                    <strong>3 levels</strong>
                    <span>Healthy, warning, critical</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 4: Driver behaviour */}
            <div
              aria-labelledby="t-driver"
              className="panel"
              id="p-driver"
              role="tabpanel"
              hidden={activeTab !== "t-driver"}
            >
              <figure className="fade">
                <Image
                  alt="TMIP driver behaviour screen with a driver score of 91 out of 100 and metrics for overspeed, harsh braking, harsh acceleration, idle time, seatbelt use and driving time"
                  src="/images/tmip/tab-driver.jpeg"
                  width={960}
                  height={678}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </figure>
              <div className="fade">
                <h3>Coach drivers with evidence.</h3>
                <p>
                  A single driver score built from overspeeding, harsh braking, harsh acceleration, idle time, seatbelt
                  use and hours at the wheel. Your safety team sees who needs attention first.
                </p>
                <div className="metric">
                  <div>
                    <strong>91/100</strong>
                    <span>Sample driver score</span>
                  </div>
                  <div>
                    <strong>6 metrics</strong>
                    <span>Behind every score</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 5: Maintenance planning */}
            <div
              aria-labelledby="t-maint"
              className="panel"
              id="p-maint"
              role="tabpanel"
              hidden={activeTab !== "t-maint"}
            >
              <figure className="fade">
                <Image
                  alt="TMIP maintenance table listing engine oil, air filter, fuel filter, brake lining and battery with health, remaining life and a recommended action for each"
                  src="/images/Approved Images timp landing page/dashboard_3.png"
                  width={1920}
                  height={911}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </figure>
              <div className="fade">
                <h3>Service on condition, not the calendar.</h3>
                <p>
                  Engine oil, filters, brake lining and battery, each with health, remaining life in days or km, and a
                  clear next action: change, replace, inspect or monitor.
                </p>
                <div className="metric">
                  <div>
                    <strong>Fewer</strong>
                    <span>Unscheduled workshop visits</span>
                  </div>
                  <div>
                    <strong>Longer</strong>
                    <span>Safe service intervals</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 6: Cost impact */}
            <div
              aria-labelledby="t-cost"
              className="panel"
              id="p-cost"
              role="tabpanel"
              hidden={activeTab !== "t-cost"}
            >
              <figure className="fade">
                <Image
                  alt="TMIP cost impact card for a 30-day window: fuel ₹18,400, tyre ₹46,000, maintenance ₹21,000, downtime ₹80,000, total potential savings ₹1,65,400"
                  src="/images/Approved Images timp landing page/fleet-overview_Grid - New.png"
                  width={1920}
                  height={911}
                  loading="lazy"
                  className="w-full h-auto"
                />
              </figure>
              <div className="fade">
                <h3>Savings you can put in a board deck.</h3>
                <p>
                  Fuel, tyre, maintenance and downtime savings rolled into one number per period, with the change
                  against last period. The same view feeds your cost-per-km reporting.
                </p>
                <div className="metric">
                  <div>
                    <strong>₹1,65,400</strong>
                    <span>Sample 30-day savings view</span>
                  </div>
                  <div>
                    <strong>4 levers</strong>
                    <span>Fuel, tyre, service, downtime</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================================================
              SECTION 9: ARCHITECTURE / LAYER EXPLANATION
              ========================================================================= */}
          <div className="layer">
            <div className="yes">
              <h3>
                <span aria-hidden="true" className="marks">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
                What TMIP adds to your fleet
              </h3>
              <ul>
                <li>Vehicle health and component wear, per vehicle</li>
                <li>Predictive maintenance and breakdown risk</li>
                <li>Tyre pressure management with remaining-life tracking</li>
                <li>Cost per kilometre and driver scoring</li>
              </ul>
            </div>
            <div className="no">
              <h3>What it works alongside</h3>
              <ul>
                <li>Your existing GPS and live location tracking</li>
                <li>Dispatch, trip planning and route optimisation tools</li>
                <li>Your TMS or ERP, connected through TMIP&apos;s API</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 10: BEFORE VS AFTER COMPARISON
          ========================================================================= */}
      <section className="sec" id="compare">
        <div className="wrap">
          <div className="sec-head">
            <div aria-hidden="true" className="divider"></div>
            <h2>Your fleet, before and after TMIP.</h2>
            <p>The same everyday situations. The difference is whether you find out early or too late.</p>
          </div>

          <div className="cmp">
            <div className="cmp-head">
              <div className="h-sit">When this happens</div>
              <div className="h-before">Without TMIP</div>
              <div className="h-after">
                <span aria-hidden="true" className="marks">
                  <i></i>
                  <i></i>
                  <i></i>
                </span>
                With TMIP
              </div>
            </div>

            {/* Row 1 */}
            <div className="cmp-row">
              <div className="sit">A tyre starts losing pressure</div>
              <div className="before">
                <span aria-hidden="true" className="mk mk-x">
                  <svg height="10" viewBox="0 0 10 10" width="10">
                    <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">Without TMIP</span>
                  Nobody knows until the driver notices, or the tyre fails on the highway.
                </span>
              </div>
              <div className="after">
                <span aria-hidden="true" className="mk mk-ok">
                  <svg height="12" viewBox="0 0 12 12" width="12">
                    <path d="M2 6.3l2.6 2.5L10 3.4" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">With TMIP</span>
                  An alert shows which vehicle and which wheel, the moment pressure starts dropping.
                </span>
              </div>
            </div>

            {/* Row 2 */}
            <div className="cmp-row">
              <div className="sit">Service is coming up</div>
              <div className="before">
                <span aria-hidden="true" className="mk mk-x">
                  <svg height="10" viewBox="0 0 10 10" width="10">
                    <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">Without TMIP</span>
                  Done on a fixed calendar. Some parts get changed too early, others too late.
                </span>
              </div>
              <div className="after">
                <span aria-hidden="true" className="mk mk-ok">
                  <svg height="12" viewBox="0 0 12 12" width="12">
                    <path d="M2 6.3l2.6 2.5L10 3.4" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">With TMIP</span>
                  Each part shows its remaining life, so you service on actual condition.
                </span>
              </div>
            </div>

            {/* Row 3 */}
            <div className="cmp-row">
              <div className="sit">A truck is about to break down</div>
              <div className="before">
                <span aria-hidden="true" className="mk mk-x">
                  <svg height="10" viewBox="0 0 10 10" width="10">
                    <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">Without TMIP</span>
                  You find out when it stops. Then comes towing, repair and a missed delivery.
                </span>
              </div>
              <div className="after">
                <span aria-hidden="true" className="mk mk-ok">
                  <svg height="12" viewBox="0 0 12 12" width="12">
                    <path d="M2 6.3l2.6 2.5L10 3.4" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">With TMIP</span>
                  TMIP shows breakdown risk for every vehicle, so you fix it in the yard, not on the road.
                </span>
              </div>
            </div>

            {/* Row 4 */}
            <div className="cmp-row">
              <div className="sit">A driver brakes and speeds harshly</div>
              <div className="before">
                <span aria-hidden="true" className="mk mk-x">
                  <svg height="10" viewBox="0 0 10 10" width="10">
                    <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">Without TMIP</span>
                  It shows up later as worn brakes, worn tyres and higher diesel bills.
                </span>
              </div>
              <div className="after">
                <span aria-hidden="true" className="mk mk-ok">
                  <svg height="12" viewBox="0 0 12 12" width="12">
                    <path d="M2 6.3l2.6 2.5L10 3.4" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">With TMIP</span>
                  Every driver gets a score, so your team knows who to coach first.
                </span>
              </div>
            </div>

            {/* Row 5 */}
            <div className="cmp-row">
              <div className="sit">Month-end cost review</div>
              <div className="before">
                <span aria-hidden="true" className="mk mk-x">
                  <svg height="10" viewBox="0 0 10 10" width="10">
                    <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">Without TMIP</span>
                  Diesel, tyres and repairs sit in separate sheets. True cost per km is a guess.
                </span>
              </div>
              <div className="after">
                <span aria-hidden="true" className="mk mk-ok">
                  <svg height="12" viewBox="0 0 12 12" width="12">
                    <path d="M2 6.3l2.6 2.5L10 3.4" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">With TMIP</span>
                  One cost-per-km view by vehicle, route, driver and region, updated continuously.
                </span>
              </div>
            </div>

            {/* Row 6 */}
            <div className="cmp-row">
              <div className="sit">Deciding which tyres to replace</div>
              <div className="before">
                <span aria-hidden="true" className="mk mk-x">
                  <svg height="10" viewBox="0 0 10 10" width="10">
                    <path d="M1.5 1.5l7 7M8.5 1.5l-7 7" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">Without TMIP</span>
                  Based on visual checks and the driver&apos;s opinion.
                </span>
              </div>
              <div className="after">
                <span aria-hidden="true" className="mk mk-ok">
                  <svg height="12" viewBox="0 0 12 12" width="12">
                    <path d="M2 6.3l2.6 2.5L10 3.4" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>
                  <span className="cmp-m">With TMIP</span>
                  Based on measured health and remaining kilometres for every tyre.
                </span>
              </div>
            </div>
          </div>

          {/* Results Summary */}
          <div className="cmp-result">
            <div>
              <strong>5–7%</strong>
              <span>Longer tyre life, fleet median</span>
            </div>
            <div>
              <strong>5–6%</strong>
              <span>Additional fuel savings</span>
            </div>
            <div>
              <strong>9 months</strong>
              <span>Median payback period</span>
            </div>
          </div>

          <div className="cmp-cta">
            <p>See what the &ldquo;after&rdquo; looks like on your own vehicles with a 14-day pilot.</p>
            <a
              className="btn btn-primary"
              data-cta="compare"
              href="#demo"
              onClick={(e) => handleCtaClick("compare", e)}
            >
              Book a demo
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 11: LIVE PLATFORM CAROUSEL (DARK THEME)
          ========================================================================= */}
      <section
        className="tmip-carousel-section"
        id="platform-screens"
        onMouseEnter={() => setIsCarouselHovered(true)}
        onMouseLeave={() => setIsCarouselHovered(false)}
        onTouchStart={(e) => {
          touchStartXRef.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartXRef.current !== null) {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartXRef.current - touchEndX;
            if (diff > 50) {
              handleNextCarousel();
            } else if (diff < -50) {
              handlePrevCarousel();
            }
            touchStartXRef.current = null;
          }
        }}
      >
        <div className="wrap">
          <div className="tmip-carousel-header">
            <div aria-hidden="true" className="divider"></div>
            <span className="eyebrow">Platform in action</span>
            <h2>See TMIP on live commercial vehicles.</h2>
            <p style={{ color: "var(--silver)", maxWidth: "58ch", marginTop: "10px" }}>
              Real-time digital twins, predictive wear models, and cost intelligence across national corridors.
            </p>
          </div>

          <div className="tmip-carousel-container">
            <div className="tmip-carousel-viewport">
              <div
                className="tmip-carousel-track"
                style={{
                  ["--slide-index" as string]: carouselIndex,
                }}
              >
                {SLIDES.map((slide, idx) => (
                  <div key={idx} className="tmip-carousel-card">
                    <div className="tmip-carousel-img-wrap">
                      <Image
                        src={slide.src}
                        alt={slide.alt}
                        width={600}
                        height={375}
                        className="object-cover"
                        loading="lazy"
                      />
                      {slide.badge && (
                        <div className="tmip-carousel-badge">{slide.badge}</div>
                      )}
                    </div>
                    <div className="tmip-carousel-body">
                      <h3 className="tmip-carousel-title">{slide.caption.split(":")[0] || "Live Telemetry"}</h3>
                      <p className="tmip-carousel-caption">{slide.caption}</p>
                      <div style={{ marginTop: "auto", paddingTop: "16px" }}>
                        <button
                          type="button"
                          className="btn btn-ghost"
                          style={{ width: "100%", padding: "10px 14px", minHeight: "42px", fontSize: "0.88rem" }}
                          onClick={(e) => handleCtaClick(`carousel_${idx}`, e)}
                        >
                          Book a demo on this module
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="tmip-carousel-nav">
              <button
                type="button"
                className="tmip-carousel-btn"
                onClick={handlePrevCarousel}
                aria-label="Previous slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="tmip-carousel-dots">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`tmip-carousel-dot ${carouselIndex === idx ? "active" : ""}`}
                    onClick={() => setCarouselIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                className="tmip-carousel-btn"
                onClick={handleNextCarousel}
                aria-label="Next slide"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 12 & 13: INTEGRATIONS & SECTORS
          ========================================================================= */}
      <section className="sec alt">
        <div className="wrap two">
          {/* Section 12: Integrations */}
          <div>
            <div aria-hidden="true" className="divider"></div>
            <h2>Fits your stack, not the other way round.</h2>
            <p style={{ marginTop: "16px", fontSize: "1.05rem" }}>
              API-first architecture with native connectors. Data flows both ways, so TMIP insights show up where your
              team already works.
            </p>
            <div className="chips">
              <span className="chip blue">Fleetx</span>
              <span className="chip blue">Locus</span>
              <span className="chip blue">LogiNext</span>
              <span className="chip">Custom TMS</span>
              <span className="chip">ERP</span>
              <span className="chip">REST API</span>
            </div>
          </div>

          {/* Section 13: Sectors */}
          <div>
            <div aria-hidden="true" className="divider"></div>
            <h2>Built for heavy-duty operations.</h2>
            <ul className="sectors">
              <li>
                <strong>Logistics &amp; express</strong>
                <span>Uptime and on-time delivery</span>
              </li>
              <li>
                <strong>Passenger transport</strong>
                <span>Safety and schedule reliability</span>
              </li>
              <li>
                <strong>Construction &amp; heavy</strong>
                <span>High-load tyre and brake wear</span>
              </li>
              <li>
                <strong>Mining &amp; quarry</strong>
                <span>Harsh-duty component life</span>
              </li>
              <li>
                <strong>OEM fleet intelligence</strong>
                <span>Vehicle data at scale</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 14: FAQ (LIGHT BACKGROUND)
          ========================================================================= */}
      <section className="sec light" id="faq">
        <div className="wrap">
          <div className="sec-head">
            <div aria-hidden="true" className="divider"></div>
            <h2>Questions fleet heads ask us.</h2>
          </div>
          <div className="faq">
            <details>
              <summary>What fleet size is TMIP built for?</summary>
              <p>
                TMIP is designed for fleets of 10 or more vehicles, from regional logistics operators to enterprise
                fleets with thousands of trucks. Owner-drivers with 1 to 9 trucks are better served by Treel&apos;s
                Suraksha kit.
              </p>
            </details>
            <details>
              <summary>Does TMIP replace my GPS tracking or fleet management software?</summary>
              <p>
                No. TMIP layers vehicle health, tyre intelligence and predictive maintenance on top of the tracking and
                dispatch tools you already use. It connects natively to Fleetx, Locus and LogiNext, and to custom TMS
                stacks through its API.
              </p>
            </details>
            <details>
              <summary>How does the 14-day pilot work?</summary>
              <p>
                After the demo, TMIP is deployed on a subset of your fleet for 14 days. Your team uses it in live
                operations, and at the end we review the data against your baseline and share the payback math for a
                full rollout.
              </p>
            </details>
            <details>
              <summary>What does TMIP cost?</summary>
              <p>
                Pricing depends on fleet size, vehicle mix and the modules you need. You&apos;ll get a clear quote after
                the demo, alongside the payback estimate for your fleet. Across TMIP fleets, the median payback period
                is nine months.
              </p>
            </details>
            <details>
              <summary>Which vehicles does TMIP support?</summary>
              <p>
                TMIP is built for commercial fleets: trucks, tractor-trailers, buses, and construction and mining
                vehicles. Share your fleet mix in the demo and we&apos;ll confirm coverage for each vehicle class.
              </p>
            </details>
            <details>
              <summary>Who is behind TMIP?</summary>
              <p>
                TMIP is built by Treel Mobility Solutions, a JK Tyre product. Treel is ARAI and ISO 9001:2015
                certified, holds patents in India, the US and the EU, and has more than 68,000 vehicles under
                management.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 15: FINAL CTA
          ========================================================================= */}
      <section className="final" ref={finalRef}>
        <div className="wrap">
          <div>
            <div aria-hidden="true" className="divider"></div>
            <h2>See your fleet as a live digital twin.</h2>
            <p>
              Book a 30-minute demo. If the numbers work, run a 14-day pilot on your own vehicles before you decide.
            </p>
            <div className="actions">
              <a
                className="btn btn-primary"
                data-cta="final"
                href="#demo"
                onClick={(e) => handleCtaClick("final", e)}
              >
                Book a demo
              </a>
              <a
                className="btn btn-ghost"
                data-cta="final-compare"
                href="#compare"
                onClick={() => handleCtaClick("final-compare")}
              >
                See before vs after
              </a>
            </div>
          </div>
          <figure>
            <Image
              alt="TMIP health score radar chart: engine 91, tyres 85, fuel 82, electrical 90, safety 78, operations 84"
              src="/images/tmip/final-cta.png"
              width={366}
              height={428}
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      {/* APPROVED TMIP FOOTER */}
      <TmipLandingFooter />

      {/* =========================================================================
          SECTION 17: MOBILE STICKY CTA
          ========================================================================= */}
      <div className={`mcta ${showMobileCta ? "show" : ""}`} id="mcta">
        <a
          className="btn btn-primary"
          data-cta="mobile-sticky"
          href="#demo"
          onClick={(e) => handleCtaClick("mobile-sticky", e)}
        >
          Book a demo
        </a>
      </div>

      {/* =========================================================================
          FULL-PAGE DEMO POPUP MODAL
          ========================================================================= */}
      {isModalOpen && (
        <div
          className="tmip-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modalTitle"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="tmip-modal-card">
            <button
              ref={modalCloseBtnRef}
              type="button"
              className="tmip-modal-close"
              onClick={closeModal}
              aria-label="Close demo booking modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <h2 id="modalTitle">Book a 30-minute TMIP demo</h2>
            <p className="sub">
              See TMIP on live commercial vehicles. We&apos;ll calculate payback for your fleet before you leave the call.
            </p>

            <form
              id="modalDemoForm"
              ref={formRef}
              noValidate
              onSubmit={(e) => handleSubmit(e, activeFormId)}
            >
              <div className="fields">
                {/* Full Name (full width) */}
                <div className={`field full ${errors.name ? "invalid" : ""}`}>
                  <label htmlFor="m-f-name">Full name</label>
                  <input
                    autoComplete="name"
                    id="m-f-name"
                    name="name"
                    placeholder="e.g. Rajesh Sharma"
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    onBlur={() => handleBlur("name")}
                    onFocus={handleFocus}
                    aria-invalid={errors.name ? "true" : "false"}
                  />
                  <span className="err">Enter your full name.</span>
                </div>

                {/* Row 1: Mobile + Email */}
                <div className="row">
                  {/* Mobile Number */}
                  <div className={`field ${errors.phone ? "invalid" : ""}`}>
                    <label htmlFor="m-f-phone">Mobile number</label>
                    <div className="phone">
                      <span>+91</span>
                      <input
                        autoComplete="tel-national"
                        id="m-f-phone"
                        inputMode="numeric"
                        maxLength={10}
                        name="phone"
                        placeholder="98XXXXXXXX"
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        onBlur={() => handleBlur("phone")}
                        onFocus={handleFocus}
                        aria-invalid={errors.phone ? "true" : "false"}
                      />
                    </div>
                    <span className="err">Enter 10-digit mobile.</span>
                  </div>

                  {/* Work Email */}
                  <div className={`field ${errors.email ? "invalid" : ""}`}>
                    <label htmlFor="m-f-email">Work email</label>
                    <input
                      autoComplete="email"
                      id="m-f-email"
                      name="email"
                      placeholder="rajesh@company.com"
                      required
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("email")}
                      onFocus={handleFocus}
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                    <span className="err">Enter a valid work email.</span>
                  </div>
                </div>

                {/* Row 2: Company + Fleet Size */}
                <div className="row">
                  {/* Company Name */}
                  <div className={`field ${errors.company ? "invalid" : ""}`}>
                    <label htmlFor="m-f-company">Company name</label>
                    <input
                      autoComplete="organization"
                      id="m-f-company"
                      name="company"
                      placeholder="e.g. Sharma Logistics"
                      required
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("company")}
                      onFocus={handleFocus}
                      aria-invalid={errors.company ? "true" : "false"}
                    />
                    <span className="err">Enter company name.</span>
                  </div>

                  {/* Fleet Size */}
                  <div className={`field ${errors.fleet_size ? "invalid" : ""}`}>
                    <label htmlFor="m-f-fleet">Fleet size</label>
                    <select
                      id="m-f-fleet"
                      name="fleet_size"
                      required
                      value={formData.fleet_size}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur("fleet_size")}
                      aria-invalid={errors.fleet_size ? "true" : "false"}
                    >
                      <option value="">Select</option>
                      <option value="1-9">1 to 9 vehicles</option>
                      <option value="10-25">10 to 25 vehicles</option>
                      <option value="26-100">26 to 100 vehicles</option>
                      <option value="101-500">101 to 500 vehicles</option>
                      <option value="500+">500+ vehicles</option>
                    </select>
                    <span className="err">Select fleet size.</span>
                  </div>
                </div>
              </div>

              {/* Small Fleet Nudge */}
              <p className={`note-small ${formData.fleet_size === "1-9" ? "show" : ""}`} style={{ marginTop: "12px" }}>
                TMIP is built for fleets of 10+ vehicles. For 1 to 9 trucks,{" "}
                <Link href="/suraksha">Suraksha</Link> is the better fit at ₹17,500 per truck.
              </p>

              {/* Attribution Hidden Inputs */}
              <input name="gclid" type="hidden" value={attribution.gclid} />
              <input name="fbclid" type="hidden" value={attribution.fbclid} />
              <input name="utm_source" type="hidden" value={attribution.utm_source} />
              <input name="utm_medium" type="hidden" value={attribution.utm_medium} />
              <input name="utm_campaign" type="hidden" value={attribution.utm_campaign} />
              <input name="utm_term" type="hidden" value={attribution.utm_term} />
              <input name="utm_content" type="hidden" value={attribution.utm_content} />
              <input name="ad_group" type="hidden" value={attribution.ad_group} />
              <input name="landing_page" type="hidden" value={attribution.landing_page} />

              {submitError && (
                <div
                  role="alert"
                  aria-live="assertive"
                  style={{
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid #EF4444",
                    borderRadius: "4px",
                    padding: "10px 14px",
                    marginTop: "14px",
                    marginBottom: "4px",
                    fontSize: "0.85rem",
                    color: "#FCA5A5",
                    lineHeight: "1.4",
                  }}
                >
                  {submitError}
                </div>
              )}

              <button className="btn btn-primary" type="submit" disabled={isSubmitting} style={{ width: "100%", marginTop: "16px" }}>
                {isSubmitting ? "Booking…" : "Book my demo"}
              </button>

              <p className="consent" style={{ fontSize: "0.78rem", color: "var(--silver)", marginTop: "12px", lineHeight: "1.35", textAlign: "center" }}>
                By booking, you agree to be contacted by Treel on phone, email or WhatsApp about TMIP. See our{" "}
                <Link href="/privacy" style={{ color: "var(--blue)", textDecoration: "underline" }}>privacy policy</Link>.
              </p>

              <div className="form-assure" style={{ display: "flex", justifyContent: "center", gap: "18px", marginTop: "14px", fontSize: "0.78rem", color: "var(--silver)" }}>
                <span>Reply within 1 business day</span>
                <span>•</span>
                <span>No hardware commitment</span>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
      );
    }
