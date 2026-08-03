/**
 * ¿Este despliegue debe aparecer en Google?
 *
 * **Sólo la rama `prod`.** Y se decide por la rama, no por `VERCEL_ENV`, porque el
 * proyecto de test despliega la rama `test` **como su propio entorno de producción**:
 * allí `VERCEL_ENV === 'production'` también. Usar esa variable dejaría el dominio de
 * test con `index, follow` y `Allow: /` — es decir, dos copias de la misma web
 * compitiendo en Google por «Cedecé», que es la búsqueda que importa. Y para un artista
 * el daño es directo: quien busque su nombre puede acabar en una versión a medio revisar,
 * con fechas de conciertos viejas o un tema que aún no ha salido.
 *
 * `VERCEL_GIT_COMMIT_REF` trae la rama desplegada y no hay que configurar nada:
 *
 *   proyecto de producción   rama `prod`     → indexable
 *   proyecto de test         rama `test`     → NO indexable
 *   previews de cualquier rama               → NO indexable
 *   desarrollo local (sin variables)         → NO indexable
 *
 * Falla del lado seguro: si mañana falta la variable, no se indexa.
 */
export const INDEXABLE_BRANCH = 'prod'

export function isIndexable(): boolean {
  return (
    process.env.VERCEL_ENV === 'production' &&
    process.env.VERCEL_GIT_COMMIT_REF === INDEXABLE_BRANCH
  )
}
