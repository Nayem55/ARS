import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 1021,
    strictPort: true,
    allowedHosts: ['adnanraisandsons.com', 'www.adnanraisandsons.com'],
  },
})
