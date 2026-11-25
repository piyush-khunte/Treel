import { DEFAULT_OG_IMAGES } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Newspaper, BookOpen, FlaskConical, CalendarDays, FileText, Images } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

const DESCRIPTION =
  "Press releases, insights, research papers, events, annual reports and media assets from Treel Mobility Solutions.";

export const metadata: Metadata = {
  title: "Resources",
  description: DESCRIPTION,
  alternates: {
    canonical: "https://treel.in/resources",
  },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: "Resources | Treel Mobility Solutions",
    description: DESCRIPTION,
    url: "https://treel.in/resources",
  },
};

const SECTIONS = [
  {
    href: "/resources/press",
    title: "Press & Media",
    description: "Press releases, media coverage and corporate announcements.",
    icon: Newspaper,
  },
  {
    href: "/resources/insights",
    title: "Insights & Articles",
    description: "Perspectives on tyre intelligence, fleet operations and vehicle digital twins.",
    icon: BookOpen,
  },
  {
    href: "/resources/research",
    title: "Research Papers",
    description: "Technical whitepapers on tyre mechanics, telemetry and mobility intelligence.",
    icon: FlaskConical,
  },
  {
    href: "/resources/events",
    title: "Events & Keynotes",
    description: "Upcoming and past webinars, keynotes and industry events.",
    icon: CalendarDays,
  },
  {
    href: "/resources/annual-reports",
    title: "Annual Reports",
    description: "Statutory annual returns and corporate filings.",
    icon: FileText,
  },
  {
    href: "/resources/media-kit",
    title: "Media Kit",
    description: "Logos, brand assets, imagery and company fact sheet for press use.",
    icon: Images,
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
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
                { label: "Resources" },
              ]}
            />
            <span className="block font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
              RESOURCES
            </span>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              News, research and <span className="italic font-normal text-[#D5573B]">insights.</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed max-w-3xl">{DESCRIPTION}</p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#121820] border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SECTIONS.map(({ href, title, description, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="group rounded-xl border border-white/10 bg-[#0F1419] p-6 hover:border-[#D5573B]/50 hover:shadow-lg hover:shadow-[#D5573B]/5 transition-all flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] group-hover:bg-[#D5573B] group-hover:text-[#FAF7F2] transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <h2 className="font-fraunces text-xl font-medium text-[#FAF7F2]">{title}</h2>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">{description}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D5573B]">
                  Explore <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
