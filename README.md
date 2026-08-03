# Cedecé

Web de **Cedecé**, rapero de Vigo. Next.js 16 + Sanity + Vercel, trilingüe (castellano, inglés y
galego).

El contenido inicial se extrajo de su Instagram ([@soycedece](https://www.instagram.com/soycedece)),
su [Linktree](https://linktr.ee/Cedece) y su
[perfil de Spotify](https://open.spotify.com/artist/70aJqGXd1YRnJNcQDTBGp4).

---

## 1. Arrancar

```bash
npm install
npm run dev          # http://localhost:3000 → redirige a /es
```

**No hace falta configurar nada.** Sin variables de entorno la web se construye y se despliega
igual, leyendo el contenido de `content/`. Ver el punto 3.

```bash
npm run check        # typecheck + ESLint + Prettier. Tiene que estar limpio antes de subir.
npm run build        # build de producción
```

---

## 2. El material de Instagram

Los originales **no están en el repositorio**: `media/` está en `.gitignore` porque son 233 MB.
Lo que viaja es el resultado de procesarlos, en `public/`.

### Volver a descargarlos

El scraping anónimo de Instagram devuelve `401`, así que la descarga se hizo desde una sesión de
Chrome ya iniciada: se pidió el listado de publicaciones a la API interna de Instagram y después se
bajó cada fichero con `curl`, en lotes pequeños. El manifiesto resultante está en
`media/manifest.json`: 19 publicaciones, 68 ficheros.

Si hay que repetirlo, lo que hace falta es el manifiesto; con él, los lotes se bajan con
`curl -K`. **No conviene paralelizar mucho**: las URLs de `fbcdn` van firmadas, caducan, y las
ráfagas grandes se cortan.

### Procesarlos

```bash
npm run media:images   # media/*.jpg  → public/gallery/ y public/posters/ (AVIF + WebP, 3 anchos)
npm run media:videos   # media/*.mp4  → public/video/ (10 vídeos elegidos) y los fotogramas de hero
```

**El orden importa, y es ése**: `media:videos` registra sus fotogramas en
`public/media-index.json`, que es el fichero que crea `media:images`. Al revés, los fotogramas
quedan en disco sin que la web los encuentre (avisa por consola).

Dos decisiones que están explicadas largo en la cabecera de cada script y que conviene no deshacer
sin leerlas:

- **De los 18 vídeos sólo se procesan 10.** Comprimir los 18 «bien» daba 76 MB, y el historial de
  git no se limpia. Los otros 8 son trozos de carrusel que funcionan mejor como foto.
- **El bucle del hero va a resolución nativa (720×1280) y los demás vídeos reducidos.** Son dos
  cosas distintas: uno se ve a sangre en un monitor y los otros en una columna de 420 px.
  Unificarlos deja el hero borroso — ya pasó una vez.

---

## 3. El contenido: dos fuentes y una regla

Es la decisión de arquitectura central. Está en `lib/content.ts` con el razonamiento entero.

1. **`content/` es el suelo.** Está en el repositorio y nunca falta.
2. **Sanity manda cuando tiene documentos.** Si el panel está configurado y devuelve contenido, se
   usa el del panel. Si no, o si falla, se usa `content/`.

Lo que compra: **la web existe hoy, sin credenciales de nada.** Se puede clonar y desplegar sin dar
de alta un proyecto de Sanity, y el día que Cedecé quiera anunciar conciertos él mismo se enchufa el
panel sin tocar código.

Las dos fuentes cumplen el mismo contrato de zod (`content/schema.ts`), así que un documento del
panel al que le falte un campo **rompe el build diciendo qué campo** en vez de desplegar un hueco.

### Escribir contenido a mano

Los ficheros de `content/` se anotan con los tipos `…Input` (`ArtistInput`, `ShowInput`…) y no con
los de salida. Es lo que permite omitir los campos con valor por defecto; está explicado en
`content/schema.ts`.

### La regla que no se salta

**No se inventan datos.** Fechas, salas, títulos, créditos y nombres son los que constan en
Instagram, Linktree o Spotify. Lo que no consta se queda fuera, y lo que consta a medias se marca
con `datePrecision`:

- `day` — fecha comprobada («15 de marzo de 2020»).
- `month` — sólo consta el mes («mayo de 2023»).
- `year` — sólo consta el año («2023»).

La fecha se escribe siempre completa para poder ordenar, pero **la web sólo muestra hasta donde
llega la precisión declarada** (`lib/format.ts`). Sin ese campo, la página afirmaría siete fechas de
concierto que nadie ha comprobado — de los ocho que constan, sólo uno trae día.

---

## 4. Puesta en marcha del panel

Cuatro pasos. Mientras no se hagan, `/admin` explica esto mismo.

1. Crear un proyecto en [sanity.io/manage](https://sanity.io/manage), dataset `production`.
2. Copiar su `projectId` en `NEXT_PUBLIC_SANITY_PROJECT_ID` — en `.env.local` y en las variables de
   los **dos** proyectos de Vercel.
3. Importar el contenido actual, para que el panel arranque con lo que ya se ve y no en blanco:
   ```bash
   npx sanity login
   npm run migrate:build     # content/ → scripts/migration/import.ndjson
   npm run migrate:import
   ```
4. Crear el webhook de revalidación en **API › Webhooks**, apuntando a `/api/revalidate` de cada
   entorno, con el mismo secreto que `SANITY_REVALIDATE_SECRET`.

> ⚠️ Si el webhook se crea **por API**, hay que hacer después un `PATCH` con
> `rule: {on: ["create","update","delete"]}`. El `POST` no acepta `rule` y sin ese `PATCH` el
> webhook queda con buena pinta y **no se dispara nunca**.

---

## 5. Ramas y entornos

| Rama      | Para qué                                    | Vercel                      |
| --------- | ------------------------------------------- | --------------------------- |
| `claude`  | Contexto y reglas locales del proyecto      | **Nada.** No despliega      |
| `develop` | Día a día: desarrollar y subir sin publicar | **Nada.** No despliega      |
| `test`    | Entorno de test                             | Proyecto de test, `noindex` |
| `prod`    | Producción                                  | Proyecto de producción      |

`develop` y `claude` están desactivadas en `vercel.json`. Las promociones son
`develop` → `test` → `prod` con `merge --no-ff`, **nunca squash**.

**La indexación se decide por la rama, no por `VERCEL_ENV`** (`lib/site-env.ts`). El proyecto de
test despliega `test` como su propia producción, así que allí `VERCEL_ENV` también vale
`production`; usar esa variable dejaría dos copias de la web compitiendo en Google por «Cedecé».

---

## 6. Pendiente

Por orden de lo que más aporta:

- [ ] **El logotipo de verdad.** `components/layout/Logo.tsx` es una reconstrucción geométrica del
      monograma que se ve en el faldón del escenario. Hay que pedirle el SVG y cambiar **también**
      `app/(site)/[locale]/icon.tsx`.
- [ ] **Una dirección de contratación.** `artist.bookingEmail` está vacío y la sección de contacto
      cae a los mensajes de Instagram. Para un promotor, un correo es otra cosa.
- [ ] **Las portadas de los cinco lanzamientos.** No hay ninguna en Instagram. Las fichas están
      diseñadas para funcionar sin ellas, pero con portada la sección de música cambia de nivel. El
      campo `cover` ya existe en el modelo.
- [ ] **Material posterior a febrero de 2024.** La cuenta de Instagram está parada desde el día 25,
      así que la web llega hasta ahí: no hay fechas futuras y el material gráfico se corta. En
      Spotify sí consta «Quítame» (2025), sin foto ni créditos.
- [ ] **Dominio propio.** Se cambia en `content/site.ts`, en un solo sitio.
- [ ] Comprobaciones automáticas en móvil, al estilo del `check:mobile` del proyecto Portfolio.
- [ ] Visor a pantalla completa en la galería. Sería el primer componente de cliente nuevo de esa
      sección, y para 31 fotos que ya se ven bien no urge.
- [ ] Un `cron` semanal en `vercel.json`: reconstruiría la web sola y mantendría fresco el reparto
      entre conciertos próximos y pasados sin depender de que se publique algo en el panel.

---

## 7. Mapa del repositorio

```
app/(site)/[locale]/     La web pública: layout, portada, 404, favicon e imagen de Open Graph
app/(studio)/admin/      El panel de Sanity, servido dentro de la propia web
app/api/revalidate/      Webhook de publicación
components/sections/     Hero, Música, Vídeos, Directo, Quién es, Galería y Contacto
components/ui/           Photo, VideoFrame, Section, Ticker, PlatformIcon
content/                 EL CONTENIDO y su esquema de zod
lib/                     content.ts (la regla de las dos fuentes), format.ts, media.ts, i18n/
sanity/                  Cliente, consulta GROQ, esquemas y estructura del panel
scripts/                 Procesado de imágenes y vídeos, y migración a Sanity
media/                   Originales de Instagram. GITIGNORADO (233 MB)
```

Casi todos esos ficheros llevan una cabecera explicando **por qué** son como son, incluidos los
fallos que ya se pagaron. Merece la pena leerlas antes de cambiar algo que parezca raro.
