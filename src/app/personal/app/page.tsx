import type { Metadata } from "next";
import Link from "next/link";
import { 
  Smartphone, 
  Apple, 
  Play, 
  Star, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Gauge, 
  Bell, 
  Layers, 
  Clock, 
  Moon, 
  Sliders, 
  Sparkles,
  Download,
  ShoppingCart
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Download the App · Personal TPMS",
  description: "Download the Personal TPMS app for iOS and Android. Free to download. Works only with Personal TPMS sensors purchased from Treel.",
  alternates: {
    canonical: "https://treel.in/personal/app",
  },
  openGraph: {
    title: "Download the App · Personal TPMS",
    description: "Download the Personal TPMS app for iOS and Android. Free to download. Works only with Personal TPMS sensors purchased from Treel.",
    url: "https://treel.in/personal/app",
  },
};

export default function PersonalAppPage() {
  const appFeatures = [
    {
      icon: Gauge,
      title: "Real-time Telemetry",
      desc: "Live tyre pressure (PSI) and temperature (°C) refreshed every 3 seconds while driving."
    },
    {
      icon: Bell,
      title: "Instant Leak Alerts",
      desc: "Push warnings for slow leaks, sudden pressure loss, high temperature, and sensor low battery."
    },
    {
      icon: Layers,
      title: "Home Screen Widgets",
      desc: "Instant pressure glance on iOS 14+ widgets, Android 12+ widgets, and Apple Watch complications."
    },
    {
      icon: Sliders,
      title: "Customizable Thresholds",
      desc: "Adjust high/low target PSI limits per axle to match your vehicle's OEM placard specifications."
    },
    {
      icon: Clock,
      title: "30-Day History & Export",
      desc: "Review past driving sessions, pressure trends, and export tyre health reports via CSV."
    },
    {
      icon: Moon,
      title: "Dark Mode & Multi-Car",
      desc: "OLED-friendly dark theme and seamless management for up to 5 personal vehicles."
    }
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="personal"
              items={[
                { label: "Personal TPMS", href: "/personal" },
                { label: "Treel Care App" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              MOBILE APP
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              Get the app.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              The Personal TPMS app is free to download. It only works with Personal TPMS sensors purchased from Treel. Below are the download links and what the app does.
            </p>
          </div>
        </div>
      </section>

      {/* Download Badges Section */}
      <section className="py-16 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* iOS App Store Badge */}
            <Link
              href="/personal/app/ios"
              className="p-8 sm:p-10 rounded-[32px] bg-[#111827] text-white hover:bg-black transition-all shadow-xl hover:shadow-2xl flex items-center justify-between group cursor-pointer border border-white/10"
            >
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-[#94A3B8] font-bold">For iPhone & Apple Watch</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">Download on the App Store</div>
                <div className="text-xs text-[#94A3B8]">Requires iOS 15.0 or later</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-110 group-hover:bg-[#2563EB] transition-all">
                <Apple className="w-8 h-8" />
              </div>
            </Link>

            {/* Android Google Play Badge */}
            <Link
              href="/personal/app/android"
              className="p-8 sm:p-10 rounded-[32px] bg-[#2563EB] text-white hover:bg-[#1D4ED8] transition-all shadow-xl hover:shadow-2xl flex items-center justify-between group cursor-pointer shadow-[0_8px_24px_rgba(37,99,235,0.3)]"
            >
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-blue-100 font-bold">For Android & Wear OS</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">Get it on Google Play</div>
                <div className="text-xs text-blue-100">Requires Android 10 or later</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-all">
                <Play className="w-8 h-8 fill-white" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* App Visual & Features Grid */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Phone Screen Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-[40px] bg-gradient-to-b from-white to-[#F3F4F6] border border-black/[0.06] p-6 text-[#111827] shadow-[0_30px_80px_rgba(17,24,39,0.12)] space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                    <span className="font-bold text-xs text-[#111827]">Honda City · BLE Connected</span>
                  </div>
                  <span className="text-[10px] text-[#6B7280] font-mono">10:42 AM</span>
                </div>

                {/* 4-Tyre Status Visual */}
                <div className="grid grid-cols-2 gap-3 py-2">
                  <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm space-y-1">
                    <div className="text-[10px] uppercase font-bold text-[#6B7280]">Front Left</div>
                    <div className="text-2xl font-extrabold text-[#111827]">32.0 <span className="text-xs font-normal text-[#6B7280]">PSI</span></div>
                    <div className="text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 38°C Normal
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm space-y-1">
                    <div className="text-[10px] uppercase font-bold text-[#6B7280]">Front Right</div>
                    <div className="text-2xl font-extrabold text-[#111827]">32.2 <span className="text-xs font-normal text-[#6B7280]">PSI</span></div>
                    <div className="text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 39°C Normal
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm space-y-1">
                    <div className="text-[10px] uppercase font-bold text-[#6B7280]">Rear Left</div>
                    <div className="text-2xl font-extrabold text-[#111827]">30.1 <span className="text-xs font-normal text-[#6B7280]">PSI</span></div>
                    <div className="text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 37°C Normal
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white border border-black/[0.06] shadow-sm space-y-1">
                    <div className="text-[10px] uppercase font-bold text-[#6B7280]">Rear Right</div>
                    <div className="text-2xl font-extrabold text-[#111827]">30.4 <span className="text-xs font-normal text-[#6B7280]">PSI</span></div>
                    <div className="text-[10px] font-bold text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 37°C Normal
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#2563EB]/5 border border-[#2563EB]/20 text-xs text-[#2563EB] flex items-center justify-between">
                  <span>All 4 sensors reporting safely</span>
                  <span className="font-bold">±0.5 PSI</span>
                </div>
              </div>
            </div>

            {/* App Features List */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em] mb-3">
                  INTUITIVE DRIVER INTERFACE
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
                  Designed for peace of mind on every journey.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {appFeatures.map((feat, idx) => {
                  const IconComp = feat.icon;
                  return (
                    <div key={idx} className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-2 hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                      <div className="w-10 h-10 rounded-2xl bg-[#2563EB]/10 flex items-center justify-center text-[#2563EB]">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-[#111827] text-base">{feat.title}</h3>
                      <p className="text-xs text-[#6B7280] leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements & Store Ratings Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* System Requirements */}
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-6">
              <h3 className="text-2xl font-bold text-[#111827]">System Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#111827] text-sm">iOS 15 or later</div>
                    <div className="text-xs text-[#6B7280]">Compatible with iPhone SE, 8, X, 11, 12, 13, 14, 15, 16 & Apple Watch Series 4+</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#111827] text-sm">Android 10 or later</div>
                    <div className="text-xs text-[#6B7280]">Compatible with Samsung, Xiaomi, OnePlus, Vivo, Oppo, Google Pixel & Wear OS 3+</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-[#111827] text-sm">Bluetooth 5.0 LE</div>
                    <div className="text-xs text-[#6B7280]">Ultra-low battery drain direct connection with 10-meter transmission range</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ratings Summary */}
            <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-[#111827] mb-2">App Store Ratings</h3>
                <p className="text-[#4B5563] text-sm">
                  Rated by car owners and enthusiasts across India for stability, responsiveness, and zero advertising.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-6 rounded-3xl bg-white border border-black/[0.06] text-center space-y-1 shadow-sm">
                  <div className="flex items-center justify-center text-[#F59E0B] gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-extrabold text-[#111827] text-lg">4.8</span>
                  </div>
                  <div className="text-xs font-bold text-[#111827]">Apple App Store</div>
                  <div className="text-[10px] text-[#6B7280]">1,200+ Ratings</div>
                </div>

                <div className="p-6 rounded-3xl bg-white border border-black/[0.06] text-center space-y-1 shadow-sm">
                  <div className="flex items-center justify-center text-[#F59E0B] gap-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-extrabold text-[#111827] text-lg">4.7</span>
                  </div>
                  <div className="text-xs font-bold text-[#111827]">Google Play Store</div>
                  <div className="text-[10px] text-[#6B7280]">1,500+ Ratings</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/personal/features/app"
                  className="inline-flex items-center gap-2 text-[#2563EB] font-bold text-sm hover:underline"
                >
                  See full app features deep-dive →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-14 rounded-[32px] bg-[#111827] text-white shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Don't have Personal TPMS sensors yet?
              </h2>
              <p className="text-[#94A3B8] text-sm sm:text-base font-normal">
                Get the complete 4-tyre wireless kit for ₹8,999 with 1-year replacement warranty.
              </p>
            </div>
            <Link
              href="/personal/buy"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white font-manrope font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-[0_4px_14px_rgba(37,99,235,0.3)] shrink-0 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" /> Buy Kit Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
