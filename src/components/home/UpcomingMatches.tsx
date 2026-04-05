import Link from 'next/link'
import type { Match, Team } from '@/lib/supabase/types'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatDate, formatTime, isToday } from '@/lib/utils'

type MatchWithTeams = Match & {
  team_a: Pick<Team, 'nombre' | 'siglas' | 'logo_url'>
  team_b: Pick<Team, 'nombre' | 'siglas' | 'logo_url'>
}

export default function UpcomingMatches({ matches }: { matches: MatchWithTeams[] }) {
  return (
    <section className="py-12 px-4 bg-brand-panel/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-bold text-brand-teal-light">
            Próximas partidas
          </h2>
          <Link href="/calendar" className="text-brand-teal hover:text-brand-amber text-sm transition-colors">
            Ver todas →
          </Link>
        </div>

        {matches.length === 0 ? (
          <p className="text-brand-teal text-sm">No hay partidas próximas programadas.</p>
        ) : (
          <div className="space-y-3">
            {matches.map(match => {
              const live = isToday(match.fecha) && !match.ganador_id
              return (
                <Card key={match.id} className="p-4 flex items-center gap-4">
                  <div className="flex-1 flex items-center justify-end gap-3">
                    <span className="font-display font-bold text-brand-teal-light text-right">
                      {match.team_a.nombre}
                    </span>
                    <span className="text-brand-teal text-sm font-bold">{match.team_a.siglas}</span>
                  </div>

                  <div className="text-center px-4">
                    {live ? (
                      <Badge variant="live">EN VIVO</Badge>
                    ) : (
                      <>
                        <p className="text-brand-teal-light text-xs font-semibold">{formatDate(match.fecha)}</p>
                        {match.hora && (
                          <p className="text-brand-teal text-xs">{formatTime(match.hora)}</p>
                        )}
                      </>
                    )}
                  </div>

                  <div className="flex-1 flex items-center gap-3">
                    <span className="text-brand-teal text-sm font-bold">{match.team_b.siglas}</span>
                    <span className="font-display font-bold text-brand-teal-light">
                      {match.team_b.nombre}
                    </span>
                  </div>

                  {match.transmitido && (
                    <span className="text-brand-amber text-xs">📺</span>
                  )}
                </Card>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
