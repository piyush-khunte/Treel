import type { Metadata } from "next";
import Link from "next/link";
import { 
  FileText, 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  AlertCircle, 
  Mail, 
  MapPin, 
  Phone, 
  Building2,
  ExternalLink,
  ChevronRight,
  Shield,
  HelpCircle
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service · Treel",
  description:
    "Treel's Terms of Service. Terms governing use of treel.in, TMIP, Project Suraksha, Personal TPMS, and related mobility intelligence services.",
  alternates: {
    canonical: "https://treel.in/terms",
  },
  openGraph: {
    title: "Terms of Service · Treel",
    description:
      "Treel's Terms of Service. Terms governing use of treel.in, TMIP, Project Suraksha, Personal TPMS, and related mobility intelligence services.",
    url: "https://treel.in/terms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TermsPage() {
  const sections = [
    { id: "acceptance", title: "1. Introduction & Acceptance of Terms" },
    { id: "using-services", title: "2. Using Treel Mobility Solutions Services" },
    { id: "product-likeness", title: "3. Exact Likeness of the Product" },
    { id: "pricing-payment", title: "4. Pricing, Orders & Payment Terms" },
    { id: "warranties-disclaimers", title: "5. Warranties & Disclaimers" },
    { id: "liability", title: "6. Limitation of Liability" },
    { id: "third-party", title: "7. Access to Third-Party Services" },
    { id: "user-obligations", title: "8. User Obligations & Conduct" },
    { id: "intellectual-property", title: "9. Proprietary Rights & Intellectual Property" },
    { id: "indemnity", title: "10. Indemnification" },
    { id: "dispute-resolution", title: "11. Dispute Resolution & Arbitration" },
    { id: "governing-law", title: "12. Governing Law & Jurisdiction" },
    { id: "modifications", title: "13. Modifications & Entire Understanding" },
    { id: "consent", title: "14. User Consent & Electronic Communications" },
    { id: "contact", title: "15. Contact Us & Legal Notices" },
  ];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-white/[0.08]">
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
                { label: "Terms of Service" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
                LEGAL &amp; COMPLIANCE
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Terms of <span className="italic font-normal text-[#D5573B]">Service.</span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] pt-2">
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                Effective: 1 October 2026
              </span>
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                Last updated: 1 October 2026
              </span>
              <span className="text-[#D5573B]">treel.in</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN CONTENT WITH SIDEBAR NAVIGATION */}
      <div className="py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#D5573B] font-semibold flex items-center gap-2">
                  <FileText className="w-3.5 h-3.5" />
                  Table of Contents
                </div>
                <nav className="space-y-1 text-sm font-inter">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block py-1.5 px-2.5 rounded-md text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/[0.04] transition-colors text-xs leading-relaxed"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
                <div className="pt-4 border-t border-white/[0.08] text-xs text-[#94A3B8] space-y-2 font-mono">
                  <p>Related Legal Documents:</p>
                  <div className="flex flex-col gap-1.5 font-sans text-xs">
                    <Link href="/privacy" className="text-[#D5573B] hover:underline flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> Privacy Policy
                    </Link>
                    <Link href="/cookies" className="text-[#D5573B] hover:underline flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> Cookie Policy
                    </Link>
                    <Link href="/gdpr" className="text-[#D5573B] hover:underline flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> GDPR Compliance
                    </Link>
                    <Link href="/personal/support/warranty" className="text-[#D5573B] hover:underline flex items-center gap-1">
                      <ChevronRight className="w-3 h-3" /> Warranty Policy
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Document Body */}
            <main className="lg:col-span-8 space-y-16 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-inter">
              
              {/* Section 1 */}
              <section id="acceptance" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  1. Introduction &amp; Acceptance of Terms
                </h2>
                <p>
                  These Terms of Service (&quot;Terms&quot;, &quot;Agreement&quot;) constitute a legally binding agreement between you (&quot;User&quot;, &quot;you&quot;, or &quot;your&quot;) and <strong className="text-[#FAF7F2] font-semibold">Treel Mobility Solutions Private Limited</strong> (&quot;Treel&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), governing your access to and use of the website located at <Link href="/" className="text-[#D5573B] underline hover:text-[#CB4831]">treel.in</Link>, our mobile applications, hardware sensors, Vehicle Digital Twin telematics, and related mobility intelligence services.
                </p>
                <p>
                  By browsing, accessing, or using our website, purchasing any Treel hardware product, or subscribing to our software solutions, you acknowledge that you have read, understood, and agree to be bound by these Terms, together with our <Link href="/privacy" className="text-[#D5573B] underline hover:text-[#CB4831]">Privacy Policy</Link> and <Link href="/cookies" className="text-[#D5573B] underline hover:text-[#CB4831]">Cookie Policy</Link>.
                </p>
                <p>
                  If you are entering into this Agreement on behalf of a company, enterprise fleet operator, or other legal entity, you represent and warrant that you possess the requisite legal authority to bind such entity to these Terms. If you do not agree with any part of these Terms, you must immediately cease all access to and use of our website and services.
                </p>
              </section>

              {/* Section 2 */}
              <section id="using-services" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  2. Using Treel Mobility Solutions Services
                </h2>
                <p>
                  Treel designs, manufactures, and deploys advanced IoT sensor systems, connected tyre pressure monitoring solutions (TPMS), and enterprise mobility telematics across commercial and consumer vehicles. Our core offerings include:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-2">
                    <h3 className="text-base font-semibold text-[#FAF7F2]">
                      <Link href="/tmip" className="hover:text-[#D5573B] transition-colors">TMIP Enterprise</Link>
                    </h3>
                    <p className="text-xs text-[#94A3B8]">
                      Enterprise Vehicle Digital Twin platform for commercial fleet operators, delivered with custom contracts and enterprise SLAs.
                    </p>
                  </div>
                  <div className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-2">
                    <h3 className="text-base font-semibold text-[#FAF7F2]">
                      <Link href="/suraksha" className="hover:text-[#D5573B] transition-colors">Project Suraksha</Link>
                    </h3>
                    <p className="text-xs text-[#94A3B8]">
                      Commercial tyre safety kit for owner-drivers and small fleets, available with convenient EMI options and Truck Wheels installation.
                    </p>
                  </div>
                  <div className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-2">
                    <h3 className="text-base font-semibold text-[#FAF7F2]">
                      <Link href="/personal" className="hover:text-[#D5573B] transition-colors">Personal TPMS</Link>
                    </h3>
                    <p className="text-xs text-[#94A3B8]">
                      Bluetooth sensor kits for passenger cars and motorcycles with iOS/Android app integration and real-time alerts.
                    </p>
                  </div>
                </div>

                <p className="pt-2">
                  You agree to use the services solely for vehicle monitoring, fleet management, and tyre safety operations in full compliance with manufacturer guidelines and Indian automotive regulations (including ARAI standards).
                </p>
              </section>

              {/* Section 3 */}
              <section id="product-likeness" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  3. Exact Likeness of the Product
                </h2>
                <p>
                  We make every effort to display the colors, dimensions, specifications, and physical attributes of our hardware sensors, valve assemblies, and packaging as accurately as possible on the website. However, actual physical products, packaging design, and mobile application interfaces may vary slightly due to ongoing product improvements, component revisions, or display settings on your device.
                </p>
                <p>
                  All technical specifications, certified battery lifespans, operating temperature thresholds, and pressure measurement tolerances are verified under controlled testing conditions. Minor cosmetic variations that do not affect functionality do not constitute a defect or failure of likeness.
                </p>
              </section>

              {/* Section 4 */}
              <section id="pricing-payment" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  4. Pricing, Orders &amp; Payment Terms
                </h2>
                <p>
                  All prices listed on <Link href="/personal/buy" className="text-[#D5573B] underline hover:text-[#CB4831]">treel.in</Link> are quoted in Indian Rupees (INR) and are inclusive of applicable Goods and Services Tax (GST) unless explicitly noted otherwise. Treel reserves the right to modify product pricing, promotional discounts, and shipping fees at any time without prior notice.
                </p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>
                    <strong className="text-[#FAF7F2] font-semibold">Payment Gateways:</strong> Online transactions are securely processed through RBI-authorized payment aggregators (including Razorpay, UPI, credit cards, debit cards, net banking, and Cash on Delivery where applicable). Treel does not store raw credit/debit card numbers on its servers.
                  </li>
                  <li>
                    <strong className="text-[#FAF7F2] font-semibold">Financing &amp; EMI:</strong> Project Suraksha EMI financing options are underwritten and administered directly by partner NBFCs (such as Bajaj Finance). Approval of loan applications is at the sole discretion of the financing partner.
                  </li>
                  <li>
                    <strong className="text-[#FAF7F2] font-semibold">Order Acceptance:</strong> Receipt of an electronic order confirmation does not signify our final acceptance of your order. Treel reserves the right to cancel or limit quantities on any order due to inventory constraints, pricing errors, or suspicion of fraud.
                  </li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="warranties-disclaimers" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  5. Warranties &amp; Disclaimers
                </h2>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] leading-[1.2]">
                      5.1 Product Warranties
                    </h3>
                    <p>
                      Treel provides specific limited manufacturer warranties against material defects and craftsmanship for its hardware products:
                    </p>
                    <ul className="list-disc pl-6 space-y-1.5 text-base">
                      <li>
                        <strong className="text-[#FAF7F2] font-semibold">Personal TPMS:</strong> Backed by our standard 1-year limited warranty. For detailed terms, claims, and coverage exclusions, visit our <Link href="/personal/support/warranty" className="text-[#D5573B] underline hover:text-[#CB4831]">Warranty Policy</Link>.
                      </li>
                      <li>
                        <strong className="text-[#FAF7F2] font-semibold">Project Suraksha:</strong> Covered under the commercial vehicle warranty terms printed on the product warranty card and documented on <Link href="/suraksha/product" className="text-[#D5573B] underline hover:text-[#CB4831]">Suraksha Product Specifications</Link>.
                      </li>
                      <li>
                        <strong className="text-[#FAF7F2] font-semibold">TMIP Enterprise Hardware &amp; Telematics:</strong> Governed by the specific warranty terms, SLAs, and hardware replacement clauses defined in your Master Services Agreement (MSA).
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] leading-[1.2]">
                      5.2 Website &amp; Software Disclaimer
                    </h3>
                    <p>
                      Our website, applications, and digital dashboards are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. To the fullest extent permitted by applicable Indian law, Treel makes no representations or warranties of any kind, express or implied, regarding:
                    </p>
                    <ul className="list-disc pl-6 space-y-1 text-base">
                      <li>Uninterrupted, secure, or error-free operation of the website or cloud telemetry backend;</li>
                      <li>The absolute accuracy, completeness, or timeliness of website content, articles, or calculator estimates;</li>
                      <li>Continuous wireless connectivity where cellular networks, Bluetooth interference, or satellite signals are disrupted.</li>
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2">
                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] leading-[1.2]">
                      5.3 Disclaimer of Implied Warranties
                    </h3>
                    <p>
                      Except as expressly stated in our written product warranties, Treel disclaims all implied warranties, including but not limited to implied warranties of merchantability, fitness for a particular commercial purpose, title, and non-infringement.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section id="liability" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  6. Limitation of Liability
                </h2>
                <p>
                  To the maximum extent permitted by applicable law, in no event shall Treel Mobility Solutions Private Limited, its directors, officers, employees, affiliates, or licensors be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-base">
                  <li>Loss of revenue, business profits, goodwill, or commercial contracts;</li>
                  <li>Vehicle downtime, cargo delays, towing charges, or indirect operational losses;</li>
                  <li>Loss of telemetry data or corruption of electronic records caused by external telecom carrier outages.</li>
                </ul>
                <p className="pt-2">
                  Treel&apos;s aggregate liability for all claims arising out of or relating to your use of our products, website, or services—whether in contract, tort (including negligence), or otherwise—shall not exceed the total amount actually paid by you to Treel for the specific product or service giving rise to the claim in the twelve (12) months preceding the incident.
                </p>
                <p>
                  Nothing in these Terms limits or excludes liability that cannot be legally limited under Indian law, including liability for death or personal injury resulting from proven gross negligence, or willful misconduct.
                </p>
              </section>

              {/* Section 7 */}
              <section id="third-party" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  7. Access to Third-Party Services
                </h2>
                <p>
                  Our services and website may integrate with or provide links to third-party platforms, such as payment processors (Razorpay), shipping carriers (Shiprocket), telecommunication providers, vehicle dealerships, and tyre fitment centres (including JK Tyre Truck Wheels).
                </p>
                <p>
                  Treel does not control and is not responsible for the content, security, availability, or privacy practices of such third-party providers. Your access to third-party services is governed by the respective terms and privacy policies of those providers.
                </p>
              </section>

              {/* Section 8 */}
              <section id="user-obligations" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  8. User Obligations &amp; Conduct
                </h2>
                <p>By using Treel website and services, you agree that you will not:</p>
                <ul className="list-disc pl-6 space-y-2 text-base">
                  <li>Provide false, inaccurate, misleading, or fraudulent information during registration or checkout;</li>
                  <li>Reverse-engineer, decompile, disassemble, or attempt to derive the source code or proprietary firmware of Treel sensors or telematics hardware;</li>
                  <li>Probe, scan, or test the vulnerability of our systems, networks, or API endpoints without prior written authorization;</li>
                  <li>Upload, inject, or transmit any malware, viruses, worms, or malicious code designed to disrupt normal telemetry operations;</li>
                  <li>Resell, sublicense, or redistribute Treel products or software subscriptions without an authorized dealership agreement;</li>
                  <li>Violate any local, state, national, or international laws, including vehicle safety and data privacy statutes.</li>
                </ul>
              </section>

              {/* Section 9 */}
              <section id="intellectual-property" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  9. Proprietary Rights &amp; Intellectual Property
                </h2>
                <p>
                  All software, algorithms, Vehicle Digital Twin models, sensor architectures, valve designs, circuit diagrams, trademarks, logos, brand names, website copy, graphics, and documentation are the exclusive intellectual property of <strong className="text-[#FAF7F2] font-semibold">Treel Mobility Solutions Private Limited</strong> or its licensors.
                </p>
                <p>
                  Treel holds certified patents across India, the United States, and the European Union for its proprietary tyre telemetry and predictive thermal pressure algorithms. You are granted a limited, revocable, non-exclusive, non-transferable license to access the website and use purchased hardware in accordance with this Agreement. No rights are granted by implication or estoppel.
                </p>
              </section>

              {/* Section 10 */}
              <section id="indemnity" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  10. Indemnification
                </h2>
                <p>
                  You agree to defend, indemnify, and hold harmless Treel Mobility Solutions Private Limited, its parent company, subsidiaries, directors, employees, and authorized agents from and against any third-party claims, damages, liabilities, losses, costs, or expenses (including reasonable legal fees) arising out of or related to:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-base">
                  <li>Your breach of these Terms of Service;</li>
                  <li>Your improper installation, modification, or misuse of Treel sensor hardware;</li>
                  <li>Your violation of any applicable law or infringement of any third-party intellectual property or privacy right.</li>
                </ul>
              </section>

              {/* Section 11 */}
              <section id="dispute-resolution" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  11. Dispute Resolution &amp; Arbitration
                </h2>
                <p>
                  <strong className="text-[#FAF7F2] font-semibold">Informal Resolution:</strong> In the event of any controversy, claim, or dispute arising out of or relating to these Terms, the parties shall first attempt in good faith to resolve the dispute amicably by sending written notice to <a href="mailto:hello@treel.in" className="text-[#FAF7F2] underline hover:text-[#D5573B]">hello@treel.in</a>.
                </p>
                <p>
                  <strong className="text-[#FAF7F2] font-semibold">Arbitration:</strong> If the dispute is not resolved within thirty (30) days of notice, it shall be referred to and finally resolved by binding arbitration in accordance with the Indian Arbitration and Conciliation Act, 1996 (as amended). The arbitration shall be conducted by a sole arbitrator mutually appointed by the parties. The seat and venue of arbitration shall be <strong className="text-[#FAF7F2]">Pune, Maharashtra, India</strong>, and the language of proceedings shall be English.
                </p>
              </section>

              {/* Section 12 */}
              <section id="governing-law" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  12. Governing Law &amp; Jurisdiction
                </h2>
                <p>
                  These Terms of Service, and any contractual or non-contractual disputes arising from them, shall be governed by, construed, and enforced in accordance with the laws of the <strong className="text-[#FAF7F2]">Republic of India</strong>, without giving effect to any principles of conflict of laws.
                </p>
                <p>
                  Subject to the arbitration agreement in Section 11, the competent civil courts located in <strong className="text-[#FAF7F2]">Pune, Maharashtra, India</strong> shall have exclusive jurisdiction over all legal proceedings.
                </p>
              </section>

              {/* Section 13 */}
              <section id="modifications" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  13. Modifications &amp; Entire Understanding
                </h2>
                <p>
                  Treel reserves the right to modify or replace these Terms at any time. When we make material changes, we will update the &quot;Last updated&quot; date at the top of this page and post a prominent notice on our website. Your continued use of the website or services following the posting of revisions constitutes full acceptance of the revised Terms.
                </p>
                <p>
                  These Terms, together with the Privacy Policy, Cookie Policy, and any signed Master Services Agreement, constitute the entire agreement between you and Treel regarding the subject matter hereof, superseding all prior proposals or understandings.
                </p>
              </section>

              {/* Section 14 */}
              <section id="consent" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  14. User Consent &amp; Electronic Communications
                </h2>
                <p>
                  By using our services, you consent to receive electronic communications from Treel, including order confirmations, invoices, warranty updates, safety notices, and customer support responses via email, SMS, or WhatsApp. You agree that all agreements, notices, and disclosures provided electronically satisfy any legal requirement that such communications be in writing.
                </p>
              </section>

              {/* Section 15 */}
              <section id="contact" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  15. Contact Us &amp; Legal Notices
                </h2>
                <p>
                  For questions regarding these Terms of Service, legal notices, or formal correspondence, please reach out to our legal department:
                </p>
                
                <div className="p-6 sm:p-8 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-4">
                  <div>
                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] leading-[1.2]">
                      Legal &amp; Compliance Department
                    </h3>
                    <p className="text-sm text-[#94A3B8]">Treel Mobility Solutions Private Limited</p>
                  </div>
                  <div className="space-y-2.5 text-sm text-[#94A3B8]">
                    <p className="flex items-center gap-2.5">
                      <Mail className="w-4 h-4 text-[#D5573B] shrink-0" />
                      <span>Legal Inquiries: <a href="mailto:hello@treel.in" className="text-[#FAF7F2] underline hover:text-[#D5573B]">hello@treel.in</a></span>
                    </p>
                    <p className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#D5573B] shrink-0" />
                      <span>Toll-Free Support: <a href="tel:18008330233" className="text-[#FAF7F2] underline hover:text-[#D5573B]">1800 833 0233</a></span>
                    </p>
                    <p className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#D5573B] mt-0.5 shrink-0" />
                      <span>Registered Office: S.No. 6/1B, 6/4, 7/4, Plot No. 02, Laxmi Vishnupuram Amenities Business, NDA Road, Village Shivane, Tal. Haveli, Pune, Maharashtra 411023, India</span>
                    </p>
                  </div>
                </div>
              </section>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
}