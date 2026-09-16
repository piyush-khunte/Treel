"use client";

import Link from "next/link";
import { AlertOctagon, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ServerError({ reset }: { error?: Error & { digest?: string }; reset?: () => void }) {
  return (
    <div className="min-h-screen bg-[#0F1419] text-[#FAF7F2] font-inter selection:bg-[#D5573B]/20 selection:text-[#FAF7F2] py-24 px-6 sm:px-12 flex items-center justify-center">
      <div className="max-w-xl w-full p-8 sm:p-12 bg-white/[0.03] border border-white/[0.08] rounded-xl text-center space-y-6 shadow-2xl backdrop-blur-sm">
        <div className="flex justify-center mb-2">
        </div>
        <div className="w-16 h-16 bg-[#D5573B]/10 text-[#D5573B] rounded-lg flex items-center justify-center mx-auto border border-[#D5573B]/20">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <div className="space-y-3">
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-[#D5573B] font-semibold">
            ERROR 500
          </div>
          <h1 className="text-3xl sm:text-4xl font-fraunces font-medium text-[#FAF7F2] leading-[1.15]">
            System Encountered An Error
          </h1>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Our telemetry servers are reconciling this request. Please refresh or try again in a few moments.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center pt-2">
          {reset && (
            <Button
              onClick={() => reset()}
              variant="treel"
              className="cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 mr-2" /> Retry Request
            </Button>
          )}
          <Button asChild variant="treelOutline">
            <Link href="/">
              <Home className="w-4 h-4 mr-1.5" /> Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

