"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import {
  Users,
  Search,
  Loader2,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  Chrome,
  KeyRound,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/components/shared/Toast";

interface UserRecord {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  emailVerified: string | null;
  createdAt: string;
  accounts: { provider: string }[];
  _count: { comments: number; sessions: number };
}

interface UsersResponse {
  users: UserRecord[];
  total: number;
  counts: { all: number; google: number; credentials: number };
}

const LIMIT = 20;

export default function UsersAdminPage() {
  const [data, setData] = useState<UsersResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { showToast } = useToast();

  const fetchUsers = useCallback(
    async (p: number, s: string, prov: string | null) => {
      setLoading(true);
      try {
        const params = new URLSearchParams({ page: String(p), limit: String(LIMIT) });
        if (s) params.set("search", s);
        if (prov) params.set("provider", prov);
        const res = await fetch(`/api/admin/users?${params}`);
        if (!res.ok) throw new Error();
        const json: UsersResponse = await res.json();
        setData(json);
      } catch {
        showToast("Failed to load users");
      } finally {
        setLoading(false);
      }
    },
    [showToast]
  );

  useEffect(() => {
    fetchUsers(page, search, provider);
  }, [page, provider, fetchUsers, search]);

  const handleSearch = (val: string) => {
    setSearch(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setPage(1);
      fetchUsers(1, val, provider);
    }, 300);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/users?id=${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      showToast("User deleted");
      setDeleteId(null);
      fetchUsers(page, search, provider);
    } catch {
      showToast("Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 1;

  const getProviderBadge = (user: UserRecord) => {
    const isGoogle = user.accounts.some((a) => a.provider === "google");
    if (isGoogle) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20">
          <Chrome className="w-3 h-3" />
          Google
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
        <KeyRound className="w-3 h-3" />
        Email
      </span>
    );
  };

  const filters = [
    { key: null, label: "All", count: data?.counts.all ?? 0 },
    { key: "google", label: "Google", count: data?.counts.google ?? 0 },
    { key: "credentials", label: "Email", count: data?.counts.credentials ?? 0 },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-stone-400" />
          <div>
            <h1 className="text-2xl font-serif font-light text-stone-100">
              Users
              {data && (
                <span className="ml-2 text-sm font-sans text-stone-500">
                  {data.counts.all}
                </span>
              )}
            </h1>
            <p className="text-sm text-stone-500">Signed-up users via Google OAuth or email</p>
          </div>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search name or email..."
            className="w-full text-sm text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-xl pl-9 pr-3 py-2 focus:border-stone-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {filters.map((f) => (
          <button
            key={f.key ?? "all"}
            onClick={() => { setProvider(f.key); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              provider === f.key
                ? "bg-stone-100 text-stone-900"
                : "bg-stone-800/60 text-stone-400 hover:bg-stone-800 hover:text-stone-300"
            }`}
          >
            {f.label}
            <span className="ml-1.5 text-[10px] opacity-60">{f.count}</span>
          </button>
        ))}
      </div>

      {/* Table */}
      {loading && !data ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
        </div>
      ) : !data?.users.length ? (
        <div className="text-center py-16 text-stone-500 text-sm">No users found</div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-stone-800/60">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-stone-800/60">
                <th className="text-left px-4 py-3 text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                  User
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-medium text-stone-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-medium text-stone-500 uppercase tracking-wider hidden sm:table-cell">
                  Comments
                </th>
                <th className="text-left px-4 py-3 text-[11px] font-medium text-stone-500 uppercase tracking-wider hidden md:table-cell">
                  Joined
                </th>
                <th className="w-12" />
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-stone-800/40 hover:bg-stone-800/20 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-stone-800">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name || ""}
                            width={32}
                            height={32}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="w-full h-full flex items-center justify-center text-xs font-semibold text-stone-400 bg-stone-800">
                            {(user.name || user.email || "U")[0].toUpperCase()}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-stone-200 font-medium truncate">
                          {user.name || "No name"}
                        </p>
                        <p className="text-stone-500 text-xs truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">{getProviderBadge(user)}</td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    {user._count.comments > 0 ? (
                      <span className="inline-flex items-center gap-1 text-stone-400 text-xs">
                        <MessageSquare className="w-3 h-3" />
                        {user._count.comments}
                      </span>
                    ) : (
                      <span className="text-stone-600 text-xs">0</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-stone-500 text-xs hidden md:table-cell">
                    {new Date(user.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDeleteId(user.id)}
                      className="p-1.5 text-stone-600 hover:text-red-400 rounded-lg hover:bg-stone-800/60 transition-colors"
                      title="Delete user"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {data && totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 text-xs text-stone-500">
          <span>
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="p-1.5 rounded-lg hover:bg-stone-800/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="p-1.5 rounded-lg hover:bg-stone-800/60 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-stone-900 border border-stone-800/60 rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-stone-200 font-medium">Delete User</h3>
              <button
                onClick={() => setDeleteId(null)}
                className="text-stone-500 hover:text-stone-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-stone-400 text-sm mb-6">
              This will permanently delete the user, their sessions, linked accounts, and comments.
              This cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm text-stone-400 hover:text-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-4 py-2 text-sm bg-red-500/20 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/30 transition-colors disabled:opacity-50"
              >
                {deleting ? (
                  <Loader2 className="w-4 h-4 animate-spin inline mr-1" />
                ) : null}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
