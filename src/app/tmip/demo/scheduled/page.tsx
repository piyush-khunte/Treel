import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Demo Scheduled  \u00b7  TMIP",
  description: "Your TMIP demo is scheduled. See you soon.",
  alternates: {
    canonical: "https://treel.in/tmip/demo/scheduled",
  },
  openGraph: {
    title: "Demo Scheduled  \u00b7  TMIP",
    description: "Your TMIP demo is scheduled. See you soon.",
    url: "https://treel.in/tmip/demo/scheduled",
  },
};

export default function TmipDemoScheduledPage() {
  return (
    <div className="space-y-0 bg-[#0B132B] text-[#F8FAFC] font-ibm">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#00E5FF] bg-[#00E5FF]/10 border-[#00E5FF]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">DEMO SCHEDULED</div>
            <h1 className="font-space text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F8FAFC] leading-[1.15]">You are on the calendar.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm max-w-3xl">Your TMIP demo is confirmed. Details below. We will send a calendar invite to your inbox shortly.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Date & time: [Dynamically populated]</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Duration: 30 minutes</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Format: Video call (Google Meet or Zoom, per your preference — link in the calendar invite)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Your Treel solutions engineer: [Dynamically populated]</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Buttons: Add to Google Calendar, Add to Outlook, Download .ics</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">What to have ready.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">The demo is more valuable when we can talk about your specific fleet. If you can share the following ahead of time, we will build the demo around it.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Approximate fleet size and vehicle mix</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Current TMS or fleet software (if any)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>The one operational metric you would most want to improve</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm flex items-start gap-3">
                <span className="text-[#00E5FF] mt-1.5 font-bold">•</span>
                <span>Any specific integrations that are non-negotiable</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm">Need to change the time? Reply to your confirmation email or reach us at hello@treel.in.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8FAFC]">Read while you wait.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <Link href="/tmip/whitepapers/roi-fleet-intelligence" className="p-6 rounded-xl bg-[#1C2541]/50 border border-white/10 hover:border-[#00E5FF]/40 transition-all group block">
                <h3 className="font-space text-xl font-bold text-[#F8FAFC] group-hover:text-[#00E5FF] transition-colors">Read the ROI paper</h3>
                <div className="mt-4 font-semibold text-xs text-[#00E5FF] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/tmip/customers/case-studies" className="p-6 rounded-xl bg-[#1C2541]/50 border border-white/10 hover:border-[#00E5FF]/40 transition-all group block">
                <h3 className="font-space text-xl font-bold text-[#F8FAFC] group-hover:text-[#00E5FF] transition-colors">See case studies</h3>
                <div className="mt-4 font-semibold text-xs text-[#00E5FF] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/tmip/platform" className="p-6 rounded-xl bg-[#1C2541]/50 border border-white/10 hover:border-[#00E5FF]/40 transition-all group block">
                <h3 className="font-space text-xl font-bold text-[#F8FAFC] group-hover:text-[#00E5FF] transition-colors">Explore the platform</h3>
                <div className="mt-4 font-semibold text-xs text-[#00E5FF] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}