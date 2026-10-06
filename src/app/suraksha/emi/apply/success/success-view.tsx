"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
  FileText,
  Clock,
  Building2,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

interface EmiApplicationDetails {
  referenceNumber: string;
  ownerName?: string;
  phone?: string;
  vehicleReg?: string;
  tyreCount: string;
  state?: string;
  tenure: string;
  downPayment: string;
  financingPartner: string;
  applicationDate: string;
}

const DEFAULT_DETAILS: EmiApplicationDetails = {
  referenceNumber: "SRK-EMI-849201",
  ownerName: "",
  phone: "",
  vehicleReg: "",
  tyreCount: "10 Tyres (Most Popular)",
  state: "Maharashtra",
  tenure: "12 Months",
  downPayment: "Zero Down Payment Plan",
  financingPartner: "Bajaj Finance",
  applicationDate: new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
};

export function SurakshaEmiSuccessView() {
  const searchParams = useSearchParams();
  const [details, setDetails] = useState<EmiApplicationDetails>(DEFAULT_DETAILS);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      // 1. Check sessionStorage for recently submitted application
      const stored = sessionStorage.getItem("suraksha_emi_confirmed");
      if (stored) {
        const parsed = JSON.parse(stored);
        setDetails({
          referenceNumber: parsed.referenceNumber || searchParams.get("ref") || DEFAULT_DETAILS.referenceNumber,
          ownerName: parsed.ownerName || "",
          phone: parsed.phone || "",
          vehicleReg: parsed.vehicleReg || "",
          tyreCount: parsed.tyreCount || searchParams.get("kit") || DEFAULT_DETAILS.tyreCount,
          state: parsed.state || "",
          tenure: parsed.tenure || searchParams.get("tenure") || DEFAULT_DETAILS.tenure,
          downPayment: parsed.downPayment || DEFAULT_DETAILS.downPayment,
          financingPartner: parsed.financingPartner || DEFAULT_DETAILS.financingPartner,
          applicationDate: parsed.applicationDate || DEFAULT_DETAILS.applicationDate,
        });
        return;
      }

      // 2. Fallback to URL search parameters if available
      const refParam = searchParams.get("ref");
      const kitParam = searchParams.get("kit");
      const tenureParam = searchParams.get("tenure");

      if (refParam || kitParam || tenureParam) {
        setDetails((prev) => ({
          ...prev,
          referenceNumber: refParam || prev.referenceNumber,
          tyreCount: kitParam || prev.tyreCount,
          tenure: tenureParam ? (tenureParam.includes("Month") ? tenureParam : `${tenureParam} Months`) : prev.tenure,
        }));
      }
    } catch {
      // Fallback defaults remain safely active
    }
  }, [searchParams]);

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
                { label: "EMI Plans", href: "/suraksha/emi" },
                { label: "Apply", href: "/suraksha/emi/apply" },
                { label: "Confirmation" },
              ]}
            />
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2 border-[#10B981] bg-[#ECFDF5] text-[#047857] font-rubik text-xs font-bold uppercase tracking-wider shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
              APPLICATION RECEIVED
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              THANK YOU!<br />
              <span className="italic text-[#0891B2]">APPLICATION RECEIVED.</span>
            </h1>
            <SurakshaRotator
              page="5.7"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide pt-1"
            >
              आपकी EMI एप्लिकेशन सफलतापूर्वक प्राप्त हो चुकी है।
            </SurakshaRotator>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl font-medium">
              Save your reference number for any follow-up. Your application details are below, along with the verification and delivery steps handled through Bajaj Finance.
            </p>
          </div>
        </div>
      </section>

      {/* Application Details Section */}
      <section className="py-14 sm:py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-rubik text-lg sm:text-xl font-bold text-[#451A03] uppercase tracking-wide flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#DC2626]" />
                Application Details:
              </h2>
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded border border-[#451A03]/20 bg-[#FFFBEB] hover:bg-white text-xs font-bold font-rubik text-[#78350F] transition-all cursor-pointer shadow-sm active:scale-95"
                aria-label="Copy reference number"
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

                {details.ownerName && (
                  <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                    <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                      <span className="font-medium text-[#78350F]">Applicant Name:</span>
                      <span className="font-bold text-[#451A03]">{details.ownerName}</span>
                    </div>
                  </li>
                )}

                {details.vehicleReg && (
                  <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                    <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                      <span className="font-medium text-[#78350F]">Vehicle Reg Number:</span>
                      <span className="font-bold text-[#451A03]">{details.vehicleReg}</span>
                    </div>
                  </li>
                )}

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Application Date:</span>
                    <span className="font-bold text-[#451A03]">{details.applicationDate}</span>
                  </div>
                </li>

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Kit Selected:</span>
                    <span className="font-bold text-[#451A03]">{details.tyreCount}</span>
                  </div>
                </li>

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Down Payment:</span>
                    <span className="font-bold text-[#047857]">{details.downPayment}</span>
                  </div>
                </li>

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3 border-b border-[#451A03]/10 pb-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Tenure Selected:</span>
                    <span className="font-bold text-[#451A03]">{details.tenure}</span>
                  </div>
                </li>

                <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                  <span className="text-[#DC2626] mt-1 font-bold text-lg">•</span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full gap-1">
                    <span className="font-medium text-[#78350F]">Financing Partner:</span>
                    <span className="font-bold text-[#451A03] flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#EA580C]" />
                      {details.financingPartner}
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Happens Next Section */}
      <section className="py-14 sm:py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-3xl sm:text-4xl text-[#451A03]">
              WHAT HAPPENS NEXT
            </h2>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">
              Verification &amp; Delivery Steps:
            </p>
            <div className="space-y-4">
              <div className="p-5 sm:p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-anton text-base shrink-0 shadow-sm">
                  1
                </span>
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik pt-0.5">
                  <strong>Confirmation SMS &amp; WhatsApp update</strong> — Sent to your registered mobile number shortly with your reference ID.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-anton text-base shrink-0 shadow-sm">
                  2
                </span>
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik pt-0.5">
                  <strong>Finance verification (24–48 hours)</strong> — Our partner finance team will verify your submitted documents and assess eligibility.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-anton text-base shrink-0 shadow-sm">
                  3
                </span>
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik pt-0.5">
                  <strong>Approval decision &amp; agreement</strong> — You will receive an SMS update regarding approval along with loan agreement details.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-anton text-base shrink-0 shadow-sm">
                  4
                </span>
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik pt-0.5">
                  <strong>Kit collection</strong> — Upon approval, collect your kit from your nearest Truck Wheels centre or coordinate delivery via WhatsApp.
                </p>
              </div>

              <div className="p-5 sm:p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-[#DC2626] text-white flex items-center justify-center font-anton text-base shrink-0 shadow-sm">
                  5
                </span>
                <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik pt-0.5">
                  <strong>15-Minute installation</strong> — Visit any authorized partner centre or certified installer for quick fitment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Direct WhatsApp Section */}
      <section className="py-14 sm:py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h3 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl text-[#451A03]">
              HAVE QUESTIONS ABOUT YOUR APPLICATION?
            </h3>
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-medium">
              Chat directly with our Suraksha finance team on WhatsApp or call our toll-free customer helpline for status assistance.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/suraksha/whatsapp"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-md bg-[#25D366] text-white hover:bg-[#1EBE5D] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                Chat on WhatsApp <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:18008330233"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all border-2 border-[#451A03]/20 bg-[#FFFBEB] hover:bg-white text-[#451A03] shadow-sm"
              >
                <PhoneCall className="w-4 h-4 text-[#DC2626]" />
                Toll-Free: 1800 833 0233
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h3 className="font-anton uppercase tracking-normal text-xl sm:text-2xl text-[#451A03]">
              EXPLORE MORE ABOUT SURAKSHA
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <Link
                href="/suraksha/how-it-works"
                className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <ShieldCheck className="w-5 h-5 text-[#DC2626]" />
                  <h4 className="font-anton uppercase tracking-normal text-lg sm:text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">
                    How it works
                  </h4>
                </div>
                <p className="text-[#78350F] text-xs leading-relaxed font-rubik font-medium mb-4">
                  Understand how Suraksha sensors, solar cabin display, and blow-out prevention work together.
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
                  Locate 400+ authorized Truck Wheels centres across Indian highway corridors for fitment.
                </p>
                <div className="font-bold text-xs text-[#DC2626] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/suraksha/faqs"
                className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <HelpCircle className="w-5 h-5 text-[#DC2626]" />
                  <h4 className="font-anton uppercase tracking-normal text-lg sm:text-xl text-[#451A03] group-hover:text-[#DC2626] transition-colors">
                    EMI FAQs
                  </h4>
                </div>
                <p className="text-[#78350F] text-xs leading-relaxed font-rubik font-medium mb-4">
                  Frequently asked questions regarding documents required, Bajaj Finance EMI tenures, and warranties.
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
