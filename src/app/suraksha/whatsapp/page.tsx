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
import { SurakshaRotator } from "@/components/suraksha/suraksha-rotator";

export const metadata: Metadata = {
  title: "WhatsApp Suraksha · Direct Chat with Support",
  description:
    "Chat with Suraksha directly on WhatsApp. 24/7 automated responses, business hours human support. Product info, configuration quotes, EMI, installation, and warranty details.",
  alternates: {
    canonical: "https://treel.in/suraksha/whatsapp",
  },
  openGraph: {
    title: "WhatsApp Suraksha · Direct Chat with Support",
    description:
      "Chat with Suraksha directly on WhatsApp. 24/7 automated responses, business hours human support. Product info, configuration quotes, EMI, installation, and warranty details.",
    url: "https://treel.in/suraksha/whatsapp",
  },
};

const capabilities = [
  {
    title: "Product Information",
    desc: "Ask anything about Suraksha kits, sensors, and compatibility",
    icon: Package,
  },
  {
    title: "Instant Quotes & Inquiry",
    desc: "Receive configuration-specific pricing and package details immediately",
    icon: Zap,
  },
  {
    title: "EMI Eligibility",
    desc: "Check basic EMI terms and receive application links directly",
    icon: FileText,
  },
  {
    title: "Locate Nearest Centres",
    desc: "Share your pincode or city to receive nearby authorized service centres",
    icon: MapPin,
  },
  {
    title: "Installation Guidance",
    desc: "Access video guides, phone support, and appointment scheduling",
    icon: Wrench,
  },
  {
    title: "Warranty Claims",
    desc: "Share photos of your sensor or display for rapid claim processing",
    icon: ShieldCheck,
  },
  {
    title: "Order Tracking",
    desc: "Check real-time dispatch and delivery status of your kit",
    icon: CheckCircle2,
  },
  {
    title: "Driver Support",
    desc: "Speak with a live support specialist during business hours",
    icon: HelpCircle,
  },
];

const responseTimes = [
  {
    label: "Automated responses",
    time: "Instant (24/7)",
    detail: "Instant bot replies for quotes, nearby centres, and FAQs",
    icon: Zap,
  },
  {
    label: "Human agent responses",
    time: "Within 30 minutes",
    detail: "Mon–Fri, 8 AM – 8 PM during active business hours",
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
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              INSTANT CHAT
            </div>

            <h1 className="font-anton text-5xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-[#451A03] leading-[0.95] uppercase">
              CHAT ON <br />
              <span className="italic text-[#DC2626]">WHATSAPP.</span>
            </h1>

            <SurakshaRotator
              page="5.18"
              className="font-baloo text-xl sm:text-2xl font-bold text-[#DC2626] tracking-wide"
            >
              एक मैसेज भेजिए, तुरंत जवाब पाइए।
            </SurakshaRotator>

            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-medium max-w-2xl mx-auto">
              Ask about the product, price, EMI, installation or warranty. You get instant automated replies 24/7, and our team responds during business hours.
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
              WHAT YOU CAN DO ON WHATSAPP
            </h2>
            <p className="text-[#78350F] text-lg mt-3 font-medium">
              Our dedicated support channel is available 24/7 to answer questions and assist drivers nationwide.
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
                Prefer not to use WhatsApp? These options are also available:
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
                <div className="text-xs text-[#78350F]">We will call you back</div>
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