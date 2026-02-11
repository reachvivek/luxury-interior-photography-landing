"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Save,
  Loader2,
  Check,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Star,
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
  rating: number;
}

export default function TestimonialsAdminPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/content?section=testimonials")
      .then((r) => r.json())
      .then((res) => { setItems(res.data || []); setLoading(false); })
      .catch(() => { setError("Failed to load testimonials"); setLoading(false); });
  }, []);

  const markChanged = useCallback(() => { setHasChanges(true); setSaved(false); }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/content?section=testimonials", {
        method: "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: items }),
      });
      if (!res.ok) throw new Error("Save failed");
      setHasChanges(false); setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch { setError("Failed to save"); } finally { setSaving(false); }
  };

  const update = (i: number, field: keyof Testimonial, value: string | number) => {
    const next = [...items]; next[i] = { ...next[i], [field]: value }; setItems(next); markChanged();
  };

  const move = (i: number, dir: -1 | 1) => {
    const t = i + dir; if (t < 0 || t >= items.length) return;
    const next = [...items]; [next[i], next[t]] = [next[t], next[i]]; setItems(next); markChanged();
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-stone-400" /></div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <MessageSquare className="w-6 h-6 text-stone-400" />
            <h1 className="text-2xl font-serif font-light text-stone-100">Testimonials</h1>
          </div>
          <p className="text-sm text-stone-400">{items.length} testimonials</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => { setItems([...items, { id: `test-${Date.now()}`, name: "", role: "", company: "", quote: "", image: "", rating: 5 }]); markChanged(); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 border border-stone-700/40 transition-colors">
            <Plus className="w-4 h-4" /> Add
          </button>
          <button onClick={handleSave} disabled={saving || !hasChanges}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${saved ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/40" : hasChanges ? "bg-white text-stone-900 hover:bg-stone-100" : "bg-stone-800 text-stone-500 border border-stone-700/40 cursor-not-allowed"}`}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {error && <div className="mb-4 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">{error}</div>}

      <div className="space-y-4">
        {items.map((item, idx) => (
          <div key={item.id} className="rounded-xl border border-stone-800/60 bg-stone-900/30 p-5">
            <div className="flex flex-col md:flex-row gap-5">
              {/* Avatar + Rating */}
              <div className="flex md:flex-col items-center gap-3 md:w-24 shrink-0">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border border-stone-700/40 bg-stone-800/50">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-stone-600 text-xl font-serif">{item.name?.charAt(0) || "?"}</div>
                  )}
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => update(idx, "rating", star)} className="transition-colors">
                      <Star className={`w-3.5 h-3.5 ${star <= item.rating ? "text-amber-400 fill-amber-400" : "text-stone-700"}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Fields */}
              <div className="flex-1 space-y-3">
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">Name</label>
                    <input type="text" value={item.name} onChange={(e) => update(idx, "name", e.target.value)} className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">Role</label>
                    <input type="text" value={item.role} onChange={(e) => update(idx, "role", e.target.value)} className="w-full text-sm text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none" />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">Company</label>
                    <input type="text" value={item.company} onChange={(e) => update(idx, "company", e.target.value)} className="w-full text-sm text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-stone-500 mb-1 block">Quote</label>
                  <textarea value={item.quote} onChange={(e) => update(idx, "quote", e.target.value)} rows={3} className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-y" />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-stone-500 shrink-0">Avatar URL</label>
                  <input type="text" value={item.image} onChange={(e) => update(idx, "image", e.target.value)} placeholder="https://..." className="flex-1 text-xs text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-1.5 focus:border-stone-500 focus:outline-none" />
                </div>
              </div>

              {/* Actions */}
              <div className="flex md:flex-col gap-1 shrink-0">
                <button onClick={() => move(idx, -1)} disabled={idx === 0} className="p-1.5 text-stone-600 hover:text-stone-300 disabled:opacity-30 transition-colors"><ChevronUp className="w-4 h-4" /></button>
                <button onClick={() => move(idx, 1)} disabled={idx === items.length - 1} className="p-1.5 text-stone-600 hover:text-stone-300 disabled:opacity-30 transition-colors"><ChevronDown className="w-4 h-4" /></button>
                <button onClick={() => { setItems(items.filter((_, i) => i !== idx)); markChanged(); }} className="p-1.5 text-stone-600 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
