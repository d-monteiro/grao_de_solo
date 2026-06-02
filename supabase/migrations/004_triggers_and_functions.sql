-- ============================================================
-- Flowzi Base — Triggers e Functions
-- ============================================================

-- ============================================================
-- Auto-create profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'name',
      ''
    ),
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- Protect sensitive profile fields (privilege escalation prevention)
-- ============================================================
CREATE OR REPLACE FUNCTION protect_profile_fields()
RETURNS TRIGGER AS $$
BEGIN
  -- Service role (edge functions) pode alterar tudo
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;

  -- Admins podem alterar tudo
  IF EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin') THEN
    RETURN NEW;
  END IF;

  -- Bloquear alteracoes a campos sensiveis
  IF (OLD.role IS DISTINCT FROM NEW.role) THEN
    RAISE EXCEPTION 'Apenas admins podem alterar o role';
  END IF;

  IF (OLD.is_premium IS DISTINCT FROM NEW.is_premium) THEN
    RAISE EXCEPTION 'Apenas admins podem alterar is_premium';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER guard_profile_escalation
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION protect_profile_fields();

-- ============================================================
-- Auto updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
