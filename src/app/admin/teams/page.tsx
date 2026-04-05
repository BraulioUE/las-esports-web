import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import Card from '@/components/ui/Card'
import type { Team } from '@/lib/supabase/types'
import { ROLES } from '@/lib/supabase/types'

export const runtime = 'edge'

async function addTeam(formData: FormData) {
  'use server'
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  await supabase.from('teams').insert({
    nombre:        formData.get('nombre') as string,
    siglas:        formData.get('siglas') as string,
    logo_url:      (formData.get('logo_url') as string) || null,
    representante: (formData.get('representante') as string) || null,
    discord_url:   (formData.get('discord_url') as string) || null,
  })
  revalidatePath('/admin/teams')
  revalidatePath('/teams')
  revalidatePath('/')
}

async function addPlayer(formData: FormData) {
  'use server'
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  await supabase.from('players').insert({
    team_id:  formData.get('team_id') as string,
    nombre:   formData.get('nombre') as string,
    rol:      formData.get('rol') as string,
    suplente: formData.get('suplente') === 'on',
  })
  revalidatePath('/admin/teams')
}

async function addMatch(formData: FormData) {
  'use server'
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  await supabase.from('matches').insert({
    team_a_id:   formData.get('team_a_id') as string,
    team_b_id:   formData.get('team_b_id') as string,
    fecha:       formData.get('fecha') as string,
    hora:        (formData.get('hora') as string) || null,
    transmitido: formData.get('transmitido') === 'on',
  })
  revalidatePath('/admin/teams')
  revalidatePath('/calendar')
  revalidatePath('/')
}

async function toggleTeam(formData: FormData) {
  'use server'
  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  const teamId  = formData.get('team_id') as string
  const current = formData.get('current') === 'true'
  await supabase.from('teams').update({ activo: !current }).eq('id', teamId)
  revalidatePath('/admin/teams')
  revalidatePath('/teams')
  revalidatePath('/')
}

export default async function TeamsAdminPage() {
  const supabase = await createClient()

  const [{ data: teams }, { data: players }] = await Promise.all([
    supabase.from('teams').select('*').order('nombre'),
    supabase.from('players').select('*').order('nombre'),
  ])

  return (
    <div className="space-y-8">
      <h1 className="font-display text-3xl font-bold text-brand-teal-light">Gestión de Equipos</h1>

      {/* Lista de equipos */}
      <Card className="p-6">
        <h2 className="font-display text-xl font-bold text-brand-teal-light mb-4">Equipos</h2>
        <div className="space-y-2 mb-6">
          {teams?.map(team => {
            const teamPlayers = players?.filter(p => p.team_id === team.id) ?? []
            return (
              <div key={team.id} className="flex items-center justify-between py-2 border-b border-brand-teal/10">
                <div>
                  <span className="text-brand-teal-light font-semibold">{team.nombre}</span>
                  <span className="text-brand-teal text-sm ml-2">({team.siglas})</span>
                  <span className="text-brand-teal/60 text-xs ml-3">{teamPlayers.length} jugadores</span>
                </div>
                <form action={toggleTeam} className="flex items-center gap-2">
                  <input type="hidden" name="team_id" value={team.id} />
                  <input type="hidden" name="current" value={String(team.activo)} />
                  <button
                    type="submit"
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                      team.activo ? 'bg-brand-teal' : 'bg-brand-panel border border-brand-teal/30'
                    }`}
                  >
                    <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                      team.activo ? 'translate-x-5' : 'translate-x-1'
                    }`} />
                  </button>
                  <span className={`text-xs w-12 ${team.activo ? 'text-brand-teal' : 'text-brand-teal/40'}`}>
                    {team.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </form>
              </div>
            )
          })}
        </div>

        {/* Agregar equipo */}
        <details className="mt-4">
          <summary className="text-brand-teal text-sm cursor-pointer hover:text-brand-teal-light">
            + Agregar equipo
          </summary>
          <form action={addTeam} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { name: 'nombre',        label: 'Nombre',        required: true  },
              { name: 'siglas',        label: 'Siglas',        required: true  },
              { name: 'logo_url',      label: 'Logo URL',      required: false },
              { name: 'representante', label: 'Representante', required: false },
              { name: 'discord_url',   label: 'Discord URL',   required: false },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-brand-teal text-xs mb-1">{field.label}</label>
                <input
                  name={field.name}
                  required={field.required}
                  className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="bg-brand-amber hover:bg-brand-amber/90 text-brand-navy font-bold text-sm px-6 py-2 rounded-lg transition-colors"
              >
                Agregar equipo
              </button>
            </div>
          </form>
        </details>
      </Card>

      {/* Agregar jugador */}
      <Card className="p-6">
        <h2 className="font-display text-xl font-bold text-brand-teal-light mb-4">Agregar jugador</h2>
        <form action={addPlayer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-brand-teal text-xs mb-1">Equipo</label>
            <select
              name="team_id"
              required
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
            >
              <option value="">Seleccionar...</option>
              {teams?.filter((t: Team) => t.activo).map(t => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-brand-teal text-xs mb-1">Nombre del jugador</label>
            <input
              name="nombre"
              required
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
            />
          </div>
          <div>
            <label className="block text-brand-teal text-xs mb-1">Rol</label>
            <select
              name="rol"
              required
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
            >
              {ROLES.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-end gap-3">
            <label className="flex items-center gap-2 text-brand-teal text-sm">
              <input type="checkbox" name="suplente" className="accent-brand-amber" />
              Suplente
            </label>
            <button
              type="submit"
              className="bg-brand-amber hover:bg-brand-amber/90 text-brand-navy font-bold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              Agregar
            </button>
          </div>
        </form>
      </Card>

      {/* Programar partida */}
      <Card className="p-6">
        <h2 className="font-display text-xl font-bold text-brand-teal-light mb-4">Programar partida</h2>
        <form action={addMatch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-brand-teal text-xs mb-1">Equipo A</label>
            <select
              name="team_a_id"
              required
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
            >
              <option value="">Seleccionar...</option>
              {teams?.filter((t: Team) => t.activo).map(t => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-brand-teal text-xs mb-1">Equipo B</label>
            <select
              name="team_b_id"
              required
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
            >
              <option value="">Seleccionar...</option>
              {teams?.filter((t: Team) => t.activo).map(t => (
                <option key={t.id} value={t.id}>{t.nombre}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-brand-teal text-xs mb-1">Fecha</label>
            <input
              type="date"
              name="fecha"
              required
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
            />
          </div>
          <div>
            <label className="block text-brand-teal text-xs mb-1">Hora (opcional)</label>
            <input
              type="time"
              name="hora"
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
            />
          </div>
          <div className="flex items-center gap-4 sm:col-span-2 lg:col-span-4">
            <label className="flex items-center gap-2 text-brand-teal text-sm">
              <input type="checkbox" name="transmitido" className="accent-brand-amber" />
              Se transmite en vivo
            </label>
            <button
              type="submit"
              className="bg-brand-amber hover:bg-brand-amber/90 text-brand-navy font-bold text-sm px-6 py-2 rounded-lg transition-colors"
            >
              Programar
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
