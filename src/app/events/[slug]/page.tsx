import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Video, 
  Share2, 
  ChevronRight, 
  CheckCircle2, 
  Building2,
  CalendarPlus
} from "lucide-react";
import { EventRegisterForm } from "./event-register-form";

interface EventDetail {
  slug: string;
  type: string;
  name: string;
  dateTime: string;
  location: string;
  isOnline?: boolean;
  about: string[];
  agenda: { time: string; title: string; speaker: string; desc: string }[];
  speakers: { name: string; role: string; org: string; bio: string }[];
}

const EVENTS_DATA: Record<string, EventDetail> = {
  "fleet-telematics-summit-2026": {
    slug: "fleet-telematics-summit-2026",
    type: "Conference",
    name: "National Commercial Fleet & Telematics Summit 2026",
    dateTime: "14–16 October 2026 · 09:30 AM – 05:30 PM IST",
    location: "Hall 4, Pragati Maidan, New Delhi, India",
    isOnline: false,
    about: [
      "The National Commercial Fleet & Telematics Summit brings together chief operating officers, fleet directors, and automotive technology innovators from across the Indian subcontinent. As logistics corridors expand and vehicle payloads scale, operating efficiency requires real-time physics models rather than simple GPS pings.",
      "Treel Mobility Solutions will deliver the keynote presentation on 'Operating Vehicle Digital Twins at National Scale: Telemetry Findings from 68,000 Commercial Vehicles'. Join our technical leadership to explore how thermodynamic wheel-end sensing transforms fleet unit economics and virtually eliminates highway tyre blowouts.",
    ],
    agenda: [
      {
        time: "09:30 AM – 10:30 AM",
        title: "Keynote: Beyond GPS — Transforming Commercial Haulage with Wheel Telemetry",
        speaker: "Manish Ingale (Founder, Treel Mobility)",
        desc: "An architectural deep-dive into how sensor ingestion at 24 Hz decodes tire degradation, axle balance, and fuel drag before physical breakdown occurs.",
      },
      {
        time: "11:00 AM – 12:30 PM",
        title: "Panel: The CFO Dilemma — Fleet Payback and Real-World ROI in 2026",
        speaker: "Executive Fleet Directors & Treel Analytics Team",
        desc: "Case studies from 500+ vehicle fleet operators demonstrating how sub-second telemetry achieves median payback in 9 months.",
      },
      {
        time: "02:00 PM – 03:30 PM",
        title: "Live Hardware & Digital Twin Demonstration",
        speaker: "Treel Systems Engineering Team",
        desc: "Live interactive bench testing of IP69K military-rated sensors under high thermal and mechanical stress profiles.",
      },
    ],
    speakers: [
      {
        name: "Manish Ingale",
        role: "Founder & CEO",
        org: "Treel Mobility Solutions",
        bio: "Founded Treel in 2018 with the vision of converting commercial vehicle wheel dynamics into actionable enterprise intelligence. Leading architecture and national OEM deployments.",
      },
      {
        name: "Dr. Vikram Seth",
        role: "Head of Mobility Data Science",
        org: "Treel Mobility Solutions",
        bio: "Specializes in thermodynamic modeling, multi-axle load distribution inference, and predictive machine learning models for high-tonnage freight transport.",
      },
    ],
  },
  "zero-roadside-blowouts-webinar": {
    slug: "zero-roadside-blowouts-webinar",
    type: "Webinar",
    name: "Zero Roadside Blowouts: The Predictive Maintenance Playbook",
    dateTime: "12 November 2026 · 03:00 PM – 04:15 PM IST",
    location: "Online (Live Interactive Zoom with Q&A)",
    isOnline: true,
    about: [
      "Roadside tyre failures remain the number-one driver of unscheduled commercial vehicle downtime in India, causing severe delays, cargo loss, and highway accidents. Yet over 85% of catastrophic carcass failures show distinct thermodynamic anomalies hours before failure.",
      "In this live 75-minute technical masterclass, Treel's systems engineering team demonstrates how to transition from reactive roadside repairs to deterministic maintenance schedules using live Vehicle Digital Twins.",
    ],
    agenda: [
      {
        time: "03:00 PM – 03:20 PM",
        title: "The Physics of Tyre Failure: Heat, Load, and Decay Gradients",
        speaker: "Engineering Team",
        desc: "Why traditional pressure checks at fuel stations miss micro-punctures and bead-seat leaks.",
      },
      {
        time: "03:20 PM – 03:50 PM",
        title: "Configuring Real-Time Alert Workflows for Dispatch & Depot Teams",
        speaker: "Product Operations Lead",
        desc: "Step-by-step guidance on setting threshold parameters to dispatch mechanics during scheduled loading windows.",
      },
      {
        time: "03:50 PM – 04:15 PM",
        title: "Open Live Q&A with Treel Telematics Architects",
        speaker: "Treel Engineering Panel",
        desc: "Direct troubleshooting, integration questions with existing ERP/FMS platforms, and API walkthrough.",
      },
    ],
    speakers: [
      {
        name: "Rajesh Kulkarni",
        role: "VP of Product Engineering",
        org: "Treel Mobility Solutions",
        bio: "Over 15 years in automotive embedded systems and commercial vehicle telematics. Directs Treel's firmware and telemetry ingest pipelines.",
      },
    ],
  },
  "pune-mobility-engineering-roundtable": {
    slug: "pune-mobility-engineering-roundtable",
    type: "In-person",
    name: "Pune Commercial Mobility Engineering Roundtable",
    dateTime: "4 December 2026 · 05:00 PM – 08:00 PM IST",
    location: "Treel R&D Centre, Baner Tech Park, Pune, Maharashtra",
    isOnline: false,
    about: [
      "An invitation-only technical roundtable bringing together Pune's premier automotive hardware, IoT, and embedded firmware engineers. Explore the challenges of sub-second sensor telemetry in harsh operating conditions across India's industrial freight routes.",
      "Tour Treel's hardware test laboratory, examine our latest ARAI-certified sensor prototypes, and network with engineers building the future of connected mobility.",
    ],
    agenda: [
      {
        time: "05:00 PM – 05:45 PM",
        title: "Welcome & R&D Laboratory Tour",
        speaker: "Treel Lab Director",
        desc: "Behind-the-scenes walkthrough of environmental stress testing, RF chamber calibration, and battery endurance test stations.",
      },
      {
        time: "05:45 PM – 07:00 PM",
        title: "Technical Panel: Hardware Resilience Under 60°C Road Temps and 50G Impacts",
        speaker: "Hardware Engineering Leads",
        desc: "Designing IP69K electronics for multi-year maintenance-free service life on heavy commercial axles.",
      },
      {
        time: "07:00 PM – 08:00 PM",
        title: "Networking Dinner & Drinks",
        speaker: "All Attendees",
        desc: "Connect with fellow hardware and software engineers in the Pune automotive tech ecosystem.",
      },
    ],
    speakers: [
      {
        name: "Sanjay Deshmukh",
        role: "Director of Hardware Engineering",
        org: "Treel Mobility Solutions",
        bio: "Leading sensor packaging, piezoelectric transducer integration, and long-range BLE telemetry design.",
      },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(EVENTS_DATA).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = EVENTS_DATA[slug] || EVENTS_DATA["fleet-telematics-summit-2026"];

  return {
    title: `${event.name} · Treel Events`,
    description: event.about[0] ? event.about[0].slice(0, 150) + "..." : "Treel Mobility event details and registration.",
    alternates: {
      canonical: `https://treel.in/events/${event.slug}`,
    },
    openGraph: {
      title: `${event.name} · Treel Events`,
      description: event.about[0] ? event.about[0].slice(0, 150) + "..." : "Treel Mobility event details and registration.",
      url: `https://treel.in/events/${event.slug}`,
    },
  };
}

export default async function EventSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = EVENTS_DATA[slug] || {
    slug,
    type: "Conference",
    name: "Treel Commercial Mobility Forum",
    dateTime: "Coming Soon · Check Back For Dates",
    location: "Online / Selected Cities",
    isOnline: true,
    about: [
      "Treel connects commercial fleets to operating intelligence. Check back shortly for updated speaker lists, agenda timelines, and registration details for this session.",
    ],
    agenda: [
      {
        time: "10:00 AM – 11:30 AM",
        title: "Vehicle Digital Twin Architecture Briefing",
        speaker: "Treel Engineering Team",
        desc: "Overview of platform capabilities and operational economics for commercial vehicle fleets.",
      },
    ],
    speakers: [
      {
        name: "Treel Technical Team",
        role: "Mobility Intelligence",
        org: "Treel Mobility Solutions",
        bio: "Engineers and researchers building India's largest connected vehicle dataset.",
      },
    ],
  };

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HEADER & HERO */}
      <section className="relative overflow-hidden pt-24 pb-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-4xl space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8]">
              <Link href="/events" className="hover:text-[#FAF7F2] transition-colors">
                Events
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-white/30" />
              <span className="text-[#D5573B] truncate max-w-xs">{event.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono uppercase px-3 py-1 rounded-[4px] bg-[#D5573B]/10 text-[#D5573B] border border-[#D5573B]/20 font-semibold tracking-wider">
                {event.type}
              </span>
            </div>

            <h1 className="font-fraunces text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              {event.name}
            </h1>

            {/* Date and Location Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-sm text-[#CBD5E1] font-inter">
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-[#D5573B] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">Date &amp; Time</div>
                  <div className="font-medium text-[#FAF7F2] mt-0.5">{event.dateTime}</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D5573B] mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#94A3B8]">Location</div>
                  <div className="font-medium text-[#FAF7F2] mt-0.5">{event.location}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TWO-COLUMN DETAILS: LEFT = ABOUT & AGENDA & SPEAKERS; RIGHT = REGISTRATION FORM */}
      <section className="py-16 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column (8 cols): Event Description, Agenda, Speakers */}
            <div className="lg:col-span-7 space-y-16">
              {/* About this event */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                  OVERVIEW
                </span>
                <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                  About this event
                </h2>
                <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                  {event.about.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </div>

              {/* Agenda */}
              <div className="space-y-6 pt-6 border-t border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                    SCHEDULE
                  </span>
                  <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight mt-1">
                    Agenda
                  </h2>
                </div>
                <div className="space-y-4">
                  {event.agenda.map((item, idx) => (
                    <div 
                      key={idx}
                      className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] space-y-2 hover:border-white/20 transition-colors"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#D5573B]">
                        <span className="font-semibold">{item.time}</span>
                        <span className="text-[#94A3B8]">{item.speaker}</span>
                      </div>
                      <h3 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speakers */}
              <div className="space-y-6 pt-6 border-t border-white/10">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                    PRESENTERS
                  </span>
                  <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight mt-1">
                    Featured Speakers
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {event.speakers.map((sp, idx) => (
                    <div 
                      key={idx}
                      className="p-6 rounded-lg bg-white/[0.03] border border-white/10 space-y-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#D5573B]/10 border border-[#D5573B]/30 flex items-center justify-center text-[#D5573B] font-fraunces text-lg font-semibold">
                        {sp.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <h4 className="font-fraunces text-lg font-medium text-[#FAF7F2]">
                          {sp.name}
                        </h4>
                        <div className="text-xs text-[#D5573B] font-mono mt-0.5">
                          {sp.role} · {sp.org}
                        </div>
                      </div>
                      <p className="text-xs text-[#94A3B8] leading-relaxed pt-1">
                        {sp.bio}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Calendar & Share strip */}
              <div className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
                  Add to your calendar
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://calendar.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/[0.05] border border-white/10 text-xs font-medium text-[#FAF7F2] hover:bg-white/10 hover:border-[#D5573B] transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4 text-[#D5573B]" />
                    <span>Google Calendar</span>
                  </a>
                  <a
                    href="https://outlook.live.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/[0.05] border border-white/10 text-xs font-medium text-[#FAF7F2] hover:bg-white/10 hover:border-[#D5573B] transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4 text-[#D5573B]" />
                    <span>Outlook Calendar</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Registration Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-28">
                <EventRegisterForm eventName={event.name} dateTime={event.dateTime} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}