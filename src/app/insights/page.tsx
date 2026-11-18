import { DEFAULT_OG_IMAGES } from "@/lib/seo/metadata";
import type { Metadata } from "next";
import { InsightsClientView } from "./insights-client";

export const metadata: Metadata = {
  title: "Mobility Intelligence Insights & Perspectives",
  description: "In-depth analysis and commentary on mobility intelligence, fleet operations, and India's commercial vehicle sector from Treel's leadership team.",
  alternates: {
    canonical: "https://treel.in/insights",
  },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: "Mobility Intelligence Insights & Perspectives",
    description: "In-depth analysis and commentary on mobility intelligence, fleet operations, and India's commercial vehicle sector from Treel's leadership team.",
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
