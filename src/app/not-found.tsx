import Link from "next/link";
import { Compass, Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] font-inter selection:bg-[#D5573B]/20 selection:text-[#FAF7F2] py-24 px-6 sm:px-12 flex items-center justify-center">
      <div className="max-w-xl w-full p-8 sm:p-12 bg-white/[0.03] border border-white/[0.08] rounded-xl text-center space-y-6 shadow-2xl backdrop-blur-sm">
        <div className="flex justify-center mb-2">
        </div>
        <div className="w-16 h-16 bg-[#D5573B]/10 text-[#D5573B] rounded-lg flex items-center justify-center mx-auto border border-[#D5573B]/20">
          <Compass className="w-8 h-8 animate-spin" />
        </div>
        <div className="space-y-3">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
            ERROR 404
          </div>
          <h1 className="text-3xl sm:text-4xl font-fraunces font-medium text-[#FAF7F2] leading-[1.15]">
            Route Not Found
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            The page or corridor you requested has moved or is not active on treel.in.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <Button asChild variant="treel" className="w-full justify-center">
            <Link href="/">
              <Home className="w-4 h-4 mr-1.5" /> Home
            </Link>
          </Button>
          <Button asChild variant="treelOutline" className="w-full justify-center">
            <Link href="/products">
              Products
            </Link>
          </Button>
          <Button asChild variant="ghost" className="w-full justify-center text-[#94A3B8] hover:text-[#FAF7F2] hover:bg-white/[0.05]">
            <Link href="/contact">
              Contact
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

