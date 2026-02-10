"use client";

import { Sparkles } from "lucide-react";

export default function ServicesAdminPage() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-stone-800/60 border border-stone-700/40 flex items-center justify-center text-stone-400">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-light text-stone-100">
            Services
          </h1>
          <p className="text-xs text-stone-500">Manage service offerings and process steps</p>
        </div>
      </div>
      <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-8 text-center">
        <p className="text-sm text-stone-500">Services editor — coming soon...</p>
      </div>
    </div>
  );
}
