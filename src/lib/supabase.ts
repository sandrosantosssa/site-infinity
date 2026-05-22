import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/** Cliente Supabase (null se as variáveis ainda não estiverem configuradas). */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
export const hasSupabase = Boolean(url && anonKey);
