import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileCheck2,
  Clock,
  Sparkles,
  HelpCircle,
  ChevronRight,
  Building,
  CreditCard,
  MapPin,
  MessageCircle,
  Truck,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaEmiCalculator } from "./emi-calculator";

export const metadata: Metadata = {
  title: "Suraksha EMI Plans · Bajaj Finance Partnership · Zero-Cost Options",
  description:
    "Suraksha kit EMI on Bajaj Finance. Flexible 3, 6, 9, 12, 18, 24-month tenures. Zero-cost EMI available. Minimal documentation with quick approval.",
  alternates: {
    canonical: "https://treel.in/suraksha/emi",
  },
  openGraph: {
    title: "Suraksha EMI Plans · Bajaj Finance Partnership · Zero-Cost Options",
    description:
      "Suraksha kit EMI on Bajaj Finance. Flexible 3, 6, 9, 12, 18, 24-month tenures. Zero-cost EMI available. Minimal documentation with quick approval.",
    url: "https://treel.in/suraksha/emi",
  },
};

const eligibilityCriteria = [
  { label: "Age", value: "21–65 years" },
  { label: "Employment", value: "Self-employed (truck owner) या salaried" },
  { label: "Truck ownership", value: "RC card के साथ registered owner" },
  { label: "Income proof", value: "Bank statement (last 6 months) या ITR" },
  { label: "CIBIL score", value: "700+ preferred, lower scores considered case-by-case" },
  { label: "KYC", value: "Aadhar + PAN mandatory" },
];

const requiredDocuments = [
  "Aadhar card (front + back photo)",
  "PAN card (photo)",
  "Truck RC (photo)",
  "Bank statement (last 6 months) या ITR (last 2 years)",
  "Recent passport-size photo",
  "Address proof (if different from Aadhar)",
];

const steps = [
  {
    num: "1",
    title: "Documents ready रखिए",
    desc: "Aadhar, PAN, RC, bank statement.",
  },
  {
    num: "2",
    title: "Application form भरिए",
    desc: "Online form या Truck Wheels centre पर assist मिलेगी।",
  },
  {
    num: "3",
    title: "Documents upload करिए",
    desc: "Photos भी WhatsApp पर send कर सकते हैं।",
  },
  {
    num: "4",
    title: "Bajaj Finance review",
    desc: "24-48 hours में result.",
  },
  {
    num: "5",
    title: "Approval के बाद kit collect करिए",
    desc: "Truck Wheels centre से pickup या home delivery.",
  },
];

const faqs = [
  {
    q: "क्या CIBIL score कम है तो EMI मिलेगा?",
    a: "हाँ, Bajaj Finance case-by-case consider करता है। Application submit कर के देखिए।",
  },
  {
    q: "Down payment कितना देना होगा?",
    a: "Zero down payment options available for eligible applicants. Standard में 10-20% down payment beneficial होता है।",
  },
  {
    q: "कितने दिनों में approval मिलता है?",
    a: "Usually 24-48 hours में। Complete documents दिए तो same-day approval भी possible है।",
  },
  {
    q: "EMI miss हो जाए तो?",
    a: "Standard Bajaj Finance late payment fees apply. WhatsApp पर contact करिए — हम help कर सकते हैं।",
  },
  {
    q: "क्या EMI foreclose कर सकते हैं?",
    a: "Haan. Foreclosure charges as per Bajaj Finance terms, usually 3-5%.",
  },
];

const relatedCards = [
  {
    title: "Pricing",
    desc: "Detailed configuration pricing from 6-wheeler to 18-wheeler.",
    href: "/suraksha/pricing",
  },
  {
    title: "Nearest Centre",
    desc: "Locate 400+ Truck Wheels centres for instant pickup and installation.",
    href: "/suraksha/centres",
  },
  {
    title: "WhatsApp for questions",
    desc: "Instant answers on financing, documentation, and approval status.",
    href: "/suraksha/whatsapp",
  },
];

export default function SurakshaEmiPage() {
  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-16 sm:pt-20 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "EMI Plans" },
              ]}
            />
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#EA580C] bg-[#EA580C]/10 text-[#EA580C] font-rubik text-xs font-bold uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5" />
                EMI OPTIONS
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#451A03]/5 text-[#451A03] font-rubik text-xs font-bold border border-[#451A03]/15">
                <Building className="w-3.5 h-3.5 text-[#0891B2]" /> Bajaj Finance Partnership
              </div>
            </div>

            <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95] uppercase">
              FLEXIBLE EMI PLANS<br />
              <span className="italic text-[#EA580C]">BAJAJ FINANCE PARTNERSHIP.</span>
            </h1>

            <p className="text-[#DC2626] font-rubik text-xl sm:text-2xl font-bold">
              Zero downpayment options with instant pre-approval.
            </p>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Suraksha kit को EMI पर लेना बहुत आसान है। Bajaj Finance के साथ partnership है — flexible tenures, minimal documentation, और quick approval.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive EMI Calculator */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 flex justify-center">
          <SurakshaEmiCalculator />
        </div>
      </section>

      {/* Zero-Cost EMI Section */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-12 rounded-lg bg-[#FEF3C7] border-3 border-[#10B981] max-w-4xl space-y-4 shadow-md">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10B981]/15 text-[#047857] font-rubik text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4" /> LIMITED-TIME OFFER
            </div>

            <h2 className="font-anton text-3xl sm:text-4xl font-normal text-[#451A03] uppercase">
              ZERO-COST EMI कब मिलता है?
            </h2>

            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
              9-month tenure के लिए zero-cost EMI available है — मतलब total amount payable equal to kit price, कोई interest नहीं। यह limited-time offer है, terms apply.
            </p>
          </div>
        </div>
      </section>

      {/* Eligibility Criteria & Required Documents */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl">
            {/* Eligibility */}
            <div className="p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 space-y-6 shadow-sm">
              <h2 className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase">
                ELIGIBILITY CRITERIA (Bajaj Finance)
              </h2>

              <div className="space-y-3">
                {eligibilityCriteria.map((item) => (
                  <div
                    key={item.label}
                    className="p-3.5 rounded-[4px] bg-[#FEF3C7] border border-[#451A03]/10 flex items-center justify-between text-xs sm:text-sm"
                  >
                    <span className="font-bold text-[#451A03]">{item.label}</span>
                    <span className="text-[#78350F] font-medium text-right ml-2">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-xs font-semibold text-[#78350F] pt-2 border-t border-[#451A03]/10">
                Note: Final eligibility Bajaj Finance के discretion पर है। Approval usually 24-48 hours में हो जाती है।
              </p>
            </div>

            {/* Documents */}
            <div className="p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 space-y-6 shadow-sm">
              <h2 className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase">
                DOCUMENTS जो चाहिए
              </h2>

              <ul className="space-y-3">
                {requiredDocuments.map((doc) => (
                  <li key={doc} className="flex items-start gap-3 text-sm text-[#451A03]">
                    <div className="w-5 h-5 rounded-full bg-[#DC2626] text-[#FEF3C7] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FileCheck2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Application Process */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              APPLY कैसे करें?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-5xl">
            {steps.map((step) => (
              <div
                key={step.num}
                className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 space-y-3 relative flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-[4px] bg-[#DC2626] text-[#FEF3C7] font-anton text-lg flex items-center justify-center mb-3">
                    {step.num}
                  </div>
                  <h3 className="font-rubik text-sm font-bold text-[#451A03] leading-snug">
                    {step.title}
                  </h3>
                </div>
                <p className="text-[#78350F] text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-8 flex justify-center">
            <Link
              href="/suraksha/emi/apply"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[4px] font-rubik font-bold text-base transition-all shadow-md bg-[#DC2626] text-[#FEF3C7] hover:bg-[#B91C1C] active:scale-[0.98]"
            >
              Apply Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* EMI FAQ */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              EMI questions
            </h2>
          </div>

          <div className="space-y-4 max-w-4xl">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 space-y-2 shadow-sm"
              >
                <h3 className="font-rubik text-base font-bold text-[#451A03]">
                  {faq.q}
                </h3>
                <p className="text-[#78350F] text-sm leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Content */}
      <section className="py-20 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-3xl sm:text-4xl font-normal tracking-tight text-[#451A03] uppercase">
              Related content
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {relatedCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="p-6 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all group block shadow-sm"
              >
                <h3 className="font-anton text-xl font-normal text-[#451A03] group-hover:text-[#DC2626] transition-colors uppercase">
                  {card.title}
                </h3>
                <p className="text-[#78350F] text-xs leading-relaxed mt-2 mb-4">
                  {card.desc}
                </p>
                <div className="font-rubik text-xs font-bold text-[#DC2626] flex items-center gap-1">
                  Explore <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
