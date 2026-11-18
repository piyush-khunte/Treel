import type { Metadata } from "next";
import { DEFAULT_OG_IMAGES, SITE_URL } from "@/lib/seo/metadata";

const title = "Apply for Suraksha EMI · Zero-Cost Monthly Plans";
const description =
  "Apply for a zero-cost EMI on the Suraksha truck tyre safety kit. Share a few details and our team will help you complete the application quickly.";
const url = `${SITE_URL}/suraksha/emi/apply`;

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

export default function SurakshaEmiApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
