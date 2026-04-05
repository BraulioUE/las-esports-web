import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminLogoutButton from '@/components/admin/LogoutButton'

export const runtime = 'edge'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen bg-brand-navy">
      <header className="bg-brand-panel border-b border-brand-teal/20 px-6 py-4 flex items-center justify-between">
        <div>
          <span className="font-display text-xl font-bold text-brand-teal-light">
            Panel Admin
          </span>
          <span className="text-brand-teal text-sm ml-3">LAS Esports</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-brand-teal text-sm">{user.email}</span>
          <AdminLogoutButton />
        </div>
      </header>

      <nav className="bg-brand-panel/50 border-b border-brand-teal/10 px-6 py-2 flex gap-6">
        <a href="/admin"          className="text-brand-teal hover:text-brand-amber text-sm transition-colors">Dashboard</a>
        <a href="/admin/results"  className="text-brand-teal hover:text-brand-amber text-sm transition-colors">Resultados</a>
        <a href="/admin/teams"    className="text-brand-teal hover:text-brand-amber text-sm transition-colors">Equipos</a>
        <a href="/admin/sponsors" className="text-brand-teal hover:text-brand-amber text-sm transition-colors">Patrocinadores</a>
        <a href="/"               className="text-brand-teal hover:text-brand-amber text-sm transition-colors ml-auto">← Ver web</a>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-8">{children}</main>
    </div>
  )
}
