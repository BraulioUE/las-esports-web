import { createClient } from '@/lib/supabase/server'
import Image from 'next/image'

export default async function SponsorBar() {
  const supabase = await createClient()
  const { data: sponsors } = await supabase
    .from('sponsors')
    .select('*')
    .eq('activo', true)
    .order('created_at')

  if (!sponsors || sponsors.length === 0) return null

  return (
    <section className="bg-brand-panel/50 border-t border-brand-teal/10 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <p className="text-brand-teal/60 text-xs text-center mb-3 uppercase tracking-widest">
          Patrocinadores
        </p>
        <div className="flex items-center justify-center gap-8 flex-wrap">
          {sponsors.map(sponsor => (
            <a
              key={sponsor.id}
              href={sponsor.link ?? undefined}
              target="_blank"
              rel="noopener noreferrer"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Image
                src={sponsor.logo_url}
                alt={sponsor.nombre}
                width={120}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
