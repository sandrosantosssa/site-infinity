import { useLang } from '@/i18n/LangContext';
import { cn } from '@/lib/utils';

type Tone = 'light' | 'dark';

/**
 * Switch PT/EN compacto.
 * - tone="light" → para headers escuros / sobre vídeo (texto branco)
 * - tone="dark"  → para superfícies claras (texto escuro)
 */
export function LanguageSwitch({ tone = 'light', className }: { tone?: Tone; className?: string }) {
  const { lang, setLang, t } = useLang();
  const isLight = tone === 'light';

  return (
    <div
      role="group"
      aria-label={t.lang.switchAria}
      className={cn(
        'inline-flex items-center rounded-full border p-0.5 backdrop-blur transition-colors',
        isLight ? 'border-white/25 bg-white/10' : 'border-border bg-white',
        className
      )}
    >
      {(['pt', 'en'] as const).map((code) => {
        const active = lang === code;
        const label = code === 'pt' ? t.lang.pt : t.lang.en;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active}
            className={cn(
              'rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider transition-all',
              active
                ? 'bg-[#5fded3] text-ink shadow-sm'
                : isLight
                  ? 'text-white/80 hover:text-white'
                  : 'text-foreground/60 hover:text-primary'
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
