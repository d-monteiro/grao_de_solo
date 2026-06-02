---
name: whop-setup
description: "Guia completo para integrar Whop como alternativa ao Stripe. Usar quando o cliente preferir Whop para pagamentos."
user_invocable: true
---

# Whop Setup — Guia de Integracao (Alternativa ao Stripe)

## Quando usar Whop vs Stripe
- **Whop:** Bom para infoprodutos, cursos, comunidades. Marketplace built-in.
- **Stripe:** Mais flexivel, padrao da industria, melhor para SaaS e custom flows.

## Passo 1: Conta Whop
1. Criar conta em whop.com
2. Criar Company
3. Criar Products (um por tier)
4. Criar Plans dentro de cada Product (one-time ou recurring)

## Passo 2: Webhook
1. Criar nova edge function baseada no template `stripe-webhook` mas com HMAC do Whop
2. Whop usa **Standard Webhooks** spec:
   - Headers: `webhook-id`, `webhook-timestamp`, `webhook-signature`
   - Signature: HMAC-SHA256 do `{webhook-id}.{webhook-timestamp}.{body}`
   - Base64 encoded
3. Fallback: header `x-whop-signature` (HMAC simples)

## Passo 3: Secrets
```
# Supabase Secrets
WHOP_WEBHOOK_SECRET=whsec_xxx
WHOP_API_KEY=xxx
WHOP_PRODUCT_CURSO=prod_xxx
WHOP_PRODUCT_MENTORIA_MENSAL=prod_xxx
WHOP_PRODUCT_MENTORIA_TRIMESTRAL=prod_xxx
```

## Passo 4: User Matching
Whop usa email-based matching:
1. Checkout link pre-fills email do user: `?email={user_email}`
2. Webhook recebe email → lookup no profiles
3. Grant access + create subscription

## Passo 5: Frontend
```typescript
export const WHOP_LINKS = {
  curso: import.meta.env.VITE_WHOP_LINK_CURSO || "",
  mentoria_mensal: import.meta.env.VITE_WHOP_LINK_MENSAL || "",
};

export function getWhopCheckoutUrl(tier: string, email?: string): string {
  const base = WHOP_LINKS[tier] || "";
  if (!base) return "";
  return email ? `${base}?email=${encodeURIComponent(email)}` : base;
}
```

## Passo 6: Eventos Whop
| Evento | Accao |
|--------|-------|
| `membership.activated` | Grant access + welcome email |
| `membership.deactivated` | Revoke subscription (manter course access) |
| `payment.succeeded` | Log only |
| `payment.failed` | Notificacao in-app |

## Codigo Promocional para Testes
Criar promo code 100% off no Whop Dashboard para testar o fluxo completo.
