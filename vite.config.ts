import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/portfolio/',
  plugins: [react()],
  server: {
    // Pour le développement, redirige / vers /portfolio
    proxy: {
      '/': {
        target: 'https://claudioraharison.github.io/',
        changeOrigin: true,
        rewrite: (path) => path === '/' ? '/portfolio/' : path
      }
    }
  }
})
