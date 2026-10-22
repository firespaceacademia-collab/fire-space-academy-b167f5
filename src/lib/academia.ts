import directorio from '../../data/estudiantes.json'

// ─── Las 4 Inteligencias ────────────────────────────────────────────────────

export const INTELIGENCIAS = [
  {
    id: 'Académica',
    alias: 'Científica / Lógica',
    numeral: 'I',
    descripcion:
      'Relacionada con el conocimiento, las calificaciones, la lógica, la investigación, la memoria y la capacidad para resolver problemas.',
    creencia:
      'Los académicos creen que el conocimiento es la base de todo.',
    reservada: false,
  },
  {
    id: 'Artística',
    alias: 'Expresión Creativa',
    numeral: 'II',
    descripcion:
      'Representada por la música, la danza, la actuación, la escritura, la pintura y cualquier otra forma de expresión creativa.',
    creencia:
      'Los artistas consideran que la capacidad de crear es una forma de inteligencia que ningún examen puede medir.',
    reservada: false,
  },
  {
    id: 'Deportiva',
    alias: 'Corporal / Táctica',
    numeral: 'III',
    descripcion:
      'Relacionada con el rendimiento físico, la resistencia, la disciplina, la coordinación, la estrategia y la capacidad de superar los propios límites.',
    creencia:
      'Los deportistas defienden que la disciplina y la capacidad de levantarse después de una derrota requieren una inteligencia que las aulas jamás podrán enseñar.',
    reservada: false,
  },
  {
    id: 'Personal',
    alias: 'Estratégica / Social',
    numeral: 'IV',
    descripcion:
      'La más completa y peligrosa, quizá la más difícil de medir, pues es aquella relacionada con el liderazgo, la comunicación, la empatía, la persuasión, la negociación y la capacidad de comprender las intenciones de los demás.',
    creencia:
      'Quienes destacan personalmente saben que, en un lugar como Fire Space, comprender a las personas puede ser mucho más útil que cualquier calificación.',
    reservada: true,
  },
] as const

export type Inteligencia = (typeof INTELIGENCIAS)[number]['id']

/** Inteligencias que un postulante puede elegir en la Ficha de Admisión. */
export const INTELIGENCIAS_POSTULANTE = ['Artística', 'Académica', 'Deportiva'] as const

// ─── Jerarquía de Rangos (de mayor a menor) ─────────────────────────────────

export const RANGOS = [
  {
    id: 'Élite',
    plural: 'Élite',
    grado: 'Rango Superior',
    nivel: 6,
    resumen:
      'La cima de Fire Space, el grupo que todos conocen, el grupo que muchos desean integrar.',
    detalle:
      'Los Élite poseen privilegios que los demás estudiantes no tienen. Participan en decisiones, supervisan actividades, colaboran con la administración y tienen influencia sobre el funcionamiento de la academia. Son presentados como el ejemplo perfecto de lo que un estudiante de Fire Space puede llegar a convertirse, pero conocen cosas que los demás no: tienen acceso a lugares restringidos, conocen determinados procedimientos y algunos han descubierto que el verdadero funcionamiento de Fire Space está muy lejos de lo que aparece en los folletos.',
  },
  {
    id: 'Avanzado',
    plural: 'Avanzados',
    grado: 'Grado 10',
    nivel: 5,
    resumen:
      'Aquí se encuentran algunos de los estudiantes más reconocidos. Son referentes: sus nombres son conocidos y sus opiniones tienen peso.',
    detalle:
      'Sus logros son utilizados como ejemplos, pero como todo, la fama tiene un precio y cuanto más alto llega un estudiante, más personas quieren verlo caer, pues cada error puede costarle mucho más que a los demás.',
  },
  {
    id: 'Destacado',
    plural: 'Destacados',
    grado: 'Grado 6',
    nivel: 4,
    resumen:
      'Aquellos que ya han demostrado que no llegaron a Fire Space por casualidad.',
    detalle:
      'Poseen experiencia, reconocimiento y una presencia más fuerte dentro de la academia. Comienzan a formar alianzas, aparecen en actividades importantes, son constantemente observados por los rangos superiores y empiezan a descubrir que subir resulta mucho más sencillo que mantenerse arriba.',
  },
  {
    id: 'Aspirante',
    plural: 'Aspirantes',
    grado: 'Grado 3',
    nivel: 3,
    resumen:
      'Los recién llegados: estudiantes que todavía no han construido una reputación.',
    detalle:
      'Deben demostrar qué pueden aportar, pues para ellos cada actividad representa una oportunidad para destacar, para ser reconocidos, para comenzar a ascender. Pero también una oportunidad para convertirse en objetivo, porque cuanto antes alguien demuestra sus capacidades, antes comienza a llamar la atención.',
  },
  {
    id: 'Candidato',
    plural: 'Candidatos',
    grado: 'Grado 2',
    nivel: 2,
    resumen:
      'Ubicados por debajo de los Aspirantes y por encima de los Becados.',
    detalle:
      'Rango Grado 2 de la jerarquía de Fire Space, situado estratégicamente entre los Aspirantes y los Becados.',
  },
  {
    id: 'Becado',
    plural: 'Becados',
    grado: 'Scholars',
    nivel: 1,
    resumen:
      'El último lugar, aquel del que casi nadie quiere hablar.',
    detalle:
      'Oficialmente, son estudiantes que han perdido suficientes puntos, prestigio o privilegios como para descender por debajo de los rangos establecidos. La academia insiste en que se trata de una etapa temporal, un castigo, una oportunidad para comenzar de nuevo. Reciben alojamiento, alimentación y una pequeña remuneración: lo suficiente para no abandonar y para sobrevivir, pero no lo suficiente para vivir realmente.',
  },
] as const

export type Rango = (typeof RANGOS)[number]['id']

// ─── Directorio (data/estudiantes.json) ─────────────────────────────────────

export type Documento = { titulo: string; url: string }

export type Estudiante = {
  id: string
  nombre: string
  edadOn: string
  inteligencia: string
  rango: string
  puntos: number
  muroDestacados: boolean
  imagen: string
  descripcion: string
  documentos: Documento[]
}

/** Quita acentos, espacios sobrantes y mayúsculas para comparar textos. */
export function normalizar(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()
}

function coincide<T extends { id: string }>(lista: readonly T[], valor: string) {
  const v = normalizar(valor)
  return lista.find(
    (item) => normalizar(item.id) === v || normalizar((item as { plural?: string }).plural ?? '') === v,
  )
}

export function buscarRango(valor: string) {
  return coincide(RANGOS, valor)
}

export function buscarInteligencia(valor: string) {
  return coincide(INTELIGENCIAS, valor)
}

// Lee la lista "estudiantes" del archivo JSON. La edad Off nunca se expone a la página.
export const ESTUDIANTES: Estudiante[] = (
  directorio.estudiantes as Array<Record<string, unknown>>
).map((e, i) => ({
  id: String(e.id ?? `estudiante-${i}`),
  nombre: String(e.nombre ?? 'Sin nombre'),
  edadOn: String(e.edadOn ?? ''),
  inteligencia: buscarInteligencia(String(e.inteligencia ?? ''))?.id ?? String(e.inteligencia ?? ''),
  rango: buscarRango(String(e.rango ?? ''))?.id ?? String(e.rango ?? ''),
  puntos: Number(e.puntos ?? 0) || 0,
  muroDestacados: Boolean(e.muroDestacados),
  imagen: String(e.imagen ?? ''),
  descripcion: String(e.descripcion ?? ''),
  documentos: Array.isArray(e.documentos)
    ? (e.documentos as Documento[]).filter((d) => d && d.url && !d.url.includes('enlace-a-tu-documento'))
    : [],
}))

export function formatoPuntos(puntos: number) {
  return `${String(puntos).padStart(2, '0')} pts`
}

/** Las fotos locales pasan por el Image CDN; los enlaces externos se usan tal cual. */
export function urlImagen(src: string, ancho: number) {
  if (!src) return ''
  if (/^https?:\/\//.test(src)) return src
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${ancho}&fm=webp`
}

export function img(file: string, ancho: number) {
  return `/.netlify/images?url=/img/${file}&w=${ancho}&fm=webp&q=75`
}
