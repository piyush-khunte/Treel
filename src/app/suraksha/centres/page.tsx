"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Phone, Clock, Search, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function SurakshaCentresPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const centres = [
    {
      name: "JK Truck Wheels — Pune Highway Hub",
      type: "Truck Wheels Centre",
      city: "Pune",
      state: "Maharashtra",
      address: "Survey No. 45, Near Toll Plaza, NH48 Pune-Bengaluru Highway, Khed Shivapur, Pune, Maharashtra 412205",
      phone: "+91 91120 00174",
      hours: "Open 24 Hours",
      services: ["Installation", "Sales", "Zero-Down EMI", "Warranty Support"]
    },
    {
      name: "National Highway Tyre Plaza — Mumbai Hub",
      type: "Certified Installation Point",
      city: "Navi Mumbai",
      state: "Maharashtra",
      address: "Plot 12, Kalamboli Truck Terminal, NH48 Corridor, Navi Mumbai 410218",
      phone: "+91 98230 45678",
      hours: "6:00 AM – 11:00 PM",
      services: ["Installation", "Sales", "WhatsApp Support"]
    },
    {
      name: "JK Tyre Steel Wheels — Delhi-Jaipur Corridor",
      type: "JK Tyre Dealer",
      city: "Gurugram",
      state: "Haryana",
      address: "NH48 KM Milestone 42, Near Hero Honda Chowk, Gurugram, Haryana 122001",
      phone: "+91 98110 12345",
      hours: "7:00 AM – 10:00 PM",
      services: ["Installation", "Sales", "Easy EMI"]
    },
    {
      name: "Suraksha Highway Hub — Jaipur By-Pass",
      type: "Truck Wheels Centre",
      city: "Jaipur",
      state: "Rajasthan",
      address: "Transport Nagar, Ring Road Junction, NH21, Jaipur, Rajasthan 302003",
      phone: "+91 94140 78901",
      hours: "Open 24 Hours",
      services: ["Installation", "Free 15-Min Fitment", "EMI Available"]
    },
    {
      name: "Chennai Port Truck Care Centre",
      type: "Truck Wheels Centre",
      city: "Chennai",
      state: "Tamil Nadu",
      address: "No. 88, Ennore Express Road, Manali, Chennai, Tamil Nadu 600068",
      phone: "+91 98400 65432",
      hours: "Open 24 Hours",
      services: ["Installation", "Sales", "Multi-Axle Specialists"]
    },
    {
      name: "Golden Quadrilateral Tyre Hub — Kolkata",
      type: "JK Tyre Dealer",
      city: "Howrah",
      state: "West Bengal",
      address: "NH16 Bombay Road, Kona Expressway Crossing, Howrah, West Bengal 711113",
      phone: "+91 98300 98765",
      hours: "6:00 AM – 10:00 PM",
      services: ["Installation", "Warranty Support", "Sales"]
    }
  ];

  const filteredCentres = centres.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedType === "All" || c.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-0 bg-[#FEF3C7] text-[#451A03] font-rubik min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-20 border-b border-[#451A03]/10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="border text-[#DC2626] bg-[#DC2626]/10 border-[#DC2626]/20 font-rubik text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full inline-block">
              NEAREST CENTRE
            </div>
            <h1 className="font-anton uppercase tracking-wider text-4xl sm:text-5xl lg:text-6xl text-[#DC2626] leading-[1.15]">
              Karib Ka Suraksha Centre Dhoondiye.
            </h1>
            <p className="text-[#78350F] text-lg sm:text-xl leading-relaxed font-rubik font-medium max-w-3xl">
              Truck Wheels centres, JK tyre dealers, aur 400+ certified highway service points across India. 15-minute quick installation, instant warranty setup, and easy EMI approval.
            </p>
          </div>
        </div>
      </section>

      {/* Locator Controls */}
      <section className="py-12 border-b border-[#451A03]/10 bg-[#FFFBEB]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="max-w-4xl space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#78350F]" />
              <input
                type="text"
                placeholder="Pincode, city, state, ya highway number search karein..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-[#451A03]/20 rounded-xl text-[#451A03] font-medium text-base focus:outline-none focus:border-[#DC2626] shadow-sm"
              />
            </div>

            <div className="flex flex-wrap gap-3 items-center text-xs font-bold uppercase tracking-wider">
              {["All", "Truck Wheels Centre", "JK Tyre Dealer", "Certified Installation Point"].map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
                    selectedType === t
                      ? "bg-[#DC2626] text-white shadow-md"
                      : "bg-[#FEF3C7] text-[#78350F] border border-[#451A03]/20 hover:bg-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Centres List Grid */}
      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCentres.map((c, idx) => (
              <div key={idx} className="bg-[#FFFBEB] border border-[#451A03]/10 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-[#DC2626]/10 text-[#DC2626] font-bold text-xs uppercase tracking-wider">
                    {c.type}
                  </div>
                  <div>
                    <h3 className="font-anton text-xl uppercase tracking-wider text-[#451A03]">{c.name}</h3>
                    <div className="text-xs font-bold text-[#EA580C] mt-1">{c.city}, {c.state}</div>
                  </div>

                  <div className="space-y-2 text-xs text-[#78350F] font-medium">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
                      <span>{c.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                      <span>{c.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#0891B2] shrink-0" />
                      <span>{c.hours}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {c.services.map((s, sIdx) => (
                      <span key={sIdx} className="px-2 py-0.5 rounded bg-[#FEF3C7] border border-[#451A03]/10 text-[10px] font-bold text-[#451A03]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#451A03]/10 flex items-center justify-between">
                  <Link
                    href={`tel:${c.phone}`}
                    className="text-xs font-bold text-[#DC2626] hover:underline flex items-center gap-1"
                  >
                    Call Centre →
                  </Link>
                  <Link
                    href="/suraksha/whatsapp"
                    className="text-xs font-bold text-[#0891B2] hover:underline flex items-center gap-1"
                  >
                    WhatsApp Helpline
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
