import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Fleet ROI Calculator — TMIP",
  description:
    "Calculate fuel savings, tyre wear reduction, and expected payback period for commercial vehicle fleets using Treel's TMIP platform.",
  alternates: {
    canonical: "https://treel.in/tmip/roi-calculator",
  },
  openGraph: {
    title: "Commercial Fleet ROI Calculator — TMIP",
    description:
      "Calculate fuel savings, tyre wear reduction, and expected payback period for commercial vehicle fleets using Treel's TMIP platform.",
    url: "https://treel.in/tmip/roi-calculator",
  },
};

export default function TmipRoiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

