import type { Metadata } from 'next'
import { Anton, Inter, JetBrains_Mono } from 'next/font/google'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { site } from '@/content/site'
import { pick } from '@/content/schema'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { getContent } from '@/lib/content'
import { isLocale, localeTags, locales, type Locale } from '@/lib/i18n/config'
import { t } from '@/lib/i18n/ui'
import { isIndexable } from '@/lib/site-env'
import '../../globals.css'

/**
 * LAS TRES TIPOGRAFÍAS, AUTOALOJADAS.
 *
 * `next/font` las descarga **en el build** y las sirve desde el propio dominio: no hay una
 * sola petición a Google en tiempo de ejecución, ni por rendimiento ni por privacidad.
 *
 *   · **Anton** para los titulares. Es una condensada muy pesada y es la voz de la web: sin
 *     ella esto se lee como un blog y no como un cartel de concierto.
 *   · **Inter** para el cuerpo, que es donde se leen los párrafos de la biografía.
 *   · **JetBrains Mono** para fechas, rótulos y créditos. La mono da a los datos el aire de
 *     ficha técnica y, de paso, alinea las fechas en la lista de conciertos.
 *
 * `display: 'swap'` en las tres: sobre un fondo negro con un vídeo detrás, un texto
 * invisible durante 300 ms es peor que un texto que cambia de forma.
 */
const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono-jb',
  display: 'swap',
})

/** Las tres rutas de idioma se generan en el build. La web es estática. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  if (!isLocale(locale)) return {}

  const { artist } = await getContent()
  const tagline = pick(artist.tagline, locale)
  const description = artist.shortBio ? pick(artist.shortBio, locale) : tagline

  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${artist.name} — ${tagline}`,
      template: `%s · ${artist.name}`,
    },
    description,
    // `alternates` es lo que le dice a Google que las tres URLs son la misma web en tres
    // idiomas y no tres webs compitiendo entre ellas.
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(locales.map((code) => [localeTags[code], `/${code}`])),
    },
    openGraph: {
      type: 'profile',
      siteName: artist.name,
      title: `${artist.name} — ${tagline}`,
      description,
      url: `/${locale}`,
      locale: localeTags[locale],
    },
    twitter: { card: 'summary_large_image' },
    // La indexación se decide por la RAMA, no por el entorno. El porqué, en `lib/site-env.ts`.
    robots: isIndexable() ? { index: true, follow: true } : { index: false, follow: false },
    applicationName: artist.name,
  }
}

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  const { artist } = await getContent()
  const ui = t(locale as Locale)

  return (
    <html
      lang={localeTags[locale]}
      className={`${anton.variable} ${inter.variable} ${mono.variable}`}
    >
      <body>
        {/* Primer elemento enfocable de la página: con seis secciones y una cabecera de seis
            enlaces, quien navega con teclado agradece saltárselos. */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded focus:bg-[var(--color-velvet)] focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          {ui.a11y.skipToContent}
        </a>

        <Header locale={locale as Locale} />
        <main id="contenido">{children}</main>
        <Footer artist={artist} locale={locale as Locale} />
      </body>
    </html>
  )
}
