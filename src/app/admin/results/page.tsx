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
  const matchId  = formData.get('match_id') as string
  const winnerId = formData.get('winner_id') as string

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  await supabase.from('matches').update({ ganador_id: winnerId }).eq('id', matchId)

  revalidatePath('/admin/results')
  revalidatePath('/standings')
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
    .is('ganador_id', null)
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
              <div className="flex items-start justify-between gap-6">
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

                <form action={registerResult} className="flex items-center gap-3 shrink-0">
                  <input type="hidden" name="match_id" value={match.id} />
                  <select
                    name="winner_id"
                    required
                    className="bg-brand-navy border border-brand-teal/30 text-brand-teal-light text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-brand-amber"
                  >
                    <option value="">Seleccionar ganador</option>
                    <option value={match.team_a.id}>{match.team_a.nombre}</option>
                    <option value={match.team_b.id}>{match.team_b.nombre}</option>
                  </select>
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
