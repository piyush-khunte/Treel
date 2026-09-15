import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight, MessageSquare } from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";

export const metadata: Metadata = {
  title: "Manish Ingale · Founder Note · Treel",
  description: "Why Manish Ingale founded Treel: the moment India's commercial vehicles began producing more data than anyone was reading, and why the category moved from tyre monitoring to mobility intelligence.",
  alternates: {
    canonical: "https://treel.in/founder-note",
  },
  openGraph: {
    title: "Manish Ingale · Founder Note · Treel",
    description: "Why Manish Ingale founded Treel: the moment India's commercial vehicles began producing more data than anyone was reading, and why the category moved from tyre monitoring to mobility intelligence.",
    url: "https://treel.in/founder-note",
    type: "article",
    authors: ["Manish Ingale"],
  },
};

export default function FounderNotePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What I saw before I started Treel.",
    "author": {
      "@type": "Person",
      "name": "Manish Ingale",
      "jobTitle": "Founder & CEO",
      "worksFor": {
        "@type": "Organization",
        "name": "Treel Mobility Solutions"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Treel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://treel.in/images/logo.png"
      }
    },
    "datePublished": "2026-09-01",
    "description": "Why Manish Ingale founded Treel: the moment India's commercial vehicles began producing more data than anyone was reading."
  };

  return (
    <article className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. HERO SECTION */}
      <header className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                FOUNDER NOTE
              </span>
              <TreelSignature variant="compact" />
            </div>

            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              What I saw before I started Treel.
            </h1>

            <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8]">
              <span>By Manish Ingale, Founder</span>
              <span className="text-white/20">·</span>
              <span>Published September 2026</span>
              <span className="text-white/20">·</span>
              <span className="text-[#D5573B]">~6 min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. ARTICLE PROSE BODY */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-8 text-base sm:text-lg text-[#CBD5E1] leading-relaxed font-inter">
            <p className="font-medium text-[#FAF7F2] text-xl sm:text-2xl font-fraunces leading-relaxed">
              I remember the first time I watched a truck driver check his tyre pressure with a rock.
            </p>

            <p>
              He held the rock in one hand, hit each tyre with a small, practiced strike, and listened. Not for anything specific — just for the sound to match what he expected. It matched all six times. He was satisfied. He drove off.
            </p>

            <p>
              That was fleet management in India, one truck at a time, on the side of a highway in Maharashtra. Multiply that moment by two hundred million commercial vehicles and you have the problem I started Treel to solve. Not the rock. The fog.
            </p>

            <p>
              The fog is what fleet owners knew was there but could not see. They knew which trucks they owned. They knew what they paid for fuel. They knew when a truck broke down. Between those three data points was every operating decision they had to make. They made those decisions with instinct because there was nothing else.
            </p>

            <div className="my-10 p-8 rounded-lg bg-white/[0.03] border-l-4 border-[#D5573B]">
              <p className="font-fraunces text-xl sm:text-2xl text-[#FAF7F2] italic leading-snug">
                &ldquo;I had spent enough years in the tyre industry to know that the tyre is the most talkative component in a commercial vehicle. If you can listen to a tyre, you can hear the vehicle. If you can hear the vehicle, you can reason about the fleet.&rdquo;
              </p>
            </div>

            <p>
              We started at the tyre because that is where the conversation began. But we knew from the first day that the tyre was the entry point, not the destination. The destination was always the vehicle. And the vehicle, once you can hear it, becomes something no fleet operator has had before: a queryable object. An intelligence surface. What we now call the Vehicle Digital Twin.
            </p>

            <p>
              The category had a name for what we were doing back then. They called it tyre monitoring. It was an accurate name for a small idea. What we are actually doing is bigger, and the industry is catching up to the words for it. We call it mobility intelligence, and we call the company that operates it Treel.
            </p>

            <p>
              We are not the only company in this space. We do not need to be. India&apos;s commercial vehicle industry is large enough that the category will support several serious players who can move from monitoring to intelligence with discipline and speed. What we are trying to be is the company that defines what mobility intelligence means, ships the platform that operationalises it, and earns the customers who trust it with their fleets.
            </p>

            <p>
              Two hundred enterprise customers now trust us with sixty-eight thousand vehicles. Our platform is up 99.7 percent of the time. Our median customer sees their investment pay back in nine months. These are not the numbers of an experiment. They are the numbers of a company that has moved from a hypothesis to an operating category.
            </p>

            <p>
              But this is still Day One. India&apos;s commercial vehicle fleet will grow to three hundred million vehicles in the next decade. Every one of them is a signal. Every signal is an insight. Every insight, in the right operator&apos;s hands, becomes a decision that saves fuel, extends tyre life, prevents a blowout, or gets a shipment to its destination on time.
            </p>

            <p>
              We are backed by JK Tyre, one of India&apos;s most trusted commercial tyre brands, which gives us five decades of tyre engineering, national distribution reach, and the operational credibility that only a real industrial partner can lend a young platform company. We operate independently on product, platform, and go-to-market. The relationship works because both sides are clear about what each does best.
            </p>

            <div className="space-y-4 pt-4">
              <p>
                If you are a fleet operator considering TMIP, know that we sell only when the payback math works for you. If it does not, we walk away.
              </p>
              <p>
                If you are an owner-driver considering Suraksha, know that we built it in the vernacular of your region, at a price that pays for itself in nine months, without asking you to download an app or pay a monthly fee.
              </p>
              <p>
                If you are considering Personal TPMS for your car, know that it is the same underlying technology our enterprise customers trust their fleets to.
              </p>
              <p>
                If you are considering joining us, know that we are building something that has not been built in India before, and we have room for people who want to help build it.
              </p>
            </div>

            <p className="font-medium text-[#FAF7F2] pt-4">
              Every vehicle a signal. Every signal an insight. This is what we do at Treel.
            </p>

            <p className="pt-2">
              Thank you for reading.
            </p>

            {/* Signature Block */}
            <div className="pt-10 border-t border-white/10 space-y-2">
              <TreelSignature variant="divider" />
              <div className="font-fraunces text-2xl text-[#FAF7F2] font-medium pt-2">
                Manish Ingale
              </div>
              <div className="text-xs font-mono text-[#94A3B8]">
                Founder &amp; CEO, Treel Mobility Solutions Pvt. Ltd. · Pune, India
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONTINUE READING STRIP */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-medium tracking-tight text-[#FAF7F2]">
              Continue reading
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/about" className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">About Treel</h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">The mobility intelligence company. History, mission, and operating values.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read overview <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/our-story" className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Our Story</h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">Eight years of milestones from Pune to 68,000 commercial vehicles.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  Explore timeline <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
              <Link href="/vehicle-digital-twin" className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group block">
                <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">Vehicle Digital Twin</h3>
                <p className="text-xs text-[#94A3B8] mt-2 leading-relaxed">How real-time telemetry turns raw physical motion into a queryable object.</p>
                <div className="mt-4 font-semibold text-xs text-[#D5573B] flex items-center gap-1 group-hover:gap-2 transition-all">
                  View architecture <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TALK TO US CTA BAND */}
      <section className="py-20 border-b border-white/10 bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Talk to us.
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              Whether you are a fleet operator, a partner, a journalist, or a candidate, we would like to hear from you.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]"
              >
                <span>Get in touch</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
}