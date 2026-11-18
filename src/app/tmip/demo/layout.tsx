import type { Metadata } from "next";
import { DEFAULT_OG_IMAGES } from "@/lib/seo/metadata";

export const metadata: Metadata = {
  title: "Request an Enterprise TMIP Demo",
  description:
    "Schedule a live platform demonstration of the Treel Mobility Intelligence Platform (TMIP) and see real-time vehicle digital twin telemetry in action.",
  alternates: {
    canonical: "https://treel.in/tmip/demo",
  },
  openGraph: {
    title: "Request an Enterprise TMIP Demo",
    description:
      "Schedule a live platform demonstration of the Treel Mobility Intelligence Platform (TMIP) and see real-time vehicle digital twin telemetry in action.",
    url: "https://treel.in/tmip/demo",
    images: DEFAULT_OG_IMAGES,
  },
};

export default function TmipDemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

