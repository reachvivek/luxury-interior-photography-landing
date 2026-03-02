"use client";

import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  loading?: boolean;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  loading = false,
}: ConfirmModalProps) {
  const confirmRef = useRef<HTMLButtonElement>(null);

  // Focus confirm button on open, close on Escape
  useEffect(() => {
    if (!open) return;
    confirmRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const variantStyles = {
    danger: {
      icon: "text-red-400",
      iconBg: "bg-red-400/10",
      confirm: "bg-red-500 hover:bg-red-600 text-white",
    },
    warning: {
      icon: "text-amber-400",
      iconBg: "bg-amber-400/10",
      confirm: "bg-amber-500 hover:bg-amber-600 text-white",
    },
    default: {
      icon: "text-stone-400",
      iconBg: "bg-stone-700/50",
      confirm: "bg-white hover:bg-stone-100 text-stone-900",
    },
  }[variant];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        className="bg-stone-900 border border-stone-700/60 rounded-2xl w-full max-w-sm shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-full ${variantStyles.iconBg} flex items-center justify-center mb-4`}>
            <AlertTriangle className={`w-5 h-5 ${variantStyles.icon}`} />
          </div>

          {/* Text */}
          <h3 className="text-base font-medium text-stone-100 mb-1.5">{title}</h3>
          <p className="text-sm text-stone-400 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 text-xs font-medium text-stone-400 hover:text-stone-200 bg-stone-800 hover:bg-stone-700 border border-stone-700/40 rounded-lg transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            ref={confirmRef}
            onClick={onConfirm}
            disabled={loading}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors disabled:opacity-50 ${variantStyles.confirm}`}
          >
            {loading ? "..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
