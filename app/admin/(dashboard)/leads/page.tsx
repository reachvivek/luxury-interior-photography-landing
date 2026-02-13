"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Users,
  Loader2,
  Search,
  ChevronLeft,
  ChevronRight,
  Trash2,
  StickyNote,
  X,
  Flame,
  Snowflake,
  PhoneForwarded,
  CheckCircle2,
  XCircle,
  Sparkles,
  ThermometerSun,
} from "lucide-react";
import { useToast } from "@/components/shared/Toast";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  projectType: string | null;
  message: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

const STATUSES = [
  { value: "new", label: "New", color: "bg-blue-500", text: "text-blue-400", icon: Sparkles },
  { value: "hot", label: "Hot", color: "bg-red-500", text: "text-red-400", icon: Flame },
  { value: "warm", label: "Warm", color: "bg-amber-500", text: "text-amber-400", icon: ThermometerSun },
  { value: "cold", label: "Cold", color: "bg-sky-500", text: "text-sky-400", icon: Snowflake },
  { value: "follow_up", label: "Follow Up", color: "bg-purple-500", text: "text-purple-400", icon: PhoneForwarded },
  { value: "converted", label: "Converted", color: "bg-emerald-500", text: "text-emerald-400", icon: CheckCircle2 },
  { value: "lost", label: "Lost", color: "bg-stone-500", text: "text-stone-500", icon: XCircle },
];

function getStatus(value: string) {
  return STATUSES.find((s) => s.value === value) || STATUSES[0];
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

export default function LeadsPage() {
  const { showToast } = useToast();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Expanded lead & notes editing
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [notesValue, setNotesValue] = useState("");

  // Delete modal
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const limit = 20;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (statusFilter) params.set("status", statusFilter);
    if (search) params.set("search", search);
    try {
      const res = await fetch(`/api/admin/leads?${params}`);
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads);
        setTotal(data.total);
        setCounts(data.counts);
      }
    } catch {} finally {
      setLoading(false);
    }
  }, [page, statusFilter, search]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleSearch = (value: string) => {
    setSearchInput(value);
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      setSearch(value);
      setPage(1);
    }, 300);
  };

  const updateStatus = async (id: string, status: string) => {
    const res = await fetch("/api/admin/leads", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
      showToast(`Status updated to ${getStatus(status).label}`);
      // Refresh counts
      fetchLeads();
    }
  };

  const saveNotes = async (id: string) => {
    const res = await fetch("/api/admin/leads", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, notes: notesValue }),
    });
    if (res.ok) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes: notesValue } : l)));
      setEditingNotes(null);
      showToast("Notes saved");
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    const res = await fetch(`/api/admin/leads?id=${deleteId}`, { method: "DELETE" });
    if (res.ok) {
      setLeads((prev) => prev.filter((l) => l.id !== deleteId));
      setTotal((t) => t - 1);
      setDeleteId(null);
      showToast("Lead deleted");
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / limit));
  const totalAll = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Users className="w-6 h-6 text-stone-400" />
            <h1 className="text-2xl font-serif font-light text-stone-100">Leads</h1>
            <span className="text-sm text-stone-500">({totalAll})</span>
          </div>
          <p className="text-sm text-stone-400">Track and manage enquiries from the contact form</p>
        </div>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search leads..."
            className="pl-8 pr-3 py-2 text-xs bg-stone-800/60 border border-stone-700/40 rounded-lg text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-stone-600 w-64"
          />
        </div>
      </div>

      {/* Status filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { setStatusFilter(""); setPage(1); }}
          className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
            !statusFilter
              ? "bg-white text-stone-900 font-medium"
              : "text-stone-400 hover:text-stone-200 bg-stone-800/50 border border-stone-700/40"
          }`}
        >
          All ({totalAll})
        </button>
        {STATUSES.map((s) => {
          const Icon = s.icon;
          return (
            <button
              key={s.value}
              onClick={() => { setStatusFilter(s.value); setPage(1); }}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all flex items-center gap-1.5 ${
                statusFilter === s.value
                  ? "bg-white text-stone-900 font-medium"
                  : "text-stone-400 hover:text-stone-200 bg-stone-800/50 border border-stone-700/40"
              }`}
            >
              <Icon className="w-3 h-3" />
              {s.label} ({counts[s.value] || 0})
            </button>
          );
        })}
      </div>

      {/* Leads table */}
      <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl overflow-hidden">
        {loading && leads.length === 0 ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-5 h-5 animate-spin text-stone-400" />
          </div>
        ) : leads.length === 0 ? (
          <div className="py-16 text-center text-stone-500 text-sm">
            {search ? `No leads matching "${search}"` : "No leads yet"}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-stone-500 border-b border-stone-800/60">
                  <th className="text-left py-3 px-4 font-medium">Contact</th>
                  <th className="text-left py-3 px-4 font-medium">Project</th>
                  <th className="text-left py-3 px-4 font-medium">Message</th>
                  <th className="text-left py-3 px-4 font-medium">Status</th>
                  <th className="text-left py-3 px-4 font-medium">Time</th>
                  <th className="text-right py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const status = getStatus(lead.status);
                  const StatusIcon = status.icon;
                  const isExpanded = expandedId === lead.id;

                  return (
                    <tr
                      key={lead.id}
                      className={`border-b border-stone-800/30 last:border-0 hover:bg-stone-800/20 transition-colors cursor-pointer ${
                        lead.status === "new" ? "bg-blue-500/5" : ""
                      }`}
                      onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                    >
                      <td className="py-3 px-4">
                        <div className="text-stone-200 font-medium">{lead.name}</div>
                        <div className="text-stone-500">{lead.email}</div>
                        {lead.phone && <div className="text-stone-600">{lead.phone}</div>}
                      </td>
                      <td className="py-3 px-4 text-stone-400">
                        {lead.projectType || "—"}
                      </td>
                      <td className="py-3 px-4 text-stone-400 max-w-[250px]">
                        <p className={isExpanded ? "" : "line-clamp-2"}>{lead.message}</p>
                        {lead.notes && !isExpanded && (
                          <p className="text-stone-600 mt-1 flex items-center gap-1">
                            <StickyNote className="w-3 h-3" /> Has notes
                          </p>
                        )}
                        {isExpanded && (
                          <div className="mt-3 space-y-2" onClick={(e) => e.stopPropagation()}>
                            {editingNotes === lead.id ? (
                              <div className="space-y-2">
                                <textarea
                                  value={notesValue}
                                  onChange={(e) => setNotesValue(e.target.value)}
                                  rows={3}
                                  className="w-full text-xs text-stone-300 bg-stone-800/80 border border-stone-700/40 rounded-lg px-3 py-2 focus:outline-none focus:border-stone-600 resize-y"
                                  placeholder="Add notes about this lead..."
                                />
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => saveNotes(lead.id)}
                                    className="px-3 py-1 text-[11px] bg-white text-stone-900 rounded-md font-medium"
                                  >
                                    Save
                                  </button>
                                  <button
                                    onClick={() => setEditingNotes(null)}
                                    className="px-3 py-1 text-[11px] text-stone-400 hover:text-stone-200"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => { setEditingNotes(lead.id); setNotesValue(lead.notes || ""); }}
                                className="flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-stone-300 transition-colors"
                              >
                                <StickyNote className="w-3 h-3" />
                                {lead.notes ? "Edit notes" : "Add notes"}
                              </button>
                            )}
                            {lead.notes && editingNotes !== lead.id && (
                              <p className="text-stone-500 text-[11px] bg-stone-800/40 rounded-lg px-3 py-2 italic">
                                {lead.notes}
                              </p>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative group">
                          <button className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium ${status.text} bg-stone-800/60 border border-stone-700/40 hover:border-stone-600 transition-colors`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </button>
                          {/* Dropdown on hover */}
                          <div className="absolute left-0 top-full mt-1 w-36 bg-stone-900 border border-stone-700/60 rounded-lg shadow-xl z-20 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity">
                            {STATUSES.map((s) => {
                              const SIcon = s.icon;
                              return (
                                <button
                                  key={s.value}
                                  onClick={() => updateStatus(lead.id, s.value)}
                                  className={`w-full text-left flex items-center gap-2 px-3 py-2 text-[11px] hover:bg-stone-800/60 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                                    lead.status === s.value ? "text-stone-200 font-medium" : "text-stone-400"
                                  }`}
                                >
                                  <SIcon className="w-3 h-3" />
                                  {s.label}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-stone-500 whitespace-nowrap">
                        {timeAgo(lead.createdAt)}
                      </td>
                      <td className="py-3 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setDeleteId(lead.id)}
                          className="p-1.5 text-stone-600 hover:text-red-400 rounded-md hover:bg-stone-800/60 transition-colors"
                          title="Delete lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {total > limit && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-stone-800/40">
            <span className="text-[11px] text-stone-500">
              {((page - 1) * limit) + 1}–{Math.min(page * limit, total)} of {total}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page <= 1}
                className="p-1 rounded-md text-stone-400 hover:text-stone-200 disabled:opacity-30 bg-stone-800/50 border border-stone-700/40 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 text-xs text-stone-300">{page} / {totalPages}</span>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= totalPages}
                className="p-1 rounded-md text-stone-400 hover:text-stone-200 disabled:opacity-30 bg-stone-800/50 border border-stone-700/40 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700/60 rounded-xl shadow-2xl w-full max-w-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-stone-200">Delete Lead</h3>
              <button onClick={() => setDeleteId(null)} className="text-stone-500 hover:text-stone-300">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-stone-400 mb-6">This will permanently remove this lead. This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-xs text-stone-400 hover:text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
