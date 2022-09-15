import { defineConfig } from 'tsup'

export default defineConfig([
  {
    name: 'main',
    entry: ['./src/index.ts'],
    outDir: './lib',
    format: ['esm','cjs'],
    legacyOutput: true,
    sourcemap: true,
    clean: true,
    bundle: true,
    splitting: false,
    dts: true,
  }
])
