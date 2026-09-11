import type { Metadata } from "next";
import Link from "next/link";
import { 
  Gauge, 
  Thermometer, 
  Activity, 
  Battery, 
  Radio, 
  Moon, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  Car, 
  Wrench, 
  Compass, 
  ShieldCheck,
  ShoppingCart
} from "lucide-react";

export const metadata: Metadata = {
  title: "Real-Time Monitoring · Personal TPMS",
  description: "Personal TPMS updates tyre pressure and temperature every three seconds when driving. Continuous visibility, not just alerts.",
  alternates: {
    canonical: "https://treel.in/personal/features/monitoring",
  },
  openGraph: {
    title: "Real-Time Monitoring · Personal TPMS",
    description: "Personal TPMS updates tyre pressure and temperature every three seconds when driving. Continuous visibility, not just alerts.",
    url: "https://treel.in/personal/features/monitoring",
  },
};

export default function PersonalFeaturesMonitoringPage() {
  const appMetrics = [
    {
      icon: Gauge,
      title: "Current Pressure",
      desc: "Instant live pressure in PSI or kPa (user selectable) with ±0.5 PSI precision.",
    },
    {
      icon: Thermometer,
      title: "Current Temperature",
      desc: "Real-time internal tyre cavity temperature in °C across all four wheels.",
    },
    {
      icon: Activity,
      title: "Trend Indicator",
      desc: "Visual direction indicator showing whether pressure is rising, stable, or dropping.",
    },
    {
      icon: Battery,
      title: "Sensor Battery Status",
      desc: "Exact battery percentage for each wheel's CR1632 coin cell.",
    },
  ];

  const scenarios = [
    {
      title: "On a highway drive",
      desc: "Watch tyre temperatures climb as ambient temperature rises. Notice one tyre running 3–4°C hotter than the others. Investigate at the next stop.",
      badge: "High Speed Transit"
    },
    {
      title: "After a service visit",
      desc: "Verify all four tyres were inflated to the same target pressure. Not the pressure written on the invoice; the actual pressure in the tyres.",
      badge: "Maintenance Verification"
    },
    {
      title: "Before a long trip",
      desc: "Confirm all tyres are at the recommended cold pressure before you leave. See the reading before you drive, not the alert after.",
      badge: "Pre-Drive Check"
    },
    {
      title: "After a puncture repair",
      desc: "Monitor the repaired tyre continuously for the next few drives to confirm the seal is holding.",
      badge: "Post-Repair Assurance"
    },
  ];

  return (
    <div className="bg-white text-slate-900 font-manrope min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              FEATURE · MONITORING
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Continuous visibility. Not just alerts.
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              Personal TPMS updates every tyre reading every three seconds when you're driving. You see what your tyres are doing in real time — not just when something is wrong.
            </p>
          </div>
        </div>
      </section>

      {/* How Monitoring Works Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
                BLUETOOTH LOW ENERGY
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                How the monitoring works.
              </h2>
              <div className="space-y-4 text-slate-600 text-base leading-relaxed">
                <p>
                  Every sensor takes a pressure and temperature reading every three seconds while the car is moving. The reading is transmitted to your phone over Bluetooth Low Energy. The app updates the display continuously. No refresh, no polling, no delay.
                </p>
                <p>
                  When the car is parked, the sensors go into low-power mode to preserve battery life. They wake automatically the moment you start driving.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Radio className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">3-Second Refresh</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Continuous Bluetooth Low Energy telemetry broadcast while in motion.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Moon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Smart Sleep Mode</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sensors enter deep hibernation when stationary to maximize 2-year cell life.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">Instant Motion Wake</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Internal centrifugal accelerometers detect wheel rotation and wake in milliseconds.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">30-Day Trip Logs</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Historical pressure and thermal behavior saved locally for retrospective diagnostics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The App View Section */}
      <section className="py-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              UNIFIED DASHBOARD
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              The app view.
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              The Personal TPMS app shows all four tyres on a single screen. Each tyre displays exact pressure, temperature, trend direction, and battery health. Trip history is retained for the last 30 days. You can see how tyre pressures behaved on any drive in the last month.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {appMetrics.map((metric, idx) => {
              const IconComp = metric.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{metric.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{metric.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample Scenarios Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              REAL-WORLD UTILITY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              What continuous monitoring lets you see.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {scenarios.map((sc, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold text-xs">
                  {sc.badge}
                </div>
                <h3 className="text-xl font-bold text-slate-900">{sc.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{sc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Band */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Experience real-time tyre intelligence.
              </h2>
              <p className="text-slate-300 text-sm sm:text-base">
                Get Personal TPMS for ₹8,999 with 1-year replacement warranty and free pan-India shipping.
              </p>
            </div>
            <Link
              href="/personal/buy"
              className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-md shrink-0 flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" /> Buy Personal TPMS →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
