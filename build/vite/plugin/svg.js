import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path';

export function createSvgPlugin() {
  return createSvgIconsPlugin({
    // Specify the icon folder to be cached
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // Specify the symbolId format
    symbolId: 'icon-[name]'
  })
}
