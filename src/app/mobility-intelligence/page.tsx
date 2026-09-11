import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "What is Mobility Intelligence?  \u00b7  Treel",
  description: "Mobility intelligence is the category that replaces tyre monitoring for fleet operators. It treats every vehicle as a queryable data object. Definition, adoption, and why the category emerged.",
  alternates: {
    canonical: "https://treel.in/mobility-intelligence",
  },
  openGraph: {
    title: "What is Mobility Intelligence?  \u00b7  Treel",
    description: "Mobility intelligence is the category that replaces tyre monitoring for fleet operators. It treats every vehicle as a queryable data object. Definition, adoption, and why the category emerged.",
    url: "https://treel.in/mobility-intelligence",
  },
};

export default function MobilityIntelligencePage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">CATEGORY DEFINITION</div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">What is mobility intelligence?</h1>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Mobility intelligence is the category that replaces tyre monitoring and fleet telematics with a Vehicle Digital Twin architecture. Fleet operators reason about vehicles the way software engineers reason about data. Treel is the mobility intelligence company operating this category in India across 68,000 vehicles.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Label: `AT A GLANCE</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">From tyre monitoring to mobility intelligence.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Ten years ago, the fleet intelligence category was called tyre monitoring. Sensors on tyres reported pressure and temperature. Fleet owners received alerts when a tyre needed attention. It was useful, but small.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Five years ago, the category expanded into fleet telematics. GPS, fuel data, and driver behaviour joined the mix. Fleet owners could see where their trucks were and how they were being driven. Better, but still fragmented across separate tools.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Today, the category has expanded again into mobility intelligence. Every subsystem of every vehicle is represented as a queryable data object. The fleet is no longer a collection of trucks with tyres and fuel sensors; it is a portfolio of Vehicle Digital Twins operating on a shared platform.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">The name changed because the architecture changed. And the architecture changed because the operator's job changed: from reacting to component alerts, to reasoning about the fleet as a business.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">The mobility intelligence operating model.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Reactive → Proactive → Predictive.**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Old-model fleet management was **reactive**. A tyre blew out; the truck stopped; the fleet operator reacted. The response was correct but expensive: towing fees, delayed shipments, driver downtime.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Mid-generation fleet telematics moved operators to **proactive**. Sensors flagged risks before they became failures. Tyre pressure warnings gave a 24-hour window to act. Better, but the fleet operator was still responding to a signal from a component.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Mobility intelligence enables **predictive**. Machine learning models forecast component failure days or weeks in advance, based on the full history of the Vehicle Digital Twin. Fleet operators schedule maintenance during planned downtime. The signal is no longer about the tyre; it is about the vehicle's future state.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Who operates in this category.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Mobility intelligence adoption in India follows the pattern most enterprise software categories follow: early adopters in logistics and passenger transport lead, followed by construction, mining, and OEM fleets. Treel operates across all five verticals. Two hundred enterprise customers now run on the platform. The category is still in its first decade of scale.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Treel is the mobility intelligence company.</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">We are not the only company operating in this category. What we claim, and what our customers validate, is that we operate the platform, own the largest dataset, and are moving fastest to define what mobility intelligence means as an operating discipline. Read our founder note for the fuller story.</p>
            <div className="pt-6">
              <Link href="/founder-note" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                Read the founder note <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Related reading.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
              <Link href="/vehicle-digital-twin" className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/30 transition-all group block">
                <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">What is a Vehicle Digital Twin?</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/tmip" className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/30 transition-all group block">
                <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Explore TMIP</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/insights" className="p-6 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/30 transition-all group block">
                <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Read our insights</h3>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1">
                  Learn more <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}