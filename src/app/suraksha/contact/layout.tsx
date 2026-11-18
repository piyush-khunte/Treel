import { DEFAULT_OG_IMAGES } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Suraksha Fleet Support",
  description:
    "Connect with Treel's Suraksha commercial fleet support team for roadside assistance, technical support, fitment bookings, and warranty queries.",
  alternates: {
    canonical: "https://treel.in/suraksha/contact",
  },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: "Contact Suraksha Fleet Support",
    description:
      "Connect with Treel's Suraksha commercial fleet support team for roadside assistance, technical support, fitment bookings, and warranty queries.",
    url: "https://treel.in/suraksha/contact",
  },
};

export default function SurakshaContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

