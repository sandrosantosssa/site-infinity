-- =============================================================
-- Site Infinity Sistemas — schema Supabase
-- Cole no SQL Editor → New query → Run
-- =============================================================
-- Eventos = subpastas no Storage (bucket público "site-midia/eventos/").
-- Mensagens de contato gravadas pela função serverless (service role).
-- =============================================================

-- ---------- Mensagens de contato ----------
create table if not exists contatos (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  email text not null,
  telefone text,
  mensagem text not null,
  created_at timestamptz default now()
);

alter table contatos enable row level security;
-- Sem policies públicas: leitura/escrita só via service role (função api/contact).

-- =====================================================
-- STORAGE — bucket público "site-midia"
-- =====================================================
-- 1) Crie o bucket no painel: Storage → New bucket → nome "site-midia" → PUBLIC.
-- 2) As fotos dos eventos ficam em:  eventos/<Nome do Evento>/foto1.jpg ...
--    (uma subpasta por evento; o nome da pasta vira o título no site)
-- 3) Rode a policy abaixo para permitir LISTAR/LER o bucket publicamente:

drop policy if exists "site_midia_public_read" on storage.objects;
create policy "site_midia_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'site-midia');

-- Pronto: o site lê os eventos automaticamente do Storage, sem redeploy.
-- Para adicionar um evento: crie a pasta eventos/<Nome>/ e suba as fotos.
-- Para ordenar: prefixe a pasta com número, ex: "01 - Treinamento de Power BI".
