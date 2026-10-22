import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

import { Admisiones } from '@/components/fs/admisiones'
import { Directorio, ExpedienteDialog, Muro } from '@/components/fs/directorio'
import { Footer } from '@/components/fs/footer'
import { Hero } from '@/components/fs/hero'
import { Intruders } from '@/components/fs/intruders'
import { Jerarquia } from '@/components/fs/jerarquia'
import { Lore } from '@/components/fs/lore'
import { Navbar } from '@/components/fs/navbar'
import { ZonasRestringidas } from '@/components/fs/zonas'
import type { Estudiante } from '@/lib/academia'
import { listarSolicitudes } from '@/lib/solicitudes.functions'

export const Route = createFileRoute('/')({
  loader: async () => ({ solicitudes: await listarSolicitudes().catch(() => []) }),
  component: Home,
})

function Home() {
  const { solicitudes } = Route.useLoaderData()
  const [expediente, setExpediente] = useState<Estudiante | null>(null)

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Lore />
        <Jerarquia />
        <ZonasRestringidas />
        <Muro onAbrir={setExpediente} />
        <Directorio onAbrir={setExpediente} />
        <Intruders />
        <Admisiones iniciales={solicitudes} />
      </main>
      <Footer />
      <ExpedienteDialog estudiante={expediente} onClose={() => setExpediente(null)} />
    </>
  )
}
