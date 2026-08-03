import { orderRankField } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'

/**
 * UNA FOTO DE LA GALERÍA.
 *
 * Igual que los vídeos, la imagen **puede venir de dos sitios**: `localFile` apunta a lo
 * que ya está en `public/gallery/` (procesado de Instagram por `npm run media:images`) e
 * `image` es una imagen subida al panel. Si hay imagen subida, manda ella.
 *
 * `credit` no es decorativo y es obligatorio cuando se sabe: todas las fotos que hay hoy
 * las hicieron @vaxa_ph, @pablochd, @redesllacomunicacion o @ferraz23_, y son fotógrafos
 * que trabajan con él. Publicar su trabajo sin nombre es la forma más rápida de que la
 * próxima vez no haya fotos.
 */
export const photo = defineType({
  name: 'photo',
  title: 'Galería',
  type: 'document',
  fields: [
    orderRankField({ type: 'photo' }),
    defineField({
      name: 'localFile',
      title: 'Fichero en public/gallery/',
      type: 'string',
      description:
        'Nombre base sin ancho ni extensión: «2024-01-19_C2SzMQeocBu_01». La web añade el ancho y el formato.',
    }),
    defineField({
      name: 'image',
      title: 'Imagen subida',
      type: 'image',
      options: { hotspot: true },
      description: 'Si subes una imagen aquí, se usa ésta en vez del fichero local.',
    }),
    defineField({
      name: 'alt',
      title: 'Texto alternativo',
      type: 'localizedString',
      description: 'Qué se ve. Lo lee quien navega con lector de pantalla y también Google.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Pie',
      type: 'localizedText',
    }),
    defineField({
      name: 'place',
      title: 'Lugar',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Fecha',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
    }),
    defineField({
      name: 'credit',
      title: 'Fotografía de',
      type: 'string',
      description: 'Ponlo siempre que se sepa. Es su trabajo.',
    }),
    defineField({
      name: 'creditUrl',
      title: 'Enlace del fotógrafo',
      type: 'url',
    }),
    defineField({
      name: 'orientation',
      title: 'Orientación',
      type: 'string',
      initialValue: 'portrait',
      options: {
        list: [
          { title: 'Vertical', value: 'portrait' },
          { title: 'Horizontal', value: 'landscape' },
          { title: 'Cuadrada', value: 'square' },
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: { title: 'alt.es', subtitle: 'place', media: 'image', date: 'date' },
    prepare({ title, subtitle, media, date }) {
      return {
        title: title ?? '(sin descripción)',
        subtitle: [subtitle, String(date ?? '').slice(0, 10)].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
