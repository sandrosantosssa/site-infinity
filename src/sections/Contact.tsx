import { useState } from 'react';
import { MessageCircle, Mail, MapPin, Send, CheckCircle2, Loader2 } from 'lucide-react';
import { SITE } from '@/lib/utils';
import { enviarContato } from '@/services/content.service';
import { useT } from '@/i18n/LangContext';

export function Contact() {
  const t = useT().contact;
  const waLink = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(t.whatsappMsg)}`;

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro(null);
    if (!nome.trim() || !email.trim() || !mensagem.trim()) {
      setErro(t.form.errRequired);
      return;
    }
    setSending(true);
    const res = await enviarContato({ nome, email, telefone, mensagem });
    setSending(false);
    if (res.ok) {
      setSent(true);
      setNome('');
      setEmail('');
      setTelefone('');
      setMensagem('');
    } else {
      setErro(res.error ?? t.form.errGeneric);
    }
  };

  const field =
    'w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-accent';

  return (
    <section id="contato" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div
          className="animate-gradient relative overflow-hidden rounded-3xl text-white shadow-soft-lg"
          style={{
            backgroundImage:
              'linear-gradient(125deg, #0e1413 0%, #1f4f4c 30%, #2c6e6a 50%, #1f4f4c 70%, #0e1413 100%)',
          }}
        >
          <div className="pointer-events-none absolute inset-0 grid-pattern-light opacity-40" />
          <div className="animate-pulse-glow pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#5fded3]/20 blur-3xl" />
          <div className="animate-pulse-glow pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative grid gap-10 p-8 lg:grid-cols-2 lg:p-12">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-accent">
                {t.eyebrow}
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {t.title}
              </h2>
              <p className="mt-4 max-w-md text-white/70">{t.description}</p>

              <div className="mt-8 space-y-3">
                <a
                  href={waLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <MessageCircle className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">{t.whatsappLabel}</p>
                    <p className="font-medium">{SITE.whatsappLabel}</p>
                  </div>
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-colors hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <Mail className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">{t.emailLabel}</p>
                    <p className="font-medium">{SITE.email}</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 rounded-2xl bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <MapPin className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-white/50">{t.locationLabel}</p>
                    <p className="font-medium">{SITE.city}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white/[0.04] p-6 ring-1 ring-white/10">
              {sent ? (
                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="h-12 w-12 text-accent" />
                  <h3 className="mt-4 font-display text-xl font-bold">{t.form.sentTitle}</h3>
                  <p className="mt-2 text-sm text-white/70">{t.form.sentDesc}</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-5 text-sm font-semibold text-accent hover:underline"
                  >
                    {t.form.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    className={field}
                    placeholder={t.form.name}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    disabled={sending}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="email"
                      className={field}
                      placeholder={t.form.email}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={sending}
                    />
                    <input
                      className={field}
                      placeholder={t.form.phone}
                      value={telefone}
                      onChange={(e) => setTelefone(e.target.value)}
                      disabled={sending}
                    />
                  </div>
                  <textarea
                    className={`${field} resize-none`}
                    rows={4}
                    placeholder={t.form.message}
                    value={mensagem}
                    onChange={(e) => setMensagem(e.target.value)}
                    disabled={sending}
                  />
                  {erro && <p className="text-sm text-red-300">{erro}</p>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary disabled:opacity-60"
                  >
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    {sending ? t.form.sending : t.form.submit}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
