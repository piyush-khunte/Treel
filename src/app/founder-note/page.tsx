import { Breadcrumb } from "@/components/ui/breadcrumb";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What I saw before I started Treel · Manish Ingale, Founder · Treel",
  description: "Why Manish Ingale founded Treel: from watching a truck driver check tyre pressure with a stick on a Maharashtra highway to operating Vehicle Digital Twins for 68,000 commercial vehicles.",
  alternates: {
    canonical: "https://treel.in/founder-note",
  },
  openGraph: {
    title: "What I saw before I started Treel · Manish Ingale, Founder · Treel",
    description: "Why Manish Ingale founded Treel: from watching a truck driver check tyre pressure with a stick on a Maharashtra highway to operating Vehicle Digital Twins for 68,000 commercial vehicles.",
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
        "url": "https://treel.in/images/treel%20main%20logo.jpg"
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
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Founder's Note" },
              ]}
            />
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                FOUNDER NOTE
              </span>
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
              I remember the first time I watched a truck driver check his tyre pressure with a stick.
            </p>

            <p>
              He held the stick in one hand, tapped each tyre with a short, practiced strike, and listened. He was not listening for anything specific. He only wanted the sound to match what he expected. It matched all six times. He was satisfied. He drove off.
            </p>

            <p>
              That was fleet management in India, one truck at a time, on the side of a highway in Maharashtra. Multiply that moment by nearly 40 lakh heavy trucks and you have the problem I started Treel to solve. Not the stick. The fog.
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
              But this is still Day One. India&apos;s truck fleet keeps growing every year. Every truck is a signal. Every signal is an insight. Every insight, in the right operator&apos;s hands, becomes a decision that saves fuel, extends tyre life, prevents a blowout, or gets a shipment to its destination on time.
            </p>

            <p>
              Treel is an official partner of JK Tyre. That partnership gives us five decades of tyre engineering, national distribution reach, and the operational credibility that only a real industrial partner can lend a young platform company. We operate independently on product, platform, and go-to-market. The relationship works because both sides are clear about what each does best.
            </p>

            <div className="space-y-4 pt-4">
              <p>
                If you need clear visibility across a large fleet, and a payback that holds up before you sign, choose <Link href="/tmip" className="text-[#3B82F6] hover:underline font-medium">TMIP</Link>. We sell only when the numbers work for you. If they do not, we walk away.
              </p>
              <p>
                If you drive your own truck and need tyre safety in your own language, with no app to download and no monthly fee, choose <Link href="/suraksha" className="text-[#F59E0B] hover:underline font-medium">Suraksha</Link>. It pays for itself in nine months.
              </p>
              <p>
                If you need peace of mind on your car&apos;s tyres, choose <Link href="/personal" className="text-[#10B981] hover:underline font-medium">Personal TPMS</Link>. It runs on the same technology our enterprise customers trust with their fleets.
              </p>
              <p>
                If you want to build something India has not built before, <Link href="/about#team" className="text-[#D5573B] hover:underline font-medium">join us</Link>. We have room for people who want to help build it.
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