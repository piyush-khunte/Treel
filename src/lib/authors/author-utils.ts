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
    bio: "Manages financial strategy, capital allocation, enterprise procurement frameworks, and commercial operations across Treel's national mobility intelligence network.",
  },
  "nithin": {
    slug: "nithin",
    name: "Nithin",
    role: "Engineering Lead",
    company: "Treel Mobility Solutions",
    location: "Pune, India",
    bio: "Specializes in edge computing, distributed firmware, and telemetry ingestion pipelines across commercial fleet networks and highway IoT infrastructure.",
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
