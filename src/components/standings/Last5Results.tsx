type Result = 'W' | 'E' | 'L'

const styles: Record<Result, string> = {
  W: 'bg-brand-amber/20 text-brand-amber border border-brand-amber/50',
  E: 'bg-brand-teal/20 text-brand-teal border border-brand-teal/50',
  L: 'bg-red-900/30 text-red-400 border border-red-700/50',
}

export default function Last5Results({ results }: { results: Result[] }) {
  return (
    <div className="flex gap-1">
      {results.map((r, i) => (
        <span
          key={i}
          className={`w-5 h-5 rounded-sm text-xs font-bold flex items-center justify-center ${styles[r]}`}
        >
          {r}
        </span>
      ))}
      {Array.from({ length: Math.max(0, 5 - results.length) }).map((_, i) => (
        <span
          key={`empty-${i}`}
          className="w-5 h-5 rounded-sm text-xs flex items-center justify-center bg-brand-panel border border-brand-teal/10 text-brand-teal/30"
        >
          –
        </span>
      ))}
    </div>
  )
}
