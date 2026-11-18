import type { Metadata } from "next";
import { DEFAULT_OG_IMAGES, SITE_URL } from "@/lib/seo/metadata";

const title = "Write a Review — Personal TPMS";
const description =
  "Share your experience with Treel Personal TPMS. Rate the sensors and Treel Care app and help other car and two-wheeler owners choose with confidence.";
const url = `${SITE_URL}/personal/reviews/write`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title,
    description,
    url,
  },
  // Form page: keep it out of the index but let crawlers follow its links.
  robots: {
    index: false,
    follow: true,
  },
};

export default function PersonalReviewsWriteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
