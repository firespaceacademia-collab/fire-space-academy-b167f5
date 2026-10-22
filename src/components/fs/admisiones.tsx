import { useEffect, useRef, useState } from 'react'
import {
  Check,
  CheckCircle2,
  Copy,
  Download,
  Eye,
  KeyRound,
  Loader2,
  MoreHorizontal,
  ShieldCheck,
  Trash2,
  XCircle,
} from 'lucide-react'
import { toast } from 'sonner'

import { Emblem, Reveal, SectionHeading } from '@/components/fs/primitives'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ESTUDIANTES, INTELIGENCIAS_POSTULANTE, normalizar } from '@/lib/academia'
import {
  cambiarEstado,
  eliminarSolicitud,
  enviarSolicitud,
  exportarSolicitudes,
  listarSolicitudes,
  verSolicitud,
  verificarNombre,
  type EstadoSolicitud,
  type SolicitudDetalle,
  type SolicitudPublica,
} from '@/lib/solicitudes.functions'
import { cn } from '@/lib/utils'

const OCUPADO = 'Este personaje ya está ocupado/solicitado'

const ESTADOS: Record<EstadoSolicitud, { label: string; clase: string; Icono: typeof Check }> = {
  evaluacion: {
    label: 'Ficha en proceso de evaluación',
    clase: 'border-gold/40 bg-gold/10 text-gold',
    Icono: Loader2,
  },
  aceptada: {
    label: 'Ficha Aceptada',
    clase: 'border-[#2e7d32] bg-[#2e7d32]/20 text-[#8fd694]',
    Icono: CheckCircle2,
  },
  rechazada: {
    label: 'Ficha Rechazada',
    clase: 'border-[#b3261e] bg-[#8b0000]/25 text-[#f1a7a7]',
    Icono: XCircle,
  },
}

const campo =
  'h-11 border-gold/20 bg-black/40 text-base focus-visible:border-gold/60 focus-visible:ring-gold/20'
const etiqueta = 'font-display text-[0.7rem] tracking-[0.25em] text-gold/90 uppercase'

// ─── Ficha de Admisión ──────────────────────────────────────────────────────

type EstadoNombre = 'vacio' | 'verificando' | 'disponible' | 'ocupado'

function FichaAdmision({
  solicitudes,
  onEnviada,
}: {
  solicitudes: SolicitudPublica[]
  onEnviada: (s: SolicitudPublica, codigo: string) => void
}) {
  const [nombre, setNombre] = useState('')
  const [edadOn, setEdadOn] = useState('')
  const [edadOff, setEdadOff] = useState('')
  const [inteligencia, setInteligencia] = useState('')
  const [talentos, setTalentos] = useState('')
  const [estadoNombre, setEstadoNombre] = useState<EstadoNombre>('vacio')
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')
  const consulta = useRef(0)

  // Filtro de disponibilidad: primero contra lo que ya conoce la página, luego contra el servidor.
  useEffect(() => {
    const n = normalizar(nombre)
    if (n.length < 2) return setEstadoNombre('vacio')
    const local =
      ESTUDIANTES.some((e) => normalizar(e.nombre) === n) ||
      solicitudes.some((s) => normalizar(s.nombre) === n)
    if (local) return setEstadoNombre('ocupado')
    setEstadoNombre('verificando')
    const id = ++consulta.current
    const t = setTimeout(async () => {
      try {
        const r = await verificarNombre({ data: { nombre } })
        if (id === consulta.current) setEstadoNombre(r.disponible ? 'disponible' : 'ocupado')
      } catch {
        if (id === consulta.current) setEstadoNombre('vacio')
      }
    }, 450)
    return () => clearTimeout(t)
  }, [nombre, solicitudes])

  const edadOffNum = Number(edadOff)
  const completo =
    nombre.trim().length >= 2 &&
    edadOn &&
    edadOff &&
    Number.isInteger(edadOffNum) &&
    edadOffNum > 0 &&
    inteligencia &&
    talentos.trim().length >= 3
  const bloqueado = estadoNombre === 'ocupado' || estadoNombre === 'verificando'

  async function enviar(ev: React.FormEvent) {
    ev.preventDefault()
    setError('')
    if (estadoNombre === 'ocupado') return setError(OCUPADO)
    if (!completo) return setError('Completa todos los campos de la ficha.')
    setEnviando(true)
    try {
      const r = await enviarSolicitud({
        data: {
          nombre: nombre.trim(),
          edadOn: Number(edadOn),
          edadOff: edadOffNum,
          inteligencia: inteligencia as (typeof INTELIGENCIAS_POSTULANTE)[number],
          talentos: talentos.trim(),
        },
      })
      if (!r.ok) {
        setError(r.error)
        if (r.error === OCUPADO) setEstadoNombre('ocupado')
        return
      }
      onEnviada(r.solicitud, r.codigo)
      setNombre('')
      setEdadOn('')
      setEdadOff('')
      setInteligencia('')
      setTalentos('')
    } catch {
      setError('No se pudo enviar la ficha. Revisa los datos e inténtalo de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <form onSubmit={enviar} className="fs-frame space-y-7 p-6 md:p-10" noValidate>
      <div className="flex items-center gap-4 border-b border-gold/15 pb-6">
        <Emblem className="h-12 w-11" />
        <div>
          <p className="font-display text-xl tracking-[0.15em] text-gold">Ficha de Admisión</p>
          <p className="text-sm text-muted-foreground">
            Todos los campos son obligatorios. Tu ficha será evaluada por la Dirección.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="nombre" className={etiqueta}>
          1 · Nombre del personaje
        </Label>
        <div className="relative">
          <Input
            id="nombre"
            value={nombre}
            maxLength={60}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre con el que será conocido en Fire Space"
            aria-invalid={estadoNombre === 'ocupado'}
            aria-describedby="nombre-estado"
            className={cn(campo, 'pr-10')}
            autoComplete="off"
          />
          <span className="absolute top-1/2 right-3 -translate-y-1/2">
            {estadoNombre === 'verificando' && <Loader2 className="size-4 animate-spin text-gold/70" />}
            {estadoNombre === 'disponible' && <Check className="size-4 text-[#66bb6a]" />}
            {estadoNombre === 'ocupado' && <XCircle className="size-4 text-[#e57373]" />}
          </span>
        </div>
        <p id="nombre-estado" className="min-h-5 text-sm" aria-live="polite">
          {estadoNombre === 'ocupado' && <span className="text-[#e57373]">{OCUPADO}</span>}
          {estadoNombre === 'disponible' && (
            <span className="text-[#81c784]">Nombre disponible.</span>
          )}
          {estadoNombre === 'verificando' && (
            <span className="text-muted-foreground">Verificando disponibilidad…</span>
          )}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="edadOn" className={etiqueta}>
            2 · Edad On
          </Label>
          <select
            id="edadOn"
            value={edadOn}
            onChange={(e) => setEdadOn(e.target.value)}
            className={cn(campo, 'w-full rounded-md border px-3 text-foreground')}
          >
            <option value="" disabled>
              Selecciona la edad del personaje
            </option>
            {[17, 18, 19].map((n) => (
              <option key={n} value={n} className="bg-[#141313]">
                {n} años
              </option>
            ))}
          </select>
          <p className="border-l-2 border-[#8b0000] pl-3 text-sm leading-snug text-foreground/65">
            En caso de que su personaje tenga más de 19 años, modificar la edad. No se permiten
            personajes menores de 17 años.
          </p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="edadOff" className={etiqueta}>
            3 · Edad Off
          </Label>
          <Input
            id="edadOff"
            type="number"
            inputMode="numeric"
            min={1}
            max={120}
            value={edadOff}
            onChange={(e) => setEdadOff(e.target.value)}
            placeholder="Tu edad real"
            className={campo}
          />
          <p className="text-sm text-muted-foreground">
            Solo la ve la Administración. Nunca aparece en los expedientes públicos.
          </p>
        </div>
      </div>

      <fieldset className="space-y-3">
        <legend className={cn(etiqueta, 'mb-3')}>4 · Tipo de Inteligencia</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {INTELIGENCIAS_POSTULANTE.map((i) => (
            <label
              key={i}
              className={cn(
                'cursor-pointer border px-4 py-4 text-center font-display text-sm tracking-[0.2em] uppercase transition-all',
                inteligencia === i
                  ? 'border-gold bg-gradient-to-b from-[#8b0000] to-[#4a0000] text-[#f6efe0] shadow-[0_0_24px_-6px_rgba(139,0,0,0.9)]'
                  : 'border-gold/20 bg-black/30 text-foreground/70 hover:border-gold/50',
              )}
            >
              <input
                type="radio"
                name="inteligencia"
                value={i}
                checked={inteligencia === i}
                onChange={() => setInteligencia(i)}
                className="sr-only"
              />
              {i}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="talentos" className={etiqueta}>
          5 · Talentos y Habilidades
        </Label>
        <Textarea
          id="talentos"
          value={talentos}
          onChange={(e) => setTalentos(e.target.value)}
          maxLength={4000}
          rows={6}
          placeholder="Describe los talentos y habilidades de tu personaje…"
          className="min-h-40 border-gold/20 bg-black/40 text-base focus-visible:border-gold/60 focus-visible:ring-gold/20"
        />
      </div>

      {error && (
        <p role="alert" className="border border-[#b3261e] bg-[#8b0000]/20 px-4 py-3 text-[#f1a7a7]">
          {error}
        </p>
      )}

      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="h-13 w-full text-sm"
        disabled={enviando || bloqueado}
      >
        {enviando ? <Loader2 className="animate-spin" /> : <ShieldCheck />}
        {enviando ? 'Enviando ficha…' : 'Enviar Solicitud de Ingreso'}
      </Button>
    </form>
  )
}

// ─── Solicitudes Pendientes ─────────────────────────────────────────────────

type Accion =
  | { tipo: 'ver'; s: SolicitudPublica }
  | { tipo: 'eliminar'; s: SolicitudPublica }
  | { tipo: 'aceptada'; s: SolicitudPublica }
  | { tipo: 'rechazada'; s: SolicitudPublica }
  | { tipo: 'exportar' }

const TEXTOS_ACCION: Record<Accion['tipo'], { titulo: string; desc: string; boton: string; admin: boolean }> = {
  ver: {
    titulo: 'Acceso restringido',
    desc: 'Ingresa el código de administrador para ver la información completa de esta ficha.',
    boton: 'Ver información',
    admin: true,
  },
  eliminar: {
    titulo: 'Eliminar solicitud',
    desc: 'Ingresa el CÓDIGO ÚNICO de registro que se asignó al postulante al enviar su ficha.',
    boton: 'Eliminar definitivamente',
    admin: false,
  },
  aceptada: {
    titulo: 'Aceptar ficha',
    desc: 'Para confirmar esta acción se requiere el código de administrador.',
    boton: 'Confirmar aceptación',
    admin: true,
  },
  rechazada: {
    titulo: 'Rechazar ficha',
    desc: 'Para confirmar esta acción se requiere el código de administrador. La ficha rechazada se eliminará automáticamente pasadas 24 horas.',
    boton: 'Confirmar rechazo',
    admin: true,
  },
  exportar: {
    titulo: 'Exportar solicitudes.json',
    desc: 'Descarga todas las fichas registradas en un archivo solicitudes.json. Requiere el código de administrador.',
    boton: 'Descargar archivo',
    admin: true,
  },
}

function tiempoRestante(rechazadaAt: string | null) {
  if (!rechazadaAt) return ''
  const ms = new Date(rechazadaAt).getTime() + 24 * 3600 * 1000 - Date.now()
  if (ms <= 0) return 'Eliminación inminente'
  const h = Math.floor(ms / 3600000)
  const m = Math.floor((ms % 3600000) / 60000)
  return `Se eliminará en ${h} h ${m} min`
}

function SolicitudesPendientes({
  solicitudes,
  setSolicitudes,
  recargar,
}: {
  solicitudes: SolicitudPublica[]
  setSolicitudes: React.Dispatch<React.SetStateAction<SolicitudPublica[]>>
  recargar: () => void
}) {
  const [accion, setAccion] = useState<Accion | null>(null)
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const [detalle, setDetalle] = useState<SolicitudDetalle | null>(null)

  const abrir = (a: Accion) => {
    setAccion(a)
    setCodigo('')
    setError('')
  }

  async function confirmar(ev: React.FormEvent) {
    ev.preventDefault()
    if (!accion || !codigo.trim()) return
    setCargando(true)
    setError('')
    try {
      if (accion.tipo === 'eliminar') {
        const r = await eliminarSolicitud({ data: { id: accion.s.id, codigo } })
        if (!r.ok) return setError(r.error)
        setSolicitudes((l) => l.filter((x) => x.id !== accion.s.id))
        toast.success(`La solicitud de ${accion.s.nombre} fue eliminada.`)
      } else if (accion.tipo === 'ver') {
        const r = await verSolicitud({ data: { id: accion.s.id, codigoAdmin: codigo } })
        if (!r.ok) return setError(r.error)
        setDetalle(r.solicitud)
      } else if (accion.tipo === 'exportar') {
        const r = await exportarSolicitudes({ data: { codigoAdmin: codigo } })
        if (!r.ok) return setError(r.error)
        const url = URL.createObjectURL(new Blob([r.archivo], { type: 'application/json' }))
        const a = document.createElement('a')
        a.href = url
        a.download = 'solicitudes.json'
        a.click()
        URL.revokeObjectURL(url)
        toast.success('solicitudes.json descargado.')
      } else {
        const r = await cambiarEstado({
          data: { id: accion.s.id, estado: accion.tipo, codigoAdmin: codigo },
        })
        if (!r.ok) return setError(r.error)
        setSolicitudes((l) => l.map((x) => (x.id === r.solicitud.id ? r.solicitud : x)))
        toast.success(`Estado actualizado: ${ESTADOS[r.solicitud.estado].label}.`)
      }
      setAccion(null)
    } catch {
      setError('No se pudo completar la acción. Inténtalo de nuevo.')
      recargar()
    } finally {
      setCargando(false)
    }
  }

  const textos = accion ? TEXTOS_ACCION[accion.tipo] : null

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="font-display text-[0.7rem] tracking-[0.3em] text-muted-foreground uppercase">
          {solicitudes.length} {solicitudes.length === 1 ? 'solicitud registrada' : 'solicitudes registradas'}
        </p>
        <Button variant="ghostGold" size="sm" onClick={() => abrir({ tipo: 'exportar' })}>
          <Download /> Exportar solicitudes.json
        </Button>
      </div>

      {solicitudes.length === 0 ? (
        <div className="flex flex-col items-center border border-dashed border-gold/20 px-6 py-20 text-center">
          <Emblem className="h-16 w-auto opacity-40" />
          <p className="mt-5 font-display tracking-[0.2em] text-gold/70 uppercase">
            Sin solicitudes pendientes
          </p>
          <p className="mt-2 text-foreground/50 italic">Fire Space te está esperando.</p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {solicitudes.map((s) => {
            const est = ESTADOS[s.estado] ?? ESTADOS.evaluacion
            return (
              <li
                key={s.id}
                className="fs-frame flex flex-col p-5 transition-colors animate-in fade-in hover:border-gold/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-[0.6rem] tracking-[0.3em] text-muted-foreground uppercase">
                      Solicitud de ingreso
                    </p>
                    <h4 className="mt-1 truncate font-display text-xl tracking-[0.06em] text-foreground">
                      {s.nombre}
                    </h4>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon-sm" aria-label={`Opciones de ${s.nombre}`}>
                        <MoreHorizontal />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 border-gold/20 bg-[#141212]">
                      <DropdownMenuItem onSelect={() => abrir({ tipo: 'ver', s })}>
                        <Eye /> Ver información
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="font-display text-[0.6rem] tracking-[0.25em] text-muted-foreground uppercase">
                        Cambiar estado
                      </DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => abrir({ tipo: 'aceptada', s })}>
                        <CheckCircle2 className="text-[#81c784]" /> Aceptar
                      </DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => abrir({ tipo: 'rechazada', s })}>
                        <XCircle className="text-[#e57373]" /> Rechazar
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onSelect={() => abrir({ tipo: 'eliminar', s })}
                      >
                        <Trash2 /> Eliminar solicitud
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <span
                  className={cn(
                    'mt-5 inline-flex w-fit items-center gap-2 border px-3 py-1.5 text-sm',
                    est.clase,
                  )}
                >
                  <est.Icono className={cn('size-4', s.estado === 'evaluacion' && 'animate-spin [animation-duration:3s]')} />
                  {est.label}
                </span>
                <p className="mt-auto pt-4 text-sm text-muted-foreground">
                  {s.estado === 'rechazada'
                    ? tiempoRestante(s.rechazadaAt)
                    : `Recibida el ${new Date(s.createdAt).toLocaleDateString('es', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                </p>
              </li>
            )
          })}
        </ul>
      )}

      <Dialog open={!!accion} onOpenChange={(o) => !o && setAccion(null)}>
        <DialogContent className="border-gold/30 bg-[#0f0e0e]">
          {accion && textos && (
            <form onSubmit={confirmar} className="space-y-5">
              <DialogHeader>
                <p className="flex items-center gap-2 font-display text-[0.6rem] tracking-[0.35em] text-[#c94a4a] uppercase">
                  <KeyRound className="size-3.5" />
                  {textos.admin ? 'Código de administrador requerido' : 'Código único requerido'}
                </p>
                <DialogTitle className="font-display text-2xl text-gold">{textos.titulo}</DialogTitle>
                <DialogDescription className="text-base">
                  {'s' in accion && (
                    <span className="mb-1 block text-foreground">Ficha: {accion.s.nombre}</span>
                  )}
                  {textos.desc}
                </DialogDescription>
              </DialogHeader>
              <Input
                autoFocus
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value)
                  setError('')
                }}
                placeholder="FS-0000"
                aria-invalid={!!error}
                className={cn(campo, 'text-center font-display text-xl tracking-[0.35em] uppercase')}
                autoComplete="off"
              />
              {error && (
                <p role="alert" className="border border-[#b3261e] bg-[#8b0000]/20 px-4 py-3 text-center text-[#f1a7a7]">
                  {error}
                </p>
              )}
              <DialogFooter>
                <Button type="button" variant="ghost" onClick={() => setAccion(null)}>
                  Cancelar
                </Button>
                <Button type="submit" variant="gold" disabled={cargando || !codigo.trim()}>
                  {cargando && <Loader2 className="animate-spin" />}
                  {textos.boton}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!detalle} onOpenChange={(o) => !o && setDetalle(null)}>
        <DialogContent className="max-h-[90svh] overflow-y-auto border-gold/30 bg-[#0f0e0e] sm:max-w-xl">
          {detalle && (
            <>
              <DialogHeader>
                <p className="font-display text-[0.6rem] tracking-[0.35em] text-[#c94a4a] uppercase">
                  Información confidencial · Solo Administración
                </p>
                <DialogTitle className="text-gold-gradient font-display text-3xl">{detalle.nombre}</DialogTitle>
                <DialogDescription>
                  {ESTADOS[detalle.estado].label} · Recibida el{' '}
                  {new Date(detalle.createdAt).toLocaleString('es')}
                </DialogDescription>
              </DialogHeader>
              <dl className="grid grid-cols-3 gap-px border border-gold/20 bg-gold/20">
                {[
                  ['Edad On', `${detalle.edadOn} años`],
                  ['Edad Off', `${detalle.edadOff} años`],
                  ['Inteligencia', detalle.inteligencia],
                ].map(([k, v]) => (
                  <div key={k} className="bg-[#0f0e0e] p-3">
                    <dt className="font-display text-[0.55rem] tracking-[0.3em] text-muted-foreground uppercase">{k}</dt>
                    <dd className="mt-1 font-display text-sm">{v}</dd>
                  </div>
                ))}
              </dl>
              <div>
                <h4 className="font-display text-xs tracking-[0.3em] text-gold/80 uppercase">
                  Talentos y Habilidades
                </h4>
                <p className="mt-2 leading-relaxed whitespace-pre-line text-foreground/85">{detalle.talentos}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// ─── Sección completa ───────────────────────────────────────────────────────

export function Admisiones({ iniciales }: { iniciales: SolicitudPublica[] }) {
  const [tab, setTab] = useState<'ficha' | 'pendientes'>('ficha')
  const [solicitudes, setSolicitudes] = useState(iniciales)
  const [codigoNuevo, setCodigoNuevo] = useState<{ codigo: string; nombre: string } | null>(null)
  const [copiado, setCopiado] = useState(false)

  const recargar = () => {
    listarSolicitudes()
      .then(setSolicitudes)
      .catch(() => {})
  }
  useEffect(recargar, [])

  async function copiar() {
    if (!codigoNuevo) return
    try {
      await navigator.clipboard.writeText(codigoNuevo.codigo)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    } catch {
      toast.error('No se pudo copiar. Anota el código manualmente.')
    }
  }

  const pendientes = solicitudes.filter((s) => s.estado === 'evaluacion').length

  return (
    <section id="admisiones" className="relative py-24">
      <div className="mx-auto max-w-content px-5">
        <SectionHeading kicker="Portal de Admisiones" title="Bienvenido a Fire Space">
          Quizá entres para conseguir una beca, quizá quieras convertirte en Élite, quizá quieras
          demostrar que tu inteligencia es superior, quizá quieras vengarte de alguien, quizá
          quieras encontrar a una persona, quizá simplemente quieras sobrevivir.
        </SectionHeading>

        <Reveal className="mx-auto mb-14 flex max-w-4xl flex-wrap justify-center gap-x-6 gap-y-2 font-display text-sm tracking-[0.2em] text-gold/80 uppercase">
          {[
            'Elige tu inteligencia',
            'Construye tu reputación',
            'Haz aliados',
            'Crea enemigos',
            'Participa',
            'Compite',
            'Asciende',
          ].map((t) => (
            <span key={t}>✱ {t}.</span>
          ))}
          <span className="w-full pt-3 text-center text-[#e57373] normal-case italic">
            Pero ten cuidado.
          </span>
        </Reveal>

        <div className="mx-auto max-w-5xl">
          <div role="tablist" className="mb-8 grid grid-cols-2 border border-gold/20 bg-black/40 p-1">
            {(
              [
                ['ficha', 'Ficha de Admisión'],
                ['pendientes', 'Solicitudes Pendientes'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={cn(
                  'flex items-center justify-center gap-2 px-3 py-3 font-display text-[0.7rem] tracking-[0.2em] uppercase transition-all sm:text-xs',
                  tab === id
                    ? 'bg-gradient-to-b from-[#8b0000] to-[#4a0000] text-[#f6efe0]'
                    : 'text-foreground/60 hover:text-foreground',
                )}
              >
                {label}
                {id === 'pendientes' && pendientes > 0 && (
                  <span className="grid min-w-5 place-items-center rounded-full bg-gold px-1.5 text-[0.65rem] text-black">
                    {pendientes}
                  </span>
                )}
              </button>
            ))}
          </div>

          {tab === 'ficha' ? (
            <FichaAdmision
              solicitudes={solicitudes}
              onEnviada={(s, codigo) => {
                setSolicitudes((l) => [s, ...l])
                setCodigoNuevo({ codigo, nombre: s.nombre })
              }}
            />
          ) : (
            <SolicitudesPendientes
              solicitudes={solicitudes}
              setSolicitudes={setSolicitudes}
              recargar={recargar}
            />
          )}
        </div>

        <Reveal className="mx-auto mt-20 max-w-3xl text-center">
          <p className="text-xl leading-relaxed text-foreground/80 italic md:text-2xl">
            La pregunta no es si podrás llegar a la cima, la pregunta es qué estarás dispuesto a
            perder para permanecer en ella.
          </p>
          <p className="mt-6 font-display tracking-[0.3em] text-gold uppercase">
            Fire Space te está esperando.
          </p>
        </Reveal>
      </div>

      <Dialog open={!!codigoNuevo} onOpenChange={(o) => !o && setCodigoNuevo(null)}>
        <DialogContent className="border-gold/40 bg-[#0f0e0e] text-center sm:max-w-md" showCloseButton={false}>
          {codigoNuevo && (
            <>
              <Emblem className="mx-auto h-16 w-auto" />
              <DialogHeader className="items-center text-center">
                <DialogTitle className="font-display text-2xl text-gold">Solicitud registrada</DialogTitle>
                <DialogDescription className="text-base">
                  La ficha de <span className="text-foreground">{codigoNuevo.nombre}</span> fue enviada
                  y se encuentra en proceso de evaluación.
                </DialogDescription>
              </DialogHeader>
              <div className="border border-gold/40 bg-gradient-to-b from-[#2a0606] to-black py-6">
                <p className="font-display text-[0.6rem] tracking-[0.4em] text-gold/70 uppercase">
                  Tu código único de registro
                </p>
                <p className="text-gold-gradient mt-2 font-display text-4xl font-bold tracking-[0.25em]">
                  {codigoNuevo.codigo}
                </p>
              </div>
              <p className="text-sm text-[#f1a7a7]">
                Consérvalo: es la única forma de eliminar tu solicitud. No se volverá a mostrar.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Button variant="ghostGold" onClick={copiar}>
                  {copiado ? <Check /> : <Copy />} {copiado ? 'Copiado' : 'Copiar código'}
                </Button>
                <Button
                  variant="gold"
                  onClick={() => {
                    setCodigoNuevo(null)
                    setTab('pendientes')
                  }}
                >
                  Ver solicitudes
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
