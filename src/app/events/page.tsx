import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Events  \u00b7  Treel",
  description: "Upcoming events with Treel Mobility Solutions: conferences, webinars, product demos, industry meetups.",
  alternates: {
    canonical: "https://treel.in/events",
  },
  openGraph: {
    title: "Events  \u00b7  Treel",
    description: "Upcoming events with Treel Mobility Solutions: conferences, webinars, product demos, industry meetups.",
    url: "https://treel.in/events",
  },
};

export default function EventsPage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">EVENTS</div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Where you can meet Treel.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">Upcoming conferences, webinars, product demos, and industry meetups. If we're in your city, come by.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Card format:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Event type badge (In-person, Webinar, Conference, Meetup)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Date and time (with timezone)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Event name</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Location (city or "Online")</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Excerpt (100 chars)</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/events/[slug]" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                View event <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Past events</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Missed us at a previous event? Recordings and materials from past events are archived below.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Grid: past event cards with recording/materials links</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Get notified.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">We announce events about 4-6 weeks in advance. Get an email when there's something in your city.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Field: Work email</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Button: `Subscribe</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}