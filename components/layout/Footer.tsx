import type { Artist } from '@/content/schema'
import { buildYear } from '@/lib/format'
import type { Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { PlatformIcon, platformLabel } from '../ui/PlatformIcon'
import { Logo } from './Logo'

/**
 * EL PIE.
 *
 * Repite **todos** los enlaces de plataforma, no sólo los principales. En el hero sólo van
 * los dos que importan (Spotify y YouTube) para que la decisión sea fácil; aquí abajo va la
 * lista entera, porque quien llega al pie ha leído la página y ya sabe lo que busca.
 *
 * El año sale de `buildYear()`, congelado en el build: ver la nota de `lib/format.ts`.
 *
 * La línea de la fuente del material no es un adorno legal: **las fotos y los vídeos son de
 * los fotógrafos que trabajan con él** y la web se construyó con material de sus redes. Que
 * eso esté escrito en el pie es lo mínimo.
 */
export function Footer({ artist, locale }: { artist: Artist; locale: Locale }) {
  const ui = t(locale)

  return (
    <footer className="border-t border-[var(--color-ink-line)] px-(--spacing-gutter) py-16">
      {/* El pie se apila al eje: marca, ciudad, la lista entera de plataformas y la línea
          legal. En dos columnas enfrentadas la marca quedaba en un extremo y los enlaces en
          el otro, con un vacío en medio que en pantalla ancha era medio pie. */}
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-center gap-2.5">
          <Logo className="h-8 w-8 text-[var(--color-paper)]" />
          <span className="font-(family-name:--font-display) text-2xl tracking-[0.05em] uppercase">
            Cedecé
          </span>
        </div>
        <p className="mt-3 text-sm text-[var(--color-paper-dim)]">{artist.city}</p>

        <nav aria-label={ui.contact.followOn} className="mt-10">
          <p className="eyebrow mb-4">{ui.contact.followOn}</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3">
            {artist.platforms.map((platform) => (
              <li key={platform.url}>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-paper-dim)] transition-colors hover:text-[var(--color-paper)]"
                >
                  <PlatformIcon kind={platform.kind} />
                  {platformLabel(platform.kind, platform.label)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 space-y-1.5 border-t border-[var(--color-ink-line)] pt-8 text-xs text-[var(--color-paper-mute)]">
          <p>
            © {buildYear()} Cedecé. {ui.footer.rights}
          </p>
          <p>{ui.footer.sourceNote}</p>
        </div>
      </div>
    </footer>
  )
}
