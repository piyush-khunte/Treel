"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Clock, 
  Video, 
  Users, 
  ExternalLink, 
  CheckCircle2, 
  Send 
} from "lucide-react";
import { TreelSignature } from "@/components/corporate/treel-signature";
import { Button } from "@/components/ui/button";

interface EventItem {
  slug: string;
  type: "Conference" | "Webinar" | "In-person" | "Meetup";
  name: string;
  dateTime: string;
  location: string;
  excerpt: string;
  isOnline?: boolean;
}

const UPCOMING_EVENTS: EventItem[] = [
  {
    slug: "fleet-telematics-summit-2026",
    type: "Conference",
    name: "National Commercial Fleet & Telematics Summit 2026",
    dateTime: "14–16 October 2026 · 09:30 AM IST",
    location: "Pragati Maidan, New Delhi",
    excerpt: "Keynote presentation on Vehicle Digital Twins and operational findings from 68,000 active commercial haulage vehicles.",
  },
  {
    slug: "zero-roadside-blowouts-webinar",
    type: "Webinar",
    name: "Zero Roadside Blowouts: The Predictive Maintenance Playbook",
    dateTime: "12 November 2026 · 03:00 PM IST",
    location: "Online (Interactive Zoom)",
    excerpt: "Technical walkthrough on configuring sub-second thermal telemetry to flag micro-leaks before roadside tyre blowouts occur.",
    isOnline: true,
  },
  {
    slug: "pune-mobility-engineering-roundtable",
    type: "In-person",
    name: "Pune Commercial Mobility Engineering Roundtable",
    dateTime: "4 December 2026 · 05:00 PM IST",
    location: "Treel R&D Centre, Baner, Pune",
    excerpt: "Engineering deep-dive with Treel hardware architects on IP69K sensor telemetry and high-vibration off-highway durability.",
  },
];

const PAST_EVENTS = [
  {
    name: "India EV & Commercial Fleet Expo 2026",
    date: "August 2026",
    location: "New Delhi",
    type: "Conference",
    materialUrl: "/research/roi-fleet-intelligence",
    materialLabel: "View Session Paper",
  },
  {
    name: "Heavy Haulage Safety & Cost Optimization",
    date: "June 2026",
    location: "Kolkata",
    type: "Roundtable",
    materialUrl: "/research/data-architecture",
    materialLabel: "Download Executive Deck",
  },
  {
    name: "JK Tyre & Treel Logistics Leadership Conclave",
    date: "April 2026",
    location: "Bengaluru",
    type: "Keynote",
    materialUrl: "/insights/from-telemetry-to-reasoning",
    materialLabel: "Read Summary",
  },
];

export default function EventsPage() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setSubmitting(false);
    setSubscribed(true);
  };

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
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                EVENTS
              </span>
              <TreelSignature variant="compact" />
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
              Showing {UPCOMING_EVENTS.length} scheduled sessions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {UPCOMING_EVENTS.map((event) => (
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
            {PAST_EVENTS.map((item, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-lg bg-white/[0.02] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8]">
                    <span>{item.date}</span>
                    <span>{item.location}</span>
                  </div>
                  <h4 className="font-fraunces text-base font-medium text-[#FAF7F2] leading-snug">
                    {item.name}
                  </h4>
                </div>
                <div className="pt-3 border-t border-white/5">
                  <Link 
                    href={item.materialUrl}
                    className="inline-flex items-center gap-1.5 text-xs text-[#D5573B] hover:text-[#FAF7F2] font-medium transition-colors"
                  >
                    <span>{item.materialLabel}</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
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
              <TreelSignature variant="compact" />
            </div>
            <h2 className="font-fraunces text-3xl sm:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Get notified.
            </h2>
            <p className="text-[#94A3B8] text-base leading-relaxed font-inter">
              We announce events about 4–6 weeks in advance. Get an email when there&apos;s a conference, keynote, or workshop in your city.
            </p>

            {subscribed ? (
              <div className="p-6 rounded-lg bg-[#D5573B]/10 border border-[#D5573B]/30 flex items-start gap-4 animate-in fade-in duration-300">
                <CheckCircle2 className="w-5 h-5 text-[#D5573B] mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <h4 className="font-fraunces text-base font-medium text-[#FAF7F2]">You&apos;re subscribed.</h4>
                  <p className="text-xs text-[#94A3B8]">
                    We&apos;ll notify <span className="text-white font-medium">{email}</span> whenever we schedule new events.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work email"
                    className="flex-1 px-4 py-3 rounded-md bg-[#141B22] border border-white/10 text-sm text-[#FAF7F2] placeholder-[#64748B] focus:outline-none focus:border-[#D5573B] transition-colors"
                  />
                  <Button
                    type="submit"
                    variant="treel"
                    disabled={submitting}
                    className="px-6 py-3 font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <span>{submitting ? "Subscribing..." : "Subscribe"}</span>
                    <Send className="w-3.5 h-3.5" />
                  </Button>
                </div>
                <p className="text-[11px] text-[#64748B] font-mono">
                  No spam. Event alerts only. Unsubscribe with one click anytime.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}