# Flowzi Base

Template base para projectos React + Supabase.

## Stack
- React 19 + TypeScript + Vite 6 + SWC
- Tailwind CSS v4 + shadcn/ui
- React Router + React Query
- Supabase (Auth + DB + Storage + Edge Functions)

## Quick Start

```bash
# 1. Clonar
git clone https://github.com/flowzi-dev/template.git nome-do-projecto
cd nome-do-projecto
rm -rf .git && git init

# 2. Renomear (ver SETUP.md para lista completa)
# Mudar "Flowzi Base" para o nome do projecto em package.json, index.html, etc.

# 3. Instalar
npm install

# 4. Dev
npm run dev    # localhost:8080
```

Supabase e opcional em dev — a app funciona sem credenciais configuradas.

## Estrutura

```
src/
├── components/
│   ├── ui/         # shadcn/ui primitivas
│   ├── layout/     # Layout da app
│   ├── auth/       # Autenticacao
│   └── shared/     # Componentes partilhados
├── contexts/       # React Contexts
├── hooks/          # Custom hooks
├── lib/            # Supabase client, utils
├── pages/          # Paginas da app
├── services/       # Data access layer
└── types/          # TypeScript types
```

## Comandos

```bash
npm run dev          # Dev server :8080
npm run build        # Build producao (tsc + vite build)
npm run lint         # ESLint
```

## Code Quality

- ESLint: `any` proibido, vars mortas, `===` obrigatorio
- CI: lint com `--max-warnings 0`, TypeScript check, build
- Ver [LINTING.md](LINTING.md) para detalhes

## Docs

- [SETUP.md](SETUP.md) — guia de setup completo para novo projecto
- [ARCHITECTURE.md](ARCHITECTURE.md) — estrutura e organizacao
- [LINTING.md](LINTING.md) — regras de code quality
