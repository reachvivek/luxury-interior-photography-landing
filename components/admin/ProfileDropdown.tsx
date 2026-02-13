"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function ProfileDropdown() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
    } catch {}
    router.push("/admin/login");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 rounded-full bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center hover:bg-stone-600 transition-colors ring-2 ring-stone-600/40"
      >
        A
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-44 bg-stone-900 border border-stone-700/60 rounded-xl shadow-2xl z-[70] overflow-hidden">
          <div className="px-4 py-3 border-b border-stone-800/60">
            <p className="text-xs font-medium text-stone-200">Admin</p>
            <p className="text-[10px] text-stone-500 mt-0.5">Administrator</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-stone-400 hover:text-red-400 hover:bg-stone-800/50 transition-colors disabled:opacity-50"
          >
            <LogOut className="w-3.5 h-3.5" />
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}
