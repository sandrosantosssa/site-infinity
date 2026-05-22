import { supabase } from '@/lib/supabase';

export interface Evento {
  id: string;
  titulo: string;
  descricao: string | null;
  data: string | null;
  capaUrl: string | null;
  videoUrl: string | null;
  /** Galeria de fotos do evento (modo estático com várias imagens). */
  fotos?: string[];
}

const BUCKET = 'site-midia';
const EVENTOS_PREFIX = 'eventos';

function displayTitle(folder: string): string {
  // remove prefixo de ordenação tipo "01 - " / "02_" / "3."
  return folder.replace(/^\s*\d+\s*[-_.)]\s*/, '').trim();
}

const isImage = (n: string) => /\.(jpe?g|png|webp|gif)$/i.test(n);
const isVideo = (n: string) => /\.(mp4|webm|mov)$/i.test(n);

/**
 * Lista os eventos a partir do Supabase Storage (bucket público "site-midia").
 * Cada SUBPASTA em "eventos/<Nome do Evento>/" vira um evento; os arquivos
 * dentro são as fotos (+ vídeo opcional). Gerenciado direto no Supabase,
 * sem redeploy. Retorna [] se o Supabase não estiver configurado.
 */
export async function listEventos(): Promise<Evento[]> {
  if (!supabase) return [];

  // 1) lista as subpastas (cada uma é um evento)
  const { data: entries, error } = await supabase.storage.from(BUCKET).list(EVENTOS_PREFIX, {
    limit: 200,
    sortBy: { column: 'name', order: 'asc' },
  });
  if (error || !entries) return [];

  // pastas vêm com id === null
  const folders = entries.filter((e) => e.id === null && e.name);

  const eventos: Evento[] = [];
  for (const folder of folders) {
    const path = `${EVENTOS_PREFIX}/${folder.name}`;
    const { data: files } = await supabase.storage.from(BUCKET).list(path, {
      limit: 500,
      sortBy: { column: 'name', order: 'asc' },
    });
    if (!files) continue;

    const fotos = files
      .filter((f) => isImage(f.name))
      .map((f) => supabase!.storage.from(BUCKET).getPublicUrl(`${path}/${f.name}`).data.publicUrl);
    const vid = files.find((f) => isVideo(f.name));
    const videoUrl = vid
      ? supabase!.storage.from(BUCKET).getPublicUrl(`${path}/${vid.name}`).data.publicUrl
      : null;

    if (!fotos.length && !videoUrl) continue;

    eventos.push({
      id: folder.name,
      titulo: displayTitle(folder.name),
      descricao: null,
      data: null,
      capaUrl: fotos[0] ?? null,
      videoUrl,
      fotos,
    });
  }
  return eventos;
}

export interface ContatoInput {
  nome: string;
  email: string;
  telefone?: string;
  mensagem: string;
}

/** Envia o formulário de contato (Vercel Function). */
export async function enviarContato(input: ContatoInput): Promise<{ ok: boolean; error?: string }> {
  try {
    const resp = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });
    const ct = resp.headers.get('content-type') ?? '';
    if (!ct.includes('application/json')) {
      return { ok: false, error: 'Serviço de contato indisponível.' };
    }
    const body = (await resp.json()) as { ok?: boolean; error?: string };
    if (!resp.ok || !body.ok) return { ok: false, error: body.error ?? 'Falha ao enviar' };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'Erro de rede' };
  }
}

/** Converte URL do YouTube/Vimeo em URL de embed. */
export function toEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v) return `https://www.youtube.com/embed/${v}`;
    }
    if (u.hostname === 'youtu.be') {
      return `https://www.youtube.com/embed${u.pathname}`;
    }
    if (u.hostname.includes('vimeo.com')) {
      const id = u.pathname.split('/').filter(Boolean)[0];
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
    return url;
  } catch {
    return null;
  }
}
