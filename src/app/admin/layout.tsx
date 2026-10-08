import Link from "next/link";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  CreditCard, 
  Package, 
  FileText, 
  BookOpen, 
  Users, 
  ArrowLeft, 
  ShieldCheck,
  Bell,
  Cookie 
} from "lucide-react";
import { getAdminSession } from "@/lib/admin/admin-auth";
import { AdminLogoutButton } from "./admin-logout-button";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();

  // If unauthenticated (e.g. on /admin/login), render children directly without admin sidebar
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold font-mono">
              TR
            </div>
            <div>
              <div className="font-bold text-white text-sm tracking-wide">Treel Back-Office</div>
              <div className="text-[11px] text-slate-400 font-mono">Operations Console</div>
            </div>
          </div>

          <nav className="space-y-1 text-sm font-medium">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-emerald-400" />
              <span>Overview</span>
            </Link>

            <Link
              href="/admin/inventory"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Package className="w-4 h-4 text-purple-400" />
              <span>Products & Stock</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <ShoppingBag className="w-4 h-4 text-blue-400" />
              <span>Orders & Checkouts</span>
            </Link>

            <Link
              href="/admin/payments"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <CreditCard className="w-4 h-4 text-emerald-400" />
              <span>Payments</span>
            </Link>

            <Link
              href="/admin/blogs"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Blogs & Content</span>
            </Link>

            <Link
              href="/admin/annual-returns"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <FileText className="w-4 h-4 text-rose-400" />
              <span>Annual Returns</span>
            </Link>

            <Link
              href="/admin/notices"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Notice Board</span>
            </Link>

            <Link
              href="/admin/leads"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Leads & Inquiries</span>
            </Link>

            <Link
              href="/admin/consents"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors"
            >
              <Cookie className="w-4 h-4 text-orange-400" />
              <span>Cookie Consents</span>
            </Link>
          </nav>
        </div>

        {/* Auth status & actions */}
        <div className="pt-6 border-t border-slate-800 space-y-3">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
            <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400">
              <ShieldCheck className="w-3 h-3 text-emerald-400" /> Authenticated
            </div>
            <div className="text-xs font-mono font-bold text-emerald-400 truncate">
              {session.username}
            </div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
              Role: {session.role}
            </div>
          </div>

          <AdminLogoutButton />

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors px-3 font-mono"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Public Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
