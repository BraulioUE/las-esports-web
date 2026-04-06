import Link from 'next/link'
import type { Match, Team } from '@/lib/supabase/types'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import { formatDate, isToday, isLiveNow, horaChile } from '@/lib/utils'

type MatchWithTeams = Match & {
  team_a: Pick<Team, 'nombre' | 'siglas' | 'logo_url'>
  team_b: Pick<Team, 'nombre' | 'siglas' | 'logo_url'>
}

function formatHora(hora: string) {
  const [h, m] = hora.split(':')
  return `${h}:${m}`
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
              const live  = isLiveNow(match.fecha, match.hora) && !match.ganador_id
              const today = isToday(match.fecha) && !match.ganador_id && !live
              return (
                <div key={match.id} className="rounded-xl overflow-hidden border border-brand-amber/20">
                  <Card className="p-4 flex items-center gap-4 rounded-none border-0">
                    <div className="flex-1 flex items-center justify-end gap-3">
                      <span className="font-display font-bold text-brand-teal-light text-right hidden sm:block">
                        {match.team_a.nombre}
                      </span>
                      <span className="text-brand-teal text-sm font-bold">{match.team_a.siglas}</span>
                    </div>

                    <div className="text-center min-w-[110px]">
                      {live ? (
                        <Badge variant="live">EN VIVO</Badge>
                      ) : today ? (
                        <Badge variant="pending">HOY</Badge>
                      ) : (
                        <p className="text-brand-teal-light text-xs font-semibold">{formatDate(match.fecha)}</p>
                      )}

                      {!match.ganador_id && match.hora && (
                        <div className="mt-1.5 flex flex-col gap-0.5 text-xs">
                          <span className="text-brand-teal-light font-semibold">
                            🇦🇷 {formatHora(match.hora)}hs
                          </span>
                          <span className="text-brand-teal">
                            🇨🇱 {horaChile(match.hora)}
                          </span>
                        </div>
                      )}
                      {!match.ganador_id && !match.hora && (
                        <p className="text-brand-teal/40 text-xs mt-1">Por confirmar</p>
                      )}
                    </div>

                    <div className="flex-1 flex items-center gap-3">
                      <span className="text-brand-teal text-sm font-bold">{match.team_b.siglas}</span>
                      <span className="font-display font-bold text-brand-teal-light hidden sm:block">
                        {match.team_b.nombre}
                      </span>
                    </div>
                  </Card>

                  {(live || today) && (
                    <div className="bg-brand-navy/70 border-t border-brand-amber/10 px-4 py-2 flex items-center justify-end">
                      {match.stream_url ? (
                        <a
                          href={match.stream_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 bg-brand-coral hover:bg-brand-coral/90 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors"
                        >
                          📺 Ver stream
                        </a>
                      ) : (
                        <span className="text-brand-teal/30 text-xs">📺 Stream próximamente</span>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
