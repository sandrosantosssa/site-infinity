// ============================================================
// Site Infinity — Formulário de contato
// POST /api/contact  body: { nome, email, telefone?, mensagem }
// Salva em "contatos" (service role) e envia e-mail (Resend).
//
// Env vars (Vercel): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY,
//   RESEND_API_KEY, EMAIL_FROM, CONTACT_TO
// ============================================================

import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = process.env.SUPABASE_URL ?? '';
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const EMAIL_FROM = process.env.EMAIL_FROM ?? 'Infinity Sistemas <onboarding@resend.dev>';
const CONTACT_TO = process.env.CONTACT_TO ?? '';

// Supabase é opcional: se não estiver configurado, o contato só envia e-mail.
const admin =
  SUPABASE_URL && SERVICE_ROLE
    ? createClient(SUPABASE_URL, SERVICE_ROLE, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { nome, email, telefone, mensagem } = (req.body ?? {}) as {
    nome?: string;
    email?: string;
    telefone?: string;
    mensagem?: string;
  };

  const n = (nome ?? '').trim();
  const e = (email ?? '').trim();
  const msg = (mensagem ?? '').trim();
  const tel = (telefone ?? '').trim();

  if (!n || !e || !msg) {
    return res.status(400).json({ error: 'Nome, e-mail e mensagem são obrigatórios' });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
    return res.status(400).json({ error: 'E-mail inválido' });
  }

  // 1) Salva no banco (se o Supabase estiver configurado)
  if (admin) {
    const { error: dbErr } = await admin
      .from('contatos')
      .insert({ nome: n, email: e, telefone: tel || null, mensagem: msg });
    if (dbErr) return res.status(500).json({ error: dbErr.message });
  }

  // 2) Envia e-mail (best-effort)
  if (CONTACT_TO) {
    try {
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from: EMAIL_FROM,
        to: CONTACT_TO,
        replyTo: e,
        subject: `Novo contato pelo site — ${n}`,
        html: `
          <div style="font-family:Arial,sans-serif;color:#14191a;">
            <h2 style="margin:0 0 12px;">Novo contato pelo site</h2>
            <p><strong>Nome:</strong> ${escapeHtml(n)}</p>
            <p><strong>E-mail:</strong> ${escapeHtml(e)}</p>
            ${tel ? `<p><strong>Telefone:</strong> ${escapeHtml(tel)}</p>` : ''}
            <p><strong>Mensagem:</strong></p>
            <p style="white-space:pre-line;background:#f4f7f7;padding:12px;border-radius:8px;">${escapeHtml(msg)}</p>
          </div>`,
      });
    } catch {
      /* e-mail é best-effort — já salvamos no banco */
    }
  }

  return res.status(200).json({ ok: true });
}
