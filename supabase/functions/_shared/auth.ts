// ============================================================
// Shared auth helpers for edge functions
// ============================================================

/**
 * Verifica se o request tem o service role key correto.
 * Usar para chamadas server-to-server entre edge functions.
 */
export function verifyServiceRole(req: Request): boolean {
  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!serviceKey) {
    console.error("[auth] SUPABASE_SERVICE_ROLE_KEY not set");
    return false;
  }

  return token === serviceKey;
}

/**
 * Extrai e verifica JWT do Supabase para requests de frontend.
 * Retorna o user ID ou null.
 */
export async function verifyJwt(req: Request): Promise<string | null> {
  const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");

  const authHeader = req.headers.get("authorization") || "";
  const token = authHeader.replace("Bearer ", "");

  if (!token) return null;

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) return null;
  return user.id;
}
