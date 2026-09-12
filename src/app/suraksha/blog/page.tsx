import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Suraksha Blog  ·  Truck Driver Community  ·  Fuel, Safety, Business Tips",
  description: "Truck driver community blog. Fuel efficiency tips, monsoon safety, GST for owner-drivers, route planning, and industry updates. In Hinglish, for drivers.",
  alternates: {
    canonical: "https://treel.in/suraksha/blog",
  },
  openGraph: {
    title: "Suraksha Blog  ·  Truck Driver Community  ·  Fuel, Safety, Business Tips",
    description: "Truck driver community blog. Fuel efficiency tips, monsoon safety, GST for owner-drivers, route planning, and industry updates. In Hinglish, for drivers.",
    url: "https://treel.in/suraksha/blog",
  },
};

export default function SurakshaBlogPage() {
  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik selection:bg-[#DC2626]/20 min-h-screen">
      <section className="relative overflow-hidden pt-24 pb-20 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-[#DC2626] bg-[#DC2626]/10 text-[#DC2626] font-rubik text-xs font-bold uppercase tracking-wider">
              BLOG
            </div>
            <h1 className="font-anton uppercase tracking-normal text-4xl sm:text-5xl lg:text-6xl text-[#451A03] leading-[1.05]">
              DRIVERS KA BLOG.
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik max-w-3xl">
              Truck driving community ke liye practical content — fuel efficiency, monsoon safety, route planning, GST for owner-drivers, aur industry updates. Sab kuch Hinglish mein, aap ke liye.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl">
            <div className="p-6 bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg shadow-sm">
              <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-medium">
                Filter chips: All  ·  Fuel efficiency  ·  Safety  ·  Business & GST  ·  Route planning  ·  Industry news  ·  Maintenance
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6 bg-[#FEF3C7] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
            <ul className="space-y-3 pt-2">
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Overline: `FEATURED</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Category badge</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>H1 (Hinglish): [Featured article title]</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Excerpt (200 chars, Hinglish)</span>
              </li>
            </ul>
            <div className="pt-4">
              <Link href="/suraksha/blog/[slug" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-sm bg-[#DC2626] text-white hover:bg-[#B91C1C]">
                Padhiye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6 bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Card format:</p>
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-bold">**Sample blog topics for launch (10-15 seed articles):**</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Fuel efficiency category:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Safety category:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Business & GST category:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Route planning category:</p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik font-semibold">Industry news category:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Featured image</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Category badge (Hinglish label)</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Title (Hinglish)</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Excerpt (100 chars)</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Author + date</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>Reading time</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Fuel Efficiency Ke 10 Simple Tips Jo Har Driver Ko Pata Hone Chahiye&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Kya Aap Ka Truck Zyada Fuel Kha Raha Hai? 5 Warning Signs&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Right Tyre Pressure Se Fuel Kaise Bachaayein&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Monsoon Season Mein Truck Safety — Must-Know Tips&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Front Tyre Blowout Se Kaise Bachein&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Highway Driving — 7 Safety Rules Jo Life Bachate Hai&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Owner-Drivers Ke Liye GST Basics — 2026 Update&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Truck Insurance — Kya Cover Hota Hai Aur Kya Nahi&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Fastag Aur Toll — Complete Guide&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;India Ke Best Truck Stops — Cluster-wise Guide&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Long-Haul Trip Planning — Fatigue Management Tips&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;New Vehicle Scrappage Policy — Owner-Drivers Ke Liye Kya Matlab&quot;</span>
              </li>
              <li className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik flex items-start gap-3">
                <span className="text-[#DC2626] mt-1.5 font-bold">•</span>
                <span>&quot;Diesel Prices — 2026 Trends aur Impact&quot;</span>
              </li>
            </ul>
            <div className="pt-4">
              <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-sm bg-[#DC2626] text-white hover:bg-[#B91C1C]">
                Padhiye <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-anton uppercase tracking-normal text-2xl sm:text-3xl lg:text-4xl text-[#451A03]">
              Blog updates chahiye?
            </h2>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">
              WhatsApp par new articles ka notification chahiye toh subscribe kariye. No spam, sirf useful content.
            </p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">
              **RSS link:** Available via RSS: <Link href="/suraksha/blog/rss.xml" className="text-[#DC2626] underline font-medium hover:text-[#B91C1C] transition-colors">/suraksha/blog/rss.xml</Link>
            </p>
            <div className="pt-4">
              <Link href="/suraksha/whatsapp" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-sm bg-[#DC2626] text-white hover:bg-[#B91C1C]">
                WhatsApp par subscribe <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-b-2 border-[#451A03]/10 bg-[#FEF3C7]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6 bg-[#FFFBEB] border-2 border-[#451A03]/15 rounded-lg p-6 sm:p-8 shadow-sm">
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">
              *End of Phase 3 (Suraksha). Phase 4 (Legal + System + SEO infrastructure) content follows below.*
            </p>
            <p className="text-[#451A03] text-base sm:text-lg leading-relaxed font-rubik font-bold">
              ## 06  ·  Legal & Policies  ·  8 pages  ·  Phase 4 part 1
            </p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">
              **Legal review note (for Treel):** The content below is drafted to be compliant with the India Digital Personal Data Protection Act 2023, the Information Technology Act 2000 (as amended), Consumer Protection Act 2019, and consumer-facing e-commerce norms. It is drafted from public regulatory guidance and industry best practice. **A qualified advocate should review before publication.** Where specific commercial terms are contested, edit with counsel and re-issue. Version and effective date on every page make future updates easy to track.
            </p>
            <p className="text-[#78350F] text-base sm:text-lg leading-relaxed font-rubik">
              **Legal pages carry Master brand nav + Master footer** — they do not use product-brand chrome. This keeps legal content unified across product surfaces.
            </p>
            <div className="pt-4">
              <Link href="/suraksha/centres" className="inline-flex items-center gap-2 px-6 py-3 rounded-[4px] font-rubik font-bold text-xs uppercase tracking-wider transition-all shadow-sm bg-[#DC2626] text-white hover:bg-[#B91C1C]">
                Nearest Centre <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}