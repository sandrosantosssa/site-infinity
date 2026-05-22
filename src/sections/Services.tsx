import { Code2, Cloud, ShieldCheck, Workflow, Smartphone, LineChart } from 'lucide-react';

const SERVICES = [
  { icon: Code2, title: 'Desenvolvimento de software', desc: 'Sistemas web e aplicações sob medida para o seu processo.' },
  { icon: Cloud, title: 'Soluções em nuvem', desc: 'Hospedagem, escalabilidade e disponibilidade na nuvem.' },
  { icon: Workflow, title: 'Automação de processos', desc: 'Integramos e automatizamos rotinas para ganhar eficiência.' },
  { icon: ShieldCheck, title: 'Segurança & LGPD', desc: 'Proteção de dados e conformidade do início ao fim.' },
  { icon: Smartphone, title: 'Experiência & design', desc: 'Interfaces modernas, intuitivas e responsivas.' },
  { icon: LineChart, title: 'Consultoria em TI', desc: 'Estratégia e tecnologia para o crescimento do negócio.' },
];

export function Services() {
  return (
    <section id="servicos" className="bg-surface py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            O que fazemos
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Serviços de tecnologia ponta a ponta
          </h2>
          <p className="mt-4 text-lg text-muted">
            Da ideia à operação: cuidamos de cada etapa para a sua tecnologia simplesmente funcionar.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 transition-all hover:shadow-soft"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-ink">{s.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
