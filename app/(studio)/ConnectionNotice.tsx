/**
 * Lo que se ve en `/admin` cuando todavía no hay proyecto de Sanity.
 *
 * No es una pantalla de error: es el estado normal de esta web hoy, y por eso el texto explica
 * **que la web funciona igual** antes de explicar qué falta. Lo contrario —un «Error: missing
 * projectId» a pelo— haría pensar que algo está roto cuando no lo está.
 *
 * Los pasos están escritos aquí y no sólo en el README porque quien abre `/admin` esperando
 * un panel es justamente quien necesita leerlos, y en ese momento no tiene el README delante.
 * Van sin estilos del sitio: este grupo de rutas no carga `globals.css` (ver el layout).
 */
export function ConnectionNotice() {
  return (
    <main
      style={{
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '42rem',
        margin: '0 auto',
        padding: '4rem 1.5rem',
        lineHeight: 1.6,
        color: '#1a1a1a',
      }}
    >
      <p
        style={{
          fontSize: '0.75rem',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#767676',
        }}
      >
        Panel de Cedecé
      </p>
      <h1 style={{ fontSize: '1.75rem', margin: '0.5rem 0 1rem' }}>
        Todavía no hay panel conectado
      </h1>

      <p>
        <strong>La web funciona igual.</strong> Todo su contenido está en el repositorio, en{' '}
        <code>content/</code>, y se publica sin depender de ningún servicio externo. El panel es una
        mejora opcional: sirve para que Cedecé pueda anunciar un concierto o un tema nuevo sin tocar
        código ni esperar un despliegue.
      </p>

      <h2 style={{ fontSize: '1.1rem', marginTop: '2rem' }}>Para ponerlo en marcha</h2>
      <ol style={{ paddingLeft: '1.25rem' }}>
        <li>
          Crear un proyecto en <a href="https://sanity.io/manage">sanity.io/manage</a> con el
          dataset <code>production</code>.
        </li>
        <li>
          Copiar su <code>projectId</code> en <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>, en{' '}
          <code>.env.local</code> y en las variables de los dos proyectos de Vercel.
        </li>
        <li>
          Importar el contenido actual con <code>npm run migrate:build</code> y{' '}
          <code>npm run migrate:import</code>: el panel arranca con lo que ya se ve en la web, no en
          blanco.
        </li>
        <li>
          Crear el webhook de revalidación apuntando a <code>/api/revalidate</code>, con el mismo
          secreto que <code>SANITY_REVALIDATE_SECRET</code>.
        </li>
      </ol>

      <p style={{ marginTop: '2rem', fontSize: '0.9rem', color: '#767676' }}>
        El detalle de los cuatro pasos, con los avisos que cuestan una tarde si se saltan, está en
        el README del repositorio.
      </p>
    </main>
  )
}
