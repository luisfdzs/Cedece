import { notFound } from 'next/navigation'
import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Gallery } from '@/components/sections/Gallery'
import { Hero } from '@/components/sections/Hero'
import { Live } from '@/components/sections/Live'
import { Music } from '@/components/sections/Music'
import { Videos } from '@/components/sections/Videos'
import { Ticker } from '@/components/ui/Ticker'
import { getContent } from '@/lib/content'
import { isLocale, type Locale } from '@/lib/i18n/config'

/**
 * LA PORTADA — y de momento la única página.
 *
 * Todo en una sola página con seis secciones ancladas, no en seis rutas. Es una decisión y
 * tiene un motivo concreto: **el público de esta web llega desde un enlace en una historia de
 * Instagram y le va a dar treinta segundos.** En ese tiempo, hacer clic para cambiar de página
 * es una barrera; deslizar no lo es. Seis rutas separadas, además, competirían entre ellas en
 * Google por la búsqueda que importa, que es «Cedecé».
 *
 * El día que haya suficiente material para una ficha por lanzamiento, `release.slug` ya está
 * en el modelo esperando a ser una URL (`/es/musica/cuentos-de-dragones`).
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw as Locale

  const { artist, releases, videos, shows, photos, collaborators } = await getContent()

  /**
   * El vídeo de fondo del hero: el primer TAKE ONE que tenga bucle mudo generado.
   *
   * Se busca por `loop` y no por `featured` ni por el primero de la lista: sin el corte mudo
   * el `autoPlay` no arranca en ningún navegador, y el hero se quedaría en el fotograma fijo
   * sin que nada lo avisara. Si no hay ninguno, `Hero` funciona igual y enseña sólo el
   * degradado — está preparado para eso.
   */
  const backdrop = videos.find((video) => video.kind === 'takeone' && video.loop) ?? undefined

  /**
   * Y SI HAY TAKE ONE PERO NINGUNO TRAE BUCLE, SE DICE.
   *
   * Que el hero aguante sin vídeo es una virtud del componente, no una excusa para que la
   * portada se apague sin que nadie se entere: es exactamente lo que pasó al enchufar el
   * panel, porque el esquema de Sanity no tenía el campo `loop`. La web se veía «bien».
   */
  if (!backdrop && videos.some((video) => video.kind === 'takeone')) {
    console.warn(
      '[hero] Hay vídeos de TAKE ONE pero ninguno con `loop`: la portada se queda sin fondo. ' +
        '¿Falta ejecutar «npm run media:videos», o el campo no llegó desde Sanity?',
    )
  }

  /**
   * La cinta: los sitios donde ha tocado y los títulos de los temas, mezclados.
   *
   * Sale del contenido y no de una lista escrita a mano, así que cuando se añada un concierto
   * en Coruña o un tema nuevo, la cinta lo dice sola. `Set` porque Vigo y Lugo se repiten
   * varias veces entre los conciertos y la cinta no puede ser «Vigo · Vigo · Vigo».
   */
  const tickerItems = [
    ...new Set([
      ...shows.map((show) => show.city),
      ...releases.map((release) => release.title),
      ...videos.filter((video) => video.place).map((video) => video.place as string),
    ]),
  ]

  return (
    <>
      <Hero artist={artist} backdrop={backdrop} locale={locale} />
      <Ticker items={tickerItems} />
      <Music releases={releases} locale={locale} />
      <Videos videos={videos} locale={locale} />
      <Live shows={shows} artist={artist} locale={locale} />
      <About artist={artist} collaborators={collaborators} locale={locale} />
      <Gallery photos={photos} locale={locale} />
      <Contact artist={artist} locale={locale} />
    </>
  )
}
