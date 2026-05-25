import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { dict, type Dict, type Lang } from './dictionary';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
};

const LangCtx = createContext<Ctx | null>(null);
const STORAGE_KEY = 'infinity-lang';

function detectInitial(): Lang {
  if (typeof window === 'undefined') return 'pt';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt' || saved === 'en') return saved;
  } catch {
    /* ignore */
  }
  const nav = window.navigator?.language?.toLowerCase() ?? '';
  return nav.startsWith('pt') ? 'pt' : 'en';
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitial);

  function setLang(l: Lang) {
    setLangState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch { /* ignore */ }
  }

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    }
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({ lang, setLang, t: dict[lang] as Dict }),
    [lang]
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useLang(): Ctx {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error('useLang() must be used within <LangProvider>');
  return ctx;
}

export function useT(): Dict {
  return useLang().t;
}
