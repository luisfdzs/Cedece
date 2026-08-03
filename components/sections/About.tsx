import type { Artist, Collaborator } from '@/content/schema'
import { pick, pickList } from '@/content/schema'
import type { Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { Photo } from '../ui/Photo'
import { Section } from '../ui/Section'

/**
 * QUIÉN ES, Y QUIÉN ESTÁ CON ÉL.
 *
 * El retrato arriba, la biografía debajo en una columna estrecha, y al pie la lista de la
 * banda y del equipo agrupada por lo que hace cada uno.
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
      {/*
        El retrato ARRIBA y centrado, y la biografía debajo en una columna estrecha.

        Antes iban en dos columnas con el texto a la izquierda y la foto pegada a la derecha
        —y la foto en `sticky`, así que en pantalla alta se quedaba flotando a media
        biografía. Al eje, el orden de lectura es el evidente: la cara y luego quién es.

        `max-w-2xl` en la biografía no es cosmético: son cuatro párrafos y centrados sólo se
        leen si la medida es estrecha. A todo el ancho de la sección serían líneas de ciento
        veinte caracteres empezando cada una en un sitio distinto.
      */}
      {artist.portrait ? (
        <figure className="mb-12">
          <div className="relative mx-auto aspect-square w-full max-w-xs overflow-hidden rounded-(--radius-card) border border-[var(--color-ink-line)] sm:max-w-sm">
            <Photo
              file={artist.portrait.file}
              alt={pick(artist.portrait.alt, locale)}
              sizes="(min-width: 40rem) 24rem, 90vw"
            />
          </div>
          {artist.portrait.credit ? (
            <figcaption className="mt-3 text-xs text-[var(--color-paper-mute)]">
              {ui.gallery.photoBy} {artist.portrait.credit}
            </figcaption>
          ) : null}
        </figure>
      ) : null}

      <div className="mx-auto max-w-2xl space-y-5 text-base leading-relaxed md:text-lg">
        {pickList(artist.bio, locale).map((paragraph, i) => (
          <p key={i} className={i === 0 ? 'text-[var(--color-paper)]' : ''}>
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-16 border-t border-[var(--color-ink-line)] pt-12">
        <h3 className="mb-10 text-2xl">{ui.about.band}</h3>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {GROUP_ORDER.map((group) => {
            const members = collaborators.filter((person) => person.group === group)
            if (members.length === 0) return null

            return (
              <div key={group}>
                <p className="eyebrow mb-4 border-b border-[var(--color-ink-line)] pb-2">
                  {ui.about.groups[group]}
                </p>
                <ul className="space-y-4">
                  {members.map((person) => (
                    <li key={person.name}>
                      {person.url ? (
                        <a
                          href={person.url}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="font-(family-name:--font-display) text-base leading-tight uppercase transition-colors hover:text-[var(--color-velvet)]"
                        >
                          {person.name}
                        </a>
                      ) : (
                        <p className="font-(family-name:--font-display) text-base leading-tight uppercase">
                          {person.name}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-[var(--color-paper-dim)]">
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
