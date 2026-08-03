import type { Artist } from '@/content/schema'

type Kind = Artist['platforms'][number]['kind']

/**
 * Los iconos de las plataformas, dibujados a mano en SVG.
 *
 * **Ninguna librería de iconos.** Son siete formas que no cambian nunca; una dependencia
 * para esto añadiría un paquete al `package.json`, otro al `node_modules` y otro al bundle,
 * y a cambio no resolvería nada que no resuelva un `<path>`. Es la misma decisión que en
 * `lib/cn.ts`.
 *
 * `aria-hidden` en todos: el nombre de la plataforma ya va en el texto del enlace, y un
 * icono anunciado además del texto se lee dos veces.
 */
const paths: Record<Kind, string> = {
  spotify:
    'M12 2a10 10 0 100 20 10 10 0 000-20zm4.586 14.424a.624.624 0 01-.858.207c-2.35-1.435-5.307-1.76-8.79-.966a.624.624 0 11-.277-1.216c3.81-.87 7.078-.496 9.717 1.116a.624.624 0 01.208.859zm1.224-2.723a.78.78 0 01-1.073.257c-2.69-1.653-6.789-2.132-9.969-1.167a.78.78 0 11-.453-1.492c3.632-1.102 8.147-.568 11.238 1.329a.78.78 0 01.257 1.073zm.105-2.835C14.7 8.98 9.735 8.79 6.9 9.65a.935.935 0 11-.543-1.79c3.255-.988 8.737-.766 12.185 1.283a.935.935 0 01-.955 1.608l.013-.011z',
  youtube:
    'M21.58 7.19a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.82.42A2.5 2.5 0 002.42 7.2C2 8.77 2 12 2 12s0 3.23.42 4.81a2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.82-.42a2.5 2.5 0 001.76-1.77C22 15.23 22 12 22 12s0-3.23-.42-4.81zM10 15.5v-7l6 3.5-6 3.5z',
  apple:
    'M16.36 12.78c.02 2.5 2.2 3.33 2.23 3.34-.02.06-.35 1.2-1.15 2.37-.7 1.02-1.42 2.03-2.56 2.05-1.12.02-1.48-.66-2.76-.66-1.28 0-1.68.64-2.74.68-1.1.04-1.94-1.1-2.64-2.11-1.53-2.22-2.7-6.27-1.13-9.01.78-1.36 2.17-2.22 3.68-2.24 1.08-.02 2.1.73 2.76.73.66 0 1.9-.9 3.2-.77.55.02 2.09.2 3.08 1.51-.08.05-1.84 1.08-1.82 3.2M14.6 4.36c.58-.7.97-1.68.86-2.65-.86.03-1.9.57-2.5 1.28-.54.62-1 1.62-.87 2.57.96.08 1.93-.49 2.51-1.2',
  bandcamp: 'M2 17.5l5-11h15l-5 11H2z',
  soundcloud:
    'M1 15.5v-3a.5.5 0 011 0v3a.5.5 0 01-1 0zm2.5 1v-5a.5.5 0 011 0v5a.5.5 0 01-1 0zm2.5.5V9a.5.5 0 011 0v8a.5.5 0 01-1 0zm2.5 0V7.5a.5.5 0 011 0V17a.5.5 0 01-1 0zm2.5 0V6a.5.5 0 011 0v11a.5.5 0 01-1 0zM14 17V8a4 4 0 018 1v.5a3.5 3.5 0 01-.5 7H14z',
  instagram:
    'M12 2c2.72 0 3.06.01 4.12.06 1.07.05 1.79.22 2.43.47.66.25 1.22.6 1.77 1.15.55.55.9 1.11 1.15 1.77.25.64.42 1.36.47 2.43C21.99 8.94 22 9.28 22 12s-.01 3.06-.06 4.12c-.05 1.07-.22 1.79-.47 2.43-.25.66-.6 1.22-1.15 1.77-.55.55-1.11.9-1.77 1.15-.64.25-1.36.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.07-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.36-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.07.22-1.79.47-2.43.25-.66.6-1.22 1.15-1.77A4.9 4.9 0 015.45 2.53c.64-.25 1.36-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 1.8a3.2 3.2 0 110 6.4 3.2 3.2 0 010-6.4zM17.5 5.3a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z',
  tiktok:
    'M16.6 5.82A4.28 4.28 0 0115.54 3h-3.09v12.4a2.59 2.59 0 01-2.59 2.5 2.59 2.59 0 01-2.59-2.59 2.59 2.59 0 013.31-2.48V9.66a5.68 5.68 0 00-6.4 5.64 5.68 5.68 0 0011.36 0V8.87a7.35 7.35 0 004.28 1.37V7.15a4.29 4.29 0 01-3.22-1.33z',
  twitter: 'M18.9 2H22l-6.8 7.77L22.6 22h-6.9l-4.6-6.4L5.6 22H2.4l7.3-8.34L1.7 2h7l4.3 6 5.9-6z',
  facebook:
    'M22 12a10 10 0 10-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99A10 10 0 0022 12z',
  other:
    'M12 2a10 10 0 100 20 10 10 0 000-20zM2.5 12h19M12 2.5c2.5 2.6 3.8 6 3.8 9.5s-1.3 6.9-3.8 9.5c-2.5-2.6-3.8-6-3.8-9.5S9.5 5.1 12 2.5z',
}

const labels: Record<Kind, string> = {
  spotify: 'Spotify',
  youtube: 'YouTube',
  apple: 'Apple Music',
  bandcamp: 'Bandcamp',
  soundcloud: 'SoundCloud',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  twitter: 'Twitter',
  facebook: 'Facebook',
  other: 'Enlace',
}

/** `other` y `soundcloud` se dibujan con trazo; el resto son siluetas rellenas. */
const stroked: ReadonlySet<Kind> = new Set(['other'])

export function PlatformIcon({ kind, className }: { kind: Kind; className?: string }) {
  const isStroked = stroked.has(kind)
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      className={className ?? 'h-4 w-4'}
      fill={isStroked ? 'none' : 'currentColor'}
      stroke={isStroked ? 'currentColor' : undefined}
      strokeWidth={isStroked ? 1.5 : undefined}
      strokeLinecap="round"
    >
      <path d={paths[kind]} />
    </svg>
  )
}

export function platformLabel(kind: Kind, override?: string): string {
  return override ?? labels[kind]
}
