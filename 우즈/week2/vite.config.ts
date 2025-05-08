import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
<<<<<<<< HEAD:우즈/week2/vite.config.ts
  plugins: [react()],
========
  plugins: [react(),tailwindcss()],
>>>>>>>> may:may/week6/mission1/vite.config.ts
})
