import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * EL ENVOLTORIO DE CADA SECCIÓN, con su número y su rótulo.
 *
 * El número («01», «02»…) es lo que ordena la lectura de una portada larga y lo que le da
 * el aire de cartel. Se pasa a mano en vez de contarse solo: si un día se quita una sección
 * o se reordena, un contador automático renumeraría en silencio y el enlace `#musica` que
 * alguien tenga guardado seguiría llevando a «03» cuando antes decía «02».
 *
 * `id` es el ancla de navegación y **va en castellano en los tres idiomas**: es un
 * identificador, no un texto, y traducirlo obligaría a que la cabecera supiera el idioma
 * para construir sus propios enlaces.
 */
type Props = {
  id: string
  number: string
  title: string
  lead?: string
  children: ReactNode
  className?: string
  /** Para alternar el fondo entre secciones contiguas y que se distingan. */
  tone?: 'ink' | 'soft'
}

export function Section({ id, number, title, lead, children, className, tone = 'ink' }: Props) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-24 border-t border-[var(--color-ink-line)] px-(--spacing-gutter) py-16 md:py-24',
        tone === 'soft' && 'bg-[var(--color-ink-soft)]',
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 md:mb-14">
          <p className="eyebrow mb-3 flex items-center gap-3">
            <span>{number}</span>
            <span aria-hidden className="h-px w-10 bg-[var(--color-velvet)]" />
          </p>
          <h2 className="text-[clamp(2.25rem,7vw,4.5rem)]">{title}</h2>
          {lead ? (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-paper-dim)] md:text-lg">
              {lead}
            </p>
          ) : null}
        </header>
        {children}
      </div>
    </section>
  )
}
