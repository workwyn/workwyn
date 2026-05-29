"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import en from "@/locales/en.json";
import th from "@/locales/th.json";

type Locale = "en" | "th";

type Dictionary = typeof en;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return ctx;
}

const dictionaries: Record<Locale, Dictionary> = {
  en,
  th,
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("th"); // Default to Thai for testing or "en" based on preference

  // Load saved locale on mount
  useEffect(() => {
    const saved = localStorage.getItem("app-locale") as Locale;
    if (saved && (saved === "en" || saved === "th")) {
      setLocaleState(saved);
    } else {
      // Auto-detect based on browser language if no save
      const navLang = navigator.language.startsWith("th") ? "th" : "en";
      setLocaleState(navLang);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("app-locale", newLocale);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = dictionaries[locale];
    
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        return key; // Fallback to key if not found
      }
    }
    
    return typeof value === "string" ? value : key;
  };

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
