import { Mail, MessageCircle } from 'lucide-react';
import { SITE } from '@/lib/utils';
import { useT } from '@/i18n/LangContext';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
    </svg>
  );
}

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  const LINKS = [
    { label: t.footer.navItems.home, href: '#inicio' },
    { label: t.footer.navItems.solutions, href: '#solucoes' },
    { label: t.footer.navItems.services, href: '#servicos' },
    { label: t.footer.navItems.about, href: '#sobre' },
    { label: t.footer.navItems.contact, href: '#contato' },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <img src="/LOGOMARCA.png" alt={SITE.brand} className="h-10 w-auto" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {t.footer.description}
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-foreground/70 transition-colors hover:border-primary hover:text-primary"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-white text-foreground/70 transition-colors hover:border-primary hover:text-primary"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-ink">{t.footer.nav}</h4>
            <ul className="mt-4 space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href + l.label}>
                  <a href={l.href} className="text-sm text-muted transition-colors hover:text-primary">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-ink">{t.footer.contact}</h4>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4" /> {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${SITE.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
                >
                  <MessageCircle className="h-4 w-4" /> {SITE.whatsappLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {year} {SITE.brand}. {t.footer.rights}
          </p>
          <p>CNPJ {SITE.cnpj} · {SITE.city}</p>
        </div>
      </div>
    </footer>
  );
}
