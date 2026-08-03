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
 * y de Spotify no se descargaron. Así que la tarjeta se sostiene sobre tipografía —el título
 * en la condensada pesada, el año en grande al lado— en vez de dejar un cuadrado gris
 * esperando una imagen.
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
            className="group flex flex-col rounded-(--radius-card) border border-[var(--color-ink-line)] bg-[var(--color-ink-soft)] p-6 transition-colors hover:border-[var(--color-velvet-dim)] md:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="eyebrow">
                  {kindLabel[release.kind]}
                  {release.series && release.seriesNumber ? (
                    <>
                      {' · '}
                      {ui.music.seriesEntry(release.series, release.seriesNumber)}
                    </>
                  ) : null}
                </p>
                <h3 className="mt-2 text-[clamp(1.75rem,4.5vw,2.75rem)]">{release.title}</h3>
              </div>

              {release.cover ? (
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-(--radius-card)">
                  <Photo
                    file={release.cover.file}
                    alt=""
                    sizes="80px"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                // Sin portada, el año hace de ancla visual en la esquina. Es lo que
                // mantiene la retícula con ritmo cuando ninguna ficha tiene imagen.
                <p
                  aria-hidden
                  className="font-(family-name:--font-display) shrink-0 text-4xl leading-none text-[var(--color-ink-line)] transition-colors group-hover:text-[var(--color-velvet-dim)] md:text-5xl"
                >
                  {year(release.releaseDate)}
                </p>
              )}
            </div>

            {/*
              La fecha se calla cuando no añade nada. Si de un lanzamiento sólo consta el
              año y la ficha no tiene portada, el año ya está escrito en grande en la
              esquina: repetirlo debajo dejaba «QUÍTAME / 2025 / 2025». Con portada sí se
              escribe, porque entonces el número de la esquina no existe.
            */}
            {release.datePrecision !== 'year' || release.cover ? (
              <p className="font-(family-name:--font-mono) mt-3 text-xs tracking-[0.08em] text-[var(--color-paper-dim)] uppercase">
                {formatDate(release.releaseDate, release.datePrecision, locale)}
              </p>
            ) : null}

            {release.about ? (
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-[var(--color-paper-dim)]">
                {pickList(release.about, locale).map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            ) : null}

            {release.tracks && release.tracks.length > 0 ? (
              <div className="mt-4">
                <p className="eyebrow mb-2">{ui.music.tracks}</p>
                <ol className="font-(family-name:--font-mono) space-y-1 text-xs text-[var(--color-paper-dim)]">
                  {release.tracks.map((track, i) => (
                    <li key={track}>
                      <span className="mr-2 text-[var(--color-ink-line)]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {track}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}

            {release.credits && release.credits.length > 0 ? (
              <div className="mt-4">
                <p className="eyebrow mb-2">{ui.music.credits}</p>
                <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-paper-dim)]">
                  {release.credits.map((credit) => (
                    <li key={`${credit.role}-${credit.who}`}>
                      <span className="text-[var(--color-ink-line)]">{credit.role}:</span>{' '}
                      {credit.who}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {release.links && release.links.length > 0 ? (
              // `mt-auto` alinea los botones al pie de todas las tarjetas de la fila, sin
              // importar cuánto texto tenga cada una.
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
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
          de cuatro fichas vacías: ver el final de `content/releases.ts`. */}
      {earlierTracks.length > 0 ? (
        <div className="mt-10 border-t border-[var(--color-ink-line)] pt-6">
          <p className="eyebrow mb-3">{ui.music.earlier}</p>
          <ul className="font-(family-name:--font-mono) flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-paper-dim)]">
            {earlierTracks.map((track) => (
              <li key={track.title}>
                {track.title} <span className="text-[var(--color-ink-line)]">{track.year}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  )
}
