"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  PhoneCall, 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle2, 
  Wrench,
  Radio,
  RefreshCw
} from "lucide-react";

export default function PersonalSupportTroubleshootingPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const problems = [
    {
      q: "A sensor won't pair with the app",
      cause: "The sensor may not be waking from low-power mode, or Bluetooth connection is intermittent.",
      steps: [
        "Confirm the sensor is properly installed on the valve stem (finger-tight).",
        "Drive the car forward and backward for 30 seconds — motion wakes the sensor.",
        "In the app, tap \"Retry pairing\" for the specific position.",
        "Ensure your phone's Bluetooth is on and Bluetooth permission is granted to the app.",
        "If still failing, remove the sensor, inspect for damage, and reinstall."
      ]
    },
    {
      q: "The app shows one tyre as \"disconnected\"",
      cause: "Sensor battery is low, the sensor has been physically damaged, or Bluetooth range is exceeded.",
      steps: [
        "Check the app for a low-battery warning. If present, replace the CR1632 battery.",
        "Confirm the sensor is still physically on the valve stem (they can be tampered with).",
        "If the sensor is missing or damaged, contact support for warranty replacement."
      ]
    },
    {
      q: "The app shows pressure readings that seem incorrect",
      cause: "Sensor calibration issue, incorrect target pressure setting, or measurement in wrong units.",
      steps: [
        "Confirm the units display (PSI vs. kPa) matches what you expect.",
        "Cross-check with a manual tyre pressure gauge. Personal TPMS sensors are accurate to ±0.5 PSI.",
        "Confirm the target pressure setting in the app matches your vehicle's specification.",
        "If readings are wildly incorrect (>2 PSI variance from manual gauge), contact support."
      ]
    },
    {
      q: "I'm not receiving alerts",
      cause: "Notification permissions are off, alert thresholds are set too permissively, or the app has been force-stopped.",
      steps: [
        "Check your phone's Notification settings for the Personal TPMS app. Ensure notifications are allowed.",
        "In the app, go to Settings > Alerts. Check that alert thresholds are enabled.",
        "Ensure the app is allowed to run in the background."
      ]
    },
    {
      q: "A sensor came loose while driving",
      cause: "Anti-theft ring may not have been fully seated, or the valve stem is worn.",
      steps: [
        "Reinstall the sensor with the anti-theft ring fully seated.",
        "Inspect the valve stem for wear. Replace if damaged.",
        "If the sensor was lost, contact support for warranty replacement."
      ]
    },
    {
      q: "The app crashes or won't open",
      cause: "OS compatibility issue, corrupted app data, or outdated app version.",
      steps: [
        "Update the app to the latest version from the App Store / Google Play.",
        "Restart your phone.",
        "If issue persists, uninstall and reinstall the app. Your paired sensors and settings will be restored from your Treel account."
      ]
    }
  ];

  return (
    <div className="bg-white text-slate-900 font-manrope min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-slate-200 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-blue-600 bg-blue-50 border-blue-200 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              TROUBLESHOOTING
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
              Something not working? Let's fix it.
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl leading-relaxed font-normal max-w-3xl">
              Common Personal TPMS issues and their solutions. If your issue isn't listed here or the solution doesn't work, contact support.
            </p>
          </div>
        </div>
      </section>

      {/* Accordion Problems Section */}
      <section className="py-20 border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="space-y-2 mb-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Common Problems & Fixes
              </h2>
              <p className="text-slate-600 text-sm">Click on any issue below to see diagnostic steps.</p>
            </div>

            <div className="space-y-4">
              {problems.map((prob, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span>{prob.q}</span>
                    {openIndex === idx ? (
                      <ChevronUp className="w-5 h-5 text-blue-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {openIndex === idx && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-4 text-sm">
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-900 font-medium">
                        <strong>Probable Cause:</strong> {prob.cause}
                      </div>

                      <div className="space-y-2">
                        <strong className="text-xs uppercase tracking-wider text-slate-700 font-bold block">
                          Step-by-step Solution:
                        </strong>
                        <ol className="space-y-2 text-slate-700 list-decimal list-inside text-xs sm:text-sm">
                          {prob.steps.map((step, sIdx) => (
                            <li key={sIdx} className="leading-relaxed">
                              <span>{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Still Stuck Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl text-center space-y-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <HelpCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Still stuck?
              </h2>
              <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                If your issue isn't listed above or the solutions don't work, our support team is ready to help.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/personal/support/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-md cursor-pointer"
              >
                Contact support →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
