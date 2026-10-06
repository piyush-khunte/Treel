"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, PhoneCall, CheckCircle2, ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

const TIME_SLOTS = [
  "Any time during business hours (9 AM - 6 PM)",
  "Morning (9-11 AM)",
  "Late morning (11 AM-1 PM)",
  "Afternoon (2-4 PM)",
  "Late afternoon (4-6 PM)",
];

const LANGUAGES = [
  "Hindi",
  "English",
  "Marathi",
  "Gujarati",
  "Tamil",
  "Kannada",
  "Telugu",
  "Malayalam",
  "Bengali",
  "Oriya",
];

const TOPICS = [
  "Product information",
  "Pricing and payment options",
  "EMI application help",
  "Installation help",
  "Warranty claim",
  "Truck fleet inquiry",
  "General question",
];

export default function SurakshaCallbackPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[0]);
  const [preferredLanguage, setPreferredLanguage] = useState(LANGUAGES[0]);
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState("");
  const [contactPreference, setContactPreference] = useState("Phone call");
  const [consent, setConsent] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!consent) {
      setErrorMessage("Please accept the callback permission terms to proceed.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/suraksha/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          preferred_time: preferredTime,
          preferred_language: preferredLanguage,
          topic: topic,
          message: message.trim(),
          contact_preference: contactPreference,
          consent: true,
          form_id: "suraksha_callback",
          lead_source: "Suraksha Callback",
          campaign_type: "suraksha_callback",
          landing_page: typeof window !== "undefined" ? window.location.href : "https://treel.in/suraksha/callback",
          page_path: "/suraksha/callback",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit callback request. Please try again.");
      }

      const randomSuffix = Math.floor(100000 + Math.random() * 900000).toString();
      const refSuffix = data.leadId ? data.leadId.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase() : randomSuffix;
      const finalReference = `SRK-CB-${refSuffix || randomSuffix}`;

      const submissionPayload = {
        referenceNumber: finalReference,
        name: name.trim(),
        phone: phone.trim(),
        city: city.trim(),
        preferredTime: preferredTime,
        preferredLanguage: preferredLanguage,
        topic: topic,
        contactPreference: contactPreference,
        message: message.trim(),
        submittedAt: new Date().toISOString(),
      };

      if (typeof window !== "undefined") {
        sessionStorage.setItem("suraksha_callback_confirmed", JSON.stringify(submissionPayload));
      }

      router.push("/suraksha/callback/success");
    } catch (err: any) {
      console.error("Callback submission error:", err);
      setErrorMessage(err.message || "Something went wrong. Please check your number and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Request Callback" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-3.5 h-3.5" />
              CALLBACK REQUEST
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              HUM <span className="italic text-[#0891B2]">CALL KARENGE.</span>
            </h1>
            <SurakshaRotator
              page="5.19"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-2"
            >
              अपना समय और अपनी भाषा चुनिए।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Aap ka preferred time aur language mention kariye. Humari team aap ko call karegi. WhatsApp preference ho toh woh bhi mention kar sakte hai.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 sm:py-20 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-xl mx-auto bg-[#FFFBEB] border-2 border-[#451A03]/15 p-6 sm:p-10 rounded-lg shadow-sm space-y-6">
            <div>
              <h2 className="font-anton text-2xl sm:text-3xl uppercase tracking-normal text-[#451A03]">
                Schedule Your Callback
              </h2>
              <p className="text-[#78350F] text-sm mt-1 font-medium">
                Enter your details and our team will get back to you during your preferred time.
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-100 border-2 border-red-400 text-red-800 rounded text-xs font-bold font-rubik">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                    City / Location *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Indore, Surat, Delhi"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                    Preferred Callback Time *
                  </label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-sm cursor-pointer"
                  >
                    {TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                    Preferred Language *
                  </label>
                  <select
                    value={preferredLanguage}
                    onChange={(e) => setPreferredLanguage(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-sm cursor-pointer"
                  >
                    {LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                  What is this about?
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-sm cursor-pointer"
                >
                  {TOPICS.map((top) => (
                    <option key={top} value={top}>
                      {top}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                  Additional Message <span className="text-xs font-normal text-[#78350F]/70">(Optional, max 500 chars)</span>
                </label>
                <textarea
                  rows={3}
                  maxLength={500}
                  placeholder="Tell us about your truck type, tyres, or query..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-sm resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-rubik uppercase tracking-wider font-bold text-[#78350F] mb-2">
                  Contact Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {["Phone call", "WhatsApp chat", "Either"].map((pref) => (
                    <label
                      key={pref}
                      className={`flex items-center justify-center p-3 rounded-[4px] border-2 cursor-pointer text-xs font-bold font-rubik transition-all ${
                        contactPreference === pref
                          ? "border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626]"
                          : "border-[#451A03]/20 bg-white text-[#451A03] hover:border-[#451A03]/40"
                      }`}
                    >
                      <input
                        type="radio"
                        name="contact_preference"
                        value={pref}
                        checked={contactPreference === pref}
                        onChange={() => setContactPreference(pref)}
                        className="sr-only"
                      />
                      <span>{pref}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-2 border-[#451A03]/30 text-[#DC2626] focus:ring-[#DC2626]"
                  />
                  <span className="text-xs text-[#78350F] leading-relaxed font-medium">
                    Mai callback ke liye permission deta hoon.{" "}
                    <Link href="/privacy" className="underline hover:text-[#DC2626]">
                      Privacy policy
                    </Link>{" "}
                    padhi.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-[4px] font-rubik font-bold uppercase tracking-wider text-xs bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <PhoneCall className="w-4 h-4" /> {isSubmitting ? "Sending..." : "Request Callback →"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}