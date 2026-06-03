# Setup — Novo Projeto

Guia passo-a-passo para iniciar um novo projecto a partir do template Flowzi Base.

## 1. Clonar e Renomear

```bash
git clone https://github.com/flowzi-dev/template.git nome-do-projecto
cd nome-do-projecto
rm -rf .git
git init
```

Renomear "Flowzi Base" para o nome do projecto em:
- `package.json` → campo `"name"`
- `index.html` → `<title>`
- `src/App.tsx` → titulo no `<h1>`
- `ARCHITECTURE.md`, `LINTING.md`, `README.md` → titulos
- `.claude/CLAUDE.md` → titulo

## 2. Instalar e Correr

```bash
npm install
npm run dev    # localhost:8080
```

A app funciona sem Supabase configurado — so precisa das credenciais quando quiseres ligar ao backend.

## 3. Configurar Supabase (quando necessario)

1. Criar projecto em [supabase.com](https://supabase.com) → New Project
2. Copiar `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```
3. Preencher `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`

## 4. Configurar Repo GitHub

1. Criar repo no GitHub
2. Ligar o remote:
   ```bash
   git remote add origin https://github.com/<org>/<repo>.git
   git add -A && git commit -m "feat: initial commit"
   git push -u origin main
   ```
3. O CI (`.github/workflows/ci.yml`) ja esta configurado — corre automaticamente em cada push/PR

## 5. Personalizar Design

### Cores (src/index.css)
Alterar CSS variables em `:root` e `.dark`:
```css
--primary: oklch(0.6 0.2 250);  /* Cor principal */
```

### Fonts
Instalar via fontsource (`npm install @fontsource-variable/nome`) e importar em `src/index.css`.

## 6. Adicionar Componentes shadcn/ui

```bash
npx shadcn add button dialog input select tabs toast
```

Lista completa em [ui.shadcn.com](https://ui.shadcn.com/docs/components)

## 7. Formulario de Contacto (opcional)

O formulario do site funciona **sem backend** — cai para `mailto:` pre-preenchido.
Para persistir mensagens e receber notificacoes por email:

1. Configurar Supabase (passo 3) e aplicar as migrations — inclui `005_contact_messages.sql`:
   ```bash
   supabase db push        # ou correr os SQL de supabase/migrations/
   ```
2. Deploy da edge function publica (`verify_jwt = false`, ja em `supabase/config.toml`):
   ```bash
   supabase functions deploy submit-contact
   ```
3. (Opcional) Notificacao por email — adicionar Supabase Secrets:
   - `RESEND_API_KEY` — chave da conta [Resend](https://resend.com) (dominio verificado)
   - `FROM_EMAIL` — remetente verificado
   - `NOTIFY_EMAIL` — destino (default `graodesolo@gmail.com`)

As mensagens ficam em `contact_messages` (RLS: insert publico, leitura so admin).

## 8. Deploy (Vercel)

1. Push para GitHub
2. Conectar repo no [Vercel](https://vercel.com)
3. Adicionar env vars:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Configurar dominio custom
