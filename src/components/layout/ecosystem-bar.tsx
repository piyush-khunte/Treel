"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Activity, Truck, Car } from "lucide-react";

export function EcosystemBar() {
  const pathname = usePathname();

  const isOtr = pathname?.startsWith("/products/otr-tpms");
  const isCorporate =
    pathname === "/" ||
    (!pathname?.startsWith("/tmip") &&
      !pathname?.startsWith("/suraksha") &&
      !pathname?.startsWith("/personal") &&
      !pathname?.startsWith("/admin") &&
      !isOtr);
  const isTmip = pathname?.startsWith("/tmip");
  const isSuraksha = pathname?.startsWith("/suraksha");
  const isPersonal = pathname?.startsWith("/personal");

  let contactHref = "/contact";
  if (isOtr) contactHref = "/contact?subject=otr-tpms";
  else if (isTmip) contactHref = "/contact?subject=tmip";
  else if (isSuraksha) contactHref = "/contact?subject=suraksha";
  else if (isPersonal) contactHref = "/contact?subject=personal";

  return (
    <div className="bg-[#0B0F14] text-[#FAF7F2] text-xs py-0.5 border-b border-white/10 select-none z-50">
      <div className="w-full max-w-[1320px] mx-auto px-3 sm:px-6 lg:px-10 flex items-center justify-between">
        {/* Left: Ecosystem Links */}
        <div className="flex items-center space-x-2 sm:space-x-3.5 xl:space-x-6 min-w-0 overflow-x-auto lg:overflow-x-visible no-scrollbar">
          {/* Treel Corporate */}
          <Link prefetch={false} href="/"
            className={`min-h-[28px] inline-flex items-center transition-colors whitespace-nowrap font-medium text-xs ${
              isCorporate
                ? "text-[#D5573B] font-semibold"
                : "text-slate-300 hover:text-[#D5573B]"
            }`}
          >
            Treel Corporate
          </Link>

          <span aria-hidden="true" className="text-slate-400">•</span>

          {/* TMIP Enterprise */}
          <Link prefetch={false} href="/tmip"
            className={`min-h-[28px] transition-colors whitespace-nowrap flex items-center gap-1.5 font-medium text-xs ${
              isTmip
                ? "text-[#00E5FF] font-semibold"
                : "text-slate-300 hover:text-[#00E5FF]"
            }`}
          >
            <Activity className="w-3.5 h-3.5 text-[#00E5FF]" /> TMIP Enterprise
          </Link>

          <span aria-hidden="true" className="text-slate-400">•</span>

          {/* Suraksha Fleet */}
          <Link prefetch={false} href="/suraksha"
            className={`min-h-[28px] transition-colors whitespace-nowrap flex items-center gap-1.5 font-medium text-xs ${
              isSuraksha
                ? "text-[#F59E0B] font-semibold"
                : "text-slate-300 hover:text-[#F59E0B]"
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-[#F59E0B]" /> Suraksha Fleet
          </Link>

          <span aria-hidden="true" className="text-slate-400">•</span>

          {/* Personal TPMS */}
          <Link prefetch={false} href="/personal"
            className={`min-h-[28px] transition-colors whitespace-nowrap flex items-center gap-1.5 font-medium text-xs ${
              isPersonal
                ? "text-[#60A5FA] font-semibold"
                : "text-slate-300 hover:text-[#60A5FA]"
            }`}
          >
            <Car className="w-3.5 h-3.5 text-[#60A5FA]" /> Personal TPMS
          </Link>

          <span aria-hidden="true" className="text-slate-400">•</span>

          {/* OTR TPMS */}
          <Link prefetch={false} href="/products/otr-tpms"
            className={`min-h-[28px] transition-colors whitespace-nowrap flex items-center gap-1.5 font-medium text-xs ${
              isOtr
                ? "text-[#3B82F6] font-semibold"
                : "text-slate-300 hover:text-[#3B82F6]"
            }`}
          >
            <span className="w-4 h-4 inline-flex items-center justify-center shrink-0 overflow-hidden -translate-y-px">
              <Image
                src="/images/otr-excavator-icon.png"
                alt="OTR TPMS"
                width={20}
                height={20}
                loading="lazy"
                unoptimized
                className="w-5 h-5 max-w-none scale-125 object-contain"
              />
            </span>
            <span>OTR TPMS</span>
          </Link>
        </div>

        {/* Right: Parent Company & Support */}
        <div className="hidden lg:flex items-center text-slate-300 text-xs shrink-0 pl-4">
          <Link prefetch={false} href={contactHref}
            className="min-h-[28px] inline-flex items-center hover:text-[#D5573B] font-medium text-slate-300 transition-colors whitespace-nowrap"
          >
            Support & Inquiries
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EcosystemBar;
