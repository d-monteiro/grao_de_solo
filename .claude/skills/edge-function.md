---
name: edge-function
description: "Scaffold de nova Edge Function com CORS, auth, error handling e logging. Usar quando pedirem para criar edge function ou webhook."
user_invocable: true
---

# Edge Function Scaffold

Quando o user pedir para criar uma nova Edge Function, seguir este template:

## Estrutura do Ficheiro

Criar `supabase/functions/<nome>/index.ts`:

```typescript
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { jsonResponse } from "../_shared/response.ts";

const FUNC = "[<nome>]";

Deno.serve(async (req) => {
  // CORS
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  // Auth (escolher um):
  // Opcao A: JWT do frontend
  // const userId = await verifyJwt(req);
  // if (!userId) return jsonResponse({ error: "Unauthorized" }, 401);

  // Opcao B: Service role key (server-to-server)
  // if (!verifyServiceRole(req)) return jsonResponse({ error: "Unauthorized" }, 401);

  // Opcao C: Webhook HMAC (ver stripe-webhook como exemplo)

  try {
    const body = await req.json();
    console.log(`${FUNC} Request:`, body);

    // Supabase client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // TODO: Logica da function

    return jsonResponse({ success: true });
  } catch (err) {
    console.error(`${FUNC} Error:`, err);
    return jsonResponse({ error: "Processing failed" }, 500);
  }
});
```

## Checklist
- [ ] Importar de `_shared/` (cors, response, auth)
- [ ] Prefixo `[nome]` em todos os console.log
- [ ] Auth verificada (JWT, service key, ou HMAC)
- [ ] Try/catch com error logging
- [ ] CORS headers em todas as responses
- [ ] Secrets via `Deno.env.get()` (nunca hardcoded)
- [ ] Se webhook: HMAC verification obrigatoria

## Deploy
```bash
supabase functions deploy <nome>
# Se auth custom:
# Adicionar verify_jwt = false no supabase/config.toml
```
