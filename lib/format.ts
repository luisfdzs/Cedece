import type { DatePrecision } from '@/content/schema'
import type { Locale } from '@/lib/i18n/config'

/**
 * FECHAS Y CIFRAS.
 *
 * **El reloj no se lee aquí.** `BUILD_DAY` viene congelado de `next.config.ts` y es «hoy»
 * para toda la web. El porqué está explicado allí; en resumen: leer la fecha durante el
 * render volvería dinámica una ruta que debe servirse estática.
 *
 * La consecuencia hay que tenerla presente al tocar la sección de directo: **el reparto
 * entre conciertos próximos y pasados se decide el día del despliegue.** Un concierto que
 * pase mañana seguirá saliendo como «próximo» hasta que algo reconstruya la página — y lo
 * que la reconstruye es publicar en el panel.
 */
const BUILD_DAY = process.env.NEXT_PUBLIC_BUILD_DAY ?? '1970-01-01'

/** El «hoy» de la web, en `YYYY-MM-DD`. */
export function today(): string {
  return BUILD_DAY
}

const localeTag: Record<Locale, string> = { es: 'es-ES', en: 'en-GB', gl: 'gl-ES' }

/**
 * Escribe una fecha **hasta donde llega su precisión**, y no más.
 *
 * Es la contrapartida de `datePrecision` (ver `content/schema.ts`): una fecha marcada como
 * `year` se guarda como `2023-01-01` para poder ordenarla, pero aquí sale «2023». Si esta
 * función ignorase la precisión, todo el cuidado puesto en el modelo de contenido no
 * serviría de nada, porque la web acabaría afirmando el 1 de enero.
 *
 * Se construye la fecha con `Date.UTC` a partir de las tres partes en vez de pasarle la
 * cadena al constructor: `new Date('2024-03-01')` se interpreta en UTC y en España eso
 * puede restar un día al formatear en hora local.
 */
export function formatDate(iso: string, precision: DatePrecision, locale: Locale): string {
  const [y = '1970', m = '01', d = '01'] = iso.split('-')
  if (precision === 'year') return y

  const date = new Date(Date.UTC(Number(y), Number(m) - 1, Number(d)))
  const options: Intl.DateTimeFormatOptions =
    precision === 'month'
      ? { year: 'numeric', month: 'long', timeZone: 'UTC' }
      : { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }

  return new Intl.DateTimeFormat(localeTag[locale], options).format(date)
}

/** Sólo el año. Para las tarjetas, donde no cabe la fecha entera. */
export function year(iso: string): string {
  return iso.slice(0, 4)
}

/** ¿Esta fecha es futura respecto al día del build? Ver la nota de arriba. */
export function isUpcoming(iso: string): boolean {
  return iso >= BUILD_DAY
}

/** El año del build, para el copyright del pie. */
export function buildYear(): string {
  return BUILD_DAY.slice(0, 4)
}
