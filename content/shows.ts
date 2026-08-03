import type { ShowInput } from './schema'

/**
 * EL DIRECTO.
 *
 * **Aquí es donde más fácil sería inventar y donde más se notaría.** La fuente de casi todo
 * lo que hay es un solo pie de foto: el resumen que Cedecé escribió el 4 de septiembre de
 * 2023 al terminar la gira «Más abierto que nunca», donde narra los conciertos en orden
 * pero **casi sin fechas**. Dice las ciudades (Vigo, Ponferrada, Porriño, Vigo otra vez,
 * Madrid, Lugo y un último fin de semana), dice que el de Olar das Artes fue en mayo y que
 * el de Madrid fue a principio de verano, y del resto no dice ni el mes.
 *
 * Por eso cada concierto lleva `datePrecision`. Las fechas de precisión `month` y `year`
 * son ordenaciones, no afirmaciones: la web escribe «mayo de 2023» o «2023» y no un día.
 * Un promotor que lea esta página tiene que poder confiar en lo que dice, y para eso hace
 * falta que la página distinga entre lo que sabe y lo que supone.
 *
 * **Y no hay fechas futuras.** La última que consta es el 1 de marzo de 2024 en el Belmont
 * de Vigo, anunciada en Instagram el 25 de febrero de 2024 — que es también la última
 * publicación de la cuenta. La web tiene que enseñar eso bien: ver el estado vacío de
 * `components/sections/Live.tsx`, que no disimula.
 */
export const shows: ShowInput[] = [
  {
    date: '2024-03-01',
    datePrecision: 'day',
    city: 'Vigo',
    venue: 'Belmont Cervecería',
    lineup: ['Rober Carcos'],
    format: 'acoustic',
    note: {
      es: 'Anunciado el 25 de febrero de 2024, con «Sal y Hielo» en el cartel.',
      en: 'Announced on 25 February 2024, with «Sal y Hielo» on the bill.',
      gl: 'Anunciado o 25 de febreiro de 2024, con «Sal y Hielo» no cartel.',
    },
  },

  // ─── Gira «Más abierto que nunca» (2023, acústico) ──────────────────────────
  // El orden es el que él narra. Las fechas de precisión `year` sólo sirven para
  // ordenar dentro del año; ninguna de ellas se muestra como día.
  {
    date: '2023-08-26',
    datePrecision: 'month',
    city: 'Galicia',
    tour: 'Más abierto que nunca',
    lineup: ['Rober Carcos'],
    format: 'acoustic',
    note: {
      es: 'El último de la gira, ya sólo Rober y él. «Aquí siempre va a haber sangre, sudor y lágrimas».',
      en: 'The last of the tour, down to just Rober and him. «Aquí siempre va a haber sangre, sudor y lágrimas».',
      gl: 'O último da xira, xa só Rober e el. «Aquí siempre va a haber sangre, sudor y lágrimas».',
    },
  },
  {
    date: '2023-08-01',
    datePrecision: 'month',
    city: 'Lugo',
    venue: 'Plaza Mayor',
    tour: 'Más abierto que nunca',
    lineup: ['Rober Carcos', 'Óscar «DJ Limón» Rodes'],
    format: 'acoustic',
    free: true,
    note: {
      es: 'Tocar en la plaza mayor «siempre es brutal».',
      en: 'Playing the main square «siempre es brutal».',
      gl: 'Tocar na praza maior «siempre es brutal».',
    },
  },
  {
    date: '2023-07-01',
    datePrecision: 'month',
    city: 'Madrid',
    venue: 'Búho Real',
    tour: 'Más abierto que nunca',
    lineup: ['Rober Carcos'],
    format: 'openmic',
    note: {
      es: 'Reventaron el micro abierto del Búho Real a principio de verano.',
      en: 'They blew up the open mic at Búho Real in early summer.',
      gl: 'Reventaron o micro aberto do Búho Real a principio de verán.',
    },
  },
  {
    date: '2023-05-01',
    datePrecision: 'month',
    city: 'Vigo',
    venue: 'Olar das Artes',
    tour: 'Más abierto que nunca',
    lineup: ['Rober Carcos', 'Óscar «DJ Limón» Rodes'],
    format: 'acoustic',
    note: {
      es: 'Coincidió con su cumpleaños y lo cuenta como uno de los mejores días de su vida.',
      en: 'It fell on his birthday and he calls it one of the best days of his life.',
      gl: 'Coincidiu co seu aniversario e cóntao como un dos mellores días da súa vida.',
    },
  },
  {
    date: '2023-04-01',
    datePrecision: 'year',
    city: 'O Porriño',
    venue: 'Plaza del Ayuntamiento',
    tour: 'Más abierto que nunca',
    lineup: ['Rober Carcos', 'Óscar «DJ Limón» Rodes'],
    format: 'acoustic',
    free: true,
  },
  {
    date: '2023-03-01',
    datePrecision: 'year',
    city: 'Ponferrada',
    tour: 'Más abierto que nunca',
    lineup: ['Rober Carcos', 'Óscar «DJ Limón» Rodes'],
    format: 'acoustic',
    note: {
      es: 'La primera salida de Galicia de la gira.',
      en: 'The tour’s first date outside Galicia.',
      gl: 'A primeira saída de Galicia da xira.',
    },
  },
  {
    date: '2023-02-01',
    datePrecision: 'year',
    city: 'Vigo',
    tour: 'Más abierto que nunca',
    lineup: ['Rober Carcos', 'Óscar «DJ Limón» Rodes'],
    format: 'acoustic',
    note: {
      es: 'El primero de la gira: en casa, y la primera vez que presentaban el formato en acústico.',
      en: 'The first of the tour: at home, and the first time they played the unplugged format live.',
      gl: 'O primeiro da xira: na casa, e a primeira vez que presentaban o formato en acústico.',
    },
  },
]

/**
 * La gira de 2023, como texto. Existe aparte de la lista de conciertos porque el valor de
 * «Más abierto que nunca» no está en las fechas —que casi no constan— sino en lo que fue:
 * la primera vez que se llevaron sus temas a un formato acústico de guitarra y teclado.
 */
export const tour = {
  name: 'Más abierto que nunca',
  year: '2023',
  summary: {
    es: 'A principios de 2023 les propuso a Rober Carcos y a Óscar «DJ Limón» Rodes hacer una gira en acústico con sus temas, y no lo dudaron. Recorrieron Vigo, Ponferrada, O Porriño, Madrid y Lugo, con Pablo CHD documentándolo. Acabó a finales de agosto.',
    en: 'In early 2023 he proposed an unplugged tour of his songs to Rober Carcos and Óscar «DJ Limón» Rodes, and they said yes on the spot. They played Vigo, Ponferrada, O Porriño, Madrid and Lugo, with Pablo CHD documenting it. It ended in late August.',
    gl: 'A principios de 2023 propúxolles a Rober Carcos e a Óscar «DJ Limón» Rodes facer unha xira en acústico cos seus temas, e non o dubidaron. Percorreron Vigo, Ponferrada, O Porriño, Madrid e Lugo, con Pablo CHD documentándoo. Acabou a finais de agosto.',
  },
} as const
