import { createClient } from '@/lib/supabase/server'
import MatchCard from '@/components/calendar/MatchCard'
import { formatDate, isToday } from '@/lib/utils'

export const runtime = 'edge'

export default async function CalendarPage() {
  const supabase = await createClient()

  const { data: matches } = await supabase
    .from('matches')
    .select(`
      *,
      team_a:teams!matches_team_a_id_fkey(id,nombre,siglas,logo_url),
      team_b:teams!matches_team_b_id_fkey(id,nombre,siglas,logo_url),
      ganador:teams!matches_ganador_id_fkey(id,nombre,siglas)
    `)
    .order('fecha')
    .order('hora')

  // Agrupar por fecha
  const byDate = new Map<string, typeof matches>()
  for (const match of matches ?? []) {
    const key = match.fecha
    if (!byDate.has(key)) byDate.set(key, [])
    byDate.get(key)!.push(match)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-brand-teal-light mb-2">
        Calendario
      </h1>
      <p className="text-brand-teal text-sm mb-8">Todas las partidas de la temporada</p>

      {byDate.size === 0 ? (
        <p className="text-brand-teal">No hay partidas cargadas todavía.</p>
      ) : (
        <div className="space-y-8">
          {Array.from(byDate.entries()).map(([date, dayMatches]) => (
            <div key={date}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="font-display text-lg font-bold text-brand-teal-light capitalize">
                  {formatDate(date)}
                </h2>
                {isToday(date) && (
                  <span className="bg-brand-coral/20 text-brand-coral border border-brand-coral text-xs px-2 py-0.5 rounded font-semibold animate-pulse">
                    HOY
                  </span>
                )}
              </div>
              <div className="space-y-2">
                {dayMatches!.map(match => (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  <MatchCard key={match.id} match={match as any} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
