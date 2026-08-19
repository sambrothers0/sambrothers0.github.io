import { copyFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// GitHub Pages serves 404.html for any path it has no file for. Shipping a copy
// of index.html under that name lets the SPA boot on the original URL, so
// vue-router resolves the path itself and renders NotFound for bogus slugs.
function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    closeBundle() {
      const dist = fileURLToPath(new URL('./dist', import.meta.url))
      copyFileSync(`${dist}/index.html`, `${dist}/404.html`)
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  // `?component` on an import from src/assets/icons inlines the SVG as a Vue
  // component, so the icons draw with currentColor instead of needing a
  // light/dark PNG pair. removeViewBox is off: the icons carry no width/height
  // of their own and rely on the viewBox to scale.
  plugins: [
    vue(),
    svgLoader({ svgoConfig: { plugins: [{ name: 'preset-default', params: { overrides: { removeViewBox: false } } }] } }),
    githubPagesSpaFallback()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    outDir: 'dist'
  }
})
