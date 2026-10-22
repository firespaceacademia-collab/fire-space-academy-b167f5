import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

// Solicitudes de admisión enviadas desde el Portal de Admisiones.
// La estructura de cada registro está documentada en data/solicitudes.json.
export const solicitudes = pgTable('solicitudes', {
  id: serial().primaryKey(),
  codigo: text().notNull().unique(),
  nombre: text().notNull(),
  nombreNormalizado: text('nombre_normalizado').notNull().unique(),
  edadOn: integer('edad_on').notNull(),
  edadOff: integer('edad_off').notNull(),
  inteligencia: text().notNull(),
  talentos: text().notNull(),
  estado: text().notNull().default('evaluacion'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  rechazadaAt: timestamp('rechazada_at', { withTimezone: true }),
})
