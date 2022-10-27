import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import * as path from 'path'
const reactSvgPlugin = require('vite-plugin-react-svg')
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: ['es2020']
  },
  plugins: [
    reactSvgPlugin({
      defaultExport: 'component',

      // Boolean flag to enable/disable SVGO
      svgo: true
    }),
    reactRefresh()
  ],
  define: {
    'process.env.STAGE_API_URL': JSON.stringify(process.env.STAGE_API_URL),
    'process.env.STAGE_MIX_PANEL_KEY': JSON.stringify(process.env.STAGE_MIX_PANEL_KEY)
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      './runtimeConfig': './runtimeConfig.browser'
    }
  }
})
