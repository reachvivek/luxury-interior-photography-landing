"use client";

import { useState, useEffect, useCallback } from "react";
import {
  BarChart3,
  Loader2,
  Eye,
  Users,
  Monitor,
  Smartphone,
  Globe,
  TrendingUp,
  Clock,
  ExternalLink,
  RefreshCw,
  MessageCircle,
  Send,
  Target,
  ArrowRight,
  Search,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ConversionData {
  whatsappClicks: number;
  contactSubmits: number;
  totalConversions: number;
  conversionRate: string;
  byDay: { date: string; whatsapp: number; contact: number }[];
}

interface AnalyticsData {
  totalViews: number;
  uniqueVisitors: number;
  conversions: ConversionData;
  viewsByPage: { page: string; views: number }[];
  serviceViews: { page: string; views: number }[];
  viewsByDevice: { device: string; views: number }[];
  viewsByCountry: { country: string; views: number }[];
  viewsByDay: { date: string; views: number }[];
  topReferrers: { referrer: string; views: number }[];
  serviceCategoryViews: { category: string; views: number }[];
  recentViews: {
    path: string;
    device: string;
    browser: string;
    country: string;
    city: string;
    referrer: string;
    createdAt: string;
  }[];
  recentViewsTotal: number;
}

const DEVICE_ICONS: Record<string, typeof Monitor> = {
  Desktop: Monitor,
  Mobile: Smartphone,
  Tablet: Smartphone,
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [days, setDays] = useState(30);

  // Recent Activity table state
  const [rvSearch, setRvSearch] = useState("");
  const [rvPage, setRvPage] = useState(1);
  const [rvLimit] = useState(20);
  const [rvSort, setRvSort] = useState("createdAt");
  const [rvOrder, setRvOrder] = useState<"asc" | "desc">("desc");
  const [rvSearchInput, setRvSearchInput] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        days: String(days),
        rvPage: String(rvPage),
        rvLimit: String(rvLimit),
        rvSort,
        rvOrder,
      });
      if (rvSearch) params.set("rvSearch", rvSearch);
      const res = await fetch(`/api/admin/analytics?${params}`);
      if (!res.ok) throw new Error("Failed to fetch");
      setData(await res.json());
    } catch {
      setError("Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  }, [days, rvPage, rvLimit, rvSearch, rvSort, rvOrder]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSort = (column: string) => {
    if (rvSort === column) {
      setRvOrder(rvOrder === "asc" ? "desc" : "asc");
    } else {
      setRvSort(column);
      setRvOrder(column === "createdAt" ? "desc" : "asc");
    }
    setRvPage(1);
  };

  const handleSearch = () => {
    setRvSearch(rvSearchInput);
    setRvPage(1);
  };

  const totalPages = data ? Math.max(1, Math.ceil(data.recentViewsTotal / rvLimit)) : 1;

  const SortIcon = ({ column }: { column: string }) => {
    if (rvSort !== column) return <ChevronsUpDown className="w-3 h-3 opacity-40" />;
    return rvOrder === "asc" ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />;
  };

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
      </div>
    );
  }

  const maxDayViews = data ? Math.max(...data.viewsByDay.map((d) => d.views), 1) : 1;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <BarChart3 className="w-6 h-6 text-stone-400" />
            <h1 className="text-2xl font-serif font-light text-stone-100">Analytics</h1>
          </div>
          <p className="text-sm text-stone-400">
            Track visitors, conversions, and traffic sources
          </p>
        </div>
        <div className="flex items-center gap-2">
          {[7, 14, 30, 90].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1.5 text-xs rounded-lg transition-all ${
                days === d
                  ? "bg-white text-stone-900 font-medium"
                  : "text-stone-400 hover:text-stone-200 bg-stone-800/50 border border-stone-700/40"
              }`}
            >
              {d}d
            </button>
          ))}
          <button
            onClick={fetchData}
            disabled={loading}
            className="p-2 text-stone-400 hover:text-stone-200 bg-stone-800/50 border border-stone-700/40 rounded-lg transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {data && (
        <>
          {/* Conversion Cards — Most Important */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard
              icon={MessageCircle}
              label="WhatsApp Clicks"
              value={data.conversions.whatsappClicks.toLocaleString()}
              color="text-green-400"
              accent="bg-green-400/10 border-green-400/20"
            />
            <StatCard
              icon={Send}
              label="Form Submits"
              value={data.conversions.contactSubmits.toLocaleString()}
              color="text-blue-400"
              accent="bg-blue-400/10 border-blue-400/20"
            />
            <StatCard
              icon={Target}
              label="Conversion Rate"
              value={`${data.conversions.conversionRate}%`}
              color="text-amber-400"
              accent="bg-amber-400/10 border-amber-400/20"
            />
            <StatCard
              icon={TrendingUp}
              label="Total Leads"
              value={data.conversions.totalConversions.toLocaleString()}
              color="text-purple-400"
              accent="bg-purple-400/10 border-purple-400/20"
            />
          </div>

          {/* Traffic Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={Eye}
              label="Page Views"
              value={data.totalViews.toLocaleString()}
              color="text-stone-300"
            />
            <StatCard
              icon={Users}
              label="Unique Visitors"
              value={data.uniqueVisitors.toLocaleString()}
              color="text-stone-300"
            />
            <StatCard
              icon={TrendingUp}
              label="Avg Views/Day"
              value={days > 0 ? Math.round(data.totalViews / days).toLocaleString() : "0"}
              color="text-stone-300"
            />
            <StatCard
              icon={Globe}
              label="Countries"
              value={data.viewsByCountry.length.toString()}
              color="text-stone-300"
            />
          </div>

          {/* Views Chart */}
          <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5 mb-6">
            <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-widest mb-4">
              Views Over Time
            </h2>
            <div className="flex items-end gap-[2px] h-40">
              {data.viewsByDay.map((day) => (
                <div
                  key={day.date}
                  className="flex-1 group relative"
                  title={`${day.date}: ${day.views} views`}
                >
                  <div
                    className="w-full bg-blue-500/60 hover:bg-blue-400/80 rounded-t transition-colors min-h-[2px]"
                    style={{ height: `${(day.views / maxDayViews) * 100}%` }}
                  />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-stone-800 border border-stone-700/60 rounded text-[10px] text-stone-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    {day.date}: {day.views}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-[10px] text-stone-600">
              <span>{data.viewsByDay[0]?.date}</span>
              <span>{data.viewsByDay[data.viewsByDay.length - 1]?.date}</span>
            </div>
          </div>

          {/* Service Donut + Top Pages */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            {/* Service Category Donut Chart */}
            <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-widest mb-4">
                Service Page Traffic
              </h2>
              {data.serviceCategoryViews.length > 0 ? (() => {
                const COLORS = ["#34d399", "#60a5fa", "#fbbf24", "#c084fc"];
                const total = data.serviceCategoryViews.reduce((a, c) => a + c.views, 0);
                const R = 60, STROKE = 18, C = 2 * Math.PI * R;
                let offset = 0;
                const segments = data.serviceCategoryViews.map((cat, i) => {
                  const pct = total > 0 ? cat.views / total : 0;
                  const dash = pct * C;
                  const seg = { ...cat, pct, color: COLORS[i % COLORS.length], dashArray: `${dash} ${C - dash}`, dashOffset: -offset };
                  offset += dash;
                  return seg;
                });
                return (
                  <div className="flex items-center gap-6">
                    {/* Donut */}
                    <div className="relative shrink-0">
                      <svg width="160" height="160" viewBox="0 0 160 160">
                        <circle cx="80" cy="80" r={R} fill="none" stroke="#292524" strokeWidth={STROKE} />
                        {segments.map((seg, i) => (
                          <circle
                            key={i}
                            cx="80" cy="80" r={R}
                            fill="none"
                            stroke={seg.color}
                            strokeWidth={STROKE}
                            strokeDasharray={seg.dashArray}
                            strokeDashoffset={seg.dashOffset}
                            strokeLinecap="butt"
                            transform="rotate(-90 80 80)"
                            className="transition-all duration-500"
                          />
                        ))}
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-light text-stone-100">{total}</span>
                        <span className="text-[9px] text-stone-500 uppercase tracking-wider">views</span>
                      </div>
                    </div>
                    {/* Legend */}
                    <div className="flex-1 space-y-3">
                      {segments.map((seg) => (
                        <div key={seg.category} className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: seg.color }} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-stone-300 truncate">{seg.category}</span>
                              <span className="text-xs text-stone-500 ml-2 shrink-0">{seg.views}</span>
                            </div>
                            <div className="h-1 bg-stone-800/60 rounded-full overflow-hidden mt-1">
                              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${seg.pct * 100}%`, backgroundColor: seg.color, opacity: 0.6 }} />
                            </div>
                          </div>
                          <span className="text-[10px] text-stone-600 w-8 text-right shrink-0">{Math.round(seg.pct * 100)}%</span>
                        </div>
                      ))}
                      {/* Funnel summary */}
                      <div className="pt-3 border-t border-stone-800/40 flex items-center gap-2 text-[10px] text-stone-500">
                        <span>{data.totalViews} visits</span>
                        <ArrowRight className="w-3 h-3" />
                        <span>{total} service</span>
                        <ArrowRight className="w-3 h-3" />
                        <span className="text-green-400">{data.conversions.totalConversions} leads</span>
                      </div>
                    </div>
                  </div>
                );
              })() : (
                <p className="text-xs text-stone-600 text-center py-4">
                  No service page views yet
                </p>
              )}
            </div>

            {/* Top Pages */}
            <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-widest mb-4">
                Top Pages
              </h2>
              <div className="space-y-2">
                {data.viewsByPage.map((page, i) => (
                  <div key={page.page} className="flex items-center gap-3">
                    <span className="text-[10px] text-stone-600 w-5 text-right">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-stone-300 truncate font-mono">
                          {page.page}
                        </span>
                        <span className="text-xs text-stone-500 ml-2 shrink-0">
                          {page.views}
                        </span>
                      </div>
                      <div className="h-1 bg-stone-800/60 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500/50 rounded-full"
                          style={{
                            width: `${(page.views / (data.viewsByPage[0]?.views || 1)) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                {data.viewsByPage.length === 0 && (
                  <p className="text-xs text-stone-600 text-center py-4">No data yet</p>
                )}
              </div>
            </div>
          </div>

          {/* Devices + Countries + Referrers */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            {/* Devices */}
            <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-widest mb-4">
                Devices
              </h2>
              <div className="space-y-3">
                {data.viewsByDevice.map((d) => {
                  const Icon = DEVICE_ICONS[d.device || "Desktop"] || Monitor;
                  const pct = data.totalViews > 0 ? Math.round((d.views / data.totalViews) * 100) : 0;
                  return (
                    <div key={d.device} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-stone-500 shrink-0" />
                      <span className="text-sm text-stone-300 flex-1">{d.device}</span>
                      <span className="text-xs text-stone-500">{d.views}</span>
                      <span className="text-xs text-stone-400 w-10 text-right">{pct}%</span>
                    </div>
                  );
                })}
                {data.viewsByDevice.length === 0 && (
                  <p className="text-xs text-stone-600 text-center py-2">No data yet</p>
                )}
              </div>
            </div>

            {/* Countries */}
            <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-widest mb-4">
                Countries
              </h2>
              <div className="space-y-2">
                {data.viewsByCountry.map((c) => (
                  <div key={c.country} className="flex items-center justify-between">
                    <span className="text-sm text-stone-300">{c.country || "Unknown"}</span>
                    <span className="text-xs text-stone-500">{c.views}</span>
                  </div>
                ))}
                {data.viewsByCountry.length === 0 && (
                  <p className="text-xs text-stone-600 text-center py-4">No data yet</p>
                )}
              </div>
            </div>

            {/* Referrers */}
            <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
              <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-widest mb-4">
                Traffic Sources
              </h2>
              <div className="space-y-2">
                {data.topReferrers.map((r) => (
                  <div key={r.referrer} className="flex items-center gap-2">
                    <ExternalLink className="w-3 h-3 text-stone-600 shrink-0" />
                    <span className="text-xs text-stone-300 truncate flex-1 font-mono">
                      {r.referrer}
                    </span>
                    <span className="text-xs text-stone-500 shrink-0">{r.views}</span>
                  </div>
                ))}
                {data.topReferrers.length === 0 && (
                  <p className="text-xs text-stone-600 text-center py-4">
                    No referrer data yet — visitors are coming directly
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-stone-900/60 border border-stone-800/60 rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <h2 className="text-sm font-semibold text-stone-300 uppercase tracking-widest">
                <Clock className="w-4 h-4 inline mr-2 opacity-60" />
                Recent Activity
                <span className="ml-2 text-stone-500 font-normal normal-case tracking-normal">
                  ({data.recentViewsTotal.toLocaleString()} total)
                </span>
              </h2>
              <form
                onSubmit={(e) => { e.preventDefault(); handleSearch(); }}
                className="flex items-center gap-2"
              >
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500" />
                  <input
                    type="text"
                    value={rvSearchInput}
                    onChange={(e) => setRvSearchInput(e.target.value)}
                    placeholder="Search pages, devices, locations..."
                    className="pl-8 pr-3 py-1.5 text-xs bg-stone-800/60 border border-stone-700/40 rounded-lg text-stone-300 placeholder:text-stone-600 focus:outline-none focus:border-stone-600 w-64"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs bg-stone-800/50 border border-stone-700/40 rounded-lg text-stone-400 hover:text-stone-200 transition-colors"
                >
                  Search
                </button>
                {rvSearch && (
                  <button
                    type="button"
                    onClick={() => { setRvSearchInput(""); setRvSearch(""); setRvPage(1); }}
                    className="px-2 py-1.5 text-xs text-stone-500 hover:text-stone-300 transition-colors"
                  >
                    Clear
                  </button>
                )}
              </form>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-stone-500 border-b border-stone-800/60">
                    {[
                      { key: "path", label: "Page" },
                      { key: "device", label: "Device" },
                      { key: "country", label: "Location" },
                      { key: "referrer", label: "Source" },
                      { key: "createdAt", label: "Time" },
                    ].map((col) => (
                      <th
                        key={col.key}
                        onClick={() => handleSort(col.key)}
                        className="text-left py-2 pr-4 font-medium cursor-pointer hover:text-stone-300 transition-colors select-none"
                      >
                        <span className="inline-flex items-center gap-1">
                          {col.label}
                          <SortIcon column={col.key} />
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.recentViews.map((view, i) => (
                    <tr key={i} className="border-b border-stone-800/30 last:border-0">
                      <td className="py-2 pr-4 text-stone-300 font-mono truncate max-w-[200px]">
                        {view.path}
                      </td>
                      <td className="py-2 pr-4 text-stone-400">{view.device}</td>
                      <td className="py-2 pr-4 text-stone-400">
                        {[view.city, view.country].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="py-2 pr-4 text-stone-500 truncate max-w-[150px] font-mono">
                        {view.referrer || "Direct"}
                      </td>
                      <td className="py-2 text-stone-500 whitespace-nowrap">
                        {new Date(view.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                  {data.recentViews.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-stone-600">
                        {rvSearch
                          ? `No results for "${rvSearch}"`
                          : "No views recorded yet. Analytics will appear as visitors browse the site."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {data.recentViewsTotal > rvLimit && (
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-800/40">
                <span className="text-[11px] text-stone-500">
                  Showing {((rvPage - 1) * rvLimit) + 1}–{Math.min(rvPage * rvLimit, data.recentViewsTotal)} of {data.recentViewsTotal.toLocaleString()}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setRvPage(1)}
                    disabled={rvPage <= 1}
                    className="px-2 py-1 text-xs rounded-md text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed bg-stone-800/50 border border-stone-700/40 transition-colors"
                  >
                    First
                  </button>
                  <button
                    onClick={() => setRvPage(rvPage - 1)}
                    disabled={rvPage <= 1}
                    className="p-1 rounded-md text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed bg-stone-800/50 border border-stone-700/40 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1 text-xs text-stone-300">
                    {rvPage} / {totalPages}
                  </span>
                  <button
                    onClick={() => setRvPage(rvPage + 1)}
                    disabled={rvPage >= totalPages}
                    className="p-1 rounded-md text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed bg-stone-800/50 border border-stone-700/40 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setRvPage(totalPages)}
                    disabled={rvPage >= totalPages}
                    className="px-2 py-1 text-xs rounded-md text-stone-400 hover:text-stone-200 disabled:opacity-30 disabled:cursor-not-allowed bg-stone-800/50 border border-stone-700/40 transition-colors"
                  >
                    Last
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  accent,
}: {
  icon: typeof Eye;
  label: string;
  value: string;
  color: string;
  accent?: string;
}) {
  return (
    <div className={`rounded-2xl p-5 ${accent || "bg-stone-900/60 border border-stone-800/60"}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-4 h-4 ${color}`} />
        <span className="text-[10px] uppercase tracking-widest text-stone-500">{label}</span>
      </div>
      <p className="text-2xl font-light text-stone-100">{value}</p>
    </div>
  );
}
