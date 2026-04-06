export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00')
  return date.toLocaleDateString('es-AR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

export function formatTime(timeStr: string | null): string {
  if (!timeStr) return ''
  const [h, m] = timeStr.split(':')
  return `${h}:${m}hs`
}

// Argentina es UTC-3 fijo (sin DST)
function todayArgentina(): string {
  const now = new Date()
  const arg = new Date(now.getTime() - 3 * 60 * 60 * 1000)
  return arg.toISOString().split('T')[0]
}

export function isToday(dateStr: string): boolean {
  return dateStr === todayArgentina()
}

export function isPast(dateStr: string): boolean {
  return dateStr < todayArgentina()
}

// Marca EN VIVO solo si la hora del partido ya llegó (15min antes → 3h después)
// hora está en tiempo ARG (UTC-3)
export function isLiveNow(fecha: string, hora: string | null): boolean {
  if (fecha !== todayArgentina()) return false
  if (!hora) return false
  const horaShort = hora.substring(0, 5) // '22:30'
  const matchUtcMs = new Date(`${fecha}T${horaShort}:00-03:00`).getTime()
  const nowMs = Date.now()
  const diffMs = nowMs - matchUtcMs
  return diffMs >= -15 * 60 * 1000 && diffMs <= 3 * 60 * 60 * 1000
}

// Chile está 1 hora menos que Argentina (UTC-4 desde abril 2026)
export function horaChile(horaArg: string): string {
  const [h, m] = horaArg.split(':').map(Number)
  const chH = ((h - 1) + 24) % 24
  return `${String(chH).padStart(2, '0')}:${String(m).padStart(2, '0')}hs`
}
