import { MongoBlog } from "@/types/admin";

export type ContentCategoryType = "treel_main" | "tmip" | "suraksha" | "personal";

export interface TreelInsightArticle {
  _id: string;
  slug: string;
  category: "Mobility Intelligence" | "Fleet Operations" | "Product Updates" | "Industry Analysis" | "Case Studies" | "Founder Notes" | string;
  categorySlug?: string;
  title: string;
  deck: string; // excerpt / summary
  author: string;
  authorRole: string;
  authorBio: string;
  date: string; // display date e.g. "September 2026"
  publishIsoDate?: string;
  readTime: string; // e.g. "6 min read"
  tldr: string;
  body: {
    sections: {
      heading: string;
      paragraphs: string[];
    }[];
    pullQuote?: {
      quote: string;
      attribution: string;
    };
  };
  relatedSlugs?: string[];
  status: "Published" | "Draft";
  createdAt?: string;
  updatedAt?: string;
}

export interface TmipCaseStudy {
  _id: string;
  slug: string;
  industry: "Logistics" | "Passenger Transport" | "Construction" | "Mining" | "OEM" | string;
  fleetSize: "Under 100" | "100-500" | "500-2000" | "2000+" | string;
  headline: string;
  excerpt: string;
  metricValue: string;
  metricLabel: string;
  isFeatured?: boolean;
  status: "Published" | "Draft";
  customerProfile?: string;
  results?: {
    value: string;
    label: string;
    delta?: string;
    desc: string;
  }[];
  challenge?: string;
  solution?: string;
  quote?: {
    text: string;
    author: string;
    title: string;
  };
  content?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SurakshaArticle {
  _id: string;
  slug?: string;
  title: string;
  category: "Fuel efficiency" | "Safety" | "Business & GST" | "Route planning" | "Industry news" | "Maintenance" | string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  keyTakeaway?: string;
  status: "Published" | "Draft";
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type PersonalBlogArticle = MongoBlog;

export type CategoryContentItem = 
  | ({ categoryType: "treel_main" } & TreelInsightArticle)
  | ({ categoryType: "tmip" } & TmipCaseStudy)
  | ({ categoryType: "suraksha" } & SurakshaArticle)
  | ({ categoryType: "personal" } & PersonalBlogArticle);

