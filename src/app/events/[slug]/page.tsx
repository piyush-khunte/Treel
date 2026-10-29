import { getEventBySlug, getPublishedEvents } from "@/lib/content/events-storage";
import { createEventCalendarLinks } from "@/lib/events/calendar-links";
import {
Calendar,
CalendarPlus,
ChevronRight,
ExternalLink,
MapPin,
Video
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EventRegisterForm } from "./event-register-form";

export async function generateStaticParams() {
  const events = await getPublishedEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event || event.publicationStatus === "Draft") {
    return {
      title: "Event Not Found · Treel Events",
      description: "The requested event could not be found.",
    };
  }

  const desc = event.seoDescription || (event.about && event.about[0] ? event.about[0].slice(0, 150) + "..." : event.excerpt);

  return {
    title: event.seoTitle || `${event.name} · Treel Events`,
    description: desc || "Treel Mobility event details and registration.",
    alternates: {
      canonical: `https://treel.in/events/${event.slug}`,
    },
    openGraph: {
      title: event.seoTitle || `${event.name} · Treel Events`,
      description: desc || "Treel Mobility event details and registration.",
      url: `https://treel.in/events/${event.slug}`,
      images: event.bannerUrl || event.image ? [{ url: event.bannerUrl || event.image! }] : undefined,
    },
  };
}

export const revalidate = 60;

export default async function EventSlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);

  if (!event || event.publicationStatus === "Draft") {
    notFound();
  }

  const aboutParagraphs = event.about && event.about.length > 0 
    ? event.about 
    : event.excerpt 
    ? [event.excerpt] 
    : [];

  const agenda = event.agenda || [];
  const speakers = event.speakers || [];
  const calendarLinks = createEventCalendarLinks(event);

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
              {event.isOnline && (
                <span className="text-xs font-mono text-[#00E5FF] flex items-center gap-1">
                  <Video className="w-3.5 h-3.5" /> Online
                </span>
              )}
            </div>

            <h1 className="font-fraunces text-3xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              {event.name}
            </h1>

            {/* Event banner image if available */}
            {(event.bannerUrl || event.image) && (
              <div className="pt-2 rounded-xl overflow-hidden max-w-3xl">
                <Image
                  src={event.bannerUrl || event.image!}
                  alt={event.name}
                  width={1200}
                  height={600}
                  unoptimized
                  className="w-full h-auto max-h-[380px] object-cover rounded-xl border border-white/10 shadow-lg"
                />
              </div>
            )}

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
              {aboutParagraphs.length > 0 && (
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                    OVERVIEW
                  </span>
                  <h2 className="font-fraunces text-2xl sm:text-3xl font-medium text-[#FAF7F2] tracking-tight">
                    About this event
                  </h2>
                  <div className="space-y-4 text-base sm:text-lg text-[#94A3B8] leading-relaxed">
                    {aboutParagraphs.map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Agenda */}
              {agenda.length > 0 && (
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
                    {agenda.map((item, idx) => (
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
              )}

              {/* Speakers */}
              {speakers.length > 0 && (
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
                    {speakers.map((sp, idx) => (
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
              )}

              {/* Add to Calendar & Share strip */}
              <div className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
                  Add to your calendar
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={calendarLinks.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Add to Google Calendar"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/[0.05] border border-white/10 text-xs font-medium text-[#FAF7F2] hover:bg-white/10 hover:border-[#D5573B] transition-colors"
                  >
                    <CalendarPlus className="w-4 h-4 text-[#D5573B]" />
                    <span>Google Calendar</span>
                  </a>
                  <a
                    href={calendarLinks.outlook}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Add to Outlook Calendar"
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
              <div className="sticky top-28 space-y-6">
                {event.registrationUrl ? (
                  <div className="p-8 rounded-lg bg-white/[0.03] border border-white/10 space-y-6 shadow-xl">
                    <div className="space-y-2">
                      <span className="text-[11px] font-mono uppercase text-[#D5573B] font-semibold tracking-wider">
                        OFFICIAL REGISTRATION
                      </span>
                      <h3 className="font-fraunces text-2xl font-medium text-[#FAF7F2]">
                        Register for this session
                      </h3>
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        Registration for this session is hosted through the official event portal. Click below to secure your pass.
                      </p>
                    </div>

                    <a
                      href={event.registrationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md bg-[#D5573B] text-[#FAF7F2] font-semibold text-sm hover:bg-[#CB4831] transition-all shadow-md group"
                    >
                      <span>Open Event Registration</span>
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                ) : (
                  <EventRegisterForm
                    eventName={event.name}
                    eventSlug={event.slug}
                    dateTime={event.dateTime}
                    location={event.location}
                    isOnline={event.isOnline}
                    googleCalendarUrl={calendarLinks.google}
                    outlookCalendarUrl={calendarLinks.outlook}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}