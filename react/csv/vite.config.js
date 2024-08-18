import * as path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/csv',
  build: {
    outDir: '../../csv',
    emptyOutDir: true
  }
})
