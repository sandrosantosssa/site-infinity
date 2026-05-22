export interface NewsItem {
  title: string;
  link: string;
  source: string;
  date: string | null;
  image: string | null;
}

// Notícias de exemplo (preview local sem a função serverless).
const DEMO_NEWS: NewsItem[] = [
  {
    title: 'Inteligência artificial transforma o desenvolvimento de software',
    link: 'https://www.tecmundo.com.br/',
    source: 'TecMundo',
    date: new Date().toISOString(),
    image: 'https://picsum.photos/seed/news1/600/400',
  },
  {
    title: 'Empresas aceleram migração para a nuvem em 2026',
    link: 'https://olhardigital.com.br/',
    source: 'Olhar Digital',
    date: new Date().toISOString(),
    image: 'https://picsum.photos/seed/news2/600/400',
  },
  {
    title: 'Cibersegurança: o que esperar para os próximos anos',
    link: 'https://www.tecmundo.com.br/',
    source: 'TecMundo',
    date: new Date().toISOString(),
    image: 'https://picsum.photos/seed/news3/600/400',
  },
];

/** Busca as notícias via função serverless. Em preview (dev), usa exemplos. */
export async function listNoticias(): Promise<NewsItem[]> {
  try {
    const resp = await fetch('/api/news');
    const ct = resp.headers.get('content-type') ?? '';
    if (!ct.includes('application/json')) return DEMO_NEWS; // dev sem função
    const body = (await resp.json()) as { items?: NewsItem[] };
    const items = body.items ?? [];
    return items.length ? items : DEMO_NEWS;
  } catch {
    return DEMO_NEWS;
  }
}
