import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "ai.txt \u00b7 Treel",
  description: "Treel mobility intelligence platform.",
  alternates: {
    canonical: "https://treel.in/ai.txt",
  },
  openGraph: {
    title: "ai.txt \u00b7 Treel",
    description: "Treel mobility intelligence platform.",
    url: "https://treel.in/ai.txt",
  },
};

export default function AiTxtPage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">ai.txt</h1>
          </div>
        </div>
      </section>

    </div>
  );
}