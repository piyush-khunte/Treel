"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getLeadershipPhotoForAuthor } from "@/lib/authors/author-utils";

export interface AuthorAvatarProps {
  name: string;
  image?: string | null;
  size?: "sm" | "md" | "lg" | "xl";
  shape?: "circle" | "rounded";
  className?: string;
  priority?: boolean;
}

export function AuthorAvatar({
  name,
  image,
  size = "md",
  shape = "circle",
  className = "",
  priority = false,
}: AuthorAvatarProps) {
  const [hasError, setHasError] = useState(false);

  // Compute initials for avatar fallback (e.g., "Pradnya Choudhary" -> "PC")
  const initials = (name || "Treel")
    .replace(/^(mr\.|mrs\.|ms\.|dr\.)\s+/i, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "T";

  // Resolve image source: prefer explicitly provided image, fallback to leadership mapping
  const resolvedImage = image || getLeadershipPhotoForAuthor(name);

  // Dimension & styling presets
  const sizeClasses = {
    sm: "w-6 h-6 text-[10px]",
    md: "w-10 h-10 text-sm",
    lg: "w-20 h-20 text-2xl",
    xl: "w-28 h-28 sm:w-36 sm:h-36 text-3xl sm:text-4xl",
  }[size];

  const shapeClasses = shape === "circle" ? "rounded-full" : "rounded-2xl";

  const imageSizes = {
    sm: "24px",
    md: "40px",
    lg: "80px",
    xl: "(max-width: 640px) 112px, 144px",
  }[size];

  // If valid image exists and hasn't errored out, render optimized Next.js Image
  if (resolvedImage && !hasError) {
    return (
      <div
        className={`relative overflow-hidden shrink-0 border border-white/15 bg-slate-900 shadow-md ${sizeClasses} ${shapeClasses} ${className}`}
      >
        <Image
          src={resolvedImage}
          alt={name}
          fill
          className="object-cover"
          sizes={imageSizes}
          priority={priority}
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  // Graceful Fallback: High-contrast Dark Corporate Initials Badge
  return (
    <div
      className={`relative overflow-hidden shrink-0 flex items-center justify-center font-fraunces font-medium text-[#FAF7F2]/90 select-none bg-gradient-to-br from-white/[0.12] via-white/[0.05] to-white/[0.02] border border-white/15 shadow-md ${sizeClasses} ${shapeClasses} ${className}`}
      aria-label={name}
    >
      <span className="leading-none tracking-wider">{initials}</span>
    </div>
  );
}

