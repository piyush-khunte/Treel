import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FileText, ExternalLink, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Annual Reports · Treel Mobility Solutions",
  description: "Statutory annual reports and annual returns of Treel Mobility Solutions Private Limited. Published annually for compliance and transparency.",
  alternates: {
    canonical: "https://treel.in/annual-reports",
  },
  openGraph: {
    title: "Annual Reports · Treel Mobility Solutions",
    description: "Statutory annual reports and annual returns of Treel Mobility Solutions Private Limited. Published annually for compliance and transparency.",
    url: "https://treel.in/annual-reports",
  },
};

const financialReports = [
  {
    year: "Financial Year 2024–25",
    reports: [
      {
        title: "Annual Statutory Return (MGT-7)",
        type: "Annual Return",
        published: "October 2025",
        fileSize: "2.4 MB",
        fileName: "treel-annual-return-fy24-25.pdf",
      },
      {
        title: "Annual Director & Auditor Report",
        type: "Annual Report",
        published: "September 2025",
        fileSize: "4.1 MB",
        fileName: "treel-directors-report-fy24-25.pdf",
      },
    ],
  },
  {
    year: "Financial Year 2023–24",
    reports: [
      {
        title: "Annual Statutory Return (MGT-7)",
        type: "Annual Return",
        published: "October 2024",
        fileSize: "2.1 MB",
        fileName: "treel-annual-return-fy23-24.pdf",
      },
      {
        title: "Annual Director & Auditor Report",
        type: "Annual Report",
        published: "September 2024",
        fileSize: "3.8 MB",
        fileName: "treel-directors-report-fy23-24.pdf",
      },
    ],
  },
  {
    year: "Financial Year 2022–23",
    reports: [
      {
        title: "Annual Statutory Return (MGT-7)",
        type: "Annual Return",
        published: "November 2023",
        fileSize: "1.9 MB",
        fileName: "treel-annual-return-fy22-23.pdf",
      },
      {
        title: "Annual Director & Auditor Report",
        type: "Annual Report",
        published: "September 2023",
        fileSize: "3.2 MB",
        fileName: "treel-directors-report-fy22-23.pdf",
      },
    ],
  },
  {
    year: "Financial Year 2021–22",
    reports: [
      {
        title: "Annual Statutory Return (MGT-7)",
        type: "Annual Return",
        published: "October 2022",
        fileSize: "1.8 MB",
        fileName: "treel-annual-return-fy21-22.pdf",
      },
      {
        title: "Annual Director & Auditor Report",
        type: "Annual Report",
        published: "September 2022",
        fileSize: "2.9 MB",
        fileName: "treel-directors-report-fy21-22.pdf",
      },
    ],
  },
];

export default function AnnualReportsPage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
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
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
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
                { label: "Annual Reports" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                ANNUAL REPORTS
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Annual reports and <span className="italic font-normal text-[#D5573B]">statutory filings.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Treel Mobility Solutions Private Limited publishes its annual returns and statutory reports here, as required by Indian company law and as part of our commitment to governance transparency.
            </p>
          </div>
        </div>
      </section>

      {/* 2. REPORTS LIBRARY */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-12">
            <div className="space-y-2">
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                Statutory Filings Library
              </h2>
              <p className="text-sm text-[#94A3B8]">
                Grouped by financial year in reverse chronological order. Documents are verified official filings.
              </p>
            </div>

            <div className="space-y-10">
              {financialReports.map((group) => (
                <div key={group.year} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="h-px flex-1 bg-white/10" />
                    <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-[#D5573B]">
                      {group.year}
                    </h3>
                    <span className="h-px flex-1 bg-white/10" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.reports.map((report) => (
                      <div 
                        key={report.title}
                        className="rounded-xl border border-white/10 bg-[#0F1419] p-6 hover:border-[#D5573B]/40 transition-colors flex flex-col justify-between space-y-6"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
                              <FileText className="w-5 h-5" />
                            </div>
                            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-white/5 text-[#94A3B8]">
                              {report.type}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                              {report.title}
                            </h4>
                            <div className="text-xs text-[#94A3B8] mt-1">
                              Filed: {report.published} • {report.fileSize} PDF
                            </div>
                          </div>
                        </div>

                        <a 
                          href={`#download-${report.fileName}`} 
                          className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-md text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#FAF7F2] hover:bg-[#D5573B] hover:border-[#D5573B] transition-all group"
                        >
                          <span className="flex items-center gap-2">
                            <Download className="w-4 h-4 text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors" />
                            Download Document
                          </span>
                          <span className="text-[10px] text-[#94A3B8] group-hover:text-white/80 font-mono">
                            PDF
                          </span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMPLIANCE STATEMENT */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="w-12 h-12 rounded-xl bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Compliance &amp; transparency
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              Treel Mobility Solutions Private Limited files its annual returns and reports with the Ministry of Corporate Affairs (MCA) as required under Section 92 and Section 137 of the Companies Act 2013. Full filings are available on the MCA portal at{" "}
              <a 
                href="https://www.mca.gov.in" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-[#D5573B] underline hover:text-white transition-colors inline-flex items-center gap-1"
              >
                www.mca.gov.in <ExternalLink className="w-3.5 h-3.5" />
              </a>
              . The reports published on this page are the same documents filed with the Registrar of Companies, published here for stakeholder convenience.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORPORATE & COMPLIANCE QUERIES */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Corporate &amp; compliance queries
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              For queries related to annual reports, corporate filings, or statutory compliance matters, our compliance and legal team can be reached directly through our contact portal.
            </p>
            <div className="pt-2">
              <Button asChild variant="treel" size="lg">
                <Link href="/contact?subject=Compliance" className="inline-flex items-center gap-2">
                  Contact us <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}