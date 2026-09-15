import type { Metadata } from "next";
import Link from "next/link";
import { 
  Play, 
  HelpCircle, 
  ShieldCheck, 
  Mail, 
  ArrowRight, 
  PhoneCall, 
  Clock, 
  CheckCircle2,
  ChevronRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Support · Personal TPMS",
  description: "Personal TPMS customer support. Setup guides, troubleshooting, warranty, and contact options.",
  alternates: {
    canonical: "https://treel.in/personal/support",
  },
  openGraph: {
    title: "Support · Personal TPMS",
    description: "Personal TPMS customer support. Setup guides, troubleshooting, warranty, and contact options.",
    url: "https://treel.in/personal/support",
  },
};

export default function PersonalSupportPage() {
  const supportCards = [
    {
      icon: Play,
      title: "Setup guide",
      desc: "10-minute installation. Step-by-step with photos, diagrams, and video walkthrough.",
      href: "/personal/support/setup",
      cta: "See the setup guide"
    },
    {
      icon: HelpCircle,
      title: "Troubleshooting",
      desc: "Common problems and their solutions. Sensor pairing, app issues, and alert configuration.",
      href: "/personal/support/troubleshooting",
      cta: "Troubleshoot an issue"
    },
    {
      icon: ShieldCheck,
      title: "Warranty & claims",
      desc: "1-year full replacement warranty. How to register your kit and submit a warranty claim.",
      href: "/personal/support/warranty",
      cta: "See warranty details"
    },
    {
      icon: Mail,
      title: "Contact us",
      desc: "Can't find what you need? Reach our specialized customer support team directly.",
      href: "/personal/support/contact",
      cta: "Contact support"
    }
  ];

  const quickFaqs = [
    {
      q: "How long does installation take?",
      a: "10 minutes for a typical car. The sensors screw onto valve stems finger-tight; no tools required. Follow the setup guide or watch the video."
    },
    {
      q: "Will it damage my tyres or valve stems?",
      a: "No. Personal TPMS sensors are lightweight (8 grams each) and mount using the same threading as a standard valve cap. They do not damage tyres or valve stems."
    },
    {
      q: "How is it different from my car's built-in TPMS?",
      a: "Factory TPMS in most cars only alerts you when pressure drops significantly below target. Personal TPMS shows you continuous readings for every tyre on every drive, so you see leading indicators (slow leaks, temperature drift) instead of just outcome alerts."
    },
    {
      q: "Are the sensors safe at highway speeds?",
      a: "Yes. Personal TPMS sensors are tested at speeds up to 200 km/h. The lightweight design and locking rings ensure they stay in place at any legal highway speed."
    },
    {
      q: "What is covered under the 1-year warranty?",
      a: "1-year full replacement warranty on all four sensors and the app. Covers manufacturing defects and Bluetooth hardware failure. Replacement dispatched within 48 hours."
    }
  ];

  return (
    <div className="bg-white text-[#111827] font-manrope min-h-screen selection:bg-[#2563EB]/20 selection:text-[#111827]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-black/[0.06] bg-gradient-to-b from-white to-[#F3F4F6]/60">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              SUPPORT
            </div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.12]">
              We're here to help.
            </h1>
            <p className="text-[#4B5563] text-lg sm:text-xl leading-relaxed font-manrope font-medium max-w-3xl">
              Everything you need for Personal TPMS: setup guides, troubleshooting, warranty information, and how to reach our support team.
            </p>
          </div>
        </div>
      </section>

      {/* Help Topics Section */}
      <section className="py-20 border-b border-black/[0.06] bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCards.map((card, idx) => {
              const IconComp = card.icon;
              return (
                <div 
                  key={idx} 
                  className="p-8 rounded-3xl bg-[#F9FAFB] border border-black/[0.06] shadow-sm hover:border-[#2563EB]/30 hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#2563EB]/10 text-[#2563EB] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-xl text-[#111827]">{card.title}</h3>
                    <p className="text-sm text-[#4B5563] leading-relaxed font-medium">{card.desc}</p>
                  </div>
                  <div className="pt-6">
                    <Link
                      href={card.href}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] transition-colors group-hover:translate-x-1 duration-200"
                    >
                      {card.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Questions Section */}
      <section className="py-20 border-b border-black/[0.06] bg-[#F9FAFB]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 text-[#2563EB] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
              FREQUENT ANSWERS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#111827]">
              Common questions
            </h2>
            <p className="text-[#4B5563] text-base sm:text-lg">
              Quick answers to the most common queries from personal car drivers.
            </p>
          </div>

          <div className="max-w-4xl space-y-4">
            {quickFaqs.map((faq, idx) => (
              <div key={idx} className="p-6 sm:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-sm space-y-3">
                <h3 className="font-bold text-lg text-[#111827] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#2563EB] shrink-0" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-sm text-[#4B5563] leading-relaxed pl-7">{faq.a}</p>
              </div>
            ))}

            <div className="pt-6">
              <Link
                href="/personal/faqs"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white font-manrope font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-[0_4px_14px_rgba(37,99,235,0.25)]"
              >
                See all FAQs <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Toll-Free Emergency Support Section */}
      <section className="py-20 bg-white">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="p-8 sm:p-14 rounded-[32px] bg-[#111827] text-white shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-[#94A3B8] font-manrope text-xs font-bold uppercase tracking-[0.15em]">
                DIRECT ASSISTANCE
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Toll-free support
              </h2>
              <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed">
                Prefer to talk to someone? Call our toll-free line during business hours:
              </p>
              <div className="pt-2 text-sm text-[#94A3B8] font-medium">
                Toll-free 1800 833 0233 · Monday to Friday, 9:00 AM to 6:00 PM IST
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
              <a
                href="tel:18008330233"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#2563EB] text-white font-manrope font-bold text-sm hover:bg-[#1D4ED8] transition-all shadow-[0_4px_14px_rgba(37,99,235,0.3)]"
              >
                <PhoneCall className="w-4 h-4" /> Call 1800 833 0233
              </a>
              <Link
                href="/personal/support/contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-manrope font-bold text-sm hover:bg-white/10 transition-all"
              >
                <Mail className="w-4 h-4" /> Email Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
