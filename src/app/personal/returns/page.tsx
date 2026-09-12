import type { Metadata } from "next";
import Link from "next/link";
import { 
  RotateCcw, 
  CheckCircle2, 
  ShieldCheck, 
  AlertCircle, 
  ArrowRight, 
  Mail, 
  PhoneCall,
  PackageCheck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Returns Policy · Personal TPMS · Treel",
  description: "Personal TPMS return policy. 7-day return window for unopened kits. Return process, eligibility, and refund timeline.",
  alternates: {
    canonical: "https://treel.in/personal/returns",
  },
  openGraph: {
    title: "Returns Policy · Personal TPMS · Treel",
    description: "Personal TPMS return policy. 7-day return window for unopened kits. Return process, eligibility, and refund timeline.",
    url: "https://treel.in/personal/returns",
  },
};

export default function PersonalReturnsPage() {
  const returnSteps = [
    {
      num: "01",
      title: "Contact Support",
      desc: "Reach out via our support portal or email hello@treel.in within 7 days of delivery with your order ID."
    },
    {
      num: "02",
      title: "Receive Return Authorization",
      desc: "Our team validates eligibility and issues a Return Authorization (RA) number with pickup details."
    },
    {
      num: "03",
      title: "Pack the Kit Securely",
      desc: "Repack the complete kit with all 4 sensors, batteries, tools, and accessories in original product packaging."
    },
    {
      num: "04",
      title: "Reverse Pickup",
      desc: "A Shiprocket partner courier collects the parcel from your doorstep at Treel's expense for eligible returns."
    },
    {
      num: "05",
      title: "Inspection & Refund",
      desc: "Upon warehouse inspection, your full refund is initiated to the original payment source within 7-10 days."
    }
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              LEGAL · PERSONAL TPMS
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              Returns Policy
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#6B7280]">
              <span>Effective Date: 1 October 2026</span>
              <span>•</span>
              <span>Applies to: Personal TPMS purchases from treel.in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Policy Content */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-12">
            {/* 7-Day Window Overview */}
            <div className="p-8 sm:p-10 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-4">
              <div className="flex items-center gap-3 text-[#2563EB]">
                <RotateCcw className="w-6 h-6" />
                <h2 className="text-2xl font-bold text-[#111827]">7-Day Return Window</h2>
              </div>
              <p className="text-sm sm:text-base text-[#4B5563] leading-relaxed">
                You may return your Personal TPMS kit within <strong>7 calendar days</strong> of confirmed delivery date, subject to the eligibility criteria outlined below.
              </p>
            </div>

            {/* Eligibility Criteria */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
                  <span>Eligible for Return</span>
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[#4B5563]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">•</span>
                    <span>Kit is in original, uninstalled condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">•</span>
                    <span>Original outer packaging and barcode labels intact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">•</span>
                    <span>All accessories (4 sensors, lock nuts, mini-spanner, card) present</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#10B981] font-bold">•</span>
                    <span>Initiated within 7 days of delivery receipt</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-4">
                <h3 className="text-xl font-bold text-[#111827] flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-[#EF4444]" />
                  <span>Not Eligible for Return</span>
                </h3>
                <ul className="space-y-3 text-xs sm:text-sm text-[#4B5563]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold">•</span>
                    <span>Sensors that have been mounted and driven on tyres</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold">•</span>
                    <span>Kits missing internal components or with destroyed packaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold">•</span>
                    <span>Returns requested after more than 7 days from delivery</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#EF4444] font-bold">•</span>
                    <span>Third-party marketplace purchases (return via respective portal)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 5-Step Return Process */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#111827]">Return Process Walkthrough</h2>
              <div className="space-y-3">
                {returnSteps.map((st, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] flex items-start gap-4">
                    <div className="text-xl font-extrabold text-[#2563EB] font-mono shrink-0 w-8">{st.num}</div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-base text-[#111827]">{st.title}</h4>
                      <p className="text-xs sm:text-sm text-[#4B5563] leading-relaxed">{st.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Warranty Boundary Note */}
            <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-3">
              <h3 className="text-xl font-bold text-[#111827]">Returns vs. Warranty Protection</h3>
              <p className="text-sm text-[#4B5563] leading-relaxed">
                The 7-day return policy applies strictly to unused kits. After installation or after 7 days, any technical malfunction, battery reading anomaly, or sensor hardware issue is fully protected under our <strong>1-Year Full Replacement Warranty</strong>.
              </p>
              <div className="pt-2">
                <Link
                  href="/personal/support/warranty"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:underline"
                >
                  Learn about the 1-Year Warranty →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
