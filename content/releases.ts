import type { ReleaseInput } from './schema'

/**
 * LA DISCOGRAFÍA.
 *
 * Fuentes: el perfil de Spotify (los títulos, los años y las escuchas) y los posts de
 * Instagram (las fechas exactas y los créditos, que Spotify no da).
 *
 * **`datePrecision` es el campo importante de este fichero.** De «Hipersensible»
 * consta el día (15 de marzo de 2020, en la biografía de Spotify); de «Esposado» y de
 * «Cuentos de Dragones» consta porque él los anunció en Instagram el día que salieron; de
 * «Eres» y de «Quítame» sólo consta el año. En esos dos la fecha que se escribe abajo es
 * el 1 de enero —hace falta para poder ordenar— **con la precisión declarada en `year`**,
 * así que la web enseña «2023» y «2025» a secas y el 1 de enero no llega nunca a pantalla.
 * Sin ese campo, la web afirmaría dos fechas que nadie ha comprobado.
 *
 * Las escuchas de Spotify (28 de julio de 2026, 90 oyentes al mes) se anotan aquí como
 * comentario y no como dato de la web: envejecen solas y una cifra pequeña y vieja resta
 * más de lo que suma. «Sal y Hielo» 47.843 · «Tenemos que hablar» 9.198 · «Mil veces»
 * 4.851 · «Todo mi dolor» 1.984 · «Eres» 1.101.
 */
export const releases: ReleaseInput[] = [
  {
    title: 'Quítame',
    slug: 'quitame',
    kind: 'single',
    releaseDate: '2025-01-01',
    datePrecision: 'year',
    featured: true,
    links: [{ label: 'Spotify', url: 'https://open.spotify.com/artist/70aJqGXd1YRnJNcQDTBGp4' }],
  },
  {
    title: 'Cuentos de Dragones',
    slug: 'cuentos-de-dragones',
    kind: 'single',
    releaseDate: '2024-02-03',
    datePrecision: 'day',
    featured: true,
    about: {
      es: [
        'Se estrenó el 3 de febrero de 2024 en todas las plataformas, con vídeo grabado en The Magic Photo Galicia. Antes de que saliera ya se había escuchado un trozo: es la canción del TAKE ONE #2, grabado en Rianxo tres semanas antes.',
      ],
      en: [
        'Released on 3 February 2024 on every platform, with a video shot at The Magic Photo Galicia. A piece of it had already been heard before release: it is the song from TAKE ONE #2, recorded in Rianxo three weeks earlier.',
      ],
      gl: [
        'Estreouse o 3 de febreiro de 2024 en todas as plataformas, con vídeo gravado en The Magic Photo Galicia. Antes de que saíse xa se escoitara un anaco: é a canción do TAKE ONE #2, gravado en Rianxo tres semanas antes.',
      ],
    },
    credits: [
      { role: 'Letra y voz', who: 'Cedecé' },
      { role: 'Beat', who: 'Syndrome' },
      { role: 'Audio', who: 'La Escala Estudio' },
      { role: 'Cámara', who: 'Redesllá Comunicación' },
      { role: 'Edición', who: 'Cedecé' },
      { role: 'Localización', who: 'The Magic Photo Galicia' },
    ],
    links: [
      { label: 'YouTube', url: 'https://youtu.be/4TmA2PgnAA0' },
      { label: 'Spotify', url: 'https://open.spotify.com/artist/70aJqGXd1YRnJNcQDTBGp4' },
    ],
  },
  {
    title: 'Esposado',
    slug: 'esposado',
    kind: 'single',
    series: 'Quemaduras',
    seriesNumber: 5,
    releaseDate: '2023-09-25',
    datePrecision: 'day',
    featured: true,
    about: {
      es: [
        'Quinta entrega de «Quemaduras», la serie con la que va sacando canciones sin esperar a cerrar un disco. Salió el 25 de septiembre de 2023, justo después de la gira, cuando —en sus palabras— tocaba parar y encerrarse en el estudio.',
      ],
      en: [
        'Fifth instalment of «Quemaduras», the series he uses to release songs without waiting to finish a record. It came out on 25 September 2023, right after the tour, when — in his words — it was time to stop and shut himself in the studio.',
      ],
      gl: [
        'Quinta entrega de «Quemaduras», a serie coa que vai sacando cancións sen esperar a pechar un disco. Saíu o 25 de setembro de 2023, xusto despois da xira, cando —en palabras del— tocaba parar e encerrarse no estudio.',
      ],
    },
    credits: [
      { role: 'Letra y voz', who: 'Cedecé' },
      { role: 'Instrumental', who: 'Towerbeatz' },
      { role: 'Audio', who: 'Currice · Cool Mood Studios' },
      { role: 'Cámara', who: 'Vaxa PH' },
      { role: 'Edición', who: 'Cedecé' },
      { role: 'Color', who: 'Vaxa PH' },
    ],
    links: [{ label: 'Spotify', url: 'https://open.spotify.com/artist/70aJqGXd1YRnJNcQDTBGp4' }],
  },
  {
    title: 'Eres',
    slug: 'eres',
    kind: 'single',
    releaseDate: '2023-01-01',
    datePrecision: 'year',
    featured: false,
    links: [{ label: 'Spotify', url: 'https://open.spotify.com/artist/70aJqGXd1YRnJNcQDTBGp4' }],
  },
  {
    title: 'Hipersensible',
    slug: 'hipersensible',
    kind: 'album',
    releaseDate: '2020-03-15',
    datePrecision: 'day',
    featured: true,
    about: {
      es: [
        'Su primer disco, publicado el 15 de marzo de 2020 y producido íntegramente por él. Es el punto en el que doce años de nombres y de géneros distintos se quedan en uno.',
      ],
      en: [
        'His first album, released on 15 March 2020 and produced entirely by him. It is the point where twelve years of different names and different genres settle into one.',
      ],
      gl: [
        'O seu primeiro disco, publicado o 15 de marzo de 2020 e producido integramente por el. É o punto no que doce anos de nomes e de xéneros distintos quedan nun só.',
      ],
    },
    links: [{ label: 'Spotify', url: 'https://open.spotify.com/artist/70aJqGXd1YRnJNcQDTBGp4' }],
  },
]

/**
 * Temas sueltos anteriores que constan en Spotify por título y año aproximado, sin
 * material gráfico ni créditos comprobables. Se listan aparte, en una línea, en vez de
 * inflar la discografía con cinco fichas vacías.
 */
export const earlierTracks = [
  { title: 'Metro50', year: '2023' },
  { title: 'No es un juego', year: '2022' },
  { title: 'Bucle', year: '2022' },
  { title: 'Grisáceo', year: '2022' },
] as const
