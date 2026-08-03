import type { Artist, Show } from '@/content/schema'
import { pick } from '@/content/schema'
import { tour } from '@/content/shows'
import { formatDate, isUpcoming } from '@/lib/format'
import type { Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { Section } from '../ui/Section'

/**
 * EL DIRECTO.
 *
 * **El estado vacío es la parte importante de esta sección, no un caso extremo.** Hoy no hay
 * ninguna fecha futura: la última confirmada fue el 1 de marzo de 2024 en el Belmont de Vigo,
 * que es también la última publicación de su Instagram. Así que lo que casi siempre se va a
 * ver aquí es el mensaje de «no hay fechas anunciadas».
 *
 * Y ese mensaje **no disimula**: dice cuál fue la última y ofrece el correo de contratación.
 * La alternativa habitual —esconder la sección cuando está vacía— es peor por dos razones: un
 * promotor que busca «¿este tío toca?» se queda sin respuesta, y el historial de conciertos,
 * que es el argumento de verdad, desaparece con ella.
 *
 * Por eso los pasados no se borran nunca. Ocho conciertos documentados, la mayoría de la
 * gira «Más abierto que nunca», valen más que una sección vacía y limpia.
 *
 * El reparto entre próximos y pasados se decide **el día del despliegue** (ver `lib/format.ts`
 * y la nota de `next.config.ts`): no se lee el reloj en el render.
 */
export function Live({ shows, artist, locale }: { shows: Show[]; artist: Artist; locale: Locale }) {
  const ui = t(locale)

  const sorted = [...shows].sort((a, b) => b.date.localeCompare(a.date))
  const upcoming = sorted.filter((show) => isUpcoming(show.date)).reverse()
  const past = sorted.filter((show) => !isUpcoming(show.date))

  return (
    <Section id="directo" number="03" title={ui.live.title} lead={ui.live.lead}>
      <div className="mb-16">
        <h3 className="mb-6 text-xl">{ui.live.upcoming}</h3>

        {upcoming.length > 0 ? (
          <ul className="divide-y divide-[var(--color-ink-line)] border-y border-[var(--color-ink-line)]">
            {upcoming.map((show, i) => (
              <ShowRow
                key={`${show.date}-${show.city}-${i}`}
                show={show}
                locale={locale}
                upcoming
              />
            ))}
          </ul>
        ) : (
          <div className="mx-auto max-w-2xl rounded-(--radius-card) border border-dashed border-[var(--color-ink-line)] p-8 md:p-10">
            <p className="font-(family-name:--font-display) text-2xl uppercase">{ui.live.none}</p>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[var(--color-paper-dim)]">
              {ui.live.noneHint}
            </p>
            {artist.bookingEmail ? (
              <a href={`mailto:${artist.bookingEmail}`} className="btn btn-primary mt-6">
                {ui.contact.booking}
              </a>
            ) : (
              <a href="#contacto" className="btn btn-ghost mt-6">
                {ui.contact.booking}
              </a>
            )}
          </div>
        )}
      </div>

      {/* La gira de 2023 como texto: su valor no está en las fechas —que casi no constan—
          sino en lo que fue. Ver `content/shows.ts`. */}
      <div className="mx-auto mb-16 max-w-2xl">
        <hr className="rule-center" aria-hidden />
        <p className="eyebrow mt-5">{tour.year}</p>
        <h3 className="mt-2 text-2xl">{tour.name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-[var(--color-paper-dim)]">
          {pick(tour.summary, locale)}
        </p>
      </div>

      {past.length > 0 ? (
        <div>
          <h3 className="mb-6 text-xl">{ui.live.past}</h3>
          <ul className="divide-y divide-[var(--color-ink-line)] border-y border-[var(--color-ink-line)]">
            {past.map((show, i) => (
              <ShowRow key={`${show.date}-${show.city}-${i}`} show={show} locale={locale} />
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  )
}

function ShowRow({
  show,
  locale,
  upcoming = false,
}: {
  show: Show
  locale: Locale
  upcoming?: boolean
}) {
  const ui = t(locale)

  /**
   * Cada concierto es un BLOQUE APILADO Y CENTRADO, no una fila de tres columnas.
   *
   * La fila de antes ponía la fecha en una columna fija de `11rem`, el sitio en el medio y
   * las etiquetas a la derecha. Ese reparto tiene sentido cuando se leen veinte fechas
   * seguidas y hace falta la columna de fechas alineada para recorrerla con la vista; con
   * ocho conciertos y ninguno futuro, lo que queda es una fila con la mitad derecha vacía
   * y una nota de dos líneas colgando de la columna del medio.
   *
   * Apilado, la fecha sigue siendo lo primero que se lee de cada bloque —que es lo que
   * busca quien programa una sala— y el separador entre filas hace el resto.
   */
  return (
    <li
      className={
        upcoming
          ? 'py-7'
          : 'py-7 opacity-70 transition-opacity hover:opacity-100 focus-within:opacity-100'
      }
    >
      <p className="font-(family-name:--font-mono) text-xs tracking-[0.08em] text-[var(--color-paper-dim)] uppercase">
        {formatDate(show.date, show.datePrecision, locale)}
      </p>

      <p className="font-(family-name:--font-display) mt-2 text-lg leading-tight uppercase">
        {show.city}
        {show.venue ? <span className="text-[var(--color-paper-dim)]"> · {show.venue}</span> : null}
      </p>

      <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[var(--color-paper-mute)]">
        {show.format ? <span>{ui.live.formats[show.format]}</span> : null}
        {show.lineup && show.lineup.length > 0 ? (
          <span>
            {ui.live.with} {show.lineup.join(', ')}
          </span>
        ) : null}
        {show.tour ? <span className="italic">{show.tour}</span> : null}
      </p>

      {show.note ? (
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-paper-dim)]">
          {pick(show.note, locale)}
        </p>
      ) : null}

      {show.soldOut || show.free || (show.ticketsUrl && !show.soldOut) ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {show.soldOut ? (
            <span className="chip text-[var(--color-velvet)]">{ui.live.soldOut}</span>
          ) : null}
          {show.free ? <span className="chip text-[var(--color-acid)]">{ui.live.free}</span> : null}
          {show.ticketsUrl && !show.soldOut ? (
            <a
              href={show.ticketsUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn btn-primary"
            >
              {ui.live.tickets}
            </a>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}
