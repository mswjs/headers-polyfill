import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    name: 'main',
    entry: ['./src/index.ts'],
    outDir: './lib',
    format: ['esm', 'cjs'],
    sourcemap: true,
    clean: true,
    unbundle: false,
    dts: true,
    target: 'es2022',
    tsconfig: './tsconfig.build.json',
  },
])
