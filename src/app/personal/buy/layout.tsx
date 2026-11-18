import { DEFAULT_OG_IMAGES } from "@/lib/seo/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buy Personal TPMS Kits for Cars & Two-Wheelers",
  description:
    "Buy Treel Bluetooth tyre pressure monitoring systems for passenger cars and two-wheelers. Real-time phone alerts, easy DIY installation, and warranty.",
  alternates: {
    canonical: "https://treel.in/personal/buy",
  },
  openGraph: {
    images: DEFAULT_OG_IMAGES,
    title: "Buy Personal TPMS Kits for Cars & Two-Wheelers",
    description:
      "Buy Treel Bluetooth tyre pressure monitoring systems for passenger cars and two-wheelers. Real-time phone alerts, easy DIY installation, and warranty.",
    url: "https://treel.in/personal/buy",
  },
};

export default function PersonalBuyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

