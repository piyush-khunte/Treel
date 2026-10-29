"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, X } from "lucide-react";

interface ExplorePlatformVideoModalProps {
  buttonText?: string;
  className?: string;
}

export function ExplorePlatformVideoModal({
  buttonText = "Explore the platform",
  className,
}: ExplorePlatformVideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close modal on Escape key and lock body scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  const modalContent = isOpen && mounted ? (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Treel Platform Video"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      {/* Top Floating Close Button for instant visibility */}
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[10000] p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border border-white/20 transition-all cursor-pointer shadow-xl backdrop-blur-sm"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Main Video Box */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#0F1419] border border-white/20 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#141A22] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D5573B] animate-pulse" />
            <span className="text-xs sm:text-sm font-fraunces font-medium text-[#FAF7F2]">
              Treel Platform Overview
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider bg-white/10 text-[#94A3B8]">
              Official Video
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#D5573B] border border-white/15 text-[#FAF7F2] text-xs font-medium transition-colors cursor-pointer"
            aria-label="Close video"
          >
            <span>Close</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Video Iframe Container (16:9 Aspect Ratio) */}
        <div className="relative w-full aspect-video bg-black flex-1 min-h-0">
          <iframe
            src="https://www.youtube-nocookie.com/embed/nazQqt5ty_g?autoplay=1&rel=0&modestbranding=1"
            title="Treel Platform Overview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#0B0F14] border-t border-white/10 flex items-center justify-between text-xs text-[#94A3B8] shrink-0">
          <span className="font-mono text-[11px] truncate mr-2">
            Commercial Fleet Telemetry &amp; Vehicle Digital Twin
          </span>
          <span className="text-[11px] shrink-0 hidden sm:inline">
            Press ESC or click outside to close
          </span>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={
          className ||
          "inline-flex items-center justify-center px-7 py-3.5 rounded-[4px] bg-[#C64529] text-white font-semibold text-sm hover:bg-[#B53D23] transition-all group shadow-sm cursor-pointer"
        }
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <span>{buttonText}</span>
        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
      </button>

      {modalContent && typeof document !== "undefined"
        ? createPortal(modalContent, document.body)
        : null}
    </>
  );
}

export default ExplorePlatformVideoModal;
