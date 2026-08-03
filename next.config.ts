import type { NextConfig } from 'next'

/**
 * MOMENTO DEL BUILD, CONGELADO Y EXPLÍCITO
 *
 * La web escribe dos cosas que dependen de «hoy»: el año del copyright del pie y, sobre
 * todo, **qué concierto es el próximo y cuáles ya pasaron**. Leer el reloj durante el
 * render sería un error doble: con `cacheComponents` activo, un acceso al reloj en una
 * ruta prerrenderizada la vuelve dinámica —y una web que existe para servirse estática
 * pasaría a ejecutar una función por visita para escribir «2026»—; y, peor, dejaría la
 * congelación como un efecto secundario que nadie ve.
 *
 * Así que se resuelve **aquí**, en la configuración, que es Node normal ejecutándose una
 * vez antes de compilar. El valor viaja como variable de entorno y `lib/format.ts` lo lee.
 *
 * La consecuencia queda dicha en voz alta: **la lista de conciertos se reparte entre
 * «próximos» y «pasados» el día que se despliega.** Para una web de conciertos eso
 * importa de verdad, así que la solución no es leer el reloj: es que al publicar una
 * fecha desde el panel, el webhook de `app/api/revalidate` reconstruye la página. Y si
 * pasan semanas sin publicar nada, el `cron` de `vercel.json` de un despliegue semanal
 * es el siguiente paso (todavía no está: se apunta en el README).
 */
const buildDate = new Date()
const buildDay = buildDate.toISOString().slice(0, 10)

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    // `NEXT_PUBLIC_` a propósito: el pie es un componente de servidor, pero el día que
    // una fecha haga falta en cliente no queremos descubrir que la variable no llega.
    NEXT_PUBLIC_BUILD_DAY: buildDay,
  },
  // Necesario para la directiva `use cache` (ver lib/content.ts): es lo que permite
  // etiquetar los datos del CMS y que el webhook de publicación los invalide.
  cacheComponents: true,
  poweredByHeader: false,
  images: {
    // Las transformaciones las hace la CDN de Sanity, que ya tiene el original: ver
    // sanity/imageLoader.ts. Así no se consume cuota de optimización de Vercel y las
    // imágenes que Cedecé suba desde el panel se optimizan igual que las locales.
    loader: 'custom',
    loaderFile: './sanity/imageLoader.ts',
    deviceSizes: [420, 640, 828, 1080, 1600, 2048],
    qualities: [75, 85],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      {
        // Los vídeos y las imágenes llevan la fecha y el shortcode del post en el nombre:
        // el fichero nunca cambia de contenido, así que se puede cachear para siempre.
        source: '/:dir(video|gallery|posters)/:file*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default nextConfig
