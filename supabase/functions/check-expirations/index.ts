// ============================================================
// TEMPLATE DORMANT — Check Expirations (Cron)
// ============================================================
// Activar quando o projeto tiver subscricoes com expiracao.
// Secrets necessarios: SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY
//
// Setup:
// 1. Deploy: supabase functions deploy check-expirations
// 2. Configurar cron diario no Supabase Dashboard:
//    Schedule → Criar job → 0 8 * * * (todos os dias as 8h)
//    URL: https://<ref>.supabase.co/functions/v1/check-expirations
//    Authorization: Bearer <service_role_key>
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { jsonResponse } from "../_shared/response.ts";
import { verifyServiceRole } from "../_shared/auth.ts";

const FUNC = "[check-expirations]";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Auth: service role key
  if (!verifyServiceRole(req)) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const stats = {
    expired: 0,
    reminders_7d: 0,
    reminders_1d: 0,
  };

  try {
    const now = new Date();

    // 1. Marcar subscricoes expiradas
    const { data: expiredSubs } = await supabase
      .from("subscriptions")
      .select("id, user_id, tier, expires_at")
      .eq("status", "active")
      .lt("expires_at", now.toISOString());

    if (expiredSubs?.length) {
      for (const sub of expiredSubs) {
        console.log(`${FUNC} Expiring subscription ${sub.id} for user ${sub.user_id}`);

        // Marcar como expirada
        await supabase
          .from("subscriptions")
          .update({ status: "expired" })
          .eq("id", sub.id);

        // Notificacao in-app
        await supabase.from("notifications").insert({
          user_id: sub.user_id,
          title: "Subscricao expirada",
          message: `A tua subscricao ${sub.tier} expirou. Renova para manter o acesso.`,
          type: "warning",
          action_url: "/definicoes",
        });

        stats.expired++;
      }
    }

    // 2. Reminders 7 dias antes
    const sevenDays = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const sixDays = new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000);

    const { data: subs7d } = await supabase
      .from("subscriptions")
      .select("id, user_id, tier, expires_at")
      .eq("status", "active")
      .gte("expires_at", sixDays.toISOString())
      .lt("expires_at", sevenDays.toISOString());

    if (subs7d?.length) {
      for (const sub of subs7d) {
        await supabase.from("notifications").insert({
          user_id: sub.user_id,
          title: "Subscricao expira em 7 dias",
          message: `A tua subscricao ${sub.tier} expira em breve. Renova para nao perder o acesso.`,
          type: "info",
        });
        stats.reminders_7d++;
      }
    }

    // 3. Reminders 1 dia antes
    const oneDay = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
    const zeroDays = new Date(now.getTime());

    const { data: subs1d } = await supabase
      .from("subscriptions")
      .select("id, user_id, tier, expires_at")
      .eq("status", "active")
      .gte("expires_at", zeroDays.toISOString())
      .lt("expires_at", oneDay.toISOString());

    if (subs1d?.length) {
      for (const sub of subs1d) {
        await supabase.from("notifications").insert({
          user_id: sub.user_id,
          title: "Subscricao expira amanha!",
          message: `A tua subscricao ${sub.tier} expira amanha. Renova ja!`,
          type: "warning",
        });
        stats.reminders_1d++;
      }
    }

    console.log(`${FUNC} Done:`, stats);
    return jsonResponse({ success: true, stats });
  } catch (err) {
    console.error(`${FUNC} Error:`, err);
    return jsonResponse({ error: "Processing failed" }, 500);
  }
});
