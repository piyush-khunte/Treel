import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2, 
  ExternalLink
} from "lucide-react";
import { RoleApplicationForm } from "./role-form";
import { getJobBySlug, getPublishedJobs } from "@/lib/content/careers-storage";

export async function generateStaticParams() {
  const jobs = await getPublishedJobs();
  return jobs.map((j) => ({ "role-slug": j.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ "role-slug": string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const roleSlug = resolvedParams["role-slug"];
  const role = await getJobBySlug(roleSlug);

  if (!role || role.status === "Draft") {
    return {
      title: "Role Not Found · Careers at Treel",
      description: "The requested career opening could not be found.",
    };
  }

  return {
    title: role.seoTitle || `${role.title} · Careers at Treel`,
    description: role.seoDescription || role.roleSummary,
    alternates: {
      canonical: `https://treel.in/careers/${role.slug}`,
    },
    openGraph: {
      title: role.seoTitle || `${role.title} · Careers at Treel`,
      description: role.seoDescription || role.roleSummary,
      url: `https://treel.in/careers/${role.slug}`,
    },
  };
}

export const revalidate = 60;

export default async function CareersRoleSlugPage({ params }: { params: Promise<{ "role-slug": string }> }) {
  const resolvedParams = await params;
  const roleSlug = resolvedParams["role-slug"];
  const role = await getJobBySlug(roleSlug);

  if (!role || role.status === "Draft") {
    notFound();
  }

  const allPublished = await getPublishedJobs();
  const relatedRoles = (role.relatedSlugs || [])
    .map((s) => allPublished.find((j) => j.slug === s))
    .filter(Boolean) as typeof allPublished;

  const aboutParagraphs = role.aboutTheRole && role.aboutTheRole.length > 0
    ? role.aboutTheRole
    : role.roleSummary
    ? [role.roleSummary]
    : [];

  const responsibilities = role.responsibilities || [];
  const mustHaves = role.mustHaves || [];
  const niceToHaves = role.niceToHaves || [];
  const whatYouGet = role.whatYouGet || [];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Header & Hero */}
      <header className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Link href="/careers" className="hover:text-[#FAF7F2] transition-colors">
                Careers
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#D5573B] font-medium">{role.team}</span>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#FAF7F2] truncate max-w-xs">{role.title}</span>
            </div>

            {/* Role Title (H1) */}
            <h1 className="font-fraunces text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              {role.title}
            </h1>

            {/* Status Information */} 
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8]">
              <span className="px-2.5 py-0.5 rounded-[4px] bg-[#D5573B]/10 border border-[#D5573B]/20 text-[#D5573B] font-semibold uppercase">
                {role.team}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#D5573B]" /> {role.location}
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-[#D5573B]" /> {role.type}
              </span>
              {role.workArrangement && (
                <>
                  <span className="text-white/20">·</span>
                  <span>{role.workArrangement}</span>
                </>
              )}
              {role.postedDate && (
                <>
                  <span className="text-white/20">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#D5573B]" /> Posted {role.postedDate}
                  </span>
                </>
              )}
              {role.status === "Closed" && (
                <span className="px-2.5 py-0.5 rounded-[4px] bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold uppercase">
                  Position Filled / Closed
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="py-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-16">
            {/* About the role */}
            {aboutParagraphs.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                  About the role
                </h2>
                {aboutParagraphs.map((para, idx) => (
                  <p key={idx} className="text-base sm:text-lg text-[#94A3B8] leading-relaxed font-inter">
                    {para}
                  </p>
                ))}
              </section>
            )}

            {/* What you'll do */}
            {responsibilities.length > 0 && (
              <section className="space-y-6">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                  What you&apos;ll do
                </h2>
                <div className="space-y-3">
                  {responsibilities.map((item, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-white/[0.03] border border-white/[0.08] flex items-start gap-3.5">
                      <div className="w-5 h-5 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm sm:text-base text-[#FAF7F2] font-inter">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* What we're looking for */}
            {(mustHaves.length > 0 || niceToHaves.length > 0) && (
              <section className="space-y-8">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                  What we&apos;re looking for
                </h2>

                {/* Must-haves */}
                {mustHaves.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#D5573B] font-semibold">
                      Must-haves
                    </h3>
                    <div className="space-y-2.5">
                      {mustHaves.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                          <span className="text-[#D5573B] font-bold mt-1">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Nice-to-haves */}
                {niceToHaves.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
                      Nice-to-haves
                    </h3>
                    <div className="space-y-2.5">
                      {niceToHaves.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3 text-sm sm:text-base text-[#94A3B8]">
                          <span className="text-[#D5573B] font-bold mt-1">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}

            {/* What you get */}
            {whatYouGet.length > 0 && (
              <section className="space-y-4">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                  What you get
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {whatYouGet.map((benefit, idx) => (
                    <div key={idx} className="p-5 rounded-lg bg-white/[0.03] border border-white/[0.08] space-y-1">
                      <span className="text-xs font-mono text-[#D5573B] font-semibold uppercase">Pillar {idx + 1}</span>
                      <p className="text-sm text-[#FAF7F2]">{benefit}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* How to apply & Functional Form */}
            <section id="apply" className="space-y-6 pt-4">
              <div className="space-y-2">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                  How to apply
                </h2>
                <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-inter">
                  Submit your application below. You will be asked for your name, email, phone, resume, and an optional cover letter. We respond to every applicant within two weeks.
                </p>
              </div>

              {role.status === "Closed" ? (
                <div className="p-8 rounded-lg bg-white/[0.03] border border-white/10 text-center space-y-3">
                  <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">Applications Closed</h3>
                  <p className="text-sm text-[#94A3B8] max-w-md mx-auto">
                    This position has been filled. Explore other open opportunities or check back soon.
                  </p>
                  <Link
                    href="/careers"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-md bg-white/[0.05] border border-white/10 text-xs font-semibold text-[#FAF7F2] hover:bg-white/10 transition-colors"
                  >
                    <span>View all openings</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : role.applicationUrl ? (
                <div className="p-8 rounded-lg bg-white/[0.03] border border-white/10 space-y-6 shadow-xl">
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono uppercase text-[#D5573B] font-semibold tracking-wider">
                      DIRECT APPLICATION
                    </span>
                    <h3 className="font-fraunces text-2xl font-medium text-[#FAF7F2]">
                      Apply through official portal
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed">
                      Applications for this role are handled directly via our application tracking portal.
                    </p>
                  </div>
                  <a
                    href={role.applicationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-md group"
                  >
                    <span>Open Application Form</span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                </div>
              ) : (
                <RoleApplicationForm roleTitle={role.title} />
              )}
            </section>
          </div>
        </div>
      </div>

      {/* Related Roles Strip */}
      {relatedRoles.length > 0 && (
        <section className="py-20 border-b border-white/10 bg-white/[0.01]">
          <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
            <div className="max-w-4xl space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                  Related open roles
                </h2>
                <Link
                  href="/careers"
                  className="text-xs font-mono uppercase tracking-wider text-[#D5573B] hover:text-[#CB4831] transition-colors flex items-center gap-1.5"
                >
                  <span>All openings</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedRoles.map((rel) => (
                  <Link
                    key={rel.slug}
                    href={`/careers/${rel.slug}`}
                    className="p-6 rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-[4px] bg-[#D5573B]/10 border border-[#D5573B]/20 text-[#D5573B] font-semibold uppercase">
                          {rel.team}
                        </span>
                        <span className="text-xs text-[#94A3B8] font-mono">{rel.location}</span>
                      </div>
                      <h3 className="font-fraunces text-base font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-[#94A3B8] line-clamp-2 leading-relaxed font-inter">
                        {rel.roleSummary}
                      </p>
                    </div>

                    <div className="pt-4 flex items-center justify-between text-xs font-mono text-[#D5573B]">
                      <span>View role</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
