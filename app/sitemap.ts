import type { MetadataRoute } from 'next'
import { site } from '@/content/site'
import { localeTags, locales } from '@/lib/i18n/config'

/**
 * El mapa del sitio: tres URLs, una por idioma.
 *
 * Cada entrada declara sus `alternates` para que Google entienda que las tres son la misma
 * página traducida y no tres páginas parecidas compitiendo entre ellas. Es la misma
 * información que va en el `<link rel="alternate">` del layout; se repite aquí porque el
 * rastreador no siempre llega a las tres URLs por su cuenta.
 *
 * No lleva `lastModified`: no hay una fecha honesta que poner —el contenido puede cambiar
 * desde el panel sin que cambie el repositorio— y una fecha de build fingiría que la página se
 * actualizó cuando sólo se volvió a compilar.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${site.url}/${locale}`,
    changeFrequency: 'monthly',
    priority: locale === 'es' ? 1 : 0.8,
    alternates: {
      languages: Object.fromEntries(
        locales.map((code) => [localeTags[code], `${site.url}/${code}`]),
      ),
    },
  }))
}
