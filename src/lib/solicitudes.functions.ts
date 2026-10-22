import { createServerFn } from '@tanstack/react-start'
import { desc, eq } from 'drizzle-orm'
import { z } from 'zod'

import { db } from '../../db'
import { solicitudes } from '../../db/schema'
import { INTELIGENCIAS_POSTULANTE, normalizar } from '@/lib/academia'
import {
  MENSAJE_OCUPADO,
  esAdmin,
  generarCodigoUnico,
  limpiarCodigo,
  nombreDisponible,
  purgarRechazadas,
} from '@/server/solicitudes.server'

export type EstadoSolicitud = 'evaluacion' | 'aceptada' | 'rechazada'

export type SolicitudPublica = {
  id: number
  nombre: string
  estado: EstadoSolicitud
  createdAt: string
  rechazadaAt: string | null
}

export type SolicitudDetalle = SolicitudPublica & {
  edadOn: number
  edadOff: number
  inteligencia: string
  talentos: string
}

type Resultado<T = object> = ({ ok: true } & T) | { ok: false; error: string }

const SIN_PERMISOS = 'Acción rechazada: código de administrador inválido. No tienes permisos.'
const CODIGO_INVALIDO = 'Código de autorización inválido'

const aPublica = (s: typeof solicitudes.$inferSelect): SolicitudPublica => ({
  id: s.id,
  nombre: s.nombre,
  estado: s.estado as EstadoSolicitud,
  createdAt: s.createdAt.toISOString(),
  rechazadaAt: s.rechazadaAt ? s.rechazadaAt.toISOString() : null,
})

const aDetalle = (s: typeof solicitudes.$inferSelect): SolicitudDetalle => ({
  ...aPublica(s),
  edadOn: s.edadOn,
  edadOff: s.edadOff,
  inteligencia: s.inteligencia,
  talentos: s.talentos,
})

/** Lista pública: solo el nombre y el estado de cada ficha. */
export const listarSolicitudes = createServerFn({ method: 'GET' }).handler(
  async (): Promise<SolicitudPublica[]> => {
    await purgarRechazadas()
    const filas = await db.select().from(solicitudes).orderBy(desc(solicitudes.createdAt))
    return filas.map(aPublica)
  },
)

export const verificarNombre = createServerFn({ method: 'GET' })
  .validator(z.object({ nombre: z.string().trim().min(1).max(60) }))
  .handler(async ({ data }) => ({ disponible: await nombreDisponible(data.nombre) }))

const fichaInput = z.object({
  nombre: z.string().trim().min(2, 'El nombre es demasiado corto').max(60),
  edadOn: z.coerce.number().int().min(17).max(19),
  edadOff: z.coerce.number().int().min(1).max(120),
  inteligencia: z.enum(INTELIGENCIAS_POSTULANTE),
  talentos: z.string().trim().min(3).max(4000),
})

export const enviarSolicitud = createServerFn({ method: 'POST' })
  .validator(fichaInput)
  .handler(async ({ data }): Promise<Resultado<{ codigo: string; solicitud: SolicitudPublica }>> => {
    const nombre = data.nombre.replace(/\s+/g, ' ')
    if (!(await nombreDisponible(nombre))) return { ok: false, error: MENSAJE_OCUPADO }

    for (let intento = 0; intento < 3; intento++) {
      const codigo = await generarCodigoUnico()
      try {
        const [fila] = await db
          .insert(solicitudes)
          .values({
            codigo,
            nombre,
            nombreNormalizado: normalizar(nombre),
            edadOn: data.edadOn,
            edadOff: data.edadOff,
            inteligencia: data.inteligencia,
            talentos: data.talentos,
          })
          .returning()
        return { ok: true, codigo, solicitud: aPublica(fila) }
      } catch {
        // Puede haber chocado con otro envío simultáneo: nombre o código repetido.
        if (!(await nombreDisponible(nombre))) return { ok: false, error: MENSAJE_OCUPADO }
      }
    }
    return { ok: false, error: 'No se pudo registrar la solicitud. Inténtalo de nuevo.' }
  })

/** El postulante elimina su propia ficha con su código único. */
export const eliminarSolicitud = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.number().int(), codigo: z.string().max(40) }))
  .handler(async ({ data }): Promise<Resultado> => {
    const [fila] = await db.select().from(solicitudes).where(eq(solicitudes.id, data.id)).limit(1)
    if (!fila) return { ok: false, error: 'Esta solicitud ya no existe.' }
    if (fila.codigo !== limpiarCodigo(data.codigo)) return { ok: false, error: CODIGO_INVALIDO }
    await db.delete(solicitudes).where(eq(solicitudes.id, data.id))
    return { ok: true }
  })

/** Información completa de una ficha (requiere código de administrador). */
export const verSolicitud = createServerFn({ method: 'POST' })
  .validator(z.object({ id: z.number().int(), codigoAdmin: z.string().max(40) }))
  .handler(async ({ data }): Promise<Resultado<{ solicitud: SolicitudDetalle }>> => {
    if (!esAdmin(data.codigoAdmin)) return { ok: false, error: SIN_PERMISOS }
    const [fila] = await db.select().from(solicitudes).where(eq(solicitudes.id, data.id)).limit(1)
    if (!fila) return { ok: false, error: 'Esta solicitud ya no existe.' }
    return { ok: true, solicitud: aDetalle(fila) }
  })

/** Aceptar o rechazar una ficha (requiere código de administrador). */
export const cambiarEstado = createServerFn({ method: 'POST' })
  .validator(
    z.object({
      id: z.number().int(),
      estado: z.enum(['aceptada', 'rechazada']),
      codigoAdmin: z.string().max(40),
    }),
  )
  .handler(async ({ data }): Promise<Resultado<{ solicitud: SolicitudPublica }>> => {
    if (!esAdmin(data.codigoAdmin)) return { ok: false, error: SIN_PERMISOS }
    const [fila] = await db
      .update(solicitudes)
      .set({
        estado: data.estado,
        rechazadaAt: data.estado === 'rechazada' ? new Date() : null,
      })
      .where(eq(solicitudes.id, data.id))
      .returning()
    if (!fila) return { ok: false, error: 'Esta solicitud ya no existe.' }
    return { ok: true, solicitud: aPublica(fila) }
  })

/** Descarga de todas las fichas en formato solicitudes.json (requiere código de administrador). */
export const exportarSolicitudes = createServerFn({ method: 'POST' })
  .validator(z.object({ codigoAdmin: z.string().max(40) }))
  .handler(async ({ data }): Promise<Resultado<{ archivo: string }>> => {
    if (!esAdmin(data.codigoAdmin)) return { ok: false, error: SIN_PERMISOS }
    await purgarRechazadas()
    const filas = await db.select().from(solicitudes).orderBy(desc(solicitudes.createdAt))
    const archivo = JSON.stringify(
      {
        exportado: new Date().toISOString(),
        solicitudes: filas.map((s) => ({ ...aDetalle(s), codigo: s.codigo })),
      },
      null,
      2,
    )
    return { ok: true, archivo }
  })
