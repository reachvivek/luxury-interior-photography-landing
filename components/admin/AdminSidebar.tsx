"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Image,
  Images,
  FolderOpen,
  FileText,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
  X,
  Camera,
  Briefcase,
  Activity,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: <LayoutDashboard className="w-5 h-5" /> },
  { label: "Hero Slides", href: "/admin/hero", icon: <Image className="w-5 h-5" /> },
  { label: "Services Page", href: "/admin/services-page", icon: <Briefcase className="w-5 h-5" /> },
  { label: "Gallery", href: "/admin/gallery", icon: <Images className="w-5 h-5" /> },
  { label: "Portfolio", href: "/admin/portfolio", icon: <FolderOpen className="w-5 h-5" /> },
  { label: "Blog / Journal", href: "/admin/blog", icon: <FileText className="w-5 h-5" /> },
  { label: "Testimonials", href: "/admin/testimonials", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "Comments", href: "/admin/comments", icon: <MessageSquare className="w-5 h-5" /> },
  { label: "Stats & Features", href: "/admin/stats", icon: <BarChart3 className="w-5 h-5" /> },
  { label: "Analytics", href: "/admin/analytics", icon: <Activity className="w-5 h-5" /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings className="w-5 h-5" /> },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  collapsed: boolean;
  onMobileClose: () => void;
}

export default function AdminSidebar({
  mobileOpen,
  collapsed,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleNavClick = (href: string) => {
    router.push(href);
    onMobileClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden cursor-default"
          onClick={onMobileClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full bg-stone-950 border-r border-stone-800/60 flex flex-col transition-all duration-300 ease-in-out
          lg:static lg:z-auto
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          ${collapsed ? "lg:w-[72px]" : "lg:w-64"}
          w-64`}
      >
        {/* Brand */}
        <div
          className={`flex items-center h-16 border-b border-stone-800/60 shrink-0 ${
            collapsed ? "lg:justify-center lg:px-0 px-5" : "px-5"
          }`}
        >
          <div
            className={`flex items-center gap-3 ${
              collapsed ? "lg:gap-0" : ""
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-stone-800/60 border border-stone-700/50 flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4 text-stone-300" />
            </div>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                collapsed
                  ? "lg:w-0 lg:opacity-0 w-auto opacity-100"
                  : "w-auto opacity-100"
              }`}
            >
              <p className="text-sm font-serif font-light text-stone-100 tracking-wide leading-tight whitespace-nowrap">
                MyVisual.Space
              </p>
              <p className="text-[9px] text-stone-500 uppercase tracking-[0.2em] font-sans whitespace-nowrap">
                Admin
              </p>
            </div>
          </div>

          {/* Mobile close */}
          <button
            onClick={onMobileClose}
            className="lg:hidden ml-auto p-1.5 text-stone-500 hover:text-stone-300 rounded-lg hover:bg-stone-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav
          className={`flex-1 overflow-y-auto py-4 space-y-1 ${
            collapsed ? "lg:px-2 px-3" : "px-3"
          }`}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <div key={item.href} className="relative group">
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`flex items-center gap-3 rounded-xl text-sm font-sans transition-all duration-150
                    ${collapsed ? "lg:justify-center lg:px-0 lg:py-2.5 px-3 py-2.5" : "px-3 py-2.5"}
                    ${
                      active
                        ? "bg-stone-800/80 text-stone-100 font-medium"
                        : "text-stone-400 hover:text-stone-200 hover:bg-stone-800/40"
                    }`}
                >
                  <span
                    className={`shrink-0 ${
                      active ? "text-stone-200" : "text-stone-500"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                      collapsed
                        ? "lg:w-0 lg:opacity-0 w-auto opacity-100"
                        : "w-auto opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </a>

                {/* Tooltip — only visible when collapsed on desktop */}
                {collapsed && (
                  <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-stone-800 border border-stone-700/60 text-stone-200 text-xs font-sans rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-[60]">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-stone-800" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer — collapse toggle + logout */}
        <div
          className={`py-3 border-t border-stone-800/60 shrink-0 space-y-1 ${
            collapsed ? "lg:px-2 px-3" : "px-3"
          }`}
        >
          {/* Logout */}
          <div className="relative group">
            <button
              onClick={handleLogout}
              className={`flex items-center gap-3 w-full rounded-xl text-sm text-stone-500 hover:text-red-400 hover:bg-stone-800/40 font-sans transition-all duration-150
                ${collapsed ? "lg:justify-center lg:px-0 lg:py-2.5 px-3 py-2.5" : "px-3 py-2.5"}`}
            >
              <LogOut className="w-5 h-5 shrink-0" />
              <span
                className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                  collapsed
                    ? "lg:w-0 lg:opacity-0 w-auto opacity-100"
                    : "w-auto opacity-100"
                }`}
              >
                Sign Out
              </span>
            </button>

            {/* Tooltip for logout when collapsed */}
            {collapsed && (
              <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-stone-800 border border-stone-700/60 text-red-400 text-xs font-sans rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-[60]">
                Sign Out
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-stone-800" />
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
