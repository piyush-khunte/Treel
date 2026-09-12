import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "[Article Headline]  ·  TMIP Insights",
  description: "[Article excerpt, 150 chars]",
  alternates: {
    canonical: "https://treel.in/tmip/insights/[slug]",
  },
  openGraph: {
    title: "[Article Headline]  ·  TMIP Insights",
    description: "[Article excerpt, 150 chars]",
    url: "https://treel.in/tmip/insights/[slug]",
  },
};

export default function TmipInsightsSlugPage() {
  return (
    <div className="relative bg-[#050A17] text-[#F1F5F9] font-ibm-plex overflow-x-hidden min-h-screen">
      {/* Subtle Blueprint Grid: 60px x 60px rgba(59,130,246,0.04) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-60 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <section className="relative z-10 pt-24 pb-20 border-b border-slate-400/10">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <h1 className="font-space-grotesk text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F1F5F9] leading-[1.15]">
              Individual TMIP insight
            </h1>
          </div>
        </div>
      </section>
    </div>
  );
}