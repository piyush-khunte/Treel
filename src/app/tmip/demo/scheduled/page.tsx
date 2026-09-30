import type { Metadata } from "next";
import { Suspense } from "react";
import { ScheduledClientView } from "./scheduled-client-view";

export const metadata: Metadata = {
  title: "Thank You · TMIP · Treel",
  description: "Thank you for requesting a TMIP demo. Your demo request has been received.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://treel.in/tmip/demo/scheduled",
  },
  openGraph: {
    title: "Thank You · TMIP · Treel",
    description: "Thank you for requesting a TMIP demo. Your demo request has been received.",
    url: "https://treel.in/tmip/demo/scheduled",
  },
};

export default function TmipDemoScheduledPage() {
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

      <Suspense fallback={<ScheduledLoadingFallback />}>
        <ScheduledClientView />
      </Suspense>
    </div>
  );
}

function ScheduledLoadingFallback() {
  return (
    <div className="relative z-10 pt-24 pb-20 max-w-[1320px] mx-auto px-6 sm:px-10">
      <div className="animate-pulse space-y-6 max-w-4xl">
        <div className="h-4 w-36 bg-blue-900/30 rounded" />
        <div className="h-10 w-96 bg-blue-900/30 rounded" />
        <div className="h-24 w-full bg-slate-800/20 rounded" />
      </div>
    </div>
  );
}