import { DEFAULT_OG_IMAGES } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suraksha Video Guides & Fitment Demos",
  description:
    "Watch video walkthroughs, sensor fitment tutorials, and cabin display setup instructions for Treel Suraksha truck tyre pressure systems.",
  alternates: {
    canonical: "https://treel.in/suraksha/videos",
  },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: "Suraksha Video Guides & Fitment Demos",
    description:
      "Watch video walkthroughs, sensor fitment tutorials, and cabin display setup instructions for Treel Suraksha truck tyre pressure systems.",
    url: "https://treel.in/suraksha/videos",
  },
};

export default function SurakshaVideosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

