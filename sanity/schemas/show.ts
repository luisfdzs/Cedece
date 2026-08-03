import { defineField, defineType } from 'sanity'

/**
 * UN CONCIERTO.
 *
 * No lleva `orderRank`: los conciertos se ordenan **por fecha**, que es el único orden que
 * tiene sentido, y la web los reparte en «próximos» y «pasados» comparando con el día del
 * build (ver `next.config.ts` y `lib/format.ts`).
 *
 * Los pasados no se borran: la gira «Más abierto que nunca» de 2023 —Vigo, Ponferrada,
 * Porriño, Madrid, Lugo— es el argumento que lee un programador de sala antes de dar una
 * fecha. Un artista sin historial de directos parece que no ha tocado nunca.
 *
 * `soldOut` y `free` son dos estados distintos y los dos importan: «entrada libre» es
 * información que hace venir gente, y «agotado» es la prueba social más barata que hay.
 */
export const show = defineType({
  name: 'show',
  title: 'Directo',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      title: 'Fecha',
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
        'Es el campo que evita el error fácil de esta sección: inventarse un día para rellenar la ficha de un concierto que sí ocurrió. Si del concierto sólo consta que fue en mayo de 2023, elige «Sólo el mes».',
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
      name: 'city',
      title: 'Ciudad',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venue',
      title: 'Sala',
      type: 'string',
      description: 'Belmont Cervecería, Olar das Artes, Plaza Mayor de Lugo…',
    }),
    defineField({
      name: 'venueUrl',
      title: 'Enlace de la sala',
      type: 'url',
    }),
    defineField({
      name: 'tour',
      title: 'Gira',
      type: 'string',
      description: 'Si formó parte de una gira con nombre, como «Más abierto que nunca».',
    }),
    defineField({
      name: 'lineup',
      title: 'Con quién',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Rober Carcos, Óscar «DJ Limón» Rodes…',
    }),
    defineField({
      name: 'format',
      title: 'Formato',
      type: 'string',
      options: {
        list: [
          { title: 'Acústico', value: 'acoustic' },
          { title: 'Banda', value: 'band' },
          { title: 'Micro abierto', value: 'openmic' },
          { title: 'En solitario', value: 'solo' },
        ],
      },
    }),
    defineField({
      name: 'ticketsUrl',
      title: 'Entradas',
      type: 'url',
      description: 'Se deja vacío si la entrada es libre.',
    }),
    defineField({
      name: 'free',
      title: 'Entrada libre',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'soldOut',
      title: 'Agotado',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'note',
      title: 'Nota',
      type: 'localizedText',
    }),
  ],
  orderings: [
    {
      name: 'dateDesc',
      title: 'Por fecha (la más reciente primero)',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { date: 'date', city: 'city', venue: 'venue', tour: 'tour', soldOut: 'soldOut' },
    prepare({ date, city, venue, tour, soldOut }) {
      return {
        title: `${String(date ?? '').slice(0, 10)} · ${city ?? '(sin ciudad)'}`,
        subtitle: [venue, tour, soldOut ? 'AGOTADO' : null].filter(Boolean).join(' · '),
      }
    },
  },
})
