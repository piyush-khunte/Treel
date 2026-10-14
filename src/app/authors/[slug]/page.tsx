import { Breadcrumb } from "@/components/ui/breadcrumb";
import { getAuthorProfile,VERIFIED_AUTHORS } from "@/lib/authors/author-registry";
import {
ArrowLeft,
ArrowRight,
BookOpen,
Building2,
Calendar,
CheckCircle2,
MapPin
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export async function generateStaticParams() {
  return Object.keys(VERIFIED_AUTHORS).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { profile } = await getAuthorProfile(slug);

  if (!profile) {
    return {
      title: "Author Not Found · Treel",
      description: "The requested author profile could not be found.",
    };
  }

  return {
    title: `${profile.name} · Author Profile · Treel Mobility Solutions`,
    description: profile.bio,
    alternates: {
      canonical: `https://treel.in/authors/${profile.slug}`,
    },
    openGraph: {
      title: `${profile.name} · Treel Mobility Solutions`,
      description: profile.bio,
      url: `https://treel.in/authors/${profile.slug}`,
      type: "profile",
    },
  };
}

export default async function AuthorProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { profile, articles } = await getAuthorProfile(slug);

  if (!profile) {
    notFound();
  }

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] font-inter selection:bg-[#D5573B]/20">
      {/* 1. Header / Profile Hero */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent">
        <div 
          className="absolute -top-28 -right-28 w-[520px] h-[520px] pointer-events-none rounded-full"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10 space-y-8">
          {/* Breadcrumb Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Insights", href: "/insights" },
                { label: "Authors" },
                { label: profile.name },
              ]}
            />
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#94A3B8] hover:text-[#FAF7F2] transition-colors w-fit"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#D5573B]" /> Back to all insights
            </Link>
          </div>

          {/* Profile Card Main Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 pt-4">
            {/* Avatar / Portrait Frame */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-white/[0.02] border-2 border-white/15 relative overflow-hidden flex items-center justify-center shadow-xl shrink-0">
              <span className="font-fraunces text-3xl sm:text-4xl font-medium text-[#FAF7F2]/90 tracking-wider">
                {initials}
              </span>
            </div>

            {/* Author Meta Details */}
            <div className="space-y-4 max-w-3xl flex-1">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/25 text-[#D5573B] font-mono text-xs uppercase tracking-wider font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#D5573B]" /> Verified Author
                  </span>
                  {profile.isFounder && (
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#FAF7F2] font-mono text-xs uppercase tracking-wider font-semibold">
                      Founder
                    </span>
                  )}
                </div>

                <h1 className="font-fraunces text-3xl sm:text-5xl font-medium tracking-tight text-[#FAF7F2] leading-tight">
                  {profile.name}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[#94A3B8] font-inter pt-1">
                  <span className="font-semibold text-[#FAF7F2]">{profile.role}</span>
                  <span className="text-white/20">·</span>
                  <span className="flex items-center gap-1.5 font-mono text-xs">
                    <Building2 className="w-3.5 h-3.5 text-[#D5573B]" /> {profile.company}
                  </span>
                  <span className="text-white/20">·</span>
                  <span className="flex items-center gap-1.5 font-mono text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#D5573B]" /> {profile.location}
                  </span>
                </div>
              </div>

              {/* Verified Biography */}
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed font-inter">
                {profile.bio}
              </p>

              {profile.isFounder && (
                <div className="pt-2">
                  <Link
                    href="/founder-note"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[4px] bg-[#D5573B] text-[#FAF7F2] font-semibold text-xs hover:bg-[#CB4831] transition-all shadow-md"
                  >
                    <span>Read founder&apos;s personal note</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Authored Articles Section */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold mb-1">
                PUBLICATIONS &amp; RESEARCH
              </div>
              <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2]">
                Articles by {profile.name}
              </h2>
            </div>
            <div className="text-xs font-mono text-[#94A3B8]">
              {articles.length} {articles.length === 1 ? "article" : "articles"} published
            </div>
          </div>

          {articles.length === 0 ? (
            <div className="p-16 text-center rounded-lg bg-white/[0.02] border border-white/10 max-w-lg mx-auto space-y-4">
              <BookOpen className="w-10 h-10 text-white/30 mx-auto" />
              <div className="space-y-1">
                <p className="font-fraunces text-xl text-[#FAF7F2]">No articles currently published</p>
                <p className="text-xs text-[#94A3B8]">
                  Articles authored by {profile.name} will appear here as they are published.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="group rounded-lg bg-white/[0.03] border border-white/[0.08] hover:border-[#D5573B]/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm"
                >
                  <div className="p-6 sm:p-7 space-y-4">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="uppercase tracking-wider text-[#D5573B] font-bold">
                        {item.category}
                      </span>
                      <span className="text-white/40">{item.sourceLabel}</span>
                    </div>

                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors leading-snug line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed font-inter line-clamp-3">
                      {item.deckOrExcerpt}
                    </p>
                  </div>

                  <div className="p-6 sm:p-7 pt-0 flex items-center justify-between text-xs font-mono text-[#94A3B8] border-t border-white/[0.05] mt-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#D5573B]" />
                      {item.date}
                    </span>
                    <span className="text-[#D5573B] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
