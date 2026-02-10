"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Loader2,
  Check,
  X,
  Upload,
  Search,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Type,
  FileText,
  ListOrdered,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SubcategoryData {
  mainCategory: string;
  subcategoryTitle: string;
  description: string;
  heroImage: string;
  galleryImages: { src: string; alt: string }[];
  approachTitle: string;
  approachDescription: string;
  processTitle: string;
  processSteps: string[];
  impactTitle: string;
  impactDescription: string;
}

/* ------------------------------------------------------------------ */
/*  Image Picker                                                       */
/* ------------------------------------------------------------------ */

function ImagePickerModal({
  open,
  onClose,
  onSelect,
  currentImage,
  usedImages,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (src: string) => void;
  currentImage?: string;
  usedImages?: string[];
}) {
  const [grouped, setGrouped] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!open) return;
    fetch("/api/admin/images")
      .then((r) => r.json())
      .then((res) => setGrouped(res.grouped || {}));
  }, [open]);

  if (!open) return null;

  const used = new Set(usedImages || []);

  const filtered = Object.entries(grouped).reduce(
    (acc, [cat, imgs]) => {
      const matches = imgs.filter(
        (i) =>
          i.toLowerCase().includes(search.toLowerCase()) && !used.has(i)
      );
      if (matches.length) acc[cat] = matches;
      return acc;
    },
    {} as Record<string, string[]>
  );

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("folder", "portfolio");
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const json = await res.json();
      if (json.path) {
        onSelect(json.path);
        onClose();
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-700/60 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-stone-800/60">
          <h3 className="text-lg font-serif text-stone-100">Choose Image</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="pl-9 pr-3 py-1.5 bg-stone-800 border border-stone-700/60 rounded-lg text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-stone-600 w-48"
              />
            </div>
            <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-200">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="px-4 pt-3">
          <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-stone-700 rounded-lg text-xs text-stone-400 hover:border-stone-500 hover:text-stone-300 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload new image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {Object.entries(filtered).map(([cat, imgs]) => (
            <div key={cat}>
              <p className="text-xs text-stone-500 uppercase tracking-wider mb-2">{cat}</p>
              <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                {imgs.map((img) => (
                  <button
                    key={img}
                    onClick={() => { onSelect(img); onClose(); }}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      img === currentImage
                        ? "border-white ring-1 ring-white/40"
                        : "border-transparent hover:border-stone-600"
                    }`}
                  >
                    <Image src={img} alt="" fill sizes="120px" className="object-cover" />
                    {img === currentImage && (
                      <div className="absolute inset-0 bg-white/20 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white drop-shadow" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {Object.keys(filtered).length === 0 && (
            <p className="text-sm text-stone-500 text-center py-8">No images found</p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Section Card Wrapper                                               */
/* ------------------------------------------------------------------ */

function SectionCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-stone-800/60 bg-stone-900/30 overflow-hidden">
      <div className="p-5 border-b border-stone-800/40">
        <div className="flex items-center gap-2.5 mb-1">
          <span className="text-stone-400">{icon}</span>
          <h2 className="text-base font-serif text-stone-100">{title}</h2>
        </div>
        <p className="text-xs text-stone-500 ml-7">{description}</p>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function SubcategoryEditorPage() {
  const params = useParams();
  const router = useRouter();
  const categoryKey = params.category as string;
  const subcategoryKey = params.subcategory as string;

  const [data, setData] = useState<SubcategoryData | null>(null);
  const [fullPortfolio, setFullPortfolio] = useState<Record<string, unknown> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");

  // Image picker state
  const [pickerMode, setPickerMode] = useState<
    | { type: "hero" }
    | { type: "gallery"; index: number }
    | { type: "addGallery" }
    | null
  >(null);

  useEffect(() => {
    fetch("/api/admin/content?section=portfolio")
      .then((r) => r.json())
      .then((res) => {
        const portfolio = res.data || {};
        setFullPortfolio(portfolio);
        const catData = portfolio[categoryKey];
        if (catData?.subcategories?.[subcategoryKey]) {
          setData(catData.subcategories[subcategoryKey]);
        } else {
          setError(`Subcategory "${subcategoryKey}" not found`);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, [categoryKey, subcategoryKey]);

  const markChanged = useCallback(() => {
    setHasChanges(true);
    setSaved(false);
  }, []);

  const update = useCallback(
    (fn: (d: SubcategoryData) => SubcategoryData) => {
      setData((prev) => {
        if (!prev) return prev;
        const next = fn({ ...prev });
        setHasChanges(true);
        setSaved(false);
        return next;
      });
    },
    []
  );

  const handleSave = async () => {
    if (!data || !fullPortfolio) return;
    setSaving(true);
    try {
      const updated = JSON.parse(JSON.stringify(fullPortfolio));
      updated[categoryKey].subcategories[subcategoryKey] = data;
      const res = await fetch("/api/admin/content?section=portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updated }),
      });
      if (!res.ok) throw new Error("Save failed");
      setFullPortfolio(updated);
      setHasChanges(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleImagePick = (src: string) => {
    if (!data || !pickerMode) return;
    if (pickerMode.type === "hero") {
      update((d) => ({ ...d, heroImage: src }));
    } else if (pickerMode.type === "gallery") {
      update((d) => {
        const imgs = [...d.galleryImages];
        imgs[pickerMode.index] = { ...imgs[pickerMode.index], src };
        return { ...d, galleryImages: imgs };
      });
    } else if (pickerMode.type === "addGallery") {
      update((d) => ({
        ...d,
        galleryImages: [...d.galleryImages, { src, alt: src.split("/").pop()?.replace(/\.[^.]+$/, "").replaceAll("-", " ") || "" }],
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6">
        <p className="text-red-400">{error || "Not found"}</p>
        <button
          onClick={() => router.push(`/admin/portfolio/${categoryKey}`)}
          className="mt-4 text-sm text-stone-400 hover:text-stone-200"
        >
          &larr; Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Image Picker */}
      <ImagePickerModal
        open={!!pickerMode}
        onClose={() => setPickerMode(null)}
        onSelect={handleImagePick}
        currentImage={
          pickerMode?.type === "hero"
            ? data.heroImage
            : pickerMode?.type === "gallery"
              ? data.galleryImages[pickerMode.index]?.src
              : undefined
        }
        usedImages={
          pickerMode?.type === "addGallery"
            ? data.galleryImages.map((g) => g.src)
            : undefined
        }
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => router.push(`/admin/portfolio/${categoryKey}`)}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-300 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {data.mainCategory}
          </button>
          <h1 className="text-2xl font-serif font-light text-stone-100">
            {data.subcategoryTitle}
          </h1>
        </div>

        <button
          onClick={handleSave}
          disabled={saving || !hasChanges}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all shrink-0 ${
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

      <div className="space-y-6">
        {/* ========== Hero Section ========== */}
        <SectionCard
          icon={<ImageIcon className="w-4 h-4" />}
          title="Hero Section"
          description="The main hero banner at the top of the page"
        >
          <div className="flex flex-col md:flex-row gap-5">
            {/* Hero Image */}
            <div
              className="relative w-full md:w-64 aspect-video rounded-lg overflow-hidden border border-stone-700/40 cursor-pointer group shrink-0"
              onClick={() => setPickerMode({ type: "hero" })}
            >
              {data.heroImage ? (
                <Image src={data.heroImage} alt="Hero" fill sizes="300px" className="object-cover" />
              ) : (
                <div className="w-full h-full bg-stone-800/50 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-stone-600" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs text-white bg-black/60 px-3 py-1.5 rounded-full">
                  Change Image
                </span>
              </div>
            </div>

            {/* Hero Text Fields */}
            <div className="flex-1 space-y-3">
              <div>
                <label className="text-xs text-stone-500 mb-1 block">Title</label>
                <input
                  type="text"
                  value={data.subcategoryTitle}
                  onChange={(e) => update((d) => ({ ...d, subcategoryTitle: e.target.value }))}
                  className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 mb-1 block">Description</label>
                <textarea
                  value={data.description}
                  onChange={(e) => update((d) => ({ ...d, description: e.target.value }))}
                  rows={3}
                  className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ========== Gallery ========== */}
        <SectionCard
          icon={<ImageIcon className="w-4 h-4" />}
          title="Gallery"
          description="Masonry gallery images shown on this page"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {data.galleryImages.map((gi, idx) => (
              <div key={idx} className="group relative rounded-lg overflow-hidden border border-stone-700/40">
                <div
                  className="relative aspect-square cursor-pointer"
                  onClick={() => setPickerMode({ type: "gallery", index: idx })}
                >
                  <Image src={gi.src} alt={gi.alt} fill sizes="200px" className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Alt text */}
                <div className="p-2">
                  <input
                    type="text"
                    value={gi.alt}
                    onChange={(e) =>
                      update((d) => {
                        const imgs = [...d.galleryImages];
                        imgs[idx] = { ...imgs[idx], alt: e.target.value };
                        return { ...d, galleryImages: imgs };
                      })
                    }
                    placeholder="Alt text"
                    className="w-full text-[11px] bg-transparent text-stone-400 placeholder:text-stone-600 border-b border-stone-800/40 focus:border-stone-600 focus:outline-none pb-0.5"
                  />
                </div>

                {/* Actions overlay */}
                <div className="absolute top-1.5 right-1.5 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {idx > 0 && (
                    <button
                      onClick={() =>
                        update((d) => {
                          const imgs = [...d.galleryImages];
                          [imgs[idx - 1], imgs[idx]] = [imgs[idx], imgs[idx - 1]];
                          return { ...d, galleryImages: imgs };
                        })
                      }
                      className="p-1 bg-black/70 rounded text-white hover:bg-black/90"
                    >
                      <ChevronLeft className="w-3 h-3" />
                    </button>
                  )}
                  {idx < data.galleryImages.length - 1 && (
                    <button
                      onClick={() =>
                        update((d) => {
                          const imgs = [...d.galleryImages];
                          [imgs[idx], imgs[idx + 1]] = [imgs[idx + 1], imgs[idx]];
                          return { ...d, galleryImages: imgs };
                        })
                      }
                      className="p-1 bg-black/70 rounded text-white hover:bg-black/90"
                    >
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    onClick={() =>
                      update((d) => ({
                        ...d,
                        galleryImages: d.galleryImages.filter((_, i) => i !== idx),
                      }))
                    }
                    className="p-1 bg-red-600/80 rounded text-white hover:bg-red-600"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>

                {/* Index badge */}
                <div className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center text-[10px] text-white font-medium">
                  {idx + 1}
                </div>
              </div>
            ))}

            {/* Add Image Button */}
            <button
              onClick={() => setPickerMode({ type: "addGallery" })}
              className="aspect-square rounded-lg border-2 border-dashed border-stone-700/60 flex flex-col items-center justify-center gap-1.5 text-stone-600 hover:text-stone-400 hover:border-stone-600 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span className="text-[10px]">Add Image</span>
            </button>
          </div>
        </SectionCard>

        {/* ========== Approach Section ========== */}
        <SectionCard
          icon={<Type className="w-4 h-4" />}
          title="Approach Section"
          description="The narrative about your photography approach"
        >
          <div className="space-y-3">
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Section Title</label>
              <input
                type="text"
                value={data.approachTitle}
                onChange={(e) => update((d) => ({ ...d, approachTitle: e.target.value }))}
                className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Description</label>
              <textarea
                value={data.approachDescription}
                onChange={(e) => update((d) => ({ ...d, approachDescription: e.target.value }))}
                rows={5}
                className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-y"
              />
            </div>
          </div>
        </SectionCard>

        {/* ========== Process Section ========== */}
        <SectionCard
          icon={<ListOrdered className="w-4 h-4" />}
          title="Process Steps"
          description="The 5 steps of your photography process"
        >
          <div className="space-y-3">
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Section Title</label>
              <input
                type="text"
                value={data.processTitle}
                onChange={(e) => update((d) => ({ ...d, processTitle: e.target.value }))}
                className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              {data.processSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-full bg-stone-800 border border-stone-700/40 flex items-center justify-center text-xs text-stone-400 shrink-0 mt-1.5">
                    {idx + 1}
                  </div>
                  <textarea
                    value={step}
                    onChange={(e) =>
                      update((d) => {
                        const steps = [...d.processSteps];
                        steps[idx] = e.target.value;
                        return { ...d, processSteps: steps };
                      })
                    }
                    rows={2}
                    className="flex-1 text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-none"
                  />
                  {data.processSteps.length > 1 && (
                    <button
                      onClick={() =>
                        update((d) => ({
                          ...d,
                          processSteps: d.processSteps.filter((_, i) => i !== idx),
                        }))
                      }
                      className="p-1.5 text-stone-600 hover:text-red-400 transition-colors mt-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() =>
                  update((d) => ({ ...d, processSteps: [...d.processSteps, ""] }))
                }
                className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-300 transition-colors ml-10"
              >
                <Plus className="w-3.5 h-3.5" /> Add Step
              </button>
            </div>
          </div>
        </SectionCard>

        {/* ========== Impact Section ========== */}
        <SectionCard
          icon={<Sparkles className="w-4 h-4" />}
          title="Impact Section"
          description="ROI and impact statement for potential clients"
        >
          <div className="space-y-3">
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Section Title</label>
              <input
                type="text"
                value={data.impactTitle}
                onChange={(e) => update((d) => ({ ...d, impactTitle: e.target.value }))}
                className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Description</label>
              <textarea
                value={data.impactDescription}
                onChange={(e) => update((d) => ({ ...d, impactDescription: e.target.value }))}
                rows={5}
                className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-y"
              />
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
