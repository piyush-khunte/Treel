import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  Layers, 
  Users, 
  ChevronRight,
  Database,
  Sparkles,
  Award,
  Globe2
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "About Treel  ·  The Mobility Intelligence Company",
  description: "Treel Mobility Solutions is India's mobility intelligence company. Founded 2018 by Manish Ingale. Headquartered in Pune. 200+ enterprise customers, 68K vehicles under management.",
  alternates: {
    canonical: "https://treel.in/about",
  },
  openGraph: {
    title: "About Treel  ·  The Mobility Intelligence Company",
    description: "Treel Mobility Solutions is India's mobility intelligence company. Founded 2018 by Manish Ingale. Headquartered in Pune. 200+ enterprise customers, 68K vehicles under management.",
    url: "https://treel.in/about",
  },
};

export default function AboutPage() {
  const values = [
    {
      icon: Database,
      title: "Data before opinion.",
      body: "Every claim we make has a measurement behind it. Fleet operators do not need another vendor with a pitch. They need numbers that hold up in a QBR. We build for that room."
    },
    {
      icon: Sparkles,
      title: "Simplicity is a feature.",
      body: "A truck driver installing Suraksha at a roadside puncture shop should not need to think about our engineering. A CFO reviewing TMIP's ROI should not need to interpret a dashboard. Simplicity is not a design polish; it is the product working correctly."
    },
    {
      icon: Award,
      title: "Category-defining, quietly.",
      body: "We are moving an industry from monitoring components to reasoning about vehicles. We do this by shipping, not by declaring. The category will settle on the definition of the company that operates it."
    },
    {
      icon: Globe2,
      title: "Indian first. Global ready.",
      body: "We built Treel for Indian roads, Indian fleets, and Indian owner-drivers. The architecture ports cleanly to Middle Eastern and European markets from Month 4 onward, without compromising the Indian core."
    }
  ];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Hero Section */}
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
                { label: "About Us" },
              ]}
            />
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                THE COMPANY
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              We started with a tyre.<br />
              We are building a category.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Treel is the mobility intelligence company. What began in 2018 as a tyre pressure sensor is now the Vehicle Digital Twin architecture that operates across India&apos;s largest connected commercial vehicle dataset.
            </p>
          </div>
        </div>
      </section>

      {/* Section · Origin */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Why Treel exists.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              In 2018, India had two hundred million commercial vehicles on the road and near-zero real-time data about any of them. Fleet owners knew what they had bought. They knew what they had paid for fuel. They knew when a truck broke down. Between those three data points was a fog.
            </p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              Treel was founded to lift that fog. We started at the tyre because it is the vehicle&apos;s most talkative component, and because decades of engineering had gone into understanding what tyres try to tell you. The tyre was the entry point. The vehicle was always the destination.
            </p>
          </div>
        </div>
      </section>

      {/* Section · What we do today */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="space-y-4">
              <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
                One architecture. Three audiences.
              </h2>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Today Treel operates three product families on one shared data infrastructure. TMIP serves enterprise fleets managing ten or more vehicles. Project Suraksha serves the owner-driver community, one truck at a time, in the vernacular of six regional clusters. Personal TPMS serves the consumer market on iOS and Android. All three share the Vehicle Digital Twin architecture, the sensor family, and the operational DNA that binds Treel together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              <Link href="/tmip" className="group p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="font-jetbrains font-mono text-[10px] text-[#64748B] tracking-[0.12em] uppercase mb-2">ENTERPRISE FLEETS</div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">TMIP Enterprise</h3>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">Vehicle Digital Twin platform for fleets with 10 to 10,000+ commercial vehicles.</p>
                </div>
                <div className="mt-4 font-inter text-[13px] font-semibold text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore TMIP <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link href="/suraksha" className="group p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="font-jetbrains font-mono text-[10px] text-[#64748B] tracking-[0.12em] uppercase mb-2">OWNER-DRIVERS</div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Project Suraksha</h3>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">Puncture avoidance, tyre life extension, and 15-min driver helpline across Indian highways.</p>
                </div>
                <div className="mt-4 font-inter text-[13px] font-semibold text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore Suraksha <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>

              <Link href="/personal" className="group p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="font-jetbrains font-mono text-[10px] text-[#64748B] tracking-[0.12em] uppercase mb-2">CONSUMERS</div>
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Personal TPMS</h3>
                  <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">Smart Bluetooth tyre pressure monitoring kits for cars, SUVs, and motorcycles.</p>
                </div>
                <div className="mt-4 font-inter text-[13px] font-semibold text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore Personal <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section · Values */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              What we believe.
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((v, i) => {
                const IconComp = v.icon;
                return (
                  <div key={i} className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 space-y-4">
                    <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                      {v.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed font-inter">
                      {v.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Section · Leadership snapshot */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              The people behind Treel.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              Treel is led by founder Manish Ingale, with a leadership team drawn from tyre engineering, enterprise software, and fleet operations.
            </p>
            <div className="pt-2">
              <Link href="/leadership" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-sm bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                Meet the full leadership team <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* CTA band */}
      <section className="py-20 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Come build with us.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              We are hiring across engineering, product, and go-to-market. If you want to work on mobility intelligence at scale, look at what&apos;s open.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link href="/careers" className="px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-sm bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831] flex items-center gap-2">
                See open roles <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" className="px-7 py-3.5 rounded-[4px] font-medium text-sm transition-all border border-[#94A3B8]/30 text-[#FAF7F2] hover:border-[#D5573B]">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
