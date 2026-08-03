import type { Video } from '@/content/schema'
import { pick } from '@/content/schema'
import { formatDate } from '@/lib/format'
import type { Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { Section } from '../ui/Section'
import { VideoFrame } from '../ui/VideoFrame'

/**
 * LOS VÍDEOS, con TAKE ONE por delante.
 *
 * La serie va primero y en tres columnas grandes porque **es lo mejor que tiene**: canciones
 * en directo, a una toma, en la calle de una ciudad distinta cada vez. Es lo que un
 * programador de sala quiere ver antes de dar una fecha, y lo que convence a alguien que no
 * lo conoce en los quince segundos que va a dar.
 *
 * El resto —lanzamientos y directos— va debajo, en una retícula más pequeña.
 *
 * Ninguno de los vídeos se descarga hasta que se pulsa: `VideoFrame` monta el `<video>` con
 * el clic. Con diez vídeos y 28 MB en la página, eso no es una optimización opcional.
 */
/**
 * El ancho de una ficha: una columna en móvil, dos a partir de `sm` y tres a partir de `lg`.
 *
 * **Va en `flex-wrap` con un ancho calculado y no en una retícula de columnas**, y el motivo
 * es la última fila: los siete vídeos que no son TAKE ONE dan 3 + 3 + 1, y en una retícula de
 * tres columnas ese último se queda pegado al borde izquierdo con dos huecos a la derecha. En
 * una web alineada a la izquierda eso no se nota; centrada, es lo primero que se ve. Con
 * `flex-wrap` y `justify-center`, la fila incompleta se centra sola.
 *
 * Los restos de los `gap` van en el cálculo: `gap-8` son 2rem, así que dos columnas se
 * reparten `100% - 2rem` y tres se reparten `100% - 4rem`.
 */
const CARD_WIDTH = 'w-full sm:w-[calc((100%-2rem)/2)] lg:w-[calc((100%-4rem)/3)]'

export function Videos({ videos, locale }: { videos: Video[]; locale: Locale }) {
  const ui = t(locale)

  const takeOne = videos
    .filter((video) => video.kind === 'takeone')
    // Descendente: la última entrega primero, como en cualquier serie.
    .sort((a, b) => (b.episode ?? 0) - (a.episode ?? 0))
  const rest = videos
    .filter((video) => video.kind !== 'takeone')
    .sort((a, b) => b.date.localeCompare(a.date))

  return (
    <Section id="videos" number="02" title={ui.videos.title} lead={ui.videos.lead} tone="soft">
      {takeOne.length > 0 ? (
        <div className="mb-20">
          {/* El filete corto encima y centrado, en vez de la barra lateral que había antes:
              un `border-left` sobre un bloque centrado señala un borde que ya no existe. */}
          <div className="mb-10">
            <hr className="rule-center" aria-hidden />
            <h3 className="mt-5 text-[clamp(1.5rem,4vw,2.25rem)]">{ui.videos.takeoneTitle}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-paper-dim)]">
              {ui.videos.takeoneLead}
            </p>
          </div>

          <ul className="flex flex-wrap justify-center gap-8">
            {takeOne.map((video) => (
              <li key={video.file ?? video.youtubeId} className={CARD_WIDTH}>
                <VideoCard video={video} locale={locale} showEpisode />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {rest.length > 0 ? (
        <ul className="flex flex-wrap justify-center gap-8">
          {rest.map((video) => (
            <li key={video.file ?? video.youtubeId} className={CARD_WIDTH}>
              <VideoCard video={video} locale={locale} />
            </li>
          ))}
        </ul>
      ) : null}
    </Section>
  )
}

function VideoCard({
  video,
  locale,
  showEpisode = false,
}: {
  video: Video
  locale: Locale
  showEpisode?: boolean
}) {
  const ui = t(locale)
  const title = pick(video.title, locale)

  return (
    <article className="flex h-full flex-col">
      {video.file ? (
        <VideoFrame
          file={video.file}
          poster={video.poster}
          label={title}
          aspect={video.aspect}
          playHint={ui.videos.playHint}
        />
      ) : video.youtubeId ? (
        // Sin fichero local se cae al embed. `youtube-nocookie` no deja rastro publicitario
        // en quien sólo pasaba por aquí, y `loading="lazy"` evita que tres iframes de YouTube
        // se carguen antes que el contenido de la página.
        <div className="vframe vframe-horizontal">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}`}
            title={title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      ) : null}

      <div className="pt-5">
        {/* Se compone con un array y se une: encadenar separadores con condicionales en el
            JSX es cómo aparecen los « · · » sueltos cuando falta el lugar.

            `min-h-[3em]` reserva las DOS líneas que este rótulo ocupa cuando el sitio tiene
            nombre largo —«Plaza Mayor de Lugo · 18 de febrero de 2024» envuelve— para que
            los títulos de las tres fichas de una fila queden a la misma altura. Sin la
            reserva, la ficha del rótulo largo empuja su título un renglón más abajo que las
            de al lado y la fila se lee descuadrada. */}
        <p className="eyebrow min-h-[3em]">
          {[
            showEpisode && video.episode ? ui.videos.episode(video.episode) : null,
            video.place,
            formatDate(video.date, 'day', locale),
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>

        {/* `leading-tight` y `mt-3`: el rótulo de arriba envuelve a dos líneas en las fichas
            de título largo, y con menos hueco la tilde de «PARÍS» se subía a la fecha. */}
        <h4 className="font-(family-name:--font-display) mt-3 text-xl leading-tight uppercase">
          {title}
        </h4>

        {video.song ? (
          <p className="font-(family-name:--font-mono) mt-2 text-xs text-[var(--color-paper-dim)]">
            {ui.videos.song}: {video.song}
          </p>
        ) : null}

        {video.note ? (
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[var(--color-paper-dim)]">
            {pick(video.note, locale)}
          </p>
        ) : null}

        {/* El oficio encima del nombre y en `paper-mute`, igual que en las fichas de música y
            por el mismo motivo: en `ink-line` no se leía ninguno. */}
        {video.credits && video.credits.length > 0 ? (
          <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2.5 text-xs">
            {video.credits.map((credit) => (
              <li key={`${credit.role}-${credit.who}`}>
                <span className="block text-[0.6875rem] text-[var(--color-paper-mute)]">
                  {credit.role}
                </span>
                <span className="text-[var(--color-paper-dim)]">{credit.who}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-1 text-xs">
          {video.youtubeId ? (
            <a
              href={`https://youtu.be/${video.youtubeId}`}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[var(--color-velvet)] underline-offset-4 hover:underline"
            >
              {ui.videos.watchOnYoutube}
            </a>
          ) : null}
          {video.sourceUrl ? (
            <a
              href={video.sourceUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-[var(--color-paper-dim)] underline-offset-4 hover:text-[var(--color-paper)] hover:underline"
            >
              {ui.videos.watchOnInstagram}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
