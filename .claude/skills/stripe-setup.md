---
name: stripe-setup
description: "Guia completo para integrar Stripe. Usar quando pedirem para configurar pagamentos com Stripe."
user_invocable: true
---

# Stripe Setup — Guia de Integracao

## Passo 1: Conta Stripe
1. Criar conta em stripe.com
2. Activar modo Test
3. Obter Secret Key (sk_test_xxx) e Publishable Key (pk_test_xxx)

## Passo 2: Produtos e Precos
1. No Stripe Dashboard → Products → Add Product
2. Criar um produto por tier (ex: "Curso", "Mentoria Mensal", "Mentoria Trimestral")
3. Definir precos (one-time ou recurring)
4. Copiar Payment Links ou criar Checkout Sessions

## Passo 3: Webhook
1. Activar o template dormant: `supabase/functions/stripe-webhook/index.ts`
2. Descomentar a logica no switch/case
3. Adicionar secrets no Supabase Dashboard:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxx
   ```
4. Deploy: `supabase functions deploy stripe-webhook`
5. No Stripe Dashboard → Webhooks → Add endpoint:
   - URL: `https://<ref>.supabase.co/functions/v1/stripe-webhook`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

## Passo 4: Frontend
Criar `src/lib/stripe.ts`:
```typescript
export const STRIPE_LINKS = {
  curso: import.meta.env.VITE_STRIPE_LINK_CURSO || "",
  mentoria_mensal: import.meta.env.VITE_STRIPE_LINK_MENSAL || "",
  mentoria_trimestral: import.meta.env.VITE_STRIPE_LINK_TRIMESTRAL || "",
};

export function getCheckoutUrl(tier: string, email?: string): string {
  const base = STRIPE_LINKS[tier] || "";
  if (!base) return "";
  const url = new URL(base);
  if (email) url.searchParams.set("prefilled_email", email);
  return url.toString();
}
```

## Passo 5: Testar
1. Instalar Stripe CLI: `brew install stripe/stripe-cli/stripe`
2. Login: `stripe login`
3. Forward webhooks: `stripe listen --forward-to http://localhost:54321/functions/v1/stripe-webhook`
4. Trigger test: `stripe trigger checkout.session.completed`

## Passo 6: Producao
1. Activar conta live no Stripe
2. Trocar secret keys para live (sk_live_xxx)
3. Criar novo webhook endpoint com URL de producao
4. Actualizar STRIPE_WEBHOOK_SECRET nos Supabase Secrets

## Env Vars Necessarias
```
# Supabase Secrets (Dashboard)
STRIPE_WEBHOOK_SECRET=whsec_xxx

# .env (frontend)
VITE_STRIPE_LINK_CURSO=https://buy.stripe.com/xxx
VITE_STRIPE_LINK_MENSAL=https://buy.stripe.com/xxx
VITE_STRIPE_LINK_TRIMESTRAL=https://buy.stripe.com/xxx
```
