import Link from 'next/link'
import { locales, localeNames, type Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { Logo } from './Logo'

/**
 * LA CABECERA.
 *
 * Fija arriba, con la marca a la izquierda, las seis secciones en el centro y los tres
 * idiomas a la derecha.
 *
 * **Sin JavaScript y sin menú desplegable.** En móvil, en vez de un botón que abre un panel
 * —que obligaría a un componente de cliente, a gestionar el foco y a cerrar el panel al
 * navegar—, la fila de secciones **se desplaza en horizontal**. Son seis enlaces cortos: el
 * desplazamiento es la solución más pequeña que funciona, y funciona también con el
 * JavaScript desactivado y en un navegador de un año raro.
 *
 * El fondo va con `backdrop-blur` y semitransparente porque debajo pasa el vídeo del hero.
 * Sin la opacidad, la cabecera sería un bloque negro pegado sobre la imagen; con ella, se
 * lee sin tapar.
 */
export function Header({ locale }: { locale: Locale }) {
  const ui = t(locale)
  const home = `/${locale}`

  // El ancla va en castellano en los tres idiomas: es un identificador. Ver `Section.tsx`.
  const links = [
    { href: `${home}#musica`, label: ui.nav.music },
    { href: `${home}#videos`, label: ui.nav.videos },
    { href: `${home}#directo`, label: ui.nav.live },
    { href: `${home}#quien-es`, label: ui.nav.about },
    { href: `${home}#galeria`, label: ui.nav.gallery },
    { href: `${home}#contacto`, label: ui.nav.contact },
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--color-ink-line)] bg-[rgb(11_11_13/0.72)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-(--spacing-gutter) py-3">
        <Link href={home} className="flex shrink-0 items-center gap-2.5" aria-label="Cedecé">
          <Logo className="h-7 w-7 text-[var(--color-paper)]" />
          <span className="font-(family-name:--font-display) text-lg tracking-[0.06em] uppercase">
            Cedecé
          </span>
        </Link>

        <nav
          aria-label={ui.nav.music}
          className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* `justify-center` y no `justify-end`: los seis enlaces al eje de la cabecera, con
              la marca a un lado y los idiomas al otro. Cuando no caben, el `overflow-x` del
              `<nav>` los deja desplazarse igual. */}
          <ul className="flex items-center justify-center gap-1 whitespace-nowrap">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-(family-name:--font-mono) inline-block rounded px-2.5 py-1.5 text-[0.7rem] tracking-[0.1em] text-[var(--color-paper-dim)] uppercase transition-colors hover:text-[var(--color-paper)]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="hidden shrink-0 items-center gap-1 border-l border-[var(--color-ink-line)] pl-3 sm:flex"
          role="group"
          aria-label={ui.a11y.changeLanguage}
        >
          {locales.map((code) => (
            <Link
              key={code}
              href={`/${code}`}
              hrefLang={code}
              aria-current={code === locale ? 'true' : undefined}
              title={localeNames[code]}
              className={
                code === locale
                  ? 'font-(family-name:--font-mono) rounded bg-[var(--color-velvet)] px-2 py-1 text-[0.65rem] tracking-[0.1em] text-white uppercase'
                  : 'font-(family-name:--font-mono) rounded px-2 py-1 text-[0.65rem] tracking-[0.1em] text-[var(--color-paper-dim)] uppercase transition-colors hover:text-[var(--color-paper)]'
              }
            >
              {code}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
