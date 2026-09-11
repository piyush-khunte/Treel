import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service  \u00b7  Treel",
  description: "Treel's Terms of Service. Terms governing use of treel.in, TMIP, Project Suraksha, Personal TPMS, and related services.",
  alternates: {
    canonical: "https://treel.in/terms",
  },
  openGraph: {
    title: "Terms of Service  \u00b7  Treel",
    description: "Treel's Terms of Service. Terms governing use of treel.in, TMIP, Project Suraksha, Personal TPMS, and related services.",
    url: "https://treel.in/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">Terms of Service</h1>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">LEGAL</div>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Table of contents (in-page anchor nav)**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">1. Acceptance of terms</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">2. Description of services</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">3. User obligations</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">4. Intellectual property</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">5. Warranties and disclaimers</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">6. Limitation of liability</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">7. Indemnification</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">8. Dispute resolution</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">9. Governing law</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">10. Modifications to terms</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">11. Contact us</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>H1: Terms of Service</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Effective date: `1 October 2026</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Last updated: `1 October 2026</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">By accessing treel.in, purchasing or using any Treel product (TMIP, Project Suraksha, Personal TPMS), or engaging any Treel service, you agree to be bound by these Terms of Service and our <Link href="/privacy" className="underline hover:text-white transition-colors">Privacy Policy</Link>.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">If you do not agree with these terms, please do not use our website or services.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">If you are entering into these terms on behalf of a company or other legal entity, you represent that you have the authority to bind that entity.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
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
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
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
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
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
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**5.1 · Product warranties**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Specific product warranties are documented separately:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**5.2 · Website disclaimer**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Our website is provided "as is" and "as available". Treel makes no warranties, express or implied, regarding:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**5.3 · No indirect warranties**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Except as expressly stated, Treel disclaims all implied warranties including merchantability, fitness for a particular purpose, and non-infringement.</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Personal TPMS** — see the <Link href="/personal/support/warranty" className="underline hover:text-white transition-colors">warranty page</Link></span>
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
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">To the maximum extent permitted by applicable law, Treel shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, goodwill, or business opportunities, arising from your use of our website or services.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel's aggregate liability for any claim relating to our products or services shall not exceed the amount you paid to Treel for the specific product or service giving rise to the claim in the twelve months preceding the claim.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Nothing in this section limits liability that cannot be limited under applicable Indian law (such as liability for death or personal injury caused by negligence, or fraud).</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
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
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**8.1 · Good faith resolution**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Before initiating formal proceedings, we encourage you to contact us at **hello@treel.in** to resolve any dispute in good faith.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**8.2 · Arbitration**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Any dispute arising from or relating to these terms shall be resolved through arbitration in Pune, India, under the Arbitration and Conciliation Act 1996 (as amended). The arbitration shall be conducted by a sole arbitrator appointed by mutual agreement, or failing agreement, by a competent Indian court.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**8.3 · Jurisdiction**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Subject to the arbitration clause above, the courts of Pune, Maharashtra shall have exclusive jurisdiction for any matter not resolved through arbitration.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">These Terms of Service are governed by the laws of India, without regard to conflict of law principles.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel may update these Terms of Service from time to time. Material changes will be notified through the website. Continued use of our services after changes indicates acceptance of the updated terms. Prior versions are available on request.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">For questions about these Terms of Service:</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Treel Mobility Solutions Private Limited**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Email: **hello@treel.in**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Phone: **1800 833 0233**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Address: S.No. 6/1B, 6/4, 7/4, Plot No. 02, Laxmi Vishnupuram Amenities Business, NDA Road, Village Shivane, Tal. Haveli, Pune, Maharashtra 411023</p>
          </div>
        </div>
      </section>
    </div>
  );
}