import Link from 'next/link'

/**
 * 404.
 *
 * No hay `params` disponibles aquí (Next renderiza esta página fuera del segmento de idioma
 * cuando el idioma es justamente lo que no ha cuadrado), así que **el texto va en los tres
 * idiomas apilados** en vez de adivinar uno. Es raro de ver y es correcto: quien llega aquí
 * puede haber teclado cualquier cosa.
 */
export default function NotFound() {
  return (
    <div className="flex min-h-[70svh] flex-col justify-center px-(--spacing-gutter) py-24">
      <div className="mx-auto w-full max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-[clamp(2.5rem,10vw,6rem)]">Aquí no hay nada</h1>
        <ul className="mt-6 space-y-1 text-[var(--color-paper-dim)]">
          <li>Esta página no existe.</li>
          <li lang="en">This page does not exist.</li>
          <li lang="gl">Esta páxina non existe.</li>
        </ul>
        <Link href="/es" className="btn btn-primary mt-8">
          Cedecé
        </Link>
      </div>
    </div>
  )
}
