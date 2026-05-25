import { useEffect, useState } from 'react';
import { Newspaper, ArrowUpRight, Clock } from 'lucide-react';
import { listNoticias, type NewsItem } from '@/services/news.service';
import { useT } from '@/i18n/LangContext';

export function Noticias() {
  const t = useT().noticias;
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listNoticias()
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  function timeAgo(date: string | null): string {
    if (!date) return '';
    const diff = Date.now() - Date.parse(date);
    if (Number.isNaN(diff)) return '';
    const h = Math.floor(diff / 3_600_000);
    if (h < 1) return t.timeNow;
    if (h < 24) return t.timeHours(h);
    const d = Math.floor(h / 24);
    return t.timeDays(d);
  }

  if (loading || news.length === 0) return null;

  return (
    <section id="noticias" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary">
              <Newspaper className="h-4 w-4" />
              {t.eyebrow}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t.title}
            </h2>
            <p className="mt-3 max-w-xl text-lg text-muted">{t.description}</p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((n, i) => (
            <a
              key={`${n.link}-${i}`}
              href={n.link}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                {n.image ? (
                  <img
                    src={n.image}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-primary/30">
                    <Newspaper className="h-10 w-10" />
                  </div>
                )}
                <span className="absolute left-3 top-3 rounded-full bg-ink/85 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                  {n.source}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="line-clamp-3 font-display text-base font-bold leading-snug text-ink transition-colors group-hover:text-primary">
                  {n.title}
                </h3>
                <div className="mt-auto flex items-center justify-between pt-4 text-xs text-muted">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {timeAgo(n.date)}
                  </span>
                  <span className="inline-flex items-center gap-1 font-semibold text-primary">
                    {t.readLink} <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-muted">{t.attribution}</p>
      </div>
    </section>
  );
}
