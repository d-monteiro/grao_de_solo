# Flowzi Base — Linting & Code Quality

---

## Comandos

| Comando | O que faz |
|---|---|
| `npm run lint` | Corre ESLint no projecto |
| `npm run build` | Build de producao (TypeScript errors bloqueiam o build) |
| `npx tsc --noEmit` | Type-check sem build |

---

## CI Pipeline

GitHub Actions (`.github/workflows/ci.yml`) corre em cada PR e push para `main`:

1. `npm ci` — instalar dependencias
2. `npm audit --audit-level=high` — security audit
3. `npx tsc --noEmit` — TypeScript check
4. `npm run lint` — ESLint
5. `npm run build` — build de producao

Os 4 passos (excluindo audit que e soft-fail) tem de passar para o PR ser mergeable.

---

## TypeScript

- `tsconfig.json` com `strict: true`
- Erros de TypeScript bloqueiam o build de producao
- Usar `import type { X }` para imports que sao apenas tipos

---

## Regras Essenciais

### TypeScript
- **Sem `any`** — definir tipos proprios ou usar os gerados do Supabase
- **`const` por defeito** — so usar `let` quando a variavel e reatribuida
- **`===` sempre** — nunca usar `==` ou `!=`

### React
- **Max 150 linhas por componente** — dividir se exceder
- **Separar UI de logica** — hooks para logica, componentes para render
- **Mobile-first** — optimizar para mobile e desktop

### Imports
- Agrupar imports: externos primeiro, depois internos (com `@/`)
- Sem imports circulares
- Sem imports duplicados

---

## Boas Praticas Enforced

- Mensagens de erro criativas e contextuais (nao "Erro generico")
- Skeleton loaders para listas, Spinner para accoes
- Nunca pagina em branco — sempre feedback visual
- API keys nunca no frontend — so em Edge Functions
