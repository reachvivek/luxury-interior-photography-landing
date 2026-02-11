"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BarChart3,
  Save,
  Loader2,
  Check,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Hash,
  Award,
} from "lucide-react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

interface FeatureItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export default function StatsAdminPage() {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [features, setFeatures] = useState<FeatureItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/content?section=stats").then((r) => r.json()),
      fetch("/api/admin/content?section=features").then((r) => r.json()),
    ])
      .then(([statsRes, featuresRes]) => {
        setStats(statsRes.data || []);
        setFeatures(featuresRes.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, []);

  const markChanged = useCallback(() => {
    setHasChanges(true);
    setSaved(false);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const [r1, r2] = await Promise.all([
        fetch("/api/admin/content?section=stats", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: stats }),
        }),
        fetch("/api/admin/content?section=features", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data: features }),
        }),
      ]);
      if (!r1.ok || !r2.ok) throw new Error("Save failed");
      setHasChanges(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  // Stats helpers
  const updateStat = (i: number, field: keyof StatItem, value: string | number) => {
    const next = [...stats];
    next[i] = { ...next[i], [field]: field === "value" ? Number(value) || 0 : value };
    setStats(next);
    markChanged();
  };

  const moveStat = (i: number, dir: -1 | 1) => {
    const t = i + dir;
    if (t < 0 || t >= stats.length) return;
    const next = [...stats];
    [next[i], next[t]] = [next[t], next[i]];
    setStats(next);
    markChanged();
  };

  // Features helpers
  const updateFeature = (i: number, field: keyof FeatureItem, value: string) => {
    const next = [...features];
    next[i] = { ...next[i], [field]: value };
    setFeatures(next);
    markChanged();
  };

  const moveFeature = (i: number, dir: -1 | 1) => {
    const t = i + dir;
    if (t < 0 || t >= features.length) return;
    const next = [...features];
    [next[i], next[t]] = [next[t], next[i]];
    setFeatures(next);
    markChanged();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <BarChart3 className="w-6 h-6 text-stone-400" />
            <h1 className="text-2xl font-serif font-light text-stone-100">
              Stats & Features
            </h1>
          </div>
          <p className="text-sm text-stone-400">
            Manage homepage statistics and "Why Choose Us" features
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            saved
              ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/40"
              : hasChanges
              ? "bg-white text-stone-900 hover:bg-stone-100"
              : "bg-stone-800 text-stone-500 border border-stone-700/40 cursor-not-allowed"
          }`}
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : saved ? (
            <Check className="w-4 h-4" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Stats Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 text-stone-500" />
            <h2 className="text-lg font-serif font-light text-stone-200">
              Statistics
            </h2>
            <span className="text-xs text-stone-600 ml-2">
              {stats.length} items
            </span>
          </div>
          <button
            onClick={() => {
              setStats([...stats, { label: "", value: 0, suffix: "+" }]);
              markChanged();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 border border-stone-700/40 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Stat
          </button>
        </div>

        <div className="space-y-3">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-stone-800/60 bg-stone-900/30 p-4"
            >
              <div className="flex items-center gap-4">
                {/* Preview */}
                <div className="w-20 h-16 shrink-0 rounded-lg bg-stone-800/50 border border-stone-700/30 flex flex-col items-center justify-center">
                  <span className="text-lg font-light text-stone-100">
                    {stat.value}
                    {stat.suffix}
                  </span>
                </div>

                {/* Fields */}
                <div className="flex-1 grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(idx, "label", e.target.value)}
                      className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">
                      Value
                    </label>
                    <input
                      type="number"
                      value={stat.value}
                      onChange={(e) => updateStat(idx, "value", e.target.value)}
                      className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">
                      Suffix
                    </label>
                    <input
                      type="text"
                      value={stat.suffix}
                      onChange={(e) =>
                        updateStat(idx, "suffix", e.target.value)
                      }
                      placeholder="+ or %"
                      className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => moveStat(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 text-stone-600 hover:text-stone-300 disabled:opacity-30 transition-colors"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveStat(idx, 1)}
                    disabled={idx === stats.length - 1}
                    className="p-1.5 text-stone-600 hover:text-stone-300 disabled:opacity-30 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setStats(stats.filter((_, i) => i !== idx));
                      markChanged();
                    }}
                    className="p-1.5 text-stone-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-stone-500" />
            <h2 className="text-lg font-serif font-light text-stone-200">
              Why Choose Us
            </h2>
            <span className="text-xs text-stone-600 ml-2">
              {features.length} items
            </span>
          </div>
          <button
            onClick={() => {
              const num = String(features.length + 1).padStart(2, "0");
              setFeatures([
                ...features,
                { id: `feat-${Date.now()}`, number: num, title: "", description: "" },
              ]);
              markChanged();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 border border-stone-700/40 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Feature
          </button>
        </div>

        <div className="space-y-3">
          {features.map((feat, idx) => (
            <div
              key={feat.id}
              className="rounded-xl border border-stone-800/60 bg-stone-900/30 p-4"
            >
              <div className="flex items-start gap-4">
                {/* Number badge */}
                <div className="w-10 h-10 shrink-0 rounded-lg bg-stone-800/50 border border-stone-700/30 flex items-center justify-center">
                  <input
                    type="text"
                    value={feat.number}
                    onChange={(e) =>
                      updateFeature(idx, "number", e.target.value)
                    }
                    className="w-full text-center text-sm font-medium text-stone-300 bg-transparent focus:outline-none"
                    maxLength={3}
                  />
                </div>

                {/* Fields */}
                <div className="flex-1 space-y-3">
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">
                      Title
                    </label>
                    <input
                      type="text"
                      value={feat.title}
                      onChange={(e) =>
                        updateFeature(idx, "title", e.target.value)
                      }
                      className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-stone-500 mb-1 block">
                      Description
                    </label>
                    <textarea
                      value={feat.description}
                      onChange={(e) =>
                        updateFeature(idx, "description", e.target.value)
                      }
                      rows={2}
                      className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-y"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    onClick={() => moveFeature(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 text-stone-600 hover:text-stone-300 disabled:opacity-30 transition-colors"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveFeature(idx, 1)}
                    disabled={idx === features.length - 1}
                    className="p-1.5 text-stone-600 hover:text-stone-300 disabled:opacity-30 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      setFeatures(features.filter((_, i) => i !== idx));
                      markChanged();
                    }}
                    className="p-1.5 text-stone-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
