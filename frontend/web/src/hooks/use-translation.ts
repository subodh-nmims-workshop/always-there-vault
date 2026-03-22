'use client'

import { useState, useEffect } from 'react';
import { translations, Language } from '../utils/i18n';

// Simple implementation for React state management across components
let currentLanguage: Language = 'en';
const listeners = new Set<() => void>();

export const setLanguage = (lang: Language) => {
  currentLanguage = lang;
  if (typeof window !== 'undefined') {
    localStorage.setItem('dwp_lang', lang);
  }
  listeners.forEach(listen => listen());
};

export const getLanguage = (): Language => {
  if (typeof window !== 'undefined') {
    return (localStorage.getItem('dwp_lang') as Language) || 'en';
  }
  return 'en';
};

export const useTranslation = () => {
  const [lang, setLang] = useState<Language>('en');

  useEffect(() => {
    // Initial load
    setLang(getLanguage());

    const handleChange = () => setLang(currentLanguage);
    listeners.add(handleChange);
    return () => {
      listeners.delete(handleChange);
    };
  }, []);

  const t = (key: keyof typeof translations.en) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  return { t, changeLanguage: setLanguage, currentLanguage: lang };
};
