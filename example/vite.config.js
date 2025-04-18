import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  base: './',
  build: {
    outDir: '../dist/example',
    emptyOutDir: true
  },
  server: {
    port: 8082,
    open: true
  },
  css: {
    preprocessorOptions: {
      stylus: {
        javascriptEnabled: true
      },
    },
  },
  resolve: {
    alias: {
      'poly-generator': path.resolve(__dirname, '../src')
    }
  }
})
