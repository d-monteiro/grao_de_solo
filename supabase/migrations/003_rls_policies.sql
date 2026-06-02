-- ============================================================
-- Flowzi Base — SECURITY DEFINER Helpers + RLS Policies
-- ============================================================
-- REGRA: Usar (select auth.uid()) em vez de auth.uid() em policies
-- REGRA: SECURITY DEFINER para evitar recursao em policies que consultam profiles
-- Roles e helpers ajustados pelo /project-init
-- ============================================================

-- ============================================================
-- SECURITY DEFINER helpers
-- ============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles
    WHERE id = (select auth.uid())
    AND role = 'admin'
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION has_premium_access()
RETURNS BOOLEAN AS $$
  SELECT COALESCE(
    (SELECT is_premium FROM profiles WHERE id = (select auth.uid())),
    false
  );
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- ============================================================
-- Profiles policies
-- ============================================================
CREATE POLICY profiles_select_own ON profiles
  FOR SELECT USING ((select auth.uid()) = id);

CREATE POLICY profiles_update_own ON profiles
  FOR UPDATE USING ((select auth.uid()) = id);

CREATE POLICY profiles_admin_all ON profiles
  FOR ALL USING (is_admin());

-- ============================================================
-- Notifications policies
-- ============================================================
CREATE POLICY notifications_select_own ON notifications
  FOR SELECT USING ((select auth.uid()) = user_id);

CREATE POLICY notifications_update_own ON notifications
  FOR UPDATE USING ((select auth.uid()) = user_id);

CREATE POLICY notifications_admin_all ON notifications
  FOR ALL USING (is_admin());
