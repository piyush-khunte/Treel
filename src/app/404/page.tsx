import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, Search, Home, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found · Treel",
  description: "The page you are looking for is not found on treel.in.",
  alternates: {
    canonical: "https://treel.in/404",
  },
  openGraph: {
    title: "Page Not Found · Treel",
    description: "The page you are looking for is not found on treel.in.",
    url: "https://treel.in/404",
  },
};

const EXPLORATION_LINKS = [
  {
    category: "Corporate & Platform",
    links: [
      { name: "About Treel", href: "/about" },
      { name: "Technology Architecture", href: "/technology" },
      { name: "Mobility Intelligence", href: "/mobility-intelligence" },
      { name: "Research & Benchmarks", href: "/research" },
    ],
  },
  {
    category: "Solutions & Fleets",
    links: [
      { name: "TMIP Fleet Platform", href: "/tmip" },
      { name: "Project Suraksha", href: "/suraksha" },
      { name: "Personal TPMS", href: "/personal" },
      { name: "All Products Overview", href: "/products" },
    ],
  },
  {
    category: "Support & Media",
    links: [
      { name: "Contact & Headquarters", href: "/contact" },
      { name: "Press Releases", href: "/press" },
      { name: "Media Kit Assets", href: "/media-kit" },
      { name: "Annual Reports", href: "/annual-reports" },
    ],
  },
];

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] font-inter selection:bg-[#D5573B]/20 selection:text-[#FAF7F2]">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-white/[0.08]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
                Status 404
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Route Not <span className="italic font-normal text-[#D5573B]">Found</span>
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed">
              The page you are looking for has been moved, renamed, or is temporarily unavailable on treel.in.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild variant="treel">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" /> Back to Homepage
                </Link>
              </Button>
              <Button asChild variant="treelOutline">
                <Link href="/products">
                  Explore Products <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Directory Exploration Grid */}
      <section className="py-20 border-b border-white/[0.08]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12">
            <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] mb-3">
              Explore Available Corridors
            </h2>
            <p className="text-sm text-[#94A3B8]">
              Select from key destinations across the Treel ecosystem:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {EXPLORATION_LINKS.map((col) => (
              <div key={col.category} className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-4">
                <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2] border-b border-white/[0.08] pb-3">
                  {col.category}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-[#94A3B8] hover:text-[#D5573B] transition-colors flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D5573B]/60" />
                        <span>{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Report Broken Link CTA */}
      <section className="py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <h4 className="font-fraunces text-xl text-[#FAF7F2]">Did you follow a broken link?</h4>
            <p className="text-xs sm:text-sm text-[#94A3B8]">Let our web engineering team know so we can update the route redirection.</p>
          </div>
          <Button asChild variant="ghost" className="text-[#D5573B] hover:text-[#FAF7F2] hover:bg-white/[0.05] border border-white/[0.1]">
            <Link href="/contact">
              <HelpCircle className="w-4 h-4 mr-2" /> Report Issue to Webmaster
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}