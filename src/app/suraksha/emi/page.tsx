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
  Truck,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { SurakshaEmiCalculator } from "./emi-calculator";
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

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
  { label: "Employment", value: "Self-employed (truck owner) or salaried" },
  { label: "Truck ownership", value: "Registered owner with valid RC" },
  { label: "Income proof", value: "Bank statement (last 6 months) or ITR" },
  { label: "CIBIL score", value: "700+ preferred, lower scores considered case-by-case" },
  { label: "KYC", value: "Aadhaar + PAN mandatory" },
];

const requiredDocuments = [
  "Aadhaar card (front and back)",
  "PAN card",
  "Truck Registration Certificate (RC)",
  "Bank statement (last 6 months) or ITR (last 2 years)",
  "Recent passport-size photo",
  "Address proof (if different from Aadhaar)",
];

const steps = [
  {
    num: "1",
    title: "Keep Documents Ready",
    desc: "Aadhaar, PAN, RC, and 6-month bank statement.",
  },
  {
    num: "2",
    title: "Complete Application",
    desc: "Fill our quick online form or get assisted at any Truck Wheels centre.",
  },
  {
    num: "3",
    title: "Submit Documents",
    desc: "Upload photos online or share directly via WhatsApp.",
  },
  {
    num: "4",
    title: "Finance Verification",
    desc: "Approval decision in 24–48 hours.",
  },
  {
    num: "5",
    title: "Collect and Fit Kit",
    desc: "Pickup and 15-minute fitment at your nearest centre.",
  },
];

const faqs = [
  {
    q: "Can I get EMI approval with a lower CIBIL score?",
    a: "Yes. Financing applications are reviewed on a holistic case-by-case basis including vehicle profile and bank statements. Submit your application to check eligibility.",
  },
  {
    q: "How much down payment is required?",
    a: "Zero down payment options are available for eligible applicants. Standard plans typically require 10–20% down payment.",
  },
  {
    q: "How long does approval take?",
    a: "Usually within 24–48 hours. When all clear documents are submitted upfront, same-day approval is often possible.",
  },
  {
    q: "What happens if an EMI payment is missed?",
    a: "Standard finance partner late charges apply. If you foresee any payment delays, contact our helpline on WhatsApp so our team can assist you.",
  },
  {
    q: "Can I foreclose or prepay the EMI loan early?",
    a: "Yes. Early foreclosure is available under standard finance terms with minimal processing charges.",
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
              EMI STARTS AT<br />
              <span className="italic text-[#EA580C]">₹1,500 A MONTH.</span>
            </h1>

            <SurakshaRotator
              page="5.5"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide"
            >
              आसान किस्तों में आज ही सुरक्षा लगवाइए।
            </SurakshaRotator>

            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Get your Suraksha kit fitted now and pay in easy monthly instalments, with quick approval and minimal paperwork. Use the calculator below to find a plan that suits you.
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
              WHEN IS ZERO-COST EMI AVAILABLE?
            </h2>

            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium">
              Zero-cost EMI is available on selected 9-month plans, meaning the total amount payable equals the kit price with zero interest charges. Limited-time offer, terms apply.
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
                Note: Final eligibility is subject to partner finance approval. Verifications are typically completed within 24–48 hours.
              </p>
            </div>

            {/* Documents */}
            <div className="p-8 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 space-y-6 shadow-sm">
              <h2 className="font-anton text-2xl sm:text-3xl font-normal text-[#451A03] uppercase">
                DOCUMENTS REQUIRED
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
              HOW TO APPLY
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