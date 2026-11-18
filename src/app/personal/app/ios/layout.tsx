import type { Metadata } from "next";
import { DEFAULT_OG_IMAGES, SITE_URL } from "@/lib/seo/metadata";

const title = "Treel Care for iPhone · Personal TPMS App";
const description =
  "Download the Treel Care app from the App Store to pair your Personal TPMS sensors and track live tyre pressure and temperature on your iPhone.";
const url = `${SITE_URL}/personal/app/ios`;

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
};

export default function PersonalAppIosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
