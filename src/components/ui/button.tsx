import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#0F1E19] text-[#FAF7F2] hover:bg-[#14532D] shadow-sm hover:shadow-md",
        emerald:
          "bg-[#00B37E] text-white hover:bg-[#009668] shadow-sm hover:shadow-md",
        treel:
          "bg-[#D5573B] text-[#FAF7F2] font-semibold hover:bg-[#C2492F] shadow-sm hover:shadow-md",
        treelOutline:
          "border border-[#94A3B8]/30 bg-transparent text-[#FAF7F2] hover:border-[#D5573B] hover:text-[#D5573B] hover:bg-[#D5573B]/10",
        tmip:
          "bg-[#00E5FF] text-[#0A0F1A] font-semibold hover:bg-[#00C2D6] hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]",
        tmipOutline:
          "border border-[#00E5FF]/40 text-[#00E5FF] hover:bg-[#00E5FF]/10",
        suraksha:
          "bg-[#F59E0B] text-[#18181B] font-bold hover:bg-[#D97706] shadow-md hover:shadow-lg uppercase tracking-wide",
        surakshaCrimson:
          "bg-[#EF4444] text-white font-bold hover:bg-[#DC2626] shadow-md uppercase tracking-wide",
        personal:
          "bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] shadow-sm hover:shadow-md",
        outline:
          "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-900",
        ghost:
          "hover:bg-slate-100 text-slate-700 hover:text-slate-900",
        link:
          "text-[#00B37E] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-9 rounded-md px-3.5 text-xs",
        lg: "h-13 rounded-xl px-8 text-base font-semibold",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
