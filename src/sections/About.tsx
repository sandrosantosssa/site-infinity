import { Target, Eye, Gem, CheckCircle2 } from 'lucide-react';
import { useT } from '@/i18n/LangContext';

const VALUE_ICONS = [Target, Eye, Gem];

export function About() {
  const t = useT().about;
  return (
    <section id="sobre" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              {t.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t.description}</p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {t.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm font-medium text-foreground/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4">
            {t.values.map((v, i) => {
              const Icon = VALUE_ICONS[i] ?? Target;
              return (
                <div
                  key={v.title}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-bold text-ink">{v.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
