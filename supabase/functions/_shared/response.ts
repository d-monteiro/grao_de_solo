// ============================================================
// Shared JSON response helper
// ============================================================
import { corsHeaders } from "./cors.ts";

export function jsonResponse(
  data: Record<string, unknown>,
  status = 200,
  extraHeaders?: Record<string, string>
): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
      ...extraHeaders,
    },
  });
}
