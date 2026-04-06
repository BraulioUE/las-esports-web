import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Card from '@/components/ui/Card'
import TeamLogo from '@/components/ui/TeamLogo'
import RosterTable from '@/components/teams/RosterTable'
import MatchHistory from '@/components/teams/MatchHistory'

export const runtime = 'edge'

export default async function TeamPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = await createClient()

  // Buscar equipo por siglas (case insensitive)
  const { data: teams } = await supabase
    .from('teams')
    .select('*')
    .eq('activo', true)

  const team = teams?.find(t => t.siglas.toLowerCase() === slug.toLowerCase())
  if (!team) notFound()

  const [{ data: players }, { data: matches }] = await Promise.all([
    supabase
      .from('players')
      .select('*')
      .eq('team_id', team.id)
      .order('suplente')
      .order('rol'),
    supabase
      .from('matches')
      .select(`
        *,
        team_a:teams!matches_team_a_id_fkey(id,nombre,siglas),
        team_b:teams!matches_team_b_id_fkey(id,nombre,siglas)
      `)
      .or(`team_a_id.eq.${team.id},team_b_id.eq.${team.id}`)
      .order('fecha', { ascending: false }),
  ])

  const playedMatches = matches?.filter(m => m.ganador_id !== null) ?? []
  const wins   = playedMatches.filter(m => m.ganador_id === team.id).length
  const losses = playedMatches.filter(m => m.ganador_id !== team.id).length

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Header del equipo */}
      <div className="flex items-center gap-6 mb-10">
        <TeamLogo nombre={team.nombre} siglas={team.siglas} logo_url={team.logo_url} size="xl" />
        <div>
          <h1 className="font-display text-4xl font-bold text-brand-teal-light">
            {team.nombre}
          </h1>
          <p className="text-brand-teal text-lg">{team.siglas}</p>
          {team.representante && (
            <p className="flex items-center gap-1.5 text-brand-teal/70 text-sm mt-1">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
              </svg>
              @{team.representante}
            </p>
          )}
        </div>
        <div className="ml-auto flex gap-6 text-center">
          <div>
            <p className="font-display text-3xl font-bold text-brand-amber">{wins}</p>
            <p className="text-brand-teal/60 text-xs">Victorias</p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-red-400">{losses}</p>
            <p className="text-brand-teal/60 text-xs">Derrotas</p>
          </div>
        </div>
      </div>

      {/* Roster */}
      <Card className="p-6 mb-6">
        <h2 className="font-display text-2xl font-bold text-brand-teal-light mb-4">Roster</h2>
        <RosterTable players={players ?? []} />
      </Card>

      {/* Historial */}
      <Card className="p-6">
        <h2 className="font-display text-2xl font-bold text-brand-teal-light mb-4">
          Historial de partidas
        </h2>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <MatchHistory matches={(matches ?? []) as any} teamId={team.id} />
      </Card>

      {team.discord_url && (
        <div className="mt-6 text-center">
          <a
            href={team.discord_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brand-amber/40 hover:border-brand-amber bg-brand-amber/10 hover:bg-brand-amber/20 text-brand-amber font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Unirse al Discord
          </a>
        </div>
      )}
    </div>
  )
}
