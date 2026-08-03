'use client'

import { useState } from 'react'
import { cn } from '@/lib/cn'
import { videoSrc } from '@/lib/media'
import { Photo } from './Photo'

/**
 * UN VÍDEO QUE NO SE DESCARGA HASTA QUE ALGUIEN LO PIDE.
 *
 * Es el único componente de cliente de la parte pública, y existe por una razón concreta:
 * **hay diez vídeos en esta web y suman 28 MB.** Si los diez `<video>` estuvieran en el
 * HTML con `preload`, abrir la portada en un móvil con datos costaría eso. Así que lo que
 * se pinta de entrada es el fotograma de portada —una imagen de 40 KB— y el `<video>` no se
 * monta hasta que se pulsa.
 *
 * Ese orden trae de propina la única forma de que el sonido funcione: el navegador permite
 * reproducir con audio si la orden viene de un gesto del usuario, y aquí siempre viene de
 * uno. Los vídeos de fondo del hero son otro caso —van mudos y en bucle— y no usan este
 * componente.
 *
 * `poster` puede no existir (Instagram no siempre da fotograma). En ese caso `Photo` dibuja
 * el hueco tramado y el botón sigue estando: se puede reproducir igual.
 */
type Props = {
  file: string
  poster?: string
  label: string
  aspect?: 'vertical' | 'horizontal' | 'square'
  playHint: string
  className?: string
}

export function VideoFrame({
  file,
  poster,
  label,
  aspect = 'vertical',
  playHint,
  className,
}: Props) {
  const [active, setActive] = useState(false)

  return (
    <div
      className={cn('vframe', aspect === 'horizontal' && 'vframe-horizontal', className)}
      // La proporción cuadrada es la excepción y se declara aquí: no merece una clase
      // propia en la hoja para un solo caso.
      style={aspect === 'square' ? { aspectRatio: '1 / 1' } : undefined}
    >
      {active ? (
        <video
          src={videoSrc(file)}
          controls
          autoPlay
          playsInline
          preload="auto"
          aria-label={label}
          className="bg-black"
        />
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          className="group absolute inset-0 h-full w-full cursor-pointer text-left"
          aria-label={`${label} — ${playHint}`}
        >
          {poster ? (
            <Photo
              file={poster}
              dir="posters"
              alt=""
              sizes="(min-width: 48rem) 33vw, 90vw"
              className="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            />
          ) : (
            <span
              aria-hidden
              className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--color-ink-soft)_0_8px,var(--color-ink-line)_8px_16px)]"
            />
          )}

          {/* Velo hacia abajo: el triángulo de reproducción es blanco y sobre un
              fotograma claro desaparecería. */}
          <span
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25"
          />

          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-black/45 backdrop-blur-sm">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-white" aria-hidden>
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  )
}
