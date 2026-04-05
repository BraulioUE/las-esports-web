'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Credenciales incorrectas.')
      setLoading(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-navy px-4">
      <div className="w-full max-w-sm bg-brand-panel border border-brand-teal/20 rounded-xl p-8">
        <h1 className="font-display text-2xl font-bold text-brand-teal-light mb-2 text-center">
          Panel Admin
        </h1>
        <p className="text-brand-teal text-sm text-center mb-6">LAS Esports</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-brand-teal text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber transition-colors"
            />
          </div>

          <div>
            <label className="block text-brand-teal text-sm mb-1">Contraseña</label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-brand-navy border border-brand-teal/30 rounded-lg px-3 py-2 text-brand-teal-light text-sm focus:outline-none focus:border-brand-amber transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-amber hover:bg-brand-amber/90 disabled:opacity-50 text-brand-navy font-bold rounded-lg px-4 py-2 text-sm transition-colors"
          >
            {loading ? 'Ingresando…' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
