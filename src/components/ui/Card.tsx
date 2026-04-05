import { cn } from '@/lib/utils'

export default function Card({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'bg-brand-panel border border-brand-amber/20 rounded-xl',
        className
      )}
    >
      {children}
    </div>
  )
}
