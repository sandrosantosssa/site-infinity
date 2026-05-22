-- =============================================================
-- Site Infinity Sistemas — schema Supabase
-- Cole no SQL Editor → New query → Run
-- =============================================================
-- Conteúdo público (eventos) é lido pelo site via anon key (RLS read).
-- Mensagens de contato só são gravadas pela função serverless (service role).
-- =============================================================

-- ---------- Eventos / novidades (galeria) ----------
create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  data date,
  -- URL da foto de capa (Supabase Storage público ou link externo)
  capa_url text,
  -- URL do vídeo no YouTube/Vimeo (opcional)
  video_url text,
  ordem int default 0,
  publicado boolean default true,
  created_at timestamptz default now()
);
create index if not exists eventos_publicado_idx on eventos(publicado, ordem);

-- ---------- Mensagens de contato ----------
create table if not exists contatos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefone text,
  mensagem text not null,
  created_at timestamptz default now()
);

-- =====================================================
-- RLS
-- =====================================================
alter table eventos  enable row level security;
alter table contatos enable row level security;

-- Eventos publicados são públicos (qualquer visitante lê)
drop policy if exists eventos_public_read on eventos;
create policy eventos_public_read on eventos
  for select to anon, authenticated
  using (publicado = true);

-- Contatos: nenhum acesso público (insert/leitura só via service role na função).
-- (sem policies = bloqueado para anon/authenticated)

-- =====================================================
-- STORAGE (manual no painel): crie um bucket PÚBLICO "site-midia"
-- (Storage → New bucket → Public). É onde ficam as fotos dos eventos.
-- =====================================================
