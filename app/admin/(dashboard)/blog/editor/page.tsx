"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  Save,
  Loader2,
  Check,
  ImageIcon,
  X,
  Upload,
  Search,
  Eye,
  Trash2,
} from "lucide-react";

const TipTapEditor = dynamic(() => import("@/components/admin/TipTapEditor"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] rounded-lg border border-stone-700/40 bg-stone-800/50 flex items-center justify-center">
      <Loader2 className="w-5 h-5 animate-spin text-stone-500" />
    </div>
  ),
});

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface Comment {
  id: string;
  author: string;
  role?: string;
  content: string;
  date: string;
  likes: number;
}

interface ContentSection {
  heading: string;
  paragraphs: string[];
}

interface JournalPost {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  readTime?: string;
  author?: string;
  content?: {
    intro: string;
    sections: ContentSection[];
    conclusion: string;
  };
  htmlContent?: string;
  status?: "draft" | "published";
  engagement?: {
    views: number;
    likes: number;
    comments: Comment[];
  };
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function convertOldContentToHtml(content: {
  intro: string;
  sections: { heading: string; paragraphs: string[] }[];
  conclusion: string;
}): string {
  let html = "";
  if (content.intro) html += `<p>${content.intro}</p>`;
  for (const section of content.sections) {
    if (section.heading) html += `<h2>${section.heading}</h2>`;
    for (const para of section.paragraphs) {
      if (para) html += `<p>${para}</p>`;
    }
  }
  if (content.conclusion) html += `<p>${content.conclusion}</p>`;
  return html;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80);
}

/* ------------------------------------------------------------------ */
/*  Image Picker Modal                                                 */
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
    form.append("folder", "blog");
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
/*  Editor Content (uses searchParams)                                 */
/* ------------------------------------------------------------------ */
function EditorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = searchParams.get("id");
  const isNew = !postId;

  const [post, setPost] = useState<JournalPost | null>(null);
  const [allPosts, setAllPosts] = useState<JournalPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [contentImagePickerOpen, setContentImagePickerOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // Load posts
  useEffect(() => {
    fetch("/api/admin/content?section=journal")
      .then((r) => r.json())
      .then((res) => {
        const posts: JournalPost[] = res.data || [];
        setAllPosts(posts);

        if (isNew) {
          const newPost: JournalPost = {
            id: String(Date.now()),
            title: "",
            description: "",
            category: "Behind the Shoot",
            date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
            image: "",
            slug: "",
            readTime: "5 min read",
            author: "Tsurov Photography",
            htmlContent: "",
            status: "draft",
            engagement: { views: 0, likes: 0, comments: [] },
          };
          setPost(newPost);
        } else {
          const found = posts.find((p) => p.id === postId);
          if (found) {
            // Migrate old content to htmlContent if needed
            if (!found.htmlContent && found.content) {
              found.htmlContent = convertOldContentToHtml(found.content);
            }
            setPost(found);
          } else {
            setError("Post not found");
          }
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load data");
        setLoading(false);
      });
  }, [postId, isNew]);

  const updateField = useCallback(<K extends keyof JournalPost>(key: K, value: JournalPost[K]) => {
    setPost((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, [key]: value };
      // Auto-generate slug from title for new posts
      if (key === "title" && isNew && typeof value === "string") {
        updated.slug = generateSlug(value);
      }
      return updated;
    });
    setHasChanges(true);
    setSaved(false);
  }, [isNew]);

  const handleSave = async (status?: "draft" | "published") => {
    if (!post) return;
    setSaving(true);
    setError("");

    const postToSave = status ? { ...post, status } : post;

    // Validate required fields
    if (!postToSave.title.trim()) {
      setError("Title is required.");
      setSaving(false);
      return;
    }
    if (!postToSave.slug.trim()) {
      setError("Slug is required.");
      setSaving(false);
      return;
    }

    // Check for unique slug
    const slugConflict = allPosts.find(
      (p) => p.slug === postToSave.slug && p.id !== postToSave.id
    );
    if (slugConflict) {
      setError(`Slug "${postToSave.slug}" is already used by "${slugConflict.title}". Please choose a unique slug.`);
      setSaving(false);
      return;
    }

    try {
      let updatedPosts: JournalPost[];
      if (isNew) {
        updatedPosts = [postToSave, ...allPosts];
      } else {
        updatedPosts = allPosts.map((p) => (p.id === postToSave.id ? postToSave : p));
      }

      const res = await fetch("/api/admin/content?section=journal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updatedPosts }),
      });

      if (!res.ok) throw new Error("Save failed");

      setAllPosts(updatedPosts);
      setPost(postToSave);
      setHasChanges(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);

      // If was new, update URL to include the ID so further saves are updates
      if (isNew) {
        window.history.replaceState(null, "", `/admin/blog/editor?id=${postToSave.id}`);
      }
    } catch {
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!post || isNew) return;
    if (!confirm("Are you sure you want to delete this post?")) return;

    const updatedPosts = allPosts.filter((p) => p.id !== post.id);
    try {
      const res = await fetch("/api/admin/content?section=journal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: updatedPosts }),
      });
      if (!res.ok) throw new Error();
      router.push("/admin/blog");
    } catch {
      setError("Failed to delete post");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="p-8 text-center">
        <p className="text-stone-400">{error || "Post not found"}</p>
        <button onClick={() => router.push("/admin/blog")} className="mt-4 text-sm text-stone-500 hover:text-stone-300">
          Back to Blog
        </button>
      </div>
    );
  }

  const isDraft = post.status === "draft" || !post.status;
  const slugTaken = allPosts.some((p) => p.slug === post.slug && p.id !== post.id);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Image Pickers */}
      <ImagePickerModal
        open={imagePickerOpen}
        onClose={() => setImagePickerOpen(false)}
        onSelect={(src) => updateField("image", src)}
        currentImage={post.image}
      />
      <ImagePickerModal
        open={contentImagePickerOpen}
        onClose={() => setContentImagePickerOpen(false)}
        onSelect={(src) => {
          updateField("htmlContent", (post.htmlContent || "") + `<img src="${src}" alt="" />`);
        }}
      />

      {/* Top Bar */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <button
          onClick={() => router.push("/admin/blog")}
          className="flex items-center gap-2 text-sm text-stone-400 hover:text-stone-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Posts
        </button>

        <div className="flex items-center gap-3">
          {isDraft && (
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
              Draft
            </span>
          )}
          {!isDraft && (
            <span className="px-2.5 py-1 text-[10px] uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
              Published
            </span>
          )}

          {post.slug && (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs text-stone-400 hover:text-stone-200 border border-stone-700/40 rounded-lg transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              Preview
            </a>
          )}

          {/* Save as Draft */}
          <button
            onClick={() => handleSave("draft")}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 border border-stone-700/40 transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Draft
          </button>

          {/* Publish */}
          <button
            onClick={() => handleSave("published")}
            disabled={saving || !post.title}
            className={`flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-medium transition-all ${
              saved
                ? "bg-emerald-600/20 text-emerald-400 border border-emerald-600/40"
                : "bg-white text-stone-900 hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed"
            }`}
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : saved ? (
              <Check className="w-3.5 h-3.5" />
            ) : null}
            {saved ? "Published" : "Publish"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
        {/* Main Content Column */}
        <div className="space-y-6">
          {/* Title */}
          <div>
            <input
              type="text"
              value={post.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Article title..."
              className="w-full text-2xl font-serif font-light text-stone-100 bg-transparent border-none focus:outline-none placeholder:text-stone-600"
            />
            {post.slug && (
              <p className="mt-1 text-xs text-stone-600 font-mono">/blog/{post.slug}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-xs text-stone-500 mb-1.5 block">Short Description</label>
            <textarea
              value={post.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Brief summary for listing pages..."
              rows={2}
              className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-none"
            />
          </div>

          {/* Rich Content Editor */}
          <div>
            <label className="text-xs text-stone-500 mb-1.5 block">Article Content</label>
            <TipTapEditor
              content={post.htmlContent || ""}
              onChange={(html) => updateField("htmlContent", html)}
              onOpenImagePicker={() => setContentImagePickerOpen(true)}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Featured Image */}
          <div className="rounded-xl border border-stone-800/60 bg-stone-900/30 p-4">
            <label className="text-xs text-stone-500 mb-2 block">Featured Image</label>
            <div
              onClick={() => setImagePickerOpen(true)}
              className="relative aspect-video rounded-lg overflow-hidden border border-stone-700/40 cursor-pointer group bg-stone-800/50"
            >
              {post.image ? (
                <>
                  <Image src={post.image} alt="" fill sizes="300px" className="object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ImageIcon className="w-5 h-5 text-white" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-stone-600 group-hover:text-stone-400 transition-colors">
                  <ImageIcon className="w-8 h-8 mb-2" />
                  <span className="text-xs">Click to add image</span>
                </div>
              )}
            </div>
          </div>

          {/* Meta Fields */}
          <div className="rounded-xl border border-stone-800/60 bg-stone-900/30 p-4 space-y-3">
            <label className="text-xs text-stone-500 block">Post Settings</label>

            <div>
              <label className="text-[10px] text-stone-600 mb-0.5 block">Slug</label>
              <input
                type="text"
                value={post.slug}
                onChange={(e) => {
                  const val = e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9\s-]/g, "")
                    .replace(/\s+/g, "-")
                    .replace(/-+/g, "-");
                  updateField("slug", val);
                }}
                className={`w-full text-xs text-stone-400 bg-stone-800/50 border rounded-lg px-3 py-1.5 focus:outline-none font-mono ${
                  slugTaken
                    ? "border-red-500/60 focus:border-red-400"
                    : "border-stone-700/40 focus:border-stone-500"
                }`}
              />
              {slugTaken && (
                <p className="text-[10px] text-red-400 mt-0.5">This slug is already in use</p>
              )}
            </div>

            <div>
              <label className="text-[10px] text-stone-600 mb-0.5 block">Category</label>
              <input
                type="text"
                value={post.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full text-xs text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-1.5 focus:border-stone-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-stone-600 mb-0.5 block">Date</label>
                <input
                  type="text"
                  value={post.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  placeholder="Jan 2026"
                  className="w-full text-xs text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-1.5 focus:border-stone-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-stone-600 mb-0.5 block">Read Time</label>
                <input
                  type="text"
                  value={post.readTime || ""}
                  onChange={(e) => updateField("readTime", e.target.value)}
                  placeholder="5 min read"
                  className="w-full text-xs text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-1.5 focus:border-stone-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] text-stone-600 mb-0.5 block">Author</label>
              <input
                type="text"
                value={post.author || ""}
                onChange={(e) => updateField("author", e.target.value)}
                className="w-full text-xs text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-1.5 focus:border-stone-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Engagement */}
          <div className="rounded-xl border border-stone-800/60 bg-stone-900/30 p-4 space-y-3">
            <label className="text-xs text-stone-500 block">Base Engagement</label>
            <p className="text-[10px] text-stone-600">Added to real user counts for display.</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-stone-600 mb-0.5 block">Views</label>
                <input
                  type="number"
                  min="0"
                  value={post.engagement?.views ?? 0}
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value) || 0);
                    updateField("engagement", {
                      views: val,
                      likes: post.engagement?.likes ?? 0,
                      comments: post.engagement?.comments ?? [],
                    });
                  }}
                  className="w-full text-xs text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-1.5 focus:border-stone-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-stone-600 mb-0.5 block">Likes</label>
                <input
                  type="number"
                  min="0"
                  value={post.engagement?.likes ?? 0}
                  onChange={(e) => {
                    const val = Math.max(0, parseInt(e.target.value) || 0);
                    updateField("engagement", {
                      views: post.engagement?.views ?? 0,
                      likes: val,
                      comments: post.engagement?.comments ?? [],
                    });
                  }}
                  className="w-full text-xs text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-1.5 focus:border-stone-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Delete */}
          {!isNew && (
            <button
              onClick={handleDelete}
              className="w-full flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg border border-stone-800/40 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page wrapper with Suspense for useSearchParams                     */
/* ------------------------------------------------------------------ */
export default function BlogEditorPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
        </div>
      }
    >
      <EditorContent />
    </Suspense>
  );
}
