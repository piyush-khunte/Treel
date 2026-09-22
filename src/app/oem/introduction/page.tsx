import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "OEM Introduction · Treel Mobility Solutions",
  description: "Introduction to Treel OEM integration architecture, factory-fit hardware, and connected vehicle intelligence.",
  alternates: {
    canonical: "https://treel.in/oem/introduction",
  },
};

export default function OemIntroductionPage() {
  return (
    <div className="bg-[#0F1419] text-[#FAF7F2] font-inter min-h-screen">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "OEM", href: "/oem" },
                { label: "Introduction" },
              ]}
            />
            <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
              OEM INTEGRATION
            </span>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              OEM <span className="italic font-normal text-[#D5573B]">Introduction.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Factory-grade tyre telematics architecture designed for seamless automotive assembly line integration and connected vehicle platforms.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-fraunces font-semibold text-[#FAF7F2]">Technical Documentation &amp; Evaluation</h2>
            <p className="text-sm text-[#94A3B8] mt-1">Request technical specifications, CAN-bus integration guidelines, and evaluation units.</p>
          </div>
          <Link href="/contact">
            <Button variant="treel" size="lg" className="shrink-0">
              Contact OEM Team
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
