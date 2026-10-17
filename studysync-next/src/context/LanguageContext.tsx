"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/locales/en.json';
import ar from '@/locales/ar.json';
import { Language } from '@/types';

const translations: Record<Language, any> = { en, ar };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (path: string) => any;
  isRTL: boolean;
}

export const LanguageContext = createContext<LanguageContextType>({
  lang: 'en',
  setLang: () => {},
  toggleLang: () => {},
  t: (path: string) => path,
  isRTL: false,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('studysync-lang') as Language | null;
    if (saved && (saved === 'en' || saved === 'ar')) {
      setLang(saved);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem('studysync-lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    if (lang === 'ar') {
      document.documentElement.classList.add('font-ar');
      document.documentElement.classList.remove('font-en');
    } else {
      document.documentElement.classList.add('font-en');
      document.documentElement.classList.remove('font-ar');
    }
  }, [lang, mounted]);

  const t = (path: string): any => {
    const keys = path.split('.');
    let result: any = translations[lang];
    for (const key of keys) {
      if (result === undefined || result === null) return path;
      result = result[key];
    }
    return result !== undefined && result !== null ? result : path;
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const isRTL = lang === 'ar';

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, toggleLang, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
