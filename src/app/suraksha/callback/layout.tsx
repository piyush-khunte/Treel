import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request a Callback — Suraksha Truck TPMS",
  description:
    "Request an instant callback from a Treel Suraksha commercial vehicle tyre safety specialist to discuss fleet fitment and zero-cost EMI plans.",
  alternates: {
    canonical: "https://treel.in/suraksha/callback",
  },
  openGraph: {
    title: "Request a Callback — Suraksha Truck TPMS",
    description:
      "Request an instant callback from a Treel Suraksha commercial vehicle tyre safety specialist to discuss fleet fitment and zero-cost EMI plans.",
    url: "https://treel.in/suraksha/callback",
  },
};

export default function SurakshaCallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

