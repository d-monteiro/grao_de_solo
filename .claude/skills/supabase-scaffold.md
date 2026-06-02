---
name: supabase-scaffold
description: "Cria uma nova tabela Supabase com migration, RLS, indexes, types e service. Usar quando pedirem para criar tabela ou entidade."
user_invocable: true
---

# Supabase Scaffold — Nova Tabela

Quando o user pedir para criar uma nova tabela/entidade, seguir TODOS estes passos:

## 1. Migration SQL
Criar ficheiro `supabase/migrations/XXX_<nome>.sql` com:

```sql
-- Tabela
CREATE TABLE <nome> (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  -- campos do user...
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE <nome> ENABLE ROW LEVEL SECURITY;

-- Policies (OBRIGATORIO usar (select auth.uid()))
CREATE POLICY <nome>_select_own ON <nome>
  FOR SELECT USING ((select auth.uid()) = user_id);

CREATE POLICY <nome>_insert_own ON <nome>
  FOR INSERT WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY <nome>_update_own ON <nome>
  FOR UPDATE USING ((select auth.uid()) = user_id);

CREATE POLICY <nome>_admin_all ON <nome>
  FOR ALL USING (is_admin());

-- Indexes
CREATE INDEX idx_<nome>_user ON <nome>(user_id);

-- Updated_at trigger
CREATE TRIGGER update_<nome>_updated_at
  BEFORE UPDATE ON <nome> FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

## 2. Types
Adicionar interface em `src/types/database.ts`:
- Interface com todos os campos
- Adicionar a `Database.public.Tables`

## 3. Service
Criar `src/services/<nome>.service.ts` com:
- `get<Nome>(userId)` — SELECT com RLS
- `create<Nome>(data)` — INSERT
- `update<Nome>(id, data)` — UPDATE
- `delete<Nome>(id)` — DELETE
- Todas retornam `{ data, error }`

## 4. Verificacao
- Confirmar RLS enabled
- Confirmar `(select auth.uid())` pattern
- Confirmar admin policy existe
- Confirmar index no user_id
- Confirmar updated_at trigger

## REGRA: Migrations = source of truth. Se nao esta no SQL, nao existe.
