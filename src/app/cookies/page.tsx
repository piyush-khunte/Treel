import type { Metadata } from "next";
import Link from "next/link";
import { CookiePreferencesManager } from "./cookie-preferences";
import { Shield, Lock, Sliders, ExternalLink, Mail, Phone, MapPin, CheckCircle2, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Cookie Policy  ·  Treel",
  description: "How Treel uses cookies and similar technologies on treel.in. Cookie categories, consent management, and how to update your preferences.",
  alternates: {
    canonical: "https://treel.in/cookies",
  },
  openGraph: {
    title: "Cookie Policy  ·  Treel",
    description: "How Treel uses cookies and similar technologies on treel.in. Cookie categories, consent management, and how to update your preferences.",
    url: "https://treel.in/cookies",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesPage() {
  const sections = [
    { id: "what-are-cookies", title: "1. What are cookies" },
    { id: "categories", title: "2. Cookie categories we use" },
    { id: "manage-preferences", title: "3. Manage your preferences" },
    { id: "third-parties", title: "4. Cookies set by third parties" },
    { id: "changes", title: "5. Changes to this policy" },
    { id: "contact", title: "6. Contact us" },
  ];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Header & Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
                LEGAL & COMPLIANCE
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Cookie Policy
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] pt-2">
              <span>Effective October 1, 2026</span>
              <span className="text-white/20">·</span>
              <span>Last updated October 1, 2026</span>
              <span className="text-white/20">·</span>
              <span className="text-[#D5573B]">treel.in</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Table of Contents / Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-28 p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-6">
              <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] flex items-center gap-2 leading-[1.2]">
                <Sliders className="w-4 h-4 text-[#D5573B]" />
                Policy Sections
              </h3>
              <nav className="space-y-2">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block text-sm text-[#94A3B8] hover:text-[#FAF7F2] hover:translate-x-1 transition-all py-1.5 border-b border-white/[0.04] last:border-0"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-white/[0.08] space-y-3">
                <div className="text-xs font-mono text-[#94A3B8] uppercase tracking-wider">
                  Quick Action
                </div>
                <CookiePreferencesManager />
              </div>
            </div>
          </aside>

          {/* Detailed Content */}
          <main className="lg:col-span-8 space-y-16">
            {/* Section 1 */}
            <section id="what-are-cookies" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[#D5573B] font-mono text-sm font-semibold">01</span>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] leading-[1.12]">
                  What are cookies
                </h2>
              </div>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Cookies are small text files placed on your device when you visit a website. They allow the website to remember your actions and preferences (such as language, region, and login state) over time. Similar technologies (local storage, pixels, tags) serve related purposes.
              </p>
            </section>

            {/* Section 2 */}
            <section id="categories" className="scroll-mt-28 space-y-8">
              <div className="flex items-center gap-3">
                <span className="text-[#D5573B] font-mono text-sm font-semibold">02</span>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] leading-[1.12]">
                  Cookie categories we use
                </h2>
              </div>
              <p className="text-[#94A3B8] text-base leading-relaxed font-inter">
                We use four categories of cookies on treel.in:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 2.1 Strictly necessary */}
                <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] leading-[1.2]">
                      2.1 · Strictly necessary cookies
                    </h3>
                    <span className="text-[10px] font-mono uppercase bg-[#D5573B]/20 text-[#D5573B] border border-[#D5573B]/30 px-2 py-0.5 rounded">
                      Always active
                    </span>
                  </div>
                  <p className="text-sm text-[#94A3B8]">
                    Required for the website to function. Cannot be disabled. Include:
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-white/[0.04]">
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>Session cookies (remember your cart, form inputs)</span>
                    </li>
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>Security cookies (protect against fraud)</span>
                    </li>
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>Cookie consent state (remember your preferences on this page)</span>
                    </li>
                  </ul>
                </div>

                {/* 2.2 Functional */}
                <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] leading-[1.2]">
                      2.2 · Functional cookies
                    </h3>
                    <span className="text-[10px] font-mono uppercase bg-white/10 text-white/70 px-2 py-0.5 rounded">
                      Opt-in
                    </span>
                  </div>
                  <p className="text-sm text-[#94A3B8]">
                    Enhance your experience but not required. Include:
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-white/[0.04]">
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>Language and region preferences</span>
                    </li>
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>Recently viewed products</span>
                    </li>
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>Contact form pre-fill (returning visitors)</span>
                    </li>
                  </ul>
                </div>

                {/* 2.3 Analytics */}
                <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] leading-[1.2]">
                      2.3 · Analytics cookies
                    </h3>
                    <span className="text-[10px] font-mono uppercase bg-white/10 text-white/70 px-2 py-0.5 rounded">
                      Opt-in
                    </span>
                  </div>
                  <p className="text-sm text-[#94A3B8]">
                    Help us understand how visitors use the website. Include:
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-white/[0.04]">
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>Google Analytics (page views, session duration, referrers)</span>
                    </li>
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>Microsoft Clarity (heatmaps, session recordings, anonymised)</span>
                    </li>
                  </ul>
                  <p className="text-xs text-[#94A3B8] italic pt-1">
                    We do not use analytics cookies to identify individual visitors. Data is aggregated.
                  </p>
                </div>

                {/* 2.4 Marketing */}
                <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] leading-[1.2]">
                      2.4 · Marketing cookies
                    </h3>
                    <span className="text-[10px] font-mono uppercase bg-white/10 text-white/70 px-2 py-0.5 rounded">
                      Opt-in
                    </span>
                  </div>
                  <p className="text-sm text-[#94A3B8]">
                    Deliver relevant marketing across our channels. Include:
                  </p>
                  <ul className="space-y-2 pt-2 border-t border-white/[0.04]">
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>Meta (Facebook, Instagram) advertising pixels</span>
                    </li>
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>Google Ads conversion tracking</span>
                    </li>
                    <li className="text-xs text-[#94A3B8] flex items-start gap-2">
                      <span className="text-[#D5573B] mt-0.5">•</span>
                      <span>LinkedIn insight tag</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="manage-preferences" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[#D5573B] font-mono text-sm font-semibold">03</span>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] leading-[1.12]">
                  Manage your preferences
                </h2>
              </div>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                You can update your cookie preferences at any time:
              </p>
              <ul className="space-y-4">
                <li className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <span className="text-[#D5573B] mt-1 font-bold">•</span>
                  <div className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                    <strong className="text-[#FAF7F2]">Through our cookie consent banner</strong> — click the &quot;Configure&quot; button when it appears, or use the &quot;Cookie preferences&quot; link in the footer
                  </div>
                </li>
                <li className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <span className="text-[#D5573B] mt-1 font-bold">•</span>
                  <div className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                    <strong className="text-[#FAF7F2]">Through your browser settings</strong> — most browsers allow you to block or delete cookies; instructions vary by browser
                  </div>
                </li>
                <li className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-3">
                  <span className="text-[#D5573B] mt-1 font-bold">•</span>
                  <div className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                    <strong className="text-[#FAF7F2]">Through platform-specific opt-outs</strong> — Google Analytics opt-out browser add-on; Meta&apos;s ad preferences page
                  </div>
                </li>
              </ul>

              {/* In-page CTA */}
              <div className="pt-4">
                <CookiePreferencesManager />
              </div>
            </section>

            {/* Section 4 */}
            <section id="third-parties" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[#D5573B] font-mono text-sm font-semibold">04</span>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] leading-[1.12]">
                  Cookies set by third parties
                </h2>
              </div>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Some cookies are set by third-party services we use (Google Analytics, Meta, Razorpay chat, Magic Flow AI, YouTube video embeds). These third parties have their own privacy and cookie policies which govern their use of cookies.
              </p>
            </section>

            {/* Section 5 */}
            <section id="changes" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[#D5573B] font-mono text-sm font-semibold">05</span>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] leading-[1.12]">
                  Changes to this policy
                </h2>
              </div>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                We update this Cookie Policy when we add, remove, or change cookies. The &quot;Last updated&quot; date reflects the current version.
              </p>
            </section>

            {/* Section 6 */}
            <section id="contact" className="scroll-mt-28 space-y-6">
              <div className="flex items-center gap-3">
                <span className="text-[#D5573B] font-mono text-sm font-semibold">06</span>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] leading-[1.12]">
                  Contact us
                </h2>
              </div>
              <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
                Questions about our cookie use? Email <a href="mailto:dpo@treel.in" className="text-[#D5573B] font-semibold hover:underline">dpo@treel.in</a> or contact <a href="mailto:hello@treel.in" className="text-[#D5573B] font-semibold hover:underline">hello@treel.in</a>.
              </p>

              <div className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono text-[#D5573B] uppercase tracking-wider font-semibold">
                  DATA PROTECTION & COMPLIANCE OFFICE
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-[#94A3B8]">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#D5573B] shrink-0" />
                    <span>dpo@treel.in / hello@treel.in</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#D5573B] shrink-0" />
                    <span>1800 833 0233</span>
                  </div>
                  <div className="sm:col-span-2 flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#D5573B] shrink-0 mt-0.5" />
                    <span>S.No. 6/1B, 6/4, 7/4, Plot No. 02, Laxmi Vishnupuram Amenities Business, NDA Road, Village Shivane, Tal. Haveli, Pune, Maharashtra 411023</span>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
