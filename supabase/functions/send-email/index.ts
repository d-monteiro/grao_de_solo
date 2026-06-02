// ============================================================
// TEMPLATE DORMANT — Send Email (Resend)
// ============================================================
// Activar quando o projeto precisar de enviar emails.
// Secrets necessarios: RESEND_API_KEY, SUPABASE_SERVICE_ROLE_KEY
//
// Setup:
// 1. Criar conta Resend + verificar dominio
// 2. Adicionar RESEND_API_KEY + FROM_EMAIL nos Supabase Secrets
// 3. Deploy: supabase functions deploy send-email
// ============================================================

import { handleCors } from "../_shared/cors.ts";
import { jsonResponse } from "../_shared/response.ts";
import { verifyServiceRole } from "../_shared/auth.ts";
import { escapeHtml } from "../_shared/html.ts";

const FUNC = "[send-email]";

// Email shell — personalizar design por projeto
function emailShell(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0A0F1C;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:40px 20px;">
  <tr><td style="text-align:center;padding-bottom:30px;">
    <h1 style="color:#D4A843;font-size:24px;margin:0;">${title}</h1>
  </td></tr>
  <tr><td style="background:#111827;border-radius:12px;padding:30px;color:#E5E7EB;font-size:15px;line-height:1.6;">
    ${body}
  </td></tr>
  <tr><td style="text-align:center;padding-top:30px;color:#6B7280;font-size:12px;">
    &copy; ${new Date().getFullYear()} — Enviado automaticamente
  </td></tr>
</table>
</body>
</html>`;
}

// Tipos de email suportados — adicionar conforme necessario
function buildWelcomeEmail(name: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  return {
    subject: "Bem-vindo!",
    html: emailShell(
      "Bem-vindo! 🎉",
      `<p>Ola <strong>${safeName}</strong>,</p>
       <p>A tua conta foi criada com sucesso. Ja podes comecar a explorar a plataforma.</p>
       <p style="text-align:center;padding:20px 0;">
         <a href="${Deno.env.get("APP_URL") || "https://app.example.com"}/dashboard"
            style="display:inline-block;padding:12px 30px;background:#D4A843;color:#0A0F1C;border-radius:8px;text-decoration:none;font-weight:bold;">
           Ir para o Dashboard
         </a>
       </p>`
    ),
  };
}

function buildPurchaseEmail(name: string, tier: string): { subject: string; html: string } {
  const safeName = escapeHtml(name);
  return {
    subject: "Compra confirmada!",
    html: emailShell(
      "Compra Confirmada ✅",
      `<p>Ola <strong>${safeName}</strong>,</p>
       <p>O teu plano <strong>${escapeHtml(tier)}</strong> esta ativo. Bom trabalho!</p>`
    ),
  };
}

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Auth: service role key
  if (!verifyServiceRole(req)) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  try {
    const { type, to, name, tier } = await req.json();

    if (!type || !to || !name) {
      return jsonResponse({ error: "Missing: type, to, name" }, 400);
    }

    let emailData: { subject: string; html: string };

    switch (type) {
      case "welcome":
        emailData = buildWelcomeEmail(name);
        break;
      case "purchase":
        emailData = buildPurchaseEmail(name, tier || "");
        break;
      default:
        return jsonResponse({ error: `Unknown email type: ${type}` }, 400);
    }

    // Enviar via Resend
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      console.warn(`${FUNC} RESEND_API_KEY not set — skipping`);
      return jsonResponse({ skipped: true, reason: "RESEND_API_KEY not set" });
    }

    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "onboarding@resend.dev";

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject: emailData.subject,
        html: emailData.html,
      }),
    });

    const result = await res.json();
    console.log(`${FUNC} Email sent (${type}) to ${to}:`, result);

    return jsonResponse({ success: true, id: result.id });
  } catch (err) {
    console.error(`${FUNC} Error:`, err);
    return jsonResponse({ error: "Failed to send email" }, 500);
  }
});
