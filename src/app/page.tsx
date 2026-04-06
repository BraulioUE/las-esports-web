import { createClient } from '@/lib/supabase/server'
import HeroSection from '@/components/home/HeroSection'
import FeaturedTeams from '@/components/home/FeaturedTeams'
import UpcomingMatches from '@/components/home/UpcomingMatches'

export const runtime = 'edge'

export default async function HomePage() {
  const supabase = await createClient()

  const todayArg = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString().split('T')[0]

  const [{ data: teams }, { data: upcomingMatches }, { count: matchCount }] =
    await Promise.all([
      supabase.from('teams').select('*').eq('activo', true).order('nombre'),
      supabase
        .from('matches')
        .select('*, team_a:teams!matches_team_a_id_fkey(nombre,siglas,logo_url), team_b:teams!matches_team_b_id_fkey(nombre,siglas,logo_url)')
        .is('ganador_id', null)
        .eq('fecha', todayArg)
        .order('hora'),
      supabase
        .from('matches')
        .select('*', { count: 'exact', head: true })
        .not('ganador_id', 'is', null),
    ])

  return (
    <>
      <HeroSection
        teamCount={teams?.length ?? 0}
        matchCount={matchCount ?? 0}
      />
      <FeaturedTeams teams={teams ?? []} />
      <UpcomingMatches matches={(upcomingMatches ?? []) as Parameters<typeof UpcomingMatches>[0]['matches']} />
    </>
  )
}
