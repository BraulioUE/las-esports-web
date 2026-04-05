export default function HeroSection({ teamCount, matchCount }: { teamCount: number; matchCount: number }) {
  return (
    <section className="relative bg-brand-panel/50 border-b border-brand-teal/10 py-20 px-4 text-center overflow-hidden">
      {/* Glow decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-amber/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto">
        <p className="text-brand-teal text-sm font-semibold uppercase tracking-widest mb-3">
          Liga Amateur Latinoamérica Sur
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-brand-teal-light leading-tight mb-4">
          MGS <span className="text-brand-amber">ALLIN</span>
        </h1>
        <p className="text-brand-teal text-lg mb-8 max-w-xl mx-auto">
          Alianza Sur — unidos sin fronteras
        </p>

        <div className="flex items-center justify-center gap-12 mb-10">
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-brand-amber">{teamCount}</p>
            <p className="text-brand-teal text-sm">Equipos</p>
          </div>
          <div className="w-px h-12 bg-brand-teal/20" />
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-brand-amber">{matchCount}</p>
            <p className="text-brand-teal text-sm">Partidas jugadas</p>
          </div>
          <div className="w-px h-12 bg-brand-teal/20" />
          <div className="text-center">
            <p className="font-display text-4xl font-bold text-brand-amber">S1</p>
            <p className="text-brand-teal text-sm">Temporada</p>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <a
            href="/standings"
            className="bg-brand-amber hover:bg-brand-amber/90 text-brand-navy font-bold px-6 py-3 rounded-lg text-sm transition-colors"
          >
            Ver Standings
          </a>
          <a
            href="/calendar"
            className="border border-brand-coral/50 hover:border-brand-coral text-brand-coral hover:text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
          >
            Próximas partidas
          </a>
        </div>
      </div>
    </section>
  )
}
