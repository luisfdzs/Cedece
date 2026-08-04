import { defineQuery } from 'next-sanity'

/**
 * LA CONSULTA, UNA SOLA.
 *
 * Todo el contenido de la web en una petición. No se parte en una consulta por sección por
 * dos razones: son seis tipos de documento y un par de cientos de campos en total —cabe de
 * sobra—, y una sola consulta significa un solo sitio donde mirar cuando un campo no llega.
 *
 * **La proyección tiene que devolver exactamente la forma de `content/schema.ts`.** Es el
 * contrato entre las dos fuentes, y por eso `lib/content.ts` valida lo que sale de aquí con
 * el mismo zod que valida `content/`: si la proyección se desalinea del esquema, el build
 * lo dice con nombre y apellidos en vez de renderizar huecos.
 *
 * Los `coalesce(..., false)` no son adorno: en Sanity un booleano que nunca se ha tocado
 * llega como `null`, y `null` no es `false` para zod.
 */

/** Los tres idiomas de un texto traducible. Se repite en cada campo, así que se nombra. */
const LOCALIZED = `{ es, en, gl }`

const CREDITS = `credits[]{ role, who, url }`

export const contentQuery = defineQuery(`{
  "artist": *[_type == "artist"][0]{
    name,
    tagline${LOCALIZED},
    "roles": coalesce(roles[]${LOCALIZED}, []),
    city,
    bio${LOCALIZED},
    shortBio${LOCALIZED},
    "portrait": select(
      defined(portrait.asset) => {
        "file": portrait.asset->url,
        "alt": portrait.alt${LOCALIZED},
        "credit": portrait.credit
      },
      null
    ),
    "platforms": coalesce(platforms[]{
      kind,
      label,
      url,
      "primary": coalesce(primary, false)
    }, []),
    bookingEmail,
    pressKitUrl
  },

  "releases": *[_type == "release"] | order(orderRank){
    title,
    "slug": slug.current,
    kind,
    series,
    seriesNumber,
    releaseDate,
    "datePrecision": coalesce(datePrecision, "day"),
    "cover": select(
      defined(cover.asset) => { "file": cover.asset->url, "alt": cover.alt${LOCALIZED} },
      null
    ),
    about${LOCALIZED},
    tracks,
    ${CREDITS},
    links[]{ label, url },
    "featured": coalesce(featured, false)
  },

  "videos": *[_type == "video"] | order(orderRank){
    title${LOCALIZED},
    kind,
    episode,
    song,
    place,
    date,
    file,
    loop,
    youtubeId,
    poster,
    "aspect": coalesce(aspect, "vertical"),
    note${LOCALIZED},
    ${CREDITS},
    sourceUrl,
    "featured": coalesce(featured, false)
  },

  "shows": *[_type == "show"] | order(date desc){
    date,
    "datePrecision": coalesce(datePrecision, "day"),
    city,
    venue,
    venueUrl,
    tour,
    lineup,
    format,
    ticketsUrl,
    "free": coalesce(free, false),
    "soldOut": coalesce(soldOut, false),
    note${LOCALIZED}
  },

  "photos": *[_type == "photo"] | order(orderRank){
    "file": coalesce(image.asset->url, localFile),
    alt${LOCALIZED},
    caption${LOCALIZED},
    place,
    date,
    credit,
    creditUrl,
    "orientation": coalesce(orientation, "portrait")
  },

  "collaborators": *[_type == "collaborator"] | order(orderRank){
    name,
    role${LOCALIZED},
    group,
    handle,
    url
  }
}`)
