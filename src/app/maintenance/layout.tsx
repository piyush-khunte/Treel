import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scheduled Maintenance",
  description:
    "Treel is undergoing scheduled maintenance. Leave your email and we will let you know as soon as the site is back, or reach our support team directly.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: "https://treel.in/maintenance",
  },
};

export default function MaintenanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
