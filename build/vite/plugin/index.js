import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { createSvgPlugin } from './svg'
import { createVantPlugin } from './vant'

export function createVitePlugin() {
  const vitePlugins = [
    vue(),
    vueJsx(),
    vueDevTools(),
  ]

  vitePlugins.push(createSvgPlugin())

  vitePlugins.push(...createVantPlugin())

  return vitePlugins
}
