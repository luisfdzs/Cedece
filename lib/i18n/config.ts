/**
 * IDIOMAS: castellano, inglés y galego.
 *
 * El castellano es el idioma en el que Cedecé rapea y el único **obligatorio** en el
 * contenido: lo que falte en `en` o en `gl` cae al castellano en `lib/content.ts` en vez
 * de dejar un hueco. Esa asimetría es deliberada — permite publicar un tema nuevo
 * escribiendo un solo texto y traducirlo después, sin que la web se rompa mientras.
 *
 * El galego está porque es de Betanzos y toca en Vigo, Lugo, Rianxo y Porriño: su público
 * más fiel es gallego. El inglés está porque Spotify no tiene fronteras y el TAKE ONE #1
 * se grabó en París.
 */
export const locales = ['es', 'en', 'gl'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'es'

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value)
}

/** Etiqueta de cada idioma **en su propio idioma**: así lo reconoce quien lo busca. */
export const localeNames: Record<Locale, string> = {
  es: 'Castellano',
  en: 'English',
  gl: 'Galego',
}

/** Códigos completos para `<html lang>`, Open Graph y `hreflang`. */
export const localeTags: Record<Locale, string> = {
  es: 'es-ES',
  en: 'en',
  gl: 'gl-ES',
}
