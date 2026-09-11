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
    <div className="bg-white text-slate-900 font-manrope min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              FEATURE · APP
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              The app that makes it work.
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              Personal TPMS runs on a native iOS and Android app. Home screen widget. Apple Watch complications. Dark mode. Multi-vehicle support. Below is what the app does and how to get it.
            </p>
          </div>
        </div>
      </section>

      {/* App Screenshots Gallery Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-12 space-y-4">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              INTERFACE TOUR
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              See the app
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {screenshots.map((s, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 hover:border-blue-400 transition-colors">
                <div className="text-xs font-bold text-blue-600 font-mono">0{idx + 1}</div>
                <h3 className="font-bold text-slate-900 text-base">{s.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Features Grid Section */}
      <section className="py-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              COMPLETE CAPABILITIES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              What the app does
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appFeatures.map((feat, idx) => {
              const IconComp = feat.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Requirements Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              COMPATIBILITY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              What you need.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-sm font-bold block">iOS</strong>
                <p className="text-xs text-slate-600">iPhone running iOS 15 or later (compatible with Apple Watch Series 4+)</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-sm font-bold block">Android</strong>
                <p className="text-xs text-slate-600">Android device running Android 10 or later (compatible with Wear OS 3+)</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-sm font-bold block">Bluetooth</strong>
                <p className="text-xs text-slate-600">Bluetooth 5.0 Low Energy support (any standard smartphone from 2018 onward)</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                <strong className="text-slate-900 text-sm font-bold block">Storage & Permissions</strong>
                <p className="text-xs text-slate-600">~45 MB storage. Bluetooth (required), Notifications (recommended), Location (optional)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download The App Section */}
      <section className="py-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-3">
              <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
                GET STARTED
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Download the app
              </h2>
              <p className="text-slate-600 text-base sm:text-lg">
                The Personal TPMS app is free to download. It only works with Personal TPMS sensors purchased from Treel.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/personal/app/ios"
                className="p-6 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-md flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">For iPhone & Apple Watch</div>
                  <div className="text-xl font-bold text-white mt-1">Download on the App Store →</div>
                </div>
                <Apple className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />
              </Link>

              <a
                href="https://play.google.com/store/apps/details?id=com.treel.android"
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <div className="text-[11px] font-bold text-blue-200 uppercase tracking-wider">For Android & Wear OS</div>
                  <div className="text-xl font-bold text-white mt-1">Get it on Google Play →</div>
                </div>
                <Play className="w-8 h-8 fill-white text-white group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* App Reviews Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              DRIVER EXPERIENCES
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              What users say about the app
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified Purchase
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base">"{rev.title}"</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{rev.body}</p>
                <div className="pt-2 border-t border-slate-200/80 text-xs font-bold text-slate-700">
                  {rev.name} · <span className="font-normal text-slate-500">{rev.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
