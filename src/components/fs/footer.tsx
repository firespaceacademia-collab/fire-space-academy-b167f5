import { Logo, ENLACES } from '@/components/fs/navbar'

export function Footer() {
  return (
    <footer className="relative border-t border-gold/20 bg-[#080707]">
      <div className="mx-auto grid max-w-content gap-10 px-5 py-14 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-md text-foreground/60 italic">
            Donde la excelencia exige el máximo sacrificio.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3">
          {ENLACES.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-display text-[0.7rem] tracking-[0.2em] text-foreground/60 uppercase hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-gold/10">
        <div className="mx-auto flex max-w-content flex-col gap-3 px-5 py-6 text-sm md:flex-row md:items-center md:justify-between">
          <p className="text-foreground/50">
            © {new Date().getFullYear()} Fire Space Academy Roleplay. Todos los derechos reservados.
          </p>
          <p className="border-l-2 border-[#8b0000] pl-3 font-type text-[#e57373]/90">
            Propiedad de la Administración de Fire Space. Los infractores serán sancionados por la
            Dirección.
          </p>
        </div>
      </div>
    </footer>
  )
}
