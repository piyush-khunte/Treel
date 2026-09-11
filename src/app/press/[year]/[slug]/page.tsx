import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "[Release Headline]  \u00b7  Treel Press",
  description: "[Release excerpt, 150 chars]",
  alternates: {
    canonical: "https://treel.in/press/[year]/[slug]",
  },
  openGraph: {
    title: "[Release Headline]  \u00b7  Treel Press",
    description: "[Release excerpt, 150 chars]",
    url: "https://treel.in/press/[year]/[slug]",
  },
};

export default function PressYearSlugPage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">Individual press release</h1>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2]">Media contact</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Article body**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">[Full release text — typically 400-800 words. Follows standard press release structure: lead paragraph with the news, supporting quote from executive, product/context paragraphs, boilerplate at end.]</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Boilerplate section** (appears at end of every release)</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel Mobility Solutions Private Limited is the mobility intelligence company operating India&apos;s largest connected commercial vehicle dataset. Founded in 2018 and backed by JK Tyre, Treel serves two hundred enterprise customers with sixty-eight thousand vehicles under active management. Its three product families — TMIP for enterprise fleets, Project Suraksha for owner-drivers, and Personal TPMS for consumers — operate on a shared Vehicle Digital Twin architecture. Headquartered in Pune. Learn more at treel.in.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Media contact block**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel Communications</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Email: hello@treel.in</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Toll-Free: 1800 833 0233</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Share buttons:** LinkedIn, Twitter/X, Facebook, Copy link, Email</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Breadcrumb: Press  ›  [Year]  ›  [Slug]</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Category badge: [Category]</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>H1: [Release headline]</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Dateline: [City], India, [Date]</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2]">Related news</h2>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Cards: 3 related releases</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}