import { DEFAULT_OG_IMAGES } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews — Personal TPMS",
  description:
    "Read real customer reviews and ratings from vehicle owners using Treel smart Bluetooth tyre pressure monitoring systems across India.",
  alternates: {
    canonical: "https://treel.in/personal/reviews",
  },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: "Customer Reviews — Personal TPMS",
    description:
      "Read real customer reviews and ratings from vehicle owners using Treel smart Bluetooth tyre pressure monitoring systems across India.",
    url: "https://treel.in/personal/reviews",
  },
};

export default function PersonalReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

