import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Fuel,
  Wrench,
  PhoneCall,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  QrCode,
  Truck,
} from "lucide-react";
import RegionalIndiaMap from "@/components/suraksha/regional-india-map";
import { WhatsAppCtaButton } from "@/components/ui/whatsapp-cta-button";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

export const metadata: Metadata = {
  title: "Project Suraksha — Truck Tyre Safety & Savings Kit | Treel",
  description:
    "Suraksha safety kit for Indian trucks. Real-time tyre pressure display in cabin. Fifteen-minute install at any Truck Wheels centre. Nine-month payback. Made by Treel.",
  alternates: {
    canonical: "https://treel.in/suraksha",
  },
  openGraph: {
    title: "Project Suraksha — Truck Tyre Safety & Savings Kit | Treel",
    description:
      "Suraksha safety kit for Indian trucks. Real-time tyre pressure display in cabin. Fifteen-minute install at any Truck Wheels centre. Nine-month payback. Made by Treel.",
    url: "https://treel.in/suraksha",
  },
};

const pillars = [
  {
    number: "01 · SAFETY",
    title: "FRONT-TYRE BLOWOUTS, PREVENTED.",
    desc: "Real-time tyre pressure and temperature on the cabin display. See the warning before the blowout. Built for your family — because returning home safely from every trip matters.",
    color: "#DC2626",
    badgeBg: "bg-[#DC2626]/10 text-[#DC2626] border-[#DC2626]/30",
    icon: Shield,
  },
  {
    number: "02 · SAVINGS",
    title: "NINE MONTHS. FULL PAYBACK.",
    desc: "0.5 to 0.6 percent fuel savings. Five to seven percent tyre-life extension. Zero roadside towing fees. The kit pays for itself in nine to twelve months.",
    accent: "FULL PAYBACK",
    color: "#EA580C",
    badgeBg: "bg-[#EA580C]/10 text-[#EA580C] border-[#EA580C]/30",
    icon: Fuel,
  },
  {
    number: "03 · SIMPLICITY",
    title: "FIT AT ANY PUNCTURE SHOP. WATCH IN YOUR CABIN.",
    desc: "Fifteen-minute installation at any Truck Wheels centre or roadside puncture shop. No app to download.",
    badge: "No monthly fee. No subscription.",
    color: "#0891B2",
    badgeBg: "bg-[#0891B2]/10 text-[#0891B2] border-[#0891B2]/30",
    icon: Wrench,
  },
];

export default function SurakshaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Suraksha Truck TPMS Safety Kit",
    brand: {
      "@type": "Brand",
      name: "Treel",
    },
    description:
      "Suraksha safety kit for Indian commercial trucks with in-cab wireless display and 4 to 18 tyre sensors.",
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      url: "https://treel.in/suraksha",
    },
  };

  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 sm:pt-20 pb-20 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
                <Truck className="w-3.5 h-3.5" />
                FOR INDIA'S TRUCK DRIVERS
              </div>

              <div className="space-y-2">
                <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95] uppercase">
                  SAFETY <br />
                  FITS <span className="italic text-[#DC2626]">ANY</span> <br />
                  TRUCK.
                </h1>
                <SurakshaRotator
                  page="5.1"
                  className="font-baloo text-2xl sm:text-3xl font-bold text-[#DC2626] tracking-wide pt-1"
                >
                  आपके परिवार की सुरक्षा।
                </SurakshaRotator>
              </div>

              <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-2xl">
                Shows tyre pressure. Pays for itself in nine months. Installs in fifteen minutes. Fits any truck, anywhere in India.
              </p>

              {/* Value Statement Pill */}
              <div className="inline-flex flex-wrap items-center gap-3 p-2 pr-5 rounded-lg bg-[#FEF3C7] border-2 border-[#DC2626]/30">
                <span className="font-anton text-base sm:text-lg font-normal text-[#DC2626] px-3 py-1 rounded-[4px] bg-[#DC2626]/10 uppercase tracking-wide">
                  Built for your safety
                </span>
                <span className="text-[#78350F] font-rubik text-sm font-semibold">
                  Made for the road.
                </span>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/suraksha/centres"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] active:scale-[0.98]"
                >
                  Nearest Centre <ArrowRight className="w-5 h-5" />
                </Link>
                <WhatsAppCtaButton
                  href="/suraksha/whatsapp"
                  size="lg"
                  title="Chat with Suraksha on WhatsApp"
                  ariaLabel="WhatsApp"
                />
              </div>
            </div>

            {/* Right Kit Visual Box */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-lg bg-[#FEF3C7] border-3 border-[#DC2626] shadow-xl relative overflow-hidden space-y-6">
                <div className="flex items-center justify-between border-b-2 border-[#DC2626]/20 pb-4">
                  <span className="font-anton text-lg tracking-wider text-[#DC2626] uppercase">
                    KIT INCLUDES
                  </span>
                  <span className="font-rubik text-xs font-bold px-2.5 py-1 rounded-full bg-[#EA580C]/10 text-[#EA580C] border border-[#EA580C]/30">
                    COMPLETE KIT
                  </span>
                </div>

                {/* Branded Kit Visual Diagram */}
                <div className="p-6 rounded-[6px] bg-[#FFFBEB] border-2 border-[#DC2626]/20 space-y-5 text-center">
                  <div className="mx-auto w-24 h-16 rounded-[4px] bg-[#451A03] border-2 border-[#DC2626] flex flex-col items-center justify-center text-[#FEF3C7] shadow-md">
                    <span className="font-anton text-xs text-[#EA580C]">IN-CAB DISPLAY</span>
                    <span className="font-rubik text-sm font-bold text-[#10B981]">118 PSI · 54°C</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 pt-2">
                    {[1, 2, 3, 4].map((sensor) => (
                      <div
                        key={sensor}
                        className="p-2 rounded-[4px] bg-[#FEF3C7] border border-[#DC2626]/30 text-center"
                      >
                        <div className="w-6 h-6 mx-auto rounded-full bg-[#DC2626] text-[#FEF3C7] text-[10px] font-bold flex items-center justify-center mb-1">
                          {sensor === 4 ? "S4+" : `S${sensor}`}
                        </div>
                        <span className="text-[10px] font-bold text-[#78350F] block">Sensor</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 text-center sm:text-left">
                  <div className="font-rubik font-bold text-lg text-[#451A03] leading-snug">
                    1 in-cab display · Tyre sensors as per your truck configuration
                  </div>
                  <div className="text-[#78350F] text-sm font-medium">
                    The number of sensors required depends on your truck&apos;s wheel configuration · DIY install · Any tyre brand
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Three Reasons Drivers Install Suraksha */}
      <section className="py-20 sm:py-28 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-14">
            <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
              THREE REASONS DRIVERS INSTALL SURAKSHA
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              THREE REASONS DRIVERS INSTALL SURAKSHA.
            </h2>
            <p className="text-[#78350F] text-lg mt-3 font-medium">
              Safety for the driver. Savings for the business. Simplicity for the family. Same kit, three promises kept.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.number}
                  className="p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all flex flex-col justify-between space-y-6 shadow-md"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className={`font-rubik text-xs font-bold px-3 py-1 rounded-full border ${pillar.badgeBg}`}>
                        {pillar.number}
                      </span>
                      <div className="w-10 h-10 rounded-[6px] bg-[#FEF3C7] border border-[#451A03]/10 flex items-center justify-center text-[#DC2626]">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] leading-tight uppercase">
                      {pillar.title}
                    </h3>

                    <p className="text-[#78350F] text-base leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  {pillar.accent && (
                    <div className="pt-4 border-t border-[#451A03]/10 font-baloo text-2xl font-extrabold text-[#DC2626]">
                      {pillar.accent}
                    </div>
                  )}

                  {pillar.badge && (
                    <div className="pt-4 border-t border-[#451A03]/10">
                      <span className="inline-block px-3 py-1 rounded-[4px] bg-[#0891B2]/10 border border-[#0891B2]/30 text-[#0891B2] font-rubik text-xs font-bold">
                        {pillar.badge}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Six Regional Clusters */}
      <section className="py-20 sm:py-28 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
              SIX REGIONAL CLUSTERS
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              INDIA-WIDE. CLUSTER-TUNED.
            </h2>
            <p className="text-[#78350F] text-lg mt-3 font-medium">
              Suraksha ships in the vernacular of each cluster. Same product, same protection, six voices. Language of the driver, wherever the driver runs.
            </p>
          </div>

          <RegionalIndiaMap />
        </div>
      </section>

      {/* Final CTA Gradient Band */}
      <section className="py-20 sm:py-24 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="font-anton text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#FEF3C7] leading-[0.95] uppercase">
              NINE MONTHS.<br />
              FULL PAYBACK.
            </h2>

            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl leading-relaxed font-medium max-w-2xl mx-auto">
              Suraksha truck safety kit. Easy EMI available through Bajaj Finance at every Truck Wheels centre. Installation takes fifteen minutes.
            </p>

            {/* Two Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 max-w-2xl mx-auto">
              {/* Toll-Free Card */}
              <a
                href="tel:18008330233"
                className="p-6 rounded-lg bg-[#FEF3C7] text-[#451A03] border-2 border-[#FEF3C7] hover:scale-[1.02] transition-transform text-center shadow-lg block group"
              >
                <div className="font-rubik text-xs font-bold uppercase tracking-wider text-[#DC2626] mb-1">
                  TOLL-FREE CALL
                </div>
                <div className="font-anton text-3xl font-normal text-[#451A03] tracking-wider my-2">
                  1800 833 0233
                </div>
                <div className="text-xs font-semibold text-[#78350F] flex items-center justify-center gap-1">
                  <PhoneCall className="w-4 h-4 text-[#DC2626]" /> Call Toll-Free Now
                </div>
              </a>

              {/* WhatsApp QR Card */}
              <Link
                href="/suraksha/whatsapp"
                className="p-6 rounded-lg bg-[#FEF3C7] text-[#451A03] border-2 border-[#FEF3C7] hover:scale-[1.02] transition-transform text-center shadow-lg block group"
              >
                <div className="font-rubik text-xs font-bold uppercase tracking-wider text-[#0891B2] mb-1">
                  SCAN FOR WHATSAPP
                </div>
                <div className="w-16 h-16 mx-auto my-2 rounded-[4px] bg-white border-2 border-[#451A03]/20 flex items-center justify-center text-[#10B981]">
                  <QrCode className="w-10 h-10" />
                </div>
                <div className="text-xs font-semibold text-[#78350F] flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4 fill-[#25D366] shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.953 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.15-.176.201-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.677-1.631-.928-2.233-.244-.585-.492-.505-.677-.515-.176-.01-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.43.25-.703.25-1.305.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 21.786h-.005a9.832 9.832 0 0 1-5.01-1.377l-.36-.214-3.725.976.994-3.63-.235-.374a9.858 9.858 0 0 1-1.512-5.263c0-5.446 4.435-9.879 9.886-9.879 2.639 0 5.118 1.028 6.982 2.894a9.824 9.824 0 0 1 2.891 6.985c0 5.448-4.434 9.882-9.886 9.882zm0-18.286c-4.636 0-8.406 3.768-8.406 8.404a8.38 8.38 0 0 0 1.29 4.474l.199.317-.588 2.148 2.2-.577.308.183a8.356 8.356 0 0 0 4.997 1.459h.004c4.636 0 8.406-3.769 8.406-8.405a8.344 8.344 0 0 0-2.463-5.942 8.345 8.345 0 0 0-5.947-2.461z" />
                  </svg>
                  Or Chat on WhatsApp
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
