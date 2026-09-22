import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bell, Calendar, FileText, ShieldCheck, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getPublicNotices } from "@/lib/admin/admin-actions";

export const metadata: Metadata = {
  title: "Notice Board · Treel Mobility Solutions",
  description: "Official corporate announcements, statutory notices, and regulatory disclosures of Treel Mobility Solutions Private Limited.",
  alternates: {
    canonical: "https://treel.in/notices",
  },
  openGraph: {
    title: "Notice Board · Treel Mobility Solutions",
    description: "Official corporate announcements, statutory notices, and regulatory disclosures of Treel Mobility Solutions Private Limited.",
    url: "https://treel.in/notices",
  },
};

// Revalidate public notices periodically
export const revalidate = 60;

export default async function NoticesPage() {
  const result = await getPublicNotices();
  const notices = (result.success && result.data ? result.data : []).filter(
    (n) => n.status === "Published"
  );

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter min-h-screen">
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
                { label: "Notice Board" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                NOTICE BOARD
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Official notices &amp; <span className="italic font-normal text-[#D5573B]">corporate announcements.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Statutory notifications, regulatory disclosures, and corporate communications issued by Treel Mobility Solutions Private Limited for stakeholders, partners, and the public.
            </p>
          </div>
        </div>
      </section>

      {/* 2. NOTICES LISTING */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
              <div>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                  Current Announcements
                </h2>
                <p className="text-sm text-[#94A3B8] mt-1">
                  Verified notices published in reverse chronological order.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full self-start sm:self-auto">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>{notices.length} Active {notices.length === 1 ? "Notice" : "Notices"}</span>
              </div>
            </div>

            {notices.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-white/10 bg-white/[0.02]">
                <FileText className="w-12 h-12 text-[#94A3B8]/40 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-[#FAF7F2]">No Active Notices</h3>
                <p className="text-sm text-[#94A3B8] mt-1.5 max-w-md mx-auto">
                  There are no active public notices at this moment. Official statutory updates and announcements will appear here once published.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {notices.map((notice) => (
                  <article
                    key={notice._id}
                    className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0F1419]/80 hover:border-white/20 transition-all space-y-5 relative overflow-hidden"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex flex-wrap items-center gap-2.5">
                        {notice.category && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/30 text-[#D5573B] font-semibold uppercase tracking-wider text-[11px]">
                            <Tag className="w-3 h-3" />
                            {notice.category}
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1.5 text-[#94A3B8] font-mono">
                          <Calendar className="w-3.5 h-3.5 text-[#94A3B8]/80" />
                          {notice.publishedDate ? new Date(notice.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          }) : "N/A"}
                        </span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400/90 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-md">
                        <ShieldCheck className="w-3 h-3 text-emerald-400" />
                        Official Publication
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-fraunces text-xl sm:text-2xl font-medium text-[#FAF7F2] tracking-tight leading-snug">
                        {notice.title}
                      </h3>
                      <div className="text-[#94A3B8] text-sm sm:text-base leading-relaxed whitespace-pre-line font-inter">
                        {notice.description}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 3. STATUTORY & REGULATORY CONTEXT */}
      <section className="py-16 border-b border-white/10 bg-[#0F1419]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D5573B]">
              <Bell className="w-6 h-6" />
            </div>
            <h2 className="font-fraunces text-2xl sm:text-3xl font-medium tracking-tight text-[#FAF7F2]">
              Statutory Disclosures &amp; Transparency
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              Treel Mobility Solutions Private Limited maintains this notice board to ensure clear, open communication regarding statutory actions, governance developments, and corporate notices. All publications conform to applicable regulatory guidelines under the Companies Act and Indian corporate law.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORPORATE QUERIES CTA */}
      <section className="py-20 border-b border-white/10 bg-[#121820]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Corporate &amp; Compliance Inquiries
            </h2>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed font-inter">
              For formal correspondence, legal notices, or queries concerning announcements on this board, please reach out directly to our corporate secretariat.
            </p>
            <div className="pt-2">
              <Button asChild variant="treel" size="lg">
                <Link href="/contact?subject=Corporate+Notices" className="inline-flex items-center gap-2">
                  Contact Corporate Office <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
