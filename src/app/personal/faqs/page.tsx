import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions  \u00b7  Personal TPMS",
  description: "Common questions about Personal TPMS: installation, compatibility, warranty, app, pricing, and more.",
  alternates: {
    canonical: "https://treel.in/personal/faqs",
  },
  openGraph: {
    title: "Frequently Asked Questions  \u00b7  Personal TPMS",
    description: "Common questions about Personal TPMS: installation, compatibility, warranty, app, pricing, and more.",
    url: "https://treel.in/personal/faqs",
  },
};

export default function PersonalFaqsPage() {
  return (
    <div className="space-y-0 bg-[#0D1B2A] text-[#FAF7F2] font-manrope">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#FF8A00] bg-[#FF8A00]/10 border-[#FF8A00]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">FAQS</div>
            <h1 className="font-manrope text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Frequently asked questions.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-manrope max-w-3xl">Answers to common questions about Personal TPMS. If you don't find what you need, contact support.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">Filter chips: All · Product · Installation · App · Pricing & purchase · Warranty · Support</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**FAQ Accordion**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**Product**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**Installation**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**App**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**Pricing & purchase**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**Warranty**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-manrope">**Support**</p>
            <div className="space-y-4 pt-4">
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>What is Personal TPMS?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Personal TPMS is a wireless tyre pressure monitoring system for personal vehicles. Four sensors mount on your tyre valve stems and transmit real-time pressure and temperature readings to your phone via Bluetooth.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>How is it different from my car's built-in TPMS?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Factory TPMS in most cars only alerts you when pressure drops significantly below target. Personal TPMS shows you continuous readings for every tyre on every drive, so you see leading indicators (slow leaks, temperature drift) instead of just outcome alerts.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Will it damage my tyres or valve stems?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">No. Personal TPMS sensors are lightweight (8 grams each) and mount using the same threading as a standard valve cap. They do not damage tyres or valve stems.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Are the sensors safe at highway speeds?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Yes. Personal TPMS sensors are tested at speeds up to 200 km/h. The lightweight design and locking rings ensure they stay in place at any legal highway speed.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Will they work in monsoon or heavy rain?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Yes. Sensors are IP67 rated — fully protected against dust and water immersion up to 1 meter for 30 minutes. Monsoon and car washes are not an issue.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>How long does installation take?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">10 minutes for a typical car. The sensors screw onto valve stems finger-tight; no tools required. Follow the [setup guide](/personal/support/setup) or watch the video.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Do I need a mechanic to install it?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">No. Personal TPMS is designed for DIY installation. If you can screw on a valve cap, you can install a Personal TPMS sensor.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Which tyre position does each sensor go on?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">The sensors are labeled FL (front-left), FR (front-right), RL (rear-left), RR (rear-right). Install each in its labeled position.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Can I install it on a car with alloy wheels?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Yes. Personal TPMS works with any wheel type that uses a standard Schrader valve stem — alloy, steel, or aftermarket.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Which phones does the app work with?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">iOS 15 or later (any iPhone from 2018 onward) and Android 10 or later. Requires Bluetooth 5.0.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Does the app cost extra?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">No. The app is free to download and use. There are no in-app purchases or subscriptions.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Can I use the app on multiple phones?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Yes. You can pair the same Personal TPMS setup with multiple phones on the same Treel account.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Does the app work offline?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">The app shows last-known readings when your phone is out of Bluetooth range of the sensors. Real-time data requires being in Bluetooth range (roughly 10 meters from the car).</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Does the app track my location?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Only if you grant location permission and enable geofenced alerts. Location is optional; the app works without it.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>How much does Personal TPMS cost?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">₹8,999 launch pricing (MRP ₹12,999). Free shipping across India.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Where can I buy Personal TPMS?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Directly from treel.in. [TO BE PROVIDED · Confirm if also available on Amazon, Flipkart, or other channels.]</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Do you offer EMI?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Yes. EMI options are available at checkout via Razorpay for cart values above a minimum threshold.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>What is your return policy?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">7-day return policy for unopened kits. See [Returns Policy](/personal/returns) for details.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Do you ship internationally?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Not currently. Personal TPMS is available for India delivery only at launch. International availability is planned for 2027.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>What is the warranty period?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">1 year full replacement warranty on all four sensors and the app.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>What does the warranty cover?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Manufacturing defects on sensors, IP67 seal integrity, and app functionality. Does not cover physical damage, water damage below IP67, battery replacement, or loss/theft.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>How do I submit a warranty claim?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Go to the [Warranty page](/personal/support/warranty) and follow the claim submission process. You'll need your order ID and email.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Do I have to register my warranty?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Registration is optional but recommended — it helps us serve you faster if you ever need to claim.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>How do I contact support?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Email via the [Contact Support form](/personal/support/contact) (2 business day response), toll-free 1800 833 0233 (business hours), or chat widget on the site.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>What are your business hours?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Monday to Friday, 9:00 AM to 6:00 PM IST.</p>
              </div>
              <div className="p-6 rounded-xl bg-[#1E293B]/60 border border-white/10 hover:border-[#FF8A00]/40">
                <h3 className="font-manrope text-lg font-bold text-[#FAF7F2] flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-[#FF8A00] shrink-0" />
                  <span>Can I speak to someone in my language?</span>
                </h3>
                <p className="text-[#94A3B8] text-base mt-3 font-manrope leading-relaxed pl-7">Our support team responds in English and Hindi. For other languages, please indicate your preference in the support form and we will arrange a callback.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="pt-6">
              <Link href="/personal/support/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#FF8A00] text-[#FAF7F2] hover:bg-[#FFA033]">
                Contact support <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}