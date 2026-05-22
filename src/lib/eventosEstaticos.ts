import type { Evento } from '@/services/content.service';

// ============================================================
// Eventos ESTÁTICOS — detectados automaticamente das subpastas em
// src/assets/eventos/<Nome do Evento>/  (fotos + vídeo opcional).
//
// Basta criar uma subpasta por evento e jogar os arquivos dentro.
// O nome da pasta vira o título. Para ordenar, prefixe com número:
//   "01 - Treinamento de Power BI"  →  exibe "Treinamento de Power BI"
// (Adicionar/remover arquivos exige novo build/deploy.)
// ============================================================

const imageModules = import.meta.glob(
  '../assets/eventos/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',
  { eager: true, query: '?url', import: 'default' }
) as Record<string, string>;

const videoModules = import.meta.glob('../assets/eventos/**/*.{mp4,MP4,webm,WEBM}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function folderOf(path: string): string | null {
  const m = path.match(/assets\/eventos\/([^/]+)\//);
  return m ? m[1] : null;
}

function displayTitle(folder: string): string {
  // remove prefixo de ordenação tipo "01 - " / "02_" / "3."
  return folder.replace(/^\s*\d+\s*[-_.)]\s*/, '').trim();
}

interface Group {
  folder: string;
  fotos: string[];
  video: string | null;
}

function buildGroups(): Group[] {
  const map = new Map<string, Group>();

  for (const path of Object.keys(imageModules).sort()) {
    const folder = folderOf(path);
    if (!folder) continue;
    if (!map.has(folder)) map.set(folder, { folder, fotos: [], video: null });
    map.get(folder)!.fotos.push(imageModules[path]);
  }

  for (const path of Object.keys(videoModules).sort()) {
    const folder = folderOf(path);
    if (!folder) continue;
    if (!map.has(folder)) map.set(folder, { folder, fotos: [], video: null });
    if (!map.get(folder)!.video) map.get(folder)!.video = videoModules[path];
  }

  return Array.from(map.values()).sort((a, b) => a.folder.localeCompare(b.folder, 'pt-BR'));
}

// A pasta "a Infinity" é institucional (vídeo de abertura), não um evento.
const INSTITUCIONAL_RE = /infinity/i;

const grupos = buildGroups();
const grupoInstitucional = grupos.find((g) => INSTITUCIONAL_RE.test(g.folder));

/** Mídia institucional da Infinity (vídeo de abertura + fotos). */
export const institucional = {
  video: grupoInstitucional?.video ?? null,
  fotos: grupoInstitucional?.fotos ?? [],
};

export const eventosEstaticos: Evento[] = grupos
  .filter((g) => g !== grupoInstitucional)
  .map((g) => ({
    id: g.folder,
    titulo: displayTitle(g.folder),
    descricao: null,
    data: null,
    capaUrl: g.fotos[0] ?? null,
    videoUrl: g.video,
    fotos: g.fotos,
  }));
