import { Target, Eye, Gem, CheckCircle2 } from 'lucide-react';

const VALUES = [
  { icon: Target, title: 'Missão', desc: 'Transformar negócios por meio de tecnologia acessível, segura e sob medida.' },
  { icon: Eye, title: 'Visão', desc: 'Ser referência em soluções digitais que geram resultado real para os clientes.' },
  { icon: Gem, title: 'Valores', desc: 'Compromisso, transparência, inovação e parceria de longo prazo.' },
];

const HIGHLIGHTS = [
  'Tecnologia moderna e escalável',
  'Atendimento próximo e ágil',
  'Soluções pensadas para o seu negócio',
  'Segurança e conformidade (LGPD)',
];

export function About() {
  return (
    <section id="sobre" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wider text-primary">
              Sobre a Infinity Sistemas
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Tecnologia com propósito e parceria
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Somos uma empresa de tecnologia focada em desenvolver soluções que realmente
              fazem a diferença no dia a dia das empresas. Unimos software de qualidade,
              segurança e um atendimento próximo para entregar resultados de verdade.
            </p>

            <ul className="mt-7 grid gap-3 sm:grid-cols-2">
              {HIGHLIGHTS.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm font-medium text-foreground/90">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-4">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-soft"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-ink">{v.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
