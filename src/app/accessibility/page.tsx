import type { Metadata } from "next";
import Link from "next/link";
import { 
  CheckCircle2, 
  HelpCircle, 
  Mail, 
  Phone, 
  FileCheck2, 
  AlertTriangle, 
  Sparkles, 
  Eye, 
  Keyboard, 
  Laptop, 
  FileText, 
  Volume2, 
  Layers, 
  Compass, 
  Contrast, 
  Subtitles, 
  ArrowRight
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";

export const metadata: Metadata = {
  title: "Accessibility · Treel",
  description:
    "Treel's commitment to accessibility. Our WCAG 2.2 Level AA target, current status, and how to report accessibility issues.",
  alternates: {
    canonical: "https://treel.in/accessibility",
  },
  openGraph: {
    title: "Accessibility · Treel",
    description:
      "Treel's commitment to accessibility. Our WCAG 2.2 Level AA target, current status, and how to report accessibility issues.",
    url: "https://treel.in/accessibility",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AccessibilityPage() {
  const sections = [
    { id: "commitment", title: "1. Our Commitment" },
    { id: "standards", title: "2. Standards We Aim For" },
    { id: "features", title: "3. Current Accessibility Features" },
    { id: "limitations", title: "4. Known Limitations" },
    { id: "report-issue", title: "5. Report an Accessibility Issue" },
    { id: "ongoing-improvements", title: "6. Ongoing Improvements" },
  ];

  const currentFeatures = [
    {
      title: "Semantic HTML Structure",
      description: "Structured layout with hierarchical headings (H1–H4), landmarks, and semantic HTML elements.",
      icon: Layers,
    },
    {
      title: "Descriptive Alt Text",
      description: "Descriptive alt text provided for all meaningful photographs, hardware diagrams, and system icons.",
      icon: Eye,
    },
    {
      title: "Keyboard Navigation",
      description: "Comprehensive keyboard accessibility across all interactive buttons, links, menus, and controls.",
      icon: Keyboard,
    },
    {
      title: "Visible Focus Indicators",
      description: "High-contrast, prominent focus indicators ensuring clear visual tracking across all interactive states.",
      icon: Compass,
    },
    {
      title: "Compliant Colour Contrast",
      description: "Ratios strictly meeting WCAG AA standards (minimum 4.5:1 for body copy and 3:1 for large display text).",
      icon: Contrast,
    },
    {
      title: "Skip-to-Content Links",
      description: "Direct bypass skip links allowing keyboard and screen-reader users to skip repetitive navigation.",
      icon: ArrowRight,
    },
    {
      title: "Screen Reader Support",
      description: "Compatible and verified with industry-standard assistive readers including VoiceOver, NVDA, and JAWS.",
      icon: Volume2,
    },
    {
      title: "Text Alternatives",
      description: "Equivalent textual alternatives and labels for data visualisations and non-text interactive components.",
      icon: FileText,
    },
    {
      title: "Responsive Design",
      description: "Fluid page scaling across mobile, tablet, desktop, and system magnification settings up to 200%.",
      icon: Laptop,
    },
    {
      title: "Video Captions and Transcripts",
      description: "Captions and transcripts provided for explanatory product and tutorial videos where applicable.",
      icon: Subtitles,
    },
  ];

  const knownLimitations = [
    {
      title: "Complete keyboard navigation on all form components",
      status: "In Progress",
      description:
        "Optimization is currently in active progress for the multi-step Suraksha EMI application form to ensure seamless focus-trap management and error announcements.",
    },
    {
      title: "Language attribute markup for Hinglish content",
      status: "In Progress",
      description:
        "Fine-tuning xml:lang and lang attribute segmentation across vernacular and Hinglish educational sections on Suraksha driver-facing pages.",
    },
    {
      title: "Screen reader compatibility with interactive Vehicle Digital Twin",
      status: "Alternative View Available",
      description:
        "The three-dimensional interactive telemetry canvas on TMIP is being enriched with granular ARIA live regions; an alternative accessible data table is provided as a direct fallback.",
      link: {
        text: "Visit TMIP",
        href: "/tmip",
      },
    },
  ];

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter min-h-screen">
      {/* Header & Hero */}
      <section className="relative overflow-hidden pt-28 pb-16 border-b border-white/[0.08]">
        <div
          className="absolute -top-24 -right-24 w-[500px] h-[500px] pointer-events-none rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 65%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Accessibility Statement" },
              ]}
            />
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
                LEGAL
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.08]">
              Accessibility Statement
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#94A3B8] pt-2">
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                Effective date: 1 October 2026
              </span>
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10">
                Last updated: 1 October 2026
              </span>
              <span className="px-3 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/30 text-[#D5573B] font-semibold">
                Target: WCAG 2.2 Level AA
              </span>
              <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[#94A3B8]">
                treel.in/accessibility
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="py-16">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar Table of Contents */}
            <aside className="lg:col-span-4">
              <div className="sticky top-28 p-6 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-6">
                <div className="text-xs font-mono uppercase tracking-wider text-[#D5573B] font-semibold flex items-center gap-2">
                  <FileCheck2 className="w-4 h-4" aria-hidden="true" />
                  Table of Contents
                </div>
                <nav aria-label="Accessibility Statement sections" className="space-y-1.5 text-sm font-inter">
                  {sections.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block py-2 px-3 rounded-lg text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/[0.04] transition-colors border-b border-white/[0.04] last:border-0"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>

                <div className="pt-4 border-t border-white/[0.08] space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">
                    Accessibility Support
                  </div>
                  <div className="space-y-2">
                    <a
                      href="mailto:hello@treel.in?subject=Accessibility%20feedback"
                      className="flex items-center gap-2 text-xs font-semibold text-[#D5573B] hover:text-[#E06A50] transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      hello@treel.in
                    </a>
                    <a
                      href="tel:18008330233"
                      className="flex items-center gap-2 text-xs font-semibold text-[#FAF7F2] hover:text-[#D5573B] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 shrink-0 text-[#D5573B]" aria-hidden="true" />
                      1800 833 0233 (Toll-Free)
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Document Body */}
            <main id="main-content" className="lg:col-span-8 space-y-16 text-base sm:text-lg text-[#94A3B8] leading-relaxed font-inter">
              {/* Section 1: Our commitment */}
              <section id="commitment" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  1. Our commitment
                </h2>
                <div className="space-y-4">
                  <p>
                    Treel is committed to ensuring that treel.in and our digital products are accessible to people with disabilities. We believe technology should be usable by everyone, regardless of ability.
                  </p>
                  <p className="text-sm text-[#94A3B8]/90">
                    From our web presence to vehicle telematics interfaces, our digital design and engineering systems actively integrate universal design principles so that fleet operators, drivers, enterprise managers, and everyday vehicle owners can interact with our information seamlessly.
                  </p>
                </div>
              </section>

              {/* Section 2: Standards we aim for */}
              <section id="standards" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  2. Standards we aim for
                </h2>
                <div className="space-y-4">
                  <p>
                    We aim to conform to the{" "}
                    <span className="text-[#FAF7F2] font-semibold">
                      Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA
                    </span>
                    . These guidelines are the international standard for web accessibility.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2.5 py-1 rounded bg-[#D5573B]/10 border border-[#D5573B]/30 text-[#D5573B] font-bold">
                        WCAG 2.2
                      </span>
                      <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                        International Benchmark
                      </h3>
                    </div>
                    <p className="text-sm text-[#94A3B8]">
                      Covers comprehensive digital accessibility principles: Perceivable, Operable, Understandable, and Robust (POUR).
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[#FAF7F2] font-bold">
                        Level AA
                      </span>
                      <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                        Conformance Target
                      </h3>
                    </div>
                    <p className="text-sm text-[#94A3B8]">
                      Requires rigorous contrast ratios, assistive screen-reader interoperability, full keyboard navigation, and cognitive clarity.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 3: Current accessibility features */}
              <section id="features" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  3. Current accessibility features
                </h2>
                <p>
                  Our website includes the following accessibility features:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {currentFeatures.map((feat) => {
                    const Icon = feat.icon;
                    return (
                      <div
                        key={feat.title}
                        className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] hover:border-white/[0.16] transition-colors space-y-2"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/20 flex items-center justify-center text-[#D5573B] shrink-0">
                            <Icon className="w-4 h-4" aria-hidden="true" />
                          </div>
                          <h3 className="font-medium text-base text-[#FAF7F2]">
                            {feat.title}
                          </h3>
                        </div>
                        <p className="text-sm text-[#94A3B8] leading-relaxed pl-11">
                          {feat.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Section 4: Known limitations */}
              <section id="limitations" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  4. Known limitations
                </h2>
                <p>
                  We are working on improving:
                </p>

                <div className="space-y-4 pt-2">
                  {knownLimitations.map((lim, index) => (
                    <div
                      key={lim.title}
                      className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2"
                    >
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="font-semibold text-base text-[#FAF7F2] flex items-center gap-2">
                          <span className="font-mono text-xs text-[#D5573B] font-bold">0{index + 1}.</span>
                          <span>{lim.title}</span>
                        </div>
                        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300">
                          {lim.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {lim.description}
                      </p>
                      {lim.link && (
                        <div className="pt-1">
                          <Link
                            href={lim.link.href}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#D5573B] hover:text-[#E06A50] transition-colors"
                          >
                            <span>{lim.link.text}</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Section 5: Report an accessibility issue */}
              <section id="report-issue" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  5. Report an accessibility issue
                </h2>
                <p>
                  If you encounter an accessibility issue or need content in an alternative format, please contact us and we will respond within 5 business days.
                </p>

                <div className="p-6 sm:p-8 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-6">
                  <div className="border-b border-white/[0.08] pb-4">
                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">
                      Direct Support &amp; Feedback Channels
                    </h3>
                    <p className="text-sm text-[#94A3B8] pt-1">
                      Our accessibility response team monitors all inbound requests to ensure barrier-free assistance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#FAF7F2] font-semibold flex items-center gap-2">
                        <Mail className="w-3.5 h-3.5 text-[#D5573B]" aria-hidden="true" />
                        Email Feedback
                      </div>
                      <div>
                        <a
                          href="mailto:hello@treel.in?subject=Accessibility%20feedback"
                          className="text-[#FAF7F2] hover:text-[#D5573B] font-semibold text-base transition-colors underline decoration-[#D5573B]/40 hover:decoration-[#D5573B]"
                        >
                          hello@treel.in
                        </a>
                        <p className="text-xs text-[#94A3B8] pt-1.5 leading-relaxed">
                          Subject line: <span className="font-mono text-[#FAF7F2] bg-white/5 px-1.5 py-0.5 rounded border border-white/10">&quot;Accessibility feedback&quot;</span> helps us route your inquiry quickly to the right engineering team.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-mono uppercase tracking-wider text-[#FAF7F2] font-semibold flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#D5573B]" aria-hidden="true" />
                        Toll-Free Phone Support
                      </div>
                      <div>
                        <a
                          href="tel:18008330233"
                          className="text-[#FAF7F2] hover:text-[#D5573B] font-semibold text-base transition-colors underline decoration-[#D5573B]/40 hover:decoration-[#D5573B]"
                        >
                          1800 833 0233
                        </a>
                        <p className="text-xs text-[#94A3B8] pt-1.5 leading-relaxed">
                          Toll-free voice support available Monday through Friday, 8:00 AM – 8:00 PM IST.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 6: Ongoing improvements */}
              <section id="ongoing-improvements" className="space-y-6 scroll-mt-28">
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight leading-[1.12]">
                  6. Ongoing improvements
                </h2>
                <div className="space-y-4">
                  <p>
                    Accessibility is not a one-time achievement. We conduct accessibility reviews on every major release and incorporate user feedback into our roadmap.
                  </p>
                  <p className="text-sm text-[#94A3B8]/90">
                    We continuously evaluate third-party tools, train engineering and design teams on evolving WCAG criteria, and prioritize fixes based on user community input.
                  </p>
                </div>
              </section>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}