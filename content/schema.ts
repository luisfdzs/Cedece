import { z } from 'zod'
// Import RELATIVO y no `@/lib/...` a propósito: `scripts/build-sanity-import.mjs` carga estos
// ficheros con Node a pelo, y Node no sabe nada del alias `@/` de TypeScript. Todo lo que
// `content/` importa tiene que ser resoluble sin el alias, o la migración a Sanity deja de
// funcionar con un error de módulo no encontrado.
import { locales } from '../lib/i18n/config'

/**
 * LA FORMA DEL CONTENIDO, VALIDADA.
 *
 * Estos esquemas son el contrato **común a las dos fuentes**: los cumple lo que hay en
 * `content/` y los cumple lo que viene de Sanity. Es lo que permite que `lib/content.ts`
 * elija fuente sin que el resto de la web se entere de cuál ha elegido.
 *
 * Validar el CMS puede parecer desconfianza, pero es lo contrario: es lo que permite
 * dejar el panel en manos de Cedecé sin miedo. Si un día borra el texto castellano de un
 * tema o pega una URL a medias, el build **falla con un mensaje que dice qué documento y
 * qué campo**, en vez de desplegar una web con un hueco donde iba el título.
 */

/** Un texto traducible. Sólo `es` es obligatorio; el resto cae al castellano al leer. */
export const localized = z.object({
  es: z.string().min(1),
  en: z.string().optional(),
  gl: z.string().optional(),
})
export type Localized = z.infer<typeof localized>

export const localizedList = z.object({
  es: z.array(z.string().min(1)).min(1),
  en: z.array(z.string().min(1)).optional(),
  gl: z.array(z.string().min(1)).optional(),
})
export type LocalizedList = z.infer<typeof localizedList>

/**
 * Fecha en formato `YYYY-MM-DD`.
 *
 * Se valida con expresión regular y **no** con `z.coerce.date()`: convertir a `Date`
 * interpretaría la cadena en UTC y en España eso resta un día a cualquier fecha escrita
 * como día natural. Una fecha de concierto que se muestra un día antes es un error que se
 * nota.
 */
export const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Debe ser una fecha YYYY-MM-DD')

/**
 * CUÁNTO SE SABE DE UNA FECHA.
 *
 * `day` es una fecha comprobada; `month` es «mayo de 2023» y `year` es «2023» a secas. La
 * fecha se escribe siempre completa en `YYYY-MM-DD` para poder ordenar, pero **sólo se
 * muestra hasta donde llega la precisión declarada**.
 *
 * Existe porque las fuentes de esta web son pies de foto de Instagram y una biografía de
 * Spotify, y ahí las fechas vienen como vienen: de «Hipersensible» consta el día (15 de
 * marzo de 2020), del concierto de Olar das Artes sólo que fue en mayo de 2023, y de
 * «Eres» sólo el año. Un booleano `dateIsApproximate` no distinguía esos dos últimos
 * casos, y la diferencia entre «mayo de 2023» y «2023» es justo la información que un
 * programador de sala mira. El campo tiene un coste: cada fecha nueva obliga a decir
 * cuánto se sabe de ella. Es intencionado — es más fácil que colar un día inventado.
 */
export const datePrecisions = ['day', 'month', 'year'] as const
export const datePrecision = z.enum(datePrecisions).default('day')
export type DatePrecision = (typeof datePrecisions)[number]

const credit = z.object({
  role: z.string().min(1),
  who: z.string().min(1),
  url: z.url().optional(),
})

const link = z.object({
  label: z.string().min(1),
  url: z.url(),
})

export const platformKinds = [
  'spotify',
  'youtube',
  'apple',
  'bandcamp',
  'soundcloud',
  'instagram',
  'tiktok',
  'twitter',
  'facebook',
  'other',
] as const

export const artistSchema = z.object({
  name: z.string().min(1),
  tagline: localized,
  roles: z.array(localized).max(4),
  city: z.string().min(1),
  bio: localizedList,
  shortBio: localized.optional(),
  portrait: z
    .object({
      file: z.string().min(1),
      alt: localized,
      credit: z.string().optional(),
    })
    .optional(),
  platforms: z.array(
    z.object({
      kind: z.enum(platformKinds),
      label: z.string().optional(),
      url: z.url(),
      primary: z.boolean().default(false),
    }),
  ),
  bookingEmail: z.string().email().optional(),
  pressKitUrl: z.url().optional(),
})
export type Artist = z.infer<typeof artistSchema>

export const releaseSchema = z.object({
  title: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Sólo minúsculas, números y guiones'),
  kind: z.enum(['album', 'ep', 'single']),
  series: z.string().optional(),
  seriesNumber: z.number().int().positive().optional(),
  releaseDate: isoDate,
  /** Cuando sólo consta el año, la web escribe «2023» en vez de un 1 de enero inventado. */
  datePrecision,
  cover: z.object({ file: z.string().min(1), alt: localized }).optional(),
  about: localizedList.optional(),
  tracks: z.array(z.string().min(1)).optional(),
  credits: z.array(credit).optional(),
  links: z.array(link).optional(),
  featured: z.boolean().default(false),
})
export type Release = z.infer<typeof releaseSchema>

export const videoSchema = z
  .object({
    title: localized,
    kind: z.enum(['takeone', 'live', 'clip', 'other']),
    episode: z.number().int().positive().optional(),
    song: z.string().optional(),
    place: z.string().optional(),
    date: isoDate,
    /** Fichero en `public/video/`. Si está, manda sobre `youtubeId`. */
    file: z.string().optional(),
    /** Bucle mudo de seis segundos para usar de fondo, también en `public/video/`. */
    loop: z.string().optional(),
    youtubeId: z.string().optional(),
    /** Nombre base en `public/posters/`, sin ancho ni extensión. */
    poster: z.string().optional(),
    aspect: z.enum(['vertical', 'horizontal', 'square']).default('vertical'),
    note: localized.optional(),
    credits: z.array(credit).optional(),
    sourceUrl: z.url().optional(),
    featured: z.boolean().default(false),
  })
  .refine((v) => Boolean(v.file ?? v.youtubeId), {
    message: 'Un vídeo sin `file` ni `youtubeId` no se puede reproducir: sobra o falta algo',
    path: ['file'],
  })
  .refine((v) => v.kind !== 'takeone' || v.episode !== undefined, {
    message: 'Las entregas de TAKE ONE se leen en orden: falta el número',
    path: ['episode'],
  })
export type Video = z.infer<typeof videoSchema>

export const showSchema = z.object({
  date: isoDate,
  datePrecision,
  city: z.string().min(1),
  venue: z.string().optional(),
  venueUrl: z.url().optional(),
  tour: z.string().optional(),
  lineup: z.array(z.string().min(1)).optional(),
  format: z.enum(['acoustic', 'band', 'openmic', 'solo']).optional(),
  ticketsUrl: z.url().optional(),
  free: z.boolean().default(false),
  soldOut: z.boolean().default(false),
  note: localized.optional(),
})
export type Show = z.infer<typeof showSchema>

export const photoSchema = z.object({
  /** Nombre base en `public/gallery/`, sin ancho ni extensión. */
  file: z.string().min(1),
  alt: localized,
  caption: localized.optional(),
  place: z.string().optional(),
  date: isoDate.optional(),
  credit: z.string().optional(),
  creditUrl: z.url().optional(),
  orientation: z.enum(['portrait', 'landscape', 'square']).default('portrait'),
})
export type Photo = z.infer<typeof photoSchema>

export const collaboratorSchema = z.object({
  name: z.string().min(1),
  role: localized,
  group: z.enum(['band', 'visual', 'studio', 'feature']),
  handle: z.string().optional(),
  url: z.url().optional(),
})
export type Collaborator = z.infer<typeof collaboratorSchema>

/**
 * LOS TIPOS DE ENTRADA, que son los que usan los ficheros de `content/`.
 *
 * Hay dos tipos por esquema y la diferencia importa: `z.infer` da la forma **después** de
 * validar, donde todo `.default()` ya está resuelto y por tanto es obligatorio; `z.input` da
 * la forma **antes**, donde esos campos se pueden omitir.
 *
 * Los ficheros de `content/` son entrada —se escriben a mano y pasan por `contentSchema.parse`
 * en `lib/content.ts`—, así que se anotan con estos tipos. Si usaran los de salida, TypeScript
 * exigiría escribir `free: false`, `soldOut: false` y `aspect: 'vertical'` en los nueve
 * conciertos y los diez vídeos, que es exactamente el ruido que los `.default()` existen para
 * evitar.
 *
 * La web, en cambio, consume la salida: ahí `show.free` es un booleano y no
 * `boolean | undefined`, y no hay que comprobarlo en cada componente.
 */
export type ArtistInput = z.input<typeof artistSchema>
export type ReleaseInput = z.input<typeof releaseSchema>
export type VideoInput = z.input<typeof videoSchema>
export type ShowInput = z.input<typeof showSchema>
export type PhotoInput = z.input<typeof photoSchema>
export type CollaboratorInput = z.input<typeof collaboratorSchema>

/** Todo el contenido de la web, de una pieza. Es lo que devuelve `lib/content.ts`. */
export const contentSchema = z.object({
  artist: artistSchema,
  releases: z.array(releaseSchema),
  videos: z.array(videoSchema),
  shows: z.array(showSchema),
  photos: z.array(photoSchema),
  collaborators: z.array(collaboratorSchema),
})
export type Content = z.infer<typeof contentSchema>

/**
 * Lee un texto traducible en un idioma, cayendo al castellano.
 *
 * Vive aquí y no en un componente porque **es la regla de los tres idiomas**, y tiene que
 * ser la misma en toda la web: si un texto no está traducido se enseña en castellano, no
 * se deja el hueco. Ver `lib/i18n/config.ts`.
 */
export function pick(value: Localized, locale: string): string {
  if (locale === 'es') return value.es
  const candidate = (value as Record<string, string | undefined>)[locale]
  return candidate && candidate.trim().length > 0 ? candidate : value.es
}

export function pickList(value: LocalizedList, locale: string): string[] {
  if (locale === 'es') return value.es
  const candidate = (value as Record<string, string[] | undefined>)[locale]
  return candidate && candidate.length > 0 ? candidate : value.es
}

/** Se exporta para que `lib/content.ts` no tenga que volver a importar la lista. */
export { locales }
