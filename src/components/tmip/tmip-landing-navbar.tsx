"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface TmipLandingNavbarProps {
  onDemoClick: (location: string, e?: React.MouseEvent) => void;
}

export function TmipLandingNavbar({ onDemoClick }: TmipLandingNavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#050A17]/95 backdrop-blur-md border-b border-blue-900/40">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-[72px] flex items-center justify-between">
        {/* Left: Original TMIP Logo + Separator + TMIP Mark & Label */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/treel main logo.jpg"
              alt="Treel Mobility Intelligence"
              width={160}
              height={50}
              className="h-8 sm:h-9 md:h-10 w-auto object-contain"
              priority
            />
          </Link>

          <div className="h-6 sm:h-7 w-[1px] bg-white/20" aria-hidden="true" />

          <Link href="/lp-tmip" className="flex items-center gap-2">
            <div className="flex flex-col gap-[3px] w-[20px] sm:w-[22px]" aria-hidden="true">
              <span className="block h-[3px] w-full bg-[#3B82F6] rounded-[1px] opacity-60 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="block h-[3px] w-full bg-[#3B82F6] rounded-[1px] opacity-85 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="block h-[3px] w-full bg-[#3B82F6] rounded-[1px] opacity-100 shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
            </div>
            <span className="font-space-grotesk font-bold text-lg sm:text-xl text-white tracking-wide">
              TMIP
            </span>
          </Link>
        </div>

        {/* Right: Phone link + Book a demo button */}
        <div className="flex items-center gap-3 sm:gap-6">
          <a
            href="tel:18008330233"
            className="flex items-center gap-2 text-white font-semibold text-sm sm:text-base hover:text-[#3B82F6] transition-colors"
          >
            <svg
              className="w-4 h-4 text-[#3B82F6] shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.02l-2.21 2.2z" />
            </svg>
            <span className="whitespace-nowrap font-medium tracking-tight">1800 833 0233</span>
          </a>

          <a
            href="#demo"
            onClick={(e) => onDemoClick("navbar", e)}
            className="btn btn-primary whitespace-nowrap"
            style={{
              padding: "10px 20px",
              minHeight: "42px",
              fontSize: "0.95rem",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Book a demo
          </a>
        </div>
      </div>
    </header>
  );
}

export default TmipLandingNavbar;
