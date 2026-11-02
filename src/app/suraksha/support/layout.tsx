import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suraksha Fleet Support & Fitment Guides",
  description:
    "Access operating manuals, sensor replacement guides, driver training, and technical documentation for Treel Suraksha truck TPMS systems.",
  alternates: {
    canonical: "https://treel.in/suraksha/support",
  },
  openGraph: {
    title: "Suraksha Fleet Support & Fitment Guides",
    description:
      "Access operating manuals, sensor replacement guides, driver training, and technical documentation for Treel Suraksha truck TPMS systems.",
    url: "https://treel.in/suraksha/support",
  },
};

export default function SurakshaSupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

