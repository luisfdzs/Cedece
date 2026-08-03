/**
 * Datos del sitio que no son contenido editable: la URL canónica y el usuario de las
 * redes. Vive en código y no en Sanity porque cambiarlos obliga a redesplegar de todas
 * formas (afectan a `robots.txt`, al `sitemap.xml` y a las etiquetas Open Graph).
 */
export const site = {
  name: 'Cedecé',
  /** Dominio de producción. Cuando haya dominio propio, se cambia **aquí y sólo aquí**. */
  url: 'https://cedece.vercel.app',
  instagram: 'soycedece',
  /**
   * De dónde sale el contenido inicial de esta web, y hasta cuándo llega.
   *
   * **La última publicación de Instagram es del 25 de febrero de 2024.** Se deja escrito
   * porque explica por qué la sección de directo no tiene fechas futuras y por qué la
   * discografía llega hasta «Quítame» (2025) por Spotify pero el material gráfico se para
   * en febrero de 2024. No es un fallo de la web: es el estado real de las fuentes.
   */
  contentSource: {
    instagramLastPost: '2024-02-25',
    scrapedOn: '2026-08-03',
    posts: 19,
  },
} as const
