"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Loader2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
} from "lucide-react";

interface CommentUser {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
}

interface Comment {
  id: string;
  content: string;
  postSlug: string;
  createdAt: string;
  user: CommentUser;
}

interface CommentsResponse {
  comments: Comment[];
  total: number;
  page: number;
  totalPages: number;
}

export default function AdminCommentsPage() {
  const [data, setData] = useState<CommentsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchComments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/comments?page=${page}`);
      if (res.ok) setData(await res.json());
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this comment? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/admin/comments?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchComments();
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <MessageSquare className="w-6 h-6 text-stone-400" />
            <h1 className="text-2xl font-serif font-light text-stone-100">
              Comments
            </h1>
          </div>
          <p className="text-sm text-stone-400">
            Manage user comments on blog posts
            {data && (
              <span className="ml-2 text-stone-500">
                ({data.total} total)
              </span>
            )}
          </p>
        </div>
        <button
          onClick={fetchComments}
          disabled={loading}
          className="p-2 text-stone-400 hover:text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>

      {/* Comments List */}
      {loading && !data ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
        </div>
      ) : data && data.comments.length > 0 ? (
        <div className="space-y-4">
          {data.comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-stone-900/60 border border-stone-800/60 rounded-xl p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* User info */}
                  <div className="flex items-center gap-3 mb-2">
                    {comment.user.image ? (
                      <img
                        src={comment.user.image}
                        alt=""
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-stone-700 flex items-center justify-center text-stone-300 text-xs font-medium">
                        {(comment.user.name || "U")[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <span className="text-sm font-medium text-stone-200">
                        {comment.user.name || "Anonymous"}
                      </span>
                      {comment.user.email && (
                        <span className="ml-2 text-xs text-stone-500">
                          {comment.user.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Comment content */}
                  <p className="text-sm text-stone-300 leading-relaxed mb-3">
                    {comment.content}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-stone-500">
                    <span>
                      {new Date(comment.createdAt).toLocaleString()}
                    </span>
                    <a
                      href={`/blog/${comment.postSlug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-stone-300 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {comment.postSlug}
                    </a>
                  </div>
                </div>

                {/* Delete button */}
                <button
                  onClick={() => handleDelete(comment.id)}
                  disabled={deleting === comment.id}
                  className="p-2 text-stone-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors shrink-0"
                  title="Delete comment"
                >
                  {deleting === comment.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}

          {/* Pagination */}
          {data.totalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <span className="text-xs text-stone-500">
                Page {data.page} of {data.totalPages}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page <= 1}
                  className="p-1.5 rounded-md text-stone-400 hover:text-stone-200 disabled:opacity-30 bg-stone-800/50 border border-stone-700/40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= data.totalPages}
                  className="p-1.5 rounded-md text-stone-400 hover:text-stone-200 disabled:opacity-30 bg-stone-800/50 border border-stone-700/40 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-stone-900/60 border border-stone-800/60 rounded-xl p-12 text-center">
          <MessageSquare className="w-10 h-10 text-stone-700 mx-auto mb-4" />
          <p className="text-stone-500 text-sm">
            No comments yet. Comments will appear here as users post them on blog articles.
          </p>
        </div>
      )}
    </div>
  );
}
