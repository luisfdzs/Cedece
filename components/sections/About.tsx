import type { Artist, Collaborator } from '@/content/schema'
import { pick, pickList } from '@/content/schema'
import type { Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { Photo } from '../ui/Photo'
import { Section } from '../ui/Section'

/**
 * QUIÉN ES, Y QUIÉN ESTÁ CON ÉL.
 *
 * La biografía a la izquierda y el retrato a la derecha, y debajo la lista de la banda y del
 * equipo agrupada por lo que hace cada uno.
 *
 * **La lista de colaboradores no es relleno.** En un proyecto de este tamaño esos once
 * nombres son media obra: la guitarra de Rober Carcos es lo que convierte los temas en un
 * directo en acústico, y las fotos de Vaxa PH, Pablo CHD y Redesllá Comunicación son
 * literalmente todo el material gráfico que tiene esta web. Enlazarlos con nombre es lo
 * mínimo, y de paso es lo que hace que la próxima vez sigan cogiendo la cámara.
 *
 * Los grupos vacíos no se dibujan: si un día no hay nadie en «Colaboraciones», no aparece un
 * encabezado suelto sin nada debajo.
 */
const GROUP_ORDER = ['band', 'visual', 'studio', 'feature'] as const

export function About({
  artist,
  collaborators,
  locale,
}: {
  artist: Artist
  collaborators: Collaborator[]
  locale: Locale
}) {
  const ui = t(locale)

  return (
    <Section id="quien-es" number="04" title={ui.about.title} tone="soft">
      <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-14">
        <div className="space-y-4 text-base leading-relaxed md:text-lg">
          {pickList(artist.bio, locale).map((paragraph, i) => (
            <p key={i} className={i === 0 ? 'text-[var(--color-paper)]' : ''}>
              {paragraph}
            </p>
          ))}
        </div>

        {artist.portrait ? (
          <figure className="md:sticky md:top-24 md:self-start">
            <div className="relative aspect-square overflow-hidden rounded-(--radius-card) border border-[var(--color-ink-line)]">
              <Photo
                file={artist.portrait.file}
                alt={pick(artist.portrait.alt, locale)}
                sizes="(min-width: 48rem) 33vw, 90vw"
              />
            </div>
            {artist.portrait.credit ? (
              <figcaption className="mt-2 text-xs text-[var(--color-paper-dim)]">
                {ui.gallery.photoBy} {artist.portrait.credit}
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>

      <div className="mt-14 border-t border-[var(--color-ink-line)] pt-10">
        <h3 className="mb-8 text-2xl">{ui.about.band}</h3>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {GROUP_ORDER.map((group) => {
            const members = collaborators.filter((person) => person.group === group)
            if (members.length === 0) return null

            return (
              <div key={group}>
                <p className="eyebrow mb-3 border-b border-[var(--color-ink-line)] pb-2">
                  {ui.about.groups[group]}
                </p>
                <ul className="space-y-3">
                  {members.map((person) => (
                    <li key={person.name}>
                      {person.url ? (
                        <a
                          href={person.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-(family-name:--font-display) text-base uppercase transition-colors hover:text-[var(--color-velvet)]"
                        >
                          {person.name}
                        </a>
                      ) : (
                        <p className="font-(family-name:--font-display) text-base uppercase">
                          {person.name}
                        </p>
                      )}
                      <p className="text-xs text-[var(--color-paper-dim)]">
                        {pick(person.role, locale)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
