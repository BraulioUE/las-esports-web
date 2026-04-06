import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import Card from '@/components/ui/Card'
import { formatDate, formatTime } from '@/lib/utils'
import type { Match, Team } from '@/lib/supabase/types'

export const runtime = 'edge'

type PendingMatch = Match & {
  team_a: Pick<Team, 'id' | 'nombre' | 'siglas'>
  team_b: Pick<Team, 'id' | 'nombre' | 'siglas'>
}

async function registerResult(formData: FormData) {
  'use server'
  const matchId = formData.get('match_id') as string
  const result  = formData.get('result') as string   // '2-0' | '1-1' | '0-2'
  const teamAId = formData.get('team_a_id') as string
  const teamBId = formData.get('team_b_id') as string

  let score_a: number, score_b: number, ganador_id: string | null
  if (result === '2-0') {
    score_a = 2; score_b = 0; ganador_id = teamAId
  } else if (result === '0-2') {
    score_a = 0; score_b = 2; ganador_id = teamBId
  } else {
    score_a = 1; score_b = 1; ganador_id = null
  }

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  await supabase
    .from('matches')
    .update({ score_a, score_b, ganador_id })
    .eq('id', matchId)

  revalidatePath('/admin/results')
  revalidatePath('/standings')
  revalidatePath('/calendar')
  revalidatePath('/')
}

export default async function ResultsPage() {
  const supabase = await createClient()

  const { data: pending } = await supabase
    .from('matches')
    .select(`
      *,
      team_a:teams!matches_team_a_id_fkey(id,nombre,siglas),
      team_b:teams!matches_team_b_id_fkey(id,nombre,siglas)
    `)
    .is('score_a', null)
    .order('fecha')
    .order('hora')

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand-teal-light mb-2">
        Registrar Resultados
      </h1>
      <p className="text-brand-teal text-sm mb-8">
        {pending?.length ?? 0} partidas pendientes
      </p>

      {!pending || pending.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-brand-teal">No hay partidas pendientes.</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {(pending as PendingMatch[]).map(match => (
            <Card key={match.id} className="p-5">
              <div className="flex items-start justify-between gap-6 flex-wrap">
                <div>
                  <p className="text-brand-teal text-xs mb-1">
                    {formatDate(match.fecha)}{match.hora ? ` · ${formatTime(match.hora)}` : ''}
                  </p>
                  <p className="font-display text-xl font-bold text-brand-teal-light">
                    {match.team_a.nombre}{' '}
                    <span className="text-brand-teal">vs</span>{' '}
                    {match.team_b.nombre}
                  </p>
                </div>

                <form action={registerResult} className="flex items-center gap-3 flex-wrap shrink-0">
                  <input type="hidden" name="match_id"   value={match.id} />
                  <input type="hidden" name="team_a_id"  value={match.team_a.id} />
                  <input type="hidden" name="team_b_id"  value={match.team_b.id} />

                  <div className="flex gap-2">
                    {[
                      { value: '2-0', label: `2 — 0 (${match.team_a.siglas})` },
                      { value: '1-1', label: '1 — 1 Empate' },
                      { value: '0-2', label: `0 — 2 (${match.team_b.siglas})` },
                    ].map(opt => (
                      <label
                        key={opt.value}
                        className="flex items-center gap-1.5 cursor-pointer bg-brand-navy border border-brand-teal/20 hover:border-brand-amber/50 rounded-lg px-3 py-2 text-xs text-brand-teal-light has-[:checked]:border-brand-amber has-[:checked]:bg-brand-amber/10 transition-colors"
                      >
                        <input
                          type="radio"
                          name="result"
                          value={opt.value}
                          required
                          className="accent-brand-amber"
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="bg-brand-amber hover:bg-brand-amber/90 text-brand-navy font-bold text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    Guardar
                  </button>
                </form>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
