-- ================================================================
-- LAS Esports — Schema Supabase
-- Ejecutar en: Supabase Dashboard > SQL Editor
-- ================================================================

-- TEAMS
CREATE TABLE public.teams (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre        TEXT NOT NULL,
  siglas        TEXT NOT NULL,
  logo_url      TEXT,
  representante TEXT,
  discord_url   TEXT,
  activo        BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "teams_public_read"
  ON public.teams FOR SELECT
  USING (activo = true);

CREATE POLICY "teams_admin_write"
  ON public.teams FOR ALL
  USING (auth.role() = 'authenticated');

-- ================================================================
-- PLAYERS
-- ================================================================
CREATE TABLE public.players (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id    UUID NOT NULL REFERENCES public.teams(id) ON DELETE CASCADE,
  nombre     TEXT NOT NULL,
  rol        TEXT NOT NULL CHECK (rol IN ('Top','Jungle','Mid','ADC','Support')),
  suplente   BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;

CREATE POLICY "players_public_read"
  ON public.players FOR SELECT
  USING (true);

CREATE POLICY "players_admin_write"
  ON public.players FOR ALL
  USING (auth.role() = 'authenticated');

-- ================================================================
-- MATCHES
-- ================================================================
CREATE TABLE public.matches (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_a_id   UUID NOT NULL REFERENCES public.teams(id),
  team_b_id   UUID NOT NULL REFERENCES public.teams(id),
  ganador_id  UUID REFERENCES public.teams(id),
  fecha       DATE NOT NULL,
  hora        TIME,
  transmitido BOOLEAN NOT NULL DEFAULT false,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT no_self_match CHECK (team_a_id <> team_b_id)
);

ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "matches_public_read"
  ON public.matches FOR SELECT
  USING (true);

CREATE POLICY "matches_admin_write"
  ON public.matches FOR ALL
  USING (auth.role() = 'authenticated');

-- ================================================================
-- SPONSORS
-- ================================================================
CREATE TABLE public.sponsors (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre     TEXT NOT NULL,
  logo_url   TEXT NOT NULL,
  link       TEXT,
  activo     BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.sponsors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "sponsors_public_read"
  ON public.sponsors FOR SELECT
  USING (activo = true);

CREATE POLICY "sponsors_admin_write"
  ON public.sponsors FOR ALL
  USING (auth.role() = 'authenticated');

-- ================================================================
-- STANDINGS VIEW (calculada, sin tabla extra)
-- ================================================================
CREATE OR REPLACE VIEW public.standings AS
SELECT
  t.id,
  t.nombre,
  t.siglas,
  t.logo_url,
  COUNT(m.id) FILTER (
    WHERE m.ganador_id IS NOT NULL
      AND (m.team_a_id = t.id OR m.team_b_id = t.id)
  ) AS jugados,
  COUNT(m.id) FILTER (
    WHERE m.ganador_id = t.id
  ) AS ganados,
  COUNT(m.id) FILTER (
    WHERE m.ganador_id IS NOT NULL
      AND m.ganador_id <> t.id
      AND (m.team_a_id = t.id OR m.team_b_id = t.id)
  ) AS perdidos,
  ROUND(
    CASE
      WHEN COUNT(m.id) FILTER (
        WHERE m.ganador_id IS NOT NULL
          AND (m.team_a_id = t.id OR m.team_b_id = t.id)
      ) = 0 THEN 0
      ELSE COUNT(m.id) FILTER (WHERE m.ganador_id = t.id)::NUMERIC
           / COUNT(m.id) FILTER (
               WHERE m.ganador_id IS NOT NULL
                 AND (m.team_a_id = t.id OR m.team_b_id = t.id)
             ) * 100
    END, 1
  ) AS win_rate
FROM public.teams t
LEFT JOIN public.matches m
  ON m.team_a_id = t.id OR m.team_b_id = t.id
WHERE t.activo = true
GROUP BY t.id, t.nombre, t.siglas, t.logo_url
ORDER BY ganados DESC, win_rate DESC;
