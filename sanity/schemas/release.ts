import { orderRankField } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'

/**
 * UN LANZAMIENTO: disco, EP o tema suelto.
 *
 * El `slug` **sí es la URL** (`/es/musica/cuentos-de-dragones`), al contrario que en los
 * demás documentos. Por eso conviene no tocarlo una vez publicado: cambiarlo rompe
 * cualquier enlace que se haya mandado por WhatsApp o pegado en una historia, que es
 * exactamente cómo se mueve la música de un artista con este tamaño de público.
 *
 * `series` existe por «Quemaduras», que no es un disco ni un single suelto sino una serie
 * de entregas numeradas —«Esposado» fue la quinta—. Sin este campo habría que elegir entre
 * mentir llamándolo álbum o perder la relación entre las entregas.
 */
export const release = defineType({
  name: 'release',
  title: 'Música',
  type: 'document',
  fields: [
    orderRankField({ type: 'release' }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      description:
        'Forma la dirección: /es/musica/cuentos-de-dragones. No lo cambies una vez publicado: rompería los enlaces ya compartidos.',
      options: { source: 'title', maxLength: 64 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Tipo',
      type: 'string',
      initialValue: 'single',
      options: {
        list: [
          { title: 'Álbum', value: 'album' },
          { title: 'EP', value: 'ep' },
          { title: 'Tema suelto', value: 'single' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'series',
      title: 'Serie',
      type: 'string',
      description:
        'Si forma parte de una serie de entregas, como «Quemaduras». Se deja vacío para lo demás.',
    }),
    defineField({
      name: 'seriesNumber',
      title: 'Número dentro de la serie',
      type: 'number',
      description: '«Esposado» es la 5ª entrega de Quemaduras.',
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Fecha de salida',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'datePrecision',
      title: '¿Cuánto se sabe de la fecha?',
      type: 'string',
      initialValue: 'day',
      description:
        'Si sólo consta el año, elige «Sólo el año» y la web escribirá «2023» en vez de un día inventado. La fecha de arriba se rellena igual (hace falta para ordenar), pero no se muestra entera.',
      options: {
        list: [
          { title: 'El día exacto', value: 'day' },
          { title: 'Sólo el mes', value: 'month' },
          { title: 'Sólo el año', value: 'year' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Portada',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'about',
      title: 'De qué va',
      type: 'localizedParagraphs',
      description: 'Uno o dos párrafos. Qué es y de dónde sale.',
    }),
    defineField({
      name: 'tracks',
      title: 'Temas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Sólo para discos y EPs. En un tema suelto se deja vacío.',
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
              description: 'Letra y voz, beat, mezcla, cámara, color…',
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
      name: 'links',
      title: 'Dónde escucharlo',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Plataforma',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Enlace',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: 'label', subtitle: 'url' } },
        }),
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Destacado en la portada',
      type: 'boolean',
      description: 'La portada muestra los destacados. El resto viven en /musica.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'releaseDate',
      kind: 'kind',
      media: 'cover',
      featured: 'featured',
    },
    prepare({ title, date, kind, media, featured }) {
      const labels: Record<string, string> = { album: 'Álbum', ep: 'EP', single: 'Tema' }
      return {
        title: `${featured ? '★ ' : ''}${title ?? '(sin título)'}`,
        subtitle: `${labels[kind as string] ?? '—'} · ${String(date ?? '').slice(0, 4)}`,
        media,
      }
    },
  },
})
