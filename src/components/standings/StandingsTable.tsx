import Link from 'next/link'
import type { Standing } from '@/lib/supabase/types'
import Last5Results from './Last5Results'
import TeamLogo from '@/components/ui/TeamLogo'

type TeamLast5 = {
  teamId: string
  results: ('W' | 'L')[]
}

export default function StandingsTable({
  standings,
  last5Map,
}: {
  standings: Standing[]
  last5Map: Record<string, ('W' | 'L')[]>
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-brand-teal/20">
            <th className="text-brand-teal font-semibold text-left py-3 px-4 w-10">#</th>
            <th className="text-brand-teal font-semibold text-left py-3 px-4">Equipo</th>
            <th className="text-brand-teal font-semibold text-center py-3 px-4">J</th>
            <th className="text-brand-teal font-semibold text-center py-3 px-4">V</th>
            <th className="text-brand-teal font-semibold text-center py-3 px-4">D</th>
            <th className="text-brand-teal font-semibold text-center py-3 px-4">%</th>
            <th className="text-brand-teal font-semibold text-center py-3 px-4">Últimas 5</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team, idx) => (
            <tr
              key={team.id}
              className="border-b border-brand-teal/10 hover:bg-brand-teal/5 transition-colors"
            >
              <td className="py-3 px-4 text-brand-amber font-bold">{idx + 1}</td>
              <td className="py-3 px-4">
                <Link
                  href={`/teams/${team.siglas.toLowerCase()}`}
                  className="flex items-center gap-3 hover:text-white transition-colors"
                >
                  <TeamLogo nombre={team.nombre} siglas={team.siglas} logo_url={team.logo_url} size="sm" />
                  <div>
                    <p className="text-brand-teal-light font-semibold">{team.nombre}</p>
                    <p className="text-brand-teal text-xs">{team.siglas}</p>
                  </div>
                </Link>
              </td>
              <td className="py-3 px-4 text-center text-brand-teal-light">{team.jugados}</td>
              <td className="py-3 px-4 text-center text-brand-amber font-bold">{team.ganados}</td>
              <td className="py-3 px-4 text-center text-red-400">{team.perdidos}</td>
              <td className="py-3 px-4 text-center text-brand-amber font-semibold">
                {team.win_rate}%
              </td>
              <td className="py-3 px-4">
                <div className="flex justify-center">
                  <Last5Results results={last5Map[team.id] ?? []} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
