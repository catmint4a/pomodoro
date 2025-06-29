import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html'
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    },
    manifest: true,
    emptyOutDir: true,
    sourcemap: true,
    assetsInlineLimit: 0,
    assetsInlinePattern: '\\.(png|jpe?g|gif|svg)$'
  },
  base: '/pomodoro',
  server: {
    base: 'pomodoro'
  }
})
