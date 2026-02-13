"use client";

import { useState, useEffect, useCallback } from "react";
import {
  MessageSquare,
  Loader2,
  Trash2,
  Pencil,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/components/shared/Toast";

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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();

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

  const handleEdit = async (id: string) => {
    if (!editContent.trim()) return;
    setActionLoading(id);
    try {
      const res = await fetch("/api/admin/comments", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, content: editContent.trim() }),
      });
      if (res.ok) {
        setEditingId(null);
        setEditContent("");
        fetchComments();
        showToast("Comment updated");
      }
    } finally {
      setActionLoading(null);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setActionLoading(deleteId);
    try {
      const res = await fetch(`/api/admin/comments?id=${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        fetchComments();
        showToast("Comment deleted");
      }
    } finally {
      setActionLoading(null);
      setDeleteId(null);
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

                  {/* Comment content — editable or static */}
                  {editingId === comment.id ? (
                    <div className="mb-3">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        maxLength={2000}
                        className="w-full px-3 py-2 bg-stone-800/70 border border-stone-700/50 rounded-lg text-sm text-stone-200 focus:outline-none focus:border-stone-500 resize-none"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => handleEdit(comment.id)}
                          disabled={!editContent.trim() || actionLoading === comment.id}
                          className="flex items-center gap-1 px-3 py-1.5 bg-stone-200 text-stone-900 rounded-lg text-xs font-medium hover:bg-white disabled:opacity-40 transition-colors"
                        >
                          {actionLoading === comment.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                          Save
                        </button>
                        <button
                          onClick={() => { setEditingId(null); setEditContent(""); }}
                          className="flex items-center gap-1 px-3 py-1.5 text-stone-400 hover:text-stone-200 text-xs transition-colors"
                        >
                          <X className="w-3 h-3" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-stone-300 leading-relaxed mb-3">
                      {comment.content}
                    </p>
                  )}

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

                {/* Action buttons */}
                {editingId !== comment.id && (
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => { setEditingId(comment.id); setEditContent(comment.content); }}
                      className="p-2 text-stone-500 hover:text-stone-200 hover:bg-stone-800 rounded-lg transition-colors"
                      title="Edit comment"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(comment.id)}
                      disabled={actionLoading === comment.id}
                      className="p-2 text-stone-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      title="Delete comment"
                    >
                      {actionLoading === comment.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}
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

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <div className="bg-stone-900 border border-stone-700/60 rounded-2xl p-6 md:p-8 shadow-xl max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-stone-100 text-center mb-1">Delete comment?</h3>
            <p className="text-sm text-stone-400 text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 border border-stone-700 text-stone-300 rounded-xl text-sm font-medium hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={actionLoading === deleteId}
                className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl text-sm font-medium hover:bg-red-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
              >
                {actionLoading === deleteId ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
