import Link from 'next/link'

const links = [
  { href: '/',          label: 'Inicio' },
  { href: '/standings', label: 'Standings' },
  { href: '/calendar',  label: 'Calendario' },
  { href: '/teams',     label: 'Equipos' },
]

export default function Navbar() {
  return (
    <header className="bg-brand-panel/90 backdrop-blur-sm border-b border-brand-teal/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold text-brand-teal-light tracking-wide hover:text-brand-amber transition-colors">
          LAS <span className="text-brand-amber">Esports</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-brand-teal hover:text-brand-amber text-sm font-medium transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Mobile menu placeholder */}
        <button className="md:hidden text-brand-amber p-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}
