import type { Metadata } from "next";
import { getPublishedSurakshaArticles } from "@/lib/content/suraksha-storage";
import { SurakshaBlogClient } from "./suraksha-blog-client";

export const metadata: Metadata = {
  title: "The Drivers' Blog · Suraksha",
  description:
    "Practical tips on fuel efficiency, monsoon safety, route planning, GST for owner-drivers and industry updates, written in simple language for the trucking community.",
  alternates: {
    canonical: "https://treel.in/suraksha/blog",
  },
  openGraph: {
    title: "The Drivers' Blog · Suraksha",
    description:
      "Practical tips on fuel efficiency, monsoon safety, route planning, GST for owner-drivers and industry updates, written in simple language for the trucking community.",
    url: "https://treel.in/suraksha/blog",
  },
};

export default async function SurakshaBlogPage() {
  const publishedArticles = await getPublishedSurakshaArticles();

  return <SurakshaBlogClient initialArticles={publishedArticles} />;
}