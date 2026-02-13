"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { Loader2, MessageCircle, LogOut, Pencil, Trash2, X, Check } from "lucide-react";
import { signOut } from "next-auth/react";
import AuthModal from "@/components/AuthModal";
import Image from "next/image";
import { useToast } from "@/components/shared/Toast";

interface DBComment {
  id: string;
  content: string;
  postSlug: string;
  createdAt: string;
  user: { id: string; name: string | null; image: string | null };
}

// Keep old props compatible so existing static comments still render
interface CommentsSectionProps {
  slug: string;
  comments?: { id?: number; author: string; role?: string; content: string; date: string; likes: number }[];
}

export default function CommentsSection({ slug, comments: staticComments }: CommentsSectionProps) {
  const { data: session, status } = useSession();
  const [dbComments, setDbComments] = useState<DBComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const [content, setContent] = useState("");
  const [posting, setPosting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const { showToast } = useToast();

  const fetchComments = useCallback(async () => {
    try {
      const res = await fetch(`/api/comments?slug=${encodeURIComponent(slug)}`);
      if (res.ok) setDbComments(await res.json());
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setPosting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim(), postSlug: slug }),
      });
      if (res.ok) {
        setContent("");
        fetchComments();
        showToast("Comment posted successfully");
      }
    } finally {
      setPosting(false);
    }
  };

  const handleEdit = async (id: string) => {
    if (!editContent.trim()) return;
    setActionLoading(id);
    try {
      const res = await fetch("/api/comments", {
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
      const res = await fetch(`/api/comments?id=${deleteId}`, { method: "DELETE" });
      if (res.ok) {
        fetchComments();
        showToast("Comment deleted");
      }
    } finally {
      setActionLoading(null);
      setDeleteId(null);
    }
  };

  const getInitials = (name: string): string =>
    name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const getAvatarColor = (name: string): string => {
    const colors = ["bg-blue-500", "bg-green-500", "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500", "bg-orange-500", "bg-rose-500"];
    return colors[name.length % colors.length];
  };

  const timeAgo = (dateStr: string): string => {
    const now = Date.now();
    const diff = now - new Date(dateStr).getTime();
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const totalComments = dbComments.length + (staticComments?.length || 0);

  return (
    <section className="py-16 md:py-20 px-6 md:px-16 bg-stone-50">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-10 md:mb-12">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="w-px h-12 md:h-16 bg-gradient-to-b from-transparent via-stone-300 to-transparent" />
          </div>
          <h2 className="text-2xl md:text-3xl font-serif font-light text-stone-900 text-center mb-2">
            Comments
          </h2>
          <p className="text-sm text-stone-500 text-center">
            {totalComments} {totalComments === 1 ? "comment" : "comments"}
          </p>
        </div>

        {/* Comment Form / Auth Prompt */}
        <div className="mb-10 bg-white rounded-xl p-6 md:p-8 shadow-sm border border-stone-200">
          {status === "loading" ? (
            <div className="flex justify-center py-4">
              <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
            </div>
          ) : session?.user ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || ""}
                      width={36}
                      height={36}
                      className="rounded-full"
                    />
                  ) : (
                    <div className={`w-9 h-9 rounded-full ${getAvatarColor(session.user.name || "U")} flex items-center justify-center text-white text-xs font-medium`}>
                      {getInitials(session.user.name || "U")}
                    </div>
                  )}
                  <span className="text-sm font-medium text-stone-700">{session.user.name}</span>
                </div>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1 text-xs text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <LogOut className="w-3 h-3" />
                  Sign out
                </button>
              </div>
              <form onSubmit={handlePost}>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts..."
                  rows={3}
                  maxLength={2000}
                  className="w-full px-4 py-3 border border-stone-200 rounded-xl text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-400 transition-colors resize-none"
                />
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-stone-400">{content.length}/2000</span>
                  <button
                    type="submit"
                    disabled={!content.trim() || posting}
                    className="flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-stone-800 disabled:opacity-40 transition-colors"
                  >
                    {posting ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageCircle className="w-4 h-4" />}
                    Post Comment
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm text-stone-600 mb-4">
                Sign in to join the conversation
              </p>
              <button
                onClick={() => setShowAuth(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white hover:bg-stone-800 transition-colors text-sm font-medium tracking-wider uppercase rounded-full"
              >
                <MessageCircle className="w-4 h-4" />
                Sign in to Comment
              </button>
            </div>
          )}
        </div>

        {/* DB Comments */}
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
          </div>
        ) : (
          <div className="space-y-6">
            {dbComments.map((comment) => (
              <article key={comment.id} className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-stone-200">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden self-start">
                    {comment.user.image ? (
                      <Image
                        src={comment.user.image}
                        alt={comment.user.name || ""}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className={`w-full h-full ${getAvatarColor(comment.user.name || "U")} flex items-center justify-center text-white font-medium text-sm`}>
                        {getInitials(comment.user.name || "U")}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-medium text-stone-900">{comment.user.name}</h3>
                      <div className="flex items-center gap-2">
                        <time className="text-xs text-stone-400 whitespace-nowrap" title={new Date(comment.createdAt).toLocaleString()}>
                          {timeAgo(comment.createdAt)}
                        </time>
                        {session?.user?.id === comment.user.id && editingId !== comment.id && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => { setEditingId(comment.id); setEditContent(comment.content); }}
                              className="p-1 text-stone-400 hover:text-stone-600 transition-colors rounded"
                              title="Edit"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteId(comment.id)}
                              disabled={actionLoading === comment.id}
                              className="p-1 text-stone-400 hover:text-red-500 transition-colors rounded"
                              title="Delete"
                            >
                              {actionLoading === comment.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    {editingId === comment.id ? (
                      <div>
                        <textarea
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          rows={3}
                          maxLength={2000}
                          className="w-full px-3 py-2 border border-stone-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:border-stone-400 resize-none"
                        />
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => handleEdit(comment.id)}
                            disabled={!editContent.trim() || actionLoading === comment.id}
                            className="flex items-center gap-1 px-3 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-medium hover:bg-stone-800 disabled:opacity-40 transition-colors"
                          >
                            {actionLoading === comment.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                            Save
                          </button>
                          <button
                            onClick={() => { setEditingId(null); setEditContent(""); }}
                            className="flex items-center gap-1 px-3 py-1.5 text-stone-500 hover:text-stone-700 text-xs transition-colors"
                          >
                            <X className="w-3 h-3" />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm md:text-base text-stone-600 leading-relaxed">{comment.content}</p>
                    )}
                  </div>
                </div>
              </article>
            ))}

            {/* Static comments from data file (legacy) */}
            {staticComments?.map((comment, i) => (
              <article key={`static-${i}`} className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-stone-200">
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full ${getAvatarColor(comment.author)} flex items-center justify-center text-white font-medium text-sm`}>
                    {getInitials(comment.author)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-medium text-stone-900">{comment.author}</h3>
                        {comment.role && <p className="text-xs text-stone-500 mt-0.5">{comment.role}</p>}
                      </div>
                      <time className="text-xs text-stone-400 whitespace-nowrap">{comment.date}</time>
                    </div>
                    <p className="text-sm md:text-base text-stone-600 leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              </article>
            ))}

            {totalComments === 0 && !loading && (
              <p className="text-center text-sm text-stone-400 py-8">No comments yet. Be the first to share your thoughts!</p>
            )}
          </div>
        )}
      </div>

      {/* Auth Modal */}
      {showAuth && <AuthModal onClose={() => { setShowAuth(false); fetchComments(); }} />}

      {/* Delete Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setDeleteId(null)}>
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-500" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-stone-900 text-center mb-1">Delete comment?</h3>
            <p className="text-sm text-stone-500 text-center mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 px-4 py-2.5 border border-stone-200 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-50 transition-colors"
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
    </section>
  );
}
