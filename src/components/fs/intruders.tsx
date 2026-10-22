import { Eye, FileWarning, Paperclip } from 'lucide-react'

import { Reveal } from '@/components/fs/primitives'
import { img } from '@/lib/academia'

const RUMORES = [
  'Los Becados reciben “entrenamientos especiales”.',
  'Alguien vio a un Becado entrar a una habitación del edificio administrativo de la que nunca se había escuchado hablar.',
  'Existen castigos internos.',
  'Se habla de pruebas psicológicas.',
  'Las habitaciones de los Becados desaparecidos siguen ocupadas en los registros.',
]

type Archivo = {
  sello: string
  titulo: string
  parrafos: React.ReactNode[]
}

const ARCHIVOS: Archivo[] = [
  {
    sello: 'Documento recuperado',
    titulo: 'Evaluaciones Especiales',
    parrafos: [
      'Los nombres cambian dependiendo de quién lo cuente, ya sea por evaluaciones especiales, programas experimentales, pruebas de conducta.',
      'Encontrar a los más útiles, los más obedientes, los más inteligentes, los más resistentes, los que puedan convertirse en parte de algo mucho más grande.',
      <>
        <strong className="text-[#e57373]">Los Becados son los sujetos perfectos,</strong> pues
        nadie los busca, nadie escucha sus quejas y si alguno desaparece… siempre existe una
        explicación.
      </>,
    ],
  },
  {
    sello: 'Archivo confidencial · La Élite',
    titulo: 'No todos los Élite son monstruos',
    parrafos: [
      'Y ese es precisamente el problema, pues algunos no saben nada, otros sospechan e incluso algunos participan porque creen que forman parte de un programa legítimo; otros saben exactamente lo que ocurre y han decidido guardar silencio o reciben dinero a cambio de colaborar.',
      'Dinero suficiente para mantener su posición, para mejorar sus condiciones, para comprar favores.',
      'La academia aprendió algo hace mucho tiempo: es más fácil conseguir obediencia cuando la recompensa es suficientemente grande. Y aquellos que aceptan participar reciben privilegios. Mientras tanto, los Becados reciben apenas lo necesario para continuar respirando.',
    ],
  },
  {
    sello: 'Expediente · Dirección',
    titulo: 'Kim Taehyung lo sabe todo',
    parrafos: [
      'El director que recibe reconocimientos, el rostro que las familias asocian con el éxito de la academia. Kim Taehyung sabe absolutamente todo lo que ocurre dentro de Fire Space, o al menos eso dicen, pues conoce los rangos, conoce las rivalidades, conoce las desapariciones, conoce las habitaciones restringidas, conoce los experimentos, conoce los nombres de quienes participan y conoce el precio que se paga para mantener todo en silencio.',
      'Pero Taehyung no actúa como alguien que intenta destruir la academia, él actúa como alguien que está intentando protegerla porque para él, Fire Space debe permanecer intacta.',
      'No importa lo que tenga que hacer: cuando alguien amenaza con revelar información, Taehyung interviene; cuando aparece un rumor peligroso, desaparece; cuando una familia empieza a hacer preguntas, recibe una compensación; cuando un estudiante intenta hablar con la prensa, alguien se encarga de convencerlo de que no lo haga y, sobre todo, cuando alguien intenta manchar públicamente el nombre de Fire Space… simplemente deja de tener importancia dentro de la academia.',
      <>
        Taehyung incluso{' '}
        <em className="text-[#e57373]">paga a determinadas personas para hablar bien de la institución.</em>{' '}
        Todo debe parecer perfecto porque la reputación de Fire Space no es una consecuencia de su
        excelencia, es una construcción, y Taehyung lleva años asegurándose de que nadie vea lo que
        existe debajo.
      </>,
    ],
  },
  {
    sello: 'Clasificado · El secreto de Taehyung',
    titulo: '¿Por qué no lo ha detenido?',
    parrafos: [
      'Taehyung conoce al Periódico Escolar. No simplemente conoce su existencia: conoce a quienes están detrás, él sabe quién administra la página, sabe cómo obtienen la información, sabe qué documentos poseen y, sobre todo… sabe qué están buscando.',
      'Porque existe un secreto que incluso Taehyung ha intentado mantener oculto, algo que conecta a la Élite, los Becados, los experimentos, las desapariciones y a la propia creación de Fire Space.',
      'Pero si Taehyung sabe quién está detrás del Periódico Escolar… ¿por qué no lo ha detenido?',
      <>
        Esa es la pregunta que nadie consigue responder, pues algunos creen que no puede, otros
        creen que tiene miedo y unos pocos sospechan algo todavía peor:{' '}
        <em className="text-[#e57373]">
          que quizá el Periódico Escolar existe porque Taehyung necesita que exista.
        </em>
      </>,
    ],
  },
  {
    sello: 'Informe interno · Identidad desconocida',
    titulo: '¿Quiénes son los Intrusos?',
    parrafos: [
      'Nadie sabe si se trata de una sola persona, quizá sea un estudiante, quizá un profesor, quizá un antiguo Becado, quizá alguien de la Élite o quizá incluso alguien que jamás debería haber podido entrar en Fire Space.',
      <>
        El Intruso conoce los secretos de todos y no tiene miedo de utilizarlos, pero cuanto más
        publica, más evidente se vuelve algo:{' '}
        <em className="text-[#e57373]">
          el Periódico Escolar no está descubriendo los secretos, sino que alguien se los está
          entregando.
        </em>
      </>,
    ],
  },
  {
    sello: 'Nota · La Reputación',
    titulo: 'Cualquiera puede ser la próxima publicación',
    parrafos: [
      'Dentro de Fire Space, una reputación puede tardar años en construirse pero puede desaparecer en un solo día. Por eso el Periódico Escolar se convierte en el peor enemigo de cualquier estudiante: una publicación puede iniciar una discusión, una fotografía puede destruir una relación, un rumor puede provocar una rivalidad, una acusación puede provocar una degradación y una verdad puede destruir una vida entera.',
      'Los estudiantes comienzan a vigilarse entre ellos, los grupos de inteligencia se vuelven todavía más hostiles, los Académicos intentan descubrir quién administra el Periódico Escolar, los Artistas comienzan a utilizar la información como arma, los Deportistas forman alianzas, los estudiantes con inteligencia Personal manipulan rumores y relaciones.',
      'Cada grupo intenta proteger sus secretos y cada uno empieza a sospechar del resto. La academia se convierte lentamente en un juego de vigilancia porque cualquiera puede ser la próxima publicación.',
    ],
  },
]

export function Intruders() {
  return (
    <section id="intruders" className="relative bg-[#080707] py-24">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#8b0000] to-transparent" />
      <div className="mx-auto max-w-content px-5">
        {/* Cabecera del periódico */}
        <Reveal className="border-y-4 border-double border-[#ece3d0]/30 py-6 text-center">
          <div className="flex items-center justify-between font-type text-[0.7rem] tracking-[0.2em] text-[#ece3d0]/50 uppercase">
            <span>Edición nocturna</span>
            <span className="hidden sm:inline">Periódico Escolar Clandestino</span>
            <span>No autorizado</span>
          </div>
          <h2 className="mt-4 font-display text-5xl font-black tracking-[0.12em] text-[#ece3d0] sm:text-7xl md:text-8xl">
            THE INTRUDERS
          </h2>
          <p className="mt-2 font-type text-lg tracking-[0.3em] text-[#c94a4a]">“Los Intrusos”</p>
        </Reveal>

        {/* Portada */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <Reveal as="article" className="fs-paper flex flex-col p-6 md:p-8">
            <p className="font-type text-xs tracking-[0.3em] text-[#c94a4a] uppercase">Portada</p>
            <h3 className="mt-3 font-display text-3xl leading-tight text-[#ece3d0] md:text-5xl">
              “¿De verdad creen que abandonó la academia?”
            </h3>
            <figure className="mt-6 overflow-hidden border border-[#ece3d0]/10">
              <img
                src={img('intruders.png', 1200)}
                srcSet={`${img('intruders.png', 700)} 700w, ${img('intruders.png', 1200)} 1200w`}
                sizes="(min-width: 1024px) 60vw, 100vw"
                alt="Documentos filtrados y fotografías sobre un escritorio"
                loading="lazy"
                className="aspect-[16/9] w-full object-cover grayscale-[35%] sepia-[20%]"
              />
              <figcaption className="border-t border-[#ece3d0]/10 px-4 py-2 font-type text-xs text-[#ece3d0]/50">
                Una publicación, una fotografía, un nombre y una frase. Algo que fue suficiente.
              </figcaption>
            </figure>
            <div className="mt-6 gap-8 space-y-4 font-type text-[1.02rem] leading-relaxed text-[#ece3d0]/80 md:columns-2 md:space-y-0 [&>p]:mb-4 [&>p]:break-inside-avoid">
              <p>
                Al principio nadie le dio importancia, pues era una cuenta, un supuesto medio de
                noticias estudiantiles que comenzó publicando cosas insignificantes: un romance,
                una discusión, una fotografía, una fiesta, etc. Nada que Fire Space no pudiera
                controlar.
              </p>
              <p>
                Desde entonces, el Periódico Escolar comenzó a publicar información que nadie
                debería tener: documentos, fotografías, conversaciones demasiado privadas,
                horarios, nombres y ubicaciones.
              </p>
              <p>
                Primero expuso a estudiantes, después a profesores, luego a miembros de la Élite y
                finalmente comenzó a hablar de Fire Space, de lo que ocurría detrás de las puertas,
                de los Becados, de los pagos, de las desapariciones, de aquellas habitaciones
                restringidas, de los experimentos.
              </p>
              <p>
                Y cada vez que la academia negaba una publicación… el Periódico Escolar aparecía con
                una nueva prueba.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal as="article" delay={100} className="fs-paper p-6">
              <p className="flex items-center gap-2 font-type text-xs tracking-[0.3em] text-[#c94a4a] uppercase">
                <Eye className="size-4" /> Chismes de pasillo
              </p>
              <ul className="mt-5 space-y-4">
                {RUMORES.map((r) => (
                  <li
                    key={r}
                    className="border-b border-dashed border-[#ece3d0]/10 pb-4 font-type leading-relaxed text-[#ece3d0]/80 last:border-0 last:pb-0"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal as="article" delay={180} className="fs-paper p-6">
              <p className="font-type text-xs tracking-[0.3em] text-[#c94a4a] uppercase">
                Los que vigilan
              </p>
              <p className="mt-4 font-type leading-relaxed text-[#ece3d0]/80">
                Aquellos que son cual águila y búho observando TODO lo que hacen los demás para
                reportarlo en cualquier momento:
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {['SANGWON', 'TAEHYUNG'].map((n) => (
                  <span
                    key={n}
                    className="border border-[#8b0000] bg-[#8b0000]/20 py-3 text-center font-display tracking-[0.3em] text-[#ece3d0]"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal as="article" delay={240} className="fs-paper p-6">
              <p className="font-type text-xs tracking-[0.3em] text-[#c94a4a] uppercase">
                ¿Qué quiere el Intruso?
              </p>
              <p className="mt-4 font-type leading-relaxed text-[#ece3d0]/80">
                No parece querer dinero, no busca reconocimiento, no quiere convertirse en Élite, no
                pide nada… simplemente observa y publica, como si su objetivo no fuera destruir a
                una persona concreta, como si estuviera intentando destruir la mentira completa.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Archivos filtrados: cuadrícula de filas con altura igual, sin solapamientos */}
        <Reveal className="mt-20 mb-8 flex items-center gap-4">
          <FileWarning className="size-6 text-[#c94a4a]" />
          <h3 className="font-display text-2xl tracking-[0.2em] text-[#ece3d0] uppercase md:text-3xl">
            Archivos Filtrados
          </h3>
          <span className="h-px flex-1 bg-[#ece3d0]/15" />
        </Reveal>

        <div className="grid auto-rows-auto items-stretch gap-6 md:grid-cols-2">
          {ARCHIVOS.map((a, i) => (
            <Reveal key={a.titulo} delay={(i % 2) * 100} className="h-full">
              <article className="fs-paper relative flex h-full flex-col p-6 md:p-8">
                <Paperclip className="absolute -top-3 right-6 size-6 rotate-12 text-gold/60" />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="-rotate-2 border-2 border-[#b3261e] px-2 py-0.5 font-type text-[0.7rem] tracking-[0.25em] text-[#e57373] uppercase">
                    {a.sello}
                  </span>
                  <span className="fs-redacted text-xs">██████████</span>
                </div>
                <h4 className="mt-5 font-display text-2xl leading-snug text-[#ece3d0]">{a.titulo}</h4>
                <div className="mt-4 space-y-4 font-type leading-relaxed text-[#ece3d0]/75">
                  {a.parrafos.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mx-auto mt-16 max-w-3xl border-y border-[#8b0000]/60 py-8 text-center">
          <p className="font-type text-xl leading-relaxed text-[#ece3d0]/90 md:text-2xl">
            Pero existe algo que nadie puede controlar: la verdad y el Periódico Escolar está
            decidido a encontrarla.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
