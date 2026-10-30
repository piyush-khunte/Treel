export interface TeamMember {
  order: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedIn: string;
  objectPosition?: string;
}

export interface BoardMember {
  order: number;
  name: string;
  role: string;
  organization: string;
  headline: string;
  bio: string;
  paragraphs: readonly string[];
  image: string;
}

export const BOARD_MEMBERS: readonly BoardMember[] = [
  {
order: 1,
name: "Mr. V. K. Misra",
role: "Technical Director",
organization: "Automotive Technology Advisory",
headline:
"Leveraging his profound knowledge and inventive spirit, Mr. Misra has been instrumental in steering cutting-edge technological advancements, marking a significant contribution to India's tyre industry and beyond.",
bio: "Mr. V. K. Misra is an eminent Technical Director, responsible for overall control of technology initiatives and supporting major expansion and modernization plans. He has played a key pioneering role to spearhead Radial Technology across India.",
paragraphs: [
"Mr. V. K. Misra is an eminent Technical Director, responsible for overall control of technology initiatives and supporting major expansion and modernization plans. He has played a key pioneering role to spearhead Radial Technology across India.",
"Mr. Misra (B.Sc., FIRI) has vast experience in the tyre industry. He is actively involved in various academic institutions such as American Chemical Society, IRI and is presently functioning as Chairman of IRI, Karnataka Branch. He has also completed the CII - Exim Award Assessor Course and has participated in assessment as a lead assessor to study compliance to the Business Excellence Model of CII. He is a stand by assessor for the TQM division of CII.",
"He has keen interest in machine design and development and has various designs to his credit.",
],
image: "/images/leadership/v-k-misra.png",
},
{
order: 2,
name: "Mr. Manish Ingale",
role: "Founder & CEO",
organization: "Treel Mobility Solutions",
headline:
"Guided by the conviction that the tyre is the vehicle's most talkative component, turning raw motion into operating intelligence at national scale across India's commercial mobility networks.",
bio: "Manish Ingale founded Treel Mobility Solutions in 2018 with the conviction that India's commercial vehicles were producing vast operational data that went uncaptured. Drawing on engineering and operational leadership across tyre and mobility sectors, he pioneered India's Vehicle Digital Twin platform.",
paragraphs: [
"Manish Ingale founded Treel Mobility Solutions in 2018 with the conviction that India's commercial vehicles were producing vast operational data that went uncaptured. Drawing on engineering and operational leadership across tyre and mobility sectors, he pioneered India's Vehicle Digital Twin platform.",
"Guided by the principle that the tyre is the vehicle's most talkative component—constantly reacting to load, road surface, temperature, and driver behaviour—he established wheel-end sensing as the critical foundation for complete commercial vehicle digital twins, converting real-time edge telemetry into predictive operating intelligence.",
"Headquartered in Pune, Manish has led Treel's expansion across over 68,000 active commercial vehicles and two hundred enterprise fleets, directing platform architecture, national OEM partnerships, and the growth of TMIP Enterprise, Suraksha Fleet, and Personal TPMS.",
],
    image: "/images/leadership/manish-ingale.png",
},

  {
    order: 3,
    name: "Mr. Sanjeev Aggarwal",
    role: "Chief Financial Officer",
    organization: "Corporate Finance Advisory",
    headline:
      "Anchoring the corporate financial helm, Mr. Aggarwal blends expertise in equity, debt, and structured finance with acclaimed leadership, steering strategic foresight, financial health, and integrity.",
    bio: "Mr. Sanjeev Aggarwal, a rank holder Chartered Accountant of 1990 batch, is a seasoned Chief Financial Officer (CFO). He brings over 35 years of varied executive experience in corporate finance, debt and equity fundraising, treasury, mergers and acquisitions, and strategic capital allocation.",
    paragraphs: [
      "Mr. Sanjeev Aggarwal, a rank holder Chartered Accountant of 1990 batch, is a seasoned Chief Financial Officer (CFO). He brings over 35 years of varied executive experience in corporate finance, debt and equity fundraising, treasury, mergers and acquisitions, and strategic capital allocation.",
      "He has extensive experience of raising funds – equity (IPOs, QIPs, PE) and debt (projects, working capital), trade finance, external commercial borrowings, structured finance and take-out financing. Over the years, he has handled several acquisitions (Indian and Overseas) and has managed Investors relations in large listed entities.",
      "He has served in senior management roles as CFO/Group CFO for over 20 years across companies involved in various businesses, viz., auto ancillary, thermal power generation, cement, steel, synthetic yarn, packaging film, photographic products, telecom passive infrastructure etc. He has held board positions in several companies. In his long professional career, he has built strong relationships with banks, financial institutions, rating agencies, audit firms, investment bankers and law firms.",
      "Mr. Aggarwal has long experience of establishing best corporate governance practices, effective systems & processes and internal controls and has proven track record of building & leading high-performing teams, capable of delivering in demanding environments.",
      "Mr. Aggarwal was conferred the title of \"Most Influential CFOs of India\" by Chartered Institute of Management Accountants (CIMA) in June 2016. In 2016, he also joined 'Directors Club' and completed 'Accredited Independent Directors Certification Program' organized by SPJIMR. He has completed \"Executive Excellence Program\" at Harvard Business School, Boston, USA.",
    ],
    image: "/images/leadership/sanjeev-aggarwal.png",
  },
  {
    order: 4,
    name: "Mr. Srinivasu Allaphan",
    role: "Director – Sales & Marketing",
    organization: "Commercial Mobility Advisory",
    headline:
      "A luminary in India's automotive sector, has been instrumental in propelling commercial mobility to new heights with his strategic vision in sales and marketing, drawing on his extensive industry experience.",
    bio: "Having an exhaustive experience of over two decades in the Indian automotive industry, Mr. Srinivasu Allaphan is a leading automotive executive, responsible for overall sales and marketing strategy, driving national commercial distribution and dealer growth.",
    paragraphs: [
      "Having an exhaustive experience of over two decades in the Indian automotive industry, Mr. Srinivasu Allaphan is a leading automotive executive, responsible for overall sales and marketing strategy, driving national commercial distribution and dealer growth.",
      "In his extensive career, he has been responsible for the overall sales and marketing functions across commercial and passenger vehicle segments.",
      "Prior to his current role, he was associated with Hero MotoCorp as Head – National Sales & Distribution, where he held multiple significant positions and played a key role in strengthening the sales & dealer network function. He started his career with Eicher Ltd in the marketing division.",
      "He pursued Bachelors in Engineering and Masters in Management Studies from the University of Mysore. He has also undergone a senior leadership program from the Wharton Business School.",
    ],
    image: "/images/leadership/srinivasu-allaphan.png",
  },
] as const;

export const TEAM_MEMBERS: readonly TeamMember[] = [
  {
    order: 1,
    name: "Mr. Imran Khan",
    role: "Head of Finance & Strategy",
    bio: "Mr. Imran Khan is an accomplished finance professional with over two decades of experience across Finance, Accounts, Taxation, Commercial and Operations. Associated with JK Tyre & Industries Ltd. since October 2015, he brings strong expertise in financial strategy, P&L management, FP&A, business performance, financial governance and cost optimization. With a strategic and business-oriented approach, he focuses on enhancing profitability, optimizing resources, strengthening financial controls and enabling informed decision-making. His leadership philosophy emphasizes financial discipline, operational excellence and sustainable value creation, positioning finance as a strategic driver of business growth and long-term organizational success.",
    image: "/images/leadership/Mr. Imran Khan.jpg",
    linkedIn: "https://www.linkedin.com/in/imran-khan-82057672",
    objectPosition: "center 12%",
  },
  {
    order: 2,
    name: "Mrs. Pradnya Chaudhari",
    role: "Head of Design & Development",
    bio: "Leads end-to-end product architecture, design execution, and engineering strategy for Tyre Pressure Monitoring Systems (TPMS), overseeing hardware-software co-design from development to mass manufacturing and regulatory compliance. She leads R&D teams in developing next-generation sensor platforms that advance smart mobility across passenger vehicles and heavy-duty commercial fleets.",
    image: "/images/leadership/Mrs. Pradnya Chaudhari.jpg",
    linkedIn: "https://www.linkedin.com/in/pradnya-chaudhari-4b737839",
  },
  {
    order: 3,
    name: "Mr. Nitin Karande",
    role: "Head of Software Engineering",
    bio: "Leads software engineering and product development at Treel, specializing in automotive IoT, TPMS, telematics, and connected-vehicle solutions. His technical expertise spans Android, MEAN Stack development, AWS, desktop applications, and microservices architecture. He drives software architecture, end-to-end product development, technical delivery, and cross-functional engineering initiatives to build scalable and reliable mobility solutions.",
    image: "/images/leadership/Mr. Nitin Karande.jpg",
    linkedIn: "https://www.linkedin.com/in/nitin-karande-90ab837a",
  },
  {
    order: 4,
    name: "Mr. Vinod Guddeti",
    role: "Head of Purchase",
    bio: "A Procurement and Supply Chain professional with 20+ years of experience in the Electronics Industry with expertise in strategic sourcing, supplier management, procurement planning, and supply chain operations.",
    image: "/images/leadership/Mr. Vinod Guddeti.jpg",
    linkedIn: "https://www.linkedin.com/in/vinod-guddeti-95194038",
  },
  {
    order: 5,
    name: "Mr. Mahesh Sakat",
    role: "Head of Quality",
    bio: "Automotive quality professional with over 14 years of experience in quality management system, product development, supplier quality & manufacturing quality assurance. Currently serves as Head of Quality at Treel Mobility Solutions driving strategic quality initiatives, quality management systems, process improvement, supplier Quality optimization, customer satisfaction, and compliance with automotive quality standards.",
    image: "/images/leadership/Mr. Mahesh Sakat.jpg",
    linkedIn: "https://www.linkedin.com/in/mahesh-sakat-3ba62b107",
    objectPosition: "center 12%",
  },
  {
    order: 6,
    name: "Mr. Dattatray Dudhe",
    role: "Production Incharge",
    bio: "Lead the Production team & responsibilities of all Manufacturing activities including Process, Planning, Resources, Maintenance. Total 32 years experience in Electronic manufacturing.",
    image: "/images/leadership/Mr. Dattatray Dudhe.jpg",
    linkedIn: "https://www.linkedin.com/in/dattatray-dudhe-525436443",
  },
  {
    order: 7,
    name: "Mr. Suresh Fale",
    role: "Senior Manager Finance & HR, Admin",
    bio: "An accomplished finance professional with over 17 years of experience across accounting, finance, administration, human resources, taxation, and financial operations. Demonstrates strong expertise in financial reporting, statutory compliance, GST and TDS, audit management, and treasury operations, with a focus on strengthening financial controls, enhancing operational efficiency, and ensuring regulatory compliance.",
    image: "/images/leadership/Mr. Suresh Fale.jpg",
    linkedIn: "https://www.linkedin.com/in/suresh-fale-69a035130",
  },
] as const;

