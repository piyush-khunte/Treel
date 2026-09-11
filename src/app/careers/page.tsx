import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase, 
  MapPin, 
  HeartHandshake, 
  Award, 
  Database, 
  Compass,
  GraduationCap
} from "lucide-react";
import { CareersInteractiveRoster } from "./careers-client";

export const metadata: Metadata = {
  title: "Careers at Treel  ·  Build Mobility Intelligence",
  description: "Careers at Treel Mobility Solutions. Open engineering, product, and go-to-market roles. Build India's mobility intelligence platform from Pune. See what's open.",
  alternates: {
    canonical: "https://treel.in/careers",
  },
  openGraph: {
    title: "Careers at Treel  ·  Build Mobility Intelligence",
    description: "Careers at Treel Mobility Solutions. Open engineering, product, and go-to-market roles. Build India's mobility intelligence platform from Pune. See what's open.",
    url: "https://treel.in/careers",
  },
};

export default function CareersPage() {
  const pillars = [
    {
      title: "Craft",
      icon: Compass,
      body: "We build for the long horizon. The sensor, the platform, the dashboard, the docs — every surface is engineered, not slapped together. Ship things you would put your name on."
    },
    {
      title: "Ownership",
      icon: Award,
      body: "You own outcomes end-to-end. Engineers ship features, not tickets. PMs run their surfaces. Sales owns the customer through renewal. Nobody hands off."
    },
    {
      title: "Data, not opinion",
      icon: Database,
      body: "Every claim in a review, a design doc, or a customer meeting is anchored in measurement. If the data does not exist yet, we run the experiment to get it."
    },
    {
      title: "Warm, not soft",
      icon: HeartHandshake,
      body: "We take care of each other. We also say hard things when they need to be said. Treel is a company where honest conversation is safe and the bar stays high."
    }
  ];

  const benefits = [
    "Competitive compensation with equity for senior roles",
    "Comprehensive health insurance for you and your dependents",
    "Flexible working with a preference for in-person collaboration at our Pune HQ",
    "Learning budget for conferences, courses, books",
    "Annual off-site and team retreats",
    "A serious platform to build serious things on"
  ];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl">
            <p className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B] mb-6 sm:mb-8">
              CAREERS
            </p>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12] mb-6">
              Come build mobility intelligence.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              We are hiring across engineering, product, and go-to-market. If you want to work on a platform that operates at scale, has real customer proof, and is defining a category as it grows, look at what&apos;s open below.
            </p>
          </div>
        </div>
      </section>

      {/* Section · Culture pillars */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Culture pillars
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pillars.map((p, i) => {
                const IconComp = p.icon;
                return (
                  <div key={i} className="p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
                    <div className="w-10 h-10 rounded-md bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed font-inter">
                      {p.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section · Benefits */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              What we offer.
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((b, i) => (
                <div key={i} className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#D5573B] shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base text-[#FAF7F2] font-inter">{b}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section · Open roles */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div>
              <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2]">
                Open roles
              </h2>
              <p className="text-[#94A3B8] text-sm mt-2 font-inter">
                Explore open positions across our engineering, product, and go-to-market teams in Pune.
              </p>
            </div>

            <CareersInteractiveRoster />
          </div>
        </div>
      </section>

      {/* Section · Not seeing your role? */}
      <section className="py-20 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Don&apos;t see a role that fits?
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              We hire opportunistically for exceptional candidates. If you believe you would build something meaningful at Treel, send us a note.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-md"
              >
                <span>Send us a note</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
