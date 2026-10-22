import { useEffect, useRef, type ReactNode } from 'react'

import { cn } from '@/lib/utils'

/** Emblema heráldico de Fire Space: escudo, llama y corona de laurel dorado. */
export function Emblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="fs-gold" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f3dc8a" />
          <stop offset="0.5" stopColor="#d4af37" />
          <stop offset="1" stopColor="#7d621a" />
        </linearGradient>
        <linearGradient id="fs-red" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#a30000" />
          <stop offset="1" stopColor="#3d0000" />
        </linearGradient>
      </defs>
      <path
        d="M32 3 58 12v22c0 17-11.5 28.5-26 35C17.5 62.5 6 51 6 34V12Z"
        fill="url(#fs-red)"
        stroke="url(#fs-gold)"
        strokeWidth="2.2"
      />
      <path
        d="M32 9 52 16v18c0 13.5-8.8 23-20 28.5C20.8 57 12 47.5 12 34V16Z"
        fill="none"
        stroke="url(#fs-gold)"
        strokeWidth="0.8"
        opacity="0.6"
      />
      <path
        d="M32 18c2.5 6 9 9 9 17a9 9 0 0 1-18 0c0-4 2-6.5 3.5-8 .2 3 1.6 4.8 3.4 5.4C28.5 28 30.5 23 32 18Z"
        fill="url(#fs-gold)"
      />
      <path d="M32 33c1.4 2.4 3.6 3.6 3.6 6.4a3.6 3.6 0 0 1-7.2 0c0-2.4 2.3-3.8 3.6-6.4Z" fill="#3d0000" />
      <path
        d="M17 50c4 4 9 6 15 6s11-2 15-6M19.5 46.5l-3 1.5M22 50l-2.7 2M44.5 46.5l3 1.5M42 50l2.7 2"
        stroke="url(#fs-gold)"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Aparición suave al hacer scroll. */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'section' | 'article' | 'li'
}) {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible')
          obs.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <Tag
      ref={ref as never}
      className={cn('fs-reveal', className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  )
}

export function SectionHeading({
  kicker,
  title,
  children,
  className,
}: {
  kicker: string
  title: ReactNode
  children?: ReactNode
  className?: string
}) {
  return (
    <Reveal className={cn('mx-auto mb-14 max-w-3xl text-center', className)}>
      <p className="fs-divider font-display text-xs tracking-[0.45em] uppercase">
        <span>{kicker}</span>
      </p>
      <h2 className="text-gold-gradient mt-5 font-display text-4xl leading-tight font-bold md:text-5xl">
        {title}
      </h2>
      {children && (
        <div className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
          {children}
        </div>
      )}
    </Reveal>
  )
}

/** Bloque de cita al estilo de los comunicados de la academia. */
export function Cita({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <blockquote
      className={cn(
        'border-l-2 border-gold/60 bg-gradient-to-r from-[#8b0000]/15 to-transparent py-4 pr-4 pl-6 text-xl leading-relaxed text-foreground/90 italic',
        className,
      )}
    >
      {children}
    </blockquote>
  )
}

export function Ornamento({ className }: { className?: string }) {
  return (
    <div className={cn('fs-divider my-10 font-display text-sm', className)} aria-hidden="true">
      <span>[ 𝕱𝖘. ]</span>
    </div>
  )
}
