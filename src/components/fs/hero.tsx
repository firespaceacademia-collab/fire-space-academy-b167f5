import { ChevronDown } from 'lucide-react'

import { Emblem, Reveal } from '@/components/fs/primitives'
import { Button } from '@/components/ui/button'
import { img } from '@/lib/academia'

const BRASAS = Array.from({ length: 18 }, (_, i) => ({
  left: `${(i * 53) % 100}%`,
  delay: `${(i * 1.7) % 12}s`,
  duration: `${10 + ((i * 3) % 9)}s`,
}))

function Comunicado({
  sello,
  firma,
  cargo,
  children,
  delay,
}: {
  sello: string
  firma: string
  cargo: string
  children: React.ReactNode
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="fs-frame p-7 md:p-9">
      <p className="font-display text-[0.65rem] tracking-[0.4em] text-gold/80 uppercase">{sello}</p>
      <div className="mt-5 space-y-4 text-lg leading-relaxed text-foreground/85 md:text-xl">
        {children}
      </div>
      <div className="mt-7 flex items-end justify-between gap-4 border-t border-gold/15 pt-5">
        <div>
          <p className="font-display text-2xl text-gold italic">{firma}</p>
          <p className="mt-1 font-display text-[0.65rem] tracking-[0.35em] text-muted-foreground uppercase">
            {cargo}
          </p>
        </div>
        <Emblem className="h-12 w-11 opacity-70" />
      </div>
    </Reveal>
  )
}

export function Hero() {
  return (
    <section id="inicio" className="relative">
      <div className="fs-grain relative flex min-h-[100svh] items-center justify-center overflow-hidden">
        <img
          src={img('hero.png', 1920)}
          srcSet={`${img('hero.png', 960)} 960w, ${img('hero.png', 1600)} 1600w, ${img('hero.png', 2400)} 2400w`}
          sizes="100vw"
          alt=""
          className="fs-drift absolute inset-0 size-full object-cover opacity-60"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-[#0d0d0d]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85))]" />
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          {BRASAS.map((b, i) => (
            <span
              key={i}
              className="fs-ember"
              style={{ left: b.left, animationDelay: b.delay, animationDuration: b.duration }}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-16 text-center">
          <Emblem className="fs-flicker mx-auto h-24 w-22 drop-shadow-[0_0_30px_rgba(139,0,0,0.9)] md:h-28 md:w-26" />
          <p className="mt-6 font-display text-xs tracking-[0.6em] text-gold/80 uppercase">
            Academia Privada · Est. [ 𝕱𝖘. ]
          </p>
          <h1 className="text-gold-gradient mt-5 font-display text-5xl leading-[0.95] font-black tracking-[0.06em] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] sm:text-7xl md:text-8xl">
            FIRE SPACE
            <span className="mt-2 block text-3xl tracking-[0.5em] sm:text-4xl md:text-5xl">
              ACADEMY
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-2xl text-foreground/90 italic md:text-3xl">
            Donde la excelencia exige el máximo sacrificio.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="gold" size="lg" className="h-12 px-8">
              <a href="#admisiones">Solicitar Admisión</a>
            </Button>
            <Button asChild variant="ghostGold" size="lg" className="h-12 px-8">
              <a href="#lore">Conocer la Academia</a>
            </Button>
          </div>
        </div>

        <a
          href="#bienvenida"
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 animate-bounce text-gold/70"
          aria-label="Bajar"
        >
          <ChevronDown className="size-7" />
        </a>
      </div>

      <div id="bienvenida" className="relative mx-auto max-w-4xl space-y-8 px-5 py-24">
        <Comunicado
          sello="Comunicado oficial · Dirección General"
          firma="Kim Taehyung"
          cargo="Director de Fire Space Academy"
        >
          <p>
            Dicen que existe un lugar donde los mejores estudiantes de la ciudad terminan
            reuniéndose. Ese lugar es <span className="text-gold">Fire Space</span>.
          </p>
          <p>
            Algunos llegan gracias a sus calificaciones, otros por sus habilidades artísticas,
            otros por su rendimiento deportivo. Y pocos, simplemente, porque poseen algo que
            resulta imposible de enseñar.
          </p>
          <p>
            Aquí no basta con entrar: hay que demostrar que mereces permanecer. Y una vez dentro
            descubrirás que no todos ocupan el mismo lugar.
          </p>
          <p className="text-foreground">
            Fire Space debe permanecer intacta. Construye tu reputación, porque dentro de estas
            paredes puede tardar años en construirse… y desaparecer en un solo día.
          </p>
        </Comunicado>

        <Comunicado
          sello="Mensaje institucional · Cuerpo Docente"
          firma="Sangwon"
          cargo="Maestro Destacado"
          delay={120}
        >
          <p>
            Desde el primer día aprenderás una de las reglas fundamentales de Fire Space: no
            existe una única forma de ser inteligente.
          </p>
          <p>
            Cada actividad representa una oportunidad para destacar, para ser reconocido, para
            comenzar a ascender. Pero recuerda que cuanto antes demuestres tus capacidades, antes
            comenzarás a llamar la atención.
          </p>
          <p className="text-foreground">
            En Fire Space todo se observa. Todo se registra. Compórtate a la altura de la
            institución.
          </p>
        </Comunicado>
      </div>
    </section>
  )
}
