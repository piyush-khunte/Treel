import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog  \u00b7  Personal TPMS",
  description: "The Personal TPMS blog. Tyre care tips, road safety, product updates, and consumer vehicle advice.",
  alternates: {
    canonical: "https://treel.in/personal/blog",
  },
  openGraph: {
    title: "Blog  \u00b7  Personal TPMS",
    description: "The Personal TPMS blog. Tyre care tips, road safety, product updates, and consumer vehicle advice.",
    url: "https://treel.in/personal/blog",
  },
};

export default function PersonalBlogPage() {
  return (
    <div className="space-y-0 bg-[#0D1B2A] text-[#FAF7F2] font-manrope">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Blog</h1>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Filter chips: All  ·  Tyre care  ·  Road safety  ·  Product updates  ·  How-to guides</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Card format (same as Master `/insights`)</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**RSS link:** Also available via RSS: <Link href="/personal/blog/rss.xml" className="underline hover:text-white transition-colors">/personal/blog/rss.xml</Link></p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**Sample blog topics to seed the launch:**</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>"Why your car's factory TPMS isn't enough"</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>"How to check tyre pressure the right way (with or without TPMS)"</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>"Monsoon tyre care: what to watch for and when"</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>"The real cost of driving on underinflated tyres"</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope flex items-start gap-3">
                <span className="text-[#FF8A00] mt-1.5 font-bold">•</span>
                <span>"Highway tyre safety: temperature, pressure, and what to know"</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}