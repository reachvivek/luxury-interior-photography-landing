"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Briefcase,
  Save,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
  Check,
  X,
  Loader2,
  Upload,
} from "lucide-react";

interface ServiceItem {
  title: string;
  description: string;
  features: string[];
  image: string;
  href: string;
}

interface ServicesPageData {
  hero: { title: string; subtitle: string };
  services: ServiceItem[];
  cta: { title: string; description: string; buttonText: string; buttonHref: string };
}

const DEFAULT_DATA: ServicesPageData = {
  hero: { title: "Our Services", subtitle: "" },
  services: [],
  cta: { title: "Ready to get started?", description: "", buttonText: "Contact Us", buttonHref: "/contact" },
};

export default function ServicesPageAdmin() {
  const [data, setData] = useState<ServicesPageData>(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [hasChanges, setHasChanges] = useState(false);
  const [imagePicker, setImagePicker] = useState<number | null>(null);
  const [availableImages, setAvailableImages] = useState<Record<string, string[]>>({});
  const [imageSearch, setImageSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=services-page")
      .then((r) => r.json())
      .then((res) => {
        if (res.data) setData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load services page data");
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

  const updateHero = (field: "title" | "subtitle", value: string) => {
    setData((prev) => ({ ...prev, hero: { ...prev.hero, [field]: value } }));
    markChanged();
  };

  const updateCta = (field: keyof ServicesPageData["cta"], value: string) => {
    setData((prev) => ({ ...prev, cta: { ...prev.cta, [field]: value } }));
    markChanged();
  };

  const updateService = (index: number, field: keyof ServiceItem, value: string | string[]) => {
    setData((prev) => {
      const updated = [...prev.services];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, services: updated };
    });
    markChanged();
  };

  const updateFeature = (serviceIndex: number, featureIndex: number, value: string) => {
    setData((prev) => {
      const updated = [...prev.services];
      const features = [...updated[serviceIndex].features];
      features[featureIndex] = value;
      updated[serviceIndex] = { ...updated[serviceIndex], features };
      return { ...prev, services: updated };
    });
    markChanged();
  };

  const addFeature = (serviceIndex: number) => {
    setData((prev) => {
      const updated = [...prev.services];
      updated[serviceIndex] = {
        ...updated[serviceIndex],
        features: [...updated[serviceIndex].features, "New feature"],
      };
      return { ...prev, services: updated };
    });
    markChanged();
  };

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    setData((prev) => {
      const updated = [...prev.services];
      updated[serviceIndex] = {
        ...updated[serviceIndex],
        features: updated[serviceIndex].features.filter((_, i) => i !== featureIndex),
      };
      return { ...prev, services: updated };
    });
    markChanged();
  };

  const moveService = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.services.length) return;
    setData((prev) => {
      const updated = [...prev.services];
      [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
      return { ...prev, services: updated };
    });
    markChanged();
  };

  const addService = () => {
    setData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          title: "New Service",
          description: "Add a description for this service",
          features: ["Feature 1"],
          image: "/images/residential/villas/luxury-stone-villa-exterior.jpg",
          href: "/",
        },
      ],
    }));
    markChanged();
  };

  const removeService = (index: number) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
    markChanged();
  };

  const saveChanges = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/content?section=services-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data }),
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
      formData.append("folder", "services");
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Upload failed");
      updateService(imagePicker, "image", result.path);
      setAvailableImages((prev) => ({
        ...prev,
        services: [...(prev.services || []), result.path],
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
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-serif font-light text-stone-100">
              Services Page
            </h1>
            <p className="text-xs text-stone-500">
              Edit the /services page content
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={addService}
            className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-stone-300 bg-stone-800/60 border border-stone-700/50 rounded-xl hover:bg-stone-800 hover:text-stone-100 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Service
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

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-950/40 border border-red-900/40 rounded-xl text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Hero Section Editor */}
      <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5 mb-6">
        <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-widest mb-4">
          Hero Section
        </h2>
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
              Page Title
            </label>
            <input
              type="text"
              value={data.hero.title}
              onChange={(e) => updateHero("title", e.target.value)}
              className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
              Subtitle
            </label>
            <textarea
              value={data.hero.subtitle}
              onChange={(e) => updateHero("subtitle", e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all resize-none"
            />
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-4 mb-6">
        {data.services.map((service, index) => (
          <div
            key={`service-${index}`}
            className="bg-stone-900/60 border border-stone-800/60 rounded-2xl overflow-hidden"
          >
            <div className="flex flex-col sm:flex-row">
              {/* Image preview */}
              <div className="relative sm:w-56 lg:w-72 h-40 sm:h-auto shrink-0 bg-stone-800/40">
                <img
                  src={service.image}
                  alt={service.title}
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
                    Service Title
                  </label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(index, "title", e.target.value)}
                    className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Description
                  </label>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateService(index, "description", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
                    Link (href)
                  </label>
                  <input
                    type="text"
                    value={service.href || ""}
                    onChange={(e) => updateService(index, "href", e.target.value)}
                    placeholder="/residential"
                    className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all font-mono"
                  />
                </div>

                {/* Features */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[10px] uppercase tracking-widest text-stone-500">
                      Features
                    </label>
                    <button
                      onClick={() => addFeature(index)}
                      className="flex items-center gap-1 text-[10px] text-stone-400 hover:text-stone-200 transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                      Add
                    </button>
                  </div>
                  <div className="space-y-1.5">
                    {service.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(index, fIdx, e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-stone-800/50 border border-stone-700/50 rounded-lg text-xs text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all"
                        />
                        <button
                          onClick={() => removeFeature(index, fIdx)}
                          className="p-1 text-stone-600 hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions sidebar */}
              <div className="flex sm:flex-col items-center justify-center gap-1 px-3 py-2 sm:py-0 border-t sm:border-t-0 sm:border-l border-stone-800/60 bg-stone-900/30">
                <button
                  onClick={() => moveService(index, "up")}
                  disabled={index === 0}
                  className="p-1.5 text-stone-500 hover:text-stone-200 disabled:opacity-20 disabled:cursor-not-allowed rounded-lg hover:bg-stone-800/60 transition-all"
                  title="Move up"
                >
                  <ChevronUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => moveService(index, "down")}
                  disabled={index === data.services.length - 1}
                  className="p-1.5 text-stone-500 hover:text-stone-200 disabled:opacity-20 disabled:cursor-not-allowed rounded-lg hover:bg-stone-800/60 transition-all"
                  title="Move down"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button
                  onClick={() => removeService(index)}
                  className="p-1.5 text-stone-500 hover:text-red-400 rounded-lg hover:bg-red-950/40 transition-all"
                  title="Delete service"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section Editor */}
      <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
        <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-widest mb-4">
          Call to Action
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
              CTA Title
            </label>
            <input
              type="text"
              value={data.cta.title}
              onChange={(e) => updateCta("title", e.target.value)}
              className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
              Description
            </label>
            <input
              type="text"
              value={data.cta.description}
              onChange={(e) => updateCta("description", e.target.value)}
              className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
              Button Text
            </label>
            <input
              type="text"
              value={data.cta.buttonText}
              onChange={(e) => updateCta("buttonText", e.target.value)}
              className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-stone-500 mb-1">
              Button Link
            </label>
            <input
              type="text"
              value={data.cta.buttonHref}
              onChange={(e) => updateCta("buttonHref", e.target.value)}
              className="w-full px-3 py-2 bg-stone-800/50 border border-stone-700/50 rounded-lg text-sm text-stone-200 placeholder-stone-600 focus:outline-none focus:ring-1 focus:ring-stone-600 transition-all"
            />
          </div>
        </div>
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
            <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800/60 shrink-0">
              <div>
                <h3 className="text-sm font-semibold text-stone-200">Choose Image</h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Select an image for service {imagePicker + 1}
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

            <div className="flex-1 overflow-y-auto p-5">
              {Object.entries(filteredImages()).map(([category, imgs]) => (
                <div key={category} className="mb-6 last:mb-0">
                  <h4 className="text-xs uppercase tracking-widest text-stone-500 mb-3 font-medium">
                    {category.replace(/-/g, " ")}
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                    {imgs.map((img) => {
                      const isSelected = data.services[imagePicker]?.image === img;
                      return (
                        <button
                          key={img}
                          onClick={() => {
                            updateService(imagePicker, "image", img);
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
                          <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
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
                <p className="text-center text-sm text-stone-500 py-10">No images found</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
