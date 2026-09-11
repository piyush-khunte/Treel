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
  Download
} from "lucide-react";

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
    <div className="bg-white text-slate-900 font-manrope min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              MOBILE APP
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Get the app.
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              The Personal TPMS app is free to download. It only works with Personal TPMS sensors purchased from Treel. Below are the download links and what the app does.
            </p>
          </div>
        </div>
      </section>

      {/* Download Badges Section */}
      <section className="py-16 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {/* iOS App Store Badge */}
            <Link
              href="/personal/app/ios"
              className="p-8 rounded-3xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xl hover:shadow-2xl flex items-center justify-between group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">For iPhone & Apple Watch</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">Download on the App Store</div>
                <div className="text-xs text-slate-300">Requires iOS 15.0 or later</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <Apple className="w-8 h-8" />
              </div>
            </Link>

            {/* Android Google Play Badge */}
            <Link
              href="/personal/app/android"
              className="p-8 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl flex items-center justify-between group cursor-pointer"
            >
              <div className="space-y-2">
                <div className="text-xs uppercase tracking-wider text-blue-200 font-bold">For Android & Wear OS</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white">Get it on Google Play</div>
                <div className="text-xs text-blue-100">Requires Android 10 or later</div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                <Play className="w-8 h-8 fill-white" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* App Visual & Features Grid */}
      <section className="py-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Phone Screen Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-3xl bg-slate-900 border-4 border-slate-800 p-6 text-white shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-bold text-xs text-slate-200">Honda City · BLE Connected</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">10:42 AM</span>
                </div>

                {/* 4-Tyre Status Visual */}
                <div className="grid grid-cols-2 gap-3 py-2">
                  <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/60 space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Front Left</div>
                    <div className="text-2xl font-extrabold text-white">32.0 <span className="text-xs font-normal text-slate-400">PSI</span></div>
                    <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 38°C Normal
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/60 space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Front Right</div>
                    <div className="text-2xl font-extrabold text-white">32.2 <span className="text-xs font-normal text-slate-400">PSI</span></div>
                    <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 39°C Normal
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/60 space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Rear Left</div>
                    <div className="text-2xl font-extrabold text-white">30.1 <span className="text-xs font-normal text-slate-400">PSI</span></div>
                    <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 37°C Normal
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/60 space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Rear Right</div>
                    <div className="text-2xl font-extrabold text-white">30.4 <span className="text-xs font-normal text-slate-400">PSI</span></div>
                    <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> 37°C Normal
                    </div>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-blue-900/40 border border-blue-700/50 text-xs text-blue-200 flex items-center justify-between">
                  <span>All 4 sensors reporting safely</span>
                  <span className="font-bold">±0.5 PSI</span>
                </div>
              </div>
            </div>

            {/* App Features List */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block mb-3">
                  INTUITIVE DRIVER INTERFACE
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  Designed for peace of mind on every journey.
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {appFeatures.map((feat, idx) => {
                  const IconComp = feat.icon;
                  return (
                    <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-2">
                      <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-base">{feat.title}</h3>
                      <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Requirements & Store Ratings Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* System Requirements */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">System Requirements</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">iOS 15 or later</div>
                    <div className="text-xs text-slate-500">Compatible with iPhone SE, 8, X, 11, 12, 13, 14, 15, 16 & Apple Watch Series 4+</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Android 10 or later</div>
                    <div className="text-xs text-slate-500">Compatible with Samsung, Xiaomi, OnePlus, Vivo, Oppo, Google Pixel & Wear OS 3+</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Bluetooth 5.0 LE</div>
                    <div className="text-xs text-slate-500">Ultra-low battery drain direct connection with 10-meter transmission range</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ratings Summary */}
            <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">App Store Ratings</h3>
                <p className="text-slate-600 text-sm">
                  Rated by car owners and enthusiasts across India for stability, responsiveness, and zero advertising.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                  <div className="flex items-center justify-center text-amber-400 gap-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-extrabold text-slate-900 text-lg">4.8</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800">Apple App Store</div>
                  <div className="text-[10px] text-slate-400">1,200+ Ratings</div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1">
                  <div className="flex items-center justify-center text-amber-400 gap-1">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span className="font-extrabold text-slate-900 text-lg">4.7</span>
                  </div>
                  <div className="text-xs font-bold text-slate-800">Google Play Store</div>
                  <div className="text-[10px] text-slate-400">1,500+ Ratings</div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/personal/features/app"
                  className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:underline"
                >
                  See full app features deep-dive →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Don't have Personal TPMS sensors yet?
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Get the complete 4-tyre wireless kit for ₹8,999 with 1-year replacement warranty.
              </p>
            </div>
            <Link
              href="/personal/buy"
              className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-md shrink-0 flex items-center gap-2"
            >
              Buy Kit Now →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
