"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Images,
  Save,
  Plus,
  Trash2,
  Check,
  X,
  Loader2,
  Upload,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface GalleryData {
  row1: string[];
  row2: string[];
}

type RowKey = "row1" | "row2";

export default function GalleryAdminPage() {
  const [gallery, setGallery] = useState<GalleryData>({ row1: [], row2: [] });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  // Image picker
  const [pickerRow, setPickerRow] = useState<RowKey | null>(null);
  const [availableImages, setAvailableImages] = useState<Record<string, string[]>>({});
  const [imageSearch, setImageSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=gallery")
      .then((r) => r.json())
      .then((res) => {
        setGallery(res.data || { row1: [], row2: [] });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load gallery");
        setLoading(false);
      });
  }, []);

  const loadImages = useCallback(() => {
    if (Object.keys(availableImages).length > 0) return;
    fetch("/api/admin/images")
      .then((r) => r.json())
      .then((res) => setAvailableImages(res.grouped || {}))
      .catch(() => {});
  }, [availableImages]);

  const markChanged = () => {
    setHasChanges(true);
    setSaved(false);
  };

  const removeImage = (row: RowKey, index: number) => {
    setGallery((prev) => ({
      ...prev,
      [row]: prev[row].filter((_, i) => i !== index),
    }));
    markChanged();
  };

  const moveImage = (row: RowKey, index: number, direction: "left" | "right") => {
    const newIndex = direction === "left" ? index - 1 : index + 1;
    setGallery((prev) => {
      const arr = [...prev[row]];
      if (newIndex < 0 || newIndex >= arr.length) return prev;
      [arr[index], arr[newIndex]] = [arr[newIndex], arr[index]];
      return { ...prev, [row]: arr };
    });
    markChanged();
  };

  const addImageToRow = (row: RowKey, imagePath: string) => {
    setGallery((prev) => ({
      ...prev,
      [row]: [...prev[row], imagePath],
    }));
    markChanged();
  };

  const saveChanges = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/content?section=gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: gallery }),
      });
      if (!res.ok) throw new Error("Save failed");
      setSaved(true);
      setHasChanges(false);
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleUpload = async (file: File, row: RowKey) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "gallery");

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");

      addImageToRow(row, data.path);
      setAvailableImages((prev) => ({
        ...prev,
        gallery: [...(prev.gallery || []), data.path],
      }));
      setPickerRow(null);
      setImageSearch("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const filteredImages = useCallback(() => {
    const result: Record<string, string[]> = {};
    const search = imageSearch.toLowerCase();
    // Get all images currently used in both rows
    const usedImages = new Set([...gallery.row1, ...gallery.row2]);
    for (const [cat, imgs] of Object.entries(availableImages)) {
      const filtered = imgs.filter(
        (img) => img.toLowerCase().includes(search) && !usedImages.has(img)
      );
      if (filtered.length > 0) result[cat] = filtered;
    }
    return result;
  }, [availableImages, imageSearch, gallery]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 text-stone-500 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-stone-800/60 border border-stone-700/40 flex items-center justify-center text-stone-400">
            <Images className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-light text-stone-100">
              Gallery
            </h1>
            <p className="text-xs text-stone-500">
              {gallery.row1.length + gallery.row2.length} images across 2 scrolling rows
            </p>
          </div>
        </div>

        <button
          onClick={saveChanges}
          disabled={saving || !hasChanges}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl transition-all
            ${
              saved
                ? "bg-green-900/40 border border-green-700/50 text-green-300"
                : hasChanges
                ? "bg-stone-100 text-stone-900 hover:bg-white"
                : "bg-stone-800/40 border border-stone-700/40 text-stone-600 cursor-not-allowed"
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
        <div className="mb-4 px-4 py-3 bg-red-950/40 border border-red-900/40 rounded-xl text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Row 1 */}
      <GalleryRow
        label="Row 1 — Scrolls Left"
        rowKey="row1"
        images={gallery.row1}
        onRemove={(i) => removeImage("row1", i)}
        onMove={(i, d) => moveImage("row1", i, d)}
        onAdd={() => {
          setPickerRow("row1");
          loadImages();
        }}
      />

      {/* Row 2 */}
      <GalleryRow
        label="Row 2 — Scrolls Right"
        rowKey="row2"
        images={gallery.row2}
        onRemove={(i) => removeImage("row2", i)}
        onMove={(i, d) => moveImage("row2", i, d)}
        onAdd={() => {
          setPickerRow("row2");
          loadImages();
        }}
      />

      {/* Image Picker Modal */}
      {pickerRow !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close image picker"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
            onClick={() => {
              setPickerRow(null);
              setImageSearch("");
            }}
          />
          <div className="relative w-full max-w-4xl max-h-[85vh] bg-stone-900 border border-stone-700/60 rounded-2xl overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800/60 shrink-0">
              <div>
                <h3 className="text-sm font-semibold text-stone-200">Add Image</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Add to {pickerRow === "row1" ? "Row 1" : "Row 2"} — already-used images are hidden
                </p>
              </div>
              <button
                onClick={() => {
                  setPickerRow(null);
                  setImageSearch("");
                }}
                className="p-1.5 text-stone-500 hover:text-stone-200 rounded-lg hover:bg-stone-800/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 py-3 border-b border-stone-800/40 shrink-0">
              <input
                type="text"
                placeholder="Search images..."
                value={imageSearch}
                onChange={(e) => setImageSearch(e.target.value)}
                autoFocus
                className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600"
              />
            </div>

            {/* Upload zone */}
            <div className="px-5 pt-4">
              <label
                className={`flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed rounded-xl cursor-pointer transition-all
                  ${uploading ? "border-stone-600 bg-stone-800/30" : "border-stone-700/50 hover:border-stone-500 hover:bg-stone-800/20"}`}
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-5 h-5 text-stone-400 animate-spin" />
                    <span className="text-xs text-stone-400">Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-stone-500" />
                    <span className="text-xs text-stone-400">
                      Drop an image here or <span className="text-stone-200 underline">browse</span>
                    </span>
                    <span className="text-[10px] text-stone-600">JPG, PNG, WebP up to 10MB</span>
                  </>
                )}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/avif"
                  className="hidden"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && pickerRow) handleUpload(file, pickerRow);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            <div className="flex-1 overflow-y-auto p-5">
              {Object.entries(filteredImages()).map(([category, imgs]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-3 font-medium">
                    {category.replaceAll("-", " ")}
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                    {imgs.map((img) => (
                      <button
                        key={img}
                        onClick={() => {
                          if (pickerRow) addImageToRow(pickerRow, img);
                          setPickerRow(null);
                          setImageSearch("");
                        }}
                        className="relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-transparent hover:border-stone-500 transition-all hover:opacity-90"
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              {Object.keys(filteredImages()).length === 0 && (
                <p className="text-center text-sm text-stone-500 py-10">
                  No unused images found — try uploading a new one
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Gallery Row Component ─── */

function GalleryRow({
  label,
  rowKey,
  images,
  onRemove,
  onMove,
  onAdd,
}: {
  label: string;
  rowKey: string;
  images: string[];
  onRemove: (index: number) => void;
  onMove: (index: number, direction: "left" | "right") => void;
  onAdd: () => void;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-stone-200">{label}</h2>
          <p className="text-xs text-stone-500">{images.length} images</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-300 bg-stone-800/60 border border-stone-700/50 rounded-lg hover:bg-stone-800 hover:text-stone-100 transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          Add
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
        {images.map((img, index) => (
          <div
            key={`${rowKey}-${index}`}
            className="group relative aspect-[4/3] rounded-xl overflow-hidden bg-stone-800/40 border border-stone-800/60"
          >
            <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />

            {/* Hover overlay with actions */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center gap-1 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => onMove(index, "left")}
                disabled={index === 0}
                className="p-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-white/80 hover:text-white disabled:opacity-30 transition-all"
                title="Move left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onRemove(index)}
                className="p-1.5 bg-red-900/60 backdrop-blur-sm rounded-lg text-red-300 hover:text-red-200 hover:bg-red-900/80 transition-all"
                title="Remove"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onMove(index, "right")}
                disabled={index === images.length - 1}
                className="p-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-white/80 hover:text-white disabled:opacity-30 transition-all"
                title="Move right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Index badge */}
            <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded bg-black/50 backdrop-blur-sm flex items-center justify-center text-[9px] font-bold text-white/70">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <div className="flex items-center justify-center py-10 border-2 border-dashed border-stone-800/60 rounded-xl">
          <p className="text-sm text-stone-600">No images — click Add to get started</p>
        </div>
      )}
    </div>
  );
}
