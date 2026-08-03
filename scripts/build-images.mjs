/**
 * IMÁGENES: de los originales de Instagram a lo que viaja en el repositorio.
 *
 * Entra `media/` (gitignorado, 233 MB de descarga cruda) y sale `public/gallery/` y
 * `public/posters/`, que sí van al repositorio porque pesan poco.
 *
 * Dos anchos por imagen y AVIF además de WebP: el cargador de imágenes de este
 * proyecto (`sanity/imageLoader.ts`) sólo transforma URLs de la CDN de Sanity y
 * devuelve las rutas locales **intactas**, así que `sizes` y `quality` en el `<Image>`
 * no ahorran ni un byte. **El peso se decide aquí.** Es la misma regla que en el
 * Portfolio y conviene tenerla presente antes de tocar cualquier `<Image>`.
 *
 * Reejecutable: `npm run media:images`. Sobrescribe sin preguntar.
 */
import { mkdir, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = 'media'
const OUT = 'public'

/** Anchos servidos. 720 es el ancho nativo de casi todo lo que sube Instagram. */
const WIDTHS = [420, 720, 1080]

async function main() {
  const files = (await readdir(SRC)).filter((f) => /\.jpg$/i.test(f))

  await mkdir(path.join(OUT, 'gallery'), { recursive: true })
  await mkdir(path.join(OUT, 'posters'), { recursive: true })

  const index = []

  for (const file of files) {
    const isPoster = file.includes('_poster')
    const isProfile = file.startsWith('profile-')
    const dir = isPoster ? 'posters' : 'gallery'
    const base = file.replace(/\.jpg$/i, '').replace(/_poster$/, '')

    const src = sharp(path.join(SRC, file))
    const meta = await src.metadata()

    // El retrato de perfil es cuadrado y pequeño: no tiene sentido generar 1080.
    const widths = isProfile ? [420] : WIDTHS.filter((w) => w <= (meta.width ?? 720))
    if (widths.length === 0) widths.push(meta.width ?? 720)

    const variants = []
    for (const w of widths) {
      for (const [fmt, opts] of [
        ['avif', { quality: 52 }],
        ['webp', { quality: 78 }],
      ]) {
        const name = `${base}-${w}.${fmt}`
        await sharp(path.join(SRC, file))
          .resize({ width: w, withoutEnlargement: true })
          .toFormat(fmt, opts)
          .toFile(path.join(OUT, dir, name))
        variants.push(`/${dir}/${name}`)
      }
    }

    index.push({
      base,
      kind: isProfile ? 'profile' : isPoster ? 'poster' : 'gallery',
      width: meta.width ?? null,
      height: meta.height ?? null,
      widths,
      variants,
    })
    console.log(`${file} → ${variants.length} variantes (${widths.join('/')} px)`)
  }

  await writeFile(path.join(OUT, 'media-index.json'), JSON.stringify(index, null, 2))
  console.log(`\n${files.length} imágenes procesadas. Índice en public/media-index.json`)
}

await main()
