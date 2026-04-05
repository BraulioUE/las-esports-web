import { cn } from '@/lib/utils'

type Variant = 'win' | 'loss' | 'live' | 'pending' | 'amber'

const variants: Record<Variant, string> = {
  win:     'bg-teal-900/40 text-brand-teal-light border border-brand-teal',
  loss:    'bg-red-900/40 text-red-300 border border-red-700',
  live:    'bg-brand-coral/20 text-brand-coral border border-brand-coral animate-pulse',
  pending: 'bg-brand-panel text-brand-teal border border-brand-teal/40',
  amber:   'bg-brand-amber/20 text-brand-amber border border-brand-amber/40',
}

export default function Badge({
  variant,
  children,
  className,
}: {
  variant: Variant
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
