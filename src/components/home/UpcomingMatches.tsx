import Link from 'next/link'
import type { Match, Team } from '@/lib/supabase/types'
import Badge from '@/components/ui/Badge'
import TeamLogo from '@/components/ui/TeamLogo'
import { isToday, isLiveNow, horaChile } from '@/lib/utils'

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
            Partidas de hoy
          </h2>
          <Link href="/calendar" className="text-brand-teal hover:text-brand-amber text-sm transition-colors">
            Ver calendario →
          </Link>
        </div>

        {matches.length === 0 ? (
          <p className="text-brand-teal text-sm">No hay partidas programadas para hoy.</p>
        ) : (
          <div className="space-y-3">
            {matches.map(match => {
              const live  = isLiveNow(match.fecha, match.hora)
              const today = isToday(match.fecha) && !live
              return (
                <Link key={match.id} href="/calendar" className="block rounded-xl overflow-hidden border border-brand-amber/20 hover:border-brand-amber/50 transition-colors">
                  {/* Fila principal */}
                  <div className="bg-brand-panel p-4 flex items-center gap-4">
                    {/* Team A */}
                    <div className="flex-1 flex items-center justify-end gap-3">
                      <span className="font-display font-bold text-brand-teal-light text-right hidden sm:block">
                        {match.team_a.nombre}
                      </span>
                      <span className="font-display font-bold text-sm text-brand-teal-light sm:hidden">
                        {match.team_a.siglas}
                      </span>
                      <TeamLogo nombre={match.team_a.nombre} siglas={match.team_a.siglas} logo_url={match.team_a.logo_url} size="sm" />
                    </div>

                    {/* Centro */}
                    <div className="text-center min-w-[100px]">
                      {live ? (
                        <Badge variant="live">EN VIVO</Badge>
                      ) : today ? (
                        <Badge variant="amber">HOY</Badge>
                      ) : (
                        <span className="text-brand-teal/60 text-sm font-bold">VS</span>
                      )}
                      {match.hora && (
                        <div className="mt-1.5 flex flex-col gap-0.5 text-xs">
                          <span className="text-brand-teal-light font-semibold">
                            🇦🇷 {formatHora(match.hora)}hs
                          </span>
                          <span className="text-brand-teal">
                            🇨🇱 {horaChile(match.hora)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Team B */}
                    <div className="flex-1 flex items-center gap-3">
                      <TeamLogo nombre={match.team_b.nombre} siglas={match.team_b.siglas} logo_url={match.team_b.logo_url} size="sm" />
                      <span className="font-display font-bold text-sm text-brand-teal-light sm:hidden">
                        {match.team_b.siglas}
                      </span>
                      <span className="font-display font-bold text-brand-teal-light hidden sm:block">
                        {match.team_b.nombre}
                      </span>
                    </div>
                  </div>

                  {/* Panel stream */}
                  {match.stream_url && (
                    <div className="bg-brand-navy/70 border-t border-brand-amber/10 px-4 py-2 flex items-center justify-end">
                      <span className="flex items-center gap-1.5 bg-brand-coral text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                        📺 Ver stream en Calendario
                      </span>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
