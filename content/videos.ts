import type { VideoInput } from './schema'

/**
 * LOS VÍDEOS.
 *
 * Los diez que `scripts/build-videos.mjs` deja en `public/video/`. Los otros ocho que se
 * descargaron de Instagram son trozos de carrusel que funcionan mejor como foto y viven en
 * la galería; el porqué está en la cabecera de ese script.
 *
 * Títulos, canciones, lugares y créditos salen **literalmente de los pies de foto de
 * Instagram**. Donde el pie no dice el nombre de la canción, no se pone: en el directo del
 * 12 de febrero, por ejemplo, sólo consta el verso que él citó, así que el título es ese
 * verso y el campo `song` se queda vacío.
 *
 * `loop` sólo lo tienen los vídeos para los que el script genera un corte mudo de fondo.
 */
export const videos: VideoInput[] = [
  // ─── TAKE ONE ──────────────────────────────────────────────────────────────
  {
    title: {
      es: 'TAKE ONE #3 · Betanzos',
      en: 'TAKE ONE #3 · Betanzos',
      gl: 'TAKE ONE #3 · Betanzos',
    },
    kind: 'takeone',
    episode: 3,
    song: 'Algo falta',
    place: 'Betanzos',
    date: '2024-02-22',
    file: '2024-02-22_C3qVEbZIYWk_01.mp4',
    loop: '2024-02-22_C3qVEbZIYWk_01-loop.mp4',
    poster: '2024-02-22_C3qVEbZIYWk_01',
    featured: true,
    note: {
      es: 'Una de sus canciones favoritas del repertorio, en la calle, en Betanzos.',
      en: 'One of his own favourite songs from the set, on the street, in Betanzos.',
      gl: 'Unha das súas cancións favoritas do repertorio, na rúa, en Betanzos.',
    },
    credits: [
      { role: 'Cámara', who: 'ferraz23_' },
      { role: 'Edición de vídeo', who: 'Cedecé' },
    ],
    sourceUrl: 'https://www.instagram.com/p/C3qVEbZIYWk/',
  },
  {
    title: { es: 'TAKE ONE #2 · Rianxo', en: 'TAKE ONE #2 · Rianxo', gl: 'TAKE ONE #2 · Rianxo' },
    kind: 'takeone',
    episode: 2,
    song: 'Cuentos de Dragones',
    place: 'Rianxo',
    date: '2024-01-13',
    file: '2024-01-13_C2CptWyoPvx_01.mp4',
    loop: '2024-01-13_C2CptWyoPvx_01-loop.mp4',
    poster: '2024-01-13_C2CptWyoPvx_01',
    featured: true,
    note: {
      es: 'Grabado tres semanas antes de que «Cuentos de Dragones» estuviera disponible: cuando se publicó este vídeo, la canción todavía no había salido.',
      en: 'Recorded three weeks before «Cuentos de Dragones» was available: when this video went up, the song was not out yet.',
      gl: 'Gravado tres semanas antes de que «Cuentos de Dragones» estivese dispoñible: cando se publicou este vídeo, a canción aínda non saíra.',
    },
    credits: [
      { role: 'Cámara', who: 'ferraz23_' },
      { role: 'Edición de vídeo y audio', who: 'Cedecé' },
    ],
    sourceUrl: 'https://www.instagram.com/p/C2CptWyoPvx/',
  },
  {
    title: { es: 'TAKE ONE #1 · París', en: 'TAKE ONE #1 · Paris', gl: 'TAKE ONE #1 · París' },
    kind: 'takeone',
    episode: 1,
    song: 'Cruzo la carretera',
    place: 'París',
    date: '2023-08-06',
    file: '2023-08-06_CvnR6_POvoH_01.mp4',
    loop: '2023-08-06_CvnR6_POvoH_01-loop.mp4',
    poster: '2023-08-06_CvnR6_POvoH_01',
    featured: true,
    note: {
      es: 'El que empezó la serie. «Cruzo la carretera», con Se Ven Algo Básico.',
      en: 'The one that started the series. «Cruzo la carretera», featuring Se Ven Algo Básico.',
      gl: 'O que empezou a serie. «Cruzo la carretera», con Se Ven Algo Básico.',
    },
    credits: [
      { role: 'Feat', who: 'Se Ven Algo Básico' },
      { role: 'Cámara', who: 'Redesllá Comunicación' },
      { role: 'Edición de vídeo', who: 'Cedecé' },
      { role: 'Edición de audio', who: 'pako.rus' },
    ],
    sourceUrl: 'https://www.instagram.com/p/CvnR6_POvoH/',
  },

  // ─── Lanzamientos ──────────────────────────────────────────────────────────
  {
    title: {
      es: 'Cuentos de Dragones',
      en: 'Cuentos de Dragones',
      gl: 'Cuentos de Dragones',
    },
    kind: 'clip',
    song: 'Cuentos de Dragones',
    place: 'The Magic Photo Galicia',
    date: '2024-02-03',
    file: '2024-02-03_C25ZMoso3GT_01.mp4',
    youtubeId: '4TmA2PgnAA0',
    poster: '2024-02-03_C25ZMoso3GT_01',
    featured: true,
    note: {
      es: 'El vídeo con el que anunció el tema el día que salió.',
      en: 'The video he announced the track with, the day it came out.',
      gl: 'O vídeo co que anunciou o tema o día que saíu.',
    },
    credits: [
      { role: 'Letra y voz', who: 'Cedecé' },
      { role: 'Beat', who: 'Syndrome' },
      { role: 'Audio', who: 'La Escala Estudio' },
      { role: 'Cámara', who: 'Redesllá Comunicación' },
    ],
    sourceUrl: 'https://www.instagram.com/p/C25ZMoso3GT/',
  },
  {
    title: { es: 'Esposado', en: 'Esposado', gl: 'Esposado' },
    kind: 'clip',
    song: 'Esposado',
    date: '2023-09-25',
    file: '2023-09-25_CxnarPBIYT3_01.mp4',
    poster: '2023-09-25_CxnarPBIYT3_01',
    featured: false,
    note: {
      es: 'Quinta entrega de «Quemaduras».',
      en: 'Fifth instalment of «Quemaduras».',
      gl: 'Quinta entrega de «Quemaduras».',
    },
    credits: [
      { role: 'Instrumental', who: 'Towerbeatz' },
      { role: 'Audio', who: 'Currice · Cool Mood Studios' },
      { role: 'Cámara y color', who: 'Vaxa PH' },
    ],
    sourceUrl: 'https://www.instagram.com/p/CxnarPBIYT3/',
  },

  // ─── Directo ───────────────────────────────────────────────────────────────
  {
    title: {
      es: 'Plaza Mayor de Lugo',
      en: 'Plaza Mayor, Lugo',
      gl: 'Praza Maior de Lugo',
    },
    kind: 'live',
    place: 'Plaza Mayor de Lugo',
    date: '2024-02-18',
    file: '2024-02-18_C3fVaiCIuAJ_01.mp4',
    loop: '2024-02-18_C3fVaiCIuAJ_01-loop.mp4',
    poster: '2024-02-18_C3fVaiCIuAJ_01',
    featured: true,
    note: {
      es: 'La que liaron en un momento en la Plaza Mayor, con Rober Carcos de director de orquesta.',
      en: 'What they pulled off in a moment in the Plaza Mayor, with Rober Carcos conducting.',
      gl: 'A que liaron nun momento na Praza Maior, con Rober Carcos de director de orquestra.',
    },
    credits: [
      { role: 'Guitarra y dirección', who: 'Rober Carcos' },
      { role: 'Cámara', who: 'Vaxa PH · Pablo CHD' },
    ],
    sourceUrl: 'https://www.instagram.com/p/C3fVaiCIuAJ/',
  },
  {
    title: { es: 'Sal y Hielo', en: 'Sal y Hielo', gl: 'Sal y Hielo' },
    kind: 'live',
    song: 'Sal y Hielo',
    date: '2024-02-25',
    file: '2024-02-25_C3yFioWoA_R_01.mp4',
    poster: '2024-02-25_C3yFioWoA_R_01',
    featured: false,
    note: {
      es: '«La sal y el hielo en mi cuerpo han dejado cicatriz…». Es su tema más escuchado en Spotify.',
      en: '«La sal y el hielo en mi cuerpo han dejado cicatriz…». It is his most-played track on Spotify.',
      gl: '«La sal y el hielo en mi cuerpo han dejado cicatriz…». É o seu tema máis escoitado en Spotify.',
    },
    credits: [
      { role: 'Guitarra', who: 'Rober Carcos' },
      { role: 'Cámara', who: 'Pablo CHD · Vaxa PH' },
    ],
    sourceUrl: 'https://www.instagram.com/p/C3yFioWoA_R/',
  },
  {
    title: {
      es: 'Todo pasa por algo… ¿O no?',
      en: 'Todo pasa por algo… ¿O no?',
      gl: 'Todo pasa por algo… ¿O non?',
    },
    kind: 'live',
    date: '2024-02-14',
    file: '2024-02-14_C3VvTGpNPMT_01.mp4',
    poster: '2024-02-14_C3VvTGpNPMT_01',
    featured: false,
    note: {
      es: 'Rap, rock, guitarra y piano: el formato de los tres.',
      en: 'Rap, rock, guitar and piano: the trio format.',
      gl: 'Rap, rock, guitarra e piano: o formato dos tres.',
    },
    credits: [
      { role: 'Guitarra', who: 'Rober Carcos' },
      { role: 'Teclado', who: 'Óscar «DJ Limón» Rodes' },
      { role: 'Cámara', who: 'Vaxa PH · Pablo CHD' },
    ],
    sourceUrl: 'https://www.instagram.com/p/C3VvTGpNPMT/',
  },
  {
    title: {
      es: 'Universos paralelos · Lugo',
      en: 'Parallel universes · Lugo',
      gl: 'Universos paralelos · Lugo',
    },
    kind: 'live',
    place: 'Lugo',
    date: '2024-02-12',
    file: '2024-02-12_C3QohH4tBaF_01.mp4',
    poster: '2024-02-12_C3QohH4tBaF_01',
    featured: false,
    note: {
      es: '«Igual estamos bien y mucho nos queremos en cualquiera de los universos paralelos…».',
      en: '«Igual estamos bien y mucho nos queremos en cualquiera de los universos paralelos…».',
      gl: '«Igual estamos bien y mucho nos queremos en cualquiera de los universos paralelos…».',
    },
    credits: [
      { role: 'Guitarra', who: 'Rober Carcos' },
      { role: 'Teclado', who: 'Óscar Limón' },
      { role: 'Cámara', who: 'Vaxa PH · Pablo CHD' },
    ],
    sourceUrl: 'https://www.instagram.com/p/C3QohH4tBaF/',
  },
  {
    title: {
      es: 'Por mucho que me duela (directo)',
      en: 'Por mucho que me duela (live)',
      gl: 'Por mucho que me duela (directo)',
    },
    kind: 'live',
    song: 'Por mucho que me duela',
    place: 'Olar das Artes, Vigo',
    date: '2023-06-26',
    file: '2023-06-26_Ct9yNCJo64c_01.mp4',
    poster: '2023-06-26_Ct9yNCJo64c_01',
    featured: false,
    credits: [{ role: 'Guitarra', who: 'Rober Carcos' }],
    sourceUrl: 'https://www.instagram.com/p/Ct9yNCJo64c/',
  },
]
