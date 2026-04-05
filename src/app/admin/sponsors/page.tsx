import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import Card from '@/components/ui/Card'
import Image from 'next/image'

export const runtime = 'edge'

async function toggleSponsor(formData: FormData) {
  'use server'
  const sponsorId = formData.get('sponsor_id') as string
  const current   = formData.get('current') === 'true'

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  await supabase.from('sponsors').update({ activo: !current }).eq('id', sponsorId)

  revalidatePath('/admin/sponsors')
  revalidatePath('/')
}

async function addSponsor(formData: FormData) {
  'use server'
  const nombre   = formData.get('nombre') as string
  const logo_url = formData.get('logo_url') as string
  const link     = formData.get('link') as string

  const { createClient } = await import('@/lib/supabase/server')
  const supabase = await createClient()
  await supabase.from('sponsors').insert({ nombre, logo_url, link: link || null })

  revalidatePath('/admin/sponsors')
  revalidatePath('/')
}

export default async function SponsorsPage() {
  const supabase = await createClient()
  const { data: sponsors } = await supabase
    .from('sponsors')
    .select('*')
    .order('created_at')

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-brand-teal-light mb-8">
        Patrocinadores
      </h1>

      {/* Lista de patrocinadores */}
      <div className="space-y-3 mb-10">
        {(!sponsors || sponsors.length === 0) ? (
          <Card className="p-6 text-center">
            <p className="text-brand-teal">No hay patrocinadores registrados.</p>
          </Card>
        ) : sponsors.map(sponsor => (
          <Card key={sponsor.id} className="p-4 flex items-center gap-4">
            <Image
              src={sponsor.logo_url}
              alt={sponsor.nombre}
              width={80}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <div className="flex-1 min-w-0">
              <p className="text-brand-teal-light font-semibold">{sponsor.nombre}</p>
              {sponsor.link && (
                <p className="text-brand-teal text-xs truncate">{sponsor.link}</p>
              )}
            </div>
            <form action={toggleSponsor}>
              <input type="hidden" name="sponsor_id" value={sponsor.id} />
              <input type="hidden" name="current" value={String(sponsor.activo)} />
              <button
                type="submit"
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  sponsor.activo ? 'bg-brand-teal' : 'bg-brand-panel border border-brand-teal/30'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    sponsor.activo ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </form>
            <span className={`text-xs font-semibold w-16 text-center ${
              sponsor.activo ? 'text-brand-teal' : 'text-brand-teal/40'
            }`}>
              {sponsor.activo ? 'Activo' : 'Inactivo'}
            </span>
          </Card>
        ))}
      </div>

      {/* Formulario para agregar patrocinador */}
      <Card className="p-6">
        <h2 className="font-display text-xl font-bold text-brand-teal-light mb-4">
          Agregar patrocinador
        </h2>
        <form action={addSponsor} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-brand-teal text-xs mb-1">Nombre</label>
            <input
              name="nombre"
              required
              placeholder="Acme Corp"
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
            />
          </div>
          <div>
            <label className="block text-brand-teal text-xs mb-1">URL del logo</label>
            <input
              name="logo_url"
              required
              placeholder="https://..."
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
            />
          </div>
          <div>
            <label className="block text-brand-teal text-xs mb-1">Link (opcional)</label>
            <input
              name="link"
              placeholder="https://..."
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber"
            />
          </div>
          <div className="sm:col-span-3">
            <button
              type="submit"
              className="bg-brand-amber hover:bg-brand-amber/90 text-brand-navy font-bold text-sm px-6 py-2 rounded-lg transition-colors"
            >
              Agregar
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}
