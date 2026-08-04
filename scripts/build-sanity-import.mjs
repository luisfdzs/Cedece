/**
 * DE `content/` A SANITY.
 *
 * Convierte el contenido del repositorio en un NDJSON que el CLI de Sanity importa. Es el paso 3
 * de «Puesta en marcha del panel» del README, y existe por una razón concreta: **para que el panel
 * arranque con lo que ya se ve en la web, y no en blanco.**
 *
 * Un panel vacío el primer día es la forma más rápida de que no se use nunca: quien entra tiene que
 * escribir de cero once colaboradores, ocho conciertos y diez vídeos antes de que la web enseñe lo
 * mismo que enseñaba antes de enchufar el panel.
 *
 * Se ejecuta con Node a pelo, aprovechando que Node 24 quita los tipos de TypeScript solo. Por eso
 * `content/` no puede usar el alias `@/` — está avisado en `content/schema.ts`.
 *
 * ⚠️ **Las imágenes y los vídeos NO se suben.** Aquí sólo viajan las rutas que ya están en
 * `public/`, en los campos `localFile`, `file` y `poster`, que es exactamente para lo que existen
 * esos campos en los esquemas. Subir 38 MB de vídeo al plan gratuito de Sanity no es el plan; el
 * porqué está en la cabecera de `sanity/schemas/video.ts`.
 *
 *   npm run migrate:build     # genera scripts/migration/import.ndjson
 *   npm run migrate:import    # lo importa (--replace)
 */
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { artist } from '../content/artist.ts'
import { collaborators } from '../content/collaborators.ts'
import { photos } from '../content/photos.ts'
import { releases } from '../content/releases.ts'
import { shows } from '../content/shows.ts'
import { videos } from '../content/videos.ts'

const OUT = path.join('scripts', 'migration', 'import.ndjson')

/**
 * `orderRank` para `@sanity/orderable-document-list`.
 *
 * El plugin ordena alfabéticamente por esta cadena, así que un contador `1, 2, … 11` colocaría el
 * 11 entre el 1 y el 2. Con relleno a la izquierda el orden alfabético coincide con el numérico, y
 * el salto de 10 en 10 deja hueco para arrastrar un documento entre dos sin renumerar el resto.
 */
const rank = (i) => String((i + 1) * 10).padStart(6, '0')

/** Los `_id` son deterministas para que reimportar actualice en vez de duplicar. */
const slug = (value) =>
  String(value)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

/** Quita las claves `undefined`: Sanity las rechaza y `JSON.stringify` no las borra dentro de arrays. */
const clean = (value) => {
  if (Array.isArray(value)) return value.map(clean)
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, clean(v)]),
    )
  }
  return value
}

/** Los objetos dentro de un array necesitan `_key` o el panel no los puede reordenar. */
const keyed = (items, prefix) =>
  (items ?? []).map((item, i) => ({ ...item, _key: `${prefix}${i}` }))

const docs = []

// ─── El artista (singleton) ───────────────────────────────────────────────────
// `_id: 'artist'` fijo: es lo que `sanity/structure.ts` abre directo, y lo que hace que el
// documento sea de verdad único.
docs.push({
  _id: 'artist',
  _type: 'artist',
  name: artist.name,
  tagline: artist.tagline,
  roles: keyed(artist.roles, 'role'),
  city: artist.city,
  bio: artist.bio,
  shortBio: artist.shortBio,
  platforms: keyed(artist.platforms, 'plat'),
  bookingEmail: artist.bookingEmail,
  pressKitUrl: artist.pressKitUrl,
  // El retrato no se sube: se queda como está en public/. Ver el aviso de la cabecera.
})

// ─── Música ──────────────────────────────────────────────────────────────────
releases.forEach((release, i) => {
  docs.push({
    _id: `release-${release.slug}`,
    _type: 'release',
    orderRank: rank(i),
    title: release.title,
    slug: { _type: 'slug', current: release.slug },
    kind: release.kind,
    series: release.series,
    seriesNumber: release.seriesNumber,
    releaseDate: release.releaseDate,
    datePrecision: release.datePrecision ?? 'day',
    about: release.about,
    tracks: release.tracks,
    credits: keyed(release.credits, 'cr'),
    links: keyed(release.links, 'ln'),
    featured: release.featured ?? false,
  })
})

// ─── Vídeos ──────────────────────────────────────────────────────────────────
videos.forEach((video, i) => {
  docs.push({
    _id: `video-${slug(video.title.es)}`,
    _type: 'video',
    orderRank: rank(i),
    title: video.title,
    kind: video.kind,
    episode: video.episode,
    song: video.song,
    place: video.place,
    date: video.date,
    file: video.file,
    loop: video.loop,
    youtubeId: video.youtubeId,
    poster: video.poster,
    aspect: video.aspect ?? 'vertical',
    note: video.note,
    credits: keyed(video.credits, 'cr'),
    sourceUrl: video.sourceUrl,
    featured: video.featured ?? false,
  })
})

// ─── Directo ─────────────────────────────────────────────────────────────────
// Sin `orderRank`: los conciertos se ordenan por fecha. Ver el punto 3 de `sanity/structure.ts`.
shows.forEach((show) => {
  docs.push({
    _id: `show-${show.date}-${slug(show.city)}`,
    _type: 'show',
    date: show.date,
    datePrecision: show.datePrecision ?? 'day',
    city: show.city,
    venue: show.venue,
    venueUrl: show.venueUrl,
    tour: show.tour,
    lineup: show.lineup,
    format: show.format,
    ticketsUrl: show.ticketsUrl,
    free: show.free ?? false,
    soldOut: show.soldOut ?? false,
    note: show.note,
  })
})

// ─── Galería ─────────────────────────────────────────────────────────────────
photos.forEach((photo, i) => {
  docs.push({
    _id: `photo-${slug(photo.file)}`,
    _type: 'photo',
    orderRank: rank(i),
    localFile: photo.file,
    alt: photo.alt,
    caption: photo.caption,
    place: photo.place,
    date: photo.date,
    credit: photo.credit,
    creditUrl: photo.creditUrl,
    orientation: photo.orientation ?? 'portrait',
  })
})

// ─── Banda y equipo ──────────────────────────────────────────────────────────
collaborators.forEach((person, i) => {
  docs.push({
    _id: `collaborator-${slug(person.name)}`,
    _type: 'collaborator',
    orderRank: rank(i),
    name: person.name,
    role: person.role,
    group: person.group,
    handle: person.handle,
    url: person.url,
  })
})

// Un `_id` repetido haría que la importación sobrescribiera un documento con otro en silencio y
// que faltara contenido sin que nada lo dijera. Mejor reventar aquí.
const ids = docs.map((doc) => doc._id)
const duplicated = ids.filter((id, i) => ids.indexOf(id) !== i)
if (duplicated.length > 0) {
  throw new Error(
    `_id repetidos, la importación perdería documentos: ${[...new Set(duplicated)].join(', ')}`,
  )
}

await mkdir(path.dirname(OUT), { recursive: true })
await writeFile(OUT, docs.map((doc) => JSON.stringify(clean(doc))).join('\n') + '\n')

const counts = docs.reduce((acc, doc) => ({ ...acc, [doc._type]: (acc[doc._type] ?? 0) + 1 }), {})
console.log(`${docs.length} documentos en ${OUT}`)
for (const [type, n] of Object.entries(counts)) console.log(`   ${type}: ${n}`)
console.log('\nSiguiente paso: npm run migrate:import')
