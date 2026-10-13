import { createContext, useContext, useState, useEffect } from 'react';
import en from '../locales/en.json';
import ar from '../locales/ar.json';

const translations = { en, ar };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('studysync-lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('studysync-lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.style.fontFamily = lang === 'ar' 
      ? "'Cairo', sans-serif" 
      : "'Inter', sans-serif";
  }, [lang]);

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[lang];
    for (const key of keys) {
      if (result === undefined) return path;
      result = result[key];
    }
    return result || path;
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'ar' : 'en');
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
