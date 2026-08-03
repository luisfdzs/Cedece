import type { Locale } from './config'

/**
 * LOS TEXTOS DE LA INTERFAZ.
 *
 * Rótulos, encabezados y estados vacíos. **Esto no va en Sanity**: es la web, no el
 * contenido. Si estuviera en el panel, cambiar «Música» por «Discografía» sería una
 * publicación de contenido y no un cambio de diseño, y además obligaría a Cedecé a
 * traducir la interfaz al galego y al inglés para poder anunciar un concierto.
 *
 * Al contrario que el contenido, **aquí los tres idiomas son obligatorios**: el tipo lo
 * exige. Un rótulo de navegación sin traducir se ve en cada página, no en una ficha.
 */
type Dict = {
  nav: {
    music: string
    videos: string
    live: string
    about: string
    gallery: string
    contact: string
  }
  hero: { listen: string; watch: string; scrollHint: string }
  music: {
    title: string
    lead: string
    album: string
    ep: string
    single: string
    tracks: string
    credits: string
    listenOn: string
    seriesEntry: (series: string, n: number) => string
    earlier: string
  }
  videos: {
    title: string
    lead: string
    takeoneTitle: string
    takeoneLead: string
    episode: (n: number) => string
    song: string
    watchOnInstagram: string
    watchOnYoutube: string
    playHint: string
  }
  live: {
    title: string
    lead: string
    upcoming: string
    past: string
    none: string
    noneHint: string
    tickets: string
    free: string
    soldOut: string
    with: string
    formats: { acoustic: string; band: string; openmic: string; solo: string }
  }
  about: {
    title: string
    band: string
    groups: { band: string; visual: string; studio: string; feature: string }
  }
  gallery: { title: string; lead: string; photoBy: string }
  contact: {
    title: string
    lead: string
    booking: string
    pressKit: string
    followOn: string
    /** Se usa mientras `bookingEmail` esté sin rellenar. Ver Contact.tsx. */
    instagramFallback: string
  }
  footer: { rights: string; builtWith: string; sourceNote: string }
  a11y: { skipToContent: string; changeLanguage: string; openMenu: string; playVideo: string }
}

const es: Dict = {
  nav: {
    music: 'Música',
    videos: 'Vídeos',
    live: 'Directo',
    about: 'Quién es',
    gallery: 'Galería',
    contact: 'Contacto',
  },
  hero: {
    listen: 'Escuchar',
    watch: 'Ver',
    scrollHint: 'Baja para escuchar',
  },
  music: {
    title: 'Música',
    lead: 'Un disco, una serie de entregas y los temas que han ido saliendo por el camino.',
    album: 'Disco',
    ep: 'EP',
    single: 'Tema',
    tracks: 'Temas',
    credits: 'Créditos',
    listenOn: 'Escuchar en',
    seriesEntry: (series, n) => `${n}.ª entrega de «${series}»`,
    earlier: 'Antes de eso',
  },
  videos: {
    title: 'Vídeos',
    lead: 'Directos, lanzamientos y la serie que graba en la calle.',
    takeoneTitle: 'TAKE ONE',
    takeoneLead:
      'Trozos de canciones en directo —antiguas, nuevas, inéditas— grabados a una toma en una parte distinta del mundo cada vez.',
    episode: (n) => `Entrega #${n}`,
    song: 'Canción',
    watchOnInstagram: 'Ver la publicación original',
    watchOnYoutube: 'Ver en YouTube',
    playHint: 'Pulsa para reproducir con sonido',
  },
  live: {
    title: 'Directo',
    lead: 'Guitarra, teclado y las canciones sin nada delante.',
    upcoming: 'Próximos conciertos',
    past: 'Ya tocados',
    none: 'No hay fechas anunciadas.',
    noneHint:
      'La última confirmada fue el 1 de marzo de 2024 en el Belmont de Vigo. Para contratación, escribe.',
    tickets: 'Entradas',
    free: 'Entrada libre',
    soldOut: 'Agotado',
    with: 'Con',
    formats: {
      acoustic: 'Acústico',
      band: 'Con banda',
      openmic: 'Micro abierto',
      solo: 'En solitario',
    },
  },
  about: {
    title: 'Quién es',
    band: 'Quién toca y quién graba',
    groups: {
      band: 'En el escenario',
      visual: 'Imagen y vídeo',
      studio: 'Producción y estudio',
      feature: 'Colaboraciones',
    },
  },
  gallery: {
    title: 'Galería',
    lead: 'Conciertos, sesiones y algún viaje.',
    photoBy: 'Foto de',
  },
  contact: {
    title: 'Contacto',
    lead: 'Para salas, festivales, colaboraciones o para decir cualquier cosa.',
    booking: 'Contratación',
    pressKit: 'Dossier de prensa',
    followOn: 'Está en',
    instagramFallback:
      'Mensajes directos en Instagram, por ahora. Queda pendiente una dirección de contratación.',
  },
  footer: {
    rights: 'Todos los derechos reservados.',
    builtWith: 'Hecha con Next.js y Sanity.',
    sourceNote: 'Fotos y vídeos de sus redes, con crédito de sus autores.',
  },
  a11y: {
    skipToContent: 'Saltar al contenido',
    changeLanguage: 'Cambiar de idioma',
    openMenu: 'Abrir el menú',
    playVideo: 'Reproducir el vídeo',
  },
}

const en: Dict = {
  nav: {
    music: 'Music',
    videos: 'Videos',
    live: 'Live',
    about: 'About',
    gallery: 'Gallery',
    contact: 'Contact',
  },
  hero: {
    listen: 'Listen',
    watch: 'Watch',
    scrollHint: 'Scroll to listen',
  },
  music: {
    title: 'Music',
    lead: 'One album, a series of instalments, and the tracks that came out along the way.',
    album: 'Album',
    ep: 'EP',
    single: 'Track',
    tracks: 'Tracks',
    credits: 'Credits',
    listenOn: 'Listen on',
    seriesEntry: (series, n) => `Instalment ${n} of «${series}»`,
    earlier: 'Before that',
  },
  videos: {
    title: 'Videos',
    lead: 'Live sets, releases, and the series he films in the street.',
    takeoneTitle: 'TAKE ONE',
    takeoneLead:
      'Pieces of songs played live — old, new, unreleased — recorded in a single take somewhere different in the world each time.',
    episode: (n) => `Episode #${n}`,
    song: 'Song',
    watchOnInstagram: 'See the original post',
    watchOnYoutube: 'Watch on YouTube',
    playHint: 'Tap to play with sound',
  },
  live: {
    title: 'Live',
    lead: 'Guitar, keys, and the songs with nothing in front of them.',
    upcoming: 'Upcoming shows',
    past: 'Already played',
    none: 'No dates announced.',
    noneHint:
      'The last confirmed one was 1 March 2024 at Belmont in Vigo. For bookings, get in touch.',
    tickets: 'Tickets',
    free: 'Free entry',
    soldOut: 'Sold out',
    with: 'With',
    formats: { acoustic: 'Unplugged', band: 'Full band', openmic: 'Open mic', solo: 'Solo' },
  },
  about: {
    title: 'About',
    band: 'Who plays and who films',
    groups: {
      band: 'On stage',
      visual: 'Image and video',
      studio: 'Production and studio',
      feature: 'Features',
    },
  },
  gallery: {
    title: 'Gallery',
    lead: 'Shows, sessions, and the odd trip.',
    photoBy: 'Photo by',
  },
  contact: {
    title: 'Contact',
    lead: 'For venues, festivals, collaborations, or to say anything at all.',
    booking: 'Bookings',
    pressKit: 'Press kit',
    followOn: 'Find him on',
    instagramFallback: 'Direct messages on Instagram, for now. A booking address is on the way.',
  },
  footer: {
    rights: 'All rights reserved.',
    builtWith: 'Built with Next.js and Sanity.',
    sourceNote: 'Photos and videos from his own channels, credited to their authors.',
  },
  a11y: {
    skipToContent: 'Skip to content',
    changeLanguage: 'Change language',
    openMenu: 'Open menu',
    playVideo: 'Play video',
  },
}

const gl: Dict = {
  nav: {
    music: 'Música',
    videos: 'Vídeos',
    live: 'Directo',
    about: 'Quen é',
    gallery: 'Galería',
    contact: 'Contacto',
  },
  hero: {
    listen: 'Escoitar',
    watch: 'Ver',
    scrollHint: 'Baixa para escoitar',
  },
  music: {
    title: 'Música',
    lead: 'Un disco, unha serie de entregas e os temas que foron saíndo polo camiño.',
    album: 'Disco',
    ep: 'EP',
    single: 'Tema',
    tracks: 'Temas',
    credits: 'Créditos',
    listenOn: 'Escoitar en',
    seriesEntry: (series, n) => `${n}.ª entrega de «${series}»`,
    earlier: 'Antes diso',
  },
  videos: {
    title: 'Vídeos',
    lead: 'Directos, lanzamentos e a serie que grava na rúa.',
    takeoneTitle: 'TAKE ONE',
    takeoneLead:
      'Anacos de cancións en directo —antigas, novas, inéditas— gravados a unha toma nunha parte distinta do mundo cada vez.',
    episode: (n) => `Entrega #${n}`,
    song: 'Canción',
    watchOnInstagram: 'Ver a publicación orixinal',
    watchOnYoutube: 'Ver en YouTube',
    playHint: 'Preme para reproducir con son',
  },
  live: {
    title: 'Directo',
    lead: 'Guitarra, teclado e as cancións sen nada diante.',
    upcoming: 'Próximos concertos',
    past: 'Xa tocados',
    none: 'Non hai datas anunciadas.',
    noneHint:
      'A última confirmada foi o 1 de marzo de 2024 no Belmont de Vigo. Para contratación, escribe.',
    tickets: 'Entradas',
    free: 'Entrada libre',
    soldOut: 'Esgotado',
    with: 'Con',
    formats: {
      acoustic: 'Acústico',
      band: 'Con banda',
      openmic: 'Micro aberto',
      solo: 'En solitario',
    },
  },
  about: {
    title: 'Quen é',
    band: 'Quen toca e quen grava',
    groups: {
      band: 'No escenario',
      visual: 'Imaxe e vídeo',
      studio: 'Produción e estudio',
      feature: 'Colaboracións',
    },
  },
  gallery: {
    title: 'Galería',
    lead: 'Concertos, sesións e algunha viaxe.',
    photoBy: 'Foto de',
  },
  contact: {
    title: 'Contacto',
    lead: 'Para salas, festivais, colaboracións ou para dicir calquera cousa.',
    booking: 'Contratación',
    pressKit: 'Dossier de prensa',
    followOn: 'Está en',
    instagramFallback:
      'Mensaxes directas en Instagram, polo de agora. Está por chegar un enderezo de contratación.',
  },
  footer: {
    rights: 'Todos os dereitos reservados.',
    builtWith: 'Feita con Next.js e Sanity.',
    sourceNote: 'Fotos e vídeos das súas redes, con crédito dos seus autores.',
  },
  a11y: {
    skipToContent: 'Saltar ao contido',
    changeLanguage: 'Cambiar de idioma',
    openMenu: 'Abrir o menú',
    playVideo: 'Reproducir o vídeo',
  },
}

const dictionaries: Record<Locale, Dict> = { es, en, gl }

export function t(locale: Locale): Dict {
  return dictionaries[locale]
}

export type { Dict }
