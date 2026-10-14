import type { Metadata } from "next";
import { SupportClient } from "./support-client";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Customer Support & Diagnostics · Treel",
  description: "Treel official customer support. TPMS diagnostics, installation help, sensor pairing, and warranty assistance. Call toll-free 1800 833 0233.",
  alternates: {
    canonical: "https://treel.in/support",
  },
};

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Header Banner */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10 space-y-4">
          <Breadcrumb
            variant="corporate"
            items={[
              { label: "Home", href: "/" },
              { label: "Support" },
            ]}
          />
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
              TREEL CARE &amp; SERVICE
            </span>
          </div>
          <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2]">
            How can we help?
          </h1>
          <p className="text-[#94A3B8] text-base sm:text-lg max-w-2xl leading-relaxed">
            Get technical assistance for your sensors, inquire about order shipments, request installation advice, or speak to a support engineer.
          </p>
        </div>
      </section>

      {/* Main Support Client Component */}
      <section className="py-16 sm:py-20">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <SupportClient />
        </div>
      </section>
    </div>
  );
}
