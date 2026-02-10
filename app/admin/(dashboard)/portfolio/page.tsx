"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  FolderOpen,
  ChevronRight,
  Loader2,
  Building2,
  Hotel,
  Store,
  Palette,
} from "lucide-react";

interface CategorySummary {
  key: string;
  mainCategory: string;
  subcategoryCount: number;
  totalImages: number;
  coverImage: string;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  residential: <Building2 className="w-5 h-5" />,
  hospitality: <Hotel className="w-5 h-5" />,
  commercial: <Store className="w-5 h-5" />,
  "custom-interiors": <Palette className="w-5 h-5" />,
};

export default function PortfolioAdminPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<CategorySummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/content?section=portfolio")
      .then((r) => r.json())
      .then((res) => {
        const data = res.data || {};
        const cats: CategorySummary[] = Object.entries(data).map(
          ([key, val]: [string, unknown]) => {
            const cat = val as {
              mainCategory: string;
              galleryImages: { src: string; category: string }[];
              subcategories: Record<string, { galleryImages: { src: string; alt: string }[] }>;
            };
            const subKeys = Object.keys(cat.subcategories || {});
            const totalImages =
              (cat.galleryImages?.length || 0) +
              subKeys.reduce(
                (sum, sk) =>
                  sum + (cat.subcategories[sk]?.galleryImages?.length || 0),
                0
              );
            return {
              key,
              mainCategory: cat.mainCategory,
              subcategoryCount: subKeys.length,
              totalImages,
              coverImage: cat.galleryImages?.[0]?.src || "",
            };
          }
        );
        setCategories(cats);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load portfolio data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <FolderOpen className="w-6 h-6 text-stone-400" />
          <h1 className="text-2xl font-serif font-light text-stone-100">
            Portfolio
          </h1>
        </div>
        <p className="text-sm text-stone-400">
          Manage category and subcategory pages — images, descriptions, and
          content for each portfolio section.
        </p>
      </div>

      {/* Category Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => router.push(`/admin/portfolio/${cat.key}`)}
            className="group relative overflow-hidden rounded-xl border border-stone-800/60 bg-stone-900/50 hover:border-stone-600 hover:bg-stone-900 transition-all duration-300 text-left"
          >
            {/* Cover Image */}
            <div className="relative h-40 w-full overflow-hidden">
              {cat.coverImage && (
                <Image
                  src={cat.coverImage}
                  alt={cat.mainCategory}
                  fill
                  sizes="(max-width: 640px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative p-5 -mt-10 z-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg bg-stone-800/80 border border-stone-700/50 flex items-center justify-center text-stone-300">
                  {CATEGORY_ICONS[cat.key] || (
                    <FolderOpen className="w-4 h-4" />
                  )}
                </div>
                <h2 className="text-lg font-serif font-light text-stone-100">
                  {cat.mainCategory}
                </h2>
              </div>

              <div className="flex items-center gap-4 text-xs text-stone-400 mb-3">
                <span>{cat.subcategoryCount} subcategories</span>
                <span className="w-1 h-1 rounded-full bg-stone-600" />
                <span>{cat.totalImages} images</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-stone-500 group-hover:text-stone-300 transition-colors">
                <span>Edit content</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
