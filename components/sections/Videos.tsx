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
        <div className="mb-16">
          <div className="mb-8 border-l-2 border-[var(--color-velvet)] pl-4">
            <h3 className="text-[clamp(1.5rem,4vw,2.25rem)]">{ui.videos.takeoneTitle}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--color-paper-dim)]">
              {ui.videos.takeoneLead}
            </p>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {takeOne.map((video) => (
              <li key={video.file ?? video.youtubeId}>
                <VideoCard video={video} locale={locale} showEpisode />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {rest.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((video) => (
            <li key={video.file ?? video.youtubeId}>
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

      <div className="pt-4">
        {/* Se compone con un array y se une: encadenar separadores con condicionales en el
            JSX es cómo aparecen los « · · » sueltos cuando falta el lugar. */}
        <p className="eyebrow">
          {[
            showEpisode && video.episode ? ui.videos.episode(video.episode) : null,
            video.place,
            formatDate(video.date, 'day', locale),
          ]
            .filter(Boolean)
            .join(' · ')}
        </p>

        <h4 className="font-(family-name:--font-display) mt-2 text-xl uppercase">{title}</h4>

        {video.song ? (
          <p className="font-(family-name:--font-mono) mt-1 text-xs text-[var(--color-paper-dim)]">
            {ui.videos.song}: {video.song}
          </p>
        ) : null}

        {video.note ? (
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-paper-dim)]">
            {pick(video.note, locale)}
          </p>
        ) : null}

        {video.credits && video.credits.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-[var(--color-paper-dim)]">
            {video.credits.map((credit) => (
              <li key={`${credit.role}-${credit.who}`}>
                <span className="text-[var(--color-ink-line)]">{credit.role}:</span> {credit.who}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs">
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
