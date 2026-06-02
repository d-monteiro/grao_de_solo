-- ============================================================
-- Flowzi Base — Schema Base
-- ============================================================
-- Roles e modulos ajustados pelo /project-init
-- ============================================================

-- Enums — personalizar roles via /project-init
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE onboarding_status AS ENUM ('pending', 'completed');

-- ============================================================
-- Profiles (auto-created on signup via trigger)
-- ============================================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'user',
  phone TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  onboarding_status onboarding_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Notifications (opcional — remover se nao necessario)
-- ============================================================
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'info',
  action_url TEXT,
  is_read BOOLEAN NOT NULL DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
