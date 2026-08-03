/**
 * Datos de conexión con Sanity.
 *
 * `projectId` y `dataset` **no son secretos** (van en el HTML de cualquier web con
 * Sanity), así que viven en variables públicas.
 *
 * **Aquí no se lanza error si faltan.** La web tiene todo su contenido en `content/` y se
 * construye perfectamente sin un proyecto de Sanity detrás (ver `lib/content.ts`). Eso
 * permite desplegar hoy y enchufar el panel cuando Cedecé quiera empezar a publicar él
 * mismo, sin que el sitio dependa de un servicio externo para existir. Lo único que no
 * funciona sin variables es `/admin`, que avisa.
 */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? ''

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

/** Fecha de la API: se fija para que Sanity no cambie de comportamiento por su cuenta. */
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2026-08-01'

/**
 * ¿Hay un proyecto de Sanity detrás?
 *
 * Se comprueba `projectId` y no `dataset`, porque `dataset` tiene valor por defecto y
 * siempre parecería configurado.
 */
export const isSanityConfigured = projectId.length > 0
