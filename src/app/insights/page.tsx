import type { Metadata } from "next";
import Link from "next/link";
import { Rss } from "lucide-react";
import { InsightsClientView } from "./insights-client";

export const metadata: Metadata = {
  title: "Insights  ·  Mobility Intelligence Thinking from Treel",
  description: "Analysis, commentary, and long-form thinking on mobility intelligence, fleet operations, and India's commercial vehicle industry from Treel's team and founder.",
  alternates: {
    canonical: "https://treel.in/insights",
  },
  openGraph: {
    title: "Insights  ·  Mobility Intelligence Thinking from Treel",
    description: "Analysis, commentary, and long-form thinking on mobility intelligence, fleet operations, and India's commercial vehicle industry from Treel's team and founder.",
    url: "https://treel.in/insights",
  },
};

export default function InsightsPage() {
  return (
    <div className="space-y-0 bg-[#111927] text-[#FAF7F2] font-inter">
      {/* Client View with Filters, Featured Card, Grid, and Newsletter */}
      <InsightsClientView />
    </div>
  );
}
