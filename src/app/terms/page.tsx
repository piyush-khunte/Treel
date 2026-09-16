import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck, FileText, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service · Treel",
  description: "Treel's Terms of Service. Terms governing use of treel.in, TMIP, Project Suraksha, Personal TPMS, and related services.",
  alternates: {
    canonical: "https://treel.in/terms",
  },
  openGraph: {
    title: "Terms of Service · Treel",
    description: "Treel's Terms of Service. Terms governing use of treel.in, TMIP, Project Suraksha, Personal TPMS, and related services.",
    url: "https://treel.in/terms",
  },
};

const toc = [
  { id: "acceptance", label: "1. Acceptance of terms" },
  { id: "services", label: "2. Description of services" },
  { id: "obligations", label: "3. User obligations" },
  { id: "ip", label: "4. Intellectual property" },
  { id: "warranties", label: "5. Warranties and disclaimers" },
  { id: "liability", label: "6. Limitation of liability" },
  { id: "indemnification", label: "7. Indemnification" },
  { id: "disputes", label: "8. Dispute resolution" },
  { id: "governing-law", label: "9. Governing law" },
  { id: "modifications", label: "10. Modifications to terms" },
  { id: "contact", label: "11. Contact us" },
];

export default function TermsPage() {
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
            <div className="flex items-center gap-3">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                LEGAL &amp; COMPLIANCE
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Terms of <span className="italic font-normal text-[#D5573B]">Service.</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] pt-2">
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                Effective: 1 October 2026
              </span>
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                Last updated: 1 October 2026
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TABLE OF CONTENTS */}
      <section className="py-12 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl rounded-xl border border-white/10 bg-[#0F1419] p-6 sm:p-8 space-y-4">
            <div className="text-xs font-mono font-semibold uppercase tracking-widest text-[#D5573B]">
              TABLE OF CONTENTS
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
              {toc.map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-xs text-[#94A3B8] hover:text-[#D5573B] transition-colors py-1 flex items-center gap-1.5 group"
                >
                  <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-[#D5573B]" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">By accessing treel.in, purchasing or using any Treel product (TMIP, Project Suraksha, Personal TPMS), or engaging any Treel service, you agree to be bound by these Terms of Service and our <Link href="/privacy" className="text-[#D5573B] underline hover:text-[#CB4831] transition-colors">Privacy Policy</Link>.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">If you do not agree with these terms, please do not use our website or services.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">If you are entering into these terms on behalf of a company or other legal entity, you represent that you have the authority to bind that entity.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel provides:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Each product may have additional terms specific to it, disclosed at the point of purchase or in a signed enterprise agreement. Where product-specific terms conflict with these general Terms of Service, the product-specific terms prevail for that product.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**TMIP** — an enterprise Vehicle Digital Twin platform for fleet operators, sold under contract with customized terms</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Project Suraksha** — a safety kit for commercial vehicle owner-drivers, sold as a one-time purchase</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Personal TPMS** — a consumer tyre pressure monitoring system, sold as a one-time purchase with app support</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Related services** — customer support, warranty service, financing coordination (via Bajaj Finance), installation network access</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">By using our website and services, you agree to:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Provide accurate, current, and complete information when requested</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Use our services only for lawful purposes</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Not attempt to reverse-engineer, decompile, or copy our proprietary software or hardware</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Not misrepresent your identity or affiliation</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Not use our services to harm, harass, defame, or threaten any person</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Not upload malicious code, viruses, or other harmful content</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Comply with all applicable laws and regulations</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Respect the intellectual property rights of Treel and third parties</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">All content on treel.in and all Treel products, software, sensors, dashboards, and documentation are the intellectual property of Treel Mobility Solutions Private Limited or its licensors, and are protected by Indian and international intellectual property laws.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">You are granted a limited, non-exclusive, non-transferable license to use our website and products for their intended purpose. This license does not permit you to:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">User-generated content (product reviews, testimonials, blog comments) remains your property, but you grant Treel a non-exclusive, worldwide, royalty-free license to use, reproduce, and display it in connection with our services.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Copy, modify, distribute, sell, or lease any part of our services</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Reverse-engineer or extract our source code</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Remove any proprietary notices or labels</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Use our trademarks, logos, or brand elements without written permission</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">5.1 · Product warranties</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Specific product warranties are documented separately:</p>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">5.2 · Website disclaimer</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Our website is provided &quot;as is&quot; and &quot;as available&quot;. Treel makes no warranties, express or implied, regarding:</p>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">5.3 · No indirect warranties</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Except as expressly stated, Treel disclaims all implied warranties including merchantability, fitness for a particular purpose, and non-infringement.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Personal TPMS** — see the <Link href="/personal/support/warranty" className="text-[#D5573B] underline hover:text-[#CB4831] transition-colors">warranty page</Link></span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Project Suraksha** — see product warranty card and `/suraksha/product</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**TMIP** — governed by enterprise contract terms</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Uninterrupted or error-free operation of the website</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>The accuracy, completeness, or timeliness of website content</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Third-party links or content displayed on the website</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">To the maximum extent permitted by applicable law, Treel shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or business opportunities, arising from your use of our website or services.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel&apos;s aggregate liability for any claim relating to our products or services shall not exceed the amount you paid to Treel for the specific product or service giving rise to the claim in the twelve months preceding the claim.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Nothing in this section limits liability that cannot be limited under applicable Indian law (such as liability for death or personal injury caused by negligence, or fraud).</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">You agree to indemnify and hold harmless Treel Mobility Solutions Private Limited, its officers, directors, employees, and affiliates from any claims, damages, losses, or expenses (including reasonable legal fees) arising from:</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Your violation of these terms</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Your use of our services in violation of applicable law</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Your infringement of any third-party rights</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">8.1 · Good faith resolution</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Before initiating formal proceedings, we encourage you to contact us at **hello@treel.in** to resolve any dispute in good faith.</p>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">8.2 · Arbitration</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Any dispute arising from or relating to these terms shall be resolved through arbitration in Pune, India, under the Arbitration and Conciliation Act 1996 (as amended). The arbitration shall be conducted by a sole arbitrator appointed by mutual agreement, or failing agreement, by a competent Indian court.</p>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">8.3 · Jurisdiction</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Subject to the arbitration clause above, the courts of Pune, Maharashtra shall have exclusive jurisdiction for any matter not resolved through arbitration.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">These Terms of Service are governed by the laws of India, without regard to conflict of law principles.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel may update these Terms of Service from time to time. Material changes will be notified through the website. Continued use of our services after changes indicates acceptance of the updated terms. Prior versions are available on request.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">For questions about these Terms of Service:</p>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter">Treel Mobility Solutions Private Limited</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Email: **hello@treel.in**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Phone: **1800 833 0233**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Address: S.No. 6/1B, 6/4, 7/4, Plot No. 02, Laxmi Vishnupuram Amenities Business, NDA Road, Village Shivane, Tal. Haveli, Pune, Maharashtra 411023</p>
          </div>
        </div>
      </section>
    </div>
  );
}