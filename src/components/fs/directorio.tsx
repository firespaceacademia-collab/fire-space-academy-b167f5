import { useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Eye, FileText, Search, ShieldAlert } from 'lucide-react'

import { Emblem, Reveal, SectionHeading } from '@/components/fs/primitives'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  ESTUDIANTES,
  INTELIGENCIAS,
  RANGOS,
  buscarRango,
  formatoPuntos,
  urlImagen,
  type Estudiante,
} from '@/lib/academia'
import { cn } from '@/lib/utils'

function Retrato({ e, ancho, className }: { e: Estudiante; ancho: number; className?: string }) {
  return (
    <div className={cn('relative overflow-hidden bg-[#120d0d]', className)}>
      {e.imagen ? (
        <img
          src={urlImagen(e.imagen, ancho)}
          alt={`Retrato de ${e.nombre}`}
          loading="lazy"
          className="size-full object-cover"
        />
      ) : (
        <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_50%_40%,#2a0707,#0d0d0d_70%)]">
          <Emblem className="h-1/3 w-auto opacity-40" />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    </div>
  )
}

function Etiqueta({ children, tono = 'gold' }: { children: React.ReactNode; tono?: 'gold' | 'red' }) {
  return (
    <span
      className={cn(
        'inline-block border px-2 py-0.5 font-display text-[0.6rem] tracking-[0.22em] uppercase',
        tono === 'gold' ? 'border-gold/40 text-gold' : 'border-[#8b0000] bg-[#8b0000]/30 text-[#f1c9c9]',
      )}
    >
      {children}
    </span>
  )
}

function TarjetaEstudiante({ e, onAbrir }: { e: Estudiante; onAbrir: () => void }) {
  return (
    <article className="group fs-frame flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:border-gold/50">
      <Retrato e={e} ancho={600} className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.02]" />
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          <Etiqueta>{e.inteligencia}</Etiqueta>
          <Etiqueta tono="red">{buscarRango(e.rango)?.id ?? e.rango}</Etiqueta>
        </div>
        <h3 className="mt-4 font-display text-2xl tracking-[0.08em] text-foreground">{e.nombre}</h3>
        <p className="mt-1 font-display text-sm text-gold">{formatoPuntos(e.puntos)}</p>
        <p className="mt-3 line-clamp-3 leading-relaxed text-foreground/70">{e.descripcion}</p>
        <div className="mt-auto pt-6">
          <Button variant="ghostGold" className="h-auto w-full py-3 text-xs whitespace-normal" onClick={onAbrir}>
            <FileText /> Ver Expediente / Lore Completo
          </Button>
        </div>
      </div>
    </article>
  )
}

function TarjetaVacia({ i }: { i: number }) {
  return (
    <div className="flex min-h-[22rem] flex-col items-center justify-center border border-dashed border-gold/15 bg-[#0f0e0e] p-6 text-center">
      <ShieldAlert className="size-7 text-gold/30" />
      <p className="mt-4 font-display text-xs tracking-[0.3em] text-gold/50 uppercase">
        Expediente Nº {String(i).padStart(3, '0')}
      </p>
      <p className="mt-2 text-foreground/40 italic">Expedientes en actualización</p>
    </div>
  )
}

export function ExpedienteDialog({
  estudiante,
  onClose,
}: {
  estudiante: Estudiante | null
  onClose: () => void
}) {
  const e = estudiante
  return (
    <Dialog open={!!e} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92svh] overflow-y-auto border-gold/30 bg-[#0f0e0e] p-0 sm:max-w-3xl">
        {e && (
          <div className="grid md:grid-cols-[16rem_1fr]">
            <Retrato e={e} ancho={700} className="aspect-[3/4] md:aspect-auto md:min-h-full" />
            <div className="p-7 md:p-9">
              <p className="font-display text-[0.6rem] tracking-[0.4em] text-[#c94a4a] uppercase">
                Expediente Confidencial · Fire Space
              </p>
              <DialogTitle className="text-gold-gradient mt-3 font-display text-4xl font-bold">
                {e.nombre}
              </DialogTitle>
              <DialogDescription className="sr-only">Expediente completo de {e.nombre}</DialogDescription>

              <dl className="mt-6 grid grid-cols-2 gap-px border border-gold/20 bg-gold/20 sm:grid-cols-4">
                {[
                  ['Edad', e.edadOn || '—'],
                  ['Inteligencia', e.inteligencia],
                  ['Rango', e.rango],
                ].map(([k, v]) => (
                  <div key={k} className="bg-[#0f0e0e] p-3">
                    <dt className="font-display text-[0.55rem] tracking-[0.3em] text-muted-foreground uppercase">{k}</dt>
                    <dd className="mt-1 font-display text-sm text-foreground">{v}</dd>
                  </div>
                ))}
                <div className="bg-gradient-to-b from-[#3a0505] to-[#1a0303] p-3">
                  <dt className="font-display text-[0.55rem] tracking-[0.3em] text-gold/80 uppercase">
                    Puntos Acumulados
                  </dt>
                  <dd className="mt-1 font-display text-lg font-bold text-gold">{formatoPuntos(e.puntos)}</dd>
                </div>
              </dl>

              <h4 className="mt-8 font-display text-xs tracking-[0.35em] text-gold/80 uppercase">
                Historia / Lore
              </h4>
              <div className="mt-3 text-lg leading-relaxed whitespace-pre-line text-foreground/85">
                {e.descripcion}
              </div>

              {e.documentos.length > 0 && (
                <>
                  <h4 className="mt-8 font-display text-xs tracking-[0.35em] text-gold/80 uppercase">
                    Documentos adjuntos
                  </h4>
                  <ul className="mt-3 space-y-2">
                    {e.documentos.map((d) => (
                      <li key={d.url}>
                        <a
                          href={d.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="flex items-center gap-2 border border-gold/20 px-4 py-3 text-foreground/85 transition-colors hover:border-gold/60 hover:text-gold"
                        >
                          <FileText className="size-4 text-gold" /> {d.titulo || 'Documento'}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

// ─── Muro de Estudiantes Destacados ─────────────────────────────────────────

const FIGURAS = [
  {
    nombre: 'Kim Taehyung',
    cargo: 'Director de Fire Space',
    texto:
      'Por encima de todo se encuentra Taehyung, aquella persona responsable de mantener el orden. El hombre que aparece en fotografías junto a estudiantes premiados.',
  },
  {
    nombre: 'Sangwon',
    cargo: 'Maestro Destacado',
    texto:
      'Cual águila y búho, observando TODO lo que hacen los demás para reportarlo en cualquier momento.',
  },
]

export function Muro({ onAbrir }: { onAbrir: (e: Estudiante) => void }) {
  const pista = useRef<HTMLDivElement>(null)
  const destacados = ESTUDIANTES.filter((e) => e.muroDestacados)
  const mover = (dir: number) =>
    pista.current?.scrollBy({ left: dir * pista.current.clientWidth * 0.8, behavior: 'smooth' })

  return (
    <section id="muro" className="relative py-24">
      <div className="mx-auto max-w-content px-5">
        <SectionHeading kicker="Muro de Honor" title="Estudiantes Destacados">
          Nombres conocidos, opiniones con peso, logros utilizados como ejemplo. Pero como todo, la
          fama tiene un precio.
        </SectionHeading>

        <div className="mb-5 flex justify-end gap-2">
          <Button variant="ghostGold" size="icon" onClick={() => mover(-1)} aria-label="Anterior">
            <ChevronLeft />
          </Button>
          <Button variant="ghostGold" size="icon" onClick={() => mover(1)} aria-label="Siguiente">
            <ChevronRight />
          </Button>
        </div>

        <div
          ref={pista}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-6 [scrollbar-color:#8b0000_transparent] [scrollbar-width:thin]"
        >
          {FIGURAS.map((f) => (
            <article
              key={f.nombre}
              className="fs-frame relative flex w-[19rem] shrink-0 snap-start flex-col overflow-hidden border-gold/40 sm:w-[21rem]"
            >
              <div className="grid aspect-[4/3] place-items-center bg-[radial-gradient(circle_at_50%_35%,#3d0606,#0d0d0d_72%)]">
                <Emblem className="h-24 w-auto opacity-80" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Etiqueta tono="red">Administración</Etiqueta>
                <h3 className="mt-4 font-display text-2xl text-gold">{f.nombre}</h3>
                <p className="font-display text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
                  {f.cargo}
                </p>
                <p className="mt-4 leading-relaxed text-foreground/75 italic">{f.texto}</p>
              </div>
            </article>
          ))}
          {destacados.map((e) => (
            <article
              key={e.id}
              className="group fs-frame relative flex w-[19rem] shrink-0 snap-start flex-col overflow-hidden sm:w-[21rem]"
            >
              <Retrato e={e} ancho={600} className="aspect-[4/3]" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex gap-2">
                  <Etiqueta>{e.inteligencia}</Etiqueta>
                  <Etiqueta tono="red">{e.rango}</Etiqueta>
                </div>
                <h3 className="mt-4 font-display text-2xl text-foreground">{e.nombre}</h3>
                <p className="font-display text-sm text-gold">{formatoPuntos(e.puntos)}</p>
                <p className="mt-3 line-clamp-3 leading-relaxed text-foreground/70">{e.descripcion}</p>
                <Button variant="ghostGold" className="mt-5" onClick={() => onAbrir(e)}>
                  <Eye /> Ver Expediente
                </Button>
              </div>
            </article>
          ))}
          {[0, 1].map((i) => (
            <div
              key={i}
              className="flex w-[19rem] shrink-0 snap-start flex-col items-center justify-center border border-dashed border-gold/15 bg-[#0f0e0e] p-6 text-center sm:w-[21rem]"
            >
              <ShieldAlert className="size-7 text-gold/30" />
              <p className="mt-3 text-foreground/40 italic">Expedientes en actualización</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Directorio General ─────────────────────────────────────────────────────

export function Directorio({ onAbrir }: { onAbrir: (e: Estudiante) => void }) {
  const [intel, setIntel] = useState('todas')
  const [rango, setRango] = useState('todos')
  const [q, setQ] = useState('')

  const lista = useMemo(
    () =>
      ESTUDIANTES.filter(
        (e) =>
          (intel === 'todas' || e.inteligencia === intel) &&
          (rango === 'todos' || e.rango === rango) &&
          e.nombre.toLowerCase().includes(q.trim().toLowerCase()),
      ),
    [intel, rango, q],
  )
  const vacias = Math.max(0, 3 - lista.length)

  const chip = (activo: boolean) =>
    cn(
      'border px-3 py-1.5 font-display text-[0.65rem] tracking-[0.2em] uppercase transition-colors',
      activo
        ? 'border-gold bg-[#8b0000] text-[#f6efe0]'
        : 'border-gold/20 text-foreground/65 hover:border-gold/50 hover:text-foreground',
    )

  return (
    <section id="directorio" className="relative bg-[#0a0909] py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="mx-auto max-w-content px-5">
        <SectionHeading kicker="Base de Datos · Registros Oficiales" title="Directorio de Estudiantes">
          Fichas de todos los alumnos inscritos en Fire Space. Filtra por inteligencia o rango y
          consulta cada expediente.
        </SectionHeading>

        <Reveal className="fs-frame mb-10 space-y-5 p-5 md:p-6">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gold/60" />
            <Input
              value={q}
              onChange={(ev) => setQ(ev.target.value)}
              placeholder="Buscar estudiante por nombre…"
              className="h-11 border-gold/20 bg-black/40 pl-10 text-base"
            />
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-display text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                Inteligencia
              </span>
              <button className={chip(intel === 'todas')} onClick={() => setIntel('todas')}>
                Todas
              </button>
              {INTELIGENCIAS.map((i) => (
                <button key={i.id} className={chip(intel === i.id)} onClick={() => setIntel(i.id)}>
                  {i.id}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-display text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                Rango
              </span>
              <button className={chip(rango === 'todos')} onClick={() => setRango('todos')}>
                Todos
              </button>
              {RANGOS.map((r) => (
                <button key={r.id} className={chip(rango === r.id)} onClick={() => setRango(r.id)}>
                  {r.plural}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mb-6 font-display text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
          {lista.length} {lista.length === 1 ? 'expediente encontrado' : 'expedientes encontrados'} ·{' '}
          {ESTUDIANTES.length} inscritos
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((e) => (
            <TarjetaEstudiante key={e.id} e={e} onAbrir={() => onAbrir(e)} />
          ))}
          {Array.from({ length: vacias }, (_, i) => (
            <TarjetaVacia key={i} i={ESTUDIANTES.length + i + 1} />
          ))}
        </div>
        {lista.length === 0 && (
          <p className="mt-8 text-center text-foreground/50 italic">
            Ningún expediente coincide con los filtros seleccionados.
          </p>
        )}
      </div>
    </section>
  )
}
