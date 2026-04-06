import type { Match, Team } from '@/lib/supabase/types'
import { formatDate, isToday } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

type MatchFull = Match & {
  team_a: Pick<Team, 'id' | 'nombre' | 'siglas'>
  team_b: Pick<Team, 'id' | 'nombre' | 'siglas'>
}

export default function MatchHistory({
  matches,
  teamId,
}: {
  matches: MatchFull[]
  teamId: string
}) {
  if (matches.length === 0) {
    return <p className="text-brand-teal text-sm">Sin historial de partidas.</p>
  }

  return (
    <div className="space-y-2">
      {matches.map(match => {
        const played   = match.score_a !== null
        const draw     = played && match.score_a === 1 && match.score_b === 1
        const today    = !played && isToday(match.fecha)
        const won      = match.ganador_id === teamId
        const opponent = match.team_a.id === teamId ? match.team_b : match.team_a
        const myScore  = match.team_a.id === teamId ? match.score_a : match.score_b
        const oppScore = match.team_a.id === teamId ? match.score_b : match.score_a

        return (
          <div
            key={match.id}
            className="flex items-center justify-between py-2 border-b border-brand-teal/10"
          >
            <div className="flex items-center gap-3">
              {played ? (
                draw ? (
                  <Badge variant="pending">E</Badge>
                ) : (
                  <Badge variant={won ? 'win' : 'loss'}>{won ? 'V' : 'D'}</Badge>
                )
              ) : today ? (
                <Badge variant="amber">HOY</Badge>
              ) : (
                <Badge variant="pending">Pend.</Badge>
              )}
              <span className="text-brand-teal text-sm">vs</span>
              <span className="text-brand-teal-light text-sm font-semibold">
                {opponent.nombre}
              </span>
              {played && (
                <span className="text-brand-teal/60 text-xs font-mono">
                  {myScore} — {oppScore}
                </span>
              )}
            </div>
            <p className="text-brand-teal text-xs">{formatDate(match.fecha)}</p>
          </div>
        )
      })}
    </div>
  )
}
