import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, AlertTriangle, RefreshCw, Home, Mail, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Server Error · Treel",
  description: "Our telemetry systems encountered an unexpected condition. Please retry your request.",
  alternates: {
    canonical: "https://treel.in/500",
  },
  openGraph: {
    title: "Server Error · Treel",
    description: "Our telemetry systems encountered an unexpected condition. Please retry your request.",
    url: "https://treel.in/500",
  },
};

const RESOLUTION_STEPS = [
  {
    title: "Refresh the Page",
    desc: "Transient gateway anomalies usually resolve immediately upon refreshing.",
  },
  {
    title: "Verify Network Connectivity",
    desc: "Ensure your connection has steady reachability to our secure Indian cloud endpoints.",
  },
  {
    title: "Retry in a Moment",
    desc: "If backend telemetry reconciliation is underway, service restores within seconds.",
  },
  {
    title: "Contact Engineering Support",
    desc: "If the issue persists across sessions, our systems team is on standby 24/7.",
  },
];

export default function ServerErrorPage() {
  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] font-inter selection:bg-[#D5573B]/20 selection:text-[#FAF7F2]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
                Status 500
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              System <span className="italic font-normal text-[#D5573B]">Reconciling</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed">
              Our telemetry services encountered an unexpected condition while processing this route. Our site reliability engineering team has been automatically alerted.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild variant="treel">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" /> Back to Homepage
                </Link>
              </Button>
              <Button asChild variant="treelOutline">
                <Link href="/contact">
                  <Mail className="w-4 h-4 mr-2" /> Contact Support
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting Section */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] mb-3">
              Troubleshooting Recommendations
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Follow these standard recovery steps while telemetry servers stabilize:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RESOLUTION_STEPS.map((step, idx) => (
              <div
                key={step.title}
                className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#D5573B]/30 transition-all duration-300 space-y-2"
              >
                <div className="flex items-center gap-2 font-mono text-xs text-[#D5573B] font-semibold">
                  <span>0{idx + 1}</span>
                  <span className="text-white/20">/</span>
                  <span className="uppercase tracking-wider">Step</span>
                </div>
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Operations Notice */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-fraunces text-xl text-[#FAF7F2]">Are you an active TMIP enterprise customer?</h4>
            <p className="text-xs sm:text-sm text-[#94A3B8]">Contact our 24/7 Dedicated Network Operations Center directly at support@treel.in.</p>
          </div>
          <Button asChild variant="ghost" className="text-[#D5573B] hover:text-[#FAF7F2] hover:bg-white/[0.05] border border-white/[0.1]">
            <Link href="/contact">
              Emergency Support Directory <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}