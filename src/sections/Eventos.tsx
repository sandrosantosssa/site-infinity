import { useEffect, useMemo, useState } from 'react';
import { Calendar, Play, X, ImageIcon, ChevronLeft, ChevronRight, Images } from 'lucide-react';
import { listEventos, toEmbedUrl, type Evento } from '@/services/content.service';
import { hasSupabase } from '@/lib/supabase';
import { eventosEstaticos } from '@/lib/eventosEstaticos';

const DEMO_EVENTOS: Evento[] = [
  {
    id: 'demo-1',
    titulo: 'Lançamento do Portal de Assinaturas',
    descricao: 'Apresentamos nossa plataforma de assinatura eletrônica para clientes e parceiros.',
    data: '2026-03-12',
    capaUrl: 'https://picsum.photos/seed/infinity-evt1/800/500',
    videoUrl: null,
  },
  {
    id: 'demo-2',
    titulo: 'Feira de Tecnologia 2026',
    descricao: 'Demonstrações ao vivo das soluções Infinity.',
    data: '2026-04-25',
    capaUrl: 'https://picsum.photos/seed/infinity-evt2/800/500',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  {
    id: 'demo-3',
    titulo: 'Workshop de Transformação Digital',
    descricao: 'Capacitação sobre automação e digitalização de processos.',
    data: '2026-05-08',
    capaUrl: 'https://picsum.photos/seed/infinity-evt3/800/500',
    videoUrl: null,
  },
];

function formatData(d: string | null): string {
  if (!d) return '';
  const [y, m, day] = d.split('T')[0].split('-');
  return day && m && y ? `${day}/${m}/${y}` : '';
}

function isExternalVideo(url: string): boolean {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}

export function Eventos() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Evento | null>(null);

  useEffect(() => {
    if (!hasSupabase) {
      // Modo estático: usa as pastas em src/assets/eventos (ou exemplos se vazio)
      setEventos(eventosEstaticos.length ? eventosEstaticos : DEMO_EVENTOS);
      setLoading(false);
      return;
    }
    listEventos()
      .then(setEventos)
      .finally(() => setLoading(false));
  }, []);

  if (loading || eventos.length === 0) return null;

  return (
    <section id="eventos" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Eventos & Novidades
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            A Infinity em movimento
          </h2>
          <p className="mt-4 text-lg text-muted">
            Acompanhe nossa presença em eventos, treinamentos e momentos marcantes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {eventos.map((ev) => {
            const qtdFotos = ev.fotos?.length ?? (ev.capaUrl ? 1 : 0);
            return (
              <button
                key={ev.id}
                onClick={() => setActive(ev)}
                className="group overflow-hidden rounded-2xl border border-border bg-white text-left shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-primary-light">
                  {ev.capaUrl ? (
                    <img
                      src={ev.capaUrl}
                      alt={ev.titulo}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-primary/40">
                      <ImageIcon className="h-10 w-10" />
                    </div>
                  )}
                  {ev.videoUrl && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-primary shadow-soft">
                        <Play className="h-6 w-6 translate-x-0.5" fill="currentColor" />
                      </span>
                    </span>
                  )}
                  {qtdFotos > 1 && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      <Images className="h-3.5 w-3.5" /> {qtdFotos}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  {ev.data && (
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatData(ev.data)}
                    </p>
                  )}
                  <h3 className="mt-1.5 font-display text-lg font-bold text-ink">{ev.titulo}</h3>
                  {ev.descricao && <p className="mt-1 line-clamp-2 text-sm text-muted">{ev.descricao}</p>}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {active && <Lightbox evento={active} onClose={() => setActive(null)} />}
    </section>
  );
}

/* ---- Lightbox com galeria (vídeo + fotos) ---- */
function Lightbox({ evento, onClose }: { evento: Evento; onClose: () => void }) {
  // monta a lista de mídias: vídeo (se houver) + fotos
  const media = useMemo(() => {
    const list: { type: 'video' | 'image'; src: string }[] = [];
    if (evento.videoUrl) list.push({ type: 'video', src: evento.videoUrl });
    const fotos = evento.fotos ?? (evento.capaUrl ? [evento.capaUrl] : []);
    for (const f of fotos) list.push({ type: 'image', src: f });
    return list;
  }, [evento]);

  const [idx, setIdx] = useState(0);
  const current = media[idx];
  const go = (d: number) => setIdx((i) => (i + d + media.length) % media.length);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink shadow-soft hover:bg-white"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Viewer principal */}
        <div className="relative aspect-video w-full bg-black">
          {current?.type === 'video' ? (
            isExternalVideo(current.src) && toEmbedUrl(current.src) ? (
              <iframe
                src={toEmbedUrl(current.src)!}
                title={evento.titulo}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video src={current.src} controls className="h-full w-full" />
            )
          ) : (
            current && <img src={current.src} alt={evento.titulo} className="h-full w-full object-contain" />
          )}

          {media.length > 1 && (
            <>
              <button
                onClick={() => go(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink hover:bg-white"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-ink hover:bg-white"
                aria-label="Próxima"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Miniaturas */}
        {media.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t border-border bg-surface p-3">
            {media.map((m, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg border-2 ${
                  i === idx ? 'border-primary' : 'border-transparent'
                }`}
              >
                {m.type === 'video' ? (
                  <span className="flex h-full w-full items-center justify-center bg-ink text-white">
                    <Play className="h-4 w-4" fill="currentColor" />
                  </span>
                ) : (
                  <img src={m.src} alt="" className="h-full w-full object-cover" />
                )}
              </button>
            ))}
          </div>
        )}

        <div className="p-6">
          {evento.data && (
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
              <Calendar className="h-3.5 w-3.5" />
              {formatData(evento.data)}
            </p>
          )}
          <h3 className="mt-1.5 font-display text-xl font-bold text-ink">{evento.titulo}</h3>
          {evento.descricao && (
            <p className="mt-2 text-sm leading-relaxed text-muted">{evento.descricao}</p>
          )}
        </div>
      </div>
    </div>
  );
}
