"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export type FooterVariant = "master" | "tmip" | "suraksha" | "personal";

export interface FooterProps {
  variant?: FooterVariant;
  className?: string;
}

export function Footer({ variant, className }: FooterProps) {
  const pathname = usePathname();

  if (
    !variant &&
    (pathname?.startsWith("/lp/") ||
      pathname === "/lp/tpms" ||
      pathname?.startsWith("/lp-") ||
      pathname === "/lp-tpms" ||
      pathname === "/admin" ||
      pathname?.startsWith("/admin/") ||
      pathname === "/thank-you" ||
      pathname?.startsWith("/thank-you"))
  ) {
    return null;
  }

  // Determine variant automatically if not explicitly provided
  let activeVariant: FooterVariant = (variant === "suraksha" ? "master" : variant) || "master";
  if (!variant && pathname) {
    if (
      pathname.startsWith("/tmip") ||
      pathname.startsWith("/timp") ||
      pathname.startsWith("/lp/tmip") ||
      pathname.startsWith("/lp-tmip") ||
      pathname.startsWith("/products/otr-tpms")
    ) {
      activeVariant = "tmip";
    } else if (pathname.startsWith("/personal") || pathname.startsWith("/lp/tpms") || pathname.startsWith("/lp-tpms")) {
      activeVariant = "personal";
    } else {
      activeVariant = "master";
    }
  }

  // Variant styling configurations
  const themes = {
    master: {
      footer: "bg-[#0F1419] text-[#FAF7F2] border-t border-white/10 pt-16 pb-12 font-inter",
      gridBorder: "border-b border-white/10",
      tagline: "font-fraunces italic text-[15px] text-[#94A3B8] leading-relaxed max-w-sm",
      subtext: "text-xs text-[#64748B] font-mono pt-2",
      header: "text-[11px] uppercase tracking-widest text-[#D5573B] font-bold font-mono",
      link: "text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors",
      ownershipPrimary: "text-[#FAF7F2] font-medium text-xs",
      ownershipSecondary: "text-xs text-[#94A3B8]",
      certified: "pt-2 text-[11px] text-[#64748B] font-mono",
      bottomBorder: "border-t border-white/10",
      bottomText: "text-xs text-[#64748B] font-inter",
      bottomLink: "hover:text-[#FAF7F2] transition-colors",
    },
    tmip: {
      footer: "bg-[#050A17] text-[#E5E7EB] border-t border-[#3B82F6]/20 pt-16 pb-10 font-ibm-plex relative z-10",
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
      footer: "bg-[#FEF3C7] text-[#451A03] border-t-2 border-[#451A03]/10 pt-16 pb-10 font-rubik relative z-10",
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
      footer: "bg-[#0B132B] text-slate-100 border-t border-blue-500/20 pt-16 pb-10 font-manrope relative z-10",
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
      <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 ${theme.gridBorder}`}>
          {/* Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Image
              src="https://res.cloudinary.com/uwd11u7t/image/upload/v1791436559/treel_main_logo.jpg"
              alt="Treel"
              width={200}
              height={60}
              className="h-12 md:h-14 w-auto object-contain brightness-100"
            />
            <p className={theme.tagline}>
              The mobility intelligence company. Every vehicle a signal, every signal an insight.
            </p>
            <p className={theme.certified || "text-xs text-[#64748B]"}>
              ARAI &amp; ISO 9001:2015 Certified · Patents in India, US &amp; EU
            </p>
            <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
            <span>© {new Date().getFullYear()} Treel Mobility Solutions Private Limited. All rights reserved.</span>
          </div>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h5 className={theme.header}>
              Solutions
            </h5>
            <ul className="space-y-2">
              <li>
                <Link prefetch={false} href="/tmip" className={theme.link}>
                  TMIP Enterprise
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/suraksha" className={theme.link}>
                  Suraksha Fleet
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/personal" className={theme.link}>
                  Personal TPMS
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/products" className={theme.link}>
                  Products Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div className="space-y-3">
            <h5 className={theme.header}>
              Technology
            </h5>
            <ul className="space-y-2">
              <li>
                <Link prefetch={false} href="/technology" className={theme.link}>
                  Platform Architecture
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/vehicle-digital-twin" className={theme.link}>
                  Vehicle Digital Twin
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/data-infrastructure" className={theme.link}>
                  Data Infrastructure
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/mobility-intelligence" className={theme.link}>
                  Mobility Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Research & Media */}
          <div className="space-y-3">
            <h5 className={theme.header}>
              Intelligence
            </h5>
            <ul className="space-y-2">
              <li>
                <Link prefetch={false} href="/research" className={theme.link}>
                  Research Papers
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/insights" className={theme.link}>
                  Insights &amp; Articles
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/press" className={theme.link}>
                  Press &amp; Media
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/events" className={theme.link}>
                  Events &amp; Keynotes
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/annual-reports" className={theme.link}>
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/notices" className={theme.link}>
                  Notice Board
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
                <Link prefetch={false} href="/about" className={theme.link}>
                  About Treel
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/leadership" className={theme.link}>
                  Leadership
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/why-treel" className={theme.link}>
                  Why Treel
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/global-presence" className={theme.link}>
                  Global Presence / Export
                </Link>
              </li>

              <li>
                <Link prefetch={false} href="/careers" className={theme.link}>
                  Careers
                </Link>
              </li>
              <li>
                <Link prefetch={false} href="/contact" className={theme.link}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between ${theme.bottomText} gap-4`}>
          <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
            <p>
            Website developed by  
  <a href="https://magicworksitsolutions.com" rel="nofollow" target="_blank"> MagicWorks</a>
</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <Link prefetch={false} href="/privacy" className={theme.bottomLink}>
              Privacy Policy
            </Link>
            <Link prefetch={false} href="/terms" className={theme.bottomLink}>
              Terms
            </Link>
            <Link prefetch={false} href="/cookies" className={theme.bottomLink}>
              Cookie Policy
            </Link>
            <Link prefetch={false} href="/accessibility" className={theme.bottomLink}>
              Accessibility
            </Link>
            <Link prefetch={false} href="/gdpr" className={theme.bottomLink}>
              GDPR Compliance
            </Link>
            <Link prefetch={false} href="/personal/returns" className={theme.bottomLink}>
              Returns Policy
            </Link>
            <Link prefetch={false} href="/personal/shipping" className={theme.bottomLink}>
              Shipping Policy
            </Link>
            <Link prefetch={false} href="/personal/refunds" className={theme.bottomLink}>
              Refunds Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
