import Image from 'next/image'
import { cn } from '@/lib/cn'
import { isSanityImage, localImage } from '@/lib/media'

/**
 * UNA IMAGEN, DE LA FUENTE QUE SEA.
 *
 * El contenido puede nombrar una imagen de dos maneras y este componente es el único sitio
 * de la web que tiene que saberlo:
 *
 *   · Un nombre base (`2024-01-19_C2SzMQeocBu_01`) → está en `public/`, ya generada en AVIF
 *     y WebP a varios anchos por `npm run media:images`. Se sirve con `<picture>` para que
 *     el navegador elija el formato; ver el razonamiento en `lib/media.ts`.
 *   · Una URL de la CDN de Sanity → la subió alguien al panel. Ahí sí hay una CDN que
 *     redimensiona al vuelo, así que se usa `next/image` con el cargador del proyecto.
 *
 * Si la base no existe en el índice **se dibuja un hueco tramado**, no un `<img>` roto ni
 * un `null` silencioso. Es deliberado: un hueco visible en la galería se arregla; una foto
 * que desaparece sin más no se nota hasta que alguien pregunta por ella.
 */
type Props = {
  file: string
  alt: string
  dir?: 'gallery' | 'posters'
  className?: string
  sizes?: string
  /** Sólo la primera imagen de la portada. El resto se cargan al acercarse. */
  priority?: boolean
}

export function Photo({
  file,
  alt,
  dir = 'gallery',
  className,
  sizes = '(min-width: 80rem) 20vw, (min-width: 48rem) 30vw, 50vw',
  priority = false,
}: Props) {
  if (isSanityImage(file)) {
    return (
      <Image
        src={file}
        alt={alt}
        // Sanity no dice las dimensiones en la URL y `fill` no las necesita: el hueco lo
        // fija el contenedor, que en esta web siempre tiene proporción declarada.
        fill
        sizes={sizes}
        quality={85}
        priority={priority}
        className={cn('object-cover', className)}
      />
    )
  }

  const image = localImage(file, dir)
  if (!image) {
    return (
      <div
        aria-hidden
        className={cn(
          'h-full w-full bg-[repeating-linear-gradient(45deg,var(--color-ink-soft)_0_8px,var(--color-ink-line)_8px_16px)]',
          className,
        )}
      />
    )
  }

  return (
    <picture>
      <source type="image/avif" srcSet={image.avif} sizes={sizes} />
      <source type="image/webp" srcSet={image.webp} sizes={sizes} />
      <img
        src={image.fallback}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={priority ? 'eager' : 'lazy'}
        // `high` sólo en la que decide la primera impresión; el resto compiten con el vídeo
        // del hero por el ancho de banda y no deben ganarle.
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className={cn('h-full w-full object-cover', className)}
      />
    </picture>
  )
}
