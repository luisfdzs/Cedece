import type { Metadata } from 'next'
import type { ReactNode } from 'react'

/**
 * EL PANEL VA EN SU PROPIO `<html>`.
 *
 * Sanity Studio trae su propia hoja de estilos, su propio tema y su propia gestión de
 * tipografías, y no se lleva bien con la del sitio: si heredara `app/globals.css` acabaría
 * con los titulares del panel en Anton y en versalitas, porque la regla de `h1, h2, h3` de la
 * hoja del sitio no distingue. De ahí el grupo de rutas `(studio)` aparte, con su propio
 * documento y **sin importar `globals.css`**.
 *
 * `noindex` explícito: el panel no tiene nada que indexar y una URL de administración en los
 * resultados de búsqueda es una invitación innecesaria. `app/robots.ts` lo excluye también,
 * pero el `<meta>` es lo que vale si alguien llega con un enlace directo.
 */
export const metadata: Metadata = {
  title: 'Panel · Cedecé',
  robots: { index: false, follow: false },
}

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  )
}
