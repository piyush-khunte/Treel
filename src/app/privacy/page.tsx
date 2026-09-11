import type { Metadata } from "next";
import Link from "next/link";
import { 
  Shield, 
  Lock, 
  FileText, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  ChevronRight,
  CheckCircle2
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy  ·  Treel",
  description: "Treel's privacy policy. How we collect, use, share, and protect your personal data. Compliant with India DPDP Act 2023.",
  alternates: {
    canonical: "https://treel.in/privacy",
  },
  openGraph: {
    title: "Privacy Policy  ·  Treel",
    description: "Treel's privacy policy. How we collect, use, share, and protect your personal data. Compliant with India DPDP Act 2023.",
    url: "https://treel.in/privacy",
  },
};

export default function PrivacyPage() {
  const sections = [
    { id: "introduction", title: "1. Introduction" },
    { id: "information-we-collect", title: "2. Information we collect" },
    { id: "how-we-use-your-information", title: "3. How we use your information" },
    { id: "how-we-share-your-information", title: "4. How we share your information" },
    { id: "data-retention", title: "5. Data retention" },
    { id: "your-rights", title: "6. Your rights under DPDP Act 2023" },
    { id: "data-security", title: "7. Data security" },
    { id: "cookies", title: "8. Cookies and tracking technologies" },
    { id: "international-transfers", title: "9. International data transfers" },
    { id: "childrens-privacy", title: "10. Children's privacy" },
    { id: "changes-to-policy", title: "11. Changes to this policy" },
    { id: "contact-dpo", title: "12. Contact our Data Protection Officer" },
  ];

  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      {/* Header & Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#D5573B] bg-[#D5573B]/10 border-[#D5573B]/20 font-mono text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full inline-block">
              LEGAL
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]">
              Privacy Policy
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] pt-2">
              <span>Effective date: 1 October 2026</span>
              <span className="text-white/20">·</span>
              <span>Last updated: 1 October 2026</span>
              <span className="text-white/20">·</span>
              <span>Reading time: ~10 min</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with In-Page Navigation */}
      <div className="py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#D5573B] font-semibold">
                  Table of Contents
                </div>
                <nav className="space-y-1 text-sm font-inter">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block py-1.5 px-2.5 rounded-md text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/[0.04] transition-colors"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Document Body */}
            <main className="lg:col-span-8 space-y-16 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-inter">
              {/* Section 1 */}
              <section id="introduction" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  1. Introduction
                </h2>
                <p>
                  Treel Mobility Solutions Private Limited (referred to as &quot;Treel&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting the privacy of individuals who interact with our website (treel.in), our products (TMIP, Project Suraksha, Personal TPMS), and our services.
                </p>
                <p>
                  This Privacy Policy explains how we collect, use, share, retain, and protect personal data in accordance with the India Digital Personal Data Protection Act 2023 (the &quot;DPDP Act&quot;) and other applicable Indian laws.
                </p>
                <p>
                  By using treel.in or our products and services, you consent to the collection and use of your information in accordance with this policy.
                </p>
              </section>

              {/* Section 2 */}
              <section id="information-we-collect" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  2. Information we collect
                </h2>

                <div className="space-y-3">
                  <h3 className="font-fraunces text-xl font-semibold text-[#FAF7F2]">
                    2.1 Information you provide directly
                  </h3>
                  <p>We collect personal data you provide when you:</p>
                  <ul className="list-disc pl-6 space-y-1.5 text-base">
                    <li>Request a product demo or trial</li>
                    <li>Purchase a Treel product (through treel.in or through a Truck Wheels centre)</li>
                    <li>Submit an enquiry through a contact form</li>
                    <li>Apply for financing through our Bajaj Finance partnership</li>
                    <li>Subscribe to our newsletter or blog updates</li>
                    <li>Register for warranty or claim a warranty</li>
                    <li>Interact with our customer support team</li>
                    <li>Apply for employment</li>
                  </ul>
                  <p className="pt-2">The categories of personal data collected typically include:</p>
                  <ul className="list-disc pl-6 space-y-1.5 text-base">
                    <li>Name, email address, phone number, mobile number</li>
                    <li>Company name, role, industry (for enterprise contacts)</li>
                    <li>Delivery address, billing address (for e-commerce transactions)</li>
                    <li>Vehicle registration number and truck details (for Suraksha and TMIP)</li>
                    <li>Aadhar, PAN, and financial documents (for EMI applications, per Bajaj Finance requirements)</li>
                    <li>Payment details (processed by Razorpay; we do not store payment card data)</li>
                    <li>Any other information you voluntarily submit</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="font-fraunces text-xl font-semibold text-[#FAF7F2]">
                    2.2 Information collected automatically
                  </h3>
                  <p>When you use treel.in, we collect certain information automatically through cookies, log files, and analytics tools:</p>
                  <ul className="list-disc pl-6 space-y-1.5 text-base">
                    <li>IP address, device type, browser type, operating system</li>
                    <li>Pages visited, time spent, navigation patterns</li>
                    <li>Referring URLs and outbound clicks</li>
                    <li>Approximate geographic location (city/state level)</li>
                  </ul>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="font-fraunces text-xl font-semibold text-[#FAF7F2]">
                    2.3 Information from Treel product usage
                  </h3>
                  <p>When you use a Treel product (TMIP, Suraksha, or Personal TPMS), the product generates operational data about the connected vehicle:</p>
                  <ul className="list-disc pl-6 space-y-1.5 text-base">
                    <li>Tyre pressure, temperature, and related sensor readings</li>
                    <li>Vehicle location (only for products with GPS-enabled telematics)</li>
                    <li>Driver behaviour indicators (for TMIP enterprise deployments)</li>
                    <li>Usage patterns and system health metrics</li>
                  </ul>
                  <p className="pt-2">
                    This operational data is stored in your Vehicle Digital Twin and used to deliver the product&apos;s core functionality.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section id="how-we-use-your-information" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  3. How we use your information
                </h2>
                <p>We use personal data for the following purposes:</p>
                <ul className="space-y-3 text-base">
                  <li className="flex items-start gap-3">
                    <span className="text-[#D5573B] font-bold mt-1">•</span>
                    <span><strong className="text-[#FAF7F2]">To provide our products and services</strong> — fulfilling orders, delivering Vehicle Digital Twin functionality, generating alerts, running the ROI calculator, providing customer support.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D5573B] font-bold mt-1">•</span>
                    <span><strong className="text-[#FAF7F2]">To process transactions</strong> — payment processing, EMI applications, shipment coordination, warranty claims, refunds.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D5573B] font-bold mt-1">•</span>
                    <span><strong className="text-[#FAF7F2]">To communicate with you</strong> — order confirmations, tracking updates, warranty notifications, support responses, service updates.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D5573B] font-bold mt-1">•</span>
                    <span><strong className="text-[#FAF7F2]">To improve our products and services</strong> — analysing aggregated usage patterns, identifying product issues, training predictive models on operational data (within customer boundaries).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D5573B] font-bold mt-1">•</span>
                    <span><strong className="text-[#FAF7F2]">To market our products</strong> — with your consent, sending you information about new features, whitepapers, events, and product updates.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D5573B] font-bold mt-1">•</span>
                    <span><strong className="text-[#FAF7F2]">To comply with legal obligations</strong> — statutory reporting, regulatory compliance, responding to lawful requests from government authorities.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#D5573B] font-bold mt-1">•</span>
                    <span><strong className="text-[#FAF7F2]">To protect our rights and safety</strong> — preventing fraud, enforcing our terms of service, protecting our intellectual property.</span>
                  </li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="how-we-share-your-information" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  4. How we share your information
                </h2>
                <p>We share personal data only in the following circumstances:</p>

                <div className="space-y-3">
                  <h3 className="font-fraunces text-xl font-semibold text-[#FAF7F2]">
                    4.1 With service providers
                  </h3>
                  <p>We share data with third-party service providers who help us operate our business:</p>
                  <ul className="list-disc pl-6 space-y-1.5 text-base">
                    <li><strong>Razorpay</strong> for payment processing</li>
                    <li><strong>Shiprocket</strong> for shipping and logistics</li>
                    <li><strong>Bajaj Finance</strong> for EMI applications and financing</li>
                    <li><strong>Magic Flow AI</strong> for our website chatbot</li>
                    <li><strong>Cloud infrastructure providers</strong> for hosting Treel platform infrastructure</li>
                    <li><strong>Analytics providers</strong> (Google Analytics, and privacy-first alternatives)</li>
                  </ul>
                  <p className="pt-1 text-sm">
                    All service providers are bound by contract to protect your data and use it only for the purposes we specify.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-fraunces text-xl font-semibold text-[#FAF7F2]">
                    4.2 With JK Tyre (parent company)
                  </h3>
                  <p>
                    As a JK Tyre technology company, Treel operates independently but may share aggregated, non-personal insights with JK Tyre for corporate reporting purposes. <strong>We do not share individual customer personal data with JK Tyre</strong> for marketing, sales, or any other secondary purpose.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-fraunces text-xl font-semibold text-[#FAF7F2]">
                    4.3 With our authorized dealer and installation network
                  </h3>
                  <p>
                    For Suraksha customers, we share the minimum necessary contact information with Truck Wheels centres, JK dealers, or certified puncture shops in connection with installation, warranty service, or support requests you initiate.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-fraunces text-xl font-semibold text-[#FAF7F2]">
                    4.4 With legal or regulatory authorities
                  </h3>
                  <p>
                    We share personal data when required by law, court order, or lawful government request. We evaluate every request for legality and scope before disclosure.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="font-fraunces text-xl font-semibold text-[#FAF7F2]">
                    4.5 In business transfers
                  </h3>
                  <p>
                    If Treel is involved in a merger, acquisition, or asset sale, personal data may be transferred as part of that transaction. We will notify affected users through our website and by email where reasonably possible.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-white/[0.04] border border-white/10">
                  <p className="text-[#FAF7F2] font-semibold">
                    We do not sell your personal data. We have never sold personal data, and we do not plan to.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="data-retention" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  5. Data retention
                </h2>
                <p>
                  We retain personal data only for as long as necessary to fulfil the purposes described in this policy, comply with legal obligations, resolve disputes, and enforce our agreements.
                </p>
                <p>Typical retention periods:</p>
                <ul className="space-y-2 text-base">
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D5573B] font-bold">•</span>
                    <span><strong className="text-[#FAF7F2]">Transactional records</strong> (orders, invoices, warranty registrations) — 8 years, per statutory requirement</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D5573B] font-bold">•</span>
                    <span><strong className="text-[#FAF7F2]">Customer support records</strong> — 3 years from case closure</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D5573B] font-bold">•</span>
                    <span><strong className="text-[#FAF7F2]">Marketing preferences</strong> — until you unsubscribe or object</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D5573B] font-bold">•</span>
                    <span><strong className="text-[#FAF7F2]">Website analytics</strong> — 26 months (Google Analytics default; longer if required for legitimate business analysis)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-[#D5573B] font-bold">•</span>
                    <span><strong className="text-[#FAF7F2]">Vehicle Digital Twin operational data</strong> — as long as the vehicle is under active Treel platform management, plus 12 months post-termination for statutory or dispute purposes</span>
                  </li>
                </ul>
                <p className="text-sm pt-2">
                  You can request earlier deletion where permitted by law (see Section 6).
                </p>
              </section>

              {/* Section 6 */}
              <section id="your-rights" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  6. Your rights under DPDP Act 2023
                </h2>
                <p>
                  As a data principal under the India Digital Personal Data Protection Act 2023, you have the following rights:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="font-fraunces text-base font-bold text-[#FAF7F2]">Right to access</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">Request confirmation of whether we process your personal data, and a copy of the data we hold.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="font-fraunces text-base font-bold text-[#FAF7F2]">Right to correction</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">Request correction of inaccurate or incomplete data.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="font-fraunces text-base font-bold text-[#FAF7F2]">Right to erasure</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">Request deletion of your personal data, subject to statutory retention requirements.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="font-fraunces text-base font-bold text-[#FAF7F2]">Right to grievance redressal</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">Escalate unresolved concerns directly to our Data Protection Officer.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="font-fraunces text-base font-bold text-[#FAF7F2]">Right to nominate</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">Nominate another individual to exercise your rights in the event of death or incapacity.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                    <div className="font-fraunces text-base font-bold text-[#FAF7F2]">Right to withdraw consent</div>
                    <p className="text-xs sm:text-sm text-[#94A3B8]">Withdraw consent for processing based on consent at any time.</p>
                  </div>
                </div>
                <p className="text-sm pt-2">
                  To exercise any of these rights, contact our Data Protection Officer at <a href="mailto:dpo@treel.in" className="text-[#D5573B] underline hover:text-[#CB4831]">dpo@treel.in</a>. We will respond within the timeframes required by DPDP Act 2023 (typically within 30 days of a validated request).
                </p>
              </section>

              {/* Section 7 */}
              <section id="data-security" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  7. Data security
                </h2>
                <p>We implement appropriate technical and organizational measures to protect personal data:</p>
                <ul className="list-disc pl-6 space-y-1.5 text-base">
                  <li>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
                  <li>Role-based access controls with multi-factor authentication for privileged access</li>
                  <li>Logical isolation of every customer&apos;s data</li>
                  <li>Regular penetration testing by third-party security firms</li>
                  <li>99.7% platform uptime (trailing 90-day rolling average)</li>
                  <li>Incident response processes with customer notification within contractual SLA</li>
                </ul>
                <p className="text-sm pt-2">
                  Despite our efforts, no method of transmission or storage is 100% secure. We commit to acting in good faith and with due diligence to protect your data.
                </p>
              </section>

              {/* Section 8 */}
              <section id="cookies" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  8. Cookies and tracking technologies
                </h2>
                <p>
                  We use cookies and similar technologies to operate our website, remember your preferences, analyse usage, and (with your consent) deliver relevant marketing. See our{" "}
                  <Link href="/cookies" className="text-[#D5573B] underline hover:text-[#CB4831]">
                    Cookie Policy
                  </Link>{" "}
                  for full details, cookie categories, and how to manage your preferences.
                </p>
              </section>

              {/* Section 9 */}
              <section id="international-transfers" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  9. International data transfers
                </h2>
                <p>
                  Treel is headquartered in Pune, India, and processes personal data primarily within India. For future international expansion (Middle East and Europe), we will maintain regional data residency where required by local law. Any international transfer will follow the safeguards mandated by DPDP Act 2023 and relevant destination jurisdictions.
                </p>
              </section>

              {/* Section 10 */}
              <section id="childrens-privacy" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  10. Children&apos;s privacy
                </h2>
                <p>
                  Our website and products are not directed to children under 18. We do not knowingly collect personal data from children. If you believe we have inadvertently collected data from a child, please contact us and we will delete it.
                </p>
              </section>

              {/* Section 11 */}
              <section id="changes-to-policy" className="space-y-4 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  11. Changes to this policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. Material changes will be notified through the website and, where reasonably possible, by email to affected users. The &quot;Effective date&quot; and &quot;Last updated&quot; fields at the top of this policy indicate the current version. Prior versions are available on request.
                </p>
              </section>

              {/* Section 12 */}
              <section id="contact-dpo" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-bold text-[#FAF7F2] tracking-tight">
                  12. Contact our Data Protection Officer
                </h2>
                <p>For questions, concerns, or requests related to your personal data:</p>
                <div className="p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                  <div>
                    <h3 className="font-fraunces text-xl font-bold text-[#FAF7F2]">Data Protection Officer</h3>
                    <p className="text-sm text-[#94A3B8]">Treel Mobility Solutions Private Limited</p>
                  </div>
                  <div className="space-y-2 text-sm text-[#94A3B8]">
                    <p className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#D5573B]" />
                      <span>Email: <a href="mailto:dpo@treel.in" className="text-[#FAF7F2] underline hover:text-[#D5573B]">dpo@treel.in</a></span>
                    </p>
                    <p className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#D5573B] mt-0.5 shrink-0" />
                      <span>Postal: S.No. 6/1B, 6/4, 7/4, Plot No. 02, Laxmi Vishnupuram Amenities Business, NDA Road, Village Shivane, Tal. Haveli, Pune, Maharashtra 411023</span>
                    </p>
                    <p className="flex items-center gap-2 pt-2 border-t border-white/10">
                      <span>For general inquiries: <a href="mailto:hello@treel.in" className="text-[#FAF7F2] underline hover:text-[#D5573B]">hello@treel.in</a> or <a href="tel:18008330233" className="text-[#FAF7F2] underline hover:text-[#D5573B]">1800 833 0233</a></span>
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
