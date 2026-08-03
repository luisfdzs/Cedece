import mediaIndex from '@/public/media-index.json'

/**
 * DE UN NOMBRE BASE A UNAS IMÁGENES QUE EXISTEN.
 *
 * En el contenido las fotos se nombran por su base —`2024-01-19_C2SzMQeocBu_01`— y no por
 * su ruta. Aquí es donde esa base se convierte en los ficheros reales de `public/`.
 *
 * **Los anchos no se suponen: se leen de `public/media-index.json`**, que genera
 * `npm run media:images` a partir de los originales. Eso importa porque los anchos no son
 * los mismos en todas las imágenes: los fotogramas de portada de los vídeos vienen de
 * Instagram a 420 px y de ahí no pasan, mientras que las fotos de la sesión de estudio
 * llegan a 1080. Si esta función escribiera `420, 720, 1080` para todas, el navegador
 * pediría media docena de ficheros que devuelven 404 en cada carga de la galería.
 *
 * **Por qué `<picture>` y no `next/image`:** el cargador de este proyecto
 * (`sanity/imageLoader.ts`) devuelve las rutas locales intactas —no puede hacer otra cosa,
 * no hay nadie transformándolas en tiempo de ejecución—, así que `next/image` no elegiría
 * entre AVIF y WebP: serviría el formato que pusiéramos en `src` a todo el mundo. Con
 * `<picture>` lo elige el navegador, y las dos versiones ya están generadas en disco. Para
 * las imágenes que vengan de Sanity sí se usa `next/image`, porque allí sí hay una CDN
 * detrás que responde a los parámetros.
 */

type MediaEntry = {
  base: string
  kind: string
  width: number | null
  height: number | null
  widths: number[]
  variants: string[]
}

const index = new Map((mediaIndex as MediaEntry[]).map((entry) => [entry.base, entry]))

export type LocalImage = {
  /** `srcset` en AVIF, para el primer `<source>`. */
  avif: string
  /** `srcset` en WebP, para el segundo. */
  webp: string
  /** El `src` de reserva del `<img>`: el WebP más ancho que hay. */
  fallback: string
  width: number
  height: number
}

export function isSanityImage(file: string): boolean {
  return file.startsWith('http')
}

/**
 * Construye los `srcset` de una imagen local. `dir` es la carpeta de `public/` en la que
 * vive: `gallery` para las fotos y `posters` para los fotogramas de los vídeos.
 *
 * Devuelve `null` si la base no está en el índice, y ése es el comportamiento que se
 * quiere: significa que el contenido nombra un fichero que nadie ha generado. El
 * componente que llama enseña un hueco declarado en vez de un `<img>` roto, y el aviso
 * sale en el log del build.
 */
export function localImage(
  base: string,
  dir: 'gallery' | 'posters',
  /**
   * Silencia el aviso cuando la imagen no está.
   *
   * Sirve para las búsquedas **especulativas**: el hero pregunta primero por el fotograma a
   * resolución nativa (`…-frame`) y cae al de Instagram si no lo hay. Ahí la ausencia es un
   * caso previsto, no un error, y avisar por consola en cada build sería ruido que acaba
   * enseñando a ignorar los avisos de verdad.
   */
  options?: { quiet?: boolean },
): LocalImage | null {
  const entry = index.get(base)
  if (!entry || entry.widths.length === 0) {
    if (!options?.quiet) {
      console.warn(
        `[media] «${base}» no está en public/media-index.json. ` +
          `¿Falta ejecutar «npm run media:images» o sobra la referencia en content/?`,
      )
    }
    return null
  }

  const widths = [...entry.widths].sort((a, b) => a - b)
  const srcset = (ext: 'avif' | 'webp') =>
    widths.map((w) => `/${dir}/${base}-${w}.${ext} ${w}w`).join(', ')

  const widest = widths[widths.length - 1] ?? widths[0] ?? 420
  const ratio = entry.width && entry.height ? entry.height / entry.width : 1

  return {
    avif: srcset('avif'),
    webp: srcset('webp'),
    fallback: `/${dir}/${base}-${widest}.webp`,
    width: widest,
    // Se calcula del original y no del fichero generado: es lo que fija la proporción del
    // hueco y evita que el texto salte cuando la imagen acaba de cargar.
    height: Math.round(widest * ratio),
  }
}

/** La ruta de un vídeo de `public/video/`. Un `/` de más aquí es un 404 silencioso. */
export function videoSrc(file: string): string {
  return `/video/${file}`
}
