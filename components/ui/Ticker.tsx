/**
 * LA CINTA DE TEXTO EN MOVIMIENTO.
 *
 * Ciudades y títulos pasando en horizontal, como el faldón de un cartel de gira. Es la
 * única animación decorativa de la web.
 *
 * **La lista se duplica en el HTML y la copia va con `aria-hidden`.** Las dos cosas son
 * necesarias y por motivos distintos: duplicar es lo que permite que la animación recorra
 * el 50 % exacto y el bucle no tenga costura (ver el bloque «CINTA» de `globals.css`), y
 * ocultar la copia es lo que evita que un lector de pantalla lea las diez ciudades dos
 * veces seguidas.
 *
 * Cero JavaScript: es CSS y un array.
 */
export function Ticker({ items }: { items: readonly string[] }) {
  if (items.length === 0) return null

  return (
    <div className="ticker" aria-label={items.join(' · ')}>
      <div className="ticker-track">
        <div className="flex">
          {items.map((item, i) => (
            <span key={`a-${i}`} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
        <div className="flex" aria-hidden>
          {items.map((item, i) => (
            <span key={`b-${i}`} className="ticker-item">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
