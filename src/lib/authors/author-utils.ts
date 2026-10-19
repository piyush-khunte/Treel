export interface AuthorProfile {
  slug: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  location: string;
  avatarUrl?: string;
  isFounder?: boolean;
}

export interface AuthoredArticleItem {
  id: string;
  slug: string;
  title: string;
  deckOrExcerpt: string;
  category: string;
  categoryUrl?: string;
  url: string;
  date: string;
  readTime: string;
  source: "insights" | "tmip" | "suraksha" | "personal";
  sourceLabel: string;
}

export function slugifyAuthor(name?: string): string {
  if (!name) return "treel-team";
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

import { TEAM_MEMBERS } from "@/lib/data/leadership";

export function getLeadershipPhotoForAuthor(authorName?: string): string | null {
  if (!authorName) return null;
  const clean = authorName
    .toLowerCase()
    .replace(/^(mr\.|mrs\.|ms\.|dr\.)\s+/i, "")
    .replace(/[^\w\s-]/g, "")
    .trim();

  for (const member of TEAM_MEMBERS) {
    const memberClean = member.name
      .toLowerCase()
      .replace(/^(mr\.|mrs\.|ms\.|dr\.)\s+/i, "")
      .replace(/[^\w\s-]/g, "")
      .trim();

    // Exact or normalized match
    if (clean === memberClean) {
      return member.image;
    }

    const cleanTokens = clean.split(/\s+/);
    const memberTokens = memberClean.split(/\s+/);

    if (cleanTokens.length > 1 && memberTokens.length > 1) {
      const firstMatch = cleanTokens[0] === memberTokens[0] || (cleanTokens[0].startsWith("nith") && memberTokens[0].startsWith("nit"));
      const lastMatch =
        cleanTokens[cleanTokens.length - 1] === memberTokens[memberTokens.length - 1] ||
        (cleanTokens[cleanTokens.length - 1].startsWith("chaudh") && memberTokens[memberTokens.length - 1].startsWith("chaudh")) ||
        (cleanTokens[cleanTokens.length - 1].startsWith("choudh") && memberTokens[memberTokens.length - 1].startsWith("chaudh")) ||
        (cleanTokens[cleanTokens.length - 1].startsWith("chaudh") && memberTokens[memberTokens.length - 1].startsWith("choudh"));

      if (firstMatch && lastMatch) {
        return member.image;
      }
    }

    // Single name match (e.g. "Nithin" -> "Mr. Nitin Karande")
    if (cleanTokens.length === 1 && (cleanTokens[0] === "nithin" || cleanTokens[0] === "nitin") && memberTokens[0] === "nitin") {
      return member.image;
    }
  }

  return null;
}

export const VERIFIED_AUTHORS: Record<string, AuthorProfile> = {
  "manish-ingale": {
    slug: "manish-ingale",
    name: "Manish Ingale",
    role: "Founder & Chief Executive",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    isFounder: true,
    bio: "Manish Ingale founded Treel in 2018 with the conviction that India's commercial vehicles were producing more data than any company was reading. With deep engineering roots across the tyre and mobility industries, he leads Treel's architecture, hardware innovation, and enterprise expansion from Pune.",
  },
  "pradnya-choudhary": {
    slug: "pradnya-choudhary",
    name: "Pradnya Choudhary",
    role: "Hardware Lead",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    avatarUrl: "/images/leadership/pradnya_chaudhari.png",
    bio: "Pradnya Choudhary directs embedded hardware engineering, ARAI sensor certification, and low-power RF sensor validation for commercial fleet durability under extreme Indian road conditions.",
  },
  "pradnya-chaudhari": {
    slug: "pradnya-chaudhari",
    name: "Pradnya Choudhary",
    role: "Hardware Lead",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    avatarUrl: "/images/leadership/pradnya_chaudhari.png",
    bio: "Pradnya Choudhary directs embedded hardware engineering, ARAI sensor certification, and low-power RF sensor validation for commercial fleet durability under extreme Indian road conditions.",
  },
  "atharv": {
    slug: "atharv",
    name: "Atharv",
    role: "Product Management",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    bio: "Oversees the product roadmap for TMIP Enterprise, Project Suraksha, and Personal TPMS apps across iOS and Android, focusing on intuitive UX and driver safety workflows.",
  },
  "imran-khan": {
    slug: "imran-khan",
    name: "Imran Khan",
    role: "Chief Financial Officer",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    avatarUrl: "/images/leadership/imran-khan.png",
    bio: "Manages financial strategy, capital allocation, enterprise procurement frameworks, and commercial operations across Treel's national mobility intelligence network.",
  },
  "nithin": {
    slug: "nithin",
    name: "Nithin",
    role: "Engineering Lead",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    avatarUrl: "/images/leadership/Nitin_Karande.png",
    bio: "Specializes in edge computing, distributed firmware, and telemetry ingestion pipelines across commercial fleet networks and highway IoT infrastructure.",
  },
  "mahesh-sakat": {
    slug: "mahesh-sakat",
    name: "Mahesh Sakat",
    role: "Head of Quality",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    avatarUrl: "/images/leadership/mahesh-sakat.jpeg",
    bio: "Automotive quality professional with over 14 years of experience in quality management system, product development, supplier quality & manufacturing quality assurance.",
  },
  "suresh-fale": {
    slug: "suresh-fale",
    name: "Suresh Fale",
    role: "Senior Manager Finance & HR, Admin",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    avatarUrl: "/images/leadership/suresh-fale.png",
    bio: "An accomplished finance professional with over 17 years of experience across accounting, finance, administration, human resources, taxation, and financial operations.",
  },
  "treel-mobility-team": {
    slug: "treel-mobility-team",
    name: "Treel Mobility Team",
    role: "Research & Telemetry Engineering",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    bio: "The engineering, data science, and telemetry research group at Treel Mobility Solutions, advancing tyre sensor intelligence, connected vehicle analytics, and fleet safety.",
  },
  "treel-research": {
    slug: "treel-research",
    name: "Treel Research",
    role: "Mobility Intelligence Research Group",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    bio: "Treel's applied research division publishing empirical studies on commercial fleet physics, rolling resistance thermodynamics, and vehicle digital twin architectures.",
  },
  "treel-engineering": {
    slug: "treel-engineering",
    name: "Treel Engineering",
    role: "Sensor & Embedded Systems Group",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    bio: "Core engineering team developing automotive-grade rim sensors, edge gateways, BLE transducers, and vehicle communication algorithms.",
  },
  "treel-automotive-team": {
    slug: "treel-automotive-team",
    name: "Treel Automotive Team",
    role: "Consumer TPMS Specialists",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    bio: "Automotive technical team providing guidance on passenger car tyre pressure management, Bluetooth sensor fitment, and highway vehicle safety.",
  },
  "suraksha-fleet-team": {
    slug: "suraksha-fleet-team",
    name: "Suraksha Fleet Team",
    role: "Safety Operations & Driver Support Desk",
    company: "Treel Suraksha",
    location: "Pune, India",
    bio: "The driver welfare and commercial vehicle safety operations team at Treel Suraksha, providing real-time pressure monitoring, puncture warnings, and highway safety guidance for owner-operators across India.",
  },
  "karan-verma": {
    slug: "karan-verma",
    name: "Karan Verma",
    role: "Automotive Technical Writer & Field Engineer",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    bio: "Technical specialist focusing on cold tyre inflation calibration, seasonal weather variations, and tyre maintenance for Indian highway driving.",
  },
  "aditi-rao": {
    slug: "aditi-rao",
    name: "Aditi Rao",
    role: "Vehicle Dynamics Researcher",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    bio: "Researches tyre compound degradation, wet weather aquaplaning thresholds, and tyre tread dynamics across national highway networks.",
  },
  "dr-sandeep-nair": {
    slug: "dr-sandeep-nair",
    name: "Dr. Sandeep Nair",
    role: "Materials & Tyre Science Consultant",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    bio: "Advises on tyre hysteresis, rolling resistance coefficients, and the thermal behavior of commercial and passenger radial casings.",
  },
};
