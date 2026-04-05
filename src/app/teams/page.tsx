import { createClient } from '@/lib/supabase/server'
import TeamCard from '@/components/teams/TeamCard'

export const runtime = 'edge'

export default async function TeamsPage() {
  const supabase = await createClient()
  const { data: teams } = await supabase
    .from('teams')
    .select('*')
    .eq('activo', true)
    .order('nombre')

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="font-display text-4xl font-bold text-brand-teal-light mb-2">
        Equipos
      </h1>
      <p className="text-brand-teal text-sm mb-8">
        {teams?.length ?? 0} equipos en la liga
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams?.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}
