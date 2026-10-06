"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  PhoneCall, 
  MessageCircle, 
  Send, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

export default function SurakshaContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    city: "",
    truckConfig: "10-wheeler",
    preferredLanguage: "Hindi",
    topic: "General inquiry",
    message: "",
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg("");

    // Validate 10-digit phone
    const cleanedPhone = formData.mobileNumber.replace(/\D/g, "");
    if (cleanedPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!formData.consent) {
      setErrorMsg("Please accept the contact permission to proceed.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/suraksha/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          mobileNumber: formData.mobileNumber.trim(),
          city: formData.city.trim(),
          truckConfig: formData.truckConfig,
          preferredLanguage: formData.preferredLanguage,
          topic: formData.topic,
          message: formData.message.trim(),
          consent: formData.consent,
          form_id: "suraksha_contact",
          lead_source: "Suraksha Contact",
          campaign_type: "suraksha_contact",
          landing_page: typeof window !== "undefined" ? window.location.href : "https://treel.in/suraksha/contact",
          page_path: "/suraksha/contact",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to send message. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Suraksha contact submission error:", err);
      setErrorMsg(err.message || "Failed to send message. Please try again or call 1800 833 0233.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      mobileNumber: "",
      city: "",
      truckConfig: "10-wheeler",
      preferredLanguage: "Hindi",
      topic: "General inquiry",
      message: "",
      consent: false
    });
    setIsSubmitted(false);
    setErrorMsg("");
  };

  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "Contact" },
              ]}
            />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              <PhoneCall className="w-3.5 h-3.5" />
              CONTACT
            </div>

            <h1 className="font-anton uppercase tracking-normal text-5xl sm:text-6xl lg:text-7xl text-[#451A03] leading-[0.95]">
              TALK TO US.
            </h1>

            <SurakshaRotator
              page="5.17"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide"
            >
              कोई भी सवाल हो, हमसे पूछिए।
            </SurakshaRotator>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Questions about the product, pricing, installation or warranty? Reach the Suraksha team through any of the channels below.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PRIMARY CONTACT TILES (PROMINENT) */}
      <section className="py-16 sm:py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Tile 1 · Toll-Free */}
            <div className="bg-[#FFFBEB] border-3 border-[#DC2626] rounded-2xl p-8 sm:p-10 shadow-md flex flex-col justify-between space-y-6 hover:shadow-lg transition-all group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#DC2626]/10 border-2 border-[#DC2626] flex items-center justify-center text-[#DC2626] group-hover:scale-105 transition-transform">
                  <PhoneCall className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <div className="font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626]">
                    TOLL-FREE
                  </div>
                  <div className="font-anton text-4xl sm:text-5xl text-[#451A03] tracking-tight font-normal">
                    1800 833 0233
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#78350F] font-semibold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#DC2626]" /> Monday to Friday · 8 AM to 8 PM IST
                </p>
              </div>

              <div className="pt-4 border-t border-[#451A03]/10">
                <a
                  href="tel:18008330233"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-md active:scale-[0.98]"
                >
                  <PhoneCall className="w-4 h-4" /> Call 1800 833 0233
                </a>
              </div>
            </div>

            {/* Tile 2 · WhatsApp */}
            <div className="bg-[#FFFBEB] border-3 border-[#0891B2] rounded-2xl p-8 sm:p-10 shadow-md flex flex-col justify-between space-y-6 hover:shadow-lg transition-all group">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-xl bg-[#25D366]/10 border-2 border-[#25D366] flex items-center justify-center text-[#25D366] group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-7 h-7 text-[#25D366]" />
                </div>

                <div className="space-y-1">
                  <div className="font-rubik text-xs font-bold uppercase tracking-widest text-[#0891B2]">
                    WHATSAPP
                  </div>
                  <div className="font-anton text-4xl sm:text-5xl text-[#451A03] tracking-tight font-normal">
                    +91 91120 00174
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#78350F] font-semibold flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0891B2]" /> 24/7 automated + business hours human
                </p>
              </div>

              <div className="pt-4 border-t border-[#451A03]/10">
                <a
                  href="https://wa.me/919112000174?text=Suraksha%20info%20chahiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider bg-[#0891B2] text-white hover:bg-[#0E7490] transition-all shadow-md active:scale-[0.98]"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" /> Open WhatsApp Chat
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTACT FORM SECTION */}
      <section className="py-16 sm:py-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl mx-auto bg-[#FEF3C7] border-3 border-[#451A03]/20 rounded-2xl p-8 sm:p-12 shadow-lg space-y-8">
            {isSubmitted ? (
              /* Success Message */
              <div className="text-center space-y-6 py-6 animate-in fade-in duration-300">
                <div className="w-16 h-16 rounded-full bg-[#15803D]/10 border-3 border-[#15803D] text-[#15803D] flex items-center justify-center mx-auto shadow-md">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>

                <div className="space-y-2">
                  <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-normal text-[#451A03]">
                    THANK YOU! MESSAGE RECEIVED.
                  </h2>
                  <p className="text-[#78350F] text-base leading-relaxed font-medium max-w-lg mx-auto">
                    Your message has reached our support team. We will call or message you on WhatsApp within 4 business hours. For urgent highway assistance, call toll-free at 1800 833 0233.
                  </p>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider bg-[#451A03] text-white hover:bg-[#5C2304] transition-all cursor-pointer"
                  >
                    Send Another Message
                  </button>
                  <Link
                    href="/suraksha/centres"
                    className="w-full sm:w-auto px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all"
                  >
                    Find Nearest Centre
                  </Link>
                </div>
              </div>
            ) : (
              /* Form Inputs */
              <>
                <div className="space-y-2 border-b border-[#451A03]/10 pb-4">
                  <h2 className="font-anton text-3xl sm:text-4xl uppercase tracking-normal text-[#451A03]">
                    SEND A MESSAGE — WE WILL CALL YOU
                  </h2>
                  <p className="text-[#78350F] text-sm font-medium">
                    Fill in your contact details and inquiry below, and our team will get in touch in your preferred language.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-800 rounded text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {errorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-xs"
                    />
                  </div>

                  {/* Mobile Number & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
                        Mobile Number * (10-digit)
                      </label>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        placeholder="98XXXXXXXX"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
                        City / Location *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="E.g. Pune, Jaipur, Indore"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Truck Configuration & Preferred Language */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
                        Truck Configuration
                      </label>
                      <select
                        value={formData.truckConfig}
                        onChange={(e) => setFormData({ ...formData, truckConfig: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-xs"
                      >
                        <option value="6-wheeler">6-wheeler</option>
                        <option value="10-wheeler">10-wheeler</option>
                        <option value="12-wheeler">12-wheeler</option>
                        <option value="14-wheeler">14-wheeler</option>
                        <option value="16-wheeler">16-wheeler</option>
                        <option value="18-wheeler">18-wheeler</option>
                        <option value="Other commercial">Other commercial</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
                        Preferred Language
                      </label>
                      <select
                        value={formData.preferredLanguage}
                        onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-xs"
                      >
                        <option value="Hindi">Hindi</option>
                        <option value="English">English</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Gujarati">Gujarati</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Kannada">Kannada</option>
                        <option value="Telugu">Telugu</option>
                        <option value="Malayalam">Malayalam</option>
                        <option value="Bengali">Bengali</option>
                        <option value="Oriya">Oriya</option>
                      </select>
                    </div>
                  </div>

                  {/* What can we help with? */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
                      What can we help with?
                    </label>
                    <select
                      value={formData.topic}
                      onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-xs"
                    >
                      <option value="General inquiry">General inquiry</option>
                      <option value="Product information">Product information</option>
                      <option value="Pricing and payment">Pricing and payment</option>
                      <option value="EMI application">EMI application</option>
                      <option value="Installation help">Installation help</option>
                      <option value="Warranty claim">Warranty claim</option>
                      <option value="Centre location">Centre location</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#78350F]">
                      Message * (Max 1000 characters)
                    </label>
                    <textarea
                      required
                      rows={4}
                      maxLength={1000}
                      placeholder="Your question, message, or vehicle details..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-2 border-[#451A03]/20 rounded-[4px] text-[#451A03] placeholder-[#78350F]/50 focus:outline-none focus:border-[#DC2626] text-sm font-medium shadow-xs"
                    />
                  </div>

                  {/* Consent Checkbox */}
                  <div className="pt-2 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.consent}
                      onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                      className="mt-1 w-4 h-4 accent-[#DC2626] cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-xs text-[#78350F] leading-snug cursor-pointer">
                      I agree to be contacted regarding my inquiry via phone, SMS, or WhatsApp. *
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-[4px] font-rubik font-bold uppercase tracking-wider text-sm bg-[#DC2626] text-white hover:bg-[#B91C1C] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                  >
                    <Send className="w-4 h-4" /> {isSubmitting ? "Sending Message..." : "Send Message  →"}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4. CENTRE FINDER & WHATSAPP SHORTCUTS */}
      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Centre Finder Card */}
            <div className="p-6 sm:p-8 bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#EA580C]/10 border border-[#EA580C]/30 flex items-center justify-center text-[#EA580C]">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-anton text-2xl uppercase tracking-normal text-[#451A03]">
                  NEAREST CENTRE FINDER
                </h3>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  Locate an authorized fitment hub or Truck Wheels centre near you:
                </p>
              </div>

              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-1.5 font-rubik font-bold text-xs uppercase tracking-wider text-[#DC2626] hover:underline"
              >
                Nearest Centre <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* WhatsApp Shortcut Card */}
            <div className="p-6 sm:p-8 bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-xl flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-lg bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center text-[#25D366]">
                  <MessageCircle className="w-5 h-5 text-[#25D366]" />
                </div>
                <h3 className="font-anton text-2xl uppercase tracking-normal text-[#451A03]">
                  WHATSAPP SHORTCUT
                </h3>
                <p className="text-sm text-[#78350F] leading-relaxed">
                  For our fastest response, send us a direct message on WhatsApp.
                </p>
              </div>

              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-1.5 font-rubik font-bold text-xs uppercase tracking-wider text-[#0891B2] hover:underline"
              >
                Chat on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BAND */}
      <section className="py-20 bg-gradient-to-r from-[#DC2626] to-[#EA580C] text-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="font-anton text-5xl sm:text-6xl font-normal tracking-tight text-[#FEF3C7] uppercase">
              THE SURAKSHA TEAM IS HERE FOR YOU.
            </h2>

            <p className="text-[#FEF3C7]/95 text-lg sm:text-xl font-medium max-w-2xl mx-auto">
              Whether you need hardware warranty support, tyre telemetry guidance, or highway assistance, our team is always ready to help.
            </p>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                href="/suraksha/centres"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#FEF3C7] text-[#451A03] hover:bg-white active:scale-[0.98]"
              >
                Nearest Centre <ArrowRight className="w-5 h-5 text-[#DC2626]" />
              </Link>
              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all border-2 border-[#FEF3C7] text-[#FEF3C7] hover:bg-white/10 active:scale-[0.98]"
              >
                Chat on WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}