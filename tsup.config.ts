import { defineConfig } from 'tsup'

export default defineConfig([
  {
    name: 'main',
    entry: ['./src/index.ts'],
    outDir: './lib',
    format: ['esm','cjs'],
    sourcemap: true,
    clean: true,
    bundle: true,
    splitting: false,
    dts: true,
    target: 'es5',
  }
])
