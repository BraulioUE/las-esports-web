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
