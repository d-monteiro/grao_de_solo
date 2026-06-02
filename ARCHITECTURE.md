# Flowzi Base — Architecture

Guia de estrutura e organizacao do projecto.

---

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite (SWC) |
| UI | Tailwind CSS + shadcn/ui (Radix UI) |
| Backend/DB | Supabase (Auth + PostgreSQL + Storage + Edge Functions) |
| Data Fetching | React Query (@tanstack/react-query) |
| Routing | React Router DOM |
| Error Monitoring | Sentry |

---

## Principio Base: Fluxo Unidireccional

O codigo flui numa so direccao — de camadas partilhadas para paginas. Nunca ao contrario.

```
  Camadas Partilhadas
  (lib/, components/ui, hooks/, types/)
          ↓
  Paginas + Features
  (pages/, components/layout, components/auth)
          ↓
  App.tsx (composicao e routing)
```

---

## Estrutura de Pastas

```
flowzi-base/
├── public/              # Assets estaticos
├── src/
│   ├── App.tsx          # Routing e composicao
│   ├── main.tsx         # Entry point
│   ├── index.css        # Tailwind + CSS variables
│   ├── components/
│   │   ├── ui/          # Primitivas shadcn/ui (Button, Input, etc.)
│   │   ├── layout/      # Layout da app (Sidebar, Header, etc.)
│   │   ├── auth/        # Componentes de autenticacao
│   │   └── shared/      # Componentes partilhados com logica de negocio
│   ├── contexts/        # React Contexts (AuthContext)
│   ├── hooks/           # Custom hooks partilhados
│   ├── lib/             # Supabase client, utils, helpers
│   ├── pages/           # Paginas da app
│   │   └── admin/       # Paginas de administracao
│   ├── services/        # Data access layer (queries ao Supabase)
│   └── types/           # TypeScript types (auto-generated do Supabase)
├── supabase/
│   ├── functions/       # Edge Functions (Deno)
│   ├── migrations/      # SQL migrations (source of truth)
│   └── seed.sql         # Dados de teste
├── .github/workflows/   # CI pipeline
├── tailwind.config.ts
├── vite.config.ts
└── tsconfig.json
```

---

## Regras de Organizacao

### `src/components/ui/`
Primitivas de UI sem logica de negocio. Vem do shadcn/ui. Nao importam de `services/`, `contexts/` ou `pages/`.

### `src/components/shared/`
Componentes reutilizaveis que podem ter logica de negocio (ex: card de membro, formulario de aula).

### `src/services/`
Camada de acesso a dados. Cada ficheiro agrupa queries/mutations do Supabase por dominio (ex: `members.ts`, `classes.ts`). As paginas e componentes usam estes services — nunca chamam o Supabase directamente.

### `src/pages/`
Paginas da app. Composicao de componentes. Logica complexa deve estar em hooks ou services, nao inline nas paginas.

### `src/lib/`
Utilitarios partilhados: Supabase client (`supabase.ts`), funcoes helper (`utils.ts`).

### `src/contexts/`
React Contexts globais. `AuthContext` e o principal — gere o estado de autenticacao.

### `src/types/`
Types gerados automaticamente a partir do schema do Supabase (`npm run types`).

---

## Supabase como Backend

- **Auth**: Supabase Auth com email + OAuth providers
- **Database**: PostgreSQL com RLS (Row Level Security) em todas as tabelas
- **Migrations**: `supabase/migrations/` e o source of truth do schema
- **Edge Functions**: Para logica server-side (Deno runtime, secrets via `Deno.env.get`)
- **Storage**: Para ficheiros e imagens

---

## Guia Rapido

| Estou a criar... | Coloco em... |
|---|---|
| Componente UI generico sem logica | `src/components/ui/` |
| Componente partilhado com logica | `src/components/shared/` |
| Hook reutilizavel | `src/hooks/` |
| Query/mutation ao Supabase | `src/services/` |
| Nova pagina | `src/pages/` |
| Utilitario generico | `src/lib/` |
| Nova tabela | `supabase/migrations/` |
| Logica server-side com secrets | `supabase/functions/` |
