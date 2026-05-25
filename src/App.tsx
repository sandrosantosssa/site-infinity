import { MessageCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Solutions } from '@/sections/Solutions';
import { Services } from '@/sections/Services';
import { Eventos } from '@/sections/Eventos';
import { Noticias } from '@/sections/Noticias';
import { About } from '@/sections/About';
import { Contact } from '@/sections/Contact';
import { SITE } from '@/lib/utils';
import { LangProvider, useT } from '@/i18n/LangContext';

function WhatsAppFab() {
  const t = useT();
  const waLink = `https://wa.me/${SITE.whatsapp}`;
  return (
    <a
      href={waLink}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsapp.aria}
      title={t.whatsapp.aria}
      className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg ring-2 ring-white/30 transition-transform hover:scale-110"
    >
      <MessageCircle className="h-5 w-5" />
    </a>
  );
}

export default function App() {
  return (
    <LangProvider>
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <Solutions />
          <Services />
          <Eventos />
          <Noticias />
          <About />
          <Contact />
        </main>
        <Footer />
        <WhatsAppFab />
      </div>
    </LangProvider>
  );
}
