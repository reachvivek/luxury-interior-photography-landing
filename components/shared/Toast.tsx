"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, X } from "lucide-react";

interface ToastContextValue {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ showToast: () => {} });

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<string | null>(null);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string) => {
    if (timer) clearTimeout(timer);
    setToast(message);
    const t = setTimeout(() => setToast(null), 3000);
    setTimer(t);
  }, [timer]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast UI */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2.5 px-5 py-3 bg-stone-900 text-white rounded-full shadow-lg text-sm font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          {toast}
          <button
            onClick={() => { if (timer) clearTimeout(timer); setToast(null); }}
            className="ml-1 p-0.5 text-stone-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </ToastContext.Provider>
  );
}
