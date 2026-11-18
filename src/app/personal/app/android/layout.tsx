import type { Metadata } from "next";
import { DEFAULT_OG_IMAGES, SITE_URL } from "@/lib/seo/metadata";

const title = "Treel Care for Android · Personal TPMS App";
const description =
  "Get the Treel Care app on Google Play to pair your Personal TPMS sensors and see live tyre pressure and temperature for your car or two-wheeler.";
const url = `${SITE_URL}/personal/app/android`;

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

export default function PersonalAppAndroidLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
