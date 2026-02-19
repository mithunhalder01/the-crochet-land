import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',  // 👈 repo name yaha daalo
  plugins: [react()],  // 👈 repo name yaha daalo
})
