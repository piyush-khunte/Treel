import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Database, Award, ShieldCheck, Cpu, TrendingUp, DollarSign, ChevronRight } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Why Treel · The Mobility Intelligence Choice",
  description: "Six reasons enterprise fleet operators, owner-drivers, and consumers choose Treel: data scale, category authority, industrial backing, technical depth, customer proof, financial rigour.",
  alternates: {
    canonical: "https://treel.in/why-treel",
  },
  openGraph: {
    title: "Why Treel · The Mobility Intelligence Choice",
    description: "Six reasons enterprise fleet operators, owner-drivers, and consumers choose Treel: data scale, category authority, industrial backing, technical depth, customer proof, financial rigour.",
    url: "https://treel.in/why-treel",
  },
};

export default function WhyTreelPage() {
  const reasons = [
    {
      num: "01",
      icon: Database,
      title: "The largest connected commercial vehicle dataset in India.",
      body: "Sixty-eight thousand vehicles under active management. Sub-second telemetry from each. Eight years of longitudinal data. The dataset is the moat, and it compounds every day.",
    },
    {
      num: "02",
      icon: Award,
      title: "We defined the category.",
      body: "\"Mobility intelligence\" is not a marketing phrase we borrowed. It is the framing that emerged from operating this platform at scale. Treel is the company that moved the industry from tyre monitoring to Vehicle Digital Twin.",
    },
    {
      num: "03",
      icon: ShieldCheck,
      title: "Backed by Industrial Reliability.",
      body: "Five decades of tyre engineering, national distribution across India, and the operational credibility that only a real industrial partner can lend a young platform company.",
    },
    {
      num: "04",
      icon: Cpu,
      title: "Deep technical depth.",
      body: "ARAI certified. Benchmarked against international TPMS standards. Made in India by an engineering team with decades of national and international experience. The sensor works. The platform works. The data works.",
    },
    {
      num: "05",
      icon: TrendingUp,
      title: "Customer proof.",
      body: "Two hundred enterprise customers. Nine-month median payback. 99.7 percent platform uptime, trailing 90 days. The numbers earn the brand its position. Nothing here is aspirational.",
    },
    {
      num: "06",
      icon: DollarSign,
      title: "Financial rigour.",
      body: "We sell only when the payback math works for you. If it does not, we do not sell into it. Our commercial discipline is why our customer retention holds where category peers see churn.",
    },
  ];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Why Treel" },
              ]}
            />
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                WHY TREEL
              </span>
            </div>

            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Six reasons the mobility intelligence category runs on Treel.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              You have options in the fleet intelligence space. Here is why two hundred enterprise fleets, sixty-eight thousand vehicles, and an entire owner-driver community have chosen Treel to run on.
            </p>
          </div>
        </div>
      </section>

      {/* 2. REASONS GRID (6 CARDS) */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div 
                  key={reason.num}
                  className="p-8 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 text-[#D5573B] flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="font-mono text-sm font-bold text-[#D5573B]">
                        {reason.num}
                      </span>
                    </div>
                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] leading-snug">
                      {reason.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed font-inter">
                      {reason.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* 4. CASE STUDY STRIP */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                PROVEN IMPACT
              </span>
              <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2] mt-1">
                Read the customer stories.
              </h2>
            </div>
            <Link
              href="/research/roi-fleet-intelligence"
              className="text-xs font-semibold text-[#D5573B] hover:underline flex items-center gap-1"
            >
              <span>See ROI research paper</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-[#D5573B] font-bold">1,000-TRUCK CASE STUDY</div>
              <h4 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                Full Payback in Week 11
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                How a national 3PL carrier eliminated roadside punctures and saved 3.4% in fuel over 1,000 multi-axle trailers.
              </p>
              <Link href="/research/case-study-1000-truck" className="text-xs font-semibold text-[#D5573B] inline-flex items-center gap-1 pt-2">
                Read case study <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-[#D5573B] font-bold">MINING &amp; HAULAGE</div>
              <h4 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                Zero Blowouts in Severe Ambient Heat
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Predictive thermodynamic anomaly alerts protected 50-ton tipper tyres across rugged open-cast quarries.
              </p>
              <Link href="/research/predictive-maintenance-heavy" className="text-xs font-semibold text-[#D5573B] inline-flex items-center gap-1 pt-2">
                Read case study <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-[#D5573B] font-bold">INTERCITY PASSENGER</div>
              <h4 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                Passenger Safety &amp; On-Time Delivery
              </h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Luxury bus fleet operators maintain scheduled departures with real-time pre-trip wheel balance verification.
              </p>
              <Link href="/research/roi-fleet-intelligence" className="text-xs font-semibold text-[#D5573B] inline-flex items-center gap-1 pt-2">
                Read case study <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA BAND */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Talk to us.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              We would rather have a conversation about your fleet than send you more marketing pages.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/research/roi-fleet-intelligence"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] border border-white/20 text-[#FAF7F2] font-medium text-sm hover:border-[#D5573B] hover:text-[#D5573B] transition-all"
              >
                <span>Read the ROI paper</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}