import { BookOpen, Crown, Feather, Lock, Swords } from 'lucide-react'

import { Cita, Ornamento, Reveal, SectionHeading } from '@/components/fs/primitives'
import { INTELIGENCIAS } from '@/lib/academia'
import { cn } from '@/lib/utils'

const ICONOS = { Académica: BookOpen, Artística: Feather, Deportiva: Swords, Personal: Crown }

export function Lore() {
  return (
    <section id="lore" className="relative py-24">
      <div className="mx-auto max-w-content px-5">
        <SectionHeading kicker="Historia & Lore" title="La Institución Perfecta">
          Una academia privada considerada durante años como una de las instituciones educativas
          más prestigiosas de la ciudad.
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="space-y-6 text-lg leading-relaxed text-foreground/85 md:text-xl">
            <p>
              Sus instalaciones son impecables, sus profesores son cuidadosamente seleccionados y
              sus estudiantes, al menos de acuerdo con la gente que la academia presenta al
              exterior, son los más prometedores y ejemplares de su generación.
            </p>
            <p>
              Las fotografías de <span className="text-gold">Fire Space</span> muestran pasillos
              impecables, ceremonias, competencias, presentaciones y estudiantes sonrientes.
            </p>
            <p>
              Los periódicos hablan de sus éxitos, las familias sueñan con conseguir una plaza, las
              empresas buscan relacionarse con sus alumnos, y los antiguos estudiantes presumen de
              haber formado parte de ella.
            </p>
          </Reveal>
          <Reveal delay={150} className="flex flex-col justify-center gap-6">
            <Cita>
              Fire Space es, aparentemente, una institución perfecta, sin embargo hay algo que
              nadie menciona cuando habla de ella.
            </Cita>
            <Cita>
              En la Academia no basta con entrar, hay que demostrar que mereces permanecer y, una
              vez dentro descubrirás que no todos ocupan el mismo lugar.
            </Cita>
          </Reveal>
        </div>

        <Ornamento className="my-24" />

        <SectionHeading kicker="Las 4 Inteligencias" title="No existe una única forma de ser inteligente">
          Desde el primer día, cada estudiante aprende una de las reglas fundamentales de Fire
          Space. Dentro de la academia se reconocen cuatro tipos principales de inteligencia.
        </SectionHeading>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {INTELIGENCIAS.map((intel, i) => {
            const Icono = ICONOS[intel.id]
            return (
              <Reveal
                key={intel.id}
                delay={i * 100}
                as="article"
                className={cn(
                  'group fs-frame flex flex-col p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50',
                  intel.reservada && 'border-[#8b0000]/60 bg-gradient-to-b from-[#2a0606] to-[#0d0d0d]',
                )}
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-full border border-gold/40 bg-black/50 text-gold transition-colors duration-500 group-hover:bg-[#8b0000]/40">
                    <Icono className="size-6" />
                  </span>
                  <span className="font-display text-4xl text-gold/15">{intel.numeral}</span>
                </div>
                <h3 className="mt-6 font-display text-2xl tracking-[0.1em] text-gold">
                  {intel.id}
                </h3>
                <p className="mt-1 font-display text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
                  {intel.alias}
                </p>
                <p className="mt-5 leading-relaxed text-foreground/80">{intel.descripcion}</p>
                <p className="mt-auto pt-5 text-base text-foreground/60 italic">“{intel.creencia}”</p>
                {intel.reservada && (
                  <p className="mt-5 flex items-start gap-2 border border-[#8b0000]/70 bg-[#8b0000]/20 px-3 py-2.5 text-sm leading-snug text-[#f1c9c9]">
                    <Lock className="mt-0.5 size-4 shrink-0 text-gold" />
                    <span>
                      Reservada únicamente para los estudiantes que alcanzan el{' '}
                      <strong className="text-gold">Rango 4</strong>.
                    </span>
                  </p>
                )}
              </Reveal>
            )
          })}
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
          <Reveal className="space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              Oficialmente, Fire Space asegura que las cuatro poseen el mismo valor, que ninguna
              inteligencia es superior a otra y que cada estudiante tiene la posibilidad de
              encontrar su propio camino, pero los estudiantes no parecen estar de acuerdo.
            </p>
            <p>
              Con el paso del tiempo, estas cuatro categorías han dejado de ser simples áreas de
              desarrollo para convertirse en <em className="text-gold">verdaderos grupos</em>.
            </p>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-foreground/80">
            <p>
              La rivalidad comenzó como una simple competencia, luego se convirtió en orgullo y
              finalmente en <em className="text-gold">una guerra silenciosa</em> donde cada grupo
              quiere demostrar que su inteligencia es la más importante, y cada estudiante quiere
              demostrar que pertenece al grupo correcto.
            </p>
          </Reveal>
        </div>
        <Reveal className="mx-auto mt-10 max-w-4xl">
          <Cita>
            Una competencia deportiva puede aumentar una reputación, una presentación artística
            puede cambiar la percepción de toda la academia, una calificación perfecta puede
            convertir a alguien en referente, una negociación exitosa puede demostrar que la
            inteligencia personal puede superar incluso a quienes poseen los mejores expedientes.
            Y así, poco a poco, la academia convirtió la inteligencia en una competición, pues no
            basta con ser bueno: <span className="text-gold not-italic">hay que ser mejor que alguien.</span>
          </Cita>
        </Reveal>
      </div>
    </section>
  )
}
