export interface TeamMember {
  order: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedIn: string;
}

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    order: 1,
    name: "Mr. Imran Khan",
    role: "Head of Strategy/Finance",
    bio: "Mr. Imran Khan is an accomplished finance professional with over 23 years of experience across Finance, Accounts, Taxation, Commercial and Operations. Associated with JK Tyre & Industries Ltd. since October 2015, he brings strong expertise in financial strategy, P&L management, FP&A, business performance, financial governance and cost optimization. With a strategic and business-oriented approach, he focuses on enhancing profitability, optimizing resources, strengthening financial controls and enabling informed decision-making. His leadership philosophy emphasizes financial discipline, operational excellence and sustainable value creation, positioning finance as a strategic driver of business growth and long-term organizational success.",
    image: "/images/leadership/imran-khan.png",
    linkedIn: "https://www.linkedin.com/in/imran-khan-82057672",
  },
  {
    order: 2,
    name: "Mrs. Pradnya Chaudhari",
    role: "Head of Design & Development",
    bio: "Leads end-to-end product architecture, design execution, and engineering strategy for Tyre Pressure Monitoring Systems (TPMS), overseeing hardware-software co-design from development to mass manufacturing and regulatory compliance. She leads R&D teams in developing next-generation sensor platforms that advance smart mobility across passenger vehicles and heavy-duty commercial fleets.",
    image: "/images/leadership/pradnya-chaudhari.jpeg",
    linkedIn: "https://www.linkedin.com/in/pradnya-chaudhari-4b737839",
  },
  {
    order: 3,
    name: "Mr. Nitin Karande",
    role: "Head of Software Engineering",
    bio: "Leads software engineering and product development at Treel, specializing in automotive IoT, TPMS, telematics, and connected-vehicle solutions. His technical expertise spans Android, MEAN Stack development, AWS, desktop applications, and microservices architecture. He drives software architecture, end-to-end product development, technical delivery, and cross-functional engineering initiatives to build scalable and reliable mobility solutions.",
    image: "/images/leadership/nitin-karande.png",
    linkedIn: "https://www.linkedin.com/in/nitin-karande-90ab837a",
  },
  {
    order: 4,
    name: "Mr. Vinod Guddeti",
    role: "Head of Purchase",
    bio: "A Procurement and Supply Chain professional with 20+ years of experience in the Electronics Industry with expertise in strategic sourcing, supplier management, procurement planning, and supply chain operations.",
    image: "/images/leadership/vinod-guddeti.png",
    linkedIn: "https://www.linkedin.com/in/vinod-guddeti-95194038",
  },
  {
    order: 5,
    name: "Mr. Mahesh Sakat",
    role: "Head of Quality",
    bio: "Automotive quality professional with over 14 years of experience in quality management system, product development, supplier quality & manufacturing quality assurance. Currently serves as Quality Manager at JK TREEL driving strategic quality initiatives, quality management systems, process improvement, supplier Quality optimization, customer satisfaction, and compliance with automotive quality standards.",
    image: "/images/leadership/mahesh-sakat.jpeg",
    linkedIn: "https://www.linkedin.com/in/mahesh-sakat-3ba62b107",
  },
  {
    order: 6,
    name: "Mr. Dattatray Dudhe",
    role: "Production Incharge",
    bio: "Lead the Production team & responsibilities of all Manufacturing activities including Process, Planning, Resources, Maintenance. Total 32 years experience in Electronic manufacturing.",
    image: "/images/leadership/dattatray-dudhe.png",
    linkedIn: "https://www.linkedin.com/in/dattatray-dudhe-525436443",
  },
  {
    order: 7,
    name: "Mr. Suresh Fale",
    role: "Senior Manager Finance & HR, Admin",
    bio: "An accomplished finance professional with over 17 years of experience across accounting, finance, administration, human resources, taxation, and financial operations. Demonstrates strong expertise in financial reporting, statutory compliance, GST and TDS, audit management, and treasury operations, with a focus on strengthening financial controls, enhancing operational efficiency, and ensuring regulatory compliance.",
    image: "/images/leadership/suresh-fale.png",
    linkedIn: "https://www.linkedin.com/in/suresh-fale-69a035130",
  },
] as const;

