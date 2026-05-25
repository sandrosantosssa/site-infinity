import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Infinity as InfinityIcon, Volume2, VolumeX } from 'lucide-react';
import { SITE } from '@/lib/utils';
import { useT } from '@/i18n/LangContext';

export function Hero() {
  const t = useT().hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    if (!muted) v.play().catch(() => setMuted(true));
  }, [muted]);

  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink text-white"
    >
      {/* Vídeo de fundo em loop */}
      <video
        ref={videoRef}
        src={SITE.heroVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />

      {/* Overlay para legibilidade do texto */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/55 via-ink/30 to-ink/85" />
      <div className="absolute inset-0 -z-10 grid-pattern-light opacity-25" />
      <div className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[36rem] w-[36rem] rounded-full bg-primary/25 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-32 lg:px-8 lg:pt-40">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur">
            <InfinityIcon className="h-3.5 w-3.5" />
            {t.badge}
          </span>

          <h1
            className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-7xl"
            style={{ textShadow: '0 2px 30px rgb(0 0 0 / 0.45)' }}
          >
            {t.titlePre}{' '}
            <span className="bg-gradient-to-r from-[#7fe7df] via-[#5fded3] to-[#7fe7df] bg-clip-text text-transparent animate-gradient">
              {t.titleHighlight}
            </span>{' '}
            {t.titlePost}
          </h1>

          <p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl"
            style={{ textShadow: '0 1px 18px rgb(0 0 0 / 0.5)' }}
          >
            {t.description}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-soft-lg transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
            >
              {t.ctaPrimary}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#solucoes"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all hover:bg-white/10"
            >
              {t.ctaSecondary}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/80">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-[#7fe7df]" /> {t.badges.lgpd}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-[#7fe7df]" /> {t.badges.agile}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <InfinityIcon className="h-4 w-4 text-[#7fe7df]" /> {t.badges.custom}
            </span>
          </div>
        </div>
      </div>

      {/* Toggle de som — canto INFERIOR ESQUERDO (não conflita com WhatsApp à direita) */}
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? t.soundAriaOn : t.soundAriaOff}
        title={muted ? t.soundAriaOn : t.soundAriaOff}
        className="absolute bottom-6 left-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-xs font-semibold text-white backdrop-blur transition-all hover:bg-black/55"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        {muted ? t.soundOn : t.soundOff}
      </button>
    </section>
  );
}
