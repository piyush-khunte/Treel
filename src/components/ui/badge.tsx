import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[#0F1E19] text-[#FAF7F2]",
        secondary:
          "border-transparent bg-slate-100 text-slate-900",
        emerald:
          "border-[#00B37E]/20 bg-[#00B37E]/10 text-[#00B37E]",
        tmip:
          "border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF] font-mono",
        suraksha:
          "border-[#F59E0B]/30 bg-[#FEF3C7] text-[#B45309] font-bold uppercase",
        personal:
          "border-[#2563EB]/20 bg-[#2563EB]/10 text-[#2563EB]",
        outline: "text-slate-700 border-slate-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
