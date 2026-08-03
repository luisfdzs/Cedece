import { defineField, defineType } from 'sanity'

/**
 * EL ARTISTA — documento único.
 *
 * Todo lo que no es una lista: el nombre, quién es, dónde está y dónde se le escucha.
 * Es el documento que más se toca cuando cambia algo pequeño (un enlace nuevo, una
 * frase), así que en `sanity/structure.ts` se abre directo, sin carpeta intermedia.
 *
 * `platforms` es el campo que más trabaja de toda la web: es lo que alimenta los botones
 * de escucha del hero y del pie. Para un artista con 90 oyentes al mes en Spotify, el
 * único objetivo medible de la página es que quien entra acabe pulsando uno de esos
 * botones — así que si hay que elegir entre que un dato esté bonito o que ese enlace
 * funcione, gana el enlace.
 */
export const artist = defineType({
  name: 'artist',
  title: 'Artista',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre artístico',
      type: 'string',
      initialValue: 'Cedecé',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Frase',
      type: 'localizedString',
      description: 'Una línea. Es lo que se lee en el hero, en Google y al compartir el enlace.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Qué es',
      type: 'array',
      of: [{ type: 'localizedString' }],
      description:
        'Los tres rótulos de la biografía de Instagram: «Artista Sonoro», «Street Trader», «Storyteller». Cortos; se muestran en fila.',
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'city',
      title: 'Ciudad',
      type: 'string',
      initialValue: 'Vigo, Galicia',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'localizedParagraphs',
      description: 'De dónde viene y qué hace. Tres o cuatro párrafos.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'shortBio',
      title: 'Biografía corta',
      type: 'localizedText',
      description:
        'Dos líneas para prensa y para el mensaje de contacto. Si falta, se usa el primer párrafo de la biografía.',
    }),
    defineField({
      name: 'portrait',
      title: 'Retrato',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'localizedString',
          validation: (rule) => rule.required(),
        }),
        defineField({ name: 'credit', title: 'Fotografía de', type: 'string' }),
      ],
    }),
    defineField({
      name: 'platforms',
      title: 'Dónde escucharlo',
      type: 'array',
      description:
        'Spotify primero: es donde están las escuchas. El orden de aquí es el orden en pantalla.',
      of: [
        defineField({
          name: 'platform',
          title: 'Plataforma',
          type: 'object',
          fields: [
            defineField({
              name: 'kind',
              title: 'Plataforma',
              type: 'string',
              options: {
                list: [
                  { title: 'Spotify', value: 'spotify' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Apple Music', value: 'apple' },
                  { title: 'Bandcamp', value: 'bandcamp' },
                  { title: 'SoundCloud', value: 'soundcloud' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'X / Twitter', value: 'twitter' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Otra', value: 'other' },
                ],
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Etiqueta',
              type: 'string',
              description: 'Sólo si hace falta algo distinto del nombre de la plataforma.',
            }),
            defineField({
              name: 'url',
              title: 'Enlace',
              type: 'url',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'primary',
              title: 'Botón principal',
              type: 'boolean',
              description: 'Los marcados salen como botón grande en el hero.',
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'kind', subtitle: 'url', primary: 'primary' },
            prepare: ({ title, subtitle, primary }) => ({
              title: `${primary ? '★ ' : ''}${title ?? '(sin plataforma)'}`,
              subtitle,
            }),
          },
        }),
      ],
    }),
    defineField({
      name: 'bookingEmail',
      title: 'Correo de contratación',
      type: 'string',
      description:
        'Se muestra visible y en un `mailto:`. Nada de formulario: quien escribe por trabajo quiere el mensaje en su bandeja de enviados.',
      validation: (rule) =>
        rule.regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, { name: 'una dirección de correo' }),
    }),
    defineField({
      name: 'pressKitUrl',
      title: 'Dossier de prensa',
      type: 'url',
      description: 'Enlace al rider, fotos en alta y textos para salas y promotores.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline.es', media: 'portrait' },
  },
})
