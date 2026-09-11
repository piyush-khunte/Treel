import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Suraksha Blog  \u00b7  Truck Driver Community  \u00b7  Fuel, Safety, Business Tips",
  description: "Truck driver community blog. Fuel efficiency tips, monsoon safety, GST for owner-drivers, route planning, and industry updates. In Hinglish, for drivers.",
  alternates: {
    canonical: "https://treel.in/suraksha/blog",
  },
  openGraph: {
    title: "Suraksha Blog  \u00b7  Truck Driver Community  \u00b7  Fuel, Safety, Business Tips",
    description: "Truck driver community blog. Fuel efficiency tips, monsoon safety, GST for owner-drivers, route planning, and industry updates. In Hinglish, for drivers.",
    url: "https://treel.in/suraksha/blog",
  },
};

export default function SurakshaBlogPage() {
  return (
    <div className="space-y-0 bg-[#111315] text-[#FAF7F2] font-rubik">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#E65100] bg-[#E65100]/10 border-[#E65100]/30 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">BLOG</div>
            <h1 className="font-anton uppercase tracking-wide text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">DRIVERS KA BLOG.</h1>
            <p className="text-[#A3A3A3] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl">Truck driving community ke liye practical content — fuel efficiency, monsoon safety, route planning, GST for owner-drivers, aur industry updates. Sab kuch Hinglish mein, aap ke liye.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Filter chips: All  ·  Fuel efficiency  ·  Safety  ·  Business & GST  ·  Route planning  ·  Industry news  ·  Maintenance</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Overline: `FEATURED</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Category badge</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>H1 (Hinglish): [Featured article title]</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Excerpt (200 chars, Hinglish)</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/suraksha/blog/[slug" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                Padhiye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Card format:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Sample blog topics for launch (10-15 seed articles):**</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Fuel efficiency category:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Safety category:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Business & GST category:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Route planning category:</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">Industry news category:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Featured image</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Category badge (Hinglish label)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Title (Hinglish)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Excerpt (100 chars)</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Author + date</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>Reading time</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Fuel Efficiency Ke 10 Simple Tips Jo Har Driver Ko Pata Hone Chahiye"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Kya Aap Ka Truck Zyada Fuel Kha Raha Hai? 5 Warning Signs"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Right Tyre Pressure Se Fuel Kaise Bachaayein"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Monsoon Season Mein Truck Safety — Must-Know Tips"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Front Tyre Blowout Se Kaise Bachein"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Highway Driving — 7 Safety Rules Jo Life Bachate Hai"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Owner-Drivers Ke Liye GST Basics — 2026 Update"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Truck Insurance — Kya Cover Hota Hai Aur Kya Nahi"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Fastag Aur Toll — Complete Guide"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"India Ke Best Truck Stops — Cluster-wise Guide"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Long-Haul Trip Planning — Fatigue Management Tips"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"New Vehicle Scrappage Policy — Owner-Drivers Ke Liye Kya Matlab"</span>
              </li>
              <li className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#E65100] mt-1.5 font-bold">•</span>
                <span>"Diesel Prices — 2026 Trends aur Impact"</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                Padhiye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-wide text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#FAF7F2]">Blog updates chahiye?</h2>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">WhatsApp par new articles ka notification chahiye toh subscribe kariye. No spam, sirf useful content.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**RSS link:** Available via RSS: <Link href="/suraksha/blog/rss.xml" className="underline hover:text-white transition-colors">/suraksha/blog/rss.xml</Link></p>
            <div className="pt-6">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all shadow-md bg-[#E65100] text-[#FAF7F2] hover:bg-[#F57C00]">
                WhatsApp par subscribe <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">*End of Phase 3 (Suraksha). Phase 4 (Legal + System + SEO infrastructure) content follows below.*</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">## 06  ·  Legal & Policies  ·  8 pages  ·  Phase 4 part 1</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Legal review note (for Treel):** The content below is drafted to be compliant with the India Digital Personal Data Protection Act 2023, the Information Technology Act 2000 (as amended), Consumer Protection Act 2019, and consumer-facing e-commerce norms. It is drafted from public regulatory guidance and industry best practice. **A qualified advocate should review before publication.** Where specific commercial terms are contested, edit with counsel and re-issue. Version and effective date on every page make future updates easy to track.</p>
            <p className="text-[#A3A3A3] text-base sm:text-lg leading-relaxed font-rubik">**Legal pages carry Master brand nav + Master footer** — they do not use product-brand chrome. This keeps legal content unified across product surfaces.</p>
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