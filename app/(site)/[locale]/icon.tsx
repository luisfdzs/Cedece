import { ImageResponse } from 'next/og'

/**
 * EL FAVICON, generado.
 *
 * Se dibuja el monograma en vez de meter un `.ico` en `public/`: así el icono y la marca de
 * la cabecera salen del mismo sitio y no pueden desincronizarse. La misma reconstrucción
 * geométrica que `components/layout/Logo.tsx` — cuando llegue el SVG original de Cedecé, hay
 * que cambiar **los dos**.
 */
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0b0b0d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg width="26" height="26" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="17" fill="none" stroke="#f4f1ec" strokeWidth="4" />
        <rect x="14" y="7" width="4" height="26" fill="#f4f1ec" />
      </svg>
    </div>,
    size,
  )
}
