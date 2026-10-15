import { MongoBlog, ArticleSection } from "@/types/admin";

export type { ArticleSection };

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
  sections?: ArticleSection[];
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
  author?: string;
  authorRole?: string;
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
  sections?: ArticleSection[];
  content?: string;
  image?: string;
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

export interface EventAgendaItem {
  time: string;
  title: string;
  speaker: string;
  desc: string;
}

export interface EventSpeaker {
  name: string;
  role: string;
  org: string;
  bio: string;
}

export interface EventItemRecord {
  _id: string;
  slug: string;
  name: string;
  title?: string;
  type: string; // "Conference" | "Webinar" | "In-person" | "Meetup" | "Roundtable" | "Keynote"
  dateTime: string;
  startDate?: string;
  endDate?: string;
  location: string;
  isOnline?: boolean;
  excerpt: string;
  about?: string[];
  agenda?: EventAgendaItem[];
  speakers?: EventSpeaker[];
  materialUrl?: string;
  materialLabel?: string;
  registrationUrl?: string;
  bannerUrl?: string;
  image?: string;
  featured?: boolean;
  status: "Upcoming" | "Ongoing" | "Completed" | "Cancelled";
  publicationStatus: "Published" | "Draft";
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface JobOpeningRecord {
  _id: string;
  slug: string;
  title: string;
  team: string; // Department e.g. "Engineering", "Product", "GTM", "Operations"
  location: string; // e.g. "Pune", "Hybrid", "Remote"
  type: string; // "Full-time" | "Part-time" | "Contract" | "Internship"
  workArrangement?: string; // "Onsite" | "Hybrid" | "Remote"
  postedDate?: string;
  deadline?: string;
  roleSummary: string; // excerpt
  aboutTheRole: string[];
  responsibilities: string[];
  mustHaves: string[];
  niceToHaves?: string[];
  whatYouGet?: string[];
  experienceLevel?: string;
  applicationUrl?: string;
  relatedSlugs?: string[];
  status: "Published" | "Draft" | "Closed";
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type WhitepaperFormat = "PDF" | "DOC" | "DOCX";

export interface WhitepaperRecord {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  description?: string;
  topic: "ROI & Payback" | "Vehicle Digital Twin" | "Predictive Maintenance" | "Fleet Operations" | "Case Study" | string;
  industry: "All" | "Logistics" | "Passenger Transport" | "Construction" | "Mining" | "OEM" | string;
  author?: string;
  length?: string; // e.g. "28 pages"
  publishDate?: string; // e.g. "October 2026"
  fileUrl: string; // Storage URL or local path
  fileFormat: WhitepaperFormat;
  fileSize: number; // in bytes
  fileSizeFormatted?: string; // e.g. "2.4 MB"
  originalFilename: string;
  coverImage?: string;
  isFeatured?: boolean;
  publicationStatus: "Published" | "Draft";
  gated?: boolean;
  directUrl?: string;
  seoTitle?: string;
  seoDescription?: string;
  downloadCount?: number;
  displayOnTmip?: boolean;
  displayOnResearch?: boolean;
  category?: "treel_main" | "tmip" | "both" | string;
  chapters?: string[];
  year?: string;
  createdAt?: string;
  updatedAt?: string;
}

