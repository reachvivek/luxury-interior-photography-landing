"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  MessageSquare,
  Loader2,
  Trash2,
  Pencil,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  RefreshCw,
  ExternalLink,
  Search,
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

interface PostSummary {
  slug: string;
  count: number;
  latestAt: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatSlug(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminCommentsPage() {
  // Posts overview state
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [totalComments, setTotalComments] = useState(0);
  const [postsLoading, setPostsLoading] = useState(true);

  // Per-post comments state
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsTotal, setCommentsTotal] = useState(0);
  const [commentsPage, setCommentsPage] = useState(1);
  const [commentsTotalPages, setCommentsTotalPages] = useState(1);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Edit / delete state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { showToast } = useToast();

  // Fetch grouped posts overview
  const fetchPosts = useCallback(async () => {
    setPostsLoading(true);
    try {
      const res = await fetch("/api/admin/comments");
      if (res.ok) {
        const data = await res.json();
        setPosts(data.posts);
        setTotalComments(data.totalComments);
      }
    } finally {
      setPostsLoading(false);
    }
  }, []);

  // Fetch comments for a specific post
  const fetchComments = useCallback(async () => {
    if (!activeSlug) return;
    setCommentsLoading(true);
    try {
      const params = new URLSearchParams({ slug: activeSlug, page: String(commentsPage) });
      if (search) params.set("search", search);
      const res = await fetch(`/api/admin/comments?${params}`);
      if (res.ok) {
        const data = await res.json();
        setComments(data.comments);
        setCommentsTotal(data.total);
        setCommentsTotalPages(data.totalPages);
      }
    } finally {
      setCommentsLoading(false);
    }
  }, [activeSlug, commentsPage, search]);

  useEffect(() => { fetchPosts(); }, [fetchPosts]);
  useEffect(() => { if (activeSlug) fetchComments(); }, [fetchComments, activeSlug]);

  const openPost = (slug: string) => {
    setActiveSlug(slug);
    setCommentsPage(1);
    setSearch("");
    setEditingId(null);
  };

  const goBack = () => {
    setActiveSlug(null);
    setComments([]);
    setSearch("");
    setEditingId(null);
    fetchPosts();
  };

  const handleSearch = (value: string) => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
      setCommentsPage(1);
    }, 300);
  };

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
        fetchPosts();
        showToast("Comment deleted");
      }
    } finally {
      setActionLoading(null);
      setDeleteId(null);
    }
  };

  // ─── Posts overview ─────────────────────────────────
  if (!activeSlug) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <MessageSquare className="w-6 h-6 text-stone-400" />
              <h1 className="text-2xl font-serif font-light text-stone-100">Comments</h1>
            </div>
            <p className="text-sm text-stone-400">
              {totalComments} comment{totalComments !== 1 ? "s" : ""} across {posts.length} post{posts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <button
            onClick={fetchPosts}
            disabled={postsLoading}
            className="p-2 text-stone-400 hover:text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${postsLoading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {postsLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
          </div>
        ) : posts.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-stone-800/60">
            <table className="w-full">
              <thead>
                <tr className="bg-stone-900/80 border-b border-stone-800/60">
                  <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wider px-5 py-3">Blog Post</th>
                  <th className="text-center text-xs font-medium text-stone-400 uppercase tracking-wider px-5 py-3 w-28">Comments</th>
                  <th className="text-right text-xs font-medium text-stone-400 uppercase tracking-wider px-5 py-3 w-36">Latest</th>
                  <th className="w-16 px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr
                    key={post.slug}
                    className="border-b border-stone-800/40 last:border-0 hover:bg-stone-800/30 transition-colors cursor-pointer"
                    onClick={() => openPost(post.slug)}
                  >
                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-stone-200">{formatSlug(post.slug)}</span>
                      <span className="block text-xs text-stone-500 mt-0.5">/blog/{post.slug}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center justify-center min-w-[28px] px-2 py-0.5 bg-stone-800 text-stone-300 rounded-full text-xs font-medium">
                        {post.count}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <span className="text-xs text-stone-400" title={new Date(post.latestAt).toLocaleString()}>
                        {timeAgo(post.latestAt)}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-right">
                      <ChevronRight className="w-4 h-4 text-stone-600" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-stone-900/60 border border-stone-800/60 rounded-xl p-12 text-center">
            <MessageSquare className="w-10 h-10 text-stone-700 mx-auto mb-4" />
            <p className="text-stone-500 text-sm">No comments yet. Comments will appear here as users post them on blog articles.</p>
          </div>
        )}
      </div>
    );
  }

  // ─── Per-post comments ──────────────────────────────
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
      {/* Header with back button */}
      <div className="mb-6">
        <button onClick={goBack} className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-stone-200 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4" />
          All Posts
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-light text-stone-100">{formatSlug(activeSlug)}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-xs text-stone-500">{commentsTotal} comment{commentsTotal !== 1 ? "s" : ""}</span>
              <a
                href={`/blog/${activeSlug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-stone-500 hover:text-stone-300 transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                View post
              </a>
            </div>
          </div>
          <button
            onClick={fetchComments}
            disabled={commentsLoading}
            className="p-2 text-stone-400 hover:text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${commentsLoading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
        <input
          type="text"
          placeholder="Search by name, email, or content..."
          defaultValue=""
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-stone-900/60 border border-stone-800/60 rounded-xl text-sm text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-stone-600 transition-colors"
        />
      </div>

      {/* Comments table */}
      {commentsLoading && comments.length === 0 ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
        </div>
      ) : comments.length > 0 ? (
        <>
          <div className="overflow-hidden rounded-xl border border-stone-800/60">
            <table className="w-full">
              <thead>
                <tr className="bg-stone-900/80 border-b border-stone-800/60">
                  <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wider px-5 py-3">User</th>
                  <th className="text-left text-xs font-medium text-stone-400 uppercase tracking-wider px-5 py-3">Comment</th>
                  <th className="text-right text-xs font-medium text-stone-400 uppercase tracking-wider px-5 py-3 w-28">Time</th>
                  <th className="w-24 px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {comments.map((c) => (
                  <tr key={c.id} className="border-b border-stone-800/40 last:border-0 align-top">
                    {/* User */}
                    <td className="px-5 py-4 w-48">
                      <div className="flex items-center gap-2.5">
                        {c.user.image ? (
                          <img src={c.user.image} alt="" className="w-7 h-7 rounded-full shrink-0" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-stone-700 flex items-center justify-center text-stone-300 text-[10px] font-medium shrink-0">
                            {(c.user.name || "U")[0].toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0">
                          <span className="block text-sm font-medium text-stone-200 truncate">{c.user.name || "Anonymous"}</span>
                          {c.user.email && <span className="block text-[11px] text-stone-500 truncate">{c.user.email}</span>}
                        </div>
                      </div>
                    </td>

                    {/* Comment */}
                    <td className="px-5 py-4">
                      {editingId === c.id ? (
                        <div>
                          <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={2}
                            maxLength={2000}
                            className="w-full px-3 py-2 bg-stone-800/70 border border-stone-700/50 rounded-lg text-sm text-stone-200 focus:outline-none focus:border-stone-500 resize-none"
                          />
                          <div className="flex items-center gap-2 mt-1.5">
                            <button
                              onClick={() => handleEdit(c.id)}
                              disabled={!editContent.trim() || actionLoading === c.id}
                              className="flex items-center gap-1 px-2.5 py-1 bg-stone-200 text-stone-900 rounded-md text-xs font-medium hover:bg-white disabled:opacity-40 transition-colors"
                            >
                              {actionLoading === c.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                              Save
                            </button>
                            <button
                              onClick={() => { setEditingId(null); setEditContent(""); }}
                              className="flex items-center gap-1 px-2.5 py-1 text-stone-400 hover:text-stone-200 text-xs transition-colors"
                            >
                              <X className="w-3 h-3" />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-stone-300 leading-relaxed line-clamp-3">{c.content}</p>
                      )}
                    </td>

                    {/* Time */}
                    <td className="px-5 py-4 text-right">
                      <span className="text-xs text-stone-500 whitespace-nowrap" title={new Date(c.createdAt).toLocaleString()}>
                        {timeAgo(c.createdAt)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-4 text-right">
                      {editingId !== c.id && (
                        <div className="flex items-center justify-end gap-0.5">
                          <button
                            onClick={() => { setEditingId(c.id); setEditContent(c.content); }}
                            className="p-1.5 text-stone-500 hover:text-stone-200 hover:bg-stone-800 rounded-md transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteId(c.id)}
                            disabled={actionLoading === c.id}
                            className="p-1.5 text-stone-500 hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors"
                            title="Delete"
                          >
                            {actionLoading === c.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {commentsTotalPages > 1 && (
            <div className="flex items-center justify-between pt-4">
              <span className="text-xs text-stone-500">Page {commentsPage} of {commentsTotalPages}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCommentsPage((p) => p - 1)}
                  disabled={commentsPage <= 1}
                  className="p-1.5 rounded-md text-stone-400 hover:text-stone-200 disabled:opacity-30 bg-stone-800/50 border border-stone-700/40 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCommentsPage((p) => p + 1)}
                  disabled={commentsPage >= commentsTotalPages}
                  className="p-1.5 rounded-md text-stone-400 hover:text-stone-200 disabled:opacity-30 bg-stone-800/50 border border-stone-700/40 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="bg-stone-900/60 border border-stone-800/60 rounded-xl p-10 text-center">
          <p className="text-stone-500 text-sm">{search ? "No comments matching your search." : "No comments on this post yet."}</p>
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
