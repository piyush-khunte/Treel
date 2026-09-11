"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type FooterVariant = "master" | "tmip" | "suraksha" | "personal";

export interface FooterProps {
  variant?: FooterVariant;
  className?: string;
}

export function Footer({ variant, className }: FooterProps) {
  const pathname = usePathname();

  // Determine variant automatically if not explicitly provided
  let activeVariant: FooterVariant = variant || "master";
  if (!variant && pathname) {
    if (pathname.startsWith("/suraksha")) {
      activeVariant = "suraksha";
    } else if (pathname.startsWith("/tmip")) {
      activeVariant = "tmip";
    } else if (pathname.startsWith("/personal")) {
      activeVariant = "personal";
    } else if (pathname.startsWith("/admin")) {
      return null;
    } else {
      activeVariant = "master";
    }
  }

  // Variant styling configurations
  const themes = {
    master: {
      footer: "bg-[#0F1419] text-[#FAF7F2] border-t border-white/10 pt-16 pb-10 px-4 sm:px-10 font-inter",
      gridBorder: "border-b border-white/5",
      tagline: "font-fraunces italic text-[15px] text-[#94A3B8] leading-relaxed max-w-sm",
      subtext: "text-xs text-[#64748B] font-mono pt-2",
      header: "font-jetbrains text-[10px] uppercase tracking-widest text-[#D5573B] font-bold",
      link: "text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors",
      ownershipPrimary: "text-[#FAF7F2] font-medium",
      ownershipSecondary: "text-xs text-[#94A3B8]",
      certified: "pt-2 text-[11px] text-[#64748B] font-mono",
      bottomBorder: "border-t border-white/5",
      bottomText: "text-xs text-[#64748B] font-inter",
      bottomLink: "hover:text-[#94A3B8] transition-colors",
    },
    tmip: {
      footer: "bg-[#050A17] text-[#E5E7EB] border-t border-[#3B82F6]/20 pt-16 pb-10 px-4 sm:px-10 font-ibm-plex relative z-10",
      gridBorder: "border-b border-white/5",
      tagline: "font-ibm-plex text-[15px] text-[#94A3B8] leading-relaxed max-w-sm",
      subtext: "text-xs text-[#64748B] font-jetbrains pt-2",
      header: "font-space-grotesk text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold",
      link: "text-xs text-[#94A3B8] hover:text-[#3B82F6] transition-colors",
      ownershipPrimary: "text-[#F1F5F9] font-medium",
      ownershipSecondary: "text-xs text-[#94A3B8]",
      certified: "pt-2 text-[11px] text-[#64748B] font-jetbrains",
      bottomBorder: "border-t border-white/5",
      bottomText: "text-xs text-[#64748B] font-ibm-plex",
      bottomLink: "hover:text-[#3B82F6] transition-colors",
    },
    suraksha: {
      footer: "bg-[#FEF3C7] text-[#451A03] border-t-2 border-[#451A03]/10 pt-16 pb-10 px-4 sm:px-10 font-rubik relative z-10",
      gridBorder: "border-b border-[#451A03]/10",
      tagline: "font-rubik text-[15px] text-[#78350F] font-medium leading-relaxed max-w-sm",
      subtext: "text-xs text-[#92400E] font-semibold font-rubik pt-2",
      header: "font-anton text-sm uppercase tracking-wider text-[#DC2626] font-normal",
      link: "text-xs text-[#78350F] font-medium font-rubik hover:text-[#DC2626] transition-colors",
      ownershipPrimary: "text-[#451A03] font-bold font-rubik",
      ownershipSecondary: "text-xs text-[#78350F] font-medium font-rubik",
      certified: "pt-2 text-[11px] text-[#92400E] font-rubik font-semibold",
      bottomBorder: "border-t border-[#451A03]/10",
      bottomText: "text-xs text-[#78350F] font-rubik",
      bottomLink: "hover:text-[#DC2626] transition-colors",
    },
    personal: {
      footer: "bg-[#0B132B] text-slate-100 border-t border-blue-500/20 pt-16 pb-10 px-4 sm:px-10 font-manrope relative z-10",
      gridBorder: "border-b border-slate-800",
      tagline: "font-manrope text-[15px] text-slate-400 leading-relaxed max-w-sm",
      subtext: "text-xs text-slate-500 font-manrope pt-2",
      header: "font-manrope text-[11px] uppercase tracking-widest text-blue-500 font-extrabold",
      link: "text-xs text-slate-400 font-manrope hover:text-blue-400 transition-colors",
      ownershipPrimary: "text-slate-100 font-semibold",
      ownershipSecondary: "text-xs text-slate-400 font-manrope",
      certified: "pt-2 text-[11px] text-slate-500 font-manrope",
      bottomBorder: "border-t border-slate-800",
      bottomText: "text-xs text-slate-500 font-manrope",
      bottomLink: "hover:text-blue-400 transition-colors",
    },
  };

  const theme = themes[activeVariant];

  return (
    <footer className={`${theme.footer} ${className || ""}`}>
      <div className="max-w-[1440px] mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 ${theme.gridBorder}`}>
          {/* Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <img
              src="/images/logo.png"
              alt="Treel"
              className="h-8 w-auto object-contain brightness-100"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
              }}
            />
            <p className={theme.tagline}>
              The mobility intelligence company. Every vehicle a signal, every signal an insight.
            </p>
            <div className={theme.subtext}>
              A JK Tyre Group Technology Company
            </div>
          </div>

          {/* Products */}
          <div className="space-y-3">
            <h5 className={theme.header}>
              Products
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/tmip" className={theme.link}>
                  TMIP · Enterprise
                </Link>
              </li>
              <li>
                <Link href="/suraksha" className={theme.link}>
                  Suraksha · Owner-Driver
                </Link>
              </li>
              <li>
                <Link href="/personal" className={theme.link}>
                  Personal TPMS
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h5 className={theme.header}>
              Company
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className={theme.link}>
                  About Treel
                </Link>
              </li>
              <li>
                <Link href="/technology" className={theme.link}>
                  Technology
                </Link>
              </li>
              <li>
                <Link href="/insights" className={theme.link}>
                  Insights & Research
                </Link>
              </li>
              <li>
                <Link href="/careers" className={theme.link}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className={theme.link}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Ownership & Facility */}
          <div className="space-y-3">
            <h5 className={theme.header}>
              Ownership
            </h5>
            <ul className="space-y-2">
              <li className={theme.ownershipPrimary}>A JK Tyre technology company</li>
              <li className={theme.ownershipSecondary}>Treel Mobility Solutions Pvt. Ltd.</li>
              <li className={theme.ownershipSecondary}>Pune & New Delhi, India</li>
              <li className={theme.certified}>
                ARAI & ISO 9001 Certified
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between ${theme.bottomText} gap-4`}>
          <div>
            © {new Date().getFullYear()} Treel Mobility Solutions Private Limited. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-xs">
            <Link href="/privacy" className={theme.bottomLink}>
              Privacy
            </Link>
            <Link href="/terms" className={theme.bottomLink}>
              Terms
            </Link>
            <Link href="/cookies" className={theme.bottomLink}>
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
