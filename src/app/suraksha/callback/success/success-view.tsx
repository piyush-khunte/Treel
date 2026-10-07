"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Copy,
  Check,
  PhoneCall,
  MessageSquare,
  HelpCircle,
  MapPin,
  ShieldCheck,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

interface CallbackDetails {
  referenceNumber: string;
  name: string;
  phone: string;
  city?: string;
  preferredTime: string;
  preferredLanguage: string;
  topic: string;
  contactPreference: string;
}

const DEFAULT_DETAILS: CallbackDetails = {
  referenceNumber: "SRK-CB-849201",
  name: "Valued Customer",
  phone: "Provided in form",
  city: "",
  preferredTime: "Any time during business hours (9 AM - 6 PM)",
  preferredLanguage: "Hindi",
  topic: "Product information",
  contactPreference: "Phone call",
};

export function SurakshaCallbackSuccessView() {
  const [details, setDetails] = useState<CallbackDetails>(DEFAULT_DETAILS);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem("suraksha_callback_confirmed");
      if (stored) {
        const parsed = JSON.parse(stored);
        setDetails({
          referenceNumber: parsed.referenceNumber || DEFAULT_DETAILS.referenceNumber,
          name: parsed.name || DEFAULT_DETAILS.name,
          phone: parsed.phone || DEFAULT_DETAILS.phone,
          city: parsed.city || "",
          preferredTime: parsed.preferredTime || DEFAULT_DETAILS.preferredTime,
          preferredLanguage: parsed.preferredLanguage || DEFAULT_DETAILS.preferredLanguage,
          topic: parsed.topic || DEFAULT_DETAILS.topic,
          contactPreference: parsed.contactPreference || DEFAULT_DETAILS.contactPreference,
        });
      }
    } catch {
      // Fallback remains active
    }
  }, []);

  const handleCopy = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(details.referenceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
                { label: "Request Callback", href: "/suraksha/callback" },
                { label: "Confirmation" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-[#10B981] bg-[#ECFDF5] text-[#047857] font-rubik text-xs font-bold uppercase tracking-wider shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              CALLBACK CONFIRMED
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              DHANYAWAAD!<br />
              <span className="italic text-[#0891B2]">WE WILL CALL YOU.</span>
            </h1>
            <p className="font-anton uppercase text-xl sm:text-2xl text-[#78350F] tracking-wide">
              Thanks. We'll call you.
            </p>
            <SurakshaRotator
              page="5.20"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-1"
            >
              आपके चुने हुए समय पर हम कॉल करेंगे।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl font-medium">
              Aap ka callback request received ho gaya hai. Confirmation neeche hai.
            </p>
          </div>
        </div>
      </section>

      {/* Section · Request details */}
      <section className="py-14 sm:py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-rubik text-lg sm:text-xl font-bold text-[#451A03] uppercase tracking-wide">
                Request Details:
              </h2>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#451A03]/20 bg-[#FFFBEB] hover:bg-white text-xs font-bold font-rubik text-[#78350F] transition-all cursor-pointer shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    Copy Reference
                  </>
                )}
              </button>
            </div>

            <div className="bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
              <ul className="space-y-4">
                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Reference number:</span>
                    <code className="font-mono bg-[#FEF3C7] px-2.5 py-1 rounded border border-[#451A03]/20 text-[#451A03] font-bold text-sm tracking-wider w-fit">
                      {details.referenceNumber}
                    </code>
                  </div>
                </li>

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Your name:</span>
                    <span className="font-bold text-[#451A03]">{details.name}</span>
                  </div>
                </li>

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Mobile:</span>
                    <span className="font-bold text-[#451A03]">{details.phone}</span>
                  </div>
                </li>

                {details.city && (
                  <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                    <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                      <span className="font-medium text-[#78350F]">City / Location:</span>
                      <span className="font-bold text-[#451A03]">{details.city}</span>
                    </div>
                  </li>
                )}

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Preferred time:</span>
                    <span className="font-bold text-[#451A03]">{details.preferredTime}</span>
                  </div>
                </li>

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Preferred language:</span>
                    <span className="font-bold text-[#451A03]">{details.preferredLanguage}</span>
                  </div>
                </li>

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Topic:</span>
                    <span className="font-bold text-[#451A03]">{details.topic}</span>
                  </div>
                </li>

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Contact preference:</span>
                    <span className="font-bold text-[#451A03]">{details.contactPreference}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section · What happens next */}
      <section className="py-14 sm:py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-3xl sm:text-4xl text-[#451A03]">
              AAGE KYA HOGA?
            </h2>
            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-anton text-base shrink-0">
                  1
                </span>
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik pt-0.5">
                  <strong>Confirmation SMS aayega</strong> — abhi thodi der mein aap ke number pe
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-anton text-base shrink-0">
                  2
                </span>
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik pt-0.5">
                  <strong>Callback in preferred time slot</strong> — humari team preferred time pe call karegi
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-anton text-base shrink-0">
                  3
                </span>
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik pt-0.5">
                  <strong>Language preference honor</strong> — aap ki preferred language mein hi baat hogi
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-anton text-base shrink-0">
                  4
                </span>
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik pt-0.5">
                  <strong>Full assistance</strong> — jo topic select kiya, us par complete information milegi
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Alternative — WhatsApp is faster */}
      <section className="py-14 sm:py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-medium">
              Agar aap intezaar nahi karna chahte, WhatsApp par direct baat kar sakte hai. Immediate response milta hai.
            </p>
            <div>
              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#25D366] text-white hover:bg-[#1EBE5D] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                WhatsApp Kariye Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related content */}
      <section className="py-16 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h3 className="font-anton uppercase tracking-normal text-xl sm:text-2xl text-[#451A03]">
              Related Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <Link
                href="/suraksha/faqs"
                className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <HelpCircle className="w-5 h-5 text-[#DC2626]" />
                  <h4 className="font-anton uppercase tracking-normal text-lg sm:text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">
                    FAQs (self-service)
                  </h4>
                </div>
                <p className="text-[#78350F] text-xs leading-relaxed font-rubik font-medium mb-4">
                  Find quick answers to questions about Suraksha TPMS, warranty, and compatibility.
                </p>
                <div className="font-bold text-xs text-[#DC2626] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/suraksha/centres"
                className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <MapPin className="w-5 h-5 text-[#DC2626]" />
                  <h4 className="font-anton uppercase tracking-normal text-lg sm:text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">
                    Nearest Centre
                  </h4>
                </div>
                <p className="text-[#78350F] text-xs leading-relaxed font-rubik font-medium mb-4">
                  Find authorized fitment centres and certified installers near your highway route.
                </p>
                <div className="font-bold text-xs text-[#DC2626] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/suraksha/product"
                className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#DC2626]" />
                  <h4 className="font-anton uppercase tracking-normal text-lg sm:text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">
                    Product info
                  </h4>
                </div>
                <p className="text-[#78350F] text-xs leading-relaxed font-rubik font-medium mb-4">
                  Explore full features, solar display, sensor battery life, and technical specs.
                </p>
                <div className="font-bold text-xs text-[#DC2626] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
