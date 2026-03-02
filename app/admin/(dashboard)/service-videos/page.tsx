"use client";

import { useState, useEffect } from "react";
import {
  Video,
  Plus,
  Trash2,
  Loader2,
  Save,
  Check,
  ChevronDown,
  ChevronRight,
  Play,
  ExternalLink,
} from "lucide-react";
import ConfirmModal from "@/components/ui/ConfirmModal";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface ServiceVideo {
  id: string;
  youtubeUrl: string;
  title?: string;
}

type VideoData = Record<string, ServiceVideo[]>;

/* ------------------------------------------------------------------ */
/*  Service pages config                                               */
/* ------------------------------------------------------------------ */
const SERVICE_PAGES = [
  {
    category: "Residential",
    pages: [
      { key: "residential/luxury-villas", label: "Luxury Villas" },
      { key: "residential/apartments-penthouses", label: "Apartments & Penthouses" },
      { key: "residential/vacation-rentals", label: "Vacation Rentals" },
    ],
  },
  {
    category: "Hotels & Hospitality",
    pages: [
      { key: "hospitality/hotel-suites", label: "Hotel Suites" },
      { key: "hospitality/resorts", label: "Resorts" },
      { key: "hospitality/restaurants", label: "Restaurants" },
      { key: "hospitality/event-spaces", label: "Event Spaces" },
    ],
  },
  {
    category: "Commercial & Industry",
    pages: [
      { key: "commercial/office-spaces", label: "Office Spaces" },
      { key: "commercial/coworking-spaces", label: "Coworking Spaces" },
      { key: "commercial/retail-stores", label: "Retail Stores" },
      { key: "commercial/showrooms", label: "Showrooms" },
    ],
  },
  {
    category: "Custom Interiors",
    pages: [
      { key: "custom-interiors/architectural-elements", label: "Architectural Elements" },
      { key: "custom-interiors/custom-furniture", label: "Custom Furniture" },
      { key: "custom-interiors/design-details", label: "Design Details" },
      { key: "custom-interiors/material-closeups", label: "Material Closeups" },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  YouTube helpers                                                    */
/* ------------------------------------------------------------------ */
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/,
    /(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */
export default function ServiceVideosPage() {
  const [videoData, setVideoData] = useState<VideoData>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [deleteTarget, setDeleteTarget] = useState<{ pageKey: string; videoId: string; title: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/content?section=service-videos")
      .then((r) => r.json())
      .then((res) => {
        setVideoData(res.data || {});
        setLoading(false);
      })
      .catch(() => {
        setVideoData({});
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/content?section=service-videos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: videoData }),
      });
      if (!res.ok) throw new Error();
      setHasChanges(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const toggleCategory = (cat: string) => {
    setExpandedCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));
  };

  const addVideo = (pageKey: string) => {
    const current = videoData[pageKey] || [];
    const newVideo: ServiceVideo = {
      id: String(Date.now()),
      youtubeUrl: "",
      title: "",
    };
    setVideoData({ ...videoData, [pageKey]: [...current, newVideo] });
    setHasChanges(true);
    setSaved(false);
  };

  const updateVideo = (pageKey: string, videoId: string, field: keyof ServiceVideo, value: string) => {
    const current = videoData[pageKey] || [];
    const updated = current.map((v) => (v.id === videoId ? { ...v, [field]: value } : v));
    setVideoData({ ...videoData, [pageKey]: updated });
    setHasChanges(true);
    setSaved(false);
  };

  const removeVideo = (pageKey: string, videoId: string) => {
    const current = videoData[pageKey] || [];
    const updated = current.filter((v) => v.id !== videoId);
    setVideoData({ ...videoData, [pageKey]: updated });
    setHasChanges(true);
    setSaved(false);
    setDeleteTarget(null);
  };

  const getVideoCount = (pageKey: string) => (videoData[pageKey] || []).length;
  const getTotalCount = () => Object.values(videoData).reduce((sum, vids) => sum + vids.length, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Video className="w-6 h-6 text-stone-400" />
            <h1 className="text-2xl font-serif font-light text-stone-100">Service Videos</h1>
          </div>
          <p className="text-sm text-stone-400">
            {getTotalCount()} video{getTotalCount() !== 1 ? "s" : ""} across service pages
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
          {saving ? "Saving..." : saved ? "Saved" : "Save"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Category Groups */}
      <div className="space-y-3">
        {SERVICE_PAGES.map((group) => {
          const catExpanded = expandedCategories[group.category] !== false; // default open
          const catVideoCount = group.pages.reduce((sum, p) => sum + getVideoCount(p.key), 0);

          return (
            <div key={group.category} className="rounded-xl border border-stone-800/60 bg-stone-900/30 overflow-hidden">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(group.category)}
                className="w-full flex items-center justify-between p-4 hover:bg-stone-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {catExpanded ? (
                    <ChevronDown className="w-4 h-4 text-stone-500" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-stone-500" />
                  )}
                  <h2 className="text-sm font-medium text-stone-200">{group.category}</h2>
                  {catVideoCount > 0 && (
                    <span className="px-2 py-0.5 text-[10px] bg-stone-800 text-stone-400 rounded-full">
                      {catVideoCount} video{catVideoCount !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </button>

              {/* Pages in Category */}
              {catExpanded && (
                <div className="border-t border-stone-800/40">
                  {group.pages.map((page) => {
                    const videos = videoData[page.key] || [];
                    return (
                      <div key={page.key} className="border-b border-stone-800/30 last:border-b-0">
                        {/* Page Header */}
                        <div className="flex items-center justify-between px-5 py-3 bg-stone-900/50">
                          <div className="flex items-center gap-2">
                            <Play className="w-3.5 h-3.5 text-stone-600" />
                            <span className="text-sm text-stone-300">{page.label}</span>
                            {videos.length > 0 && (
                              <span className="text-[10px] text-stone-500">({videos.length})</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={`/${page.key.replace("/", "/").split("/")[0]}/${page.key.split("/")[1]}-photography-dubai`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 text-stone-600 hover:text-stone-400 transition-colors"
                              title="View page"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => addVideo(page.key)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-stone-400 hover:text-stone-200 bg-stone-800/60 hover:bg-stone-800 border border-stone-700/40 rounded-lg transition-colors"
                            >
                              <Plus className="w-3 h-3" /> Add Video
                            </button>
                          </div>
                        </div>

                        {/* Videos */}
                        {videos.length > 0 && (
                          <div className="px-5 py-3 space-y-3">
                            {videos.map((video) => {
                              const ytId = extractYouTubeId(video.youtubeUrl);
                              return (
                                <div
                                  key={video.id}
                                  className="flex gap-4 p-3 rounded-lg bg-stone-800/30 border border-stone-800/40"
                                >
                                  {/* Thumbnail */}
                                  <div className="relative w-32 h-20 rounded-md overflow-hidden bg-stone-800 shrink-0">
                                    {ytId ? (
                                      <img
                                        src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                                        alt=""
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center">
                                        <Video className="w-5 h-5 text-stone-600" />
                                      </div>
                                    )}
                                  </div>

                                  {/* Fields */}
                                  <div className="flex-1 space-y-2">
                                    <input
                                      type="text"
                                      value={video.youtubeUrl}
                                      onChange={(e) => updateVideo(page.key, video.id, "youtubeUrl", e.target.value)}
                                      placeholder="YouTube URL (e.g. https://youtube.com/watch?v=...)"
                                      className="w-full text-xs text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-1.5 focus:border-stone-500 focus:outline-none placeholder:text-stone-600"
                                    />
                                    <input
                                      type="text"
                                      value={video.title || ""}
                                      onChange={(e) => updateVideo(page.key, video.id, "title", e.target.value)}
                                      placeholder="Video title (optional)"
                                      className="w-full text-xs text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-1.5 focus:border-stone-500 focus:outline-none placeholder:text-stone-600"
                                    />
                                  </div>

                                  {/* Delete */}
                                  <button
                                    onClick={() => setDeleteTarget({ pageKey: page.key, videoId: video.id, title: video.title || "this video" })}
                                    className="p-1.5 text-stone-600 hover:text-red-400 transition-colors self-start shrink-0"
                                    title="Remove video"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) removeVideo(deleteTarget.pageKey, deleteTarget.videoId);
        }}
        title="Remove video?"
        message={`"${deleteTarget?.title}" will be removed from this service page.`}
        confirmLabel="Remove"
        variant="danger"
      />
    </div>
  );
}
