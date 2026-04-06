export default function Footer() {
  return (
    <footer className="bg-brand-panel border-t border-brand-teal/20 py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-xl font-bold text-brand-teal-light">
          MGS <span className="text-brand-amber">ALLIN</span>
        </p>
        <p className="text-brand-teal text-sm">
          © {new Date().getFullYear()} MGS ALL IN. Todos los derechos reservados.
        </p>
        <p className="text-brand-teal/60 text-xs">
          Organizado por MGS — Migajeros
        </p>
      </div>
    </footer>
  )
}
