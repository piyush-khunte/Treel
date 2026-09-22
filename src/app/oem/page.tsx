import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "OEM Solutions · Treel Mobility Solutions",
  description: "Treel OEM integration solutions for automotive manufacturers across two-wheeler, four-wheeler, commercial vehicle, bus, mining, and agriculture sectors.",
  alternates: {
    canonical: "https://treel.in/oem",
  },
};

export default function OemOverviewPage() {
  const oemSegments = [
    { title: "Introduction", href: "/oem/introduction", desc: "Overview of OEM integration architecture and capabilities." },
    { title: "Two-Wheeler", href: "/oem/two-wheeler", desc: "Factory-fit TPMS and connected telemetry for motorcycles and scooters." },
    { title: "Four-Wheeler", href: "/oem/four-wheeler", desc: "Integrated tyre intelligence and CAN-bus telematics for passenger vehicles." },
    { title: "Commercial Vehicle", href: "/oem/commercial-vehicle", desc: "Heavy commercial vehicle OE telematics and digital twin telemetry." },
    { title: "Bus", href: "/oem/bus", desc: "Passenger transit and bus fleet safety, pressure monitoring, and fleet analytics." },
    { title: "Mining", href: "/oem/mining", desc: "Heavy off-the-road equipment and open-cast haulage tyre monitoring systems." },
    { title: "Agriculture", href: "/oem/agriculture", desc: "Tractor and agricultural machinery tyre pressure and soil compaction telemetry." },
  ];

  return (
    <div className="bg-[#0F1419] text-[#FAF7F2] font-inter min-h-screen">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "OEM Solutions" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                ORIGINAL EQUIPMENT MANUFACTURER
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              OEM Solutions &amp; Factory <span className="italic font-normal text-[#D5573B]">Integration.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Factory-grade tyre pressure monitoring, connected telemetry, and digital twin systems engineered for automotive manufacturers and assembly line integration.
            </p>
          </div>
        </div>
      </section>

      {/* Segments Directory */}
      <section className="py-20 max-w-[1320px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oemSegments.map((segment) => (
            <Link
              key={segment.href}
              href={segment.href}
              className="p-8 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#D5573B]/50 hover:bg-white/[0.04] transition-all group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <h3 className="text-xl font-fraunces font-semibold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">
                  {segment.title}
                </h3>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  {segment.desc}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D5573B] pt-2">
                <span>View Segment</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-fraunces font-semibold text-[#FAF7F2]">OEM Engineering &amp; Partnerships</h4>
            <p className="text-sm text-[#94A3B8] mt-1">Connect with our automotive solutions engineering team for technical specifications and integration protocols.</p>
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
