import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { 
  Play, 
  Smartphone, 
  Car, 
  Package, 
  Wrench, 
  Radio, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Setup Guide · Personal TPMS",
  description: "Install Personal TPMS in 10 minutes. Six-step guide with photos and video. No tools required beyond what's in the box.",
  alternates: {
    canonical: "https://treel.in/personal/support/setup",
  },
  openGraph: {
    title: "Setup Guide · Personal TPMS",
    description: "Install Personal TPMS in 10 minutes. Six-step guide with photos and video. No tools required beyond what's in the box.",
    url: "https://treel.in/personal/support/setup",
  },
};

export default function PersonalSupportSetupPage() {
  const steps = [
    {
      num: "01",
      icon: Smartphone,
      title: "Download the app",
      body: "Install the Personal TPMS app from the App Store or Google Play. Open the app and create your profile (name and email — used only for warranty).",
      detail: "iOS 15+ / Android 10+"
    },
    {
      num: "02",
      icon: Car,
      title: "Add your vehicle",
      body: "In the app, tap \"Add vehicle.\" Enter your vehicle make, model, and target tyre pressure (find this on the driver-side door jamb sticker or your owner's manual).",
      detail: "OEM Door Placard Pressure"
    },
    {
      num: "03",
      icon: Package,
      title: "Unpack the sensors",
      body: "Your kit includes four sensors, labeled FL (front-left), FR (front-right), RL (rear-left), RR (rear-right). Keep them in position order for the next step.",
      detail: "FL, FR, RL, RR Position Marked"
    },
    {
      num: "04",
      icon: Wrench,
      title: "Install the sensors",
      body: "For each tyre: unscrew the valve cap, screw the corresponding sensor onto the valve stem (finger-tight, no tools needed), and lock it with the included anti-theft ring.",
      detail: "Anti-Theft Brass Lock Nut"
    },
    {
      num: "05",
      icon: Radio,
      title: "Pair with the app",
      body: "Return to the app. Tap \"Pair sensors.\" Drive your car forward and backward for 30 seconds (this wakes the sensors). Sensors auto-pair with the app in position order.",
      detail: "Automatic Bluetooth 5.0 Handshake"
    },
    {
      num: "06",
      icon: CheckCircle2,
      title: "You're done",
      body: "All four tyres now show live pressure and temperature on your app home screen. Drive normally. The app will alert you if anything changes.",
      detail: "Continuous Live Dashboard Active"
    }
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="personal"
              items={[
                { label: "Personal TPMS", href: "/personal" },
                { label: "Support", href: "/personal/support" },
                { label: "Setup Guide" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em] inline-block">
              SETUP GUIDE
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.15]">
              Installed in 10 minutes.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              Personal TPMS is designed for DIY installation. Six steps. Video below if you prefer to watch.
            </p>
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      <section className="py-16 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#111827] p-8 sm:p-12 text-white shadow-2xl text-center space-y-6 relative overflow-hidden">
            <div className="w-16 h-16 rounded-full bg-[#2563EB] text-white flex items-center justify-center mx-auto shadow-lg hover:scale-110 transition-transform cursor-pointer">
              <Play className="w-7 h-7 fill-white ml-1" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">3-Minute Installation Walkthrough</h3>
              <p className="text-[#D1D5DB] text-sm max-w-md mx-auto">
                Watch our quick visual guide demonstrating sensor mounting, anti-theft locking, and mobile pairing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Six Steps Walkthrough Section */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em] inline-block">
              STEP-BY-STEP
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              The six steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((st, idx) => {
              const IconComp = st.icon;
              return (
                <div key={idx} className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-3xl font-extrabold text-[#2563EB] font-mono">{st.num}</span>
                      <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-[#111827]">{st.title}</h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed">{st.body}</p>
                  </div>

                  <div className="pt-4 border-t border-black/[0.04] text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                    {st.detail}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Shortcuts & Warranty Band */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Troubleshooting shortcut */}
            <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827]">Something not working?</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  If a sensor doesn't pair, if the app doesn't recognise a sensor, or if you see other issues during setup, see the troubleshooting page.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="/personal/support/troubleshooting"
                  className="inline-flex items-center gap-2 text-[#2563EB] font-bold text-sm hover:underline"
                >
                  Troubleshooting →
                </Link>
              </div>
            </div>

            {/* Warranty registration shortcut */}
            <div className="p-8 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 text-[#059669] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-bold text-[#111827]">Register your warranty</h3>
                <p className="text-[#4B5563] text-sm leading-relaxed">
                  Once installed, register your warranty. It only takes a minute and it means we can help faster if you ever need it.
                </p>
              </div>
              <div className="pt-4">
                <Link
                  href="/personal/support/warranty"
                  className="inline-flex items-center gap-2 text-[#059669] font-bold text-sm hover:underline"
                >
                  Register warranty →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
