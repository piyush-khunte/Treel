import type { Metadata } from "next";
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

import { getPublishedInsights } from "@/lib/content/insights-storage";

export default async function InsightsPage() {
  const publishedInsights = await getPublishedInsights();

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* Client View with Filters, Featured Card, Grid, and Newsletter */}
      <InsightsClientView initialArticles={publishedInsights} />
    </div>
  );
}
