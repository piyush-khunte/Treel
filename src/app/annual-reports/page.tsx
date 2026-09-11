import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, ShieldCheck, Activity, HelpCircle, ChevronRight, MessageSquare, PhoneCall, Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Annual Reports  \u00b7  Treel Mobility Solutions",
  description: "Statutory annual reports and annual returns of Treel Mobility Solutions Private Limited. Published annually for compliance and transparency.",
  alternates: {
    canonical: "https://treel.in/annual-reports",
  },
  openGraph: {
    title: "Annual Reports  \u00b7  Treel Mobility Solutions",
    description: "Statutory annual reports and annual returns of Treel Mobility Solutions Private Limited. Published annually for compliance and transparency.",
    url: "https://treel.in/annual-reports",
  },
};

export default function AnnualReportsPage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B] mb-4">
              ANNUAL REPORTS
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">Annual reports and statutory filings.</h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">Treel Mobility Solutions Private Limited publishes its annual returns and reports here, as required by Indian company law and as part of our commitment to transparency.</p>
          </div>
        </div>
      </section>

      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">[DEV: This section is dynamically populated from the admin panel. Reports uploaded with year, type, publish date metadata. Grouped by financial year.]</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Report entry format (grouped by FY, most recent first):</p>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter pt-2">Financial Year 2025-26</p>
            <p className="text-[#FAF7F2] text-base sm:text-lg font-semibold leading-relaxed font-inter pt-2">Financial Year 2024-25</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Report type: Annual Report</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Published: [Date]</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Format: PDF</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Report type: Annual Return</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Published: [Date]</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Format: PDF</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="#" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                Download <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">Compliance & transparency</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Treel Mobility Solutions Private Limited files its annual returns and reports with the Ministry of Corporate Affairs (MCA) as required under Section 92 and Section 137 of the Companies Act 2013. Full filings are available on the MCA portal at <Link href="https://www.mca.gov.in" className="text-[#D5573B] underline hover:text-white transition-colors">www.mca.gov.in</Link>. The reports published on this page are the same documents filed with the Registrar of Companies, published here for stakeholder convenience.</p>
          </div>
        </div>
      </section>
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">Corporate & compliance queries</h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">For queries related to annual reports, corporate filings, or compliance matters, please contact us.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">## Appendix A  ·  Reference data used in this content</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Facts and copy elements pulled from the current treel.in website (accessed September 2026):</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Contact information:**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Social media handles (all under @jktreel):**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Product credentials:**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Prior brand voice references (used as continuity anchors, not repeated verbatim):**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Existing customer testimonials (available for reference on relevant pages):**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Company facts:**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">## Appendix B  ·  Placeholders requiring client input</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">Every `` marker in the content above, consolidated for one-shot client input. The development team can build against placeholder content; these items can be swapped in when client provides.</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">*End of Phase 1 (Master brand). Phase 2 content follows below.*</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">## 03  ·  TMIP Content  ·  26 pages  ·  Phase 2 part 1</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Voice standards specific to TMIP:**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**TMIP nav labels:**</p>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">**Primary CTA (top-right):** `Book a demo  →`</p>
            <ul className="space-y-3 pt-2">
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Toll-Free: 1800 833 0233</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Mobile: 91120 00174</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Email: hello@treel.in</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Office address: Treel Mobility Solutions Private Limited, S.No.6/1B, 6/4, 7/4, Plot No.02, Laxmi Vishnupuram Amenities Business, NDA Road, Vill. Shivane, Tal. Haveli, Pune, Maharashtra 411023</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Google Maps: https://maps.app.goo.gl/VjJUeqtM8iBgHsXH8</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>LinkedIn: https://www.linkedin.com/company/jktreel/</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Facebook: https://www.facebook.com/jktreel/</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Instagram: https://www.instagram.com/jktreel/</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>YouTube: https://youtube.com/@jktreel5290</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>ARAI certification</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Warranty: 5 years car sensor, 3 years bike sensor, 1 year upgrade kit</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Made in India, benchmarked against international TPMS standards</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>&quot;Whatever road you choose, choose safety&quot;</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>&quot;Now see the unforeseen&quot;</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>&quot;A TPMS that&apos;s more than just a TPMS&quot;</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>&quot;Turn money leaks into profit peaks&quot; (prior Enterprise framing)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>TMaaS (Tyre Management as a Service)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Mohan Sundaram (JK Tire TREEL TPMS car product)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Narender Kirar (life saving tool for Indian roads)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Rajiv Tiwari (amazing gadget, prompt after-sales)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Dinanath Kavanekar (customer support satisfaction)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Founded: 12 April 2018</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Legal name: Treel Mobility Solutions Private Limited</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Ownership: JK Tyre technology company</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Full leadership team roster:** names, roles, headshots, 60-word bios per person, LinkedIn URLs. Confirmed references from internal conversations: Nithin (Engineering Manager), Atharv (PM/BA), Pradnya Choudhary (Hardware Lead), Imran Khan (CFO). Need names, roles, and bios for full executive team, plus board members and advisors.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Board & advisors composition:** especially JK Tyre representation on the Treel board.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Manish Ingale&apos;s handwritten signature image:** for founder note signature block.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Professional photography:** founder portraits, leadership headshots, group team photos, culture/office photography.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Approximate dates for milestones in Our Story timeline:**</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>First 100 enterprise customers milestone</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>TMIP formal enterprise platform launch</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Complete list of historical annual reports and annual returns:** for FY 2018-19 through FY 2024-25, with PDF files.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**TMIP customer names willing to be publicly listed** on `/tmip/customers` logo wall (or approval to use &quot;[CUSTOMER 1-12]&quot; placeholder framing at launch).</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**1,000-truck case study operational metrics:** non-JK-Tyre-penetration numbers we can publish (fuel savings %, tyre life extension %, downtime reduction, etc.) specific to that fleet.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**OEM partner logos and permission to display:** Tata Motors, Mahindra & Mahindra, Ashok Leyland, and any others.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**TMS partner logos:** Fleetx, Locus, LogiNext, and any others.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Finance partner logos:** Bajaj Finance, Shriram Finance, and any others.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Distribution partner logos:** JK Tyre, Truck Wheels, and any others.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Whitepapers referenced:** The Fleet ROI and Fuel Savings Paper (Oct 2026), The 1,000-Truck Case Study (Nov 2026 Week 11), The Vehicle Digital Twin Technical Paper (Q4 next year). These are separate content deliverables, not website copy.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Individual insight articles:** launch with 6-10 seed articles across the six categories.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Individual press releases:** launch with 2-3 seed releases (e.g., &quot;Treel launches Suraksha&quot;, &quot;Treel launches new brand identity&quot;).</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**The founder note draft on `/founder-note`** was written on Manish&apos;s behalf using facts from public record and prior conversations. Manish should read, edit as needed, and approve before publish. This is the highest E-E-A-T weight page on the site.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**Business hours confirmation:** currently written as Monday-Friday, 9:00 AM to 6:00 PM IST. Confirm.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>**24/7 emergency support for enterprise customers:** confirm this is offered and via what channel.</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>&quot;Vehicle Digital Twin&quot; (capitalised, always)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>&quot;The mobility intelligence platform&quot;</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>&quot;Book a demo&quot; (not &quot;request a demo&quot;, not &quot;get started&quot; — &quot;Book a demo&quot;)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Cost is always &quot;cost per kilometre&quot; (spelled out), not &quot;CPK&quot; or &quot;cost/km&quot;</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Never use &quot;solution&quot; as a noun (it is a lazy word)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Never say &quot;unlock&quot; or &quot;leverage&quot; (marketing tics that dilute technical credibility)</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Platform</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Solutions</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Customers</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>Insights</span>
              </li>
              <li className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter flex items-start gap-3">
                <span className="text-[#D5573B] mt-1.5 font-bold">•</span>
                <span>API</span>
              </li>
            </ul>
            <div className="pt-6">
              <Link href="/contact" className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[4px] font-semibold text-sm transition-all shadow-md bg-[#D5573B] text-[#FAF7F2] hover:bg-[#CB4831]">
                Contact us <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}