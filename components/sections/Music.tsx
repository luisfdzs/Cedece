import type { Release } from '@/content/schema'
import { pickList } from '@/content/schema'
import { earlierTracks } from '@/content/releases'
import { formatDate, year } from '@/lib/format'
import type { Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { Photo } from '../ui/Photo'
import { Section } from '../ui/Section'

/**
 * LA DISCOGRAFÍA.
 *
 * **Las fichas están diseñadas para funcionar SIN portada, y eso no es una carencia
 * disimulada: es el estado real del material.** No hay ni una portada de disco en Instagram,
 * y de Spotify no se descargaron. Así que la tarjeta se sostiene sobre tipografía —el año en
 * grande arriba, haciendo de portada, y el título debajo en la condensada pesada— en vez de
 * dejar un cuadrado gris esperando una imagen.
 *
 * Cuando Cedecé suba las portadas desde el panel, el campo `cover` ya está en el modelo y la
 * tarjeta las coloca sola. Mientras no las haya, esto se lee como una decisión y no como un
 * hueco, que es exactamente la diferencia que se buscaba.
 *
 * El año se escribe con `formatDate` y su `datePrecision`: de «Eres» y «Quítame» sólo consta
 * el año y la web no puede afirmar un día. Ver `content/releases.ts`.
 */
export function Music({ releases, locale }: { releases: Release[]; locale: Locale }) {
  const ui = t(locale)
  const kindLabel: Record<Release['kind'], string> = {
    album: ui.music.album,
    ep: ui.music.ep,
    single: ui.music.single,
  }

  // Ya vienen ordenados por `orderRank` desde Sanity o por el orden del fichero; se ordena
  // por fecha descendente de todas formas para que la sección no dependa de eso.
  const sorted = [...releases].sort((a, b) => b.releaseDate.localeCompare(a.releaseDate))

  return (
    <Section id="musica" number="01" title={ui.music.title} lead={ui.music.lead}>
      {/*
        `items-start` y no la altura igualada por defecto de la retícula.
        De los cinco lanzamientos, tres tienen texto y créditos y dos sólo título y año
        —de «Eres» y «Quítame» no consta nada más—. Con la altura igualada, la ficha de
        «Quítame» se estiraba hasta la de «Cuentos de Dragones» y quedaba media tarjeta de
        vacío que parecía un fallo de carga. Que cada una mida lo que tiene dentro deja las
        filas desiguales, y eso en dos columnas se lee como una decisión.
      */}
      <ul className="grid items-start gap-4 md:grid-cols-2">
        {sorted.map((release) => (
          <li
            key={release.slug}
            className="group flex flex-col rounded-(--radius-card) border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)] p-6 transition-colors hover:border-[var(--color-velvet-dim)] md:p-8"
          >
            {/*
              La cabecera de la ficha al eje: la portada —o el año que hace sus veces—
              ARRIBA y centrada, y el título debajo.

              Antes iban enfrentados en una fila con `justify-between`, que es el reparto
              que pide un bloque alineado a la izquierda: el año quedaba flotando en la
              esquina derecha y en los títulos largos —«CUENTOS DE DRAGONES»— se le
              acercaba hasta parecer que iban a chocar. Apilados, el número grande hace de
              rótulo del año y el título manda, que es el orden en que se leen.
            */}
            {release.cover ? (
              <div className="relative mx-auto h-28 w-28 shrink-0 overflow-hidden rounded-(--radius-card)">
                <Photo
                  file={release.cover.file}
                  alt=""
                  sizes="112px"
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              // Sin portada, el año es el ancla visual de la ficha. Es lo que mantiene la
              // retícula con ritmo cuando ninguna tiene imagen.
              <p
                aria-hidden
                className="font-(family-name:--font-display) text-5xl leading-none text-[var(--color-ink-line)] transition-colors group-hover:text-[var(--color-velvet-dim)] md:text-6xl"
              >
                {year(release.releaseDate)}
              </p>
            )}

            <p className="eyebrow mt-5">
              {kindLabel[release.kind]}
              {release.series && release.seriesNumber ? (
                <>
                  {' · '}
                  {ui.music.seriesEntry(release.series, release.seriesNumber)}
                </>
              ) : null}
            </p>

            <h3 className="mt-2 text-[clamp(1.75rem,4.5vw,2.75rem)]">{release.title}</h3>

            {/*
              La fecha se calla cuando no añade nada. Si de un lanzamiento sólo consta el
              año y la ficha no tiene portada, el año ya está escrito en grande arriba:
              repetirlo dejaba «2025 / QUÍTAME / 2025». Con portada sí se escribe, porque
              entonces el número grande no existe.
            */}
            {release.datePrecision !== 'year' || release.cover ? (
              <p className="font-(family-name:--font-mono) mt-3 text-xs tracking-[0.08em] text-[var(--color-paper-dim)] uppercase">
                {formatDate(release.releaseDate, release.datePrecision, locale)}
              </p>
            ) : null}

            {release.about ? (
              <div className="mx-auto mt-5 max-w-md space-y-3 text-sm leading-relaxed text-[var(--color-paper-dim)]">
                {pickList(release.about, locale).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {release.tracks && release.tracks.length > 0 ? (
              <div className="mt-6">
                <p className="eyebrow mb-3">{ui.music.tracks}</p>
                <ol className="font-(family-name:--font-mono) space-y-1.5 text-xs text-[var(--color-paper-dim)]">
                  {release.tracks.map((track, i) => (
                    <li key={track}>
                      <span className="mr-2 text-[var(--color-paper-mute)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {track}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {release.credits && release.credits.length > 0 ? (
              <div className="mt-6">
                <p className="eyebrow mb-3">{ui.music.credits}</p>
                {/*
                  Cada crédito en su propia línea con el oficio encima del nombre, y no
                  todos seguidos separados por espacios. Con seis créditos —los de
                  «Cuentos de Dragones»— la fila envuelta dejaba «Cámara: Redesllá
                  Comunicación Edición: Cedecé» pegado y no se sabía dónde acababa uno.

                  El oficio va en `paper-mute` y NO en `ink-line`: `ink-line` es el color
                  con el que se dibujan los bordes de las tarjetas, y usado como texto
                  sobre el fondo de la propia tarjeta dejaba los créditos invisibles.
                */}
                <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs">
                  {release.credits.map((credit) => (
                    <li key={`${credit.role}-${credit.who}`}>
                      <span className="block text-[0.6875rem] text-[var(--color-paper-mute)]">
                        {credit.role}
                      </span>
                      <span className="text-[var(--color-paper-dim)]">{credit.who}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {release.links && release.links.length > 0 ? (
              // `mt-auto` alinea los botones al pie de todas las tarjetas de la fila, sin
              // importar cuánto texto tenga cada una.
              <div className="mt-auto flex flex-wrap justify-center gap-2 pt-8">
                {release.links.map((link, i) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className={i === 0 ? 'btn btn-primary' : 'btn btn-ghost'}
                  >
                    {ui.music.listenOn} {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      {/* Los temas de 2022-2023 de los que sólo consta el título y el año. Una línea en vez
          de cuatro fichas vacías: ver el final de `content/releases.ts`. Cada título es un
          enlace a su tema en Spotify — antes era texto muerto y había que ir a buscarlos. */}
      {earlierTracks.length > 0 ? (
        <div className="mt-12 border-t border-[var(--color-ink-line)] pt-8">
          <p className="eyebrow mb-4">{ui.music.earlier}</p>
          <ul className="font-(family-name:--font-mono) flex flex-wrap justify-center gap-x-7 gap-y-3 text-sm text-[var(--color-paper-dim)]">
            {earlierTracks.map((track) => (
              <li key={track.title}>
                <a
                  href={track.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="underline-offset-4 transition-colors hover:text-[var(--color-paper)] hover:underline"
                >
                  {track.title} <span className="text-[var(--color-paper-mute)]">{track.year}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  )
}
