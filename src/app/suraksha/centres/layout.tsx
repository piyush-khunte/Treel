import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suraksha Service & Fitment Centres",
  description:
    "Find authorized Treel Suraksha fitment, calibration, and support centres along major Indian national transport hubs and highway corridors.",
  alternates: {
    canonical: "https://treel.in/suraksha/centres",
  },
  openGraph: {
    title: "Suraksha Service & Fitment Centres",
    description:
      "Find authorized Treel Suraksha fitment, calibration, and support centres along major Indian national transport hubs and highway corridors.",
    url: "https://treel.in/suraksha/centres",
  },
};

export default function SurakshaCentresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

