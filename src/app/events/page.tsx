import type { Metadata } from "next";
import Link from "next/link";
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Video, 
  ExternalLink 
} from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { EventSubscribeForm } from "./event-subscribe-form";
import { getPublishedEvents } from "@/lib/content/events-storage";

export const metadata: Metadata = {
  title: "Events · Where you can meet Treel",
  description: "Upcoming conferences, webinars, product demos, and industry meetups. If we're in your city, come by.",
  alternates: {
    canonical: "https://treel.in/events",
  },
  openGraph: {
    title: "Events · Where you can meet Treel",
    description: "Upcoming conferences, webinars, product demos, and industry meetups. If we're in your city, come by.",
    url: "https://treel.in/events",
  },
};

export const revalidate = 60;

export default async function EventsPage() {
  const allPublished = await getPublishedEvents();

  const upcomingEvents = allPublished.filter((e) => e.status !== "Completed" && e.status !== "Cancelled");
  const pastEvents = allPublished.filter((e) => e.status === "Completed");

  return (
    <div className="space-y-0 bg-[#0F1419] text-[#FAF7F2] font-inter">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-white/10">
        <div 
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(213, 87, 59, 0.12) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
          <div className="max-w-4xl space-y-6">
            <Breadcrumb
              variant="corporate"
              items={[
                { label: "Home", href: "/" },
                { label: "Events" },
              ]}
            />
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                EVENTS
              </span>
            </div>
            <h1 className="font-fraunces text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#FAF7F2] leading-[1.12]">
              Where you can meet Treel.
            </h1>
            <p className="text-[#94A3B8] text-lg sm:text-xl leading-relaxed font-inter max-w-3xl">
              Upcoming conferences, webinars, product demos, and industry meetups. If we&apos;re in your city, come by.
            </p>
          </div>
        </div>
      </section>

      {/* 2. UPCOMING EVENTS */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                CALENDAR
              </span>
              <h2 className="font-fraunces text-3xl sm:text-4xl font-medium text-[#FAF7F2] tracking-tight mt-1">
                Upcoming Events
              </h2>
            </div>
            <p className="text-xs text-[#94A3B8] font-mono">
              Showing {upcomingEvents.length} scheduled sessions
            </p>
          </div>

          {upcomingEvents.length === 0 ? (
            <div className="p-12 rounded-lg bg-white/[0.02] border border-white/10 text-center space-y-3">
              <Calendar className="w-8 h-8 text-[#D5573B] mx-auto opacity-80" />
              <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2]">No upcoming public events scheduled</h3>
              <p className="text-sm text-[#94A3B8] max-w-md mx-auto">
                Check back soon or subscribe below to be notified when new sessions, conferences, and webinars are scheduled.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <div 
                  key={event.slug}
                  className="group p-8 rounded-lg bg-white/[0.03] border border-white/10 hover:border-[#D5573B]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono uppercase px-2.5 py-0.5 rounded-[4px] bg-[#D5573B]/10 text-[#D5573B] border border-[#D5573B]/20 font-semibold">
                        {event.type}
                      </span>
                      {event.isOnline ? (
                        <span className="flex items-center gap-1 text-[11px] text-[#94A3B8] font-mono">
                          <Video className="w-3 h-3 text-[#D5573B]" /> Online
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] text-[#94A3B8] font-mono">
                          <MapPin className="w-3 h-3 text-[#D5573B]" /> In-Person
                        </span>
                      )}
                    </div>

                    <h3 className="font-fraunces text-xl font-medium text-[#FAF7F2] group-hover:text-[#D5573B] transition-colors leading-snug">
                      {event.name}
                    </h3>

                    <div className="space-y-1.5 text-xs text-[#94A3B8] font-mono pt-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-[#D5573B]" />
                        <span>{event.dateTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#D5573B]" />
                        <span>{event.location}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed pt-2">
                      {event.excerpt}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-white/10">
                    <Link
                      href={`/events/${event.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#D5573B] group-hover:text-[#FAF7F2] transition-colors"
                    >
                      <span>View event details &amp; register</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. PAST EVENTS ARCHIVE */}
      <section className="py-20 border-b border-white/10">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-3xl mb-12 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
              ARCHIVE
            </span>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Past events
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed">
              Missed us at a previous event? Recordings, whitepapers, and presentation decks from our keynotes are archived below.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((item) => (
              <div 
                key={item.slug || item._id}
                className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                    <span>{item.dateTime}</span>
                    <span>{item.location}</span>
                  </div>
                  <h4 className="font-fraunces text-base font-medium text-[#FAF7F2] leading-snug">
                    {item.name}
                  </h4>
                </div>
                <div className="pt-3 border-t border-white/5">
                  {item.materialUrl ? (
                    <Link 
                      href={item.materialUrl}
                      className="inline-flex items-center gap-1.5 text-xs text-[#D5573B] hover:text-[#FAF7F2] font-medium transition-colors"
                    >
                      <span>{item.materialLabel || "View Details"}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  ) : (
                    <Link 
                      href={`/events/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs text-[#D5573B] hover:text-[#FAF7F2] font-medium transition-colors"
                    >
                      <span>View Session Archive</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SUBSCRIBE TO EVENT UPDATES FORM */}
      <section className="py-20 border-b border-white/10 relative overflow-hidden bg-white/[0.01]">
        <div className="max-w-[1320px] mx-auto px-6 sm:px-10">
          <div className="max-w-2xl space-y-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D5573B] font-semibold">
                STAY INFORMED
              </span>
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Get notified.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-inter">
              We announce events about 4–6 weeks in advance. Get an email when there&apos;s a conference, keynote, or workshop in your city.
            </p>

            <EventSubscribeForm />
          </div>
        </div>
      </section>
    </div>
  );
}