import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal TPMS Products & Kits",
  description:
    "Explore Treel's smart Bluetooth tyre pressure monitoring devices for cars, motorbikes, and premium passenger vehicles with live temperature alerts.",
  alternates: {
    canonical: "https://treel.in/personal/product",
  },
  openGraph: {
    title: "Personal TPMS Products & Kits",
    description:
      "Explore Treel's smart Bluetooth tyre pressure monitoring devices for cars, motorbikes, and premium passenger vehicles with live temperature alerts.",
    url: "https://treel.in/personal/product",
  },
};

export default function PersonalProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

