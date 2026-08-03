import { orderRankField } from '@sanity/orderable-document-list'
import { defineField, defineType } from 'sanity'

/**
 * QUIÉN TOCA Y QUIÉN GRABA.
 *
 * Rober Carcos a la guitarra y Óscar «DJ Limón» Rodes al teclado son la banda del directo
 * en acústico —«los tres Reyes Magos», como los llamó él en enero de 2024—; el resto son
 * cámaras, estudios y productores.
 *
 * Existe como documento propio y no como texto suelto en cada tema por una razón práctica:
 * son las mismas cinco o seis personas repetidas en casi todos los lanzamientos, y tenerlos
 * en un sitio permite escribir bien el nombre una vez y enlazarlo siempre.
 */
export const collaborator = defineType({
  name: 'collaborator',
  title: 'Banda y equipo',
  type: 'document',
  fields: [
    orderRankField({ type: 'collaborator' }),
    defineField({
      name: 'name',
      title: 'Nombre',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Papel',
      type: 'localizedString',
      description: 'Guitarra, teclado, fotografía, mezcla, beat…',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'group',
      title: 'Grupo',
      type: 'string',
      initialValue: 'band',
      options: {
        list: [
          { title: 'Banda (directo)', value: 'band' },
          { title: 'Imagen y vídeo', value: 'visual' },
          { title: 'Producción y estudio', value: 'studio' },
          { title: 'Colaboración en un tema', value: 'feature' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'handle',
      title: 'Usuario de Instagram',
      type: 'string',
      description: 'Sin la arroba: «robercarcos».',
    }),
    defineField({
      name: 'url',
      title: 'Enlace',
      type: 'url',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role.es', group: 'group' },
    prepare({ title, subtitle, group }) {
      const labels: Record<string, string> = {
        band: 'Banda',
        visual: 'Imagen',
        studio: 'Estudio',
        feature: 'Feat',
      }
      return {
        title: title ?? '(sin nombre)',
        subtitle: [labels[group as string], subtitle].filter(Boolean).join(' · '),
      }
    },
  },
})
