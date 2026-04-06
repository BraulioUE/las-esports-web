import type { Match, Team } from '@/lib/supabase/types'
import Badge from '@/components/ui/Badge'
import TeamLogo from '@/components/ui/TeamLogo'
import { formatTime, isToday, isLiveNow, horaChile } from '@/lib/utils'

type MatchFull = Match & {
  team_a: Pick<Team, 'id' | 'nombre' | 'siglas' | 'logo_url'>
  team_b: Pick<Team, 'id' | 'nombre' | 'siglas' | 'logo_url'>
  ganador?: Pick<Team, 'id' | 'nombre' | 'siglas'> | null
}

export default function MatchCard({ match }: { match: MatchFull }) {
  const played  = match.ganador_id !== null
  const live    = isLiveNow(match.fecha, match.hora) && !played
  const today   = isToday(match.fecha) && !played
  const winnerA = played && match.ganador_id === match.team_a.id
  const winnerB = played && match.ganador_id === match.team_b.id

  return (
    <div className="rounded-xl overflow-hidden border border-brand-amber/20">
      {/* Fila principal */}
      <div className="bg-brand-panel p-4 flex items-center gap-4">
        {/* Team A */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <span className={`font-display font-bold text-right hidden sm:block ${
            winnerA ? 'text-brand-teal-light' : played ? 'text-brand-teal/60' : 'text-brand-teal-light'
          }`}>
            {match.team_a.nombre}
          </span>
          <span className={`font-display font-bold text-sm ${
            winnerA ? 'text-brand-teal-light' : played ? 'text-brand-teal/60' : 'text-brand-teal-light'
          }`}>
            {match.team_a.siglas}
          </span>
          <TeamLogo nombre={match.team_a.nombre} siglas={match.team_a.siglas} logo_url={match.team_a.logo_url} size="sm" />
          {winnerA && <span className="text-brand-amber text-xs">🏆</span>}
        </div>

        {/* Centro */}
        <div className="text-center min-w-[80px]">
          {live ? (
            <Badge variant="live">EN VIVO</Badge>
          ) : played ? (
            <Badge variant={winnerA ? 'win' : 'loss'}>
              {winnerA ? 'V' : 'D'} — {winnerB ? 'V' : 'D'}
            </Badge>
          ) : (
            <div>
              <span className="text-brand-teal/60 text-sm font-bold">VS</span>
              {match.hora && !today && (
                <p className="text-brand-teal text-xs mt-1">{formatTime(match.hora)}</p>
              )}
            </div>
          )}
        </div>

        {/* Team B */}
        <div className="flex-1 flex items-center gap-3">
          {winnerB && <span className="text-brand-amber text-xs">🏆</span>}
          <TeamLogo nombre={match.team_b.nombre} siglas={match.team_b.siglas} logo_url={match.team_b.logo_url} size="sm" />
          <span className={`font-display font-bold text-sm ${
            winnerB ? 'text-brand-teal-light' : played ? 'text-brand-teal/60' : 'text-brand-teal-light'
          }`}>
            {match.team_b.siglas}
          </span>
          <span className={`font-display font-bold hidden sm:block ${
            winnerB ? 'text-brand-teal-light' : played ? 'text-brand-teal/60' : 'text-brand-teal-light'
          }`}>
            {match.team_b.nombre}
          </span>
        </div>
      </div>

      {/* Panel inferior — visible en todas las partidas de HOY no jugadas */}
      {today && (
        <div className="bg-brand-navy/70 border-t border-brand-amber/10 px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap">
          {match.hora ? (
            <div className="flex items-center gap-5 text-xs">
              <span className="flex items-center gap-1.5 text-brand-teal">
                🇦🇷 <span className="text-brand-teal-light font-bold">{formatTime(match.hora)}</span>
                <span className="text-brand-teal/50">ARG</span>
              </span>
              <span className="text-brand-teal/20">|</span>
              <span className="flex items-center gap-1.5 text-brand-teal">
                🇨🇱 <span className="text-brand-teal-light font-bold">{horaChile(match.hora)}</span>
                <span className="text-brand-teal/50">CHI</span>
              </span>
            </div>
          ) : (
            <span className="text-brand-teal/50 text-xs italic">Horario por confirmar</span>
          )}

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
}
