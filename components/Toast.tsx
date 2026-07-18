"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import Image from "next/image";

type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast: addToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-500 text-sm font-medium max-w-sm animate-slide-in ${
              t.type === "success"
                ? "bg-success-50 text-success-700 border border-success-500/20"
                : t.type === "error"
                ? "bg-red-50 text-red-500 border border-red-500/20"
                : "bg-white text-dark-100 border border-light-400"
            }`}
          >
            <Image
              src={
                t.type === "success"
                  ? "/assets/icons/check.svg"
                  : t.type === "error"
                  ? "/assets/icons/close.svg"
                  : "/assets/icons/info.svg"
              }
              alt={t.type}
              width={18}
              height={18}
            />
            <span className="flex-1">{t.message}</span>
            <button onClick={() => removeToast(t.id)} className="text-gray-100 hover:text-dark-100">
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
