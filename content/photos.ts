import type { PhotoInput } from './schema'

/**
 * LA GALERÍA: las 31 fotografías de los carruseles de Instagram.
 *
 * **Los textos alternativos describen lo que se ve, no lo que decía el pie de foto.** Se
 * escribieron mirando las imágenes una por una; donde el pie de Instagram y la foto no
 * contaban lo mismo, manda la foto. Es la diferencia entre un `alt` que sirve a alguien
 * con lector de pantalla y uno que repite el titular.
 *
 * **El crédito no es opcional cuando se sabe.** Estas fotos las hicieron Vaxa PH, Pablo
 * CHD, Redesllá Comunicación y ferraz23_, que son gente que trabaja con él. Publicar su
 * trabajo sin nombre es la forma más rápida de que la próxima vez no haya fotos.
 *
 * `orientation` no es decorativo: es lo que usa la retícula de la galería para no recortar
 * verticales en un hueco horizontal. Sale de las dimensiones reales (ver
 * `public/media-index.json`, que genera `npm run media:images`).
 */
export const photos: PhotoInput[] = [
  // ─── Sesión en The Magic Photo Galicia · enero de 2024 ──────────────────────
  // El material más cuidado que hay, y el que sostiene la portada.
  {
    file: '2024-01-19_C2SzMQeocBu_01',
    alt: {
      es: 'Cedecé ante un micrófono vintage de rejilla, con abrigo negro y las manos abiertas, sobre una cortina de terciopelo rojo.',
      en: 'Cedecé at a vintage ribbon microphone, in a black coat with his hands open, against a red velvet curtain.',
      gl: 'Cedecé ante un micrófono vintage de reixa, con abrigo negro e as mans abertas, sobre unha cortina de veludo vermello.',
    },
    caption: {
      es: 'De la sesión en The Magic Photo Galicia, el adelanto de todo lo que venía después.',
      en: 'From the session at The Magic Photo Galicia — a preview of everything that came next.',
      gl: 'Da sesión en The Magic Photo Galicia, o adianto de todo o que viña despois.',
    },
    place: 'Vilagarcía de Arousa',
    date: '2024-01-19',
    credit: 'Redesllá Comunicación',
    orientation: 'square',
  },
  {
    file: '2024-01-19_C2SzMQeocBu_02',
    alt: {
      es: 'Cedecé con gafas redondas oscuras y una cazadora de carreras blanca, negra y amarilla, entre tubos de neón blancos.',
      en: 'Cedecé in round dark glasses and a white, black and yellow racing jacket, framed by white neon tubes.',
      gl: 'Cedecé con lentes redondas escuras e unha chaqueta de carreiras branca, negra e amarela, entre tubos de neón brancos.',
    },
    place: 'Vilagarcía de Arousa',
    date: '2024-01-19',
    credit: 'Redesllá Comunicación',
    orientation: 'square',
  },
  {
    file: '2024-01-19_C2SzMQeocBu_03',
    alt: {
      es: 'Cedecé machacando un balón en una canasta, junto a un mural de un radiocasete y una pared de carteles de baloncesto.',
      en: 'Cedecé dunking a basketball, beside a boombox mural and a wall of basketball posters.',
      gl: 'Cedecé machucando un balón nunha canastra, xunto a un mural dun radiocasete e unha parede de carteis de baloncesto.',
    },
    place: 'Vilagarcía de Arousa',
    date: '2024-01-19',
    credit: 'Redesllá Comunicación',
    orientation: 'square',
  },

  // ─── «Vuelven los tres Reyes Magos» · enero de 2024 ─────────────────────────
  {
    file: '2024-01-09_C14-z4KopJq_01',
    alt: {
      es: 'Los tres en directo en O Lar das Artes: Cedecé al micrófono con camisa blanca y corbata, Rober Carcos a la guitarra acústica y Óscar Limón al teclado.',
      en: 'The trio live at O Lar das Artes: Cedecé on the mic in a white shirt and tie, Rober Carcos on acoustic guitar and Óscar Limón on keys.',
      gl: 'Os tres en directo en O Lar das Artes: Cedecé ao micrófono con camisa branca e gravata, Rober Carcos á guitarra acústica e Óscar Limón ao teclado.',
    },
    caption: {
      es: '«Muy pronto… vuelven los tres Reyes Magos».',
      en: '«Muy pronto… vuelven los tres Reyes Magos».',
      gl: '«Muy pronto… vuelven los tres Reyes Magos».',
    },
    date: '2024-01-09',
    orientation: 'landscape',
  },
  ...([2, 3, 4, 5, 6, 7] as const).map((n): PhotoInput => ({
    file: `2024-01-09_C14-z4KopJq_0${n}`,
    alt: {
      es: 'Cedecé en directo en formato acústico, con Rober Carcos a la guitarra y Óscar Limón al teclado.',
      en: 'Cedecé playing live unplugged, with Rober Carcos on guitar and Óscar Limón on keys.',
      gl: 'Cedecé en directo en formato acústico, con Rober Carcos á guitarra e Óscar Limón ao teclado.',
    },
    date: '2024-01-09',
    orientation: 'landscape',
  })),

  // ─── Promoción · diciembre de 2023 ─────────────────────────────────────────
  {
    file: '2023-12-12_C0xIV0pr-dj_01',
    alt: {
      es: 'Cedecé sentado en un parque con una cazadora rosa y violeta, sirviéndose un café de una tetera negra.',
      en: 'Cedecé sitting in a park in a pink and purple jacket, pouring himself a coffee from a black teapot.',
      gl: 'Cedecé sentado nun parque cunha chaqueta rosa e violeta, servíndose un café dunha teteira negra.',
    },
    date: '2023-12-12',
    orientation: 'landscape',
  },

  // ─── Concierto de Lugo · septiembre de 2023 ────────────────────────────────
  {
    file: '2023-09-10_CxBbwhVo-5r_01',
    alt: {
      es: 'Cedecé cantando en la calle con gafas de sol azules y el brazo señalando al frente, con Rober Carcos a la guitarra detrás.',
      en: 'Cedecé singing in the street in blue sunglasses, arm pointing forward, with Rober Carcos on guitar behind him.',
      gl: 'Cedecé cantando na rúa con lentes de sol azuis e o brazo sinalando á fronte, con Rober Carcos á guitarra detrás.',
    },
    caption: {
      es: 'Del concierto de Lugo. Después de esos meses de conciertos tocaba encerrarse en el estudio.',
      en: 'From the Lugo show. After those months of gigs it was time to shut himself in the studio.',
      gl: 'Do concerto de Lugo. Despois deses meses de concertos tocaba encerrarse no estudio.',
    },
    place: 'Lugo',
    date: '2023-09-10',
    credit: 'Redesllá Comunicación',
    orientation: 'landscape',
  },
  ...([2, 3, 4, 5, 6, 7] as const).map((n): PhotoInput => ({
    file: `2023-09-10_CxBbwhVo-5r_0${n}`,
    alt: {
      es: 'Cedecé en el concierto de Lugo, tocando en la calle en formato acústico.',
      en: 'Cedecé at the Lugo show, playing unplugged in the street.',
      gl: 'Cedecé no concerto de Lugo, tocando na rúa en formato acústico.',
    },
    place: 'Lugo',
    date: '2023-09-10',
    credit: 'Redesllá Comunicación',
    orientation: 'landscape',
  })),

  // ─── Gira «Más abierto que nunca» · verano de 2023 ─────────────────────────
  {
    file: '2023-09-04_Cwx8opRoiUl_03',
    alt: {
      es: 'Los tres de pie sobre un escenario de noche en una plaza, tras un faldón negro con el logotipo circular y el rótulo CEDECÉ.',
      en: 'The three of them standing on a stage at night in a town square, behind a black skirt bearing the circular logo and the CEDECÉ wordmark.',
      gl: 'Os tres de pé sobre un escenario de noite nunha praza, tras un faldón negro co logotipo circular e o rótulo CEDECÉ.',
    },
    caption: {
      es: 'Gira «Más abierto que nunca». «Acaba el verano y acaba la gira… Pero para mí solo ha sido un nuevo comienzo».',
      en: 'The «Más abierto que nunca» tour. «Acaba el verano y acaba la gira… Pero para mí solo ha sido un nuevo comienzo».',
      gl: 'Xira «Más abierto que nunca». «Acaba el verano y acaba la gira… Pero para mí solo ha sido un nuevo comienzo».',
    },
    date: '2023-09-04',
    credit: 'Pablo CHD · Vaxa PH',
    orientation: 'portrait',
  },
  ...([6, 8, 9, 10] as const).map((n): PhotoInput => ({
    file: `2023-09-04_Cwx8opRoiUl_${String(n).padStart(2, '0')}`,
    alt: {
      es: 'Una parada de la gira «Más abierto que nunca», documentada por Pablo CHD.',
      en: 'A stop on the «Más abierto que nunca» tour, documented by Pablo CHD.',
      gl: 'Unha parada da xira «Más abierto que nunca», documentada por Pablo CHD.',
    },
    date: '2023-09-04',
    credit: 'Pablo CHD · Vaxa PH',
    orientation: 'portrait',
  })),

  // ─── París y Londres · agosto de 2023 ──────────────────────────────────────
  {
    file: '2023-08-22_CwQgIDQoAd3_01',
    alt: {
      es: 'Cedecé de perfil y en blanco y negro, con auriculares de diadema, tocando una escultura sonora en la Cité de la Musique de París.',
      en: 'Cedecé in profile in black and white, wearing over-ear headphones, touching a sound sculpture at the Cité de la Musique in Paris.',
      gl: 'Cedecé de perfil e en branco e negro, con auriculares de diadema, tocando unha escultura sonora na Cité de la Musique de París.',
    },
    caption: {
      es: '«Siempre quise tocar un instrumento». Visita a la Ciudad de la Música de París.',
      en: '«Siempre quise tocar un instrumento». A visit to the Cité de la Musique in Paris.',
      gl: '«Siempre quise tocar un instrumento». Visita á Cidade da Música de París.',
    },
    place: 'Cité de la Musique, París',
    date: '2023-08-22',
    orientation: 'portrait',
  },
  {
    file: '2023-08-22_CwQgIDQoAd3_05',
    alt: {
      es: 'Otra sala de la Cité de la Musique de París, en blanco y negro.',
      en: 'Another room at the Cité de la Musique in Paris, in black and white.',
      gl: 'Outra sala da Cité de la Musique de París, en branco e negro.',
    },
    place: 'Cité de la Musique, París',
    date: '2023-08-22',
    orientation: 'portrait',
  },
  {
    file: '2023-08-16_CwBC5bcoJPq_01',
    alt: {
      es: 'Cedecé apoyado en una baranda del Támesis con camisa estampada de hojas y gafas de sol amarillas, con el Big Ben al fondo.',
      en: 'Cedecé leaning on a railing by the Thames in a leaf-print shirt and yellow sunglasses, with Big Ben behind him.',
      gl: 'Cedecé apoiado nunha varanda do Támese con camisa estampada de follas e lentes de sol amarelas, co Big Ben ao fondo.',
    },
    place: 'Londres',
    date: '2023-08-16',
    orientation: 'portrait',
  },
  ...([2, 3] as const).map((n): PhotoInput => ({
    file: `2023-08-16_CwBC5bcoJPq_0${n}`,
    alt: {
      es: 'Cedecé en Londres, de vacaciones, antes de volver a la carga.',
      en: 'Cedecé in London, on holiday, before getting back to work.',
      gl: 'Cedecé en Londres, de vacacións, antes de volver á carga.',
    },
    place: 'Londres',
    date: '2023-08-16',
    orientation: 'portrait',
  })),
  {
    file: '2023-08-04_CviPAUoIeL7_01',
    alt: {
      es: 'Cedecé sentado en las escaleras acristaladas del Centro Pompidou, con sudadera negra y gafas de sol redondas.',
      en: 'Cedecé sitting on the glazed escalators of the Centre Pompidou, in a black hoodie and round sunglasses.',
      gl: 'Cedecé sentado nas escaleiras acristaladas do Centro Pompidou, con sudadeira negra e lentes de sol redondas.',
    },
    place: 'Centre Pompidou, París',
    date: '2023-08-04',
    orientation: 'landscape',
  },
  {
    file: '2023-08-04_CviPAUoIeL7_02',
    alt: {
      es: 'Segunda imagen en el Centro Pompidou de París.',
      en: 'Second image at the Centre Pompidou in Paris.',
      gl: 'Segunda imaxe no Centro Pompidou de París.',
    },
    place: 'Centre Pompidou, París',
    date: '2023-08-04',
    orientation: 'landscape',
  },

  // ─── Junio de 2023 ─────────────────────────────────────────────────────────
  {
    file: '2023-06-12_CtZue_toXkb_01',
    alt: {
      es: 'Cedecé sentado en el borde de un escenario de un bar, con camisa de estampado geométrico azul, pantalón de cuero y botas militares.',
      en: 'Cedecé sitting on the edge of a bar stage, in a blue geometric-print shirt, leather trousers and combat boots.',
      gl: 'Cedecé sentado no bordo dun escenario dun bar, con camisa de estampado xeométrico azul, pantalón de coiro e botas militares.',
    },
    date: '2023-06-12',
    credit: 'Pablo CHD · Vaxa PH',
    orientation: 'portrait',
  },
]
