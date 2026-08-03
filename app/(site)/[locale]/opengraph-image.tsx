import { ImageResponse } from 'next/og'
import { pick } from '@/content/schema'
import { getContent } from '@/lib/content'
import { isLocale } from '@/lib/i18n/config'

/**
 * LA IMAGEN QUE SE VE AL COMPARTIR EL ENLACE.
 *
 * Es la pieza con más rendimiento por línea de código de toda la web: **el enlace de esta
 * página se va a pegar sobre todo en historias de Instagram y en WhatsApp**, y ahí lo que
 * decide si alguien pulsa es esta imagen, no el título.
 *
 * Se genera en el build a partir del contenido, así que si cambia la frase del hero cambia
 * también aquí. Tipografía del sistema y no Anton: `next/og` necesitaría cargar el fichero de
 * la fuente y eso son 40 KB por idioma a cambio de una imagen que nadie mira de cerca.
 */
export const alt = 'Cedecé'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const { artist } = await getContent()
  const tagline = isLocale(locale) ? pick(artist.tagline, locale) : artist.tagline.es

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0b0b0d',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 72,
        fontFamily: 'sans-serif',
      }}
    >
      {/* El filete rojo de arriba es el único elemento de marca que sobrevive a un
            recorte cuadrado en WhatsApp. */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 12,
          background: '#d81f36',
        }}
      />
      <div
        style={{
          display: 'flex',
          fontSize: 26,
          letterSpacing: 6,
          color: '#a8a4a0',
          textTransform: 'uppercase',
        }}
      >
        {artist.city}
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 190,
          fontWeight: 900,
          letterSpacing: -6,
          color: '#f4f1ec',
          textTransform: 'uppercase',
          lineHeight: 1,
          marginTop: 12,
        }}
      >
        Cedecé
      </div>
      <div
        style={{
          display: 'flex',
          fontSize: 38,
          color: '#f4f1ec',
          marginTop: 26,
          maxWidth: 900,
          lineHeight: 1.25,
        }}
      >
        {tagline}
      </div>
    </div>,
    size,
  )
}
