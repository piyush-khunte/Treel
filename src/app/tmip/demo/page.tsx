"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Calendar } from "lucide-react";

export default function TMIPDemoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    role: "Fleet Operations Director",
    fleetSize: "25-100",
    vehicleType: "Heavy Commercial",
    tms: "",
    region: "India (West)",
    timeSlot: "Morning IST",
    context: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      router.push("/tmip/demo/scheduled");
    }, 600);
  };

  return (
    <div className="space-y-0 bg-[#050A17] text-[#F1F5F9] font-ibm-plex min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-blue-900/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#3B82F6] bg-[#3B82F6]/10 border-[#3B82F6]/20 font-jetbrains-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">
              BOOK A DEMO
            </div>
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              See TMIP on your fleet.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-ibm-plex max-w-3xl">
              A 30-minute demo with a Treel solutions engineer. Followed by an optional 14-day pilot on a subset of your fleet. If the payback math does not work for you, we do not sell into it.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 border-b border-blue-900/30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 bg-[#0B1220]/90 border border-blue-900/40 p-8 sm:p-10 rounded-2xl shadow-xl">
              <h2 className="font-space-grotesk text-2xl sm:text-3xl font-bold text-white mb-6">
                Request a 30-Minute TMIP Demo
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050A17] border border-blue-900/40 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Work email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050A17] border border-blue-900/40 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Company name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050A17] border border-blue-900/40 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Your role *
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050A17] border border-blue-900/40 rounded-lg text-white focus:outline-none focus:border-[#3B82F6] text-sm"
                    >
                      <option>Fleet Operations Director</option>
                      <option>CFO / Finance</option>
                      <option>CTO / IT</option>
                      <option>Procurement</option>
                      <option>Founder / CEO</option>
                      <option>Head of Operations</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Fleet size *
                    </label>
                    <select
                      value={formData.fleetSize}
                      onChange={(e) => setFormData({ ...formData, fleetSize: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050A17] border border-blue-900/40 rounded-lg text-white focus:outline-none focus:border-[#3B82F6] text-sm"
                    >
                      <option>Under 25 vehicles</option>
                      <option>25-100 vehicles</option>
                      <option>100-500 vehicles</option>
                      <option>500-2000 vehicles</option>
                      <option>2000+ vehicles</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                      Vehicle type *
                    </label>
                    <select
                      value={formData.vehicleType}
                      onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#050A17] border border-blue-900/40 rounded-lg text-white focus:outline-none focus:border-[#3B82F6] text-sm"
                    >
                      <option>Heavy Commercial</option>
                      <option>Medium Commercial</option>
                      <option>Light Commercial</option>
                      <option>Bus / Passenger Transport</option>
                      <option>Mining & Construction</option>
                      <option>Mixed Fleet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#94A3B8] mb-2">
                    Additional context or specific goals (optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="What are you specifically trying to solve? Any TMIP capabilities you want us to focus on?"
                    value={formData.context}
                    onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                    className="w-full px-4 py-3 bg-[#050A17] border border-blue-900/40 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-[#3B82F6] text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg font-space-grotesk font-bold text-sm bg-[#3B82F6] text-[#050A17] hover:bg-[#2563EB] hover:text-white transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "Submitting..." : "Book a 30-Minute Demo"} <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="lg:col-span-5 space-y-8">
              <div className="bg-[#0B1220]/60 border border-blue-900/30 p-8 rounded-2xl space-y-6">
                <h3 className="font-space-grotesk text-xl font-bold text-white">What happens next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-[#3B82F6] mt-0.5">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">1. Fast response</h4>
                      <p className="text-xs text-[#94A3B8] mt-1">A Treel solutions engineer reviews your fleet details and confirms your calendar slot within 4 business hours.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-[#3B82F6] mt-0.5">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">2. 30-minute tailored walkthrough</h4>
                      <p className="text-xs text-[#94A3B8] mt-1">We show live TMIP telemetry, the Vehicle Digital Twin, and simulated cost-per-kilometre curves for your specific vehicle types.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-blue-500/10 text-[#3B82F6] mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-white">3. Optional 14-day field pilot</h4>
                      <p className="text-xs text-[#94A3B8] mt-1">Experience live data collection on 5-10 of your fleet vehicles before any contractual commitment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
