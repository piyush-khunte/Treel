import type { Metadata } from "next";
import { DEFAULT_OG_IMAGES, SITE_URL } from "@/lib/seo/metadata";

const title = "Track Your Order — Personal TPMS";
const description =
  "Check the live dispatch and delivery status of your Treel Personal TPMS kit using your order number and the email address used at checkout.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${SITE_URL}/personal/track-order`,
  },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title,
    description,
    url: `${SITE_URL}/personal/track-order`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PersonalTrackOrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
