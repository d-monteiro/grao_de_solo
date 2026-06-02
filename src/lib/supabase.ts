import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const hasCredentials = !!(supabaseUrl && supabaseAnonKey);

if (!hasCredentials && import.meta.env.PROD) {
  throw new Error(
    "VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY sao obrigatorios em producao",
  );
}

export const supabase = hasCredentials
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;
