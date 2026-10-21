"use client";

import React, { useState } from "react";
import Image from "next/image";

interface FounderPortraitProps {
  imageSrc?: string;
  name: string;
  role: string;
  location?: string;
}

export function FounderPortrait({
  imageSrc = "/images/leadership/manish-ingale.png",
  name,
  role,
  location = "Pune, India",
}: FounderPortraitProps) {
  const [hasError, setHasError] = useState(false);

  // If a valid image exists and hasn't errored, display the portrait
  if (imageSrc && !hasError) {
    return (
      <div className="w-full max-w-[280px] aspect-[4/5] rounded-lg bg-[#141A22] border border-white/[0.08] relative overflow-hidden shadow-xl">
        <Image
          src={imageSrc}
          alt={`Portrait of ${name}, ${role}`}
          fill
          unoptimized
          sizes="(max-width: 640px) 100vw, 280px"
          className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
          onError={() => setHasError(true)}
          priority
        />
      </div>
    );
  }

  // Graceful, high-polish executive monogram placeholder (pending studio photograph delivery)
  return (
    <div
      className="w-full max-w-[280px] aspect-[4/5] rounded-lg bg-[#11151A] border border-white/[0.08] relative overflow-hidden flex flex-col items-center justify-between p-7 text-center shadow-xl select-none"
      aria-label={`${name} executive profile`}
    >
      {/* Ambient background glow */}
      <div
        className="absolute -top-10 -right-10 w-44 h-44 rounded-full pointer-events-none opacity-40"
        style={{
          background: "radial-gradient(circle, rgba(213, 87, 59, 0.25) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle Treel motion signature graphic watermark */}
      <div className="w-full flex items-center justify-end opacity-20 pt-1" aria-hidden="true">
        <div className="flex flex-col gap-1 items-end">
          <div className="h-[2px] w-8 rounded-full bg-[#D5573B]" />
          <div className="h-[2px] w-5 rounded-full bg-[#D5573B]/70" />
          <div className="h-[2px] w-2 rounded-full bg-[#D5573B]/40" />
        </div>
      </div>

      {/* Center Monogram Badge */}
      <div className="flex flex-col items-center justify-center my-auto space-y-3 z-10">
        <div className="w-24 h-24 rounded-full bg-white/[0.04] border border-[#D5573B]/30 flex items-center justify-center shadow-inner group">
          <span className="font-fraunces text-3xl sm:text-4xl font-medium text-[#FAF7F2] tracking-wider">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </span>
        </div>
        <div className="font-jetbrains font-mono text-[10px] tracking-[0.2em] uppercase text-[#D5573B] font-semibold">
          FOUNDER &amp; CEO
        </div>
      </div>

      {/* Bottom context caption */}
      <div className="w-full pt-3 border-t border-white/[0.06] z-10">
        <div className="text-[11px] font-mono text-[#94A3B8]">{location}</div>
        <div className="text-[9px] font-mono text-[#64748B] uppercase tracking-wider mt-0.5">
          Portrait Pending Client Asset
        </div>
      </div>
    </div>
  );
}

