import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  format: ['cjs', 'esm', 'iife'],
  globalName: 'polygen',
  dts: true,
  splitting: false,
  clean: true,
  minify: true,
})
