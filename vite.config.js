import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the build can be hosted from any sub-path
// (e.g. GitHub Pages project sites) without broken asset URLs.
export default defineConfig({
  plugins: [react()],
  base: './',
})
