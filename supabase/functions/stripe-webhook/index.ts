// ============================================================
// TEMPLATE DORMANT — Stripe Webhook
// ============================================================
// Activar quando o projeto usar Stripe para pagamentos.
// Secrets necessarios: STRIPE_WEBHOOK_SECRET, SUPABASE_SERVICE_ROLE_KEY
//
// Setup:
// 1. Criar webhook no Stripe Dashboard apontando para esta function
// 2. Adicionar STRIPE_WEBHOOK_SECRET nos Supabase Secrets
// 3. Fazer deploy: supabase functions deploy stripe-webhook
// 4. Testar com Stripe CLI: stripe listen --forward-to <url>
// ============================================================

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const FUNC = "[stripe-webhook]";

// HMAC signature verification
async function verifyStripeSignature(
  payload: string,
  sigHeader: string,
  secret: string
): Promise<boolean> {
  const parts = sigHeader.split(",").reduce((acc, part) => {
    const [key, value] = part.split("=");
    acc[key.trim()] = value;
    return acc;
  }, {} as Record<string, string>);

  const timestamp = parts["t"];
  const expectedSig = parts["v1"];

  if (!timestamp || !expectedSig) return false;

  // Replay protection: reject signatures older than 5 minutes
  const age = Math.floor(Date.now() / 1000) - parseInt(timestamp);
  if (age > 300) {
    console.warn(`${FUNC} Signature expired (${age}s old)`);
    return false;
  }

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signedPayload)
  );

  const computed = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  // Constant-time comparison
  if (computed.length !== expectedSig.length) return false;
  let result = 0;
  for (let i = 0; i < computed.length; i++) {
    result |= computed.charCodeAt(i) ^ expectedSig.charCodeAt(i);
  }
  return result === 0;
}

Deno.serve(async (req) => {
  // Apenas POST
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  if (!WEBHOOK_SECRET) {
    console.error(`${FUNC} STRIPE_WEBHOOK_SECRET not set`);
    return new Response("Server config error", { status: 500 });
  }

  // Verificar signature
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  const valid = await verifyStripeSignature(body, sig, WEBHOOK_SECRET);
  if (!valid) {
    console.error(`${FUNC} Invalid signature`);
    return new Response("Invalid signature", { status: 401 });
  }

  // Parse event
  const event = JSON.parse(body);
  console.log(`${FUNC} Event: ${event.type}, ID: ${event.id}`);

  // Supabase client (service role)
  const _supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const email = session.customer_email || session.customer_details?.email;
        console.log(`${FUNC} Checkout completed for ${email}`);

        // TODO: Encontrar user por email, criar subscription, grant access
        // const { data: profile } = await supabase
        //   .from("profiles")
        //   .select("id")
        //   .eq("email", email)
        //   .single();
        //
        // if (profile) {
        //   await supabase.from("subscriptions").insert({
        //     user_id: profile.id,
        //     tier: "...",
        //     status: "active",
        //     provider: "stripe",
        //     provider_subscription_id: session.subscription,
        //   });
        // }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object;
        console.log(`${FUNC} Subscription updated: ${sub.id}, status: ${sub.status}`);
        // TODO: Atualizar subscription na DB
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object;
        console.log(`${FUNC} Subscription deleted: ${sub.id}`);
        // TODO: Marcar subscription como cancelled
        break;
      }

      default:
        console.log(`${FUNC} Unhandled event type: ${event.type}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(`${FUNC} Error:`, err);
    return new Response(JSON.stringify({ error: "Processing failed" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
