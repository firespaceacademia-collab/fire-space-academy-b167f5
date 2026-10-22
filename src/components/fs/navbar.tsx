import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'

import { Emblem } from '@/components/fs/primitives'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export const ENLACES = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#lore', label: 'Historia & Lore' },
  { href: '#jerarquia', label: 'Jerarquía' },
  { href: '#directorio', label: 'Directorio de Estudiantes' },
  { href: '#intruders', label: 'The Intruders' },
  { href: '#admisiones', label: 'Admisiones' },
]

export function Logo({ className }: { className?: string }) {
  return (
    <a href="#inicio" className={cn('group flex items-center gap-3', className)}>
      <Emblem className="h-10 w-9 drop-shadow-[0_0_12px_rgba(139,0,0,0.6)] transition-transform duration-500 group-hover:scale-105" />
      <span className="leading-none">
        <span className="block font-display text-base font-bold tracking-[0.28em] text-gold">
          FIRE SPACE
        </span>
        <span className="mt-1 block font-display text-[0.6rem] tracking-[0.5em] text-foreground/60">
          ACADEMY
        </span>
      </span>
    </a>
  )
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activo, setActivo] = useState('#inicio')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActivo(`#${e.target.id}`)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const { href } of ENLACES) {
      const el = document.querySelector(href)
      if (el) obs.observe(el)
    }
    return () => {
      window.removeEventListener('scroll', onScroll)
      obs.disconnect()
    }
  }, [])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-all duration-500',
        scrolled
          ? 'border-b border-gold/15 bg-[#0d0d0d]/85 py-2 backdrop-blur-md'
          : 'bg-gradient-to-b from-black/70 to-transparent py-4',
      )}
    >
      <nav className="mx-auto flex max-w-content items-center justify-between px-5">
        <Logo />
        <ul className="hidden items-center gap-1 xl:flex">
          {ENLACES.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={cn(
                  'relative px-3 py-2 font-display text-[0.7rem] tracking-[0.2em] uppercase transition-colors',
                  activo === l.href ? 'text-gold' : 'text-foreground/70 hover:text-foreground',
                )}
              >
                {l.label}
                <span
                  className={cn(
                    'absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300',
                    activo === l.href ? 'scale-x-100' : 'scale-x-0',
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
        <Sheet>
          <SheetTrigger
            className="rounded-sm border border-gold/30 p-2 text-gold xl:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </SheetTrigger>
          <SheetContent side="right" className="border-gold/20 bg-[#0d0d0d]">
            <SheetHeader>
              <SheetTitle className="sr-only">Navegación</SheetTitle>
              <Logo />
            </SheetHeader>
            <ul className="mt-4 flex flex-col px-4">
              {ENLACES.map((l) => (
                <li key={l.href}>
                  <SheetClose asChild>
                    <a
                      href={l.href}
                      className="block border-b border-gold/10 py-4 font-display text-sm tracking-[0.2em] text-foreground/80 uppercase hover:text-gold"
                    >
                      {l.label}
                    </a>
                  </SheetClose>
                </li>
              ))}
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
