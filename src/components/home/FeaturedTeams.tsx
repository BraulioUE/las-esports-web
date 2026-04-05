import Link from 'next/link'
import type { Team } from '@/lib/supabase/types'
import Card from '@/components/ui/Card'
import TeamLogo from '@/components/ui/TeamLogo'

export default function FeaturedTeams({ teams }: { teams: Team[] }) {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-3xl font-bold text-brand-teal-light mb-8">
          Equipos de la liga
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {teams.map(team => (
            <Link key={team.id} href={`/teams/${team.siglas.toLowerCase()}`}>
              <Card className="p-5 hover:border-brand-amber/50 transition-colors group text-center">
                <div className="flex justify-center mb-3">
                  <TeamLogo nombre={team.nombre} siglas={team.siglas} logo_url={team.logo_url} size="lg" />
                </div>
                <p className="font-display font-bold text-brand-teal-light group-hover:text-white transition-colors">
                  {team.nombre}
                </p>
                <p className="text-brand-teal text-xs mt-1">{team.siglas}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
