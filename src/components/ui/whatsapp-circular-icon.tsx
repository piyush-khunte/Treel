import React from "react";
import Link from "next/link";

export interface WhatsAppCircularIconProps {
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  title?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

export function WhatsAppCircularIcon({
  href = "/suraksha/whatsapp",
  size = "md",
  className = "",
  title = "Chat on WhatsApp",
  ariaLabel = "Chat on WhatsApp",
  target,
  rel,
}: WhatsAppCircularIconProps) {
  const sizeClasses = {
    sm: "w-9 h-9",
    md: "w-11 h-11",
    lg: "w-12 h-12",
  }[size];

  const svgSizeClasses = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-6 h-6",
  }[size];

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={`rounded-full bg-[#25D366] hover:bg-[#1EBE5D] flex items-center justify-center text-white shadow-md transition-all hover:scale-105 active:scale-95 shrink-0 ${sizeClasses} ${className}`}
      title={title}
      aria-label={ariaLabel}
    >
      <svg
        className={`${svgSizeClasses} fill-white`}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.1-.476-.15-.677.15-.2.301-.777.978-.953 1.179-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.798-1.5-1.784-1.675-2.085-.176-.301-.019-.464.132-.614.135-.135.301-.351.451-.527.15-.176.201-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.677-1.631-.928-2.233-.244-.585-.492-.505-.677-.515-.176-.01-.376-.01-.577-.01-.2 0-.526.075-.802.376-.276.301-1.053 1.029-1.053 2.509 0 1.48 1.078 2.909 1.229 3.109.15.2 2.122 3.24 5.141 4.544.718.31 1.279.495 1.716.634.721.23 1.378.197 1.897.12.578-.087 1.78-.727 2.031-1.43.25-.703.25-1.305.176-1.43-.075-.125-.276-.201-.577-.351zM12.04 21.786h-.005a9.832 9.832 0 0 1-5.01-1.377l-.36-.214-3.725.976.994-3.63-.235-.374a9.858 9.858 0 0 1-1.512-5.263c0-5.446 4.435-9.879 9.886-9.879 2.639 0 5.118 1.028 6.982 2.894a9.824 9.824 0 0 1 2.891 6.985c0 5.448-4.434 9.882-9.886 9.882zm0-18.286c-4.636 0-8.406 3.768-8.406 8.404a8.38 8.38 0 0 0 1.29 4.474l.199.317-.588 2.148 2.2-.577.308.183a8.356 8.356 0 0 0 4.997 1.459h.004c4.636 0 8.406-3.769 8.406-8.405a8.344 8.344 0 0 0-2.463-5.942 8.345 8.345 0 0 0-5.947-2.461z" />
      </svg>
    </Link>
  );
}

export default WhatsAppCircularIcon;
