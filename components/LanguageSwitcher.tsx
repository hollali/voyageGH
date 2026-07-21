"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "~/lib/i18n/routing";
import { locales, localeNames, localeFlags } from "~/lib/i18n/config";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1.5 rounded-lg border border-light-400 text-sm font-medium text-dark-200 hover:bg-light-200 transition-colors flex items-center gap-1.5"
      >
        <Globe size={16} />
        <span>{localeFlags[locale as keyof typeof localeFlags]}</span>
        <span>{localeNames[locale as keyof typeof localeNames]}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 bg-white border border-light-400 rounded-xl shadow-lg z-50 py-1 min-w-[180px] max-h-[320px] overflow-y-auto"
          >
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-light-200 cursor-pointer transition-colors ${
                  loc === locale
                    ? "bg-primary-50 text-primary-100 font-medium"
                    : "text-dark-200"
                }`}
              >
                <span>{localeFlags[loc]}</span>
                <span>{localeNames[loc]}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
