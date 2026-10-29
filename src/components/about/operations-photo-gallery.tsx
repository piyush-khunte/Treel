"use client";

import { ChevronLeft, ChevronRight, Factory, HardHat, ShieldCheck, Wrench } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const GALLERY_SLIDES = [
  {
    id: "manufacturing",
    tag: "MANUFACTURING & SENSOR ASSEMBLY",
    title: "Automotive Cleanroom SMT Production Facility",
    description:
      "High-speed surface-mount technology (SMT) cleanroom assembly and automated optical inspection lines in India, manufacturing IATF 16949 certified automotive TPMS sensors.",
    image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1793078441/gallery-manufacturing-smt.jpg",
    icon: Factory,
    alt: "Treel cleanroom manufacturing facility and automated SMT electronics line producing automotive sensors",
    caption: "Cleanroom SMT lines · Automated optical inspection · IATF 16949 compliant",
  },
  {
    id: "deployment",
    tag: "FIELD OPERATIONS & TELEMATICS DEPLOYMENT",
    title: "On-the-Job Depot Engineering & Gateway Installation",
    description:
      "Treel field telematics applications engineers and technicians deploying ruggedized vehicle gateways, pairing wheel-end sensors, and validating RF links in commercial fleet maintenance yards.",
    image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1793078443/gallery-field-deployment.jpg",
    icon: HardHat,
    alt: "Treel field telematics engineers mounting sensors and gateways on commercial trucks in fleet depot",
    caption: "Live depot fitments · Telemetry diagnostics · Multi-axle commercial calibration",
  },
  {
    id: "testing",
    tag: "QUALITY & ENVIRONMENTAL TESTING",
    title: "IP65 / IP67 Submersion & Environmental Testing Lab",
    description:
      "Automotive reliability validation laboratory equipped with pressurized IP67 water immersion tanks, -40°C to +125°C thermal shock chambers, and high-frequency vibration shaker tables.",
    image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1793078443/gallery-environmental-testing.jpg",
    icon: ShieldCheck,
    alt: "Automotive testing laboratory with IP67 water immersion test tank and environmental thermal chambers",
    caption: "IP65/IP67 water immersion · Thermal shock testing · Vibration stress qualification",
  },
  {
    id: "inspection",
    tag: "DIGITAL TIRE MANAGEMENT",
    title: "Digital Yard Inspection & Bluetooth Tread Diagnostics",
    description:
      "Depot technicians performing 10-point wheel-end checks using Bluetooth-enabled digital tread depth gauges and calibrated pressure tools, syncing real-time data directly to TMIP vehicle digital twins.",
    image: "https://res.cloudinary.com/uwd11u7t/image/upload/v1793078444/gallery-digital-inspection.jpg",
    icon: Wrench,
    alt: "Technician using Bluetooth digital tread depth and pressure tool on commercial truck tyre",
    caption: "Bluetooth digital tread depth · Calibrated pressure inspection · Automated yard telemetry sync",
  },
];

export function OperationsPhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance slides every 6 seconds when not paused by user hover
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? GALLERY_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % GALLERY_SLIDES.length);
  };

  const currentSlide = GALLERY_SLIDES[currentIndex];
  const IconComponent = currentSlide.icon;

  return (
    <section className="py-20 border-b border-white/10 bg-[#0A0E14] relative overflow-hidden">
      {/* Subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(213, 87, 59, 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="font-inter text-xs font-semibold tracking-[0.25em] uppercase text-[#D5573B]">
                MANUFACTURING &amp; FIELD OPERATIONS
              </span>
            </div>
            <h2 className="font-fraunces text-2xl sm:text-3xl lg:text-4xl font-medium tracking-tight text-[#FAF7F2]">
              Inside our manufacturing &amp; field premises.
            </h2>
            <p className="text-[#94A3B8] text-sm sm:text-base leading-relaxed font-inter">
              A look at where Treel hardware is built, qualified, and deployed — cleanroom SMT production, environmental endurance testing, and on-the-job telemetry deployments across commercial fleet yards.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
            <div className="font-mono text-xs text-[#94A3B8] bg-white/[0.04] px-3 py-1.5 rounded border border-white/10">
              <strong className="text-white">0{currentIndex + 1}</strong> / 0{GALLERY_SLIDES.length}
            </div>
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/15 text-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/15 text-[#FAF7F2] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Rectangular Slideshow Frame (Cinematic 16:9 / 16:10 format) */}
        <div
          className="relative rounded-xl border border-white/15 overflow-hidden shadow-2xl bg-[#0F1419] group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Visual Image (Aspect ratio 16:9) */}
          <div className="relative aspect-[16/9] sm:aspect-[16/9] w-full max-h-[640px] overflow-hidden bg-black">
            <Image
              src={currentSlide.image}
              alt={currentSlide.alt}
              fill
              priority
              className="object-cover object-center transition-all duration-700 ease-out transform group-hover:scale-[1.01]"
              sizes="(max-width: 768px) 100vw, 1320px"
            />

            {/* Gradient Overlays for readable typography */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E14] via-[#0A0E14]/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0E14]/80 via-transparent to-transparent hidden md:block" />

            {/* Floating Top Tag */}
            <div className="absolute top-5 left-5 sm:top-7 sm:left-7 flex items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-[#FAF7F2] font-semibold">
                <IconComponent className="w-3.5 h-3.5 text-[#D5573B]" />
                <span>{currentSlide.tag}</span>
              </div>
            </div>

            {/* Floating Bottom Title Card */}
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 max-w-4xl">
              <h3 className="font-fraunces text-xl sm:text-2xl lg:text-3xl font-medium text-white tracking-tight drop-shadow-md">
                {currentSlide.title}
              </h3>
            </div>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="bg-[#0D1219] border-t border-white/10 p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            {GALLERY_SLIDES.map((slide, idx) => {
              const isSelected = idx === currentIndex;
              return (
                <button
                  key={slide.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`text-left p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    isSelected
                      ? "bg-white/[0.08] border-[#D5573B] shadow-sm shadow-[#D5573B]/20"
                      : "bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-[#94A3B8]">0{idx + 1}</span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D5573B]" />
                    )}
                  </div>
                  <div className="text-xs font-semibold text-[#FAF7F2] truncate">
                    {slide.title}
                  </div>
                  <div className="text-[11px] text-[#94A3B8] font-mono truncate">
                    {slide.tag.split("&")[0].trim()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

