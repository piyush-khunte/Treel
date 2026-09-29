"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface SlideData {
  id: string;
  name: string;
  category: string;
  src: string;
  alt: string;
  href: string;
  tagline: string;
}

const SLIDES: SlideData[] = [
  {
    id: "suraksha",
    name: "Suraksha Fleet",
    category: "Commercial Trucks",
    src: "/images/hero/suraksha.webp",
    alt: "Treel Suraksha — DIY Fleet & Truck Safety for India's Owner-Drivers",
    href: "/suraksha",
    tagline: "Safety that fits in a driver's hands",
  },
  {
    id: "tpms",
    name: "Personal TPMS",
    category: "Bikes, Cars & OTR",
    src: "/images/hero/tpms.webp",
    alt: "Treel TPMS — Real-time Tyre Pressure Monitoring for Every Tyre and Every Road",
    href: "/personal",
    tagline: "Real-time pressure & temperature alerts",
  },
  {
    id: "tmip",
    name: "TMIP Enterprise",
    category: "Fleet Intelligence",
    src: "/images/hero/tmip.webp",
    alt: "Treel TMIP — Enterprise Fleet Intelligence & Live Vehicle Digital Twin",
    href: "/tmip",
    tagline: "Every truck. A live Digital Twin.",
  },
];

const BAR_COLORS = ["#8A3F30", "#B04A34", "#D4573A"];
const INTERVAL_MS = 6000;
const STAGGER_MS = 80;
const EASING = "cubic-bezier(0.7, 0, 0.3, 1)";

export function TreelHeroVisual() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const containerRef = useRef<HTMLAnchorElement>(null);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isBusyRef = useRef(false);
  const currentRef = useRef(0);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // Track client hydration and reduced-motion preference
  useEffect(() => {
    setIsClient(true);
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  // Web Animations API helper for the 3 thin motion lines
  const animateBars = useCallback(
    (from: string, to: string, duration: number): Promise<void[]> => {
      if (prefersReducedMotion) return Promise.resolve([]);

      const promises = barRefs.current.map((bar, i) => {
        if (!bar) return Promise.resolve();
        const animation = bar.animate(
          [
            { transform: `translateX(${from})` },
            { transform: `translateX(${to})` },
          ],
          {
            duration,
            delay: i * STAGGER_MS,
            easing: EASING,
            fill: "forwards",
          }
        );
        return animation.finished.then(() => {});
      });

      return Promise.all(promises);
    },
    [prefersReducedMotion]
  );

  const parkBars = useCallback(() => {
    barRefs.current.forEach((bar) => {
      if (bar) {
        bar.style.transform = "translateX(-120%)";
        try {
          bar.getAnimations().forEach((anim) => anim.cancel());
        } catch {
          // fallback
        }
      }
    });
  }, []);

  // Perform slide transition with thin motion lines sweeping across
  const goToSlide = useCallback(
    async (nextIndex: number) => {
      if (isBusyRef.current || nextIndex === currentRef.current) return;
      isBusyRef.current = true;

      if (prefersReducedMotion) {
        setCurrent(nextIndex);
        isBusyRef.current = false;
        return;
      }

      try {
        // Step 1: Thin motion lines sweep in from left across the image
        await animateBars("-120%", "0%", 500);

        // Step 2: Switch image underneath while lines pass across
        setCurrent(nextIndex);
        await new Promise((r) => setTimeout(r, 260));

        // Step 3: Lines sweep out to the right, leaving the new image 100% visible
        await animateBars("0%", "120%", 540);

        // Step 4: Park lines back off to the left for next transition
        parkBars();
      } catch {
        parkBars();
      } finally {
        isBusyRef.current = false;
      }
    },
    [animateBars, parkBars, prefersReducedMotion]
  );

  const nextSlide = useCallback(() => {
    const next = (currentRef.current + 1) % SLIDES.length;
    goToSlide(next);
  }, [goToSlide]);

  // Auto-rotation timer with visibility and pause support
  useEffect(() => {
    if (isPaused || prefersReducedMotion || !isClient) return;

    const interval = setInterval(() => {
      nextSlide();
    }, INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isPaused, nextSlide, prefersReducedMotion, isClient]);

  // Visibility change handling (pause when tab is hidden)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true);
      } else {
        setIsPaused(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  const currentSlide = SLIDES[current];

  return (
    <div className="w-full max-w-[580px] xl:max-w-[620px] mx-auto flex flex-col items-center select-none">
      {/* Visual Frame Anchor Link */}
      <Link
        ref={containerRef}
        href={currentSlide.href}
        aria-label={currentSlide.alt}
        className="group relative block w-full aspect-[1400/1180] overflow-hidden rounded-xl sm:rounded-2xl bg-[#11151A] border border-white/10 hover:border-[#D5573B]/50 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(213,87,59,0.06)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(213,87,59,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5573B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1419]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {/* Subtle Ambient Radial Glow inside the card */}
        <div
          className="absolute -top-12 -right-12 w-64 h-64 rounded-full pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500 z-[1]"
          style={{
            background:
              "radial-gradient(circle, rgba(213, 87, 59, 0.25) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Product Slides - Full Image Layer */}
        {SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-all duration-500 ease-out ${
                isActive
                  ? "opacity-100 scale-100 z-[2]"
                  : "opacity-0 scale-[1.015] pointer-events-none z-[1]"
              }`}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 620px"
                priority={index === 0}
                decoding="async"
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.012]"
              />
            </div>
          );
        })}

        {/* Three Thin Treel Motion Lines (Overlay Layer - Visually Refined) */}
        {!prefersReducedMotion && (
          <div
            className="absolute inset-0 flex flex-col justify-center items-center gap-5 sm:gap-7 lg:gap-8 pointer-events-none z-10 overflow-hidden"
            aria-hidden="true"
          >
            {BAR_COLORS.map((color, index) => (
              <div
                key={index}
                ref={(el) => {
                  barRefs.current[index] = el;
                }}
                className="w-[76%] sm:w-[78%] xl:w-[80%] h-[32px] sm:h-[38px] xl:h-[42px] rounded-[4px] will-change-transform"
                style={{
                  backgroundColor: color,
                  transform: "translateX(-120%)",
                  boxShadow: `0 0 18px ${color}80, 0 3px 10px rgba(0,0,0,0.5)`,
                }}
              />
            ))}
          </div>
        )}

        {/* Subtle Interactive Hover Highlight Ring */}
        <div
          className="absolute inset-0 rounded-xl sm:rounded-2xl ring-1 ring-inset ring-white/10 group-hover:ring-[#D5573B]/30 pointer-events-none z-20 transition-all duration-300"
          aria-hidden="true"
        />
      </Link>

      {/* Micro-indicators & Product Fast-Switching Bar */}
      <div
        className="w-full mt-4 sm:mt-5 flex items-center justify-between px-1"
        role="tablist"
        aria-label="Product ecosystem selector"
      >
        <div className="flex items-center gap-2 sm:gap-3 w-full">
          {SLIDES.map((slide, index) => {
            const isActive = index === current;
            return (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show ${slide.name}`}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
                className={`group flex-1 text-left py-2 px-2.5 sm:px-3 rounded-lg border transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D5573B] ${
                  isActive
                    ? "bg-white/[0.07] border-[#D5573B]/50 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                    : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                }`}
              >
                {/* Progress pill line */}
                <div className="h-[2.5px] w-full rounded-full bg-white/10 mb-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isActive
                        ? "bg-[#D5573B] w-full shadow-[0_0_8px_#D5573B]"
                        : "w-0 group-hover:w-1/3 bg-white/30"
                    }`}
                  />
                </div>
                {/* Text summary */}
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={`font-jetbrains font-mono text-[10px] sm:text-[11px] font-medium tracking-wide truncate transition-colors duration-200 ${
                      isActive
                        ? "text-[#FAF7F2] font-semibold"
                        : "text-[#94A3B8] group-hover:text-[#CBD5E1]"
                    }`}
                  >
                    {slide.name}
                  </span>
                  <span
                    className={`text-[9px] font-mono transition-opacity duration-200 ${
                      isActive ? "text-[#D5573B] opacity-100" : "opacity-0"
                    }`}
                  >
                    ↗
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TreelHeroVisual;
