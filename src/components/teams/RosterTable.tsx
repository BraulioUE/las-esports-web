import type { Player } from '@/lib/supabase/types'
import { ROLES } from '@/lib/supabase/types'

const roleColors: Record<string, string> = {
  Top:     'text-brand-amber',
  Jungle:  'text-green-400',
  Mid:     'text-brand-teal',
  ADC:     'text-brand-coral',
  Support: 'text-purple-400',
}

const flags: Record<string, string> = {
  CHI: '🇨🇱',
  ARG: '🇦🇷',
  PER: '🇵🇪',
  URU: '🇺🇾',
  COL: '🇨🇴',
  MEX: '🇲🇽',
  BOL: '🇧🇴',
  PAR: '🇵🇾',
  VEN: '🇻🇪',
  ECU: '🇪🇨',
  BRA: '🇧🇷',
}

function opggUrl(nick: string): string {
  const formatted = nick.replace('#', '-').replace(/ /g, '%20')
  return `https://www.op.gg/summoners/las/${formatted}`
}

function PlayerEntry({ player }: { player: Player }) {
  const url   = player.nick ? opggUrl(player.nick) : null
  const flag  = player.pais ? (flags[player.pais.toUpperCase()] ?? null) : null

  const content = (
    <span className="flex flex-col leading-tight">
      <span className="text-white font-bold text-base">
        {player.nick ?? player.nombre}
      </span>
      {player.nick && (
        <span className="flex items-center gap-1 text-brand-teal text-xs">
          {player.nombre}
          {flag && <span className="leading-none">{flag}</span>}
        </span>
      )}
      {!player.nick && flag && (
        <span className="text-xs leading-none">{flag}</span>
      )}
    </span>
  )

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:opacity-80 transition-opacity"
      >
        {content}
      </a>
    )
  }
  return content
}

export default function RosterTable({ players }: { players: Player[] }) {
  const starters  = players.filter(p => !p.suplente)
  const suplentes = players.filter(p => p.suplente)

  return (
    <div>
      {/* Titulares */}
      <div className="divide-y divide-brand-teal/10">
        {ROLES.map(rol => {
          const titular = starters.filter(p => p.rol === rol)
          if (titular.length === 0) return null
          return (
            <div key={rol} className="flex items-center gap-4 py-3">
              <span className={`w-20 text-xs font-bold uppercase shrink-0 ${roleColors[rol]}`}>
                {rol}
              </span>
              <div className="flex flex-wrap gap-4">
                {titular.map(p => <PlayerEntry key={p.id} player={p} />)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Suplentes */}
      {suplentes.length > 0 && (
        <div className="mt-4 pt-4 border-t border-brand-teal/20">
          <p className="text-white/50 text-xs font-bold uppercase tracking-wider mb-2">
            Suplentes
          </p>
          <div className="divide-y divide-brand-teal/10">
            {suplentes.map(p => (
              <div key={p.id} className="flex items-center gap-4 py-3">
                <span className={`w-20 text-xs font-bold uppercase shrink-0 ${roleColors[p.rol]}`}>
                  {p.rol}
                </span>
                <PlayerEntry player={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
