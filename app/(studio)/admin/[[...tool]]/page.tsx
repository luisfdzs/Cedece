import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity.config'
import { isSanityConfigured } from '@/sanity/env'
import { ConnectionNotice } from '../../ConnectionNotice'

/**
 * EL PANEL, servido dentro de la propia web en `/admin`.
 *
 * La ruta atrapa todo (`[[...tool]]`) porque el Studio maneja su propia navegación interna:
 * `/admin/structure/release`, `/admin/vision`, etc. Sin el catch-all, cualquier clic dentro
 * del panel daría un 404 de Next.
 *
 * **Si no hay proyecto de Sanity configurado, no se monta el Studio: se avisa.** Es el caso
 * normal hoy —la web se sirve de `content/` y no hay proyecto dado de alta todavía— y montar
 * el Studio con `projectId` vacío reventaría con un error de librería que no dice nada útil.
 * Ver `sanity/env.ts` y `lib/content.ts`.
 */
/**
 * ⚠️ Aquí NO va `export const dynamic`. Con `cacheComponents` activo en `next.config.ts`,
 * Next rechaza esa configuración por segmento y el build falla con un error que no dice por
 * qué. No hace falta de todas formas: el Studio es una aplicación de cliente y esta ruta se
 * prerrenderiza sola.
 */
export default function StudioPage() {
  if (!isSanityConfigured) return <ConnectionNotice />
  return <NextStudio config={config} />
}
