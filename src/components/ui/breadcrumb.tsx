import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: "corporate" | "tmip" | "suraksha" | "personal";
  className?: string;
}

const variantStyles = {
  corporate: {
    nav: "font-mono text-xs text-[#94A3B8]",
    link: "text-[#94A3B8] hover:text-[#FAF7F2] transition-colors",
    separator: "w-3.5 h-3.5 text-white/30 shrink-0",
    active: "text-[#D5573B] font-medium truncate",
  },
  tmip: {
    nav: "font-jetbrains text-xs text-[#94A3B8]",
    link: "text-[#94A3B8] hover:text-[#F1F5F9] transition-colors",
    separator: "w-3.5 h-3.5 text-white/30 shrink-0",
    active: "text-[#3B82F6] font-medium truncate",
  },
  suraksha: {
    nav: "font-rubik text-xs text-[#78350F]",
    link: "text-[#78350F] hover:text-[#DC2626] transition-colors font-medium",
    separator: "w-3.5 h-3.5 text-[#78350F]/40 shrink-0",
    active: "text-[#DC2626] font-semibold truncate",
  },
  personal: {
    nav: "font-manrope text-xs font-semibold uppercase tracking-wider text-[#6B7280]",
    link: "text-[#6B7280] hover:text-[#2563EB] transition-colors shrink-0",
    separator: "w-3.5 h-3.5 text-[#9CA3AF] shrink-0",
    active: "text-[#111827] truncate shrink-0",
  },
};

export function Breadcrumb({ items, variant = "corporate", className }: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  const styles = variantStyles[variant] || variantStyles.corporate;

  return (
    <nav aria-label="Breadcrumb" className={cn("overflow-x-auto py-1", styles.nav, className)}>
      <ol className="flex items-center gap-2 flex-wrap sm:flex-nowrap list-none p-0 m-0">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="inline-flex items-center gap-2 shrink-0">
              {index > 0 && (
                <ChevronRight className={styles.separator} aria-hidden="true" />
              )}
              {isLast || !item.href ? (
                <span aria-current="page" className={styles.active}>
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
