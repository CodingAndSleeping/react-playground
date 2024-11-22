import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import path from 'path'

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vite.dev/config/
export default defineConfig({
  base: '/react-playground/',
  plugins: [
    react(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(__dirname, './src/assets/svg')],
      symbolId: 'icon-[name]',
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
