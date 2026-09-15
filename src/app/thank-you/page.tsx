import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock, Mail, ShieldCheck, FileText, Sparkles } from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thank You · Treel",
  description: "Thank you for reaching out to Treel. We have received your submission.",
  alternates: {
    canonical: "https://treel.in/thank-you",
  },
  openGraph: {
    title: "Thank You · Treel",
    description: "Thank you for reaching out to Treel. We have received your submission.",
    url: "https://treel.in/thank-you",
  },
};

const SLA_CARDS = [
  {
    title: "Enterprise & Fleet Inquiries",
    sla: "Within 4 business hours",
    description: "Assigned directly to an Enterprise Solution Specialist for fleet sizing and ROI modeling.",
    icon: Clock,
  },
  {
    title: "Partner & OEM Alliances",
    sla: "Within 1 business day",
    description: "Connected to our Commercial & Telematics Integration team for technical scoping.",
    icon: ShieldCheck,
  },
  {
    title: "Media & Industry Inquiries",
    sla: "Within 1 business day",
    description: "Handled by the corporate communications desk for press packets, interviews, and executive quotes.",
    icon: FileText,
  },
  {
    title: "Standard & General Requests",
    sla: "Within 2 business days",
    description: "Reviewed and routed to the corresponding department with verified confirmation.",
    icon: Mail,
  },
];

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] font-inter selection:bg-[#D5573B]/20 selection:text-[#FAF7F2]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-20 border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <TreelSignature variant="compact" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
                Submission Confirmed
              </span>
            </div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/20 text-[#D5573B] text-xs font-semibold tracking-wider uppercase">
              <CheckCircle2 className="w-4 h-4" /> Received & Dispatched
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Thank <span className="italic font-normal text-[#D5573B]">You</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed">
              We have received your submission. Your request has been securely logged and routed to our specialized teams for prompt response.
            </p>
          </div>
        </div>
      </section>

      {/* Response SLA Guidelines */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] mb-3">
              Expected Response Timelines
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
              Every inquiry is processed through strict turnaround SLAs governed by inquiry type:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SLA_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="p-8 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-[#D5573B]/30 transition-all duration-300 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#D5573B] font-semibold px-3 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/20">
                      {card.sla}
                    </span>
                  </div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                    {card.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Navigation & Exploration */}
      <section className="py-20">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-12 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#D5573B]">
                <Sparkles className="w-3.5 h-3.5" /> Next Steps
              </div>
              <h3 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Explore the Treel Ecosystem
              </h3>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Discover our connected mobility intelligence architecture, peer-reviewed engineering research, and commercial tyre telemetry platform.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Button asChild variant="treel">
                <Link href="/">
                  Back to Homepage <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button asChild variant="treelOutline">
                <Link href="/products">
                  Explore Products
                </Link>
              </Button>
              <Button asChild variant="ghost" className="text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/[0.05]">
                <Link href="/insights">
                  Read Insights
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}