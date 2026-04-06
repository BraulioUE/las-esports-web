import { createClient } from '@/lib/supabase/server'
import Card from '@/components/ui/Card'
import StandingsTable from '@/components/standings/StandingsTable'

export const runtime = 'edge'

export default async function StandingsPage() {
  const supabase = await createClient()

  const [{ data: standings }, { data: allMatches }] = await Promise.all([
    supabase.from('standings').select('*'),
    supabase
      .from('matches')
      .select('team_a_id, team_b_id, ganador_id, score_a, score_b, fecha')
      .not('score_a', 'is', null)
      .order('fecha', { ascending: false }),
  ])

  // Calcular últimas 5 partidas por equipo
  const last5Map: Record<string, ('W' | 'E' | 'L')[]> = {}
  if (standings && allMatches) {
    for (const team of standings) {
      const teamMatches = allMatches
        .filter(m => m.team_a_id === team.id || m.team_b_id === team.id)
        .slice(0, 5)
      last5Map[team.id] = teamMatches.map(m => {
        if (m.score_a === 1 && m.score_b === 1) return 'E'
        return m.ganador_id === team.id ? 'W' : 'L'
      })
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-brand-teal-light mb-2">
        Standings
      </h1>
      <p className="text-brand-teal text-sm mb-8">Tabla de posiciones — Temporada 1</p>

      <Card>
        <StandingsTable standings={standings ?? []} last5Map={last5Map} />
      </Card>
    </div>
  )
}
