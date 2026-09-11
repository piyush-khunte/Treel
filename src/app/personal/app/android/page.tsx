import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Android deep link \u00b7 Treel",
  description: "Treel mobility intelligence platform.",
  alternates: {
    canonical: "https://treel.in/personal/app/android",
  },
  openGraph: {
    title: "Android deep link \u00b7 Treel",
    description: "Treel mobility intelligence platform.",
    url: "https://treel.in/personal/app/android",
  },
};

export default function PersonalAppAndroidPage() {
  return (
    <div className="space-y-0 bg-[#0D1B2A] text-[#FAF7F2] font-manrope">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Android deep link</h1>
          </div>
        </div>
      </section>

    </div>
  );
}