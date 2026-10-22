import { Camera, DoorClosed, FlaskConical, KeyRound, ScanEye, ShieldOff } from 'lucide-react'

import { Cita, Reveal, SectionHeading } from '@/components/fs/primitives'
import { img } from '@/lib/academia'

const ZONAS = [
  { icon: DoorClosed, titulo: 'Puertas', texto: 'Puertas que siempre permanecen cerradas.' },
  { icon: KeyRound, titulo: 'Ascensores', texto: 'Ascensores que requieren una autorización especial.' },
  { icon: Camera, titulo: 'Pasillos', texto: 'Pasillos donde las cámaras son diferentes.' },
  { icon: ShieldOff, titulo: 'Habitaciones', texto: 'Habitaciones sin nombre.' },
  { icon: FlaskConical, titulo: 'Laboratorios', texto: 'Laboratorios que oficialmente no existen.' },
  {
    icon: ScanEye,
    titulo: 'Salas',
    texto:
      'Salas en las que algunos miembros de la Élite realizan actividades que jamás deberían formar parte de una academia.',
  },
]

const ACTIVIDADES = [
  'Experimentos',
  'Pruebas',
  'Simulaciones',
  'Métodos de castigo',
  'Evaluaciones psicológicas',
  'Pruebas de resistencia',
  'Estudios sobre comportamiento',
]

export function ZonasRestringidas() {
  return (
    <section id="zonas" className="relative overflow-hidden py-24">
      <div className="absolute inset-0">
        <img
          src={img('corridor.png', 1920)}
          srcSet={`${img('corridor.png', 960)} 960w, ${img('corridor.png', 1920)} 1920w`}
          sizes="100vw"
          alt=""
          loading="lazy"
          className="size-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0d0d] via-[#0d0d0d]/80 to-[#0d0d0d]" />
      </div>

      <div className="relative mx-auto max-w-content px-5">
        <SectionHeading kicker="Acceso Restringido" title="Zonas Restringidas & Demostraciones">
          Hay lugares dentro de Fire Space que no aparecen en los recorridos para nuevos
          estudiantes.
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ZONAS.map((z, i) => (
            <Reveal
              key={z.titulo}
              delay={i * 80}
              className="group flex gap-4 border border-gold/15 bg-black/60 p-5 backdrop-blur-sm transition-colors hover:border-[#8b0000]"
            >
              <z.icon className="size-6 shrink-0 text-[#c94a4a] transition-colors group-hover:text-gold" />
              <div>
                <h3 className="font-display text-sm tracking-[0.25em] text-gold uppercase">{z.titulo}</h3>
                <p className="mt-2 leading-relaxed text-foreground/75">{z.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 flex flex-wrap justify-center gap-2">
          {ACTIVIDADES.map((a) => (
            <span
              key={a}
              className="border border-[#8b0000]/60 bg-[#8b0000]/15 px-3 py-1.5 font-type text-sm text-[#e9b8b8]"
            >
              {a}
            </span>
          ))}
        </Reveal>
        <p className="mt-4 text-center text-foreground/60 italic">
          …y nadie sabe exactamente cuál es el propósito final.
        </p>

        <div className="mt-20 grid gap-10 lg:grid-cols-2">
          <Reveal className="space-y-6">
            <h3 className="font-display text-3xl text-gold">Las Demostraciones</h3>
            <p className="text-lg leading-relaxed text-foreground/80">
              Al principio son simples rumores. Un estudiante de rango superior comenta que los
              Becados reciben <em className="text-gold">“entrenamientos especiales”</em>. Otro
              asegura haber visto a uno entrar a una habitación del edificio administrativo de la
              que nunca había escuchado hablar.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              Alguien dice que existen castigos internos, otro habla de pruebas psicológicas y
              después aparecen historias sobre <em className="text-gold">demostraciones</em>:
              actividades en las que un Becado debe soportar situaciones diseñadas para demostrar
              algo ante los estudiantes de rangos superiores. Disciplina, resistencia, obediencia y
              control.
            </p>
            <Cita>
              Los nombres cambian dependiendo de quién lo cuente, ya sea por evaluaciones
              especiales, programas experimentales, pruebas de conducta.
            </Cita>
          </Reveal>
          <Reveal delay={120} className="space-y-6">
            <h3 className="font-display text-3xl text-gold">Lo que hay detrás de las puertas</h3>
            <p className="text-lg leading-relaxed text-foreground/80">
              La academia siempre tiene una explicación y nadie puede demostrar lo contrario,{' '}
              <em>hasta que un Becado desaparece, después otro y luego otro.</em>
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              Cuando alguien pregunta, la respuesta oficial es sencilla:{' '}
              <span className="text-gold">
                “ellos abandonaron el lugar”, “fueron expulsados”, “decidieron marcharse”
              </span>
              , pero existe un problema, pues algunos de esos estudiantes nunca regresan a sus
              hogares. Sus pertenencias permanecen en Fire Space, sus habitaciones siguen ocupadas
              en los registros y sus nombres desaparecen lentamente de los archivos públicos como si
              nunca hubieran estado allí.
            </p>
            <p className="text-lg leading-relaxed text-foreground/80">
              Quizá ni siquiera todos los Élite lo saben. Algunos creen que se trata de un programa
              destinado a estudiar los límites humanos, otros creen que la academia intenta
              descubrir cuál de los cuatro tipos de inteligencia produce individuos más capaces, y
              existe una teoría mucho más perturbadora en la que Fire Space no está intentando
              educar a sus estudiantes, sino que <em className="text-gold">está intentando seleccionarlos.</em>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
