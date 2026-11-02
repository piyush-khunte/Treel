import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Personal TPMS Troubleshooting Guide",
  description:
    "Troubleshoot Treel Bluetooth TPMS sensor connectivity, mobile app pairing, pressure discrepancies, and battery status with step-by-step guidance.",
  alternates: {
    canonical: "https://treel.in/personal/support/troubleshooting",
  },
  openGraph: {
    title: "Personal TPMS Troubleshooting Guide",
    description:
      "Troubleshoot Treel Bluetooth TPMS sensor connectivity, mobile app pairing, pressure discrepancies, and battery status with step-by-step guidance.",
    url: "https://treel.in/personal/support/troubleshooting",
  },
};

export default function PersonalTroubleshootingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

