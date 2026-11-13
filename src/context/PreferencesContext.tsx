import React, { createContext, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';
export type Lang = 'ar' | 'en';

interface PreferencesContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  lang: Lang;
  isRTL: boolean;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
}

const PreferencesContext = createContext<PreferencesContextType>({
  theme: 'light',
  isDark: false,
  toggleTheme: () => {},
  lang: 'ar',
  isRTL: true,
  setLang: () => {},
  toggleLang: () => {},
});

export function usePreferences() {
  return useContext(PreferencesContext);
}

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const [lang, setLang] = useState<Lang>('ar');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  return (
    <PreferencesContext.Provider
      value={{
        theme,
        isDark: theme === 'dark',
        toggleTheme,
        lang,
        isRTL: lang === 'ar',
        setLang,
        toggleLang,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
