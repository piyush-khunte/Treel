import type { Metadata } from "next";
import Link from "next/link";
import { 
  Smartphone, 
  Apple, 
  Play, 
  Layers, 
  Clock, 
  Sliders, 
  Moon, 
  Lock, 
  WifiOff, 
  FileSpreadsheet, 
  CheckCircle2, 
  Star, 
  Gauge, 
  Bell, 
  Watch, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Mobile App · Personal TPMS",
  description: "The Personal TPMS mobile app. iOS 15+ and Android 10+. Home screen widget. Apple Watch complications. Dark mode. Multi-vehicle support.",
  alternates: {
    canonical: "https://treel.in/personal/features/app",
  },
  openGraph: {
    title: "Mobile App · Personal TPMS",
    description: "The Personal TPMS mobile app. iOS 15+ and Android 10+. Home screen widget. Apple Watch complications. Dark mode. Multi-vehicle support.",
    url: "https://treel.in/personal/features/app",
  },
};

export default function PersonalFeaturesAppPage() {
  const screenshots = [
    { title: "Home Dashboard", desc: "4-tyre live pressure and temperature overview" },
    { title: "Tyre Detail", desc: "Granular historical trends, psi precision, and battery health" },
    { title: "30-Day Trip History", desc: "Drive-by-drive thermal and pressure logs" },
    { title: "Instant Alerts", desc: "Early warning banners and urgency popups" },
    { title: "Axle Settings", desc: "OEM threshold calibration per front/rear axle" },
    { title: "Home Screen Widget", desc: "Glanceable pressure without launching the app" },
    { title: "Apple Watch & Wear OS", desc: "Haptic wrist taps and watch complications" },
  ];

  const appFeatures = [
    {
      icon: Gauge,
      title: "Real-Time 4-Tyre Telemetry",
      desc: "Instant live pressure (PSI/kPa) and temperature updated every 3 seconds while driving."
    },
    {
      icon: Clock,
      title: "30-Day Trip History",
      desc: "Detailed drive logs to track historical tyre performance and seasonal pressure shifts."
    },
    {
      icon: Sliders,
      title: "Configurable Alert Thresholds",
      desc: "Customize high/low pressure thresholds to match your vehicle manufacturer's door placard."
    },
    {
      icon: Smartphone,
      title: "Multi-Vehicle Support",
      desc: "Monitor up to 5 personal cars or SUVs from a single Treel account."
    },
    {
      icon: Layers,
      title: "Home Screen Widgets",
      desc: "Live tyre status glanceable directly on iOS 14+ and Android 12+ home screens."
    },
    {
      icon: Watch,
      title: "Apple Watch & Wear OS",
      desc: "Wrist complications, status glances, and urgent tactile haptic vibration alerts."
    },
    {
      icon: Moon,
      title: "Dark Mode",
      desc: "OLED-friendly high-contrast dark theme for comfortable night driving."
    },
    {
      icon: Lock,
      title: "Biometric Security",
      desc: "Support for Face ID, Touch ID, and Android fingerprint authentication."
    },
    {
      icon: WifiOff,
      title: "Offline Mode",
      desc: "Access last-known tyre readings and historical logs even without an active internet connection."
    },
    {
      icon: FileSpreadsheet,
      title: "CSV Data Export",
      desc: "Export comprehensive telemetry tables for enthusiast analysis and service records."
    }
  ];

  const reviews = [
    {
      name: "Vivek R.",
      role: "Honda City Owner",
      title: "Super clean widget on iOS lock screen",
      body: "The widget tells me my cold tyre pressure before I even step out of my apartment. Clean design and zero battery drain.",
      stars: 5
    },
    {
      name: "Ananya S.",
      role: "Hyundai Creta Owner",
      title: "Zero connection drops on road trips",
      body: "Seamless Bluetooth 5.0 pairing. The multi-car support makes managing our family sedan and SUV effortless in one app.",
      stars: 5
    },
    {
      name: "Karthik M.",
      role: "Tata Nexon EV Owner",
      title: "Accurate to the decimal",
      body: "Checked against a certified digital gauge at the JK Tyre service hub and it matched within 0.2 PSI. Highly recommended.",
      stars: 5
    }
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              FEATURE · APP
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              The app that makes it work.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Personal TPMS runs on a native iOS and Android app. Home screen widget. Apple Watch complications. Dark mode. Multi-vehicle support. Below is what the app does and how to get it.
            </p>
          </div>
        </div>
      </section>

      {/* App Screenshots Gallery Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              INTERFACE TOUR
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              See the app
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {screenshots.map((s, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-2 hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                <div className="text-xs font-bold text-[#2563EB] font-mono">0{idx + 1}</div>
                <h3 className="font-bold text-[#111827] text-base">{s.title}</h3>
                <p className="text-xs text-[#6B7280] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Features Grid Section */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              COMPLETE CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              What the app does
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="p-6 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-3 hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#111827] text-base">{feat.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Requirements Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              COMPATIBILITY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              What you need.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-1">
                <strong className="text-[#111827] text-sm font-bold block">iOS</strong>
                <p className="text-xs text-[#6B7280]">iPhone running iOS 15 or later (compatible with Apple Watch Series 4+)</p>
              </div>
              <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-1">
                <strong className="text-[#111827] text-sm font-bold block">Android</strong>
                <p className="text-xs text-[#6B7280]">Android device running Android 10 or later (compatible with Wear OS 3+)</p>
              </div>
              <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-1">
                <strong className="text-[#111827] text-sm font-bold block">Bluetooth</strong>
                <p className="text-xs text-[#6B7280]">Bluetooth 5.0 Low Energy support (any standard smartphone from 2018 onward)</p>
              </div>
              <div className="p-6 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-1">
                <strong className="text-[#111827] text-sm font-bold block">Storage & Permissions</strong>
                <p className="text-xs text-[#6B7280]">~45 MB storage. Bluetooth (required), Notifications (recommended), Location (optional)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download The App Section */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
                GET STARTED
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
                Download the app
              </h2>
              <p className="text-[#4B5563] text-base sm:text-lg">
                The Personal TPMS app is free to download. It only works with Personal TPMS sensors purchased from Treel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/personal/app/ios"
                className="p-8 rounded-[32px] bg-[#111827] text-white hover:bg-black transition-all shadow-xl hover:shadow-2xl flex items-center justify-between group cursor-pointer border border-white/10"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#94A3B8] font-bold">For iPhone & Apple Watch</div>
                  <div className="text-2xl font-extrabold text-white pt-1">App Store</div>
                  <div className="text-xs text-[#94A3B8] pt-1">Requires iOS 15.0+</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#2563EB] transition-colors">
                  <Apple className="w-6 h-6" />
                </div>
              </Link>

              <Link
                href="/personal/app/android"
                className="p-8 rounded-[32px] bg-[#111827] text-white hover:bg-black transition-all shadow-xl hover:shadow-2xl flex items-center justify-between group cursor-pointer border border-white/10"
              >
                <div>
                  <div className="text-xs uppercase tracking-wider text-[#94A3B8] font-bold">For Android & Wear OS</div>
                  <div className="text-2xl font-extrabold text-white pt-1">Google Play</div>
                  <div className="text-xs text-[#94A3B8] pt-1">Requires Android 10.0+</div>
                </div>
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#2563EB] transition-colors">
                  <Play className="w-6 h-6 fill-current" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews on App Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              USER FEEDBACK
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              Customer reviews of the app.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-4 hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                <div className="flex gap-1 text-[#F59E0B]">
                  {[...Array(rev.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h3 className="font-bold text-[#111827] text-base">"{rev.title}"</h3>
                <p className="text-xs text-[#4B5563] leading-relaxed italic">"{rev.body}"</p>
                <div className="pt-2 border-t border-black/[0.06] text-xs text-[#6B7280]">
                  <span className="font-bold text-[#111827] block">{rev.name}</span>
                  <span>{rev.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
