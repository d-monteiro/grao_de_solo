---
name: security-check
description: "Verificacao de seguranca pre-push. Corre antes de cada push para garantir que nao ha vulnerabilidades."
user_invocable: true
---

# Security Check — Pre-Push Verification

Executa as seguintes verificacoes de seguranca no projeto:

## 1. Secrets no Codigo
- Procurar por API keys, tokens, passwords hardcoded em src/
- Verificar que nenhum ficheiro .env esta tracked pelo git
- Confirmar que VITE_DEV_PASSWORD nao esta em .env commitado
- Procurar por strings que parecam secrets (sk_live_, sk_test_, Bearer eyJ, etc.)

## 2. RLS Verification
- Verificar que TODAS as tabelas em supabase/migrations/ tem `ENABLE ROW LEVEL SECURITY`
- Verificar que policies usam `(select auth.uid())` e NAO `auth.uid()` bare
- Confirmar existencia de `protect_profile_fields` trigger

## 3. SECURITY DEFINER
- Verificar que existem helpers: is_admin(), has_course_access(), has_active_subscription()
- Confirmar que todos tem `SET search_path = public`

## 4. Edge Functions
- Verificar que nenhuma edge function tem API keys hardcoded
- Confirmar que webhooks tem HMAC verification
- Verificar CORS headers usam ALLOWED_ORIGIN do env

## 5. Frontend
- Procurar por `dangerouslySetInnerHTML` em componentes
- Verificar que src/ nao importa `Deno.env` ou service role keys
- Confirmar que supabase.ts so usa VITE_SUPABASE_ANON_KEY

## Output
Apresentar resultados como checklist:
- ✅ Passou
- ❌ Falhou (com ficheiro e linha)
- ⚠️ Aviso (nao bloqueia mas deve ser revisto)
