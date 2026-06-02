---
name: project-init
description: "Conversa de discovery para novo projeto. Faz perguntas naturais, deixa o user falar, e configura tudo. CORRE AUTOMATICAMENTE se o projeto estiver vazio."
user_invocable: true
---

# Project Init — Discovery Conversacional

## QUANDO ACTIVAR
- Automaticamente no PRIMEIRO chat se o projeto estiver vazio (so tem os ficheiros base do boilerplate)
- Quando o user invocar `/project-init`
- Quando o user disser "criar site", "novo projeto", "fazer app", etc.

## COMO FUNCIONA

Isto NAO e um wizard com perguntas numeradas. E uma conversa natural.

### Passo 1: Pedir ao user para falar do projeto

Comecar com algo como:

> "Fala-me do projeto! Para quem e, o que faz, que problema resolve. Quanto mais contexto me deres, melhor configuro tudo. Podes falar a vontade — eu vou fazendo perguntas pelo meio."

Deixar o user falar. Ele pode dizer:
- "E um dashboard para uma empresa de logistica"
- "Quero um site para a minha pastelaria com menu e contacto"
- "SaaS de faturacao com planos pagos"
- "Landing page para captar leads para o meu curso"

### Passo 2: Extrair informacao da conversa

A partir do que o user disse, identificar o que JA SABES:
- Tipo de projeto (landing, dashboard, ambos)
- Tipo de negocio (restaurante, SaaS, servicos, e-commerce, etc.)
- Se precisa de auth
- Se tem pagamentos
- Publico-alvo (B2B, B2C, interno)

### Passo 3: Perguntar o que FALTA de forma natural

NAO fazer lista numerada. Fazer perguntas conversacionais misturadas com observacoes:

> "Ok, entao e um dashboard de gestao para a empresa X. Faz sentido ter login com Google + email, ou a equipa deles so usa email? E em termos de permissoes — ha so users normais e admins, ou tem mais niveis (tipo manager)?"

> "Para o design — tens cores da marca? Um logo? Se nao tiveres, eu proponho algo com base no tipo de negocio e tu dizes se gostas."

> "Vais precisar de enviar emails? Tipo notificacoes ou confirmacoes?"

### Passo 4: Se o user disser "faz tu" / "nao sei" / "escolhe tu"

**Escolher a opcao mais otimizada** com base no tipo de projeto. Depois mostrar o que escolheste:

> "Optimo, eu escolhi:
> - Design dark mode com azul #2563EB como cor principal (fica profissional para SaaS)
> - Inter para tudo (clean e legivel)
> - Auth com Google + Email (mais versatil)
> - Roles: user e admin
>
> Se quiseres mudar alguma coisa, diz. Senao, avanço!"

### Passo 5: Configurar tudo

Com base nas respostas (ou decisoes automaticas), configurar:

1. **package.json** — nome do projeto
2. **src/index.css** — cores da marca (converter hex para HSL), fonts
3. **index.html** — Google Fonts import, titulo, lang
4. **supabase/migrations/** — roles (user|admin, user|manager|admin, custom), is_premium se aplicavel
5. **src/contexts/AuthContext.tsx** — ajustar providers (remover Google se nao necessario)
6. **src/pages/Landing.tsx** — seccoes com base no negocio
7. **src/components/layout/** — sidebar items, logo
8. **.env.example** — integracoes necessarias
9. **CLAUDE.md** — actualizar com especificidades do projeto
10. **README.md** — nome e descricao

### Passo 6: Mostrar resumo

No fim, mostrar um resumo claro do que foi configurado:

> "Projeto configurado! Aqui esta o que ficou:
> - **Nome:** PastelariaX
> - **Tipo:** Landing page + area admin
> - **Auth:** Email/password (admin only)
> - **Design:** Light mode, #8B4513 (castanho quente), Poppins
> - **Paginas:** Landing (hero + menu + contacto), Admin (gerir menu + pedidos)
> - **Integracoes:** Google Analytics, Resend (confirmacao pedidos)
>
> Queres mudar alguma coisa ou comecamos?"

---

## INFORMACAO A RECOLHER (checklist interna — NAO mostrar ao user)

O Claude deve garantir que sabe tudo isto antes de configurar. Se faltar algo, perguntar naturalmente.

### Obrigatorio
- [ ] Nome do projeto
- [ ] Tipo (landing / dashboard / ambos)
- [ ] Lingua (PT-PT / EN / outra)

### Auth (se aplicavel)
- [ ] Providers (Google, Email, ambos, nenhum)
- [ ] Roles (user|admin, mais niveis, custom)
- [ ] Tem acesso premium/pago?

### Design
- [ ] Cor principal da marca
- [ ] Dark mode / light mode / ambos
- [ ] Fonts (ou deixar Claude escolher)
- [ ] Estilo geral (premium, clean, corporate, playful)

### Funcionalidades
- [ ] O que o user/cliente faz na plataforma
- [ ] O que o admin faz
- [ ] Tem pagamentos?
- [ ] Que emails precisa de enviar?
- [ ] Que integracoes (GA, GHL, Slack, Stripe, etc.)

### Landing page (se aplicavel)
- [ ] Seccoes (hero, features, pricing, FAQ, contacto)
- [ ] CTA principal
- [ ] Formulario?

---

## DEFAULTS INTELIGENTES POR TIPO DE NEGOCIO

Se o user nao especificar, usar estes defaults:

### Restaurante / Pastelaria / Cafe
- Light mode, cores quentes (castanho, verde, terracota)
- Landing: hero + menu + horario + contacto + mapa
- Admin: gerir menu + pedidos
- Font: Poppins ou Nunito
- Integracoes: GA, Resend (reservas)

### SaaS / Dashboard Empresarial
- Dark mode, cores frias (azul, cinza)
- Dashboard: metricas + tabelas + settings
- Admin: users + billing + analytics
- Font: Inter
- Integracoes: GA, Stripe, Sentry, Resend

### Curso / Educacao
- Dark mode, cores premium (gold, navy)
- Dashboard: curso + progresso + calendario
- Admin: conteudo + alunos + metricas
- Font: Playfair Display + Plus Jakarta Sans
- Integracoes: GA, Stripe/Whop, Resend, Bunny.net

### Agencia / Servicos
- Dark ou light, cores da marca
- Landing: hero + servicos + portfolio + contacto
- Admin: leads + projectos
- Font: varia
- Integracoes: GA, GHL, Resend

### E-commerce / Loja
- Light mode, cores da marca
- Landing: hero + produtos + categorias + checkout
- Admin: produtos + pedidos + clientes
- Font: varia
- Integracoes: GA, Stripe, Resend
