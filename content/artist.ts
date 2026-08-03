import type { ArtistInput } from './schema'

/**
 * QUIÉN ES CEDECÉ.
 *
 * **Todo lo que hay aquí consta en una fuente.** La trayectoria (2008, Jako, Jako CDC, el
 * rock y el R&B, «Hipersensible» autoproducido en marzo de 2020, la serie «Quemaduras»)
 * viene de la biografía de su perfil de Spotify. Los tres rótulos son literalmente los de
 * su biografía de Instagram. Que Vigo es su casa lo dice él: «Empezamos en casa, en Vigo»,
 * en el resumen de la gira de 2023. Lo que no consta se queda fuera — ver la regla 4 del
 * CLAUDE.md.
 *
 * Lo que NO se pone y podría tentar: la edad. Se puede deducir de un post («coincidiendo
 * con mi 27 cumpleaños», mayo de 2023), pero es un dato personal que él no ha publicado
 * como tal y que no ayuda a nadie a escuchar la música.
 */
export const artist: ArtistInput = {
  name: 'Cedecé',

  tagline: {
    es: 'Rap de Vigo. Letras que cuentan algo y directos en acústico.',
    en: 'Rap from Vigo, Spain. Songs that tell you something, played live and unplugged.',
    gl: 'Rap de Vigo. Letras que contan algo e directos en acústico.',
  },

  roles: [
    { es: 'Artista sonoro', en: 'Sound artist', gl: 'Artista sonoro' },
    { es: 'Street trader', en: 'Street trader', gl: 'Street trader' },
    { es: 'Storyteller', en: 'Storyteller', gl: 'Contacontos' },
  ],

  city: 'Vigo, Galicia',

  bio: {
    es: [
      'Cedecé lleva haciendo rap desde 2008. Empezó firmando como Jako, pasó por Jako CDC y se quedó con el nombre que lleva ahora. En medio se fue al rock y al R&B y volvió, que es una forma de decir que lo que le interesa no es el género sino contar algo.',
      'En marzo de 2020 publicó «Hipersensible», su primer disco, producido por él mismo. Desde entonces ha ido soltando temas sueltos y entregas de «Quemaduras», la serie con la que va sacando canciones sin esperar a tener un disco entero: «Esposado» fue la quinta.',
      'El directo lo hace en acústico, con Rober Carcos a la guitarra y Óscar «DJ Limón» Rodes al teclado. Los tres se recorrieron Galicia, Ponferrada y Madrid en 2023 con la gira «Más abierto que nunca», una mezcla que, en sus palabras, no habían visto antes.',
      'Y cuando no hay concierto hay TAKE ONE: trozos de canciones grabados en directo, a una toma, en la calle de una ciudad distinta cada vez. París, Rianxo, Betanzos.',
    ],
    en: [
      "Cedecé has been making rap since 2008. He started out as Jako, went through Jako CDC, and settled on the name he uses now. Along the way he detoured into rock and R&B and came back — which is one way of saying that what interests him isn't the genre but having something to say.",
      'In March 2020 he released «Hipersensible», his first album, which he produced himself. Since then he has been putting out one-off tracks and instalments of «Quemaduras», the series he uses to release songs without waiting to finish a whole record: «Esposado» was the fifth.',
      'Live, he plays unplugged, with Rober Carcos on guitar and Óscar «DJ Limón» Rodes on keys. The three of them toured Galicia, Ponferrada and Madrid in 2023 as «Más abierto que nunca» — a combination that, in his words, they had never seen before.',
      'And when there is no show there is TAKE ONE: pieces of songs recorded live, in one take, on the street of a different city each time. Paris, Rianxo, Betanzos.',
    ],
    gl: [
      'Cedecé leva facendo rap desde 2008. Empezou asinando como Jako, pasou por Jako CDC e quedou co nome que leva agora. Polo medio marchou ao rock e ao R&B e volveu, que é unha forma de dicir que o que lle interesa non é o xénero senón contar algo.',
      'En marzo de 2020 publicou «Hipersensible», o seu primeiro disco, producido por el mesmo. Desde aquela foi soltando temas soltos e entregas de «Quemaduras», a serie coa que vai sacando cancións sen esperar a ter un disco enteiro: «Esposado» foi a quinta.',
      'O directo faino en acústico, con Rober Carcos á guitarra e Óscar «DJ Limón» Rodes ao teclado. Os tres percorreron Galicia, Ponferrada e Madrid en 2023 coa xira «Más abierto que nunca», unha mestura que, en palabras del, non viran antes.',
      'E cando non hai concerto hai TAKE ONE: anacos de cancións gravados en directo, a unha toma, na rúa dunha cidade distinta cada vez. París, Rianxo, Betanzos.',
    ],
  },

  shortBio: {
    es: 'Rapero de Vigo en activo desde 2008. Autor de «Hipersensible» (2020) y de la serie «Quemaduras». Toca en acústico con guitarra y teclado.',
    en: 'Rapper from Vigo, active since 2008. Author of «Hipersensible» (2020) and the «Quemaduras» series. Plays live unplugged, with guitar and keys.',
    gl: 'Rapeiro de Vigo en activo desde 2008. Autor de «Hipersensible» (2020) e da serie «Quemaduras». Toca en acústico con guitarra e teclado.',
  },

  portrait: {
    file: 'profile-cedece',
    alt: {
      es: 'Retrato de Cedecé.',
      en: 'Portrait of Cedecé.',
      gl: 'Retrato de Cedecé.',
    },
  },

  /**
   * Spotify primero y como botón principal: es donde están las escuchas y es el único
   * enlace de esta lista que se traduce en algo medible. YouTube segundo porque es donde
   * viven los vídeos completos.
   */
  platforms: [
    {
      kind: 'spotify',
      url: 'https://open.spotify.com/artist/70aJqGXd1YRnJNcQDTBGp4',
      primary: true,
    },
    { kind: 'youtube', url: 'https://www.youtube.com/@Cedece', primary: true },
    { kind: 'instagram', url: 'https://www.instagram.com/soycedece', primary: false },
    { kind: 'tiktok', url: 'https://www.tiktok.com/@_cedece', primary: false },
    { kind: 'twitter', label: 'Twitter', url: 'https://twitter.com/_cedece', primary: false },
    { kind: 'facebook', url: 'https://www.facebook.com/escedece', primary: false },
    { kind: 'other', label: 'Linktree', url: 'https://linktr.ee/Cedece', primary: false },
  ],
}
