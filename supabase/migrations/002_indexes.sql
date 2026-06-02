-- ============================================================
-- Flowzi Base — Indexes
-- ============================================================

-- Profiles
CREATE INDEX idx_profiles_role ON profiles(role);

-- Subscriptions
CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_expires ON subscriptions(expires_at);

-- Notifications
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
