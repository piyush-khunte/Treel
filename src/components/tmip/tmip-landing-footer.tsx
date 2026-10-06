"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function TmipLandingFooter() {
  return (
    <footer className="tmip-landing-footer w-full bg-[#030712] text-[#E5E7EB] border-t border-[#1E293B] pt-16 pb-12 font-sans relative z-10">
      <div className="w-full max-w-[1320px] mx-auto px-6 sm:px-10">
        {/* Main Grid: Left Brand Block + 4 Link Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-14">
          {/* Left Brand Block */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-6">
            <Link href="/" className="inline-block">
              <Image
                src="/images/treel main logo.jpg"
                alt="Treel Mobility Intelligence"
                width={190}
                height={55}
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-[14px] text-[#94A3B8] leading-relaxed max-w-sm">
              The mobility intelligence company. Every vehicle a signal, every signal an insight.
            </p>
            <p className="pt-2 text-xs text-[#64748B] font-jetbrains">
              ARAI &amp; ISO 9001:2015 Certified · Patents in India, US &amp; EU
            </p>
             <div className="flex items-center gap-3 text-xs text-[#94A3B8]">
              <span>© 2026 Treel Mobility Solutions Private Limited. All rights reserved.</span>
            </div>
          </div>

          {/* Solutions Column */}
          <div className="space-y-3.5">
            <h5 className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold font-mono !text-[#3B82F6]">
              SOLUTIONS
            </h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/tmip" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  TMIP Enterprise
                </Link>
              </li>
              <li>
                <Link href="/suraksha" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Suraksha Fleet
                </Link>
              </li>
              <li>
                <Link href="/personal" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Personal TPMS
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Products Overview
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology Column */}
          <div className="space-y-3.5">
            <h5 className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold font-mono !text-[#3B82F6]">
              TECHNOLOGY
            </h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/technology" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Platform Architecture
                </Link>
              </li>
              <li>
                <Link href="/vehicle-digital-twin" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Vehicle Digital Twin
                </Link>
              </li>
              <li>
                <Link href="/data-infrastructure" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Data Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/mobility-intelligence" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Mobility Intelligence
                </Link>
              </li>
            </ul>
          </div>

          {/* Intelligence Column */}
          <div className="space-y-3.5">
            <h5 className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold font-mono !text-[#3B82F6]">
              INTELLIGENCE
            </h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/research" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Research Papers
                </Link>
              </li>
              <li>
                <Link href="/insights" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Insights &amp; Articles
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Press &amp; Media
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Events &amp; Keynotes
                </Link>
              </li>
              <li>
                <Link href="/annual-reports" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Annual Reports
                </Link>
              </li>
              <li>
                <Link href="/notices" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Notice Board
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="space-y-3.5">
            <h5 className="text-[11px] uppercase tracking-widest text-[#3B82F6] font-bold font-mono !text-[#3B82F6]">
              COMPANY
            </h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  About Treel
                </Link>
              </li>
              <li>
                <Link href="/leadership" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/why-treel" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Why Treel
                </Link>
              </li>
              <li>
                <Link href="/global-presence" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Global Presence / Export
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[13px] text-[#94A3B8] !text-[#94A3B8] hover:!text-[#3B82F6] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Thin Horizontal Divider */}
        <div className="border-t border-[#1E293B] my-0" />

        {/* Bottom Legal Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#64748B] gap-4">
          <div>
            Website developed by{" "}
            <a
              href="https://magicworksitsolutions.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#94A3B8] !text-[#94A3B8] hover:!text-white transition-colors"
            >
              MagicWorks
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <Link href="/privacy" className="footer-legal-link text-[#64748B] !text-[#64748B] hover:!text-[#94A3B8] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-legal-link text-[#64748B] !text-[#64748B] hover:!text-[#94A3B8] transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="footer-legal-link text-[#64748B] !text-[#64748B] hover:!text-[#94A3B8] transition-colors">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="footer-legal-link text-[#64748B] !text-[#64748B] hover:!text-[#94A3B8] transition-colors">
              Accessibility
            </Link>
            <Link href="/gdpr" className="footer-legal-link text-[#64748B] !text-[#64748B] hover:!text-[#94A3B8] transition-colors">
              GDPR Compliance
            </Link>
            <Link href="/personal/returns" className="footer-legal-link text-[#64748B] !text-[#64748B] hover:!text-[#94A3B8] transition-colors">
              Returns Policy
            </Link>
            <Link href="/personal/shipping" className="footer-legal-link text-[#64748B] !text-[#64748B] hover:!text-[#94A3B8] transition-colors">
              Shipping Policy
            </Link>
            <Link href="/personal/refunds" className="footer-legal-link text-[#64748B] !text-[#64748B] hover:!text-[#94A3B8] transition-colors">
              Refunds Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
