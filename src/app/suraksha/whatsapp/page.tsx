import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  PhoneCall,
  Clock,
  HelpCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  MapPin,
  Wrench,
  FileText,
  Package,
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "WhatsApp Suraksha · Direct Chat with Support",
  description:
    "WhatsApp Suraksha directly. 24/7 automated responses, business hours human support. Product info, configuration quotes, EMI, installation, warranty — सब कुछ WhatsApp पर।",
  alternates: {
    canonical: "https://treel.in/suraksha/whatsapp",
  },
  openGraph: {
    title: "WhatsApp Suraksha · Direct Chat with Support",
    description:
      "WhatsApp Suraksha directly. 24/7 automated responses, business hours human support. Product info, configuration quotes, EMI, installation, warranty — सब कुछ WhatsApp पर।",
    url: "https://treel.in/suraksha/whatsapp",
  },
};

const capabilities = [
  {
    title: "Product info ले सकते हैं",
    desc: "Kit के बारे में सब कुछ पूछ सकते हैं",
    icon: Package,
  },
  {
    title: "Kit quote & enquiry",
    desc: "Configuration-wise details और quote तुरंत मिलेगा",
    icon: Zap,
  },
  {
    title: "EMI apply",
    desc: "Basic EMI eligibility check + application link",
    icon: FileText,
  },
  {
    title: "Nearest centre find",
    desc: "Pincode share करिए, nearest centres भेजेंगे",
    icon: MapPin,
  },
  {
    title: "Installation help",
    desc: "Video guide, phone support, appointment booking",
    icon: Wrench,
  },
  {
    title: "Warranty claim",
    desc: "Photo भेजिए, हम process कर देंगे",
    icon: ShieldCheck,
  },
  {
    title: "Order status",
    desc: "Kit order का status check",
    icon: CheckCircle2,
  },
  {
    title: "Any other question",
    desc: "Business hours में human agent answer करेगा",
    icon: HelpCircle,
  },
];

const responseTimes = [
  {
    label: "Automated responses",
    time: "तुरंत (24/7)",
    detail: "Instant bot replies for quotes, nearby centres, and FAQs",
    icon: Zap,
  },
  {
    label: "Human agent responses",
    time: "Within 30 minutes",
    detail: "Mon–Fri, 9 AM – 6 PM during active business hours",
    icon: Clock,
  },
  {
    label: "Complex queries",
    time: "Same day",
    detail: "Direct escalation to technical and warranty specialists",
    icon: ShieldCheck,
  },
];

export default function SurakshaWhatsappPage() {
  const whatsappUrl = "https://wa.me/919112000174?text=Suraksha%20info%20chahiye";

  return (
    <div className="bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Breadcrumb
              variant="suraksha"
              items={[
                { label: "Suraksha", href: "/suraksha" },
                { label: "WhatsApp" },
              ]}
              className="flex justify-center"
            />
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#10B981] bg-[#10B981]/10 text-[#047857] font-rubik text-xs font-bold uppercase tracking-wider">
              <MessageCircle className="w-3.5 h-3.5" />
              WHATSAPP
            </div>

            <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95] uppercase">
              WHATSAPP <br />
              <span className="italic text-[#DC2626]">करिए।</span>
            </h1>

            <p className="text-[#DC2626] font-rubik text-xl sm:text-2xl font-bold">
              Direct WhatsApp chat with Suraksha.
            </p>

            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
              Suraksha के बारे में कुछ भी पूछना हो — product, kit quotes, EMI, installation, warranty — WhatsApp पर direct बात कीजिए। 24/7 automated response + business hours human support।
            </p>

            {/* Huge WhatsApp Primary CTA */}
            <div className="pt-4 flex justify-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 rounded-[4px] font-rubik font-bold text-base sm:text-lg uppercase tracking-wider transition-all shadow-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] active:scale-[0.98] border-2 border-[#1EBE5D]"
              >
                <MessageCircle className="w-6 h-6 fill-current" />
                Open WhatsApp <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* What you can do on WhatsApp */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              WHATSAPP पर क्या हो सकता है?
            </h2>
            <p className="text-[#78350F] text-lg mt-3 font-medium">
              आपका personal assistant हर सवाल और मदद के लिए 24/7 तैयार है।
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all space-y-3 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-[4px] bg-[#FEF3C7] border border-[#DC2626]/30 flex items-center justify-center text-[#DC2626]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-rubik text-base font-bold text-[#451A03]">
                    {item.title}
                  </h3>
                  <p className="text-[#78350F] text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WhatsApp Response Times */}
      <section className="py-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <div className="inline-block font-rubik text-xs font-bold uppercase tracking-widest text-[#DC2626] mb-2">
              RESPONSE TIMELINE
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl font-normal tracking-tight text-[#451A03] uppercase">
              WHATSAPP RESPONSE TIMES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {responseTimes.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="p-6 sm:p-8 rounded-lg bg-[#FEF3C7] border-2 border-[#451A03]/15 space-y-4 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-[4px] bg-[#FFFBEB] border border-[#451A03]/10 flex items-center justify-center text-[#DC2626]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-rubik text-sm font-semibold text-[#78350F]">
                      {item.label}
                    </span>
                  </div>

                  <div className="font-anton text-2xl sm:text-3xl font-normal text-[#DC2626]">
                    {item.time}
                  </div>

                  <p className="text-[#78350F] text-xs leading-relaxed">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Alternative Contact Section */}
      <section className="py-20 bg-[#FEF3C7]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl mx-auto space-y-8 text-center">
            <div>
              <h2 className="font-anton text-3xl sm:text-4xl font-normal tracking-tight text-[#451A03] uppercase">
                ALTERNATIVE CONTACT
              </h2>
              <p className="text-[#78350F] text-base mt-2 font-medium">
                WhatsApp use नहीं कर सकते? यह options भी available हैं:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a
                href="tel:18008330233"
                className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all text-center space-y-2 block group shadow-sm"
              >
                <PhoneCall className="w-6 h-6 mx-auto text-[#DC2626]" />
                <div className="font-rubik font-bold text-sm text-[#451A03]">
                  Call Toll-Free 1800 833 0233
                </div>
                <div className="text-xs text-[#78350F]">Direct voice support</div>
              </a>

              <Link
                href="/suraksha/callback"
                className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all text-center space-y-2 block group shadow-sm"
              >
                <Clock className="w-6 h-6 mx-auto text-[#EA580C]" />
                <div className="font-rubik font-bold text-sm text-[#451A03]">
                  Callback Request
                </div>
                <div className="text-xs text-[#78350F]">हम आपको call करेंगे</div>
              </Link>

              <Link
                href="/suraksha/contact"
                className="p-6 rounded-lg bg-[#FFFBEB] border-2 border-[#451A03]/15 hover:border-[#DC2626] transition-all text-center space-y-2 block group shadow-sm"
              >
                <FileText className="w-6 h-6 mx-auto text-[#0891B2]" />
                <div className="font-rubik font-bold text-sm text-[#451A03]">
                  Contact Form
                </div>
                <div className="text-xs text-[#78350F]">Online enquiry form</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
