import { ArrowRight, ShieldCheck, Zap, Infinity as InfinityIcon } from 'lucide-react';
import { SITE } from '@/lib/utils';

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* fundo */}
      <div className="absolute inset-0 grid-pattern opacity-60" />
      <div className="absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-primary-light blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-white" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* texto */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-primary shadow-soft">
              <InfinityIcon className="h-3.5 w-3.5" />
              Software e tecnologia sob medida
            </span>

            <h1 className="mt-5 font-display text-[2.6rem] font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Tecnologia que <span className="text-primary">move</span> o seu negócio.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              A Infinity Sistemas desenvolve plataformas web, automações e soluções de TI
              que simplificam a sua operação e impulsionam resultados — com segurança e
              tecnologia de ponta.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#contato"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-white shadow-soft transition-all hover:-translate-y-0.5 hover:bg-primary-dark"
              >
                Solicitar uma demonstração
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#solucoes"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-primary hover:text-primary"
              >
                Conheça as soluções
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-primary" /> Segurança e LGPD
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-primary" /> Implantação ágil
              </span>
            </div>
          </div>

          {/* visual tech */}
          <div className="relative">
            <div
              className="animate-gradient relative mx-auto max-w-md overflow-hidden rounded-3xl p-6 shadow-soft-lg"
              style={{
                backgroundImage:
                  'linear-gradient(125deg, #0e1413 0%, #1f4f4c 30%, #2c6e6a 50%, #1f4f4c 70%, #0e1413 100%)',
              }}
            >
              {/* grade digital + brilhos */}
              <div className="absolute inset-0 grid-pattern-light opacity-70" />
              <div className="animate-pulse-glow absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#5fded3]/30 blur-3xl" />
              <div className="animate-pulse-glow absolute -bottom-12 -left-8 h-44 w-44 rounded-full bg-accent/30 blur-3xl" />

              <div className="relative">
                {/* logo em pílula branca (visível sobre o escuro) */}
                <div className="mx-auto w-fit rounded-2xl bg-white px-5 py-3 shadow-soft">
                  <img src="/LOGOMARCA.png" alt={SITE.brand} className="h-12 w-auto" />
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  {[
                    { k: '+100%', v: 'Digital' },
                    { k: '24/7', v: 'Disponível' },
                    { k: 'Cloud', v: 'Na nuvem' },
                    { k: 'Sob medida', v: 'Personalizável' },
                  ].map((s) => (
                    <div
                      key={s.v}
                      className="rounded-2xl border border-white/15 bg-white/10 p-4 text-center backdrop-blur-sm transition-colors hover:bg-white/15"
                    >
                      <p className="font-display text-xl font-bold text-[#7fe7df] text-glow">{s.k}</p>
                      <p className="mt-0.5 text-xs font-medium text-white/70">{s.v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 -z-10 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
