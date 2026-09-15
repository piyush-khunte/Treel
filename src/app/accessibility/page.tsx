import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Activity, HelpCircle } from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";

export const metadata: Metadata = {
  title: "Accessibility · Treel",
  description: "Treel's commitment to accessibility. Our WCAG 2.2 Level AA target, current status, and how to report accessibility issues.",
  alternates: {
    canonical: "https://treel.in/accessibility",
  },
  openGraph: {
    title: "Accessibility · Treel",
    description: "Treel's commitment to accessibility. Our WCAG 2.2 Level AA target, current status, and how to report accessibility issues.",
    url: "https://treel.in/accessibility",
  },
};

export default function AccessibilityPage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3">
              <TreelSignature variant="compact" />
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                ACCESSIBILITY
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Accessibility <span className="italic font-normal text-[#D5573B]">Statement.</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] pt-2">
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                Effective: 1 October 2026
              </span>
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                Last updated: 1 October 2026
              </span>
              <span className="px-3 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/30 text-[#D5573B] font-semibold">
                Target: WCAG 2.2 Level AA
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel is committed to ensuring that treel.in and our digital products are accessible to people with disabilities. We believe technology should be usable by everyone, regardless of ability.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">We aim to conform to the **Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA**. These guidelines are the international standard for web accessibility.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Our website includes the following accessibility features:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Semantic HTML structure with proper heading hierarchy</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Descriptive alt text for meaningful images</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Keyboard navigation for all interactive elements</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Visible focus indicators</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Colour contrast ratios meeting WCAG AA standards (4.5:1 for body text, 3:1 for large text)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Skip-to-content link on every page</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Support for screen readers (VoiceOver, NVDA, JAWS)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Text alternatives for non-text content</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Responsive design for mobile and assistive-technology devices</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Video captions and transcripts (where applicable)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">We are working on improving:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Complete keyboard navigation on all form components (in progress for Suraksha EMI form)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Language attribute markup for the Hinglish content on Suraksha pages</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Screen reader compatibility with the interactive Vehicle Digital Twin visualisation on `/tmip` (an alternative accessible view is provided as fallback)</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">If you encounter an accessibility issue or need content in an alternative format, please contact us and we will respond within 5 business days.</p>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">Contact:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Email: **hello@treel.in**</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Phone: **1800 833 0233**</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Subject line: &quot;Accessibility feedback&quot; helps us route quickly</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Accessibility is not a one-time achievement. We conduct accessibility reviews on every major release and incorporate user feedback into our roadmap.</p>
          </div>
        </div>
      </section>
    </div>
  );
}