import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Driver Testimonials  \u00b7  Real Stories from Suraksha Users",
  description: "Read and watch real stories from truck drivers using Suraksha across India. Regional cluster testimonials in local languages.",
  alternates: {
    canonical: "https://treel.in/suraksha/testimonials",
  },
  openGraph: {
    title: "Driver Testimonials  \u00b7  Real Stories from Suraksha Users",
    description: "Read and watch real stories from truck drivers using Suraksha across India. Regional cluster testimonials in local languages.",
    url: "https://treel.in/suraksha/testimonials",
  },
};

export default function SurakshaTestimonialsPage() {
  return (
    <div className="space-y-0 bg-[#111315] text-[#FAF7F2] font-rubik">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#E65100] bg-[#E65100]/10 border-[#E65100]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">TESTIMONIALS</div>
            <h1 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">DRIVERS KYA KEHTE HAI.</h1>
            <p className="text-[#A3A3A3] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl">Suraksha use karne wale drivers ki real stories. Har cluster se, har truck type se, har region se.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Filter chips:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Region:** All · North · West · South 1 · South 2 · Central · East</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Truck type:** All · 6-wheeler · 10-wheeler · 12-wheeler · 14-wheeler · 16-wheeler · 18-wheeler</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>**Story type:** All · Safety stories · Savings stories · Simplicity stories</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Card layout (per testimonial):</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Sample testimonials (for launch — need 12-15 real testimonials):**</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Testimonial 1:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Testimonial 2:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Testimonial 3:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Video thumbnail (with play button overlay)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Driver name</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Region badge (colour-coded)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Truck type</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Quote excerpt (Hinglish or regional language, with translation if not Hindi)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Watch time badge</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Watch full story  →" CTA → `/suraksha/testimonials/[slug]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Driver: Narender K.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Region: North</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Truck: 14-wheeler</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Quote: "Highway drive from Pune to Mumbai, mujhe slow leak warning aayi front-right tyre par..."</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Driver: Rajiv T.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Region: North</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Truck: 10-wheeler</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Quote: "Amazing gadget, easy to install even for someone like me..."</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Driver: Dinanath K.</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Region: West</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Truck: 12-wheeler</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Quote: "Customer support really cares. Family ki peace of mind ke liye best investment..."</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                Watch full story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Reviews from drivers who prefer to write</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Written review cards (shorter format):</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Star rating (5)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Region</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Driver name (or "Verified user")</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Written review text (Hinglish or regional)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Purchase date</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">APNI STORY SHARE KIJIYE</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Aap Suraksha use kar rahe hai aur experience share karna chahte hai? WhatsApp par video ya written testimonial bhejiye. Selected stories site pe feature ki jayegi.</p>
            <div className="pt-6">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                Share via WhatsApp <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">AAP BHI EK STORY BAN JAAO.</h2>
            <div className="pt-6">
              <Link href="/suraksha/centres" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                Nearest Centre <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}