import type { Match, Team } from '@/lib/supabase/types'
import Badge from '@/components/ui/Badge'
import TeamLogo from '@/components/ui/TeamLogo'
import { formatTime, isToday } from '@/lib/utils'

type MatchFull = Match & {
  team_a: Pick<Team, 'id' | 'nombre' | 'siglas' | 'logo_url'>
  team_b: Pick<Team, 'id' | 'nombre' | 'siglas' | 'logo_url'>
  ganador?: Pick<Team, 'id' | 'nombre' | 'siglas'> | null
}

export default function MatchCard({ match }: { match: MatchFull }) {
  const played    = match.ganador_id !== null
  const live      = isToday(match.fecha) && !played
  const winnerA   = played && match.ganador_id === match.team_a.id
  const winnerB   = played && match.ganador_id === match.team_b.id

  return (
    <div className="bg-brand-panel border border-brand-amber/20 rounded-xl p-4 flex items-center gap-4">
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
            {match.hora && (
              <p className="text-brand-teal text-xs mt-1">{formatTime(match.hora)}</p>
            )}
          </div>
        )}
        {match.transmitido && (
          <p className="text-brand-amber text-xs mt-1">📺 En vivo</p>
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
  )
}
