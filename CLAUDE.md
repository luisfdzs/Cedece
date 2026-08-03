# CLAUDE.md — CEDECÉ

> Contexto principal del proyecto. Se mantiene **actualizado en cada cambio relevante** (ver
> _Protocolo de mantenimiento_ al final). Es la fuente de verdad compartida por quien trabaje
> en el proyecto.
>
> ⚠️ **Este fichero está en la rama `claude` y en `develop`.** Al cambiarlo hay que cambiarlo
> en las dos; el porqué está en el README de la rama `claude`.

La memoria curada vive en `memoria/` (rama `claude`) y su copia local en `.claude/memory/`.

@.claude/memory/MEMORY.md

---

## 1. Qué es este proyecto

Web de **Cedecé**, rapero de Vigo en activo desde 2008. Autor de «Hipersensible» (2020) y de
la serie de temas «Quemaduras». Toca en acústico con Rober Carcos a la guitarra y Óscar «DJ
Limón» Rodes al teclado.

El objetivo es explícito y conviene tenerlo presente al decidir cualquier cosa: **que quien
entra acabe escuchando la música, y que un programador de sala pueda decidir si le da una
fecha.** Son dos lectores con dos prisas distintas —el primero da treinta segundos, el segundo
busca un dato concreto— y todo lo que no sirva a uno de los dos, sobra.

Reutiliza el stack, la arquitectura y la metodología de `C:\Proyectos\Portfolio`.

**Estado (2026-08-03): DESPLEGADO.** `cedece.vercel.app` (producción, rama `prod`) y
`cedecetest.vercel.app` (test, rama `test`, con `Disallow: /`). `npm run check` limpio y build
de producción limpio en los tres idiomas. Detalles en [[modelo-de-ramas]].

**Todavía no hay proyecto de Sanity**, y la web funciona igual sirviendo `content/` — es
exactamente lo que la arquitectura contempla (ver [[contenido-dos-fuentes]]). Enchufarlo es el
siguiente paso opcional, con los cuatro pasos del README de `develop`.

## 2. Stack técnico

- **Frontend:** Next.js 16 (App Router, Turbopack) + TypeScript estricto + Tailwind CSS 4, con
  **zod** validando el contenido. **Estático**: en servidor sólo `proxy.ts` (negocia idioma),
  el webhook de revalidación y las dos rutas de imagen generada.
- **Trilingüe:** `es` (por defecto), `en` y `gl`, en `/es`, `/en` y `/gl`. Sólo el castellano
  es obligatorio en el contenido; lo que falte cae al castellano en `content/schema.ts`
  (`pick`). Los textos de interfaz (`lib/i18n/ui.ts`) **sí** exigen los tres.
- **Contenido: doble fuente con una regla.** `content/` es el suelo y Sanity manda cuando
  tiene documentos. Es la decisión de arquitectura central; ver [[contenido-dos-fuentes]].
- **Panel:** Sanity dentro de la propia web, en `/admin`. Seis tipos de documento: el
  singleton `artist` y `release`, `video`, `show`, `photo` y `collaborator`. Todos ordenables
  arrastrando **menos `show`**, que se ordena por fecha (ver [[panel-de-sanity]]).
- **Despliegue: Vercel**, dos entornos (`prod` → producción, `test` → test con `noindex`).
  Framework declarado en `vercel.json`.
- **Calidad:** `npm run check` (typecheck + ESLint + Prettier).
- **Tipografía:** Anton (titulares), Inter (cuerpo) y JetBrains Mono (datos y rótulos), las
  tres autoalojadas por `next/font` — ninguna petición a Google en tiempo de ejecución. Anton
  es la voz del proyecto: sin ella la web se lee como un blog y no como un cartel.
- **Material propio: lo que hay en `public/` es lo que viaja.** El cargador
  (`sanity/imageLoader.ts`) sólo transforma URLs de la CDN de Sanity y devuelve las rutas
  locales intactas, así que en las fotos de la galería **`sizes` y `quality` no ahorran ni un
  byte**: el peso se decide al generar el fichero, en `scripts/`. Ver [[material-de-instagram]].

## 3. Las decisiones que no hay que deshacer sin pensarlo

1. **No se inventan datos.** Es la regla más importante. Fechas, salas, títulos, créditos y
   nombres son los que constan en Instagram, Linktree o Spotify. Lo que no consta se queda
   fuera. Ver [[datos-de-cedece]] para las fuentes de cada dato.
2. **Lo que se sabe a medias se marca, no se completa.** `datePrecision` (`day`/`month`/`year`)
   existe porque de siete de los ocho conciertos documentados no consta el día. Ver
   [[precision-de-fechas]].
3. **`content/` no se borra al enchufar Sanity.** Es el respaldo, y el punto 2 de la regla del
   contenido depende de que siga ahí.
4. **La sección de directo enseña el vacío, no lo esconde.** Hoy no hay fechas futuras y
   probablemente siga así. Esconder la sección se lleva por delante el historial de
   conciertos, que es el argumento de verdad ante una sala. Ver [[estado-vacio-del-directo]].
5. **Nada de formulario de contacto.** Un `mailto:` con la dirección visible deja el mensaje en
   la bandeja de enviados de quien escribe, que es donde lo quiere un promotor.
6. **Los vídeos del repositorio son diez de los dieciocho, y el del hero va a resolución
   nativa mientras los demás van reducidos.** Las dos cosas son decisiones medidas y las dos
   se pagaron con un fallo. Ver [[video-en-el-repositorio]].
7. **El crédito del fotógrafo se publica siempre que se sepa.** Todo el material gráfico de
   esta web lo hicieron Vaxa PH, Pablo CHD, Redesllá Comunicación y ferraz23_. Publicar su
   trabajo sin nombre es la forma más rápida de que la próxima vez no haya fotos.
8. **La indexación se decide por la RAMA, no por `VERCEL_ENV`.** El proyecto de test despliega
   `test` como su propia producción, así que allí `VERCEL_ENV` vale `production` también y
   habría dos copias de la web compitiendo en Google por «Cedecé».
9. **Los anchos de imagen no se escriben a mano en ningún componente.** Se leen de
   `public/media-index.json`. Escribir `-420` a mano ya rompió el hero una vez; ver
   [[fallos-ya-pagados]].
10. **El logotipo actual es una reconstrucción, y está dicho en el código.** No es el original;
    hay que pedírselo. Ver [[logotipo-provisional]].

## 4. Reglas del proyecto

Heredadas de la metodología de `Portfolio`:

1. **Contexto siempre a nivel de proyecto, nada global** — memorias y reglas viven en la rama
   `claude` y en `.claude/` de este repo. (`.claude/` está gitignorado: es local a la máquina.)
2. **Nunca subir secretos** — credenciales, keys, tokens y `.env` jamás se sincronizan con
   GitHub; al añadir uno nuevo se incluye en `.gitignore` **antes** de subir nada.
3. **Claude nunca hace commit ni push** — modifica ficheros y **propone un mensaje de commit
   CORTO y en inglés**; el usuario revisa y ejecuta. Sólo si lo pide explícitamente en el
   momento, Claude ejecuta el commit. _(En la sesión del 2026-08-03, Luis autorizó
   explícitamente el git y el alta en Vercel del montaje inicial.)_
4. **Sincronizar antes de trabajar** — `fetch`/`pull` antes de empezar una modificación.
5. **Rama por tarea, y la rama se BORRA al mergear** — rama con nombre representativo sacada de
   `develop`; al terminar, `git merge --no-ff` en `develop`, push, y `git branch -d` +
   `git push origin --delete`. **Nunca squash** en las promociones `develop` → `test` → `prod`.
6. **Los despliegues se validan con un preview real de Vercel**, nunca con `vercel build` en
   local: en Windows falla por un bug del builder, no de la web.
7. **`media/` no se sube.** Son 233 MB de originales de Instagram y está gitignorado. Lo que
   viaja es el resultado de los scripts.

### Modelo de ramas

| Rama      | Para qué                                                            | Vercel                               |
| --------- | ------------------------------------------------------------------- | ------------------------------------ |
| `claude`  | Contexto, memorias y reglas locales. Sin código                     | **Nada.** No despliega               |
| `develop` | Día a día: desarrollar, depurar y subir al repositorio sin publicar | **Nada.** No despliega               |
| `test`    | Entorno de test                                                     | `cedecetest` → cedecetest.vercel.app |
| `prod`    | Producción                                                          | `cedece` → cedece.vercel.app         |

`main` se borró en el montaje inicial y la rama por defecto de GitHub es `prod`.
Detalle en [[modelo-de-ramas]].

## 5. Protocolo de mantenimiento

En **cada cambio relevante**, sin que se lo pidan:

1. Actualizar las memorias afectadas en `memoria/` (rama `claude`) y su índice `MEMORY.md`.
2. Actualizar este `CLAUDE.md` **en las dos ramas** si el cambio afecta a la estructura, el
   stack, el estado o las convenciones.
3. Actualizar el `README.md` de `develop` si el cambio afecta a algo que deba saber quien
   despliegue o edite contenido — en particular la sección «Pendiente».

Regla de oro: **el contexto nunca debe quedar desactualizado respecto al estado real del
proyecto.**

---

_2026-08-03 — montaje inicial. Stack del Portfolio (Next 16 + Sanity + Vercel) con dos
diferencias deliberadas: trilingüe es/en/gl en vez de bilingüe, y contenido extraído de las
redes del propio artista en vez de escrito. La descarga de Instagram fue el trabajo menos
obvio de la sesión y está contada en [[material-de-instagram]]: el scraping anónimo devuelve
401 y hubo que sacarlo por una sesión de Chrome ya iniciada. El hallazgo con más consecuencias
para el contenido: **la cuenta está parada desde el 25 de febrero de 2024**, así que no hay
fechas futuras y el material gráfico se corta ahí, aunque en Spotify consta «Quítame» (2025)._
