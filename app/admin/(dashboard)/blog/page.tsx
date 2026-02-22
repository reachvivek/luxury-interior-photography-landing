"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Plus,
  Loader2,
  Eye,
  Pencil,
  Calendar,
  Clock,
} from "lucide-react";

interface JournalPost {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  status?: "draft" | "published";
  readTime?: string;
  author?: string;
  htmlContent?: string;
  engagement?: {
    views: number;
    likes: number;
  };
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
            <FileText className="w-6 h-6 text-stone-400" />
            <h1 className="text-2xl font-serif font-light text-stone-100">
              Blog / Journal
            </h1>
          </div>
          <p className="text-sm text-stone-400">
            {posts.length} article{posts.length !== 1 ? "s" : ""}
          </p>
        </div>

        <Link
          href="/admin/blog/editor"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm bg-white text-stone-900 hover:bg-stone-100 font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-2">
        {posts.map((post) => {
          const isDraft = post.status === "draft";
          return (
            <Link
              key={post.id}
              href={`/admin/blog/editor?id=${post.id}`}
              className="flex items-center gap-4 p-4 rounded-xl border border-stone-800/60 bg-stone-900/30 hover:bg-stone-800/40 hover:border-stone-700/60 transition-all group"
            >
              {/* Thumbnail */}
              <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-stone-700/40 shrink-0 bg-stone-800/50">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-stone-600" />
                  </div>
                )}
              </div>

              {/* Post Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-stone-200 truncate group-hover:text-white transition-colors">
                    {post.title || "Untitled Post"}
                  </p>
                  {isDraft && (
                    <span className="shrink-0 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/20 rounded-full">
                      Draft
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-stone-500">
                  <span className="inline-flex items-center gap-1">
                    {post.category || "Uncategorized"}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-stone-700" />
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  {post.readTime && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-stone-700" />
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </>
                  )}
                  {post.engagement && post.engagement.views > 0 && (
                    <>
                      <span className="w-1 h-1 rounded-full bg-stone-700" />
                      <span className="inline-flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {post.engagement.views.toLocaleString()} views
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Edit indicator */}
              <Pencil className="w-4 h-4 text-stone-600 group-hover:text-stone-400 transition-colors shrink-0" />
            </Link>
          );
        })}
      </div>

      {posts.length === 0 && (
        <div className="text-center py-16 bg-stone-900/40 rounded-2xl border border-stone-800/60">
          <FileText className="w-10 h-10 text-stone-700 mx-auto mb-3" />
          <p className="text-sm text-stone-500 mb-4">No blog posts yet</p>
          <Link
            href="/admin/blog/editor"
            className="text-sm text-stone-400 hover:text-stone-200 transition-colors"
          >
            Create your first post
          </Link>
        </div>
      )}
    </div>
  );
}
