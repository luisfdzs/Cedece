import { orderRankField } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'

/**
 * UN VÍDEO: una entrega de TAKE ONE, un directo o un videoclip.
 *
 * **El fichero no se sube aquí: se referencia.** `file` apunta a algo que ya está en
 * `public/video/` (lo que produce `npm run media:videos` a partir de los originales de
 * Instagram) y `youtubeId` a YouTube. Los dos son opcionales y el orden de preferencia lo
 * decide la web: si hay fichero local se sirve el fichero, y si no, el embed.
 *
 * La razón de no usar el tipo `file` de Sanity es de coste: dieciocho vídeos verticales
 * son 223 MB de original y el plan gratuito de Sanity no está para eso. El sitio donde
 * viven los vídeos es una decisión de infraestructura, y este documento sólo tiene que
 * saber **cuál** es el vídeo, no dónde está alojado.
 *
 * `series` es lo que hace que TAKE ONE exista como sección: es una serie de directos a una
 * toma en sitios distintos (París, Rianxo, Betanzos…) y se lee en orden.
 */
export const video = defineType({
  name: 'video',
  title: 'Vídeos',
  type: 'document',
  fields: [
    orderRankField({ type: 'video' }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Tipo',
      type: 'string',
      initialValue: 'live',
      options: {
        list: [
          { title: 'TAKE ONE', value: 'takeone' },
          { title: 'Directo', value: 'live' },
          { title: 'Videoclip', value: 'clip' },
          { title: 'Otro', value: 'other' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'episode',
      title: 'Número de entrega',
      type: 'number',
      description: 'Sólo para TAKE ONE: 1 en París, 2 en Rianxo, 3 en Betanzos…',
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: 'song',
      title: 'Canción',
      type: 'string',
      description: 'El tema que suena. «Algo falta», «Cruzo la carretera»…',
    }),
    defineField({
      name: 'place',
      title: 'Lugar',
      type: 'string',
      description: 'Betanzos, Rianxo, París, Plaza Mayor de Lugo…',
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Fichero en public/video/',
      type: 'string',
      description:
        'Ruta relativa, por ejemplo «2024-02-22_C3qVEbZIYWk_01.mp4». Sale de npm run media:videos. Si está, manda sobre YouTube.',
    }),
    defineField({
      name: 'youtubeId',
      title: 'ID de YouTube',
      type: 'string',
      description: 'La parte final de la URL: en youtu.be/4TmA2PgnAA0 el ID es 4TmA2PgnAA0.',
    }),
    defineField({
      name: 'poster',
      title: 'Fotograma de portada',
      type: 'string',
      description:
        'Ruta en public/posters/, sin extensión ni ancho: «2024-02-22_C3qVEbZIYWk_01». La web añade el ancho y el formato.',
    }),
    defineField({
      name: 'aspect',
      title: 'Proporción',
      type: 'string',
      initialValue: 'vertical',
      options: {
        list: [
          { title: 'Vertical (9:16)', value: 'vertical' },
          { title: 'Horizontal (16:9)', value: 'horizontal' },
          { title: 'Cuadrado (1:1)', value: 'square' },
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'note',
      title: 'Nota',
      type: 'localizedText',
      description: 'Lo que se cuenta debajo del vídeo. Dos líneas.',
    }),
    defineField({
      name: 'credits',
      title: 'Créditos',
      type: 'array',
      of: [
        defineField({
          name: 'credit',
          type: 'object',
          fields: [
            defineField({
              name: 'role',
              title: 'Papel',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'who',
              title: 'Quién',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'url', title: 'Enlace', type: 'url' }),
          ],
          preview: { select: { title: 'who', subtitle: 'role' } },
        }),
      ],
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Publicación original',
      type: 'url',
      description: 'El post de Instagram del que sale, para poder volver a la fuente.',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado en la portada',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: 'title.es', kind: 'kind', episode: 'episode', place: 'place', date: 'date' },
    prepare({ title, kind, episode, place, date }) {
      const labels: Record<string, string> = {
        takeone: 'TAKE ONE',
        live: 'Directo',
        clip: 'Videoclip',
        other: 'Vídeo',
      }
      const tag = kind === 'takeone' && episode ? `TAKE ONE #${episode}` : labels[kind as string]
      return {
        title: title ?? '(sin título)',
        subtitle: [tag, place, String(date ?? '').slice(0, 10)].filter(Boolean).join(' · '),
      }
    },
  },
})
