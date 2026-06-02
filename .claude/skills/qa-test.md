---
name: qa-test
description: "Testa o projeto em producao/preview. Verifica fluxos, encontra bugs, corrige imediatamente. Usar antes de entregar ao cliente ou apos deploy."
user_invocable: true
---

# QA Test — Teste e Correcao

## QUANDO USAR
- Antes de entregar ao cliente
- Depois de um deploy
- Quando o user diz "testa isto" ou "verifica se funciona"
- Periodicamente em projectos activos

## O QUE TESTAR

### 1. Build
- Correr `npm run build` — tem de passar sem erros
- Verificar warnings no terminal

### 2. Auth Flow (se aplicavel)
- [ ] Signup funciona (email + password)
- [ ] Login funciona
- [ ] Google OAuth funciona (se configurado)
- [ ] Logout funciona
- [ ] Rota protegida redireciona para login se nao autenticado
- [ ] Admin nao acessivel por user normal
- [ ] Refresh de pagina mantem sessao
- [ ] Tab switch nao causa loading infinito (navigator.locks check)

### 3. Paginas
- [ ] Todas as paginas carregam sem erro
- [ ] Loading states aparecem (skeleton/spinner)
- [ ] Erros mostram mensagem + retry (nao pagina branca)
- [ ] Navegacao entre paginas funciona
- [ ] 404 page funciona

### 4. Dados
- [ ] Criar/ler/editar/apagar dados funciona para user normal
- [ ] RLS impede user de ver dados de outro user
- [ ] Admin consegue ver todos os dados
- [ ] Formularios validam input
- [ ] Campos obrigatorios nao permitem submit vazio

### 5. Mobile
- [ ] Layout responsivo (testar 375px, 768px, 1024px)
- [ ] Sidebar fecha em mobile
- [ ] Touch targets suficientemente grandes (min 44px)
- [ ] Scroll funciona em modais
- [ ] Teclado nao tapa inputs

### 6. Performance
- [ ] Paginas carregam em < 3s
- [ ] Sem re-renders desnecessarios
- [ ] Imagens optimizadas
- [ ] Lazy loading de rotas funciona

### 7. Seguranca
- Correr `/security-check`
- [ ] Sem secrets no frontend
- [ ] RLS activo em todas as tabelas
- [ ] Webhooks com HMAC

### 8. Integracoes (se aplicavel)
- [ ] Emails enviam correctamente
- [ ] Webhooks recebem e processam
- [ ] Analytics tracking funciona
- [ ] Pagamentos processam (test mode)

## QUANDO ENCONTRAR UM BUG

1. **Identificar** — descrever o bug claramente
2. **Corrigir imediatamente** — nao criar ticket, resolver agora
3. **Testar o fix** — confirmar que funciona
4. **Documentar** — se for um bug nao-obvio, adicionar a "Armadilhas" no CLAUDE.md
5. **Verificar regressao** — o fix nao partiu outra coisa?

## OUTPUT

Apresentar resultados como:

```
## QA Report

### Passou (12/15)
✅ Build: OK (2.1s)
✅ Auth: signup, login, logout, protected routes
✅ Paginas: todas carregam
✅ Mobile: responsivo OK
...

### Falhou (3/15)
❌ Admin page: erro 500 ao carregar lista de users
   → Causa: RLS policy faltava para admin
   → Fix: Adicionada policy admin_all em users
   → Status: CORRIGIDO

❌ Mobile: sidebar nao fecha ao clicar em link
   → Causa: faltava setMobileOpen(false) no onClick
   → Fix: Adicionado ao NavLink handler
   → Status: CORRIGIDO

⚠️ Performance: pagina de dashboard demora 4.2s
   → Causa: query sem index em created_at
   → Fix: Adicionado index
   → Status: CORRIGIDO
```
