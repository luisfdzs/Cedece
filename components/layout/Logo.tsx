/**
 * LA MARCA.
 *
 * En la fotografía del faldón del escenario (`2023-09-04_Cwx8opRoiUl_03`) se ve su
 * logotipo: un monograma circular blanco sobre negro, con el rótulo CEDECÉ debajo. Esto es
 * una **reconstrucción geométrica** de esa marca a partir de la foto —un círculo con la
 * barra vertical que forma la ligadura C/D—, no el original.
 *
 * ⚠️ **Hay que pedirle el SVG a él y sustituir este fichero.** Está apuntado en el README,
 * en «Pendiente». Se deja dibujado y no vacío porque una web de artista sin marca en la
 * cabecera se lee como una plantilla, y porque un hueco «temporal» sin nada que mirar es un
 * hueco que se queda años. Lo que no se hace es fingir que es el definitivo: de ahí este
 * comentario.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className ?? 'h-8 w-8'}
      role="img"
      aria-label="Cedecé"
      focusable="false"
    >
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="3" />
      {/* La barra de la ligadura: descentrada a la izquierda, como en la foto. */}
      <rect x="14" y="6" width="3.4" height="28" fill="currentColor" />
      {/* El semicírculo derecho, que cierra la «D». */}
      <path
        d="M17.4 9.5h1.6a10.5 10.5 0 010 21h-1.6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  )
}
