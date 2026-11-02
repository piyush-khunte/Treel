import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Order — Personal TPMS",
  description: "Check live delivery and dispatch tracking for your Treel Personal TPMS kit.",
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

