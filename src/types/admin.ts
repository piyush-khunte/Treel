// TypeScript Types for Treel Admin Panel
// Aligned with the migrated Supabase schema (TreelEcommerce.*)

export interface MongoProduct {
  _id: string;
  title: string;
  price: number;
  saleprice: number | null;
  category: string;
  editorValue?: string;
  description?: string;
  slug: string;
  image: string;
  image2?: string;
  image3?: string;
  image4?: string;
  image5?: string;
  galleryImage1?: string;
  galleryImage2?: string;
  boxpoint?: string;
  stepone?: string;
  steptwo?: string;
  stepthree?: string;
  stepfour?: string;
  stepdescription1?: string;
  stepdescription2?: string;
  stepdescription3?: string;
  stepdescription4?: string;
  couponamount?: string | number | null;
  couponcode?: string | null;
  productsku?: string;
  date?: string;
  __v?: number;
}

export interface MongoCartItem {
  id?: string;
  title: string;
  description?: string;
  image?: string;
  category?: string;
  originalPrice?: string | number;
  price: string | number;
  quantity: string | number;
  productsku?: string;
  saleprice?: string | number | null;
  couponcode?: string | null;
  couponamount?: string | number | null;
  couponMessage?: string;
  saveAmount?: string | number;
}

export interface MongoCheckout {
  _id: string;
  firstname: string;
  lastname: string;
  contact?: string;
  phone: string | number;
  address: string;
  addressoptional?: string;
  city: string;
  state: string;
  pin: string | number;
  country: string;
  price: string | number;
  status: string;
  date?: string;
  __v?: number;
  cartData?: MongoCartItem[];
}

export interface MongoPayment {
  _id: string;
  payment_id: string;
  order_id: string;
  amount: number;
  customer_name: string;
  product_name: string;
  created_at?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface MongoBlog {
  _id: string;
  title: string;
  subtitle?: string;
  slug: string;
  description: string;
  blogContent: string;
  image: string;
  metatitle?: string;
  metadescription?: string;
  date?: string;
  __v?: string | number;
}

export interface MongoAnnualReturn {
  _id: string;
  title: string;
  pdf: string;
  date: string;
  __v?: number;
}

export interface NoticeItem {
  _id: string;
  title: string;
  description: string;
  publishedDate?: string;
  status: "Published" | "Draft";
  category?: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
