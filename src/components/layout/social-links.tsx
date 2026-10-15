"use client";

import React from "react";

export type SocialVariant = "master" | "tmip" | "suraksha" | "suraksha-light" | "personal";

export interface SocialLinkItem {
  name: string;
  href: string;
  label: string;
}

export const OFFICIAL_SOCIAL_LINKS: readonly SocialLinkItem[] = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/jktreel/",
    label: "Treel on Facebook",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/jktreel/",
    label: "Treel on LinkedIn",
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@jktreel5290",
    label: "Treel on YouTube",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/jktreel/",
    label: "Treel on Instagram",
  },
] as const;

interface SocialLinksProps {
  variant?: SocialVariant | string;
  className?: string;
  iconClassName?: string;
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
      />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
      />
    </svg>
  );
}

function renderSocialIcon(name: string, className?: string) {
  switch (name) {
    case "Facebook":
      return <FacebookIcon className={className} />;
    case "LinkedIn":
      return <LinkedInIcon className={className} />;
    case "YouTube":
      return <YouTubeIcon className={className} />;
    case "Instagram":
      return <InstagramIcon className={className} />;
    default:
      return null;
  }
}

export function SocialLinks({
  variant = "master",
  className = "",
  iconClassName,
}: SocialLinksProps) {
  const getVariantStyles = (v: string) => {
    switch (v) {
      case "tmip":
        return {
          container: "flex items-center gap-2.5 pt-2 flex-wrap",
          item: "w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#60A5FA] bg-white/[0.04] hover:bg-[#3B82F6]/15 border border-white/10 hover:border-[#3B82F6]/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3B82F6] focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A17]",
          icon: "w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110",
        };
      case "personal":
        return {
          container: "flex items-center gap-2.5 pt-2 flex-wrap",
          item: "w-9 h-9 rounded-lg flex items-center justify-center text-slate-400 hover:text-white bg-slate-800/60 hover:bg-blue-500/20 border border-slate-700/60 hover:border-blue-400/50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B132B]",
          icon: "w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110",
        };
      case "suraksha-light":
        return {
          container: "flex items-center gap-2.5 pt-2 flex-wrap",
          item: "w-9 h-9 rounded-lg flex items-center justify-center text-[#78350F] hover:text-[#DC2626] bg-[#451A03]/5 hover:bg-[#DC2626]/10 border border-[#451A03]/15 hover:border-[#DC2626]/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FEF3C7]",
          icon: "w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110",
        };
      case "suraksha":
        return {
          container: "flex items-center gap-2.5 pt-2 flex-wrap",
          item: "w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#EF4444] bg-white/[0.04] hover:bg-[#DC2626]/15 border border-white/10 hover:border-[#DC2626]/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1419]",
          icon: "w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110",
        };
      case "master":
      default:
        return {
          container: "flex items-center gap-2.5 pt-2 flex-wrap",
          item: "w-9 h-9 rounded-lg flex items-center justify-center text-[#94A3B8] hover:text-[#FAF7F2] bg-white/[0.04] hover:bg-[#D5573B]/15 border border-white/10 hover:border-[#D5573B]/40 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D5573B] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F1419]",
          icon: "w-[18px] h-[18px] transition-transform duration-200 group-hover:scale-110",
        };
    }
  };

  const currentStyles = getVariantStyles(variant);

  return (
    <div
      className={`${currentStyles.container} ${className}`}
      aria-label="Official Treel social media channels"
    >
      {OFFICIAL_SOCIAL_LINKS.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          className={`${currentStyles.item} group`}
        >
          {renderSocialIcon(link.name, iconClassName || currentStyles.icon)}
          <span className="sr-only">{link.label}</span>
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;

