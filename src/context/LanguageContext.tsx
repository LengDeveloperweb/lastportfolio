import React, { createContext, useContext, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS, TranslationKey } from '../data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const language: Language = 'en';

  useEffect(() => {
    localStorage.removeItem('app_lang');
    document.documentElement.lang = 'en';
  }, []);

  const setLanguage = () => {};
  const toggleLanguage = () => {};

  const t = (key: TranslationKey): string => {
    return TRANSLATIONS.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
