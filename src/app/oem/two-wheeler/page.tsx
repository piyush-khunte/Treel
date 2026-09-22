import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Two-Wheeler OEM Solutions · Treel Mobility Solutions",
  description: "Factory-fit TPMS and connected telematics for motorcycle and scooter manufacturers.",
  alternates: {
    canonical: "https://treel.in/oem/two-wheeler",
  },
};

export default function OemTwoWheelerPage() {
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
                { label: "Two-Wheeler" },
              ]}
            />
            <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
              TWO-WHEELER SEGMENT
            </span>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Two-Wheeler <span className="italic font-normal text-[#D5573B]">OEM Solutions.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Compact, high-precision tyre pressure monitoring and Bluetooth/BLE telemetry engineered for motorcycle and scooter original equipment manufacturers.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-fraunces font-semibold text-[#FAF7F2]">Two-Wheeler OEM Integration</h2>
            <p className="text-sm text-[#94A3B8] mt-1">Consult with our engineering team regarding sensor integration, cluster display protocols, and OE fitment.</p>
          </div>
          <Link href="/contact">
            <Button variant="treel" size="lg" className="shrink-0">
              Inquire Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
