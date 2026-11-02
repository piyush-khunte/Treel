import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — Personal TPMS",
  description:
    "Find answers to common questions about Treel Bluetooth TPMS sensors, vehicle compatibility, battery life, calibration, and smartphone app setup.",
  alternates: {
    canonical: "https://treel.in/personal/faqs",
  },
  openGraph: {
    title: "Frequently Asked Questions — Personal TPMS",
    description:
      "Find answers to common questions about Treel Bluetooth TPMS sensors, vehicle compatibility, battery life, calibration, and smartphone app setup.",
    url: "https://treel.in/personal/faqs",
  },
};

export default function PersonalFaqsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

