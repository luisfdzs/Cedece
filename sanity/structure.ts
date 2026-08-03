import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list'
import type { StructureResolver } from 'sanity/structure'

/**
 * ESTRUCTURA DEL PANEL
 *
 * Se define a mano en vez de dejar la lista automática de tipos por tres razones:
 *
 * 1. **«Artista» se abre directo.** Es un documento único, y la lista por defecto mostraría
 *    una carpeta con un solo elemento dentro: un clic de más en el documento que más se toca.
 * 2. **Música, vídeos, galería y equipo se ordenan arrastrando.** Sin
 *    `orderableDocumentListDeskItem` el orden lo decidiría la fecha de creación del
 *    documento, que no tiene ninguna relación con el orden en que se quieren ver.
 * 3. **El directo NO se ordena a mano**, y ésa es la excepción deliberada: los conciertos
 *    se ordenan por fecha, que es el único orden que significa algo. Ofrecer un orden
 *    manual ahí sería una invitación a descolocarlos.
 *
 * El panel está **en castellano** porque lo va a usar Cedecé, y ése es su idioma.
 */
export const structure: StructureResolver = (S, context) => {
  return S.list()
    .title('Contenido')
    .items([
      S.listItem().title('Artista').id('artist').child(
        // El `documentId` fijo es lo que hace que el singleton sea de verdad único: sin
        // él, cada entrada al panel podría crear un documento nuevo del mismo tipo.
        S.document().schemaType('artist').documentId('artist').title('Artista'),
      ),

      S.divider(),

      orderableDocumentListDeskItem({
        type: 'release',
        title: 'Música',
        id: 'release-list',
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'video',
        title: 'Vídeos',
        id: 'video-list',
        S,
        context,
      }),

      // Por fecha, la más reciente arriba. Ver el punto 3 de la cabecera.
      S.listItem()
        .title('Directo')
        .id('show-list')
        .child(
          S.documentTypeList('show')
            .title('Directo')
            .defaultOrdering([{ field: 'date', direction: 'desc' }]),
        ),

      S.divider(),

      orderableDocumentListDeskItem({
        type: 'photo',
        title: 'Galería',
        id: 'photo-list',
        S,
        context,
      }),

      orderableDocumentListDeskItem({
        type: 'collaborator',
        title: 'Banda y equipo',
        id: 'collaborator-list',
        S,
        context,
      }),
    ])
}
