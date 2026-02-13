"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  Bell,
  CheckCheck,
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

interface Notification {
  id: string;
  type: string;
  message: string;
  postSlug: string | null;
  read: boolean;
  createdAt: string;
}

interface AdminSidebarProps {
  mobileOpen: boolean;
  collapsed: boolean;
  onMobileClose: () => void;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function AdminSidebar({
  mobileOpen,
  collapsed,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [bellOpen, setBellOpen] = useState(false);
  const [bellLoading, setBellLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Poll unread count every 30s
  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/notifications?countOnly=true");
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unreadCount);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setBellOpen(false);
      }
    }
    if (bellOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [bellOpen]);

  const openBell = async () => {
    if (bellOpen) {
      setBellOpen(false);
      return;
    }
    setBellOpen(true);
    setBellLoading(true);
    try {
      const res = await fetch("/api/admin/notifications");
      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications);
        setUnreadCount(data.unreadCount);
      }
    } catch {} finally {
      setBellLoading(false);
    }
  };

  const markAllRead = async () => {
    await fetch("/api/admin/notifications", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ markAll: true }),
    });
    setUnreadCount(0);
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (n: Notification) => {
    setBellOpen(false);
    if (n.postSlug) {
      router.push(`/admin/comments?slug=${n.postSlug}`);
    } else {
      router.push("/admin/comments");
    }
    // Mark as read
    if (!n.read) {
      fetch("/api/admin/notifications", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: n.id }),
      });
      setNotifications((prev) =>
        prev.map((item) => (item.id === n.id ? { ...item, read: true } : item))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    }
  };

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

        {/* Notification Bell */}
        <div
          ref={dropdownRef}
          className={`relative border-b border-stone-800/60 shrink-0 ${
            collapsed ? "lg:px-2 px-3" : "px-3"
          } py-2`}
        >
          <button
            onClick={openBell}
            className={`relative flex items-center gap-3 w-full rounded-xl text-sm font-sans transition-all duration-150 text-stone-400 hover:text-stone-200 hover:bg-stone-800/40
              ${collapsed ? "lg:justify-center lg:px-0 lg:py-2.5 px-3 py-2.5" : "px-3 py-2.5"}`}
          >
            <span className="relative shrink-0">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center px-1 bg-red-500 text-white text-[10px] font-bold rounded-full leading-none">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </span>
            <span
              className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                collapsed
                  ? "lg:w-0 lg:opacity-0 w-auto opacity-100"
                  : "w-auto opacity-100"
              }`}
            >
              Notifications
            </span>
          </button>

          {/* Tooltip when collapsed */}
          {collapsed && !bellOpen && (
            <div className="hidden lg:block absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-stone-800 border border-stone-700/60 text-stone-200 text-xs font-sans rounded-lg shadow-xl whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-[60]">
              Notifications
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-[5px] border-transparent border-r-stone-800" />
            </div>
          )}

          {/* Dropdown */}
          {bellOpen && (
            <div className="absolute left-full top-0 ml-2 w-80 bg-stone-900 border border-stone-700/60 rounded-xl shadow-2xl z-[70] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-stone-800/60">
                <span className="text-sm font-medium text-stone-200">Notifications</span>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllRead}
                    className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200 transition-colors"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    Mark all read
                  </button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {bellLoading ? (
                  <div className="py-8 text-center text-stone-500 text-xs">Loading...</div>
                ) : notifications.length === 0 ? (
                  <div className="py-8 text-center text-stone-500 text-xs">No notifications yet</div>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => handleNotificationClick(n)}
                      className={`w-full text-left px-4 py-3 hover:bg-stone-800/50 transition-colors border-b border-stone-800/30 last:border-0 ${
                        !n.read ? "bg-stone-800/20" : ""
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0 mt-1.5" />
                        )}
                        <div className={`flex-1 min-w-0 ${n.read ? "ml-[18px]" : ""}`}>
                          <p className="text-xs text-stone-300 leading-relaxed line-clamp-2">
                            {n.message}
                          </p>
                          <p className="text-[10px] text-stone-500 mt-1">
                            {timeAgo(n.createdAt)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
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

        {/* Footer — logout */}
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
