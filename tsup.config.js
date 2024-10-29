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
  outExtension({ format }) {
    switch (format) {
      case 'cjs':
        return { js: '.cjs' }
      case 'esm':
        return { js: '.mjs' }
      default:
        return { js: '.js' }
    }
  }
})
