import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn, SITE } from '@/lib/utils';
import { useT } from '@/i18n/LangContext';
import { LanguageSwitch } from '@/components/LanguageSwitch';

const GRADIENT =
  'linear-gradient(125deg, #0e1413 0%, #1f4f4c 30%, #2c6e6a 50%, #1f4f4c 70%, #0e1413 100%)';

export function Header() {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const NAV = [
    { label: t.nav.home, href: '#inicio' },
    { label: t.nav.solutions, href: '#solucoes' },
    { label: t.nav.services, href: '#servicos' },
    { label: t.nav.events, href: '#eventos' },
    { label: t.nav.news, href: '#noticias' },
    { label: t.nav.about, href: '#sobre' },
    { label: t.nav.contact, href: '#contato' },
  ];

  return (
    <header
      className={cn(
        'animate-gradient fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-shadow duration-300',
        scrolled && 'shadow-soft-lg'
      )}
      style={{ backgroundImage: GRADIENT }}
    >
      <div className="pointer-events-none absolute inset-0 grid-pattern-light opacity-40" />

      <div className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <a href="#inicio" className="flex items-center">
          <span className="rounded-xl bg-white px-3 py-1.5 shadow-soft">
            <img src="/LOGOMARCA.png" alt={SITE.brand} className="h-8 w-auto" />
          </span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-[#7fe7df]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch tone="light" />
          <a
            href={SITE.portalUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-white/85 transition-colors hover:text-white"
          >
            {t.nav.clientArea}
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#5fded3] px-5 py-2.5 text-sm font-bold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            {t.nav.ctaContact}
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch tone="light" />
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
            aria-label={t.nav.menuAria}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="relative border-t border-white/10 px-5 py-4 lg:hidden" style={{ backgroundImage: GRADIENT }}>
          <nav className="flex flex-col gap-1">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10 hover:text-white"
              >
                {n.label}
              </a>
            ))}
            <a
              href={SITE.portalUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-white/85 hover:bg-white/10 hover:text-white"
            >
              {t.nav.clientArea}
            </a>
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#5fded3] px-5 py-2.5 text-sm font-bold text-ink"
            >
              {t.nav.ctaContact}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
