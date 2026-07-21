"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrency } from "~/lib/currency";
import { motion, AnimatePresence } from "framer-motion";
import { DollarSign } from "lucide-react";

const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$" },
  { code: "EUR", name: "Euro", symbol: "€" },
  { code: "GBP", name: "British Pound", symbol: "£" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh" },
  { code: "ZAR", name: "South African Rand", symbol: "R" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$" },
  { code: "INR", name: "Indian Rupee", symbol: "₹" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "GH₵" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
];

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();
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

  function handleSelect(code: string) {
    setCurrency(code);
    setOpen(false);
  }

  const current = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-1.5 rounded-lg border border-light-400 text-sm font-medium text-dark-200 hover:bg-light-200 transition-colors flex items-center gap-1.5"
      >
        <DollarSign size={16} />
        <span>{current.symbol}</span>
        <span>{current.code}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 mt-1 bg-white border border-light-400 rounded-xl shadow-lg z-50 py-1 min-w-[200px] max-h-[320px] overflow-y-auto"
          >
            {CURRENCIES.map((cur) => (
              <button
                key={cur.code}
                onClick={() => handleSelect(cur.code)}
                className={`w-full px-3 py-2 text-sm flex items-center gap-2 hover:bg-light-200 cursor-pointer transition-colors ${
                  cur.code === currency
                    ? "bg-primary-50 text-primary-100 font-medium"
                    : "text-dark-200"
                }`}
              >
                <span>{cur.symbol}</span>
                <span>{cur.code}</span>
                <span className="text-gray-100">{cur.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
