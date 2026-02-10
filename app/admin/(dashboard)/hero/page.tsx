"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Image as ImageIcon,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Check,
  X,
  Loader2,
  GripVertical,
  Eye,
  Upload,
} from "lucide-react";

interface HeroSlide {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
}

export default function HeroAdminPage() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [imagePicker, setImagePicker] = useState<number | null>(null);
  const [availableImages, setAvailableImages] = useState<Record<string, string[]>>({});
  const [imageSearch, setImageSearch] = useState("");
  const [previewSlide, setPreviewSlide] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  // Fetch slides
  useEffect(() => {
    fetch("/api/admin/content?section=hero")
      .then((r) => r.json())
      .then((res) => {
        setSlides(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load hero slides");
        setLoading(false);
      });
  }, []);

  // Fetch available images (lazy, on first picker open)
  const loadImages = useCallback(() => {
    if (Object.keys(availableImages).length > 0) return;
    fetch("/api/admin/images")
      .then((r) => r.json())
      .then((res) => setAvailableImages(res.grouped || {}))
      .catch(() => {});
  }, [availableImages]);

  const updateSlide = (index: number, field: keyof HeroSlide, value: string | number) => {
    setSlides((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setHasChanges(true);
    setSaved(false);
  };

  const moveSlide = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= slides.length) return;
    setSlides((prev) => {
      const updated = [...prev];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return updated.map((s, i) => ({ ...s, id: i + 1 }));
    });
    setHasChanges(true);
    setSaved(false);
  };

  const addSlide = () => {
    const newSlide: HeroSlide = {
      id: slides.length + 1,
      category: "NEW CATEGORY",
      title: "New Slide Title",
      description: "Add a description for this slide",
      image: "/images/residential/villas/luxury-stone-villa-exterior.jpg",
      ctaText: "Explore",
      ctaLink: "/",
    };
    setSlides((prev) => [...prev, newSlide]);
    setHasChanges(true);
    setSaved(false);
  };

  const removeSlide = (index: number) => {
    if (slides.length <= 1) return;
    setSlides((prev) => prev.filter((_, i) => i !== index).map((s, i) => ({ ...s, id: i + 1 })));
    setHasChanges(true);
    setSaved(false);
  };

  const saveChanges = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/content?section=hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: slides }),
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

  const filteredImages = useCallback(() => {
    const result: Record<string, string[]> = {};
    const search = imageSearch.toLowerCase();
    for (const [cat, imgs] of Object.entries(availableImages)) {
      const filtered = imgs.filter((img) => img.toLowerCase().includes(search));
      if (filtered.length > 0) result[cat] = filtered;
    }
    return result;
  }, [availableImages, imageSearch]);

  const handleUpload = async (file: File) => {
    if (imagePicker === null) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "hero");

      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Upload failed");

      // Use the uploaded image and add it to available images
      updateSlide(imagePicker, "image", data.path);
      setAvailableImages((prev) => ({
        ...prev,
        hero: [...(prev.hero || []), data.path],
      }));
      setImagePicker(null);
      setImageSearch("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

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
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-light text-stone-100">
              Hero Slides
            </h1>
            <p className="text-xs text-stone-500">
              {slides.length} slide{slides.length !== 1 ? "s" : ""} in the homepage carousel
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={addSlide}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-300 bg-stone-800/60 border border-stone-700/50 rounded-xl hover:bg-stone-800 hover:text-stone-100 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Slide
          </button>
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
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 px-4 py-3 bg-red-950/40 border border-red-900/40 rounded-xl text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Slides list */}
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div
            key={`slide-${index}`}
            className="bg-stone-900/60 border border-stone-800/60 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image preview */}
              <div className="relative sm:w-56 lg:w-72 h-40 sm:h-auto shrink-0 bg-stone-800/40">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => {
                    setImagePicker(index);
                    loadImages();
                  }}
                  className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/50 transition-colors group"
                >
                  <span className="px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Change Image
                  </span>
                </button>
                <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center text-xs font-bold text-white">
                  {index + 1}
                </div>
              </div>

              {/* Fields */}
              <div className="flex-1 p-4 sm:p-5 space-y-3">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Category Label
                  </label>
                  <input
                    type="text"
                    value={slide.category}
                    onChange={(e) => updateSlide(index, "category", e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={slide.title}
                    onChange={(e) => updateSlide(index, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Description
                  </label>
                  <textarea
                    value={slide.description}
                    onChange={(e) => updateSlide(index, "description", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all resize-none"
                  />
                </div>

                {/* Button text & link are locked — tied to site navigation */}
                <div className="flex items-center gap-2 px-3 py-2 bg-stone-800/30 border border-stone-800/40 rounded-lg">
                  <span className="text-[10px] uppercase tracking-widest text-stone-600">Button:</span>
                  <span className="text-xs text-stone-400">{slide.ctaText}</span>
                  <span className="text-stone-700">&rarr;</span>
                  <span className="text-xs text-stone-500 font-mono">{slide.ctaLink}</span>
                </div>
              </div>

              {/* Actions sidebar */}
              <div className="flex sm:flex-col items-center justify-center gap-1 px-3 py-2 sm:py-0 border-t sm:border-t-0 sm:border-l border-stone-800/60 bg-stone-900/30">
                <button
                  onClick={() => moveSlide(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 text-stone-500 hover:text-stone-200 disabled:opacity-20 disabled:cursor-not-allowed rounded-lg hover:bg-stone-800/60 transition-all"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <div className="text-stone-600">
                  <GripVertical className="w-4 h-4" />
                </div>
                <button
                  onClick={() => moveSlide(index, "down")}
                  disabled={index === slides.length - 1}
                  className="p-1.5 text-stone-500 hover:text-stone-200 disabled:opacity-20 disabled:cursor-not-allowed rounded-lg hover:bg-stone-800/60 transition-all"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPreviewSlide(index)}
                  className="p-1.5 text-stone-500 hover:text-stone-200 rounded-lg hover:bg-stone-800/60 transition-all"
                  title="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeSlide(index)}
                  disabled={slides.length <= 1}
                  className="p-1.5 text-stone-500 hover:text-red-400 disabled:opacity-20 disabled:cursor-not-allowed rounded-lg hover:bg-red-950/40 transition-all"
                  title="Delete slide"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Picker Modal */}
      {imagePicker !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close image picker"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-default"
            onClick={() => {
              setImagePicker(null);
              setImageSearch("");
            }}
          />
          <div className="relative w-full max-w-4xl max-h-[85vh] bg-stone-900 border border-stone-700/60 rounded-2xl overflow-hidden flex flex-col">
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800/60 shrink-0">
              <div>
                <h3 className="text-sm font-semibold text-stone-200">Choose Image</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Select an image for slide {imagePicker + 1}
                </p>
              </div>
              <button
                onClick={() => {
                  setImagePicker(null);
                  setImageSearch("");
                }}
                className="p-1.5 text-stone-500 hover:text-stone-200 rounded-lg hover:bg-stone-800/60 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search */}
            <div className="px-5 py-3 border-b border-stone-800/40 shrink-0">
              <input
                type="text"
                placeholder="Search images by name or folder..."
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
                    if (file) handleUpload(file);
                    e.target.value = "";
                  }}
                />
              </label>
            </div>

            {/* Image grid */}
            <div className="flex-1 overflow-y-auto p-5">
              {Object.entries(filteredImages()).map(([category, imgs]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-3 font-medium">
                    {category.replace(/-/g, " ")}
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                    {imgs.map((img) => {
                      const isSelected = slides[imagePicker]?.image === img;
                      return (
                        <button
                          key={img}
                          onClick={() => {
                            updateSlide(imagePicker, "image", img);
                            setImagePicker(null);
                            setImageSearch("");
                          }}
                          className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all hover:opacity-90
                            ${
                              isSelected
                                ? "border-stone-300 ring-2 ring-stone-400/30"
                                : "border-transparent hover:border-stone-600"
                            }`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                              <Check className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {Object.keys(filteredImages()).length === 0 && (
                <p className="text-center text-sm text-stone-500 py-10">
                  No images found
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewSlide !== null && slides[previewSlide] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close preview"
            className="absolute inset-0 bg-black/80 cursor-default"
            onClick={() => setPreviewSlide(null)}
          />
          <div className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={slides[previewSlide].image}
              alt={slides[previewSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
            <div className="absolute inset-0 flex items-center justify-center text-center px-8">
              <div>
                <p className="text-white text-xs tracking-[0.3em] uppercase mb-4 opacity-80">
                  {slides[previewSlide].category}
                </p>
                <h2 className="text-3xl sm:text-5xl font-serif font-normal text-white mb-4">
                  {slides[previewSlide].title}
                </h2>
                <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-6 font-light">
                  {slides[previewSlide].description}
                </p>
                <span className="inline-block px-6 py-2.5 border-2 border-white/90 text-white text-xs tracking-widest uppercase rounded-full">
                  {slides[previewSlide].ctaText}
                </span>
              </div>
            </div>
            <button
              onClick={() => setPreviewSlide(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 backdrop-blur-sm rounded-full text-white/80 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
