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
      <div className="mb-12">
        <h3 className="mb-5 text-xl">{ui.live.upcoming}</h3>

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
          <div className="rounded-(--radius-card) border border-dashed border-[var(--color-ink-line)] p-6 md:p-8">
            <p className="font-(family-name:--font-display) text-2xl uppercase">{ui.live.none}</p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-[var(--color-paper-dim)]">
              {ui.live.noneHint}
            </p>
            {artist.bookingEmail ? (
              <a href={`mailto:${artist.bookingEmail}`} className="btn btn-primary mt-5">
                {ui.contact.booking}
              </a>
            ) : (
              <a href="#contacto" className="btn btn-ghost mt-5">
                {ui.contact.booking}
              </a>
            )}
          </div>
        )}
      </div>

      {/* La gira de 2023 como texto: su valor no está en las fechas —que casi no constan—
          sino en lo que fue. Ver `content/shows.ts`. */}
      <div className="mb-12 border-l-2 border-[var(--color-velvet)] pl-4">
        <p className="eyebrow">{tour.year}</p>
        <h3 className="mt-1 text-2xl">{tour.name}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-paper-dim)]">
          {pick(tour.summary, locale)}
        </p>
      </div>

      {past.length > 0 ? (
        <div>
          <h3 className="mb-5 text-xl">{ui.live.past}</h3>
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

  return (
    <li className={upcoming ? 'py-4' : 'py-4 opacity-70 transition-opacity hover:opacity-100'}>
      <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-6">
        <p className="font-(family-name:--font-mono) shrink-0 text-xs tracking-[0.08em] text-[var(--color-paper-dim)] uppercase md:w-44">
          {formatDate(show.date, show.datePrecision, locale)}
        </p>

        <div className="min-w-0 flex-1">
          <p className="font-(family-name:--font-display) text-lg uppercase">
            {show.city}
            {show.venue ? (
              <span className="text-[var(--color-paper-dim)]"> · {show.venue}</span>
            ) : null}
          </p>

          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--color-paper-dim)]">
            {show.format ? <span>{ui.live.formats[show.format]}</span> : null}
            {show.lineup && show.lineup.length > 0 ? (
              <span>
                {ui.live.with} {show.lineup.join(', ')}
              </span>
            ) : null}
            {show.tour ? <span className="italic">{show.tour}</span> : null}
          </p>

          {show.note ? (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-paper-dim)]">
              {pick(show.note, locale)}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center gap-2">
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
      </div>
    </li>
  )
}
