import { artist as localArtist } from '@/content/artist'
import { collaborators as localCollaborators } from '@/content/collaborators'
import { photos as localPhotos } from '@/content/photos'
import { releases as localReleases } from '@/content/releases'
import { contentSchema, type Content } from '@/content/schema'
import { shows as localShows } from '@/content/shows'
import { videos as localVideos } from '@/content/videos'
import { isSanityConfigured } from '@/sanity/env'

/**
 * DE DÓNDE SALE EL CONTENIDO — la decisión de arquitectura central de esta web.
 *
 * Hay **dos fuentes y una regla**:
 *
 *   1. `content/` es el suelo. Está en el repositorio, va con el código y **nunca falta**.
 *   2. Sanity manda **cuando tiene documentos**. Si el panel está configurado y devuelve
 *      contenido, se usa el del panel. Si no está configurado, o está vacío, o falla,
 *      se usa `content/`.
 *
 * Lo que compra esa regla: **la web existe hoy, sin credenciales de nada.** Se puede
 * clonar el repositorio y desplegarla sin dar de alta un proyecto de Sanity, y el día que
 * Cedecé quiera empezar a anunciar conciertos él mismo, se enchufa el panel y el contenido
 * pasa a mandar desde ahí sin tocar una línea de código.
 *
 * La diferencia con una web de cliente es deliberada: allí el CMS es la única fuente y su
 * ausencia es un error que hay que gritar. Aquí es una mejora opcional.
 *
 * **Y no se cae a `content/` en silencio cuando Sanity falla de verdad.** Un `projectId`
 * sin configurar es una situación normal; un Sanity configurado que devuelve basura es un
 * fallo, y se escribe en el log del build con el motivo. Que la web siga en pie no es
 * excusa para no dejar rastro.
 */

/**
 * Etiqueta de caché para todo el contenido. Una sola para todo: son pocas páginas y
 * regenerarlas es barato, así que no merece la pena afinar por tipo de documento.
 * `app/api/revalidate/route.ts` la invalida cuando Sanity avisa de una publicación.
 */
export const CONTENT_TAG = 'content'

/** El contenido del repositorio, ya con la forma que espera la web. */
const local: Content = contentSchema.parse({
  artist: localArtist,
  releases: localReleases,
  videos: localVideos,
  shows: localShows,
  photos: localPhotos,
  collaborators: localCollaborators,
})

/**
 * Devuelve todo el contenido de la web.
 *
 * `use cache` con la etiqueta de arriba: el resultado se guarda y sólo se vuelve a pedir
 * cuando el webhook de publicación lo invalida. Por eso el visitante nunca espera a una
 * consulta a Sanity — recibe HTML estático del CDN de Vercel.
 */
export async function getContent(): Promise<Content> {
  'use cache'

  if (!isSanityConfigured) return local

  try {
    const { getClient } = await import('@/sanity/client')
    const { contentQuery } = await import('@/sanity/queries')
    const raw = await getClient().fetch(contentQuery)

    // Sanity configurado pero vacío es lo normal el día que se crea el proyecto: todavía
    // no se ha importado nada. No es un fallo, así que no se grita.
    if (!raw?.artist) return local

    const parsed = contentSchema.safeParse(mergeWithLocal(raw))
    if (!parsed.success) {
      // Aquí sí: el panel tiene documentos y no cumplen el contrato. Se dice qué campo,
      // porque el mensaje de zod es lo único que va a tener quien lo arregle.
      console.error(
        '[content] Sanity devolvió documentos que no validan; se sirve content/. Errores:\n' +
          JSON.stringify(parsed.error.issues, null, 2),
      )
      return local
    }
    return parsed.data
  } catch (error) {
    console.error('[content] No se pudo leer de Sanity; se sirve content/.', error)
    return local
  }
}

/**
 * Rellena con `content/` las **listas** que Sanity devuelve vacías.
 *
 * El caso real que resuelve: se crea el proyecto de Sanity y se importa sólo la ficha del
 * artista para probar. Sin esto, la web se quedaría de golpe sin música, sin vídeos y sin
 * galería —porque Sanity «ya manda»— y parecería que se ha roto. Con esto, cada sección
 * cambia de fuente cuando tiene con qué, y no antes.
 */
function mergeWithLocal(raw: Record<string, unknown>): Record<string, unknown> {
  const listKeys = ['releases', 'videos', 'shows', 'photos', 'collaborators'] as const
  const merged: Record<string, unknown> = { ...raw }
  for (const key of listKeys) {
    const value = raw[key]
    if (!Array.isArray(value) || value.length === 0) merged[key] = local[key]
  }
  return merged
}
