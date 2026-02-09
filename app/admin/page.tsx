"use client";

import { useRouter } from "next/navigation";
import {
  LogOut,
  Image,
  FileText,
  MessageSquare,
  Settings,
  LayoutDashboard,
  Camera,
  BarChart3,
  Sparkles,
  Phone,
} from "lucide-react";

export default function AdminDashboardPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-stone-950/90 backdrop-blur-md border-b border-stone-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-stone-800/60 border border-stone-700/50 flex items-center justify-center">
              <Camera className="w-5 h-5 text-stone-300" />
            </div>
            <div>
              <h1 className="text-base font-serif font-light text-stone-100 tracking-wide leading-tight">
                Nashray
              </h1>
              <p className="text-[10px] text-stone-500 uppercase tracking-[0.2em] font-sans">
                Admin
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm text-stone-400 hover:text-stone-200 hover:bg-stone-800/60 rounded-lg transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-serif font-light text-stone-100">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-stone-500">
            Manage your website content, images, and settings
          </p>
        </div>

        {/* Quick actions grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DashboardCard
            icon={<Image className="w-6 h-6" />}
            title="Hero Carousel"
            description="Update homepage hero slides, images, and captions"
            status="Coming next"
          />
          <DashboardCard
            icon={<LayoutDashboard className="w-6 h-6" />}
            title="Gallery"
            description="Add, remove, or reorder portfolio gallery images"
            status="Coming next"
          />
          <DashboardCard
            icon={<FileText className="w-6 h-6" />}
            title="Blog / Journal"
            description="Write, edit, or delete blog posts and articles"
            status="Coming next"
          />
          <DashboardCard
            icon={<MessageSquare className="w-6 h-6" />}
            title="Testimonials"
            description="Manage client reviews and ratings"
            status="Coming next"
          />
          <DashboardCard
            icon={<Sparkles className="w-6 h-6" />}
            title="Services"
            description="Edit service offerings and category pages"
            status="Coming next"
          />
          <DashboardCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Stats & Features"
            description="Update statistics counters and feature highlights"
            status="Coming next"
          />
          <DashboardCard
            icon={<Phone className="w-6 h-6" />}
            title="Contact & Settings"
            description="WhatsApp, Instagram, and site settings"
            status="Coming next"
          />
          <DashboardCard
            icon={<Settings className="w-6 h-6" />}
            title="SEO & Metadata"
            description="Page titles, descriptions, and Open Graph images"
            status="Coming next"
          />
        </div>
      </main>
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  description,
  status,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: string;
}) {
  return (
    <div className="group relative bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5 sm:p-6 hover:bg-stone-900/80 hover:border-stone-700/60 transition-all duration-200 cursor-default">
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-stone-800/60 border border-stone-700/40 flex items-center justify-center text-stone-400 group-hover:text-stone-200 shrink-0 transition-colors">
          {icon}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-stone-200 font-sans">
            {title}
          </h3>
          <p className="mt-1 text-xs text-stone-500 leading-relaxed">
            {description}
          </p>
          <span className="inline-block mt-3 text-[10px] uppercase tracking-widest text-stone-600 bg-stone-800/40 px-2 py-1 rounded-md">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}
