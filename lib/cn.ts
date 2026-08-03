/**
 * Une clases condicionales y descarta lo que no es una cadena. Cuarenta caracteres en vez
 * de una dependencia: aquí no se combinan clases de Tailwind en conflicto, sólo se
 * encadenan, así que `clsx` y `tailwind-merge` sobrarían.
 */
export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}
