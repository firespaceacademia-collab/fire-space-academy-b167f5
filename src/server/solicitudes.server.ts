import { and, eq, lt } from 'drizzle-orm'
import { randomInt } from 'node:crypto'

import { db } from '../../db'
import { solicitudes } from '../../db/schema'
import { ESTUDIANTES, normalizar } from '@/lib/academia'

// El código de administrador solo vive en el servidor: nunca se envía al navegador.
const CODIGO_ADMIN = (process.env.FS_CODIGO_ADMIN || 'FS-2110').toUpperCase()
const VEINTICUATRO_HORAS = 24 * 60 * 60 * 1000

export const MENSAJE_OCUPADO = 'Este personaje ya está ocupado/solicitado'

/** Acepta "FS-8492", "fs 8492" o "8492". */
export function limpiarCodigo(codigo: string) {
  const c = codigo.trim().toUpperCase().replace(/\s+/g, '')
  if (/^\d+$/.test(c)) return `FS-${c}`
  return c.replace(/^FS(?!-)/, 'FS-')
}

export function esAdmin(codigo: string) {
  return limpiarCodigo(codigo) === CODIGO_ADMIN
}

/** Las fichas rechazadas desaparecen 24 horas después del rechazo. */
export async function purgarRechazadas() {
  await db
    .delete(solicitudes)
    .where(
      and(
        eq(solicitudes.estado, 'rechazada'),
        lt(solicitudes.rechazadaAt, new Date(Date.now() - VEINTICUATRO_HORAS)),
      ),
    )
}

export async function nombreDisponible(nombre: string) {
  const n = normalizar(nombre)
  if (ESTUDIANTES.some((e) => normalizar(e.nombre) === n)) return false
  await purgarRechazadas()
  const existente = await db
    .select({ id: solicitudes.id })
    .from(solicitudes)
    .where(eq(solicitudes.nombreNormalizado, n))
    .limit(1)
  return existente.length === 0
}

export async function generarCodigoUnico() {
  for (let intento = 0; intento < 30; intento++) {
    const digitos = intento < 20 ? randomInt(1000, 10000) : randomInt(10000, 100000)
    const codigo = `FS-${digitos}`
    if (codigo === CODIGO_ADMIN) continue
    const usado = await db
      .select({ id: solicitudes.id })
      .from(solicitudes)
      .where(eq(solicitudes.codigo, codigo))
      .limit(1)
    if (usado.length === 0) return codigo
  }
  throw new Error('No se pudo generar un código único')
}
