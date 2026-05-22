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

export default function App() {
  const waLink = `https://wa.me/${SITE.whatsapp}`;
  return (
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

      {/* WhatsApp flutuante */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-lg transition-transform hover:scale-110"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
