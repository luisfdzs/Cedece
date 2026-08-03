/**
 * VÍDEOS: de 223 MB de originales a algo que se pueda servir desde el repositorio.
 *
 * **Aquí no se procesa todo lo que hay: se procesa lo que la web usa.** Es la decisión
 * central de este script y conviene entenderla antes de tocarlo.
 *
 * Los dieciocho vídeos que bajan de Instagram suman 223 MB. Comprimidos «bien» (CRF 32,
 * 960 px de alto) se quedaron en 76 MB, y eso sigue siendo demasiado para meterlo en git:
 * el historial de un repositorio no se limpia, así que 76 MB de vídeo son 76 MB para
 * siempre, en cada clon y en cada build. Así que se hacen dos cosas:
 *
 *  1. **Se elige.** Diez de los dieciocho son los que la web enseña de verdad: las tres
 *     entregas de TAKE ONE, los dos vídeos de lanzamiento y cinco directos. Los otros ocho
 *     son trozos de carrusel de vacaciones y de la gira que funcionan mejor como foto, y
 *     para ésos ya está la galería.
 *  2. **Se comprime por función, no por igual.** Un TAKE ONE es el contenido principal de
 *     su sección y se ve entero; un directo de doce segundos es acompañamiento. No tiene
 *     sentido gastar el mismo bitrate en los dos.
 *
 * **El sitio definitivo del vídeo no es el repositorio.** Cuando haya un almacén de blobs
 * (Vercel Blob) o el canal de YouTube tenga estos cortes subidos, el campo `file` del
 * esquema `video` pasa a ser una URL y esta carpeta se vacía. El modelo de contenido ya
 * está preparado para eso: ver el comentario de `sanity/schemas/video.ts`.
 *
 * Reejecutable: `npm run media:videos`. Tarda varios minutos.
 */
import { execFile } from 'node:child_process'
import { mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import ffmpegPath from 'ffmpeg-static'
import sharp from 'sharp'

const run = promisify(execFile)

const SRC = 'media'
const OUT = path.join('public', 'video')

/**
 * Los vídeos que viajan, con el trato que recibe cada uno.
 *
 * `height` y `crf`: los principales se ven a pantalla casi completa en móvil, así que
 * aguantan 720 px de alto; los de acompañamiento van en una retícula y con 540 sobran.
 * `loop`: además de la versión con sonido, deja un corte mudo de seis segundos para usar
 * de fondo. Sólo lo llevan los que la portada usa así.
 */
const KEEP = [
  // --- TAKE ONE: la serie es el contenido principal de la web ---
  { file: '2023-08-06_CvnR6_POvoH_01.mp4', height: 720, crf: 33, loop: true },
  { file: '2024-01-13_C2CptWyoPvx_01.mp4', height: 720, crf: 33, loop: true },
  { file: '2024-02-22_C3qVEbZIYWk_01.mp4', height: 720, crf: 33, loop: true },
  // --- Lanzamientos ---
  { file: '2024-02-03_C25ZMoso3GT_01.mp4', height: 720, crf: 33, loop: false },
  { file: '2023-09-25_CxnarPBIYT3_01.mp4', height: 720, crf: 33, loop: false },
  // --- Directo ---
  { file: '2024-02-18_C3fVaiCIuAJ_01.mp4', height: 540, crf: 35, loop: true },
  { file: '2024-02-14_C3VvTGpNPMT_01.mp4', height: 540, crf: 35, loop: false },
  { file: '2024-02-12_C3QohH4tBaF_01.mp4', height: 540, crf: 35, loop: false },
  { file: '2024-02-25_C3yFioWoA_R_01.mp4', height: 540, crf: 35, loop: false },
  { file: '2023-06-26_Ct9yNCJo64c_01.mp4', height: 540, crf: 35, loop: false },
]

/** Duración del bucle mudo de fondo, en segundos. */
const LOOP_SECONDS = 6

/**
 * Alto del bucle de fondo y de su fotograma: **el nativo de los originales**.
 *
 * No comparte constante con `MAX_HEIGHT` a propósito. Los dos números miden cosas distintas:
 * `MAX_HEIGHT` es «cuánto se ve un vídeo dentro de una columna de 420 px» y esto es «cuánto se
 * ve un vídeo a sangre en un monitor de 1900». Unificarlos volvería a producir el hero borroso.
 */
const LOOP_HEIGHT = 1280

/** Ancho del fotograma de portada del hero. Los originales son 720×1280, o sea el nativo. */
const FRAME_WIDTH = 720

async function ffmpeg(args) {
  // maxBuffer generoso: ffmpeg escribe mucho en stderr y con el valor por defecto revienta.
  await run(ffmpegPath, ['-y', '-hide_banner', '-loglevel', 'error', ...args], {
    maxBuffer: 64 * 1024 * 1024,
  })
}

async function main() {
  // Se parte de cero: si ayer se procesó un vídeo que hoy ya no está en KEEP, tiene que
  // desaparecer de public/ y no quedarse ahí engordando el despliegue en silencio.
  await rm(OUT, { recursive: true, force: true })
  await mkdir(OUT, { recursive: true })

  const available = new Set((await readdir(SRC)).filter((f) => /\.mp4$/i.test(f)))
  const missing = KEEP.filter((k) => !available.has(k.file)).map((k) => k.file)
  if (missing.length) {
    console.warn(`⚠️  No están en ${SRC}/ (¿falta descargarlos?):\n   ${missing.join('\n   ')}\n`)
  }
  const skipped = [...available].filter((f) => !KEEP.some((k) => k.file === f))

  let before = 0
  let after = 0
  /** Los fotogramas de portada extraídos, para registrarlos en el índice de medios al final. */
  const frames = []

  for (const { file, height, crf, loop } of KEEP) {
    if (!available.has(file)) continue

    const base = file.replace(/\.mp4$/i, '')
    const src = path.join(SRC, file)
    before += (await stat(src)).size

    const web = path.join(OUT, file)
    await ffmpeg([
      '-i',
      src,
      // `-2` mantiene la proporción y fuerza altura/anchura par, que H.264 exige.
      '-vf',
      `scale=-2:'min(${height},ih)'`,
      '-c:v',
      'libx264',
      '-crf',
      String(crf),
      '-preset',
      'slow',
      '-pix_fmt',
      'yuv420p',
      '-c:a',
      'aac',
      '-b:a',
      '96k',
      '-ac',
      '2',
      // Sin esto el navegador tiene que descargar el fichero entero antes de empezar.
      '-movflags',
      '+faststart',
      web,
    ])
    const webSize = (await stat(web)).size
    after += webSize

    let loopSize = 0
    if (loop) {
      const loopFile = path.join(OUT, `${base}-loop.mp4`)
      await ffmpeg([
        '-i',
        src,
        '-t',
        String(LOOP_SECONDS),
        // ⚠️ RESOLUCIÓN NATIVA, no la reducida de los vídeos normales.
        //
        // Aquí había un fallo real y visible: el bucle se generaba a 540 px de alto —304 de
        // ancho— y el hero lo estira a sangre, que en un monitor normal son 1905 px. O sea que
        // lo primero que veía cualquiera era una imagen ampliada seis veces. Un fondo de seis
        // segundos y sin audio pesa poco aunque vaya a 720×1280: unos cientos de kilobytes.
        // Los vídeos que se ven en una columna de 420 px sí se reducen; éste no, porque se ve
        // a pantalla completa.
        '-vf',
        `scale=-2:'min(${LOOP_HEIGHT},ih)'`,
        '-c:v',
        'libx264',
        '-crf',
        '33',
        '-preset',
        'slow',
        '-pix_fmt',
        'yuv420p',
        // `-an` quita el audio: un vídeo mudo puede autorreproducirse, uno con sonido no.
        '-an',
        '-movflags',
        '+faststart',
        loopFile,
      ])
      loopSize = (await stat(loopFile)).size
      after += loopSize

      /**
       * EL FOTOGRAMA DE PORTADA DEL HERO, sacado del vídeo y no de Instagram.
       *
       * Los pósters que da Instagram miden lo que Instagram quiera —el de Betanzos, 408 px de
       * ancho— y el hero los estira a pantalla completa igual que el vídeo. Extraerlo del
       * original a resolución nativa cuesta un fichero de 40 KB y arregla el medio segundo que
       * se ve antes de que arranque el vídeo, más el caso en que el navegador decide no
       * reproducirlo (ahorro de datos, batería baja): ahí este fotograma **es** el hero.
       *
       * Se coge al segundo 1 y no al 0: el primer fotograma de un vídeo de móvil suele ser el
       * más movido o el más oscuro.
       */
      // El nombre lleva el ancho, como el resto de imágenes de `public/`
      // (`…-720.webp`): es la convención que `lib/media.ts` sabe leer, y salirse de ella
      // dejaría el fotograma en disco sin que la web pudiera construir su `srcset`.
      const frameBase = `${base}-frame`
      const png = path.join(OUT, `${frameBase}.png`)
      await ffmpeg([
        '-ss',
        '1',
        '-i',
        src,
        '-frames:v',
        '1',
        `-vf`,
        `scale='min(${FRAME_WIDTH},iw)':-2`,
        png,
      ])

      // De PNG a AVIF y WebP con sharp, que es quien comprime el resto de las imágenes: así
      // el fotograma sale con la misma calidad y el mismo par de formatos que la galería.
      const meta = await sharp(png).metadata()
      const width = meta.width ?? FRAME_WIDTH
      for (const [ext, opts] of [
        ['avif', { quality: 52 }],
        ['webp', { quality: 78 }],
      ]) {
        await sharp(png)
          .toFormat(ext, opts)
          .toFile(path.join('public', 'posters', `${frameBase}-${width}.${ext}`))
      }
      await rm(png, { force: true })

      const frameBytes = (await stat(path.join('public', 'posters', `${frameBase}-${width}.webp`)))
        .size
      frames.push({ base: frameBase, width, height: meta.height ?? LOOP_HEIGHT, bytes: frameBytes })
    }

    console.log(
      `${file} → ${(webSize / 1048576).toFixed(1)} MB${loop ? ` + ${(loopSize / 1024).toFixed(0)} KB de bucle` : ''}`,
    )
  }

  // Se dice en voz alta lo que se ha dejado fuera. Un script que recorta en silencio
  // parece uno que lo ha cogido todo.
  if (skipped.length) {
    console.log(`\nFuera del repositorio a propósito (${skipped.length}, viven en ${SRC}/):`)
    for (const f of skipped) console.log(`   ${f}`)
  }

  await registerFrames(frames)

  console.log(
    `\n${KEEP.length} vídeos: ${(before / 1048576).toFixed(0)} MB de original → ${(after / 1048576).toFixed(1)} MB en public/video/`,
  )
}

/**
 * Registra los fotogramas extraídos en `public/media-index.json`.
 *
 * ⚠️ **Este script se ejecuta DESPUÉS de `media:images`**, porque ese es el que crea el índice.
 * Si se ejecuta antes, no hay índice que actualizar y los fotogramas quedan en disco sin que
 * `lib/media.ts` los encuentre — que es justo el fallo silencioso que ese módulo avisa por
 * consola. El orden está escrito en el README.
 *
 * Las entradas antiguas de `-frame` se borran antes de añadir las nuevas: si un vídeo sale de
 * `KEEP`, su fotograma no puede quedarse en el índice apuntando a un fichero que ya no existe.
 */
async function registerFrames(frames) {
  if (frames.length === 0) return

  const indexPath = path.join('public', 'media-index.json')
  let index
  try {
    index = JSON.parse(await readFile(indexPath, 'utf8'))
  } catch {
    console.warn(
      `⚠️  No hay ${indexPath}: ejecuta antes «npm run media:images». ` +
        `Los ${frames.length} fotogramas están en disco pero la web no los va a encontrar.`,
    )
    return
  }

  const kept = index.filter((entry) => !entry.base.endsWith('-frame'))
  for (const { base, width, height, bytes } of frames) {
    kept.push({
      base,
      kind: 'poster',
      width,
      height,
      widths: [width],
      variants: [`/posters/${base}-${width}.avif`, `/posters/${base}-${width}.webp`],
      bytes,
    })
  }

  await writeFile(indexPath, JSON.stringify(kept, null, 2))
  console.log(
    `\n${frames.length} fotogramas de hero a resolución nativa, registrados en ${indexPath}:`,
  )
  for (const { base, width, bytes } of frames) {
    console.log(`   ${base}-${width}.webp — ${(bytes / 1024).toFixed(0)} KB`)
  }
}

await main()
