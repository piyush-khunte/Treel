"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TreelSignature } from "@/components/corporate/treel-signature";

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
      footer: "bg-[#0F1419] text-[#FAF7F2] border-t border-white/10 pt-16 pb-12 px-6 sm:px-10 font-inter",
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
      footer: `bg-[#050A17] text-[#E5E7EB] border-t border-[#3B82F6]/20 pt-16 pb-10 ${pathname === "/tmip" ? "px-6" : "px-4"} sm:px-10 font-ibm-plex relative z-10`,
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
      <div className="max-w-[1320px] mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 ${theme.gridBorder}`}>
          {/* Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <Image
              src="/images/logo.png"
              alt="Treel"
              width={140}
              height={38}
              className="h-9 w-auto object-contain brightness-100"
            />
            <p className={theme.tagline}>
              The mobility intelligence company. Every vehicle a signal, every signal an insight.
            </p>
            <div className="flex items-center gap-2 pt-1">
              <TreelSignature variant="compact" />
              <span className="text-xs text-[#94A3B8] font-mono">A JK Tyre Group Technology Company</span>
            </div>
            <p className="text-xs text-[#64748B]">
              ARAI &amp; ISO 9001:2015 Certified · Patents in India, US &amp; EU
            </p>
          </div>

          {/* Solutions */}
          <div className="space-y-3">
            <h5 className={theme.header}>
              Solutions
            </h5>
            <ul className="space-y-2">
              <li>
                <Link href="/tmip" className={theme.link}>
                  TMIP Enterprise
                </Link>
              </li>
              <li>
                <Link href="/suraksha" className={theme.link}>
                  Suraksha Fleet
                </Link>
              </li>
              <li>
                <Link href="/personal" className={theme.link}>
                  Personal TPMS
                </Link>
              </li>
              <li>
                <Link href="/products" className={theme.link}>
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
                <Link href="/technology" className={theme.link}>
                  Platform Architecture
                </Link>
              </li>
              <li>
                <Link href="/vehicle-digital-twin" className={theme.link}>
                  Vehicle Digital Twin
                </Link>
              </li>
              <li>
                <Link href="/data-infrastructure" className={theme.link}>
                  Data Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/mobility-intelligence" className={theme.link}>
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
                <Link href="/research" className={theme.link}>
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="/insights" className={theme.link}>
                  Insights &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/press" className={theme.link}>
                  Press &amp; Media
                </Link>
              </li>
              <li>
                <Link href="/events" className={theme.link}>
                  Events &amp; Keynotes
                </Link>
              </li>
              <li>
                <Link href="/annual-reports" className={theme.link}>
                  Annual Reports
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
                <Link href="/leadership" className={theme.link}>
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/why-treel" className={theme.link}>
                  Why Treel
                </Link>
              </li>
              <li>
                <Link href="/jk-tyre" className={theme.link}>
                  JK Tyre Partnership
                </Link>
              </li>
              <li>
                <Link href="/partners" className={theme.link}>
                  Partners &amp; OEMs
                </Link>
              </li>
              <li>
                <Link href="/careers" className={theme.link}>
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className={theme.link}>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className={`pt-8 flex flex-col sm:flex-row items-center justify-between ${theme.bottomText} gap-4`}>
          <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
            <span>© {new Date().getFullYear()} Treel Mobility Solutions Private Limited. All rights reserved.</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-xs">
            <Link href="/privacy" className={theme.bottomLink}>
              Privacy Policy
            </Link>
            <Link href="/terms" className={theme.bottomLink}>
              Terms of Service
            </Link>
            <Link href="/cookies" className={theme.bottomLink}>
              Cookie Policy
            </Link>
            <Link href="/accessibility" className={theme.bottomLink}>
              Accessibility
            </Link>
            <Link href="/gdpr" className={theme.bottomLink}>
              GDPR Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
