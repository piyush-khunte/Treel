import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Warranty & Replacement Policy — Personal TPMS",
  description:
    "Official manufacturer warranty policy and replacement terms for Treel Bluetooth TPMS sensors, valve stems, and hardware components.",
  alternates: {
    canonical: "https://treel.in/personal/support/warranty",
  },
  openGraph: {
    title: "Warranty & Replacement Policy — Personal TPMS",
    description:
      "Official manufacturer warranty policy and replacement terms for Treel Bluetooth TPMS sensors, valve stems, and hardware components.",
    url: "https://treel.in/personal/support/warranty",
  },
};

export default function PersonalWarrantyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

