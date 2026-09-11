import Link from "next/link";
import { Compass, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#1B2A4A] py-24 px-6 sm:px-12 flex items-center justify-center">
      <Card className="max-w-xl w-full p-8 sm:p-12 bg-white border border-[#E5E0D8] rounded-3xl text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 bg-emerald-50 text-[#059669] rounded-2xl flex items-center justify-center mx-auto">
          <Compass className="w-8 h-8 animate-spin" />
        </div>
        <div className="space-y-2">
          <div className="text-xs font-mono uppercase tracking-widest text-[#059669] font-bold">ERROR 404</div>
          <h1 className="text-4xl font-serif text-[#1B2A4A]">Route Not Found</h1>
          <p className="text-sm text-slate-600">
            The page you are looking for has moved or does not exist on this corridor.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <Button asChild variant="default" size="sm">
            <Link href="/"><Home className="w-4 h-4 mr-1" /> Home</Link>
          </Button>
          <Button asChild variant="tmip" size="sm">
            <Link href="/tmip">TMIP Fleet</Link>
          </Button>
          <Button asChild variant="personal" size="sm">
            <Link href="/personal">Personal</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
