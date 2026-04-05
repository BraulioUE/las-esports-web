import Image from 'next/image'

interface Props {
  nombre: string
  siglas: string
  logo_url: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const sizes = {
  sm: { px: 28,  cls: 'w-7 h-7',   text: 'text-xs'  },
  md: { px: 48,  cls: 'w-12 h-12', text: 'text-sm'  },
  lg: { px: 64,  cls: 'w-16 h-16', text: 'text-xl'  },
  xl: { px: 80,  cls: 'w-20 h-20', text: 'text-2xl' },
}

export default function TeamLogo({ nombre, siglas, logo_url, size = 'md' }: Props) {
  const { px, cls, text } = sizes[size]

  return (
    <div className={`${cls} rounded-full bg-brand-navy border border-brand-teal/20 flex items-center justify-center shrink-0 overflow-hidden`}>
      {logo_url ? (
        <Image
          src={logo_url}
          alt={nombre}
          width={px}
          height={px}
          className="w-full h-full object-cover"
        />
      ) : (
        <span className={`font-display font-bold text-brand-teal ${text}`}>
          {siglas.slice(0, 2)}
        </span>
      )}
    </div>
  )
}
