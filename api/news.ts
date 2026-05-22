// ============================================================
// Site Infinity — Notícias de tecnologia (agregador via RSS)
// GET /api/news
// Busca feeds RSS de portais de tecnologia, normaliza e retorna JSON.
// Linka sempre para o artigo original (crédito à fonte).
// Cache de 30 min na borda da Vercel para não sobrecarregar os feeds.
// ============================================================

import { XMLParser } from 'fast-xml-parser';
import type { VercelRequest, VercelResponse } from '@vercel/node';

interface NewsItem {
  title: string;
  link: string;
  source: string;
  date: string | null;
  image: string | null;
}

const FEEDS = [
  { source: 'TecMundo', url: 'https://www.tecmundo.com.br/rss' },
  { source: 'Olhar Digital', url: 'https://olhardigital.com.br/feed/' },
];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

function pickImage(item: Record<string, unknown>): string | null {
  // media:content / media:thumbnail / enclosure
  const media = (item['media:content'] ?? item['media:thumbnail']) as
    | Record<string, unknown>
    | Record<string, unknown>[]
    | undefined;
  const m = Array.isArray(media) ? media[0] : media;
  if (m && typeof m['@_url'] === 'string') return m['@_url'] as string;

  const enc = item['enclosure'] as Record<string, unknown> | undefined;
  if (enc && typeof enc['@_url'] === 'string') return enc['@_url'] as string;

  // primeira <img> no conteúdo/descrição
  const html = String(item['content:encoded'] ?? item['description'] ?? '');
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

function textOf(v: unknown): string {
  if (typeof v === 'string') return v;
  if (v && typeof v === 'object' && '#text' in (v as Record<string, unknown>)) {
    return String((v as Record<string, unknown>)['#text']);
  }
  return '';
}

async function fetchFeed(source: string, url: string): Promise<NewsItem[]> {
  try {
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; InfinityBot/1.0)' },
    });
    if (!resp.ok) return [];
    const xml = await resp.text();
    const data = parser.parse(xml);
    const items = data?.rss?.channel?.item ?? data?.feed?.entry ?? [];
    const arr = Array.isArray(items) ? items : [items];
    return arr.slice(0, 8).map((it: Record<string, unknown>): NewsItem => {
      const link =
        textOf(it.link) ||
        (typeof it.link === 'object' ? String((it.link as Record<string, unknown>)['@_href'] ?? '') : '');
      return {
        title: textOf(it.title).trim(),
        link: link.trim(),
        source,
        date: (textOf(it.pubDate) || textOf(it.published) || null) as string | null,
        image: pickImage(it),
      };
    });
  } catch {
    return [];
  }
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const results = await Promise.all(FEEDS.map((f) => fetchFeed(f.source, f.url)));
  const all = results.flat().filter((n) => n.title && n.link);

  // Ordena por data (mais recentes primeiro)
  all.sort((a, b) => {
    const ta = a.date ? Date.parse(a.date) : 0;
    const tb = b.date ? Date.parse(b.date) : 0;
    return tb - ta;
  });

  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=3600');
  return res.status(200).json({ items: all.slice(0, 9) });
}
