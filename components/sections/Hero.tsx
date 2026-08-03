import type { Artist, Video } from '@/content/schema'
import { pick } from '@/content/schema'
import { localImage, videoSrc } from '@/lib/media'
import type { Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { PlatformIcon, platformLabel } from '../ui/PlatformIcon'

/**
 * LA PRIMERA PANTALLA.
 *
 * De fondo, **un bucle mudo de seis segundos** de un TAKE ONE: él cantando en la calle. Es
 * la mejor imagen que hay de lo que hace, y se mueve, que es lo que distingue una web de
 * artista de un cartel. Sale de `scripts/build-videos.mjs`, que genera esos cortes aparte
 * precisamente para esto.
 *
 * **Va mudo por obligación, no por gusto:** ningún navegador reproduce solo un vídeo con
 * pista de audio. Por eso el corte se genera con `-an` y por eso el vídeo lleva `muted`
 * además de `autoPlay` — sin `muted`, `autoPlay` se ignora y el hero se queda en el
 * fotograma fijo.
 *
 * `poster` es el fotograma de portada en JPEG: es lo que se ve mientras el vídeo llega, y
 * lo que se queda si el navegador decide no reproducirlo (ahorro de datos, batería baja).
 * El hero **tiene que funcionar sin el vídeo**, y con el póster funciona.
 *
 * El contraste lo da `.hero-veil`, anclado al texto y con los topes en `rem`. Los dos
 * textos que fallan primero encima de una imagen en movimiento son la frase y los tres
 * rótulos pequeños — no el nombre, que ocupa media pantalla. Ver el bloque «HERO» de
 * `globals.css`.
 */
/**
 * Plataformas donde el verbo es «ver» y no «escuchar». Se decide por el tipo de plataforma
 * y no por el orden de la lista: si mañana Spotify deja de ser el primero, el botón de
 * YouTube seguiría diciendo «Escuchar».
 */
const WATCHABLE = new Set<Artist['platforms'][number]['kind']>([
  'youtube',
  'tiktok',
  'instagram',
  'facebook',
])

export function Hero({
  artist,
  backdrop,
  locale,
}: {
  artist: Artist
  backdrop?: Video
  locale: Locale
}) {
  const ui = t(locale)
  const primary = artist.platforms.filter((platform) => platform.primary)

  /**
   * El fotograma de portada, resuelto por el índice de medios y **no construido a mano**.
   *
   * Aquí había un fallo real: la ruta se escribía como `${poster}-420.webp` y daba 404, porque
   * el fotograma de este vídeo mide 408 px de ancho y no 420 — los pósters vienen de Instagram
   * con el ancho que Instagram quiera. El resultado era un hero sin nada mientras el vídeo
   * cargaba, y en un navegador que decida no reproducirlo, un hero negro para siempre.
   *
   * `localImage` lee los anchos que existen de verdad de `public/media-index.json`. Es
   * exactamente lo que ese fichero existe para evitar, así que **el ancho no se escribe a
   * mano en ningún sitio**.
   */
  const posterImage = backdrop?.poster
    ? // Primero el fotograma sacado del propio vídeo a resolución nativa (720 px), y sólo si no
      // está, el de Instagram (408 px). El hero lo estira a sangre y la diferencia se ve.
      (localImage(`${backdrop.poster}-frame`, 'posters', { quiet: true }) ??
      localImage(backdrop.poster, 'posters'))
    : null

  return (
    <section className="hero">
      {backdrop?.loop ? (
        <video
          className="hero-media"
          src={videoSrc(backdrop.loop)}
          poster={posterImage?.fallback}
          autoPlay
          muted
          loop
          playsInline
          // No es contenido: es fondo. Un lector de pantalla no tiene nada que decir de él.
          aria-hidden
          tabIndex={-1}
          preload="metadata"
        />
      ) : null}
      <div className="hero-veil" aria-hidden />

      <div className="mx-auto w-full max-w-6xl px-(--spacing-gutter) pt-32 pb-16 md:pb-24">
        {/* `mb-9` en la fila de rótulos: la tilde de la É del nombre sube por encima de la
            altura de mayúscula y con menos hueco se mete en esa banda. */}
        {artist.roles.length > 0 ? (
          <ul className="mb-9 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            {artist.roles.map((role, i) => (
              <li key={i} className="eyebrow text-[var(--color-paper)]">
                {pick(role, locale)}
                {i < artist.roles.length - 1 ? (
                  <span aria-hidden className="ml-3 text-[var(--color-velvet)]">
                    ·
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        <h1 className="hero-name">{artist.name}</h1>

        {/* `mt-7` y no `mt-6`: el nombre ocupa media pantalla y su caja tipográfica acaba
            justo donde acaban las letras, así que la frase necesita aire de verdad para no
            parecer pegada al rótulo. */}
        <p className="mx-auto mt-7 max-w-xl text-lg leading-snug text-[var(--color-paper)] md:text-2xl">
          {pick(artist.tagline, locale)}
        </p>

        <p className="eyebrow mt-5">{artist.city}</p>

        {primary.length > 0 ? (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {primary.map((platform, i) => {
              const isFirst = i === 0
              return (
                <a
                  key={platform.url}
                  href={platform.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  // Un solo botón rojo por pantalla: el primero. El resto son fantasma, o
                  // dejarían de significar «esto es lo que hay que pulsar».
                  className={isFirst ? 'btn btn-primary' : 'btn btn-ghost'}
                >
                  <PlatformIcon kind={platform.kind} />
                  {WATCHABLE.has(platform.kind) ? ui.hero.watch : ui.hero.listen}
                  <span className={isFirst ? 'text-white/70' : 'text-[var(--color-paper-dim)]'}>
                    {platformLabel(platform.kind, platform.label)}
                  </span>
                </a>
              )
            })}
          </div>
        ) : null}
      </div>
    </section>
  )
}
