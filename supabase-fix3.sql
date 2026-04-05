-- ================================================================
-- Fix 1: Mover Lucio (ADC suplente) de AFG Academy → AFG
-- ================================================================
UPDATE public.players
  SET team_id = '11111111-0000-0000-0000-000000000003'
  WHERE nick = 'mlucio#mga'
    AND team_id = '11111111-0000-0000-0000-000000000004';

-- ================================================================
-- Fix 3a: MGS — pais faltante (usando nick como referencia exacta)
-- ================================================================
UPDATE public.players SET pais = 'CHI' WHERE nick = 'PRD Xero#1095';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'Locotero#PRD';

-- ================================================================
-- Fix 3b: AFG Academy — pais de los jugadores con datos conocidos
-- (el doc no tiene nacionalidad para AFG/AFGA, se completa cuando se consiga)
-- ================================================================
-- Sin datos disponibles por ahora — se pueden cargar desde /admin/teams
