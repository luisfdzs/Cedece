import type { SchemaTypeDefinition } from 'sanity'
import { artist } from './artist'
import { collaborator } from './collaborator'
import { localizedParagraphs, localizedString, localizedText } from './localized'
import { photo } from './photo'
import { release } from './release'
import { show } from './show'
import { video } from './video'

/**
 * Los tipos de objeto traducibles van primero por legibilidad, no por necesidad: Sanity
 * resuelve las referencias entre tipos sin importar el orden del array.
 */
export const schemaTypes: SchemaTypeDefinition[] = [
  localizedString,
  localizedText,
  localizedParagraphs,
  artist,
  release,
  video,
  show,
  photo,
  collaborator,
]
