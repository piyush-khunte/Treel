import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download, FileText, ExternalLink, ShieldCheck, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getPublicAnnualReturns } from "@/lib/content/annual-returns-storage";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Annual Reports & Statutory Returns · Treel Mobility Solutions",
  description: "Official statutory annual returns (Form MGT-7A) and annual reports of Treel Mobility Solutions Private Limited. Published for public compliance and stakeholder transparency.",
  alternates: {
    canonical: "https://treel.in/annual-reports",
  },
  openGraph: {
    title: "Annual Reports & Statutory Returns · Treel Mobility Solutions",
    description: "Official statutory annual returns (Form MGT-7A) and annual reports of Treel Mobility Solutions Private Limited. Published for public compliance and stakeholder transparency.",
    url: "https://treel.in/annual-reports",
  },
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "Official Filing";
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  } catch {}
  return dateStr;
}

export default async function AnnualReportsPage() {
  const reports = await getPublicAnnualReturns();

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
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Annual Reports" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                STATUTORY FILINGS
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Annual reports and <span className="italic font-normal text-[#D5573B]">statutory returns.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Treel Mobility Solutions Private Limited publishes its statutory annual returns (Form MGT-7A) and corporate filings here, in compliance with Section 92 of the Companies Act 2013 and our ongoing commitment to corporate governance.
            </p>
          </div>
        </div>
      </section>

      {/* 2. REPORTS LIBRARY */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-5xl space-y-12">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#10B981]">
                  Official Documents Repository
                </span>
              </div>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                Statutory Filings Library
              </h2>
              <p className="text-sm text-[#94A3B8]">
                Verified Form MGT-7A annual returns uploaded directly from our corporate records. Select a filing to view or download the complete PDF filing.
              </p>
            </div>

            {reports.length === 0 ? (
              <div className="rounded-xl border border-white/10 bg-[#0F1419] p-10 text-center space-y-3">
                <FileText className="w-10 h-10 text-[#D5573B] mx-auto opacity-70" />
                <h3 className="font-fraunces text-lg text-[#FAF7F2]">No filings currently available</h3>
                <p className="text-sm text-[#94A3B8] max-w-md mx-auto">
                  Statutory annual returns are currently being processed. Please check back shortly or contact our compliance team.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reports.map((report) => (
                  <div 
                    key={report._id}
                    className="rounded-xl border border-white/10 bg-[#0F1419] p-6 hover:border-[#D5573B]/50 hover:shadow-lg hover:shadow-[#D5573B]/5 transition-all flex flex-col justify-between space-y-6 group/card"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="w-11 h-11 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] group-hover/card:bg-[#D5573B] group-hover/card:text-[#FAF7F2] transition-colors">
                          <FileText className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/20 text-[#D5573B] font-semibold">
                          Form MGT-7A
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover/card:text-[#FAF7F2]">
                          {report.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#94A3B8] font-mono">
                          <span>Filing Date: {formatDate(report.date)}</span>
                          <span>•</span>
                          <span>PDF Document</span>
                          <span>•</span>
                          <span className="text-emerald-400">Verified</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-white/5">
                      <a 
                        href={report.pdf} 
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold bg-[#D5573B] text-[#FAF7F2] hover:bg-[#e06347] transition-all shadow-sm"
                        title={`Download ${report.title}`}
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </a>
                      <a 
                        href={report.pdf} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#FAF7F2] hover:bg-white/[0.08] hover:border-white/20 transition-all group"
                        title={`Open ${report.title} in new tab`}
                      >
                        <Eye className="w-3.5 h-3.5 text-[#94A3B8] group-hover:text-[#FAF7F2]" />
                        <span>View Document</span>
                        <ExternalLink className="w-3 h-3 text-[#94A3B8] group-hover:text-[#FAF7F2]" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Historical Filings Callout */}
            <div className="rounded-xl border border-white/10 bg-[#0F1419] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="space-y-1 max-w-2xl">
                <h4 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                  Ministry of Corporate Affairs Portal
                </h4>
                <p className="text-sm text-[#94A3B8] leading-relaxed">
                  Treel Mobility Solutions filings are submitted directly to the Registrar of Companies (ROC). Public records, corporate status, and certificates can also be verified on the official Ministry of Corporate Affairs portal.
                </p>
              </div>
              <a
                href="https://www.mca.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-xs font-semibold bg-white/[0.04] border border-white/10 text-[#FAF7F2] hover:bg-[#D5573B] hover:border-[#D5573B] transition-all group"
              >
                <span>Access MCA Portal</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D5573B] group-hover:text-[#FAF7F2]" />
              </a>
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
              . The reports published on this page are the same official documents filed with the Registrar of Companies, published here for stakeholder convenience and governance transparency.
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
              For queries related to annual reports, corporate filings, or compliance matters, please reach out to our corporate secretarial and compliance team.
            </p>
            <div className="pt-2">
              <Button asChild variant="treel" size="lg">
                <Link href="/contact?subject=General+inquiry" className="inline-flex items-center gap-2">
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
