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

export interface PressReleaseQuote {
  text: string;
  speaker: string;
  role: string;
}

export type PressReleaseCategory = "Product Launch" | "Partnership" | "Milestone" | "Company News" | string;

export interface PressItemRecord {
  _id: string;
  slug: string;
  year: string;
  date: string;
  category: PressReleaseCategory;
  headline: string;
  excerpt: string;
  city?: string;
  leadParagraph?: string;
  quote?: PressReleaseQuote;
  bodyParagraphs?: string[];
  relatedSlugs?: string[];
  externalUrl?: string;
  source?: string;
  thumbnailUrl?: string;
  isFeatured?: boolean;
  publicationStatus: "Published" | "Draft";
  createdAt?: string;
  updatedAt?: string;
}

export type MediaKitCategory = "Brand Assets" | "Photography" | "Fact Sheet & Bios" | "All-in-One Package" | string;

export interface MediaKitItemRecord {
  _id: string;
  title: string;
  category: MediaKitCategory;
  format: string;
  description: string;
  fileSize: string;
  fileUrl: string;
  details?: string;
  file?: string;
  order?: number;
  iconName?: string;
  publicationStatus: "Published" | "Draft";
  createdAt?: string;
  updatedAt?: string;
}

export type WarrantyRecordType = "registration" | "claim";

export type WarrantyStatus =
  | "Submitted"
  | "Pending Review"
  | "Under Review"
  | "Approved"
  | "Active"
  | "Rejected"
  | "Resolved";

export interface WarrantyRecord {
  _id: string;
  registrationId: string;
  type: WarrantyRecordType;
  orderId: string;
  customerEmail: string;
  customerName?: string;
  customerPhone?: string;
  productName: string;
  productCategory?: string;
  coverageDuration: string;
  coverageStatus: "Active" | "Expired" | "Pending";
  purchaseDate?: string;
  registeredAt: string;
  // Specific to Claims
  claimIssueType?: string;
  claimDescription?: string;
  claimResolution?: string;
  // Admin & Lifecycle
  status: WarrantyStatus;
  adminNotes?: string;
  reviewedBy?: string;
  reviewedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type SubscriberStatus = "confirmed" | "unsubscribed";

export interface InsightSubscriberRecord {
  _id: string;
  email: string;
  status: SubscriberStatus;
  token: string;
  source: string;
  interest?: string;
  subscribedAt: string;
  unsubscribedAt?: string | null;
  confirmedAt?: string;
  lastNotifiedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export type BroadcastStatus = "sent" | "partial" | "failed" | "test_mode" | "dry_run";

export interface DeliveryLogEntry {
  email: string;
  status: "delivered" | "failed" | "skipped";
  messageId?: string;
  error?: string;
}

export interface BroadcastNotificationRecord {
  _id: string;
  articleSlug: string;
  articleTitle: string;
  articleExcerpt?: string;
  sentAt: string;
  recipientCount: number;
  status: BroadcastStatus;
  deliveredCount: number;
  failedCount: number;
  error?: string;
  deliveryLogs?: DeliveryLogEntry[];
  createdAt: string;
}


