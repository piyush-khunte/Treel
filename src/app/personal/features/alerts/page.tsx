import type { Metadata } from "next";
import Link from "next/link";
import { 
  Bell, 
  AlertTriangle, 
  Flame, 
  TrendingDown, 
  BatteryLow, 
  WifiOff, 
  Sliders, 
  Smartphone, 
  Apple, 
  Play, 
  Layers, 
  CheckCircle2, 
  ArrowRight,
  ShoppingCart
} from "lucide-react";

export const metadata: Metadata = {
  title: "Instant Alerts · Personal TPMS",
  description: "Personal TPMS sends instant alerts before a slow leak becomes a puncture. Configurable thresholds. iOS, Android, Apple Watch notifications.",
  alternates: {
    canonical: "https://treel.in/personal/features/alerts",
  },
  openGraph: {
    title: "Instant Alerts · Personal TPMS",
    description: "Personal TPMS sends instant alerts before a slow leak becomes a puncture. Configurable thresholds. iOS, Android, Apple Watch notifications.",
    url: "https://treel.in/personal/features/alerts",
  },
};

export default function PersonalFeaturesAlertsPage() {
  const alertTypes = [
    {
      icon: TrendingDown,
      title: "Low Pressure",
      trigger: "Pressure drops below your configured threshold (default: 10% below target)",
      channel: "Push notification (phone), Apple Watch tap, in-app banner",
      message: "Front-left tyre at 28 PSI. Target is 32 PSI. Check for slow leak.",
      badge: "Slow Leak Warning"
    },
    {
      icon: Flame,
      title: "High Temperature",
      trigger: "Tyre temperature exceeds safe operating range (default: 80°C)",
      channel: "Push notification, in-app banner",
      message: "Rear-right tyre at 82°C. Consider reducing speed and inspecting at next stop.",
      badge: "Thermal Warning"
    },
    {
      icon: AlertTriangle,
      title: "Rapid Pressure Drop",
      trigger: "Pressure drops rapidly (>2 PSI in 60 seconds)",
      channel: "Immediate push notification with urgency indicator",
      message: "Rapid pressure drop on front-right tyre. Possible puncture. Pull over safely and inspect.",
      badge: "Puncture / Blowout Risk"
    },
    {
      icon: BatteryLow,
      title: "Sensor Battery Low",
      trigger: "Sensor battery estimated to have less than 6 weeks life remaining",
      channel: "In-app banner, one-time notification",
      message: "Front-left sensor battery low. Replacement kit available on Amazon or via warranty.",
      badge: "Maintenance Notice"
    },
    {
      icon: WifiOff,
      title: "Sensor Connection Lost",
      trigger: "Sensor stops transmitting for more than 5 minutes while driving",
      channel: "In-app banner",
      message: "Front-right sensor not responding. Check that the sensor is still installed on the valve stem.",
      badge: "Hardware Offline"
    },
  ];

  const channels = [
    {
      icon: Smartphone,
      title: "iOS & Apple Watch",
      desc: "Rich notifications with audio tone, Apple Watch haptic taps & complications, and persistent in-app banners."
    },
    {
      icon: Play,
      title: "Android & Wear OS",
      desc: "High-priority heads-up notifications, Wear OS companion alerts, and background BLE sync."
    },
    {
      icon: Layers,
      title: "Home Screen Widgets",
      desc: "Live tyre status glanceable directly on iOS 14+ and Android 12+ home screen widgets without opening the app."
    },
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              FEATURE · ALERTS
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              The alert you actually needed.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Personal TPMS alerts arrive before a slow leak becomes a puncture. Before a hot tyre becomes a blowout. Before the OEM TPMS light comes on.
            </p>
          </div>
        </div>
      </section>

      {/* Alert Types Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              INTELLIGENT THRESHOLDS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              Alert types.
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg">
              Five distinct telemetry trigger scenarios engineered to prevent roadside breakdowns and tire structural damage.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {alertTypes.map((alert, idx) => {
              const IconComp = alert.icon;
              return (
                <div key={idx} className="p-8 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-5 hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h3 className="text-xl font-bold text-[#111827]">{alert.title}</h3>
                    </div>
                    <span className="text-[11px] font-bold text-[#4B5563] bg-black/[0.05] px-3 py-1 rounded-full uppercase tracking-wider">
                      {alert.badge}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-[#4B5563]">
                    <div>
                      <strong className="text-[#111827] font-semibold">Trigger:</strong> {alert.trigger}
                    </div>
                    <div>
                      <strong className="text-[#111827] font-semibold">Channels:</strong> {alert.channel}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-black/[0.06] text-xs sm:text-sm font-medium text-[#111827] italic shadow-xs">
                    "{alert.message}"
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alert Configuration Section */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              USER CUSTOMIZATION
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              You configure the thresholds.
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg leading-relaxed">
              Default alert thresholds work for most passenger vehicles. Advanced users can tune thresholds per vehicle if you drive a vehicle with non-standard tyre pressure targets (loaded SUVs, high-performance cars, off-road-modified vehicles).
            </p>
          </div>
        </div>
      </section>

      {/* Alert Channels Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              MULTI-CHANNEL DELIVERY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              Alert channels.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {channels.map((chan, idx) => {
              const IconComp = chan.icon;
              return (
                <div key={idx} className="p-8 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] space-y-3 hover:border-[#2563EB]/30 hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-[#111827] text-lg">{chan.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{chan.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-14 rounded-[32px] bg-[#111827] text-white shadow-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Get early puncture warnings on every drive.
              </h2>
              <p className="text-[#94A3B8] text-sm sm:text-base font-normal">
                Equip your personal car with 4 smart BLE sensors for ₹8,999.
              </p>
            </div>
            <Link
              href="/personal/buy"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white font-manrope font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-[0_4px_14px_rgba(37,99,235,0.3)] shrink-0 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" /> Buy Personal TPMS →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
