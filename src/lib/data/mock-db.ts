// Comprehensive Data Layer for Treel Mobility Solutions Platform

export interface ProductVariant {
  id: string;
  sku: string;
  name: string;
  category: "personal" | "suraksha" | "accessory";
  vehicleType: "2W" | "4W" | "5W" | "6W" | "10W" | "12W" | "16W";
  price: number;
  mrp: number;
  sensorType: "Internal (Inner-Liner)" | "External (Valve-Cap)";
  sensorCount: number;
  batteryLife: string;
  warrantyYears: number;
  stock: number;
  image: string;
  features: string[];
  specs: Record<string, string>;
  inTheBox: string[];
}

export const PRODUCTS_CATALOGUE: ProductVariant[] = [
  {
    id: "personal-4w-internal",
    sku: "TRL-4W-INT",
    name: "Treel Personal TPMS Internal Kit (4 Tyres)",
    category: "personal",
    vehicleType: "4W",
    price: 4999,
    mrp: 8999,
    sensorType: "Internal (Inner-Liner)",
    sensorCount: 4,
    batteryLife: "5 Years (Industrial Grade CR2050)",
    warrantyYears: 2,
    stock: 1420,
    image: "/images/product-4w.png",
    features: [
      "Sub-second 0.1 PSI accuracy MEMS sensors",
      "Bluetooth 5.0 BLE instant smartphone sync",
      "Internal rim mounting — 100% theft-proof & weatherproof",
      "Instant audio-visual alarm on rapid pressure drop or high heat",
      "Treel Care iOS & Android app connectivity",
      "Pre-calibrated in factory — ready to pair in 10 minutes"
    ],
    specs: {
      "Pressure Range": "0 - 99 PSI (0 - 6.8 Bar)",
      "Temperature Range": "-40°C to +125°C",
      "Pressure Accuracy": "±0.1 PSI",
      "Temperature Accuracy": "±1°C",
      "Wireless Protocol": "Bluetooth 5.0 Low Energy (BLE)",
      "Transmission Frequency": "2.4 GHz",
      "Ingress Protection": "IP69K (High-pressure water & dust-proof)",
      "Sensor Weight": "24g per sensor",
      "Display Unit": "Monocrystalline Solar Glass Cockpit Display + USB-C"
    },
    inTheBox: [
      "4x Treel Internal Valve-Stem Sensors",
      "1x Monocrystalline Solar Dashboard Cockpit Display",
      "1x USB-C Emergency Fast Charging Cable",
      "1x Anti-Skid Dashboard Gel Pad",
      "4x Metallic Valve Caps with O-Rings",
      "1x Quick Installation & Warranty Certificate Card"
    ]
  },
  {
    id: "personal-5w-internal",
    sku: "TRL-5W-INT",
    name: "Treel Personal TPMS Internal Kit (5 Tyres - With Stepney)",
    category: "personal",
    vehicleType: "5W",
    price: 5499,
    mrp: 9999,
    sensorType: "Internal (Inner-Liner)",
    sensorCount: 5,
    batteryLife: "5 Years (Industrial Grade CR2050)",
    warrantyYears: 2,
    stock: 480,
    image: "/images/product-5w.png",
    features: [
      "Full 5-tyre monitoring including spare boot stepney",
      "Stepney sensor automatically stays active in app",
      "Zero risk of finding a flat spare tyre during roadside emergencies",
      "Internal theft-proof rim fitment",
      "Solar dashboard display with 5-wheel cycle indicator"
    ],
    specs: {
      "Pressure Range": "0 - 99 PSI",
      "Temperature Range": "-40°C to +125°C",
      "Pressure Accuracy": "±0.1 PSI",
      "Ingress Protection": "IP69K",
      "Sensor Weight": "24g per sensor"
    },
    inTheBox: [
      "5x Treel Internal Valve-Stem Sensors",
      "1x Monocrystalline Solar Dashboard Display",
      "1x USB-C Cable",
      "1x Installation Guide"
    ]
  },
  {
    id: "personal-2w-external",
    sku: "TRL-2W-EXT",
    name: "Treel Personal TPMS External Kit for Motorcycles & Scooters",
    category: "personal",
    vehicleType: "2W",
    price: 2499,
    mrp: 4999,
    sensorType: "External (Valve-Cap)",
    sensorCount: 2,
    batteryLife: "2 Years (User-Replaceable CR1632 Coin Cell)",
    warrantyYears: 2,
    stock: 890,
    image: "/images/product-2w.png",
    features: [
      "Direct screw-on external valve cap fitment — no tyre opening needed",
      "Includes hex anti-theft locking nuts and micro-wrench",
      "Treel Care app phone handlebar display mode with voice alerts",
      "IP67 water & monsoon mud immersion proof",
      "Crucial front-wheel puncture warning for high-speed two-wheelers"
    ],
    specs: {
      "Pressure Range": "0 - 60 PSI",
      "Temperature Range": "-20°C to +80°C",
      "Sensor Weight": "9g ultralight (zero wheel imbalance)",
      "Wireless Protocol": "Bluetooth 5.0 Low Energy"
    },
    inTheBox: [
      "2x Treel External Valve-Cap Sensors",
      "2x Anti-Theft Hex Locking Nuts",
      "1x Micro Hex Fitment Wrench",
      "2x Spare Waterproof Rubber O-Rings",
      "1x User Manual & QR App Link"
    ]
  },
  {
    id: "suraksha-6w",
    sku: "TRL-SUR-6W",
    name: "Treel Suraksha 6-Wheel Commercial Safety Kit",
    category: "suraksha",
    vehicleType: "6W",
    price: 14999,
    mrp: 24999,
    sensorType: "Internal (Inner-Liner)",
    sensorCount: 6,
    batteryLife: "5 Years Continuous Highway Haulage",
    warrantyYears: 2,
    stock: 650,
    image: "/images/suraksha-kit.png",
    features: [
      "Cabin blowout siren & high-visibility red strobe alert",
      "Heavy-duty industrial RF sensors rated for 150 PSI",
      "Nine months guaranteed payback on diesel & tyre scrap savings",
      "Instant 0% downpayment EMI from ₹1,666/month",
      "15-minute roadside installation at 400+ highway centres"
    ],
    specs: {
      "Pressure Range": "0 - 150 PSI (Commercial CV Radial)",
      "Temperature Range": "-40°C to +135°C",
      "Ingress Protection": "IP69K High-Heat & Grease Proof",
      "Display Unit": "12V/24V Heavy Cabin Siren Receiver Display"
    },
    inTheBox: [
      "6x Industrial CV Wheel-End Sensors",
      "1x 12V/24V Heavy Duty Cabin Siren Unit",
      "1x Power Harness with Fuse Protection",
      "6x Valve Stem Mounting Clamps",
      "1x Suraksha 2-Year Highway Warranty Card"
    ]
  },
  {
    id: "suraksha-10w",
    sku: "TRL-SUR-10W",
    name: "Treel Suraksha 10-Wheel Commercial Safety Kit",
    category: "suraksha",
    vehicleType: "10W",
    price: 17500,
    mrp: 28999,
    sensorType: "Internal (Inner-Liner)",
    sensorCount: 10,
    batteryLife: "5 Years Continuous Highway Haulage",
    warrantyYears: 2,
    stock: 320,
    image: "/images/suraksha-10w.png",
    features: [
      "Front steer axle + dual drive axle real-time monitoring",
      "Catches thermal runaway 20 minutes before sidewall delamination",
      "0% Downpayment EMI from ₹1,944/month on Bajaj Finance",
      "Free calibration across 400+ Indian highway network hubs"
    ],
    specs: {
      "Pressure Range": "0 - 150 PSI",
      "Temperature Range": "-40°C to +135°C",
      "Ingress Protection": "IP69K",
      "Display Unit": "Dual-Axle Matrix Siren Display"
    },
    inTheBox: [
      "10x Industrial CV Wheel-End Sensors",
      "1x Heavy Duty Cabin Siren Display",
      "1x Full Wiring Harness",
      "1x 2-Year Warranty Certificate"
    ]
  }
];

export interface HighwayCentre {
  id: string;
  name: string;
  city: string;
  state: string;
  highway: string;
  address: string;
  phone: string;
  technician: string;
  lat: number;
  lng: number;
  isOpen24h: boolean;
  services: string[];
}

export const HIGHWAY_CENTRES: HighwayCentre[] = [
  {
    id: "ctr-01",
    name: "JK Tyre Truck Wheels — Sanjay Gandhi Transport Nagar",
    city: "New Delhi",
    state: "Delhi NCR",
    highway: "NH-44 (GT Road)",
    address: "Plot 42, Main GT Karnal Road, SGTN, Delhi - 110042",
    phone: "+91 98100 44221",
    technician: "Rakesh Verma (Senior Wheel Specialist)",
    lat: 28.7501,
    lng: 77.1423,
    isOpen24h: true,
    services: ["Suraksha 15-Min Fitment", "Wheel Alignment", "Sensor Calibration", "EMI Spot Approval"]
  },
  {
    id: "ctr-02",
    name: "Treel Highway Express Care — Kalamboli Transport Hub",
    city: "Navi Mumbai",
    state: "Maharashtra",
    highway: "NH-48 (Mumbai-Pune Expressway Start)",
    address: "Sector 1E, Opp. Steel Market, Kalamboli, Navi Mumbai - 410218",
    phone: "+91 98220 88912",
    technician: "Ganesh Patil",
    lat: 19.0330,
    lng: 73.1022,
    isOpen24h: true,
    services: ["Suraksha 15-Min Fitment", "High-Pressure Nitrogen Fill", "Sensor Replacement"]
  },
  {
    id: "ctr-03",
    name: "JK Retread & Safety Hub — Chakan Industrial Area",
    city: "Pune",
    state: "Maharashtra",
    highway: "NH-60 (Pune-Nashik Corridor)",
    address: "Phase II, Chakan MIDC, Near Mercedes-Benz, Pune - 410501",
    phone: "+91 98500 11994",
    technician: "Sunil Shinde",
    lat: 18.7511,
    lng: 73.8562,
    isOpen24h: true,
    services: ["Suraksha Fitment", "OEM Telematics Calibration", "Digital Twin Setup"]
  },
  {
    id: "ctr-04",
    name: "National Highway Safety Point — Nelamangala Toll Plaza",
    city: "Bengaluru",
    state: "Karnataka",
    highway: "NH-48 (Bengaluru-Tumkur Road)",
    address: "KM 28, Near Nelamangala Toll Post, Bengaluru - 562123",
    phone: "+91 94480 33441",
    technician: "Manjunath Gowda",
    lat: 13.0982,
    lng: 77.3892,
    isOpen24h: true,
    services: ["Suraksha 15-Min Fitment", "24x7 Highway Assistance", "EMI Documentation"]
  },
  {
    id: "ctr-05",
    name: "JK Truck Care Centre — Madhavaram Freight Terminal",
    city: "Chennai",
    state: "Tamil Nadu",
    highway: "NH-16 (Chennai-Kolkata Highway)",
    address: "100 Feet Road, Madhavaram Truck Terminal, Chennai - 600110",
    phone: "+91 94440 77812",
    technician: "K. Selvam",
    lat: 13.1482,
    lng: 80.2314,
    isOpen24h: true,
    services: ["Suraksha 15-Min Fitment", "Multi-Axle Alignment", "Nitrogen Refill"]
  },
  {
    id: "ctr-06",
    name: "Autobahn Fleet Care — Dankuni Interchange",
    city: "Kolkata",
    state: "West Bengal",
    highway: "NH-19 (Delhi-Kolkata Corridor)",
    address: "Delhi Road, Dankuni Crossing, Hooghly, Kolkata - 712311",
    phone: "+91 98300 55667",
    technician: "Debashis Roy",
    lat: 22.6841,
    lng: 88.2911,
    isOpen24h: true,
    services: ["Suraksha 15-Min Fitment", "Sensor Calibration", "Roadside Emergency Support"]
  },
  {
    id: "ctr-07",
    name: "JK Tyre Wheels & Safety — Transport Nagar Jaipur",
    city: "Jaipur",
    state: "Rajasthan",
    highway: "NH-21 / NH-48",
    address: "Plot 12, Transport Nagar Main Road, Jaipur - 302004",
    phone: "+91 98290 12344",
    technician: "Surendra Singh",
    lat: 26.8921,
    lng: 75.8452,
    isOpen24h: true,
    services: ["Suraksha Fitment", "High-Heat Thermal Calibration", "EMI Spot Clearance"]
  },
  {
    id: "ctr-08",
    name: "Shree Ganesh Truck Hub — Aslali Ring Road",
    city: "Ahmedabad",
    state: "Gujarat",
    highway: "NH-48 (Ahmedabad-Surat Expressway)",
    address: "Aslali Circle, S.P. Ring Road, Ahmedabad - 382427",
    phone: "+91 98250 99881",
    technician: "Ketan Patel",
    lat: 22.9231,
    lng: 72.5841,
    isOpen24h: true,
    services: ["Suraksha 15-Min Fitment", "Chemical Tanker Compliance Check"]
  }
];

export interface OrderRecord {
  orderId: string;
  customerName: string;
  email: string;
  phone: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    pincode: string;
  };
  items: {
    id: string;
    sku: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  couponCode?: string;
  discountAmount: number;
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  paymentMethod: "UPI" | "CARD" | "NETBANKING" | "COD";
  paymentStatus: "paid" | "pending" | "failed";
  shipmentStatus: "processing" | "shipped" | "in_transit" | "out_for_delivery" | "delivered";
  trackingNumber: string;
  carrier: string;
  createdAt: string;
}

export const INITIAL_ORDERS: OrderRecord[] = [
  {
    orderId: "TRL-2026-94821",
    customerName: "Rajesh Kumar Sharma",
    email: "rajesh.sharma@gmail.com",
    phone: "+91 98200 12345",
    address: {
      line1: "Flat 402, Royal Palms, Koregaon Park",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001"
    },
    items: [
      {
        id: "personal-4w-internal",
        sku: "TRL-4W-INT",
        name: "Treel Personal TPMS Internal Kit (4 Tyres)",
        quantity: 1,
        price: 4999
      }
    ],
    couponCode: "TREEL10",
    discountAmount: 500,
    subtotal: 4499,
    gstAmount: 809.82,
    totalAmount: 4499,
    paymentMethod: "UPI",
    paymentStatus: "paid",
    shipmentStatus: "out_for_delivery",
    trackingNumber: "SR-84920192-IN",
    carrier: "Shiprocket Express Air",
    createdAt: "2026-10-01T10:15:00.000Z"
  }
];
