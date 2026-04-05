import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

const buffer = readFileSync('/Users/brauliouribe/Downloads/LogoAut.jpeg')

const { error } = await supabase.storage
  .from('logos')
  .upload('aut.jpg', buffer, { contentType: 'image/jpeg', upsert: true })

if (error) { console.error(error.message); process.exit(1) }

const { data: { publicUrl } } = supabase.storage.from('logos').getPublicUrl('aut.jpg')

const { error: e2 } = await supabase
  .from('teams')
  .update({ logo_url: publicUrl })
  .eq('id', '11111111-0000-0000-0000-000000000007')

if (e2) console.error(e2.message)
else console.log('✓ Logo AUT subido →', publicUrl)
