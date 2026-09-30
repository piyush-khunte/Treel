import type { Metadata } from "next";
import { Suspense } from "react";
import { TmipLandingPage } from "@/components/tmip/tmip-landing-page";

export const metadata: Metadata = {
  title: "Predict Breakdowns Before They Stop Your Fleet · TMIP by Treel",
  description:
    "Predict breakdowns before they stop your fleet. Real-time tyre intelligence, vehicle digital twins, and predictive maintenance for commercial fleets. Book a 30-minute demo.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "https://treel.in/lp/tmip",
  },
  openGraph: {
    title: "Predict Breakdowns Before They Stop Your Fleet · TMIP by Treel",
    description:
      "Predict breakdowns before they stop your fleet. Real-time tyre intelligence, vehicle digital twins, and predictive maintenance for commercial fleets.",
    url: "https://treel.in/lp/tmip",
  },
};

export default function LPTmipPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#050A17]" />}>
      <TmipLandingPage />
    </Suspense>
  );
}
