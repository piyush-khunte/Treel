"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ORDER,
  FONTS,
  SUBHEADLINES,
  DEFAULT_INTERVAL,
  SurakshaLanguage,
} from "./suraksha-rotator-data";

declare global {
  interface Window {
    SurakshaRotator?: {
      init: () => void;
      data: typeof SUBHEADLINES;
    };
  }
}

interface SurakshaRotatorProps {
  page: string;
  className?: string;
  interval?: number;
  start?: SurakshaLanguage;
  order?: SurakshaLanguage[];
  children?: React.ReactNode;
}

export function SurakshaRotator({
  page,
  className = "",
  interval = DEFAULT_INTERVAL,
  start = "hi",
  order = [...ORDER],
  children,
}: SurakshaRotatorProps) {
  const translations = SUBHEADLINES[page] || {};
  const activeOrder = order.filter((lang) => translations[lang]);
  const initialIndex = activeOrder.indexOf(start) >= 0 ? activeOrder.indexOf(start) : 0;

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Expose global hook for external scripts / testing
    if (typeof window !== "undefined") {
      window.SurakshaRotator = {
        init: () => {},
        data: SUBHEADLINES,
      };
    }

    const el = containerRef.current;
    if (!el || activeOrder.length < 2) return;

    // Respect prefers-reduced-motion: show Hindi only, no animation
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) {
      const hiIdx = activeOrder.indexOf("hi");
      if (hiIdx >= 0) setCurrentIndex(hiIdx);
      return;
    }

    let timer: ReturnType<typeof setInterval> | null = null;
    let isHovered = false;
    let isVisible = true;

    function step() {
      setCurrentIndex((prev) => (prev + 1) % activeOrder.length);
    }

    function play() {
      if (!timer && !isHovered && isVisible && !document.hidden) {
        timer = setInterval(step, interval);
      }
    }

    function pause() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    const onMouseEnter = () => {
      isHovered = true;
      pause();
    };
    const onMouseLeave = () => {
      isHovered = false;
      play();
    };
    const onFocusIn = () => {
      isHovered = true;
      pause();
    };
    const onFocusOut = () => {
      isHovered = false;
      play();
    };
    const onVisibilityChange = () => {
      if (document.hidden) {
        pause();
      } else {
        play();
      }
    };

    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    document.addEventListener("visibilitychange", onVisibilityChange);

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          // Use intersectionRatio > 0 or isIntersecting
          isVisible = entry ? entry.isIntersecting || entry.intersectionRatio > 0 : true;
          if (isVisible) {
            play();
          } else {
            pause();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    }

    // Start rotating
    play();

    return () => {
      pause();
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    };
  }, [activeOrder, interval, page]);

  const hindiFallback = translations.hi || (typeof children === "string" ? children : "");

  return (
    <div
      ref={containerRef}
      className={`srk-rotator ${className}`.trim()}
      data-page={page}
      data-srk-ready="1"
    >
      {/* Screen reader & SEO accessible copy: read Hindi once */}
      <span className="srk-sr" lang="hi">
        {hindiFallback}
      </span>

      {/* 8-Language Visual Rotator Stack */}
      {activeOrder.map((code, index) => {
        const text = translations[code];
        const isActive = index === currentIndex;
        return (
          <span
            key={code}
            className={`srk-line ${isActive ? "is-active" : ""}`}
            lang={code}
            aria-hidden="true"
            style={{
              fontFamily: `${FONTS[code]}, 'Baloo 2', sans-serif`,
            }}
          >
            {text}
          </span>
        );
      })}
    </div>
  );
}
