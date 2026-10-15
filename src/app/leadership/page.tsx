import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, ExternalLink, MapPin } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { LeadershipTeam } from "./leadership-team";

export const metadata: Metadata = {
  title: "Leadership  ·  Treel",
  description: "The team leading Treel Mobility Solutions. Founder Manish Ingale and the executive team building India's mobility intelligence company.",
  alternates: {
    canonical: "https://treel.in/leadership",
  },
  openGraph: {
    title: "Leadership  ·  Treel",
    description: "The team leading Treel Mobility Solutions. Founder Manish Ingale and the executive team building India's mobility intelligence company.",
    url: "https://treel.in/leadership",
  },
};

export default function LeadershipPage() {
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
                { label: "Leadership" },
              ]}
            />
            <div className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B] mb-6 sm:mb-8">
              LEADERSHIP
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              The people building Treel.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              A leadership team drawn from tyre engineering, enterprise software, and fleet operations. All operating from Pune. All accountable for one mobility intelligence company.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Card (Hero Treatment) */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl">
            <div className="p-8 sm:p-12 rounded-lg bg-white/[0.03] border border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-8 items-center shadow-xl">
              {/* Founder Portrait Visual Area */}
              <div className="md:col-span-5 flex flex-col items-center justify-center">
                <div className="w-full max-w-[280px] aspect-[4/5] rounded-lg bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] border border-white/[0.08] relative overflow-hidden shadow-inner">
                  <div className="absolute inset-0 bg-white/5 opacity-40" />
                </div>
              </div>

              {/* Founder Bio */}
              <div className="md:col-span-7 space-y-5">
                <div className="space-y-1">
                  <div className="text-xs font-jetbrains font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                    FOUNDER PROFILE
                  </div>
                  <h2 className="font-fraunces text-3xl font-medium text-[#FAF7F2]">
                    Manish Ingale
                  </h2>
                  <div className="text-sm font-jetbrains font-mono text-[#94A3B8]">Founder, Treel Mobility Solutions</div>
                </div>

                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-inter">
                  Founded Treel in 2018 with the conviction that India&apos;s commercial vehicles were producing more data than any company was reading. Previously in senior engineering roles across the tyre and mobility industries. Believes the vehicle is the unit of intelligence, not the component.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    href="/founder-note"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-sm"
                  >
                    <span>Read the founder note</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Team Grid */}
      <section className="py-20 border-b border-white/10" id="executive-team">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-[1020px] mx-auto space-y-8">
            <div className="space-y-2">
              <div className="text-xs font-jetbrains font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                LEADERSHIP ROSTER
              </div>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Executive Team
              </h2>
            </div>

            <LeadershipTeam />
          </div>
        </div>
      </section>

      {/* Board & Advisors Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
              Board &amp; advisors
            </h2>
            <div className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-3 text-sm font-semibold text-[#FAF7F2]">
                <Building2 className="w-5 h-5 text-[#D5573B]" />
                <span>Governance &amp; Industrial Advisory</span>
              </div>
              <p className="text-sm text-[#94A3B8] leading-relaxed font-inter">
                Treel operates with independent board governance backed by senior leadership representation from automotive manufacturing, and software engineering leaders in India and global markets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HQ Map Section */}
      <section className="py-20 border-b border-white/10" aria-label="Treel Headquarters location">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <div className="w-full aspect-[21/9] sm:aspect-[24/9] min-h-[240px] rounded-lg border border-white/[0.08] relative overflow-hidden bg-[#0F1419]">
              <iframe
                title="TREEL Mobility Solutions Pvt Ltd Location Map"
                src="https://maps.google.com/maps?q=18.4656793,73.7797432+(TREEL%20Mobility%20Solutions%20Pvt%20Ltd)&t=m&z=17&hl=en&output=embed"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 pointer-events-none flex flex-wrap items-center justify-between gap-3 bg-gradient-to-t from-[#0F1419]/90 via-[#0F1419]/40 to-transparent">
                <div className="flex items-center gap-2 text-xs font-jetbrains font-mono text-[#FAF7F2] bg-[#0F1419]/90 backdrop-blur-sm px-3 py-1.5 rounded-[4px] border border-white/10 shadow-sm pointer-events-auto">
                  <MapPin className="w-3.5 h-3.5 text-[#D5573B] shrink-0" />
                  <span>Treel HQ · Pune, Maharashtra</span>
                </div>
                <a
                  href="https://www.google.com/maps/place/TREEL+Mobility+Solutions+Pvt+Ltd+%7C+Connected+TPMS+For+Cars+%26+Bikes/@18.4656793,73.7797432,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc295dee13682b9:0x4ef2d97acc01263d!8m2!3d18.4656793!4d73.7797432!16s%2Fg%2F11g1lj848x"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-1.5 text-xs font-jetbrains font-mono font-medium text-[#FAF7F2] bg-[#0F1419]/90 hover:bg-[#D5573B] backdrop-blur-sm px-3 py-1.5 rounded-[4px] border border-white/10 hover:border-[#D5573B] transition-colors shadow-sm pointer-events-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5573B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1419]"
                  aria-label="Get directions to TREEL Mobility Solutions Pvt Ltd on Google Maps (opens in a new tab)"
                >
                  <span>Get directions</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-20 border-b border-white/10 bg-white/[0.02]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Interested in joining?
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              We are hiring. See what&apos;s open, or drop us a note if you don&apos;t see the right role.
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
