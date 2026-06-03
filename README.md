# Grão de Solo

Website do atelier **Grão de Solo** — arquitetura paisagista sustentável e regenerativa (Maia, Portugal).
*Design que regenera. Paisagens para a vida.*

Single-page institucional com estética **Zen / Wabi-Sabi**: papel off-white, serif Fraunces, verde-musgo, muito espaço e fotografia respirada.

## Stack
- React 19 + TypeScript + Vite 6 (SWC)
- Tailwind CSS v4 (tema via `@theme inline` em `src/index.css`) + shadcn/ui sobre `@base-ui/react`
- React Router + React Query
- Supabase (opcional) — formulário de contacto via Edge Function, com fallback `mailto`
- Tipografia: Fraunces (títulos) + Geist (corpo), via `@fontsource-variable`

## Quick Start
```bash
npm install
npm run dev      # localhost:8080
```
O site funciona **sem Supabase** — o formulário de contacto cai automaticamente para `mailto:` pré-preenchido.

## Estrutura
```
src/
├── components/
│   ├── layout/      # Navbar, Footer
│   ├── sections/    # Hero, Manifesto, Sectors, Process, Gallery, Philosophy, Contact
│   ├── shared/      # Reveal (scroll-reveal), SectionHeading, Cta
│   └── ui/          # Primitivas (button, input, textarea, label)
├── data/            # site.ts (conteúdo), assets.ts (imagens)
├── hooks/           # useInView, useContactForm
├── services/        # contact.ts (envio do formulário)
├── pages/           # Home.tsx (compõe as secções)
└── index.css        # Design system (tokens OKLCH + fontes)
```

Conteúdo e imagens são centralizados em `src/data/` — editar aí muda o site inteiro.

## Secções
Hero → Atelier (manifesto) → Setores (residencial + urbano) → Processo (5 fases) → Trabalhos (galeria) → Filosofia → Contacto → Footer. Navegação por âncoras com smooth-scroll.

## Formulário de contacto
- **Sem backend:** abre o cliente de email pré-preenchido (`mailto:`). Funciona já.
- **Com Supabase ligado:** grava em `contact_messages` e notifica por email (Resend, opcional).

Ativar o backend (resumo — detalhes em [SETUP.md](SETUP.md)):
1. Criar projeto Supabase, preencher `.env` (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
2. Aplicar migrations (`supabase/migrations/`) — inclui `005_contact_messages.sql`.
3. `supabase functions deploy submit-contact` (pública, `verify_jwt = false`).
4. (Opcional) Secrets `RESEND_API_KEY` + `FROM_EMAIL` + `NOTIFY_EMAIL` para notificação por email.

## Comandos
```bash
npm run dev          # Dev server :8080
npm run build        # Build produção (tsc + vite build)
npm run lint         # ESLint
```

## Docs
- [SETUP.md](SETUP.md) — setup e ativação do backend
- [ARCHITECTURE.md](ARCHITECTURE.md) — estrutura e organização
- [LINTING.md](LINTING.md) — regras de code quality
