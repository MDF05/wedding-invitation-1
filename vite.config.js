import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [vue(),tailwindcss(),],
  css: {
    postcss: './postcss.config.js' // Hapus baris ini jika ada
  },

})