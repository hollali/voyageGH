export const locales = [
  "en", "fr", "es", "de", "zh", "ar", "pt",
  "sw", "ha", "yo", "zu", "am", "it", "ja", "ko",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  fr: "Fran\u00E7ais",
  es: "Espa\u00F1ol",
  de: "Deutsch",
  zh: "\u4E2D\u6587",
  ar: "\u0627\u0644\u0639\u0631\u0628\u064A\u0629",
  pt: "Portugu\u00EAs",
  sw: "Kiswahili",
  ha: "Hausa",
  yo: "Yoruba",
  zu: "isiZulu",
  am: "\u1260\u1348\u1273\u1275",
  it: "Italiano",
  ja: "\u65E5\u672C\u8A9E",
  ko: "\uD55C\uAD6D\uC5B4",
};

export const localeFlags: Record<Locale, string> = {
  en: "\uD83C\uDDEC\uD83C\uDDE7",
  fr: "\uD83C\uDDEB\uD83C\uDDF7",
  es: "\uD83C\uDDEA\uD83C\uDDF8",
  de: "\uD83C\uDDE9\uD83C\uDDEA",
  zh: "\uD83C\uDDE8\uD83C\uDDF3",
  ar: "\uD83C\uDDF8\uD83C\uDDE6",
  pt: "\uD83C\uDDE7\uD83C\uDDF7",
  sw: "\uD83C\uDDF0\uD83C\uDDEC",
  ha: "\uD83C\uDDF3\uD83C\uDDEC",
  yo: "\uD83C\uDDF3\uD83C\uDDEC",
  zu: "\uD83C\uDDFF\uD83C\uDDE6",
  am: "\uD83C\uDDEA\uD83C\uDDF9",
  it: "\uD83C\uDDEE\uD83C\uDDF9",
  ja: "\uD83C\uDDEF\uD83C\uDDF5",
  ko: "\uD83C\uDDF0\uD83C\uDDF7",
};
