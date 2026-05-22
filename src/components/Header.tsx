import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { cn, SITE } from '@/lib/utils';

const NAV = [
  { label: 'Início', href: '#inicio' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Eventos', href: '#eventos' },
  { label: 'Notícias', href: '#noticias' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Contato', href: '#contato' },
];

const GRADIENT =
  'linear-gradient(125deg, #0e1413 0%, #1f4f4c 30%, #2c6e6a 50%, #1f4f4c 70%, #0e1413 100%)';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'animate-gradient fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-shadow duration-300',
        scrolled && 'shadow-soft-lg'
      )}
      style={{ backgroundImage: GRADIENT }}
    >
      {/* grade digital sutil */}
      <div className="pointer-events-none absolute inset-0 grid-pattern-light opacity-40" />

      <div className="relative mx-auto flex h-18 max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <a href="#inicio" className="flex items-center">
          <span className="rounded-xl bg-white px-3 py-1.5 shadow-soft">
            <img src="/LOGOMARCA.png" alt={SITE.brand} className="h-8 w-auto" />
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
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

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={SITE.portalUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-white/85 transition-colors hover:text-white"
          >
            Área do cliente
          </a>
          <a
            href="#contato"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#5fded3] px-5 py-2.5 text-sm font-bold text-ink shadow-soft transition-all hover:-translate-y-0.5 hover:bg-white"
          >
            Fale conosco
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-white lg:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu mobile */}
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
              href="#contato"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-[#5fded3] px-5 py-2.5 text-sm font-bold text-ink"
            >
              Fale conosco
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
