-- ============================================================
-- Grão de Solo — Mensagens de Contacto
-- ============================================================
-- Recebe os pedidos do formulário público do site.
-- Inserção pública (anon); leitura/gestão apenas para admin.
-- A edge function `submit-contact` grava aqui via service role.
-- ============================================================

CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'website',
  is_handled BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_contact_messages_created ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_handled ON contact_messages(is_handled);

-- Enable RLS
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Inserção pública: qualquer visitante pode enviar uma mensagem.
-- (A validação anti-abuso/honeypot acontece na edge function.)
CREATE POLICY contact_messages_insert_public ON contact_messages
  FOR INSERT TO anon, authenticated
  WITH CHECK (true);

-- Leitura e gestão: apenas admins (helper SECURITY DEFINER de 003).
CREATE POLICY contact_messages_admin_select ON contact_messages
  FOR SELECT USING (is_admin());

CREATE POLICY contact_messages_admin_update ON contact_messages
  FOR UPDATE USING (is_admin());

CREATE POLICY contact_messages_admin_delete ON contact_messages
  FOR DELETE USING (is_admin());
