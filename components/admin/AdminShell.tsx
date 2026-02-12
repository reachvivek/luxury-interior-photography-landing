"use client";

import { useState, useEffect } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const COLLAPSE_KEY = "admin_sidebar_collapsed";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(COLLAPSE_KEY);
    if (stored === "true") setCollapsed(true);
    setMounted(true);
  }, []);

  const toggleCollapse = () => {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem(COLLAPSE_KEY, String(next));
  };

  // Prevent layout flash before hydration
  if (!mounted) {
    return (
      <div className="flex h-screen overflow-hidden">
        <div className="hidden lg:block w-64 bg-stone-950 border-r border-stone-800/60 shrink-0" />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <header className="lg:hidden flex items-center h-14 px-4 border-b border-stone-800/60 bg-stone-950/90 shrink-0" />
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden relative">
      <AdminSidebar
        mobileOpen={mobileOpen}
        collapsed={collapsed}
        onMobileClose={() => setMobileOpen(false)}
      />

      {/* Floating collapse/expand toggle — sits on the sidebar edge, 50/50 */}
      <button
        onClick={toggleCollapse}
        className={`hidden lg:flex items-center justify-center absolute top-[45px] z-30 w-7 h-7 rounded-full bg-stone-800 border border-stone-700/60 text-stone-400 hover:text-stone-100 hover:bg-stone-700 shadow-lg transition-all duration-300 ease-in-out
          ${collapsed ? "left-[54px]" : "left-[238px]"}`}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-3.5 h-3.5" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5" />
        )}
      </button>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile top bar */}
        <header className="lg:hidden flex items-center h-14 px-4 border-b border-stone-800/60 bg-stone-950/90 backdrop-blur-md shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 -ml-2 text-stone-400 hover:text-stone-200 rounded-lg hover:bg-stone-800/60 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <span className="ml-3 text-sm font-serif text-stone-200 tracking-wide">
            MyVisual.Space Admin
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
