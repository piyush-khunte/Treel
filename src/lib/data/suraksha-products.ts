import { MongoProduct } from "@/types/admin";

export interface SurakshaConfigSeed {
  id: string;
  brand: "suraksha";
  title: string;
  type: string;
  tyres: number;
  price: number;
  saleprice: number | null;
  category: string;
  axleSetup: string;
  description: string;
  slug: string;
  productsku: string;
  popular: boolean;
  image: string;
}

export const SURAKSHA_DEFAULT_CONFIGS: SurakshaConfigSeed[] = [
  {
    id: "6b0000000000000000000006",
    brand: "suraksha",
    title: "Treel Suraksha Commercial Kit - 6 Wheeler",
    type: "6-wheeler",
    tyres: 6,
    price: 10200,
    saleprice: 10200,
    category: "Commercial Truck Kit",
    axleSetup: "2 Axles · Steer & Drive",
    description: "1 in-cab display + 6 tyre sensors + mounting kit + wiring harness",
    slug: "suraksha-6-wheeler",
    productsku: "SKU-SURAKSHA-6W",
    popular: false,
    image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
  },
  {
    id: "6b0000000000000000000010",
    brand: "suraksha",
    title: "Treel Suraksha Commercial Kit - 10 Wheeler",
    type: "10-wheeler",
    tyres: 10,
    price: 17000,
    saleprice: 17000,
    category: "Commercial Truck Kit",
    axleSetup: "3 Axles · Multi-Axle Haulage",
    description: "1 in-cab display + 10 tyre sensors + mounting kit + wiring harness",
    slug: "suraksha-10-wheeler",
    productsku: "SKU-SURAKSHA-10W",
    popular: true,
    image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
  },
  {
    id: "6b0000000000000000000012",
    brand: "suraksha",
    title: "Treel Suraksha Commercial Kit - 12 Wheeler",
    type: "12-wheeler",
    tyres: 12,
    price: 20400,
    saleprice: 20400,
    category: "Commercial Truck Kit",
    axleSetup: "4 Axles · Heavy Commercial",
    description: "1 in-cab display + 12 tyre sensors + mounting kit + wiring harness",
    slug: "suraksha-12-wheeler",
    productsku: "SKU-SURAKSHA-12W",
    popular: false,
    image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
  },
  {
    id: "6b0000000000000000000014",
    brand: "suraksha",
    title: "Treel Suraksha Commercial Kit - 14 Wheeler",
    type: "14-wheeler",
    tyres: 14,
    price: 23800,
    saleprice: 23800,
    category: "Commercial Truck Kit",
    axleSetup: "4-5 Axles · Multi-Axle Goods",
    description: "1 in-cab display + 14 tyre sensors + mounting kit + wiring harness",
    slug: "suraksha-14-wheeler",
    productsku: "SKU-SURAKSHA-14W",
    popular: false,
    image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
  },
  {
    id: "6b0000000000000000000016",
    brand: "suraksha",
    title: "Treel Suraksha Commercial Kit - 16 Wheeler",
    type: "16-wheeler",
    tyres: 16,
    price: 27200,
    saleprice: 27200,
    category: "Commercial Truck Kit",
    axleSetup: "5 Axles · Heavy Haulage",
    description: "1 in-cab display + 16 tyre sensors + mounting kit + wiring harness",
    slug: "suraksha-16-wheeler",
    productsku: "SKU-SURAKSHA-16W",
    popular: false,
    image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
  },
  {
    id: "6b0000000000000000000018",
    brand: "suraksha",
    title: "Treel Suraksha Commercial Kit - 18 Wheeler",
    type: "18-wheeler",
    tyres: 18,
    price: 30600,
    saleprice: 30600,
    category: "Commercial Truck Kit",
    axleSetup: "Prime Mover + Multi-Axle Trailer",
    description: "1 in-cab display + 18 tyre sensors + mounting kit + wiring harness",
    slug: "suraksha-18-wheeler",
    productsku: "SKU-SURAKSHA-18W",
    popular: false,
    image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1791436567/Treel_New_Logo_Final_With_Favicon_Tagline.png",
  },
];

export function mapSurakshaConfigToMongo(config: SurakshaConfigSeed): MongoProduct {
  return {
    _id: config.id,
    brand: "suraksha",
    brand_scope: "suraksha",
    title: config.title,
    price: config.price,
    saleprice: config.saleprice,
    category: config.category,
    description: config.description,
    slug: config.slug,
    image: config.image,
    productsku: config.productsku,
    stepone: config.axleSetup,
    boxpoint: `<ul><li>1 In-Cab Display (3.5" LCD, 12V wired)</li><li>${config.tyres} ARAI-Certified Tyre Sensors</li><li>Sensor Mounting Kit with Anti-Theft Lock</li><li>Direct 12V Wiring Harness</li><li>3-Year Replacement Warranty</li>${config.popular ? "<li>Most Popular Fleet Configuration</li>" : ""}</ul>`,
    editorValue: `<h2>Treel Suraksha Commercial Safety Kit (${config.tyres} Tyres)</h2><p>Designed for commercial vehicles with ${config.axleSetup}. Includes standalone 12V in-cab display with real-time pressure and temperature monitoring.</p><ul><li><strong>Sensors:</strong> ${config.tyres} Nos. ARAI Certified</li><li><strong>Axle Setup:</strong> ${config.axleSetup}</li><li><strong>Rate:</strong> ₹1,700 per tyre (₹${config.price.toLocaleString("en-IN")} total)</li><li><strong>Warranty:</strong> 3-Year Sensor Replacement Warranty</li><li><strong>No Monthly Fees:</strong> Zero subscription</li></ul>`,
    date: "2026-01-01T00:00:00.000Z",
    status: "active",
    stock: 100,
  };
}

export const SURAKSHA_DEFAULT_PRODUCTS: MongoProduct[] =
  SURAKSHA_DEFAULT_CONFIGS.map(mapSurakshaConfigToMongo);
