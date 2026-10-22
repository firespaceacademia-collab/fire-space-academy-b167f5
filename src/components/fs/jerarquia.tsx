import { useState } from 'react'

import { Cita, Reveal, SectionHeading } from '@/components/fs/primitives'
import { RANGOS } from '@/lib/academia'
import { cn } from '@/lib/utils'

const ANCHOS = ['42%', '54%', '66%', '78%', '90%', '100%']

export function Jerarquia() {
  const [sel, setSel] = useState<string>(RANGOS[0].id)
  const rango = RANGOS.find((r) => r.id === sel) ?? RANGOS[0]

  return (
    <section id="jerarquia" className="fs-grain relative overflow-hidden bg-[#0a0909] py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="relative mx-auto max-w-content px-5">
        <SectionHeading kicker="El Sistema" title="Jerarquía de Rangos">
          Fire Space necesita una manera de medir el éxito, por eso existen los rangos. A simple
          vista el sistema parece sencillo: todos comienzan desde abajo y deben demostrar su valor
          para avanzar, pero el rango no depende únicamente de las calificaciones.
        </SectionHeading>

        <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_1fr]">
          <Reveal className="flex flex-col items-center gap-2.5" as="div">
            {RANGOS.map((r, i) => (
              <button
                key={r.id}
                type="button"
                onClick={() => setSel(r.id)}
                style={{ width: ANCHOS[i] }}
                className={cn(
                  'group relative flex min-w-[15rem] items-center justify-between gap-3 border px-5 py-4 text-left transition-all duration-300',
                  sel === r.id
                    ? 'border-gold bg-gradient-to-r from-[#8b0000] to-[#4a0000] shadow-[0_0_30px_-5px_rgba(139,0,0,0.8)]'
                    : 'border-gold/20 bg-[#141313] hover:border-gold/50 hover:bg-[#1c1414]',
                  r.id === 'Becado' && sel !== r.id && 'border-dashed opacity-80',
                )}
              >
                <span className="font-display text-lg tracking-[0.16em] text-gold uppercase md:text-xl">
                  {r.plural}
                </span>
                <span className="shrink-0 font-display text-[0.6rem] tracking-[0.25em] text-foreground/60 uppercase">
                  {r.grado}
                </span>
              </button>
            ))}
            <p className="mt-3 font-display text-[0.6rem] tracking-[0.35em] text-muted-foreground uppercase">
              Selecciona un rango
            </p>
          </Reveal>

          <Reveal delay={120}>
            <article key={rango.id} className="fs-frame animate-in p-8 duration-500 fade-in slide-in-from-bottom-2">
              <p className="font-display text-xs tracking-[0.4em] text-gold/70 uppercase">
                {rango.grado}
              </p>
              <h3 className="text-gold-gradient mt-3 font-display text-4xl font-bold">
                {rango.plural}
              </h3>
              <p className="mt-6 text-xl leading-relaxed text-foreground">{rango.resumen}</p>
              <p className="mt-4 text-lg leading-relaxed text-foreground/75">{rango.detalle}</p>
              <div className="mt-6 flex gap-1.5">
                {RANGOS.map((r) => (
                  <span
                    key={r.id}
                    className={cn(
                      'h-1 flex-1',
                      r.nivel <= rango.nivel ? 'bg-gold' : 'bg-gold/15',
                    )}
                  />
                ))}
              </div>
            </article>
          </Reveal>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
          <Reveal>
            <Cita>
              La participación, la reputación, los logros, la conducta, la influencia y la presencia
              dentro de la comunidad también pueden determinar hasta dónde puede llegar un
              estudiante.
            </Cita>
          </Reveal>
          <Reveal delay={120} className="fs-paper p-6">
            <p className="font-display text-[0.65rem] tracking-[0.4em] text-[#c94a4a] uppercase">
              Regla no escrita · Ningún reglamento
            </p>
            <p className="mt-4 font-type text-lg leading-relaxed text-foreground/90">
              “Un Becado puede ser utilizado para cosas que un estudiante de rango superior jamás
              aceptaría.”
            </p>
            <p className="mt-4 text-base text-foreground/60">
              Algunos profesores los ignoran, algunos estudiantes los utilizan y ciertos miembros de
              la Élite los consideran completamente reemplazables.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
