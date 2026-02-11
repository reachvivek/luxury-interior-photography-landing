"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Settings,
  Save,
  Loader2,
  Check,
  Globe,
  Phone,
  Clock,
  Search,
} from "lucide-react";

interface SiteSettings {
  site: {
    name: string;
    description: string;
    url: string;
    locale: string;
  };
  contact: {
    whatsapp: string;
    instagram: string;
    location: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  seo: {
    twitterHandle: string;
    themeColor: string;
    ogImage: string;
  };
}

const DEFAULT_SETTINGS: SiteSettings = {
  site: { name: "", description: "", url: "", locale: "en_US" },
  contact: { whatsapp: "", instagram: "", location: "" },
  hours: { weekdays: "", saturday: "", sunday: "" },
  seo: { twitterHandle: "", themeColor: "#1c1917", ogImage: "" },
};

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-stone-800/60 bg-stone-900/30 p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="text-stone-500">{icon}</div>
        <h2 className="text-sm font-medium text-stone-300">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="text-xs text-stone-500 mb-1 block">{label}</label>
      {rows ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          placeholder={placeholder}
          className="w-full text-sm text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none resize-y"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm text-stone-300 bg-stone-800/50 border border-stone-700/40 rounded-lg px-3 py-2 focus:border-stone-500 focus:outline-none"
        />
      )}
    </div>
  );
}

export default function SettingsAdminPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/content?section=settings")
      .then((r) => r.json())
      .then((res) => {
        if (res.data) {
          setSettings({ ...DEFAULT_SETTINGS, ...res.data });
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load settings");
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
      const res = await fetch("/api/admin/content?section=settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: settings }),
      });
      if (!res.ok) throw new Error("Save failed");
      setHasChanges(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      setError("Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const update = (
    section: keyof SiteSettings,
    field: string,
    value: string
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    markChanged();
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-stone-400" />
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Settings className="w-6 h-6 text-stone-400" />
            <h1 className="text-2xl font-serif font-light text-stone-100">
              Settings
            </h1>
          </div>
          <p className="text-sm text-stone-400">
            Site configuration, contact details, and SEO
          </p>
        </div>
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
          {saving ? "Saving..." : saved ? "Saved" : "Save Changes"}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Site Information */}
        <SectionCard
          icon={<Globe className="w-4 h-4" />}
          title="Site Information"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Site Name"
              value={settings.site.name}
              onChange={(v) => update("site", "name", v)}
            />
            <Field
              label="Site URL"
              value={settings.site.url}
              onChange={(v) => update("site", "url", v)}
              placeholder="https://..."
            />
          </div>
          <Field
            label="Site Description"
            value={settings.site.description}
            onChange={(v) => update("site", "description", v)}
            rows={3}
          />
          <Field
            label="Locale"
            value={settings.site.locale}
            onChange={(v) => update("site", "locale", v)}
            placeholder="en_US"
          />
        </SectionCard>

        {/* Contact Details */}
        <SectionCard
          icon={<Phone className="w-4 h-4" />}
          title="Contact Details"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="WhatsApp Number"
              value={settings.contact.whatsapp}
              onChange={(v) => update("contact", "whatsapp", v)}
              placeholder="971502060674"
            />
            <Field
              label="Instagram Handle"
              value={settings.contact.instagram}
              onChange={(v) => update("contact", "instagram", v)}
              placeholder="dubai.tsurov"
            />
          </div>
          <Field
            label="Location"
            value={settings.contact.location}
            onChange={(v) => update("contact", "location", v)}
            placeholder="Dubai, United Arab Emirates"
          />
        </SectionCard>

        {/* Working Hours */}
        <SectionCard
          icon={<Clock className="w-4 h-4" />}
          title="Working Hours"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Monday - Friday"
              value={settings.hours.weekdays}
              onChange={(v) => update("hours", "weekdays", v)}
              placeholder="9:00 AM - 6:00 PM"
            />
            <Field
              label="Saturday"
              value={settings.hours.saturday}
              onChange={(v) => update("hours", "saturday", v)}
              placeholder="10:00 AM - 4:00 PM"
            />
            <Field
              label="Sunday"
              value={settings.hours.sunday}
              onChange={(v) => update("hours", "sunday", v)}
              placeholder="Closed"
            />
          </div>
        </SectionCard>

        {/* SEO */}
        <SectionCard
          icon={<Search className="w-4 h-4" />}
          title="SEO & Social"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Field
              label="Twitter Handle"
              value={settings.seo.twitterHandle}
              onChange={(v) => update("seo", "twitterHandle", v)}
              placeholder="@myvisualspace"
            />
            <Field
              label="Theme Color"
              value={settings.seo.themeColor}
              onChange={(v) => update("seo", "themeColor", v)}
              placeholder="#1c1917"
            />
          </div>
          <Field
            label="OG Image Path"
            value={settings.seo.ogImage}
            onChange={(v) => update("seo", "ogImage", v)}
            placeholder="/images/og-image.jpg"
          />
        </SectionCard>
      </div>
    </div>
  );
}
