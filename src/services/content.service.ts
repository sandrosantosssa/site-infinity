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

interface DBEvento {
  id: string;
  titulo: string;
  descricao: string | null;
  data: string | null;
  capa_url: string | null;
  video_url: string | null;
  ordem: number;
}

/** Lista os eventos publicados. Retorna [] se o Supabase não estiver configurado. */
export async function listEventos(): Promise<Evento[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('eventos')
    .select('id, titulo, descricao, data, capa_url, video_url, ordem')
    .eq('publicado', true)
    .order('ordem', { ascending: true })
    .order('created_at', { ascending: false });
  if (error || !data) return [];
  return (data as DBEvento[]).map((r) => ({
    id: r.id,
    titulo: r.titulo,
    descricao: r.descricao,
    data: r.data,
    capaUrl: r.capa_url,
    videoUrl: r.video_url,
  }));
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
