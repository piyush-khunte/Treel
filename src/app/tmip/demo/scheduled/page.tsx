import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Demo Scheduled  ·  TMIP",
  description: "Your TMIP demo is scheduled. See you soon.",
  alternates: {
    canonical: "https://treel.in/tmip/demo/scheduled",
  },
  openGraph: {
    title: "Demo Scheduled  ·  TMIP",
    description: "Your TMIP demo is scheduled. See you soon.",
    url: "https://treel.in/tmip/demo/scheduled",
  },
};

export default function TmipDemoScheduledPage() {
  return (
    <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Subtle Blueprint Grid: 60px x 60px rgba(59,130,246,0.04) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="tmip"
              items={[
                { label: "TMIP", href: "/tmip" },
                { label: "Request Demo", href: "/tmip/demo" },
                { label: "Confirmation" },
              ]}
            />
            <div className="rounded-[2px] font-jetbrains text-xs uppercase tracking-wider font-semibold px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 inline-block">
              DEMO SCHEDULED
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              You are on the calendar.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              Your TMIP demo is confirmed. Details below. We will send a calendar invite to your inbox shortly.
            </p>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Date & time: [Dynamically populated]</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Duration: 30 minutes</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Format: Video call (Google Meet or Zoom, per your preference — link in the calendar invite)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Your Treel solutions engineer: [Dynamically populated]</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Calendar Buttons */}
      <section className="relative z-10 py-20 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Buttons: Add to Google Calendar, Add to Outlook, Download .ics</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What to have ready */}
      <section className="relative z-10 py-20 border-b border-slate-400/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              What to have ready.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              The demo is more valuable when we can talk about your specific fleet. If you can share the following ahead of time, we will build the demo around it.
            </p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Approximate fleet size and vehicle mix</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Current TMS or fleet software (if any)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>The one operational metric you would most want to improve</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex flex items-start gap-3">
                <span className="text-[#3B82F6] mt-1.5 font-bold">•</span>
                <span>Any specific integrations that are non-negotiable</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Reschedule info */}
      <section className="relative z-10 py-20 border-b border-slate-400/10 bg-[#0B1220]/40">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-ibm-plex">
              Need to change the time? Reply to your confirmation email or reach us at hello@treel.in.
            </p>
          </div>
        </div>
      </section>

      {/* Read while you wait */}
      <section className="relative z-10 py-20">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-space-grotesk text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F1F5F9]">
              Read while you wait.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <Link 
                href="/tmip/whitepapers/roi-fleet-intelligence" 
                className="p-6 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-[#3B82F6]/40 transition-all group block"
              >
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  Read the ROI paper
                </h3>
                <div className="mt-4 font-semibold text-xs text-[#3B82F6] flex items-center gap-1 font-jetbrains">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link 
                href="/tmip/customers/case-studies" 
                className="p-6 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-[#3B82F6]/40 transition-all group block"
              >
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  See case studies
                </h3>
                <div className="mt-4 font-semibold text-xs text-[#3B82F6] flex items-center gap-1 font-jetbrains">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link 
                href="/tmip/platform" 
                className="p-6 rounded-[4px] bg-[#0B1220]/80 border border-slate-400/10 hover:border-[#3B82F6]/40 transition-all group block"
              >
                <h3 className="font-space-grotesk text-xl font-bold text-[#F1F5F9] group-hover:text-[#3B82F6] transition-colors">
                  Explore the platform
                </h3>
                <div className="mt-4 font-semibold text-xs text-[#3B82F6] flex items-center gap-1 font-jetbrains">
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