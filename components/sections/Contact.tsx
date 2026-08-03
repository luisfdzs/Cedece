import type { Artist } from '@/content/schema'
import { pick } from '@/content/schema'
import type { Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { PlatformIcon, platformLabel } from '../ui/PlatformIcon'
import { Section } from '../ui/Section'

/**
 * CONTACTO.
 *
 * **Nada de formulario.** Un `mailto:` con la dirección a la vista deja el mensaje en la
 * bandeja de enviados de quien escribe, y eso es lo que quiere un promotor: poder buscar
 * después qué mandó y cuándo. Un formulario, además, obligaría a una función de servidor, a
 * un servicio de correo y a un antispam en una web que por lo demás es estática.
 *
 * **La dirección no está ofuscada.** Se valoró y no compensa: los recolectores de correo
 * llevan veinte años leyendo JavaScript, y cualquier truco de ofuscación rompe el enlace para
 * quien navega con lector de pantalla o con el JavaScript desactivado. El coste de ofuscar lo
 * paga quien quiere escribir; el beneficio es imaginario.
 *
 * ⚠️ **Hoy no hay dirección de contratación** (`bookingEmail` está sin rellenar en
 * `content/artist.ts`): hace falta pedírsela a Cedecé. Mientras no la haya, la sección cae a
 * los mensajes directos de Instagram, que es por donde le escribe la gente ahora. Está
 * apuntado en el README, en «Pendiente».
 */
export function Contact({ artist, locale }: { artist: Artist; locale: Locale }) {
  const ui = t(locale)
  const instagram = artist.platforms.find((platform) => platform.kind === 'instagram')

  return (
    <Section id="contacto" number="06" title={ui.contact.title} lead={ui.contact.lead} tone="soft">
      <div className="grid gap-10 md:grid-cols-2 md:gap-14">
        <div>
          <p className="eyebrow mb-3">{ui.contact.booking}</p>

          {artist.bookingEmail ? (
            <a
              href={`mailto:${artist.bookingEmail}`}
              className="font-(family-name:--font-display) text-[clamp(1.5rem,4.5vw,2.5rem)] break-all uppercase transition-colors hover:text-[var(--color-velvet)]"
            >
              {artist.bookingEmail}
            </a>
          ) : instagram ? (
            <div>
              <a
                href={instagram.url}
                target="_blank"
                rel="noreferrer noopener"
                className="font-(family-name:--font-display) text-[clamp(1.5rem,4.5vw,2.5rem)] uppercase transition-colors hover:text-[var(--color-velvet)]"
              >
                @soycedece
              </a>
              {/* Se dice por qué el enlace es a Instagram y no a un correo, en vez de dejar
                  que parezca un descuido. */}
              <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--color-paper-dim)]">
                {ui.contact.instagramFallback}
              </p>
            </div>
          ) : null}

          {artist.pressKitUrl ? (
            <a
              href={artist.pressKitUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-ghost mt-6"
            >
              {ui.contact.pressKit}
            </a>
          ) : null}

          {artist.shortBio ? (
            <div className="mt-10 border-t border-[var(--color-ink-line)] pt-6">
              <p className="eyebrow mb-2">{ui.about.title}</p>
              <p className="max-w-md text-sm leading-relaxed text-[var(--color-paper-dim)]">
                {pick(artist.shortBio, locale)}
              </p>
            </div>
          ) : null}
        </div>

        <div>
          <p className="eyebrow mb-4">{ui.contact.followOn}</p>
          <ul className="grid grid-cols-2 gap-2">
            {artist.platforms.map((platform) => (
              <li key={platform.url}>
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2.5 rounded-(--radius-card) border border-[var(--color-ink-line)] px-3 py-2.5 text-sm transition-colors hover:border-[var(--color-paper)]"
                >
                  <PlatformIcon kind={platform.kind} className="h-4 w-4 shrink-0" />
                  <span className="truncate">{platformLabel(platform.kind, platform.label)}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
