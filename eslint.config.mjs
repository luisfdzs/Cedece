// Next 16 publica `eslint-config-next` ya en formato flat: se compone directamente,
// sin el puente FlatCompat que hacía falta con Next 15.
import next from 'eslint-config-next/core-web-vitals'

const config = [
  ...next,
  {
    // next-env.d.ts lo genera Next en cada build: no es nuestro código. `.claude/` tampoco:
    // está gitignorado y es local a la máquina. `media/` son los originales de Instagram,
    // que no viajan al repositorio.
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/**',
      'media/**',
      'next-env.d.ts',
      '.vercel/**',
      '.claude/**',
    ],
  },
]

export default config
