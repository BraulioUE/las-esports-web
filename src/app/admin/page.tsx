import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Card from '@/components/ui/Card'

export const runtime = 'edge'

export default async function AdminDashboard() {
  const supabase = await createClient()

  const [
    { count: teamCount },
    { count: playerCount },
    { count: matchCount },
    { count: pendingCount },
    { count: sponsorCount },
  ] = await Promise.all([
    supabase.from('teams').select('*', { count: 'exact', head: true }).eq('activo', true),
    supabase.from('players').select('*', { count: 'exact', head: true }),
    supabase.from('matches').select('*', { count: 'exact', head: true }).not('ganador_id', 'is', null),
    supabase.from('matches').select('*', { count: 'exact', head: true }).is('ganador_id', null),
    supabase.from('sponsors').select('*', { count: 'exact', head: true }).eq('activo', true),
  ])

  const stats = [
    { label: 'Equipos activos',      value: teamCount ?? 0,    href: '/admin/teams' },
    { label: 'Jugadores registrados', value: playerCount ?? 0,  href: '/admin/teams' },
    { label: 'Partidas jugadas',      value: matchCount ?? 0,   href: '/admin/results' },
    { label: 'Partidas pendientes',   value: pendingCount ?? 0, href: '/admin/results' },
    { label: 'Patrocinadores activos',value: sponsorCount ?? 0, href: '/admin/sponsors' },
  ]

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand-teal-light mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {stats.map(stat => (
          <Link key={stat.label} href={stat.href}>
            <Card className="p-5 text-center hover:border-brand-amber/40 transition-colors">
              <p className="font-display text-3xl font-bold text-brand-amber">{stat.value}</p>
              <p className="text-brand-teal text-xs mt-1">{stat.label}</p>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link href="/admin/results">
          <Card className="p-6 hover:border-brand-amber/40 transition-colors">
            <h2 className="font-display text-xl font-bold text-brand-teal-light mb-1">Resultados</h2>
            <p className="text-brand-teal text-sm">Registrar ganadores de partidas pendientes</p>
          </Card>
        </Link>
        <Link href="/admin/teams">
          <Card className="p-6 hover:border-brand-amber/40 transition-colors">
            <h2 className="font-display text-xl font-bold text-brand-teal-light mb-1">Equipos</h2>
            <p className="text-brand-teal text-sm">Gestionar equipos y jugadores</p>
          </Card>
        </Link>
        <Link href="/admin/sponsors">
          <Card className="p-6 hover:border-brand-amber/40 transition-colors">
            <h2 className="font-display text-xl font-bold text-brand-teal-light mb-1">Patrocinadores</h2>
            <p className="text-brand-teal text-sm">Activar o desactivar patrocinadores</p>
          </Card>
        </Link>
      </div>
    </div>
  )
}
