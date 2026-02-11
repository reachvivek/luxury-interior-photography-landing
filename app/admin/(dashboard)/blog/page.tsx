"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  FileText,
  Save,
  Loader2,
  Check,
  Plus,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
  Upload,
  Search,
  ImageIcon,
  Eye,
  EyeOff,
  GripVertical,
} from "lucide-react";

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
  engagement?: {
    views: number;
    likes: number;
    comments: Comment[];
  };
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
/*  Post Editor (expanded form)                                        */
/* ------------------------------------------------------------------ */

function PostEditor({
  post,
  onChange,
  onDelete,
  onImagePick,
}: {
  post: JournalPost;
  onChange: (updated: JournalPost) => void;
  onDelete: () => void;
  onImagePick: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const updateField = <K extends keyof JournalPost>(key: K, value: JournalPost[K]) => {
    onChange({ ...post, [key]: value });
  };

  const updateContent = (field: string, value: unknown) => {
    onChange({
      ...post,
      content: { ...post.content!, [field]: value },
    });
  };

  return (
    <div className="rounded-xl border border-stone-800/60 bg-stone-900/30 overflow-hidden">
      {/* Post Header (always visible) */}
      <div className="flex items-center gap-4 p-4">
        <GripVertical className="w-4 h-4 text-stone-700 shrink-0" />

        {/* Thumbnail */}
        <div
          className="relative w-16 h-12 rounded-lg overflow-hidden border border-stone-700/40 shrink-0 cursor-pointer group"
          onClick={onImagePick}
        >
          {post.image ? (
            <Image src={post.image} alt="" fill sizes="64px" className="object-cover" />
          ) : (
            <div className="w-full h-full bg-stone-800/50 flex items-center justify-center">
              <ImageIcon className="w-4 h-4 text-stone-600" />
            </div>
          )}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <ImageIcon className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Title & Meta */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-stone-200 truncate">{post.title || "Untitled Post"}</p>
          <div className="flex items-center gap-3 text-xs text-stone-500">
            <span>{post.category || "No category"}</span>
            <span className="w-1 h-1 rounded-full bg-stone-600" />
            <span>{post.date}</span>
            {post.engagement && (
              <>
                <span className="w-1 h-1 rounded-full bg-stone-600" />
                <span>{post.engagement.views.toLocaleString()} views</span>
              </>
            )}
          </div>
        </div>

        {/* Toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="p-1.5 text-stone-500 hover:text-stone-300 transition-colors"
        >
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expanded Editor */}
      {expanded && (
        <div className="border-t border-stone-800/40 p-5 space-y-5">
          {/* Basic Fields */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Title</label>
              <input
                type="text"
                value={post.title}
                onChange={(e) => updateField("title", e.target.value)}
                className="w-full text-sm text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Slug</label>
              <input
                type="text"
                value={post.slug}
                onChange={(e) => updateField("slug", e.target.value)}
                className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-stone-500 mb-1 block">Short Description</label>
            <textarea
              value={post.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={2}
              className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-4">
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Category</label>
              <input
                type="text"
                value={post.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full text-sm text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Date</label>
              <input
                type="text"
                value={post.date}
                onChange={(e) => updateField("date", e.target.value)}
                placeholder="Jan 2026"
                className="w-full text-sm text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Read Time</label>
              <input
                type="text"
                value={post.readTime || ""}
                onChange={(e) => updateField("readTime", e.target.value)}
                placeholder="5 min read"
                className="w-full text-sm text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-stone-500 mb-1 block">Author</label>
              <input
                type="text"
                value={post.author || ""}
                onChange={(e) => updateField("author", e.target.value)}
                className="w-full text-sm text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Content Editor */}
          {post.content && (
            <div className="space-y-4 pt-3 border-t border-stone-800/40">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wider">
                Article Content
              </p>

              {/* Intro */}
              <div>
                <label className="text-xs text-stone-500 mb-1 block">Introduction</label>
                <textarea
                  value={post.content.intro}
                  onChange={(e) => updateContent("intro", e.target.value)}
                  rows={3}
                  className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-y"
                />
              </div>

              {/* Sections */}
              <div className="space-y-4">
                {post.content.sections.map((sec, secIdx) => (
                  <div
                    key={secIdx}
                    className="rounded-lg border border-stone-800/40 bg-stone-900/40 p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs text-stone-500">
                        Section {secIdx + 1}
                      </label>
                      <button
                        onClick={() => {
                          const sections = post.content!.sections.filter(
                            (_, i) => i !== secIdx
                          );
                          updateContent("sections", sections);
                        }}
                        className="p-1 text-stone-600 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <input
                      type="text"
                      value={sec.heading}
                      onChange={(e) => {
                        const sections = [...post.content!.sections];
                        sections[secIdx] = { ...sections[secIdx], heading: e.target.value };
                        updateContent("sections", sections);
                      }}
                      placeholder="Section Heading"
                      className="w-full text-sm font-medium text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none mb-3"
                    />

                    {sec.paragraphs.map((para, paraIdx) => (
                      <div key={paraIdx} className="flex gap-2 mb-2">
                        <textarea
                          value={para}
                          onChange={(e) => {
                            const sections = [...post.content!.sections];
                            const paragraphs = [...sections[secIdx].paragraphs];
                            paragraphs[paraIdx] = e.target.value;
                            sections[secIdx] = { ...sections[secIdx], paragraphs };
                            updateContent("sections", sections);
                          }}
                          rows={3}
                          className="flex-1 text-sm text-stone-400 bg-stone-800/30 border border-stone-800/40 rounded-lg px-3 py-2 focus:border-stone-600 focus:outline-none resize-y"
                        />
                        {sec.paragraphs.length > 1 && (
                          <button
                            onClick={() => {
                              const sections = [...post.content!.sections];
                              const paragraphs = sections[secIdx].paragraphs.filter(
                                (_, i) => i !== paraIdx
                              );
                              sections[secIdx] = { ...sections[secIdx], paragraphs };
                              updateContent("sections", sections);
                            }}
                            className="p-1 text-stone-700 hover:text-red-400 transition-colors self-start mt-2"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    ))}

                    <button
                      onClick={() => {
                        const sections = [...post.content!.sections];
                        sections[secIdx] = {
                          ...sections[secIdx],
                          paragraphs: [...sections[secIdx].paragraphs, ""],
                        };
                        updateContent("sections", sections);
                      }}
                      className="text-xs text-stone-500 hover:text-stone-300 transition-colors flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Paragraph
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => {
                    const sections = [
                      ...post.content!.sections,
                      { heading: "", paragraphs: [""] },
                    ];
                    updateContent("sections", sections);
                  }}
                  className="text-xs text-stone-500 hover:text-stone-300 transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Section
                </button>
              </div>

              {/* Conclusion */}
              <div>
                <label className="text-xs text-stone-500 mb-1 block">Conclusion</label>
                <textarea
                  value={post.content.conclusion}
                  onChange={(e) => updateContent("conclusion", e.target.value)}
                  rows={3}
                  className="w-full text-sm text-stone-400 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-y"
                />
              </div>
            </div>
          )}

          {/* Engagement Stats (read-only) */}
          {post.engagement && (
            <div className="pt-3 border-t border-stone-800/40">
              <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-3">
                Engagement
              </p>
              <div className="flex gap-6 text-xs text-stone-500">
                <span>{post.engagement.views.toLocaleString()} views</span>
                <span>{post.engagement.likes} likes</span>
                <span>{post.engagement.comments.length} comments</span>
              </div>
            </div>
          )}

          {/* Delete */}
          <div className="pt-3 border-t border-stone-800/40 flex justify-end">
            <button
              onClick={onDelete}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400/70 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page                                                          */
/* ------------------------------------------------------------------ */

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");
  const [imagePickerFor, setImagePickerFor] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/admin/content?section=journal")
      .then((r) => r.json())
      .then((res) => {
        setPosts(res.data || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load blog data");
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
      const res = await fetch("/api/admin/content?section=journal", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: posts }),
      });
      if (!res.ok) throw new Error("Save failed");
      setHasChanges(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handlePostChange = (index: number, updated: JournalPost) => {
    const next = [...posts];
    next[index] = updated;
    setPosts(next);
    markChanged();
  };

  const handleDelete = (index: number) => {
    setPosts(posts.filter((_, i) => i !== index));
    markChanged();
  };

  const handleAddPost = () => {
    const newPost: JournalPost = {
      id: String(Date.now()),
      title: "New Article",
      description: "",
      category: "Behind the Shoot",
      date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      image: "",
      slug: `new-article-${Date.now()}`,
      readTime: "5 min read",
      author: "Tsurov Photography",
      content: {
        intro: "",
        sections: [{ heading: "", paragraphs: [""] }],
        conclusion: "",
      },
      engagement: {
        views: 0,
        likes: 0,
        comments: [],
      },
    };
    setPosts([newPost, ...posts]);
    markChanged();
  };

  const handleMovePost = (index: number, direction: -1 | 1) => {
    const next = [...posts];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setPosts(next);
    markChanged();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Image Picker */}
      <ImagePickerModal
        open={imagePickerFor !== null}
        onClose={() => setImagePickerFor(null)}
        onSelect={(src) => {
          if (imagePickerFor !== null) {
            handlePostChange(imagePickerFor, { ...posts[imagePickerFor], image: src });
          }
        }}
        currentImage={imagePickerFor !== null ? posts[imagePickerFor]?.image : undefined}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <FileText className="w-6 h-6 text-stone-400" />
            <h1 className="text-2xl font-serif font-light text-stone-100">
              Blog / Journal
            </h1>
          </div>
          <p className="text-sm text-stone-400">
            {posts.length} article{posts.length !== 1 ? "s" : ""} published
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAddPost}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 border border-stone-700/40 transition-colors"
          >
            <Plus className="w-4 h-4" /> New Post
          </button>

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
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-3">
        {posts.map((post, idx) => (
          <PostEditor
            key={post.id}
            post={post}
            onChange={(updated) => handlePostChange(idx, updated)}
            onDelete={() => handleDelete(idx)}
            onImagePick={() => setImagePickerFor(idx)}
          />
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16 bg-stone-900/40 rounded-2xl border border-stone-800/60">
          <FileText className="w-10 h-10 text-stone-700 mx-auto mb-3" />
          <p className="text-sm text-stone-500 mb-4">No blog posts yet</p>
          <button
            onClick={handleAddPost}
            className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
          >
            Create your first post
          </button>
        </div>
      )}
    </div>
  );
}
