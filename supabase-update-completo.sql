-- ================================================================
-- LAS Esports — UPDATE COMPLETO (único archivo de actualización)
-- Siempre reemplaza la versión anterior. Es seguro correrlo más de una vez.
-- ================================================================

-- Columnas nuevas (no falla si ya existen)
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS nick TEXT;
ALTER TABLE public.players ADD COLUMN IF NOT EXISTS pais TEXT;

-- ================================================================
-- MGS
-- ================================================================
UPDATE public.players SET nombre = 'Marco',    nick = 'Susano Wa#347',        pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000001' AND rol = 'Top'     AND suplente = false;
UPDATE public.players SET nombre = 'Ayleen',   nick = 'TÓXICA Y CELOSA#len',  pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000001' AND rol = 'Jungle'  AND suplente = false;
UPDATE public.players SET nombre = 'Judy',     nick = 'Judyy#1111',           pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000001' AND rol = 'Mid'     AND suplente = false;
UPDATE public.players SET nombre = 'Benjamin', nick = 'PRD Xero#1095',        pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000001' AND rol = 'ADC'     AND suplente = false;
UPDATE public.players SET nombre = 'Nick',     nick = 'Luveloc#LAS',          pais = 'PER' WHERE team_id = '11111111-0000-0000-0000-000000000001' AND rol = 'Support' AND suplente = false;
UPDATE public.players SET nombre = 'Benjamin', nick = 'Locotero#PRD',         pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000001' AND rol = 'Jungle'  AND suplente = true;

-- ================================================================
-- Apicultores Academy
-- ================================================================
UPDATE public.players SET nombre = 'Emma',    nick = 'SAIJAX#6388',           pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000002' AND rol = 'Top'     AND suplente = false;
UPDATE public.players SET nombre = 'Pablo',   nick = 'Haitiano ilegal#chile', pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000002' AND rol = 'Jungle'  AND suplente = false;
UPDATE public.players SET nombre = 'Gabriel', nick = 'Pibe10#BLA',            pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000002' AND rol = 'Mid'     AND suplente = false;
UPDATE public.players SET nombre = 'Ramiro',  nick = 'ObscuredByClouds#LAS',  pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000002' AND rol = 'ADC'     AND suplente = false;
UPDATE public.players SET nombre = 'Mina',    nick = 'Sώirlix#0684',          pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000002' AND rol = 'Support' AND suplente = false;
UPDATE public.players SET nombre = 'Angel',   nick = 'Bad pony#las',          pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000002' AND rol = 'Top'     AND suplente = true;
UPDATE public.players SET nombre = 'Felipe',  nick = 'Profesor Phillip#las',  pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000002' AND rol = 'Jungle'  AND suplente = true;
UPDATE public.players SET nombre = 'Ciro',    nick = 'Zëkee#5823',            pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000002' AND rol = 'Mid'     AND suplente = true;
UPDATE public.players SET nombre = 'Lauti',   nick = 'Mkirio#api',            pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000002' AND rol = 'ADC'     AND suplente = true;
UPDATE public.players SET nombre = 'Sagito',  nick = 'Chupito Diaz#qepd',    pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000002' AND rol = 'Support' AND suplente = true;

-- ================================================================
-- AFG
-- ================================================================
UPDATE public.players SET nombre = 'Tiago',      nick = 'AFG 4EverBr0nz4#AFG' WHERE team_id = '11111111-0000-0000-0000-000000000003' AND rol = 'Top'     AND suplente = false;
UPDATE public.players SET nombre = 'Alex',        nick = 'AlexB201#Myi'        WHERE team_id = '11111111-0000-0000-0000-000000000003' AND rol = 'Jungle'  AND suplente = false;
UPDATE public.players SET nombre = 'Saro',        nick = 'Айртон Сенна#SAL'    WHERE team_id = '11111111-0000-0000-0000-000000000003' AND rol = 'Mid'     AND suplente = false;
UPDATE public.players SET nombre = 'Skela',       nick = 'Skela#Skela'         WHERE team_id = '11111111-0000-0000-0000-000000000003' AND rol = 'ADC'     AND suplente = false;
UPDATE public.players SET nombre = 'Morningstar', nick = 'Morningstaar#LAS', suplente = true  WHERE team_id = '11111111-0000-0000-0000-000000000003' AND rol = 'Support';
UPDATE public.players SET nombre = 'Benja',       nick = 'Benjajax#LAS'        WHERE team_id = '11111111-0000-0000-0000-000000000003' AND rol = 'Jungle'  AND suplente = true;
-- Lucio (ADC suplente) viene de AFG Academy → AFG
UPDATE public.players SET team_id = '11111111-0000-0000-0000-000000000003', nombre = 'Lucio', nick = 'mlucio#mga', rol = 'ADC', suplente = true
  WHERE nick = 'mlucio#mga';

-- ================================================================
-- AFG Academy
-- ================================================================
UPDATE public.players SET nombre = 'Angel', nick = 'AFG Ángel#5922'     WHERE team_id = '11111111-0000-0000-0000-000000000004' AND rol = 'Top'     AND suplente = false;
UPDATE public.players SET nombre = 'Pacha', nick = 'ElGranPachuly#LAS'  WHERE team_id = '11111111-0000-0000-0000-000000000004' AND rol = 'Jungle'  AND suplente = false;
UPDATE public.players SET nombre = 'Nico',  nick = 'Asf zeus#LAS77'     WHERE team_id = '11111111-0000-0000-0000-000000000004' AND rol = 'Mid'     AND suplente = false;
UPDATE public.players SET nombre = 'Soeki', nick = 'what a failure#666' WHERE team_id = '11111111-0000-0000-0000-000000000004' AND rol = 'ADC'     AND suplente = false;
UPDATE public.players SET nombre = 'Matu',  nick = 'GOJO#2169'          WHERE team_id = '11111111-0000-0000-0000-000000000004' AND rol = 'Support' AND suplente = false;
UPDATE public.players SET nombre = 'Scleri',nick = 'Scleri#NEKR0', rol = 'Top'     WHERE team_id = '11111111-0000-0000-0000-000000000004' AND suplente = true AND (nombre ILIKE '%Scleri%' OR nick = 'Scleri#NEKR0');
UPDATE public.players SET nombre = 'Mik',   nick = 'Mik#Moon',    rol = 'Mid'     WHERE team_id = '11111111-0000-0000-0000-000000000004' AND suplente = true AND (nombre ILIKE '%Mik%'    OR nick = 'Mik#Moon');
UPDATE public.players SET nombre = 'Chibi', nick = 'Chibi Jinx#uwu', rol = 'ADC'  WHERE team_id = '11111111-0000-0000-0000-000000000004' AND suplente = true AND (nombre ILIKE '%Chibi%'  OR nick = 'Chibi Jinx#uwu');
UPDATE public.players SET nombre = 'Plague',nick = 'SW Plague#5212', rol = 'Support' WHERE team_id = '11111111-0000-0000-0000-000000000004' AND suplente = true AND (nombre ILIKE '%Plague%' OR nick = 'SW Plague#5212');

-- ================================================================
-- Gaping
-- ================================================================
UPDATE public.players SET nombre = 'Máximo',  nick = 'mt2018#LAS',        pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000005' AND rol = 'Top'     AND suplente = false;
UPDATE public.players SET nombre = 'Polaco',  nick = 'ＰＯＬＡＣＯツ#URU',    pais = 'URU' WHERE team_id = '11111111-0000-0000-0000-000000000005' AND rol = 'Jungle'  AND suplente = false;
UPDATE public.players SET nombre = 'Brandon', nick = 'Tempestad42#GXM',   pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000005' AND rol = 'Mid'     AND suplente = false;
UPDATE public.players SET nombre = 'Kikue',   nick = 'Kenshin#sep',       pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000005' AND rol = 'ADC'     AND suplente = false;
UPDATE public.players SET nombre = 'Brian',   nick = 'Kratos#TGR',        pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000005' AND rol = 'Support' AND suplente = false;
UPDATE public.players SET nombre = 'Thiago',  nick = 'PiñonFijo33#AURA', pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000005' AND rol = 'Top'     AND suplente = true;
UPDATE public.players SET nombre = 'Jeremy',  nick = 'Ax5#LAS',           pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000005' AND rol = 'ADC'     AND suplente = true;

-- ================================================================
-- Runaans
-- ================================================================
UPDATE public.players SET nick = 'RNS Kami#RNS'      WHERE team_id = '11111111-0000-0000-0000-000000000006' AND rol = 'Top'     AND suplente = false;
UPDATE public.players SET nick = 'ELMASKESUENA#benjy' WHERE team_id = '11111111-0000-0000-0000-000000000006' AND rol = 'Jungle'  AND suplente = false;
UPDATE public.players SET nick = 'RNS Mish#Loved'    WHERE team_id = '11111111-0000-0000-0000-000000000006' AND rol = 'Mid'     AND suplente = false;
UPDATE public.players SET nick = 'RNS Requiem#Gen'   WHERE team_id = '11111111-0000-0000-0000-000000000006' AND rol = 'ADC'     AND suplente = false;
UPDATE public.players SET nick = 'RNS Zelda#Fran'    WHERE team_id = '11111111-0000-0000-0000-000000000006' AND rol = 'Support' AND suplente = false;
UPDATE public.players SET nick = 'RNS Dovahkiin#RPG' WHERE team_id = '11111111-0000-0000-0000-000000000006' AND suplente = true;

-- ================================================================
-- AUT
-- ================================================================
UPDATE public.players SET nick = 'SantiDroid#AUG'   WHERE team_id = '11111111-0000-0000-0000-000000000007' AND rol = 'Top';
UPDATE public.players SET nick = 'ジョセマ零35#AUT'   WHERE team_id = '11111111-0000-0000-0000-000000000007' AND rol = 'Jungle';
UPDATE public.players SET nick = 'Dragonoidex#LAS'  WHERE team_id = '11111111-0000-0000-0000-000000000007' AND rol = 'Mid';
UPDATE public.players SET nick = 'Glifosato#LAS'    WHERE team_id = '11111111-0000-0000-0000-000000000007' AND rol = 'ADC';
UPDATE public.players SET nick = 'Lil FlippiN#Flip' WHERE team_id = '11111111-0000-0000-0000-000000000007' AND rol = 'Support';

-- ================================================================
-- Zapadores Esports
-- ================================================================
UPDATE public.players SET nombre = 'Fede',    nick = 'Chiwiwi#mic',        pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000008' AND rol = 'Top'     AND suplente = false;
UPDATE public.players SET nombre = 'Jhon',    nick = 'Winter#ssj1',        pais = 'PER' WHERE team_id = '11111111-0000-0000-0000-000000000008' AND rol = 'Jungle'  AND suplente = false;
UPDATE public.players SET nombre = 'Camuso',  nick = 'SonOfTheMoon#Diana', pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000008' AND rol = 'Mid'     AND suplente = false;
UPDATE public.players SET nombre = 'Franco',  nick = 'Reformed#1278',      pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000008' AND rol = 'ADC'     AND suplente = false;
UPDATE public.players SET nombre = 'Miguel',  nick = 'TipPancito#Pan',     pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000008' AND rol = 'Support' AND suplente = false;
UPDATE public.players SET nombre = 'Agustin', nick = 'TheShelShok#God',    pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000008' AND rol = 'Top'     AND suplente = true;
UPDATE public.players SET nombre = 'Dario',   nick = 'BeideR#CNGR',        pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000008' AND rol = 'Jungle'  AND suplente = true;
UPDATE public.players SET nombre = 'Leo',     nick = 'quepajaxd#las',      pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000008' AND rol = 'Mid'     AND suplente = true;
UPDATE public.players SET nombre = 'Fabian',  nick = 'Isg Fabian#FAB',     pais = 'CHI' WHERE team_id = '11111111-0000-0000-0000-000000000008' AND rol = 'ADC'     AND suplente = true;
UPDATE public.players SET nombre = 'Lucho',   nick = 'LLR#las',            pais = 'ARG' WHERE team_id = '11111111-0000-0000-0000-000000000008' AND rol = 'Support' AND suplente = true;

-- ================================================================
-- Fallback: actualizar pais por nick (garantiza que ningún jugador
-- quede sin bandera aunque el rol/suplente no haya coincidido antes)
-- ================================================================

-- MGS
UPDATE public.players SET pais = 'CHI' WHERE nick = 'Susano Wa#347';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'TÓXICA Y CELOSA#len';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'Judyy#1111';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'PRD Xero#1095';
UPDATE public.players SET pais = 'PER' WHERE nick = 'Luveloc#LAS';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'Locotero#PRD';

-- Apicultores Academy
UPDATE public.players SET pais = 'ARG' WHERE nick = 'SAIJAX#6388';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'Haitiano ilegal#chile';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Pibe10#BLA';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'ObscuredByClouds#LAS';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Sώirlix#0684';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'Bad pony#las';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Profesor Phillip#las';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Zëkee#5823';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Mkirio#api';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Chupito Diaz#qepd';

-- Gaping
UPDATE public.players SET pais = 'ARG' WHERE nick = 'mt2018#LAS';
UPDATE public.players SET pais = 'URU' WHERE nick = 'ＰＯＬＡＣＯツ#URU';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Tempestad42#GXM';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Kenshin#sep';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Kratos#TGR';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'PiñonFijo33#AURA';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'Ax5#LAS';

-- Zapadores Esports
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Chiwiwi#mic';
UPDATE public.players SET pais = 'PER' WHERE nick = 'Winter#ssj1';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'SonOfTheMoon#Diana';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'Reformed#1278';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'TipPancito#Pan';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'TheShelShok#God';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'BeideR#CNGR';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'quepajaxd#las';
UPDATE public.players SET pais = 'CHI' WHERE nick = 'Isg Fabian#FAB';
UPDATE public.players SET pais = 'ARG' WHERE nick = 'LLR#las';

-- ================================================================
-- Calendario completo — elimina partidas sin resultado y recarga
-- (seguro: solo borra partidas PENDIENTES, nunca resultados ya guardados)
-- IDs: 001=MGS 002=Apicultores 003=AFG 004=AFGAcademy
--      005=Gaping 006=Runaans 007=AUT 008=Zapadores
-- ================================================================

DELETE FROM public.matches WHERE ganador_id IS NULL;

-- Lunes 6 de Abril
INSERT INTO public.matches (team_a_id, team_b_id, fecha, hora) VALUES
  ('11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000003', '2026-04-06', '22:30:00'), -- MGS vs AFG
  ('11111111-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000008', '2026-04-06', '22:00:00'), -- AFG Academy vs Zapadores
  ('11111111-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000005', '2026-04-06', NULL),       -- Apicultores vs Gaping (PENDIENTE)
  ('11111111-0000-0000-0000-000000000006', '11111111-0000-0000-0000-000000000007', '2026-04-06', NULL);       -- Runaans vs AUT (PENDIENTE)

-- Martes 7 de Abril
INSERT INTO public.matches (team_a_id, team_b_id, fecha, hora) VALUES
  ('11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000002', '2026-04-07', '22:30:00'), -- MGS vs Apicultores
  ('11111111-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000004', '2026-04-07', '22:00:00'), -- AFG vs AFG Academy
  ('11111111-0000-0000-0000-000000000006', '11111111-0000-0000-0000-000000000008', '2026-04-07', '22:00:00'), -- Runaans vs Zapadores
  ('11111111-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000007', '2026-04-07', '21:30:00'); -- Gaping vs AUT

-- Miércoles 8 de Abril
INSERT INTO public.matches (team_a_id, team_b_id, fecha, hora) VALUES
  ('11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000005', '2026-04-08', '22:30:00'), -- MGS vs Gaping
  ('11111111-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000008', '2026-04-08', '22:00:00'), -- AFG vs Zapadores
  ('11111111-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000006', '2026-04-08', '22:00:00'), -- AFG Academy vs Runaans
  ('11111111-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000007', '2026-04-08', '19:00:00'); -- Apicultores vs AUT

-- Jueves 9 de Abril
INSERT INTO public.matches (team_a_id, team_b_id, fecha, hora) VALUES
  ('11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000004', '2026-04-09', '22:30:00'), -- MGS vs AFG Academy
  ('11111111-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000003', '2026-04-09', '22:00:00'), -- Apicultores vs AFG
  ('11111111-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000006', '2026-04-09', '22:00:00'), -- Gaping vs Runaans
  ('11111111-0000-0000-0000-000000000007', '11111111-0000-0000-0000-000000000008', '2026-04-09', '20:00:00'); -- AUT vs Zapadores

-- Viernes 10 de Abril
INSERT INTO public.matches (team_a_id, team_b_id, fecha, hora) VALUES
  ('11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000006', '2026-04-10', '22:30:00'), -- MGS vs Runaans
  ('11111111-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000005', '2026-04-10', '22:00:00'), -- AFG vs Gaping
  ('11111111-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000008', '2026-04-10', '20:00:00'), -- Apicultores vs Zapadores
  ('11111111-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000007', '2026-04-10', NULL);       -- AFG Academy vs AUT (PENDIENTE)

-- Sábado 11 de Abril
INSERT INTO public.matches (team_a_id, team_b_id, fecha, hora) VALUES
  ('11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000008', '2026-04-11', '20:00:00'), -- MGS vs Zapadores
  ('11111111-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000005', '2026-04-11', '22:00:00'), -- AFG Academy vs Gaping
  ('11111111-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000006', '2026-04-11', '22:00:00'), -- Apicultores vs Runaans
  ('11111111-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000007', '2026-04-11', NULL);       -- AFG vs AUT (PENDIENTE)

-- Domingo 12 de Abril
INSERT INTO public.matches (team_a_id, team_b_id, fecha, hora) VALUES
  ('11111111-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000007', '2026-04-12', NULL),       -- MGS vs AUT (PENDIENTE)
  ('11111111-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000006', '2026-04-12', '22:00:00'), -- AFG vs Runaans
  ('11111111-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000004', '2026-04-12', '22:00:00'), -- Apicultores vs AFG Academy
  ('11111111-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000008', '2026-04-12', NULL);       -- Gaping vs Zapadores (PENDIENTE)
