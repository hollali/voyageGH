"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const SUPPORTED_CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$", locale: "en-US" },
  { code: "EUR", name: "Euro", symbol: "\u20AC", locale: "de-DE" },
  { code: "GBP", name: "British Pound", symbol: "\u00A3", locale: "en-GB" },
  { code: "JPY", name: "Japanese Yen", symbol: "\u00A5", locale: "ja-JP" },
  { code: "CNY", name: "Chinese Yuan", symbol: "\u00A5", locale: "zh-CN" },
  { code: "NGN", name: "Nigerian Naira", symbol: "\u20A6", locale: "en-NG" },
  { code: "KES", name: "Kenyan Shilling", symbol: "KSh", locale: "en-KE" },
  { code: "ZAR", name: "South African Rand", symbol: "R", locale: "en-ZA" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", locale: "en-CA" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", locale: "en-AU" },
  { code: "INR", name: "Indian Rupee", symbol: "\u20B9", locale: "en-IN" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", locale: "pt-BR" },
  { code: "GHS", name: "Ghanaian Cedi", symbol: "GH\u20B5", locale: "en-GH" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", locale: "de-CH" },
];

const FALLBACK_RATES: Record<string, number> = {
  USD: 0.08,
  EUR: 0.074,
  GBP: 0.063,
  JPY: 12.5,
  CNY: 0.58,
  NGN: 125,
  KES: 10.5,
  ZAR: 1.5,
  CAD: 0.11,
  AUD: 0.12,
  INR: 6.7,
  BRL: 0.4,
  GHS: 1,
  CHF: 0.072,
};

const API_URL = "https://open.er-api.com/v6/latest/GHS";
const STORAGE_CURRENCY = "voyagegh-currency";
const STORAGE_RATES = "voyagegh-rates";
const STORAGE_RATES_TIME = "voyagegh-rates-time";
const CACHE_TTL = 3600000;

interface CurrencyContextValue {
  currency: string;
  setCurrency: (code: string) => void;
  convertPrice: (ghsAmount: number) => number;
  formatPrice: (ghsAmount: number) => string;
  parseAndFormatPrice: (priceString: string) => string;
  rates: Record<string, number>;
  isLoaded: boolean;
}

const CurrencyContext = createContext<CurrencyContextValue | undefined>(
  undefined
);

function detectCurrency(): string {
  if (typeof window === "undefined") return "USD";
  const stored = localStorage.getItem(STORAGE_CURRENCY);
  if (stored && SUPPORTED_CURRENCIES.some((c) => c.code === stored)) {
    return stored;
  }
  const browserLocale = navigator.language;
  const localeMap: Record<string, string> = {
    "en-US": "USD",
    "en-NG": "NGN",
    "en-KE": "KES",
    "en-ZA": "ZAR",
    "en-CA": "CAD",
    "en-AU": "AUD",
    "en-IN": "INR",
    "en-GH": "GHS",
    "en-GB": "GBP",
    "de-DE": "EUR",
    "de-CH": "CHF",
    "fr-FR": "EUR",
    "ja-JP": "JPY",
    "zh-CN": "CNY",
    "zh-TW": "CNY",
    "pt-BR": "BRL",
    "es-ES": "EUR",
    "it-IT": "EUR",
    "ko-KR": "USD",
    "ar-SA": "USD",
    "sw-KE": "KES",
    "ha-NG": "NGN",
    "yo-NG": "NGN",
    "am-ET": "USD",
  };
  return localeMap[browserLocale] || "USD";
}

function parsePrice(input: number | string): number {
  if (typeof input === "number") return input;
  const cleaned = input.replace(/[^0-9.,\-]/g, "");
  if (!cleaned) return 0;
  const parts = cleaned.split(",");
  const joined = parts.join("");
  const numParts = joined.split(".");
  if (numParts.length > 2) {
    return parseFloat(numParts[0] + "." + numParts.slice(1).join("")) || 0;
  }
  return parseFloat(joined) || 0;
}

function getCachedRates(): Record<string, number> | null {
  if (typeof window === "undefined") return null;
  try {
    const cached = localStorage.getItem(STORAGE_RATES);
    const cachedTime = localStorage.getItem(STORAGE_RATES_TIME);
    if (cached && cachedTime) {
      const age = Date.now() - parseInt(cachedTime, 10);
      if (age < CACHE_TTL) {
        return JSON.parse(cached);
      }
    }
  } catch {
    return null;
  }
  return null;
}

function cacheRates(rates: Record<string, number>): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_RATES, JSON.stringify(rates));
    localStorage.setItem(STORAGE_RATES_TIME, String(Date.now()));
  } catch {
    // ignore
  }
}

function getLocaleForCurrency(code: string): string {
  return (
    SUPPORTED_CURRENCIES.find((c) => c.code === code)?.locale || "en-US"
  );
}

function getInitialCurrency() {
  return "USD";
}

function getSnapshotCurrency() {
  return detectCurrency();
}

function subscribeCurrency(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const currency = useSyncExternalStore(
    subscribeCurrency,
    getSnapshotCurrency,
    getInitialCurrency
  );
  const [rates, setRates] = useState<Record<string, number>>(FALLBACK_RATES);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const setCurrency = useCallback((code: string) => {
    if (!SUPPORTED_CURRENCIES.some((c) => c.code === code)) return;
    localStorage.setItem(STORAGE_CURRENCY, code);
  }, []);

  const convertPrice = useCallback(
    (ghsAmount: number): number => {
      const rate = rates[currency] || rates["USD"] || 0.08;
      return ghsAmount * rate;
    },
    [rates, currency]
  );

  const formatPrice = useCallback(
    (ghsAmount: number): string => {
      const converted = convertPrice(ghsAmount);
      const locale = getLocaleForCurrency(currency);
      const currencyObj = SUPPORTED_CURRENCIES.find(
        (c) => c.code === currency
      );
      if (!currencyObj) return String(converted);
      try {
        return new Intl.NumberFormat(locale, {
          style: "currency",
          currency: currencyObj.code === "GHS" ? "GHS" : currencyObj.code,
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        }).format(converted);
      } catch {
        return `${currencyObj.symbol}${converted.toFixed(2)}`;
      }
    },
    [convertPrice, currency]
  );

  useEffect(() => {
    const detected = detectCurrency();
    localStorage.setItem(STORAGE_CURRENCY, detected);

    async function fetchRates() {
      const cached = getCachedRates();
      if (cached) {
        setRates(cached);
        setIsLoaded(true);
        return;
      }
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("API error");
        const data = await res.json();
        const apiRates = data.rates || data;
        setRates(apiRates);
        cacheRates(apiRates);
      } catch {
        const stored = getCachedRates();
        if (stored) {
          setRates(stored);
        } else {
          setRates(FALLBACK_RATES);
        }
      }
      setIsLoaded(true);
    }

    fetchRates();
  }, []);

  const parseAndFormatPrice = useCallback(
    (priceString: string): string => {
      const num = parsePrice(priceString);
      if (num === 0) return priceString;
      return formatPrice(num);
    },
    [formatPrice]
  );

  const value: CurrencyContextValue = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
    parseAndFormatPrice,
    rates,
    isLoaded,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = useContext(CurrencyContext);
  if (!context) {
    return {
      currency: "USD",
      setCurrency: () => {},
      convertPrice: (ghsAmount: number) => {
        const rate = FALLBACK_RATES["USD"] || 0.08;
        return ghsAmount * rate;
      },
      formatPrice: (ghsAmount: number) => `$${(ghsAmount * 0.08).toFixed(2)}`,
      parseAndFormatPrice: (priceString: string) => {
        const num = parsePrice(priceString);
        return `$${(num * 0.08).toFixed(2)}`;
      },
      rates: FALLBACK_RATES,
      isLoaded: true,
    };
  }
  return context;
}
