import { Product, ProductVariant, Dealer, BlogPost, CaseStudy } from "@/types/database";

export const SEED_PRODUCTS: (Product & { variants: ProductVariant[] })[] = [
  {
    id: "prod_personal_4w_internal",
    brand_scope: "personal",
    slug: "treel-personal-tpms-car-internal",
    name: "Treel Smart Tyre Sensor · 4-Wheeler Internal Kit",
    tagline: "Precision internal TPMS with solar cockpit display & smartphone Bluetooth sync.",
    description: "Military-grade internal tyre pressure and temperature monitoring sensors engineered for Indian road conditions. Alerts you instantly to slow punctures, high temperatures, and pressure drops before blowouts occur.",
    category: "Personal TPMS",
    status: "active",
    base_price_inr: 4499,
    mrp_inr: 5999,
    tax_rate_percent: 18,
    hsn_code: "87089900",
    features: [
      "Real-time Tyre Pressure & Temperature (±0.1 PSI accuracy)",
      "High & Low Pressure Audio-Visual Warnings",
      "Fast Leakage / Slow Puncture Detection",
      "5-Year Internal Sensor Battery Life",
      "Bluetooth 5.0 Low Energy iOS & Android App",
      "Solar & USB Dual-Powered Dashboard Display",
      "IP67 Dust and Waterproof Sensor Enclosure"
    ],
    specs: {
      "Operating Frequency": "433.92 MHz / BLE 5.0",
      "Pressure Range": "0 – 99 PSI (0 – 6.8 Bar)",
      "Operating Temp": "-40°C to +125°C",
      "Sensor Battery": "CR2050 (up to 5 years)",
      "Display Battery": "Solar Panel + 500mAh Lithium-ion",
      "Fitting Method": "Internal Rim Valve Stem Mount",
      "App Compatibility": "iOS 13+ & Android 8.0+"
    },
    box_contents: [
      "4 × Treel Internal Smart Tyre Sensors",
      "1 × Solar Cockpit Dashboard Display Unit",
      "1 × Micro-USB Charging Cable",
      "4 × Tyre Valve Warning Stickers",
      "1 × User & Installation Manual",
      "1 × 1-Year Official Replacement Warranty Card"
    ],
    warranty_months: 12,
    rating: 4.88,
    reviews_count: 1420,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      {
        id: "var_4w_internal_std",
        product_id: "prod_personal_4w_internal",
        sku: "TRL-4W-INT-01",
        name: "Standard 4-Sensor Kit (Internal)",
        sensor_count: 4,
        vehicle_type: "4w",
        price_inr: 4499,
        mrp_inr: 5999,
        stock_quantity: 450,
        is_active: true,
        image_url: "/images/products/personal-4w-internal.png",
        weight_grams: 280,
        dimensions_cm: { l: 18, w: 14, h: 6 }
      },
      {
        id: "var_5w_internal_stepney",
        product_id: "prod_personal_4w_internal",
        sku: "TRL-5W-INT-02",
        name: "5-Sensor Kit with Spare Wheel (Stepney)",
        sensor_count: 5,
        vehicle_type: "4w",
        price_inr: 5299,
        mrp_inr: 6999,
        stock_quantity: 180,
        is_active: true,
        image_url: "/images/products/personal-5w-internal.png",
        weight_grams: 340,
        dimensions_cm: { l: 20, w: 15, h: 6 }
      }
    ]
  },
  {
    id: "prod_personal_2w_external",
    brand_scope: "personal",
    slug: "treel-personal-tpms-bike-external",
    name: "Treel Smart Tyre Sensor · 2-Wheeler External Kit",
    tagline: "DIY screw-on Bluetooth TPMS for motorcycles and premium scooters.",
    description: "Easy 2-minute DIY installation. Screws directly onto your tyre valve stems with anti-theft hex locks. Direct Bluetooth connectivity to Treel Care Mobile App with instant helmet audio and vibration alerts.",
    category: "Personal TPMS",
    status: "active",
    base_price_inr: 2199,
    mrp_inr: 2999,
    tax_rate_percent: 18,
    hsn_code: "87089900",
    features: [
      "2-Minute DIY Screw-on Valve Installation",
      "Anti-Theft Hex Lock Nuts Included",
      "Continuous Live Pressure & Temp via Mobile App",
      "Helmet Intercom / Bluetooth Audio Alert Support",
      "2-Year Replaceable CR1632 Coin Battery",
      "IP68 Waterproof and Mud-Resistant"
    ],
    specs: {
      "Operating Frequency": "Bluetooth Low Energy 5.0",
      "Pressure Range": "0 – 65 PSI",
      "Operating Temp": "-20°C to +85°C",
      "Battery Type": "User Replaceable CR1632",
      "Weight per sensor": "9.6 grams (Zero Wheel Balance Impact)",
      "App Compatibility": "iOS & Android"
    },
    box_contents: [
      "2 × Treel External Smart Valve Sensors",
      "2 × Anti-Theft Hex Locking Nuts",
      "1 × Special Installation Wrench Tool",
      "1 × Quick Start Guide",
      "1 × 1-Year Warranty Card"
    ],
    warranty_months: 12,
    rating: 4.92,
    reviews_count: 890,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      {
        id: "var_2w_external_std",
        product_id: "prod_personal_2w_external",
        sku: "TRL-2W-EXT-01",
        name: "Standard 2-Wheel External Kit",
        sensor_count: 2,
        vehicle_type: "2w",
        price_inr: 2199,
        mrp_inr: 2999,
        stock_quantity: 620,
        is_active: true,
        image_url: "/images/products/personal-2w-external.png",
        weight_grams: 110,
        dimensions_cm: { l: 12, w: 10, h: 4 }
      }
    ]
  },
  {
    id: "prod_suraksha_truck_kit",
    brand_scope: "suraksha",
    slug: "treel-suraksha-truck-safety-kit",
    name: "Treel Suraksha Commercial Vehicle Safety Kit",
    tagline: "Blowout-prevention and fuel-saving TPMS built specifically for Indian trucks & buses.",
    description: "Proven across 50,000+ commercial vehicles in India. Cuts front-tyre blowout risk by 99%, extends tyre mileage by 15-20%, saves 3% diesel, and pays for itself within 9 months. Supported by 400+ Highway Suraksha Centres.",
    category: "Suraksha Commercial",
    status: "active",
    base_price_inr: 9999,
    mrp_inr: 13500,
    tax_rate_percent: 18,
    hsn_code: "87089900",
    features: [
      "Front-Steer Tyre Blowout Prevention (Audible Cabin Siren)",
      "15% to 20% Tyre Life Extension",
      "3% Real Fuel Savings from Constant Optimum Inflation",
      "Rugged In-Cabin High-Contrast Driver Display",
      "Heavy-Duty Heavy Vehicle Valves (Tested on NH44, NH48)",
      "Zero-Downpayment Easy EMI Starting @ ₹1,199/month",
      "Supported by 400+ JK Tyre & Suraksha Service Centres Across India"
    ],
    specs: {
      "Supported Configurations": "6-Tyre (16T), 10-Tyre (28T), 12-Tyre (35T), 14-Tyre (42T), 16-Tyre (48T), 22-Tyre (55T)",
      "Operating Pressure": "Up to 160 PSI",
      "Display Power": "12V / 24V Vehicle Battery Direct Connection",
      "Sensor Battery": "Heavy Duty Industrial Lithium (6+ Years)",
      "Certifications": "ARAI Certified, IP69K Pressure Wash Rated"
    },
    box_contents: [
      "6 to 22 × Heavy Commercial Internal Sensors",
      "1 × Heavy-Duty Cabin Display with Warning Buzzer",
      "1 × Signal Booster / Repeater Unit for Long Chassis",
      "1 × Wiring Harness (12V/24V compatible)",
      "1 × Suraksha Warranty Certificate"
    ],
    warranty_months: 24,
    rating: 4.95,
    reviews_count: 3200,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    variants: [
      {
        id: "var_suraksha_6w",
        product_id: "prod_suraksha_truck_kit",
        sku: "TRL-SUR-6T",
        name: "6-Wheeler Kit (16-Tonne Rigid Truck / Bus)",
        sensor_count: 6,
        vehicle_type: "truck",
        price_inr: 9999,
        mrp_inr: 13500,
        stock_quantity: 210,
        is_active: true,
        image_url: "/images/products/suraksha-6t.png",
        weight_grams: 850,
        dimensions_cm: { l: 28, w: 22, h: 10 }
      },
      {
        id: "var_suraksha_10w",
        product_id: "prod_suraksha_truck_kit",
        sku: "TRL-SUR-10T",
        name: "10-Wheeler Kit (28-Tonne Haulage / Tipper)",
        sensor_count: 10,
        vehicle_type: "truck",
        price_inr: 14999,
        mrp_inr: 19999,
        stock_quantity: 140,
        is_active: true,
        image_url: "/images/products/suraksha-10t.png",
        weight_grams: 1200,
        dimensions_cm: { l: 30, w: 24, h: 12 }
      },
      {
        id: "var_suraksha_12w",
        product_id: "prod_suraksha_truck_kit",
        sku: "TRL-SUR-12T",
        name: "12-Wheeler Kit (35-Tonne Multi-Axle)",
        sensor_count: 12,
        vehicle_type: "truck",
        price_inr: 17999,
        mrp_inr: 23999,
        stock_quantity: 95,
        is_active: true,
        image_url: "/images/products/suraksha-12t.png",
        weight_grams: 1450,
        dimensions_cm: { l: 32, w: 26, h: 12 }
      }
    ]
  }
];

export const SEED_DEALERS: Dealer[] = [
  {
    id: "dlr_delhi_transport_nagar",
    name: "Sanjay Tyre & Suraksha Hub",
    business_name: "Sanjay Wheels & Telematics LLP",
    phone: "+91 98110 44221",
    email: "sanjaytyres@treelnetwork.in",
    address: "Shop 14-16, Sanjay Gandhi Transport Nagar (SGTN), GT Karnal Road",
    city: "New Delhi",
    state: "Delhi",
    pincode: "110042",
    lat: 28.7512,
    lng: 77.1354,
    is_suraksha_centre: true,
    is_tmip_partner: true,
    is_retail_dealer: true,
    rating: 4.9,
    hours: "8:30 AM – 9:00 PM (All 7 Days)"
  },
  {
    id: "dlr_mumbai_vashi",
    name: "Maharashtra Fleet Solutions (JK Steel Wheels)",
    business_name: "Maharashtra Fleet Solutions Pvt Ltd",
    phone: "+91 98201 55332",
    email: "vashi.hub@treelnetwork.in",
    address: "Sector 19-C, APMC Market, Vashi",
    city: "Navi Mumbai",
    state: "Maharashtra",
    pincode: "400705",
    lat: 19.0768,
    lng: 73.0074,
    is_suraksha_centre: true,
    is_tmip_partner: true,
    is_retail_dealer: true,
    rating: 4.95,
    hours: "9:00 AM – 8:30 PM (Mon-Sat)"
  },
  {
    id: "dlr_bangalore_peenya",
    name: "Karnataka Smart Mobility Hub",
    business_name: "Peenya Tyre & Digital Solutions",
    phone: "+91 94480 88219",
    email: "peenya@treelnetwork.in",
    address: "4th Phase, Peenya Industrial Area, Near Ring Road Junction",
    city: "Bengaluru",
    state: "Karnataka",
    pincode: "560058",
    lat: 13.0312,
    lng: 77.5142,
    is_suraksha_centre: true,
    is_tmip_partner: true,
    is_retail_dealer: true,
    rating: 4.85,
    hours: "9:00 AM – 8:00 PM (Mon-Sat)"
  },
  {
    id: "dlr_chennai_madhavaram",
    name: "Southern Highway Suraksha Centre",
    business_name: "Madhavaram Fleet Care Services",
    phone: "+91 98400 33117",
    email: "madhavaram@treelnetwork.in",
    address: "Truck Terminal Complex, Madhavaram Roundtana, GNT Road",
    city: "Chennai",
    state: "Tamil Nadu",
    pincode: "600110",
    lat: 13.1489,
    lng: 80.2314,
    is_suraksha_centre: true,
    is_tmip_partner: true,
    is_retail_dealer: true,
    rating: 4.9,
    hours: "8:00 AM – 9:00 PM (All 7 Days)"
  },
  {
    id: "dlr_kolkata_dankuni",
    name: "Eastern Express Tyre & Telemetry",
    business_name: "Dankuni Logistics Solutions",
    phone: "+91 98300 77412",
    email: "dankuni@treelnetwork.in",
    address: "NH-2 & Delhi Road Crossing, Dankuni Toll Plaza",
    city: "Kolkata / Hooghly",
    state: "West Bengal",
    pincode: "712311",
    lat: 22.6845,
    lng: 88.2912,
    is_suraksha_centre: true,
    is_tmip_partner: false,
    is_retail_dealer: true,
    rating: 4.8,
    hours: "8:30 AM – 8:30 PM (Mon-Sat)"
  },
  {
    id: "dlr_hyderabad_autonagar",
    name: "Telangana Fleet & Suraksha Centre",
    business_name: "Deccan Tyre Tech",
    phone: "+91 99890 22341",
    email: "autonagar@treelnetwork.in",
    address: "Plot 82, Auto Nagar Main Road, Hayathnagar",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500070",
    lat: 17.3321,
    lng: 78.5714,
    is_suraksha_centre: true,
    is_tmip_partner: true,
    is_retail_dealer: true,
    rating: 4.88,
    hours: "9:00 AM – 8:00 PM (Mon-Sat)"
  }
];

export const SEED_CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs_vrl_logistics",
    slug: "vrl-logistics-tyre-wear-and-safety",
    title: "How VRL Logistics reduced roadside tyre incidents by 84% across 4,200 vehicles",
    client_name: "VRL Logistics Ltd",
    industry: "Inter-State Freight & Logistics",
    fleet_size: "4,200+ Multi-Axle Trucks",
    hero_stat: "84%",
    hero_stat_label: "Reduction in Tyre Roadside Failures",
    results: [
      { metric: "₹18.4 Cr", label: "Annual Tyre Replacement & Fuel Savings" },
      { metric: "84%", label: "Roadside Blowout Drop" },
      { metric: "+19.2%", label: "Average Casing Life Extension" },
      { metric: "99.94%", label: "Telemetry Uptime across High-Speed Corridors" }
    ],
    summary: "VRL Logistics deployed TMIP across their national multi-axle freight fleet. High-frequency pressure and temperature telemetry connected to automated control-room alerts eliminated blowout-related cargo delays and boosted tyre retreadability by 2.4 cycles.",
    challenge: "Operating multi-axle trailers continuously across severe Indian summer highway temperatures led to unpredictable steer-tyre blowouts, unplanned transit downtime, and catastrophic casing damage preventing retreading.",
    solution: "Full fleet rollout of Treel TMIP Vehicle Digital Twin telemetry with integrated live control-room dashboards, geofenced inflation alerts at hub departures, and automated technician work-order dispatch.",
    impact: "Over 4,200 vehicles equipped, zero fatal blowout incidents in 24 months, and a verified ROI payback completed within 6.8 months.",
    testimonial: {
      quote: "TMIP gave our operational command centre real-time visibility into the exact thermal and pressure dynamics of over 40,000 tyres on the road. The safety impact was instant.",
      author: "Chief Technical Officer",
      role: "VRL Logistics Ltd"
    },
    cover_image: "/images/case-studies/vrl-fleet.jpg",
    published_at: "2026-06-15T10:00:00Z"
  },
  {
    id: "cs_kallada_travels",
    slug: "kallada-travels-passenger-comfort-punctuality",
    title: "Kallada Travels: 100% Punctuality & Zero Midnight Highway Delays on South India Luxury Routes",
    client_name: "Kallada Academy & Passenger Travels",
    industry: "Inter-City Luxury Passenger Transit",
    fleet_size: "380 Multi-Axle Volvo & Scania Coaches",
    hero_stat: "0",
    hero_stat_label: "Midnight Breakdown Delays in 18 Months",
    results: [
      { metric: "0", label: "Passenger Delay Incidents" },
      { metric: "3.4%", label: "Diesel Consumption Reduction" },
      { metric: "100%", label: "Pre-Trip Inspection Compliance" }
    ],
    summary: "Luxury sleeper coach operator deployed Treel TMIP to guarantee passenger safety and eliminate midnight highway tyre stops between Bangalore, Chennai, Kochi, and Hyderabad.",
    challenge: "Passenger safety is mission-critical. A single puncture on a ghat section or midnight expressway destroys reputation and customer trust.",
    solution: "Installed Treel TMIP with dual audio-visual cockpit displays for drivers and automated API integration with Kallada fleet dispatch ERP.",
    impact: "Complete driver confidence, smooth fuel savings, and customer satisfaction ratings reaching an all-time high of 4.9/5.",
    cover_image: "/images/case-studies/kallada-bus.jpg",
    published_at: "2026-07-20T10:00:00Z"
  }
];

export const SEED_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog_tyre_digital_twin_explained",
    brand_scope: "tmip",
    slug: "what-is-vehicle-digital-twin-mobility-intelligence",
    title: "What is a Vehicle Digital Twin? Transforming Raw Tyre Data into Mobility Intelligence",
    excerpt: "Why modern fleet intelligence requires more than basic GPS tracking: how physical tyre physics, thermal models, and real-time telemetry create an AI digital replica of every vehicle.",
    content: "For over a century, commercial transport viewed tyres simply as wearable rubber assets. In the modern AI-native logistics era, the tyre is the single richest source of dynamic vehicle physics...",
    author_name: "Dr. Anirudh Sharma",
    author_role: "Head of AI & Telematics, Treel",
    category: "Mobility Intelligence",
    tags: ["Digital Twin", "AI", "Fleet Operations", "Predictive Maintenance"],
    reading_time_mins: 6,
    cover_image: "/images/blog/digital-twin.jpg",
    published_at: "2026-08-10T09:00:00Z"
  },
  {
    id: "blog_suraksha_puncture_prevention",
    brand_scope: "suraksha",
    slug: "truck-blowout-prevention-summer-highways",
    title: "Garmi Mein Front Tyre Blowout Se Kaise Bachen: 5 Golden Rules for Truck Drivers",
    excerpt: "May-June ki garmi mein highway speed par tyre blast hone ka asli karan kya hai, aur Suraksha buzzer alarm se jaan aur truck kaise bachti hai.",
    content: "National Highways par 70% se zyada gambhir hadse steer tyre fatne se hote hain. Is article mein janein tyre pressure aur heat ka relation...",
    author_name: "Gurpreet Singh",
    author_role: "Fleet Safety Veteran & Suraksha Advocate",
    category: "Driver Safety",
    tags: ["Suraksha", "Truck Safety", "Hindi Guidance", "Highway Tips"],
    reading_time_mins: 4,
    cover_image: "/images/blog/highway-truck.jpg",
    published_at: "2026-08-25T11:00:00Z"
  },
  {
    id: "blog_personal_tpms_diy_guide",
    brand_scope: "personal",
    slug: "why-every-car-in-india-needs-smart-tpms",
    title: "Why Indian Road Conditions Make Smart TPMS Essential for Every Family Car",
    excerpt: "From pothole rim strikes to unannounced slow leaks on the expressway: how smart TPMS saves tyres, cuts fuel bills, and prevents dangerous high-speed blowouts.",
    content: "When driving at 100 km/h on an expressway like the Samruddhi Mahamarg or Yamuna Expressway, a tyre with 20% under-inflation suffers rapid thermal buildup...",
    author_name: "Rohan Varma",
    author_role: "Automotive Tech Columnist",
    category: "Consumer Tech",
    tags: ["Car Safety", "TPMS", "DIY Guide", "Highway Driving"],
    reading_time_mins: 5,
    cover_image: "/images/blog/car-highway.jpg",
    published_at: "2026-09-01T14:30:00Z"
  }
];
