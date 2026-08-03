import { defineField, defineType } from 'sanity'
import { localeNames, locales } from '../../lib/i18n/config'

/**
 * TEXTOS TRADUCIBLES
 *
 * Tres tipos de objeto —una línea, un párrafo y varios párrafos— con un campo por idioma.
 *
 * **Sólo el castellano es obligatorio.** Es la decisión que hace que el panel se pueda
 * usar de verdad: Cedecé publica un tema nuevo escribiendo el texto en castellano y le
 * da a «Publish»; la web sale al aire en los tres idiomas, con el inglés y el galego
 * cayendo al castellano hasta que alguien los traduzca (ver `lib/content.ts`). La
 * alternativa —exigir los tres— convierte cada publicación en un trabajo de traducción y
 * el resultado conocido es que la web se queda vieja.
 *
 * Los campos se generan del array `locales`, así que añadir un idioma es tocar
 * `lib/i18n/config.ts` y nada más.
 */
const localeFields = (rows?: number) =>
  locales.map((locale) =>
    defineField({
      name: locale,
      title: localeNames[locale],
      type: rows ? 'text' : 'string',
      ...(rows ? { rows } : {}),
      // Sólo `es` es obligatorio: el resto cae al castellano.
      validation: locale === 'es' ? (rule) => rule.required() : undefined,
    }),
  )

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Texto de una línea',
  type: 'object',
  // Colapsado por defecto: un formulario con doce campos de idioma abiertos no se lee.
  options: { collapsible: true, collapsed: false },
  fields: localeFields(),
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Texto',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: localeFields(3),
})

export const localizedParagraphs = defineType({
  name: 'localizedParagraphs',
  title: 'Varios párrafos',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: locales.map((locale) =>
    defineField({
      name: locale,
      title: localeNames[locale],
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
      validation: locale === 'es' ? (rule) => rule.required().min(1) : undefined,
    }),
  ),
})
