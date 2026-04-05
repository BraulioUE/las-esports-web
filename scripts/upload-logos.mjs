import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

const logos = [
  { file: '/Users/brauliouribe/Downloads/Logo MGS.png',          name: 'mgs.png',          mime: 'image/png',  teamId: '11111111-0000-0000-0000-000000000001' },
  { file: '/Users/brauliouribe/Downloads/Logo Apicultores.jpg',  name: 'apicultores.jpg',  mime: 'image/jpeg', teamId: '11111111-0000-0000-0000-000000000002' },
  { file: '/Users/brauliouribe/Downloads/Logo AFG.jpg',          name: 'afg.jpg',           mime: 'image/jpeg', teamId: '11111111-0000-0000-0000-000000000003' },
  { file: '/Users/brauliouribe/Downloads/Logo Gaping.jpg',       name: 'gaping.jpg',        mime: 'image/jpeg', teamId: '11111111-0000-0000-0000-000000000005' },
  { file: '/Users/brauliouribe/Downloads/Logo Runnans.jpg',      name: 'runaans.jpg',       mime: 'image/jpeg', teamId: '11111111-0000-0000-0000-000000000006' },
  { file: '/Users/brauliouribe/Downloads/Logo Zapadores.jpg',    name: 'zapadores.jpg',     mime: 'image/jpeg', teamId: '11111111-0000-0000-0000-000000000008' },
]

// Crear bucket si no existe
const { error: bucketError } = await supabase.storage.createBucket('logos', { public: true })
if (bucketError && !bucketError.message.includes('already exists')) {
  console.error('Error creando bucket:', bucketError.message)
  process.exit(1)
}
console.log('✓ Bucket "logos" listo')

for (const logo of logos) {
  const buffer = readFileSync(logo.file)

  const { error: uploadError } = await supabase.storage
    .from('logos')
    .upload(logo.name, buffer, { contentType: logo.mime, upsert: true })

  if (uploadError) {
    console.error(`✗ Error subiendo ${logo.name}:`, uploadError.message)
    continue
  }

  const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl(logo.name)

  const { error: updateError } = await supabase
    .from('teams')
    .update({ logo_url: publicUrl })
    .eq('id', logo.teamId)

  if (updateError) {
    console.error(`✗ Error actualizando team ${logo.teamId}:`, updateError.message)
  } else {
    console.log(`✓ ${logo.name} subido y team actualizado → ${publicUrl}`)
  }
}

console.log('\n¡Listo! Logos subidos.')
