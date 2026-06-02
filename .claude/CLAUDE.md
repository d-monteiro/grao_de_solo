# Flowzi Base — Claude Code Rules

## REGRA ZERO: Primeiro Chat em Projeto Vazio
Se este e o primeiro chat E o projeto so tem ficheiros base do boilerplate:
1. Assumir que e um projeto novo
2. Activar `/project-init` automaticamente (SEM o user pedir)
3. Pedir ao user para falar do projeto de forma natural e conversacional
4. Fazer perguntas pelo meio da conversa, nao como wizard
5. Se o user disser "faz tu" / "escolhe tu" → escolher a opcao otimizada, mostrar o que escolheste, perguntar se quer mudar

## Comportamento do Claude

### Quando o user pede algo
1. **Planear primeiro** — mostrar o que vais fazer e como
2. **Esperar confirmacao** — so avancar depois do user aprovar o plano
3. **Executar** — fazer o trabalho
4. **Documentar** — actualizar CLAUDE.md + README com as mudancas

### Quando o user diz "faz tu" / "nao sei"
- Escolher a opcao mais otimizada com base no contexto do projeto
- Mostrar o que escolheste e porquê
- Perguntar no fim se quer mudar alguma coisa

### Documentacao — SEMPRE no fim de cada tarefa
Actualizar TODOS estes ficheiros quando relevante:
- `CLAUDE.md` (raiz) — descricao do projeto, estado actual, integracoes
- `.claude/CLAUDE.md` — regras tecnicas especificas do projeto
- `README.md` — setup e comandos
- Comentarios no codigo quando a logica nao e obvia

### Novo chat (user volta no dia seguinte)
- Ler CLAUDE.md e ter contexto completo do projeto
- Comecar a trabalhar directamente sem perguntar "em que estavas?"
- Se o user perguntar algo, responder com contexto total

## Stack Padrao
- **Frontend:** React 18 + TypeScript + Vite (SPA) + Tailwind CSS + shadcn/ui
- **Backend/DB:** Supabase (Auth + DB + Storage + Edge Functions)
- **Data Fetching:** React Query (@tanstack/react-query)
- **Error Monitoring:** Sentry (sendDefaultPii: false)
- Pagamentos, email, CRM, video — modulos opcionais

## Regras de Desenvolvimento
- **Max 150 linhas por componente.** Dividir automaticamente se exceder. Separar UI de logica.
- TypeScript strict, zero erros no build
- Tailwind + shadcn/ui para toda a UI
- Testar com `npm run build` antes de dar tarefa como feita
- Preferir editar ficheiros existentes a criar novos
- Nao adicionar features alem do pedido
- **Mobile-first** — optimizar sempre para mobile e desktop

### Error Handling
- Mensagens de erro criativas e adaptadas ao negocio (nao generico "Erro ao carregar")
- Ex: restaurante → "Ops, o menu fugiu da cozinha! Tenta novamente."
- Ex: SaaS → "Nao conseguimos carregar os dados. Verifica a tua ligacao."
- Sempre incluir botao de retry
- Toast para erros de accoes (guardar, apagar), inline para erros de pagina

### Loading States
- Skeleton loaders para listas e conteudo principal
- Spinner (Loader2) para accoes (botoes, submits)
- Nunca pagina inteira em branco — sempre feedback visual

## Seguranca (CRITICO)
- **API keys NUNCA no frontend** — so em Edge Functions (`Deno.env.get`)
- **RLS em TODAS as tabelas** — pattern `(select auth.uid())` obrigatorio
- **SECURITY DEFINER helpers** obrigatorios para role checks
- **`protect_profile_fields` trigger** em profiles
- **Webhook HMAC verification** obrigatoria em producao
- `verify_jwt: false` nas edge functions com auth custom
- Migrations = source of truth

## Armadilhas (decorar)
1. **AUTH DEADLOCK:** nunca await Supabase dentro de `onAuthStateChange` → `setTimeout(fn, 0)`
2. **Loading state:** three-way (`loading ? null : auth ? menu : login`)
3. **RLS recursion:** policies em profiles que query profiles → SECURITY DEFINER
4. **Generated columns:** nao podem INSERT diretamente
5. **Edge function secrets:** pode precisar redeploy apos adicionar
6. **Migrations = source of truth:** se nao esta no SQL, nao existe

## QA e Testes
- Antes de considerar funcionalidade completa: testar em preview/producao
- Se algo partir, corrigir imediatamente
- Usar `npm run build` como gate minimo
- Verificar que RLS funciona (testar como user normal E como admin)
- Testar fluxo completo de auth (signup → login → pagina protegida → logout)

## Comandos
```bash
npm run dev          # Dev server :8080
npm run build        # Build producao
npm run lint         # ESLint
npm run types        # Regenerar database types
```
