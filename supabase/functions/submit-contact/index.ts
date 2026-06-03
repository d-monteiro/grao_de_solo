// ============================================================
// Grão de Solo — Submit Contact (público)
// ============================================================
// Recebe o formulário de contacto do site, grava em `contact_messages`
// e (opcionalmente) notifica o atelier por email via Resend.
//
// Pública: verify_jwt = false (ver supabase/config.toml).
// Secrets usados (já presentes por defeito): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
// Opcional: RESEND_API_KEY + FROM_EMAIL + NOTIFY_EMAIL (notificação por email).
//
// Deploy: supabase functions deploy submit-contact
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import { handleCors } from "../_shared/cors.ts";
import { jsonResponse } from "../_shared/response.ts";
import { escapeHtml } from "../_shared/html.ts";

const FUNC = "[submit-contact]";

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  company?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const clamp = (v: string, max: number) => v.trim().slice(0, max);

async function notifyByEmail(name: string, email: string, phone: string, message: string) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) {
    console.warn(`${FUNC} RESEND_API_KEY ausente — notificação por email ignorada`);
    return;
  }
  const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "onboarding@resend.dev";
  const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL") || "graodesolo@gmail.com";

  const html = `<h2 style="font-family:Georgia,serif;color:#4A6B2A;">Novo contacto — Grão de Solo</h2>
    <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    ${phone ? `<p><strong>Telefone:</strong> ${escapeHtml(phone)}</p>` : ""}
    <p><strong>Mensagem:</strong></p>
    <p style="white-space:pre-wrap;">${escapeHtml(message)}</p>`;

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: NOTIFY_EMAIL,
      reply_to: email,
      subject: `Novo contacto do site — ${name}`,
      html,
    }),
  });
}

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = (await req.json()) as ContactPayload;

    // Honeypot — bot preencheu o campo escondido. Finge sucesso, não grava.
    if (body.company && body.company.trim() !== "") {
      return jsonResponse({ success: true });
    }

    const name = clamp(body.name ?? "", 120);
    const email = clamp(body.email ?? "", 160);
    const phone = clamp(body.phone ?? "", 40);
    const message = clamp(body.message ?? "", 4000);

    if (!name || !email || !message) {
      return jsonResponse({ error: "Campos obrigatórios em falta." }, 400);
    }
    if (!EMAIL_RE.test(email)) {
      return jsonResponse({ error: "Email inválido." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { error } = await supabase
      .from("contact_messages")
      .insert({ name, email, phone: phone || null, message });

    if (error) {
      console.error(`${FUNC} DB insert error:`, error);
      return jsonResponse({ error: "Não foi possível guardar a mensagem." }, 500);
    }

    // Notificação por email — não bloqueia a resposta em caso de falha.
    try {
      await notifyByEmail(name, email, phone, message);
    } catch (mailErr) {
      console.error(`${FUNC} email notify failed:`, mailErr);
    }

    return jsonResponse({ success: true });
  } catch (err) {
    console.error(`${FUNC} Error:`, err);
    return jsonResponse({ error: "Pedido inválido." }, 400);
  }
});
