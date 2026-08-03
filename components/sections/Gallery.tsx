import type { Photo as PhotoType } from '@/content/schema'
import { pick } from '@/content/schema'
import { cn } from '@/lib/cn'
import type { Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { Photo } from '../ui/Photo'
import { Section } from '../ui/Section'

/**
 * LA GALERÍA.
 *
 * Retícula de tejas donde **las verticales ocupan dos filas**. Es lo que usa el campo
 * `orientation` del contenido, y por eso ese campo existe: sin él, meter un retrato vertical
 * en un hueco horizontal obliga a recortarlo por la mitad, y en estas fotos lo que se pierde
 * al recortar es la cara.
 *
 * El crédito del fotógrafo va **visible sobre la propia foto**, no escondido en el `alt` ni
 * en un `title`. Es su trabajo y tiene que leerse sin pasar el ratón — y en un móvil no hay
 * ratón que pasar.
 *
 * Sin visor a pantalla completa: sería el primer componente de cliente de esta sección, con
 * su gestión de foco y de la tecla Escape, y para 31 fotos de Instagram que ya se ven bien a
 * este tamaño no lo justifica. Queda apuntado en el README como mejora, no como deuda.
 */
export function Gallery({ photos, locale }: { photos: PhotoType[]; locale: Locale }) {
  const ui = t(locale)
  if (photos.length === 0) return null

  return (
    <Section id="galeria" number="05" title={ui.gallery.title} lead={ui.gallery.lead}>
      <ul className="grid-gallery">
        {photos.map((photo) => (
          <li
            key={photo.file}
            className={cn('tile group', photo.orientation === 'portrait' && 'tile-portrait')}
          >
            <Photo
              file={photo.file}
              alt={pick(photo.alt, locale)}
              sizes="(min-width: 80rem) 17vw, (min-width: 48rem) 25vw, 50vw"
            />

            {photo.credit || photo.place ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-2 pt-8 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none">
                {photo.place ? (
                  <p className="font-(family-name:--font-mono) text-[0.625rem] tracking-[0.08em] text-white uppercase">
                    {photo.place}
                  </p>
                ) : null}
                {photo.credit ? (
                  <p className="text-[0.625rem] text-white/70">
                    {ui.gallery.photoBy} {photo.credit}
                  </p>
                ) : null}
              </div>
            ) : null}
          </li>
        ))}
      </ul>

      {/* En móvil el `hover` no existe, así que los créditos de arriba no se ven nunca. Los
          nombres se repiten aquí en una línea para que el crédito no dependa del ratón. */}
      <p className="mx-auto mt-8 max-w-xl text-xs leading-relaxed text-[var(--color-paper-dim)]">
        <span className="text-[var(--color-paper-mute)]">{ui.gallery.photoBy}</span>{' '}
        {[...new Set(photos.map((photo) => photo.credit).filter(Boolean))].join(' · ')}
      </p>
    </Section>
  )
}
