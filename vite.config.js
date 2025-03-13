import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import {createVitePlugin} from './build/vite/plugin/index.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: createVitePlugin(),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
