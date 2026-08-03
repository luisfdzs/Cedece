import type { CollaboratorInput } from './schema'

/**
 * QUIÉN TOCA Y QUIÉN GRABA.
 *
 * Todos salen de los créditos que Cedecé escribe en sus propios pies de foto. Los nombres
 * se ponen como él los escribe; donde sólo consta el usuario de Instagram, se pone el
 * usuario y no un nombre reconstruido.
 *
 * Que esta sección exista es una decisión, no un relleno: en una web de artista pequeño,
 * los seis nombres de aquí son la mitad del proyecto. La guitarra de Rober Carcos es lo
 * que convierte los temas en un directo en acústico, y las fotos de Vaxa PH y de Pablo CHD
 * son literalmente todo el material gráfico que hay.
 */
export const collaborators: CollaboratorInput[] = [
  {
    name: 'Rober Carcos',
    role: {
      es: 'Guitarra en el directo',
      en: 'Guitar, live',
      gl: 'Guitarra no directo',
    },
    group: 'band',
    handle: 'robercarcos',
    url: 'https://www.instagram.com/robercarcos',
  },
  {
    name: 'Óscar «DJ Limón» Rodes',
    role: {
      es: 'Teclado en el directo',
      en: 'Keys, live',
      gl: 'Teclado no directo',
    },
    group: 'band',
    handle: 'oscar_rodes.dj_limon',
    url: 'https://www.instagram.com/oscar_rodes.dj_limon',
  },
  {
    name: 'Vaxa PH',
    role: {
      es: 'Fotografía, cámara y color',
      en: 'Photography, camera and colour',
      gl: 'Fotografía, cámara e cor',
    },
    group: 'visual',
    handle: 'vaxa_ph',
    url: 'https://www.instagram.com/vaxa_ph',
  },
  {
    name: 'Pablo CHD',
    role: {
      es: 'Fotografía de la gira',
      en: 'Tour photography',
      gl: 'Fotografía da xira',
    },
    group: 'visual',
    handle: 'pablochd',
    url: 'https://www.instagram.com/pablochd',
  },
  {
    name: 'Redesllá Comunicación',
    role: {
      es: 'Vídeo y sesiones de foto',
      en: 'Video and photo sessions',
      gl: 'Vídeo e sesións de foto',
    },
    group: 'visual',
    handle: 'redesllacomunicacion',
    url: 'https://www.instagram.com/redesllacomunicacion',
  },
  {
    name: 'ferraz23_',
    role: {
      es: 'Cámara de TAKE ONE',
      en: 'TAKE ONE camera',
      gl: 'Cámara de TAKE ONE',
    },
    group: 'visual',
    handle: 'ferraz23_',
    url: 'https://www.instagram.com/ferraz23_',
  },
  {
    name: 'La Escala Estudio',
    role: {
      es: 'Audio de «Cuentos de Dragones»',
      en: 'Audio on «Cuentos de Dragones»',
      gl: 'Audio de «Cuentos de Dragones»',
    },
    group: 'studio',
    handle: 'laescalaestudio',
    url: 'https://www.instagram.com/laescalaestudio',
  },
  {
    name: 'Cool Mood Studios',
    role: {
      es: 'Audio de «Esposado», con Currice',
      en: 'Audio on «Esposado», with Currice',
      gl: 'Audio de «Esposado», con Currice',
    },
    group: 'studio',
    handle: 'coolmoodstudios',
    url: 'https://www.instagram.com/coolmoodstudios',
  },
  {
    name: 'Syndrome',
    role: {
      es: 'Beat de «Cuentos de Dragones»',
      en: 'Beat on «Cuentos de Dragones»',
      gl: 'Beat de «Cuentos de Dragones»',
    },
    group: 'studio',
  },
  {
    name: 'Towerbeatz',
    role: {
      es: 'Instrumental de «Esposado»',
      en: 'Instrumental on «Esposado»',
      gl: 'Instrumental de «Esposado»',
    },
    group: 'studio',
    handle: 'towerbeatz',
    url: 'https://www.instagram.com/towerbeatz',
  },
  {
    name: 'Se Ven Algo Básico',
    role: {
      es: 'Feat en «Cruzo la carretera»',
      en: 'Feature on «Cruzo la carretera»',
      gl: 'Feat en «Cruzo la carretera»',
    },
    group: 'feature',
    handle: 'se_ven_algo_basico',
    url: 'https://www.instagram.com/se_ven_algo_basico',
  },
]
