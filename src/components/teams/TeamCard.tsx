import Link from 'next/link'
import type { Team } from '@/lib/supabase/types'
import Card from '@/components/ui/Card'
import TeamLogo from '@/components/ui/TeamLogo'

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/teams/${team.siglas.toLowerCase()}`}>
      <Card className="p-6 hover:border-brand-amber/50 transition-colors group">
        <div className="flex items-center gap-4">
          <TeamLogo nombre={team.nombre} siglas={team.siglas} logo_url={team.logo_url} size="lg" />
          <div className="min-w-0">
            <p className="font-display text-xl font-bold text-brand-teal-light group-hover:text-white transition-colors truncate">
              {team.nombre}
            </p>
            <p className="text-brand-teal text-sm">{team.siglas}</p>
          </div>
        </div>
        {team.discord_url && (
          <div className="mt-4 pt-3 border-t border-brand-teal/10">
            <span className="text-brand-teal text-xs">Discord disponible</span>
          </div>
        )}
      </Card>
    </Link>
  )
}
