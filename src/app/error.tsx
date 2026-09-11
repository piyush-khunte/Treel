"use client";

import Link from "next/link";
import { AlertOctagon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ServerError({ error, reset }: { error?: Error; reset?: () => void }) {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1B2A4A] py-24 px-6 sm:px-12 flex items-center justify-center">
      <Card className="max-w-xl w-full p-8 sm:p-12 bg-white border border-rose-200 rounded-3xl text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mx-auto">
          <AlertOctagon className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-rose-500 font-bold">ERROR 500</div>
          <h1 className="text-4xl font-serif text-[#1B2A4A]">System Encountered An Error</h1>
          <p className="text-sm text-slate-600">
            Our telemetry servers are reconciling this request. Please refresh or try again in a few moments.
          </p>
        </div>

        <div className="flex gap-4 justify-center">
          {reset && (
            <Button onClick={() => reset()} variant="emerald">
              <RefreshCw className="w-4 h-4 mr-2" /> Retry Request
            </Button>
          )}
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
