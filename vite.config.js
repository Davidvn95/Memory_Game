import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import { manifestForPlugin } from './viteManifest'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
})
