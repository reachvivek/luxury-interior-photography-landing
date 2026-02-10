"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Save,
  Loader2,
  Check,
  ChevronRight,
  ImageIcon,
  X,
  Upload,
  Search,
  Plus,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface GalleryImage {
  src: string;
  category: string;
}

interface PortfolioCategory {
  id: string;
  title: string;
  description: string;
  images: string[];
}

interface CategoryData {
  mainCategory: string;
  basePath: string;
  galleryImages: GalleryImage[];
  portfolioCategories: PortfolioCategory[];
  categoryFilters: { id: string; label: string; href?: string }[];
  ctaImage: string;
  ctaTitle: string;
  ctaDescription: string;
  subcategories: Record<string, { subcategoryTitle: string; galleryImages: { src: string; alt: string }[] }>;
}

/* ------------------------------------------------------------------ */
/*  Image Picker                                                       */
/* ------------------------------------------------------------------ */

function ImagePickerModal({
  open,
  onClose,
  onSelect,
  currentImage,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (src: string) => void;
  currentImage?: string;
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

  const filtered = Object.entries(grouped).reduce(
    (acc, [cat, imgs]) => {
      const matches = imgs.filter((i) =>
        i.toLowerCase().includes(search.toLowerCase())
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
      const data = await res.json();
      if (data.path) {
        onSelect(data.path);
        onClose();
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-stone-900 border border-stone-700/60 rounded-2xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-800/60">
          <h3 className="text-lg font-serif text-stone-100">Choose Image</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search images..."
                className="pl-9 pr-3 py-1.5 bg-stone-800 border border-stone-700/60 rounded-lg text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-stone-600 w-48"
              />
            </div>
            <button onClick={onClose} className="p-1.5 text-stone-400 hover:text-stone-200">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Upload Zone */}
        <div className="px-4 pt-3">
          <label className="flex items-center gap-2 px-3 py-2 border border-dashed border-stone-700 rounded-lg text-xs text-stone-400 hover:border-stone-500 hover:text-stone-300 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            {uploading ? "Uploading..." : "Upload new image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
          </label>
        </div>

        {/* Images Grid */}
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
                      img === currentImage ? "border-white ring-1 ring-white/40" : "border-transparent hover:border-stone-600"
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
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function CategoryEditorPage() {
  const params = useParams();
  const router = useRouter();
  const categoryKey = params.category as string;

  const [data, setData] = useState<CategoryData | null>(null);
  const [fullPortfolio, setFullPortfolio] = useState<Record<string, CategoryData> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");

  // Image picker state
  const [pickerTarget, setPickerTarget] = useState<
    | { type: "cta" }
    | { type: "gallery"; index: number }
    | { type: "portfolioImage"; catIndex: number; imgIndex: number }
    | null
  >(null);

  useEffect(() => {
    fetch("/api/admin/content?section=portfolio")
      .then((r) => r.json())
      .then((res) => {
        const portfolio = res.data || {};
        setFullPortfolio(portfolio);
        if (portfolio[categoryKey]) {
          setData(portfolio[categoryKey]);
        } else {
          setError(`Category "${categoryKey}" not found`);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load portfolio data");
        setLoading(false);
      });
  }, [categoryKey]);

  const markChanged = useCallback(() => {
    setHasChanges(true);
    setSaved(false);
  }, []);

  const handleSave = async () => {
    if (!data || !fullPortfolio) return;
    setSaving(true);
    try {
      const updated = { ...fullPortfolio, [categoryKey]: data };
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
    if (!data || !pickerTarget) return;
    const d = { ...data };
    if (pickerTarget.type === "cta") {
      d.ctaImage = src;
    } else if (pickerTarget.type === "gallery") {
      const gi = [...d.galleryImages];
      gi[pickerTarget.index] = { ...gi[pickerTarget.index], src };
      d.galleryImages = gi;
    } else if (pickerTarget.type === "portfolioImage") {
      const pc = [...d.portfolioCategories];
      const imgs = [...pc[pickerTarget.catIndex].images];
      imgs[pickerTarget.imgIndex] = src;
      pc[pickerTarget.catIndex] = { ...pc[pickerTarget.catIndex], images: imgs };
      d.portfolioCategories = pc;
    }
    setData(d);
    markChanged();
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
        <p className="text-red-400">{error || "Category not found"}</p>
        <button onClick={() => router.push("/admin/portfolio")} className="mt-4 text-sm text-stone-400 hover:text-stone-200">
          &larr; Back to Portfolio
        </button>
      </div>
    );
  }

  const subcategoryEntries = Object.entries(data.subcategories || {});

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Image Picker */}
      <ImagePickerModal
        open={!!pickerTarget}
        onClose={() => setPickerTarget(null)}
        onSelect={handleImagePick}
        currentImage={
          pickerTarget?.type === "cta"
            ? data.ctaImage
            : pickerTarget?.type === "gallery"
              ? data.galleryImages[pickerTarget.index]?.src
              : undefined
        }
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <button
            onClick={() => router.push("/admin/portfolio")}
            className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-300 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Portfolio
          </button>
          <h1 className="text-2xl font-serif font-light text-stone-100">
            {data.mainCategory}
          </h1>
          <p className="text-sm text-stone-400 mt-1">
            Edit category page content and manage subcategories
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

      {/* ========== Subcategories Navigation ========== */}
      <section className="mb-10">
        <h2 className="text-sm font-medium text-stone-300 uppercase tracking-wider mb-4">
          Subcategories
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {subcategoryEntries.map(([slug, sub]) => (
            <button
              key={slug}
              onClick={() => router.push(`/admin/portfolio/${categoryKey}/${slug}`)}
              className="group flex items-center gap-4 p-4 rounded-xl border border-stone-800/60 bg-stone-900/40 hover:border-stone-600 hover:bg-stone-900 transition-all text-left"
            >
              <div className="relative w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-stone-700/40">
                {sub.galleryImages?.[0]?.src && (
                  <Image
                    src={sub.galleryImages[0].src}
                    alt={sub.subcategoryTitle}
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-200 truncate group-hover:text-white transition-colors">
                  {sub.subcategoryTitle}
                </p>
                <p className="text-xs text-stone-500">
                  {sub.galleryImages?.length || 0} images
                </p>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-600 group-hover:text-stone-400 group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          ))}
        </div>
      </section>

      {/* ========== Hero Gallery Images ========== */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium text-stone-300 uppercase tracking-wider">
            Hero Gallery Images
          </h2>
          <button
            onClick={() => {
              const d = { ...data };
              d.galleryImages = [...d.galleryImages, { src: "", category: "" }];
              setData(d);
              markChanged();
            }}
            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-200 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Slide
          </button>
        </div>
        <p className="text-xs text-stone-500 mb-4">
          These images appear in the rotating hero carousel at the top of the
          category page.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {data.galleryImages.map((gi, idx) => (
            <div
              key={idx}
              className="relative rounded-xl border border-stone-800/60 bg-stone-900/40 overflow-hidden group"
            >
              {/* Image */}
              <div
                className="relative aspect-[4/3] cursor-pointer"
                onClick={() => setPickerTarget({ type: "gallery", index: idx })}
              >
                {gi.src ? (
                  <Image src={gi.src} alt="" fill sizes="300px" className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-stone-800/50">
                    <ImageIcon className="w-8 h-8 text-stone-600" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-xs text-white bg-black/60 px-3 py-1.5 rounded-full">
                    Change Image
                  </span>
                </div>
              </div>
              {/* Label */}
              <div className="p-3 flex items-center gap-2">
                <input
                  type="text"
                  value={gi.category}
                  onChange={(e) => {
                    const d = { ...data };
                    const gis = [...d.galleryImages];
                    gis[idx] = { ...gis[idx], category: e.target.value };
                    d.galleryImages = gis;
                    setData(d);
                    markChanged();
                  }}
                  placeholder="Label"
                  className="flex-1 text-xs bg-transparent text-stone-300 placeholder:text-stone-600 border-b border-stone-700/40 focus:border-stone-500 focus:outline-none pb-0.5"
                />
                <button
                  onClick={() => {
                    const d = { ...data };
                    d.galleryImages = d.galleryImages.filter((_, i) => i !== idx);
                    setData(d);
                    markChanged();
                  }}
                  className="p-1 text-stone-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== Portfolio Sections (per subcategory showcase) ========== */}
      <section className="mb-10">
        <h2 className="text-sm font-medium text-stone-300 uppercase tracking-wider mb-4">
          Portfolio Sections
        </h2>
        <p className="text-xs text-stone-500 mb-4">
          These sections show subcategory previews on the category page with
          title, description, and images.
        </p>
        <div className="space-y-6">
          {data.portfolioCategories.map((pc, catIdx) => (
            <div
              key={pc.id}
              className="rounded-xl border border-stone-800/60 bg-stone-900/30 p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1 space-y-3">
                  <input
                    type="text"
                    value={pc.title}
                    onChange={(e) => {
                      const d = { ...data };
                      const pcs = [...d.portfolioCategories];
                      pcs[catIdx] = { ...pcs[catIdx], title: e.target.value };
                      d.portfolioCategories = pcs;
                      setData(d);
                      markChanged();
                    }}
                    className="w-full text-base font-serif text-stone-100 bg-transparent border-b border-stone-700/40 focus:border-stone-500 focus:outline-none pb-1"
                  />
                  <textarea
                    value={pc.description}
                    onChange={(e) => {
                      const d = { ...data };
                      const pcs = [...d.portfolioCategories];
                      pcs[catIdx] = { ...pcs[catIdx], description: e.target.value };
                      d.portfolioCategories = pcs;
                      setData(d);
                      markChanged();
                    }}
                    rows={2}
                    className="w-full text-sm text-stone-400 bg-transparent border border-stone-800/40 rounded-lg p-2 focus:border-stone-600 focus:outline-none resize-none"
                  />
                </div>
                {/* Reorder */}
                <div className="flex flex-col gap-1">
                  <button
                    disabled={catIdx === 0}
                    onClick={() => {
                      const d = { ...data };
                      const pcs = [...d.portfolioCategories];
                      [pcs[catIdx - 1], pcs[catIdx]] = [pcs[catIdx], pcs[catIdx - 1]];
                      d.portfolioCategories = pcs;
                      setData(d);
                      markChanged();
                    }}
                    className="p-1 text-stone-600 hover:text-stone-300 disabled:opacity-30 transition-colors"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    disabled={catIdx === data.portfolioCategories.length - 1}
                    onClick={() => {
                      const d = { ...data };
                      const pcs = [...d.portfolioCategories];
                      [pcs[catIdx], pcs[catIdx + 1]] = [pcs[catIdx + 1], pcs[catIdx]];
                      d.portfolioCategories = pcs;
                      setData(d);
                      markChanged();
                    }}
                    className="p-1 text-stone-600 hover:text-stone-300 disabled:opacity-30 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Images Row */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {pc.images.map((img, imgIdx) => (
                  <div
                    key={imgIdx}
                    className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden border border-stone-700/40 group cursor-pointer"
                    onClick={() =>
                      setPickerTarget({ type: "portfolioImage", catIndex: catIdx, imgIndex: imgIdx })
                    }
                  >
                    <Image src={img} alt="" fill sizes="96px" className="object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <ImageIcon className="w-4 h-4 text-white" />
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const d = { ...data };
                        const pcs = [...d.portfolioCategories];
                        pcs[catIdx] = {
                          ...pcs[catIdx],
                          images: pcs[catIdx].images.filter((_, i) => i !== imgIdx),
                        };
                        d.portfolioCategories = pcs;
                        setData(d);
                        markChanged();
                      }}
                      className="absolute top-1 right-1 p-0.5 bg-red-600/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setPickerTarget({
                      type: "portfolioImage",
                      catIndex: catIdx,
                      imgIndex: pc.images.length,
                    });
                    // This will add an image at the new index
                    const d = { ...data };
                    const pcs = [...d.portfolioCategories];
                    pcs[catIdx] = { ...pcs[catIdx], images: [...pcs[catIdx].images, ""] };
                    d.portfolioCategories = pcs;
                    setData(d);
                  }}
                  className="w-24 h-24 shrink-0 rounded-lg border-2 border-dashed border-stone-700/60 flex items-center justify-center text-stone-600 hover:text-stone-400 hover:border-stone-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CTA Section ========== */}
      <section className="mb-10">
        <h2 className="text-sm font-medium text-stone-300 uppercase tracking-wider mb-4">
          Call-to-Action Section
        </h2>
        <div className="rounded-xl border border-stone-800/60 bg-stone-900/30 p-5">
          <div className="flex flex-col md:flex-row gap-5">
            {/* CTA Image */}
            <div
              className="relative w-full md:w-48 aspect-video md:aspect-square rounded-lg overflow-hidden border border-stone-700/40 cursor-pointer group shrink-0"
              onClick={() => setPickerTarget({ type: "cta" })}
            >
              {data.ctaImage ? (
                <Image src={data.ctaImage} alt="CTA" fill sizes="200px" className="object-cover" />
              ) : (
                <div className="w-full h-full bg-stone-800/50 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-stone-600" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="text-xs text-white bg-black/60 px-3 py-1.5 rounded-full">
                  Change
                </span>
              </div>
            </div>

            {/* CTA Text */}
            <div className="flex-1 space-y-3">
              <div>
                <label className="text-xs text-stone-500 mb-1 block">Title</label>
                <input
                  type="text"
                  value={data.ctaTitle}
                  onChange={(e) => {
                    setData({ ...data, ctaTitle: e.target.value });
                    markChanged();
                  }}
                  className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-stone-500 mb-1 block">Description</label>
                <textarea
                  value={data.ctaDescription}
                  onChange={(e) => {
                    setData({ ...data, ctaDescription: e.target.value });
                    markChanged();
                  }}
                  rows={3}
                  className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
