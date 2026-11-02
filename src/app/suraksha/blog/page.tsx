import type { Metadata } from "next";
import { getPublishedSurakshaArticles } from "@/lib/content/suraksha-storage";
import { SurakshaBlogClient } from "./suraksha-blog-client";

export const metadata: Metadata = {
  title: "The Drivers' Blog · Suraksha",
  description:
    "Practical tips on fuel efficiency, tyre safety, route planning, and GST for truck owner-drivers, written in simple language for India's trucking fleet.",
  alternates: {
    canonical: "https://treel.in/suraksha/blog",
  },
  openGraph: {
    title: "The Drivers' Blog · Suraksha",
    description:
      "Practical tips on fuel efficiency, tyre safety, route planning, and GST for truck owner-drivers, written in simple language for India's trucking fleet.",
    url: "https://treel.in/suraksha/blog",
  },
};

export default async function SurakshaBlogPage() {
  const publishedArticles = await getPublishedSurakshaArticles();

  return <SurakshaBlogClient initialArticles={publishedArticles} />;
}