export interface CountryPresence {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: "Europe" | "South America" | "Africa" | "Middle East" | "Southeast Asia" | "Asia HQ";
  category: "TMIP" | "Truck TPMS" | "OTR TPMS" | "OEM Fitment" | "Defense / Armed Vehicles" | "Global HQ";
  primaryProduct: string;
  badgeText: string;
  products: string[];
  description: string;
  highlight: string;
  coordinates: {
    lat: number;
    lng: number;
    x: number;
    y: number;
  };
  labelConfig: {
    anchor: "left" | "right" | "center";
    dx: number;
    dy: number;
  };
  color: string;
  tagColor: string;
}

export const GLOBAL_COUNTRIES: CountryPresence[] = [
  // 1. EUROPE (EU) - Truck TPMS Regional Focus
  {
    id: "latvia",
    name: "Latvia",
    code: "LV",
    flag: "🇱🇻",
    region: "Europe",
    category: "TMIP",
    primaryProduct: "Tyre Management",
    badgeText: "Tyre Management",
    products: [
      "Commercial Tyre Management",
      "Tread Wear & Lifecycle Analytics",
      "EU Truck TPMS",
    ],
    description:
      "Advanced tyre management software and automated sensor logging for commercial vehicle fleets, reducing cost-per-kilometre across Northern European transit routes.",
    highlight: "Fleet Tyre Lifecycle Automation",
    coordinates: { lat: 56.8796, lng: 24.6032, x: 568.5, y: 95.8 },
    labelConfig: { anchor: "left", dx: 14, dy: -8 },
    color: "#38BDF8",
    tagColor: "bg-[#38BDF8]/10 text-[#38BDF8] border-[#38BDF8]/30",
  },
  {
    id: "poland",
    name: "Poland",
    code: "PL",
    flag: "🇵🇱",
    region: "Europe",
    category: "Truck TPMS",
    primaryProduct: "Smart Tyre TBR (Truck Bus Radial)",
    badgeText: "Smart Tyre TBR",
    products: [
      "Smart Tyre TBR Telemetry",
      "Truck Bus Radial In-Tyre Sensors",
      "ECE R141 Compliant TPMS",
    ],
    description:
      "Smart Tyre TBR (Truck Bus Radial) sensor integration for heavy haulage and bus transit operators, compliant with European commercial vehicle safety and emissions standards.",
    highlight: "Central European Haulage Hub",
    coordinates: { lat: 51.9194, lng: 19.1451, x: 553.6, y: 113.8 },
    labelConfig: { anchor: "right", dx: -14, dy: 6 },
    color: "#D5573B",
    tagColor: "bg-[#D5573B]/10 text-[#D5573B] border-[#D5573B]/30",
  },

  // 2. SOUTH AMERICA - Truck TPMS -> TMIP
  {
    id: "brazil",
    name: "Brazil",
    code: "BR",
    flag: "🇧🇷",
    region: "South America",
    category: "TMIP",
    primaryProduct: "Truck TPMS → TMIP",
    badgeText: "Truck TPMS → TMIP",
    products: [
      "Truck TPMS Commercial Kits",
      "TMIP Fleet Intelligence Platform",
      "Agri-Logistics Heavy Telematics",
    ],
    description:
      "Rapidly scaling from multi-axle commercial truck TPMS to full TMIP platform integration for agribusiness, long-distance interstate freight, and logistics operators.",
    highlight: "Latin America Fleet Scale",
    coordinates: { lat: -14.235, lng: -51.9253, x: 341.8, y: 329.7 },
    labelConfig: { anchor: "left", dx: 14, dy: -4 },
    color: "#10B981",
    tagColor: "bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30",
  },
  {
    id: "argentina",
    name: "Argentina",
    code: "AR",
    flag: "🇦🇷",
    region: "South America",
    category: "TMIP",
    primaryProduct: "Truck TPMS → TMIP",
    badgeText: "Truck TPMS → TMIP",
    products: [
      "Heavy Transport TPMS",
      "TMIP Digital Twin Analytics",
      "Cold-Route & Haulage Monitoring",
    ],
    description:
      "Commercial truck TPMS deployment transitioning to TMIP digital twin analytics, tracking Southern Cone freight corridors across high-temperature and refrigerated routes.",
    highlight: "Cross-Border Southern Cone Fleets",
    coordinates: { lat: -38.4161, lng: -63.6167, x: 319.0, y: 425.9 },
    labelConfig: { anchor: "right", dx: -14, dy: 10 },
    color: "#34D399",
    tagColor: "bg-[#34D399]/10 text-[#34D399] border-[#34D399]/30",
  },

  // 3. AFRICA - OTR TPMS Mining & Heavy Duty
  {
    id: "mozambique",
    name: "Mozambique",
    code: "MZ",
    flag: "🇲🇿",
    region: "Africa",
    category: "OTR TPMS",
    primaryProduct: "OTR TPMS",
    badgeText: "OTR TPMS",
    products: [
      "OTR Mining TPMS Sensors",
      "Quarry & Dumper Telemetry",
      "Port Logistics Tyre Monitoring",
    ],
    description:
      "Ruggedized high-pressure OTR (Off-The-Road) tyre monitoring engineered for heavy mining dumpers, coastal bulk terminals, and rugged infrastructure projects.",
    highlight: "Mineral & Heavy Port Haulage",
    coordinates: { lat: -18.6657, lng: 35.5296, x: 596.8, y: 358.8 },
    labelConfig: { anchor: "left", dx: 14, dy: 10 },
    color: "#F59E0B",
    tagColor: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
  },
  {
    id: "tanzania",
    name: "Tanzania",
    code: "TZ",
    flag: "🇹🇿",
    region: "Africa",
    category: "OTR TPMS",
    primaryProduct: "OTR TPMS",
    badgeText: "OTR TPMS",
    products: [
      "Gold & Coal Mine OTR Sensors",
      "Extreme-Duty Temperature Logging",
      "Heavy Earthmoving Telematics",
    ],
    description:
      "Specialized wheel-end sensors validated for continuous operation in severe heat, deep open pits, and high-load earthmoving machinery.",
    highlight: "Open-Pit Mining Telemetry",
    coordinates: { lat: -6.369, lng: 34.8888, x: 595.4, y: 318.7 },
    labelConfig: { anchor: "left", dx: 14, dy: -8 },
    color: "#F59E0B",
    tagColor: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
  },
  {
    id: "zambia",
    name: "Zambia",
    code: "ZM",
    flag: "🇿🇲",
    region: "Africa",
    category: "OTR TPMS",
    primaryProduct: "OTR TPMS",
    badgeText: "OTR TPMS",
    products: [
      "Copperbelt OTR Dumper TPMS",
      "Industrial Heavy Hauler Telematics",
      "Tire Blowout Risk Mitigation",
    ],
    description:
      "Deployment across Copperbelt open-cast and underground copper mining operations, delivering blowout mitigation and real-time pressure diagnostics.",
    highlight: "Copperbelt Mining Corridors",
    coordinates: { lat: -13.1339, lng: 27.8493, x: 577.8, y: 341.0 },
    labelConfig: { anchor: "right", dx: -14, dy: 10 },
    color: "#F59E0B",
    tagColor: "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
  },

  // 4. AFRICA - Commercial Fleets & TMIP
  {
    id: "south-africa",
    name: "South Africa",
    code: "ZA",
    flag: "🇿🇦",
    region: "Africa",
    category: "Truck TPMS",
    primaryProduct: "Truck TPMS, TMIP",
    badgeText: "Truck TPMS, TMIP",
    products: [
      "Long-Haul Commercial Truck TPMS",
      "TMIP Cloud Fleet Platform",
      "Multi-Trailer Freight Telematics",
    ],
    description:
      "Commercial vehicle safety solutions and TMIP enterprise fleet intelligence deployed across major national freight corridors connecting Durban and Johannesburg.",
    highlight: "National Linehaul Intelligence",
    coordinates: { lat: -30.5595, lng: 22.9375, x: 569.2, y: 396.5 },
    labelConfig: { anchor: "center", dx: 0, dy: 22 },
    color: "#EA580C",
    tagColor: "bg-[#EA580C]/10 text-[#EA580C] border-[#EA580C]/30",
  },
  {
    id: "congo",
    name: "Congo (DRC)",
    code: "CD",
    flag: "🇨🇩",
    region: "Africa",
    category: "Truck TPMS",
    primaryProduct: "Truck TPMS, TMIP",
    badgeText: "Truck TPMS, TMIP",
    products: [
      "Heavy Haulage Truck TPMS",
      "Mining Supply Chain TMIP",
      "High-Frequency Sensor Links",
    ],
    description:
      "Commercial truck TPMS and TMIP monitoring for heavy supply-chain corridors and mining transit routes operating under demanding road conditions.",
    highlight: "Central African Logistics Corridors",
    coordinates: { lat: -4.0383, lng: 21.7587, x: 563.9, y: 309.1 },
    labelConfig: { anchor: "right", dx: -14, dy: -6 },
    color: "#EA580C",
    tagColor: "bg-[#EA580C]/10 text-[#EA580C] border-[#EA580C]/30",
  },
  {
    id: "algeria",
    name: "Algeria",
    code: "DZ",
    flag: "🇩🇿",
    region: "Africa",
    category: "Truck TPMS",
    primaryProduct: "Truck TPMS, TMIP",
    badgeText: "Truck TPMS, TMIP",
    products: [
      "Desert Haulage Truck TPMS",
      "TMIP Fleet Asset Tracking",
      "High-Heat Wheel Sensors",
    ],
    description:
      "Thermal-tolerant commercial TPMS hardware and TMIP fleet tracking tailored for trans-Saharan transport routes, petrochemical fleets, and extreme desert ambient temperatures.",
    highlight: "High-Ambient Desert Fleet Safety",
    coordinates: { lat: 28.0339, lng: 1.6596, x: 509.3, y: 191.5 },
    labelConfig: { anchor: "right", dx: -14, dy: -4 },
    color: "#EA580C",
    tagColor: "bg-[#EA580C]/10 text-[#EA580C] border-[#EA580C]/30",
  },

  // 5. SOUTHEAST ASIA - 2-Wheeler OEM Fitment
  {
    id: "indonesia",
    name: "Indonesia",
    code: "ID",
    flag: "🇮🇩",
    region: "Southeast Asia",
    category: "OEM Fitment",
    primaryProduct: "2-Wheeler OEM",
    badgeText: "2-Wheeler OEM",
    products: [
      "2-Wheeler OEM Sensor Modules",
      "EV Scooter Connected TPMS",
      "CAN-Bus / BLE Cluster Integration",
    ],
    description:
      "Factory-installed sensor modules and Bluetooth LE cluster telemetry engineered for prominent 2-wheeler automotive OEMs and rapidly expanding EV scooter manufacturers.",
    highlight: "High-Volume 2-Wheeler OEM Integration",
    coordinates: { lat: -0.7893, lng: 113.9213, x: 818.0, y: 304.0 },
    labelConfig: { anchor: "center", dx: 0, dy: -18 },
    color: "#818CF8",
    tagColor: "bg-[#818CF8]/10 text-[#818CF8] border-[#818CF8]/30",
  },

  // 6 & 7. MIDDLE EAST - UAE (Armed Vehicles & Commercial TPMS)
  {
    id: "uae",
    name: "United Arab Emirates",
    code: "AE",
    flag: "🇦🇪",
    region: "Middle East",
    category: "Defense / Armed Vehicles",
    primaryProduct: "4-Wheeler Kits for Armed Vehicles & UAE TPMS",
    badgeText: "Armed Vehicles & TPMS",
    products: [
      "4-Wheeler Kits for Armed Vehicles",
      "Military Run-Flat TPMS Sensors",
      "Commercial Fleet TPMS",
      "High-Ambient Middle East Sensors",
    ],
    description:
      "High-durability blast-resistant 4-wheeler TPMS kits developed for armored defense vehicles and tactical patrol transports, alongside enterprise commercial fleet TPMS across the Emirates.",
    highlight: "Armed Defense & Commercial Fleet Solutions",
    coordinates: { lat: 23.4241, lng: 53.8478, x: 650.7, y: 210.6 },
    labelConfig: { anchor: "right", dx: -14, dy: -12 },
    color: "#E11D48",
    tagColor: "bg-[#E11D48]/10 text-[#E11D48] border-[#E11D48]/30",
  },

  // CORPORATE HQ & INNOVATION
  {
    id: "india",
    name: "India (Global HQ)",
    code: "IN",
    flag: "🇮🇳",
    region: "Asia HQ",
    category: "Global HQ",
    primaryProduct: "Global Headquarters, R&D & Core Cloud",
    badgeText: "Global HQ",
    products: [
      "Hardware Design & Manufacturing",
      "Central TMIP Cloud Engine",
      "Vehicle Digital Twin Architecture",
      "Suraksha Commercial Operations",
    ],
    description:
      "Global corporate headquarters, core sensor R&D, firmware engineering, and central cloud telemetry infrastructure managing 68,000+ connected vehicles and 2M+ tyres daily.",
    highlight: "Global Engineering & Central Operations",
    coordinates: { lat: 20.5937, lng: 78.9629, x: 731.8, y: 211.2 },
    labelConfig: { anchor: "left", dx: 14, dy: 12 },
    color: "#D5573B",
    tagColor: "bg-[#D5573B]/10 text-[#D5573B] border-[#D5573B]/30",
  },
];

export const REGIONS_LIST = [
  "All Regions",
  "Europe",
  "South America",
  "Africa",
  "Middle East",
  "Southeast Asia",
] as const;

export const CATEGORIES_LIST = [
  "All Products",
  "TMIP",
  "Truck TPMS",
  "OTR TPMS",
  "OEM Fitment",
  "Defense / Armed Vehicles",
] as const;
