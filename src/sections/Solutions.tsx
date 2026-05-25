import { FileSignature, ArrowUpRight, LayoutDashboard, Headset, Boxes } from 'lucide-react';
import { SITE } from '@/lib/utils';
import { useT } from '@/i18n/LangContext';

const ICONS = [FileSignature, LayoutDashboard, Boxes, Headset];
const HREFS = [SITE.portalUrl, undefined, undefined, undefined];
const AVAILABLE = [true, false, false, false];

export function Solutions() {
  const t = useT().solutions;
  return (
    <section id="solucoes" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            {t.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t.title}
          </h2>
          <p className="mt-4 text-lg text-muted">{t.description}</p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((s, i) => {
            const Icon = ICONS[i] ?? FileSignature;
            const href = HREFS[i];
            const available = AVAILABLE[i] ?? false;
            return (
              <div
                key={s.name}
                className="group flex flex-col rounded-2xl border border-border bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 flex items-center gap-2 font-display text-lg font-bold text-ink">
                  {s.name}
                  {available && (
                    <span className="rounded-full bg-primary-light px-2 py-0.5 text-[10px] font-bold uppercase text-primary">
                      {t.available}
                    </span>
                  )}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.desc}</p>
                <ul className="mt-4 space-y-1.5">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm text-foreground/80">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
                {available && href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary transition-colors group-hover:gap-2"
                  >
                    {t.access} <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
