import { copyFileSync } from 'node:fs'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

// Long-form notes are markdown files (src/content/notes/data/*.md), and they are
// rendered here rather than in the browser: the entry arrives in the bundle as
// plain data — front matter, HTML, a plain-text excerpt for the list row, and a
// read time — so markdown-it stays a devDependency and never ships.
//
// Front matter carries exactly the fields a .js note carries; see the shape
// documented in src/content/notes/index.js.
const markdown = new MarkdownIt({ html: false, linkify: true, typographer: true })

const WORDS_PER_MINUTE = 220

/* The list row shows plain text, so the first paragraph has to lose its
   markup. Only the inline syntax a note actually uses is stripped — anything
   more elaborate belongs in the body, which is rendered properly. */
function plainExcerpt(body) {
  const [firstParagraph = ''] = body.trim().split(/\n\s*\n/)
  return firstParagraph
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')  // links and images -> their text
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function notesMarkdown() {
  return {
    name: 'notes-markdown',
    // ahead of Vite's own handling, which has no idea what a .md file is
    enforce: 'pre',
    transform(code, id) {
      // a query suffix (?raw, ?url) means the importer wants the file itself
      if (!id.endsWith('.md')) return null

      const { data, content } = matter(code)

      /* `draft: true` in the front matter keeps a note out of the site, and
         the loaders already drop anything `hidden`, so a draft becomes one
         here. Returning the flag alone rather than the note is the point of
         doing this in the plugin: an unpublished draft never reaches the
         bundle, so it cannot be read out of the shipped JavaScript. */
      if (data.draft) return { code: 'export default { hidden: true }', map: null }

      const words = content.trim().split(/\s+/).filter(Boolean).length

      const note = {
        ...data,
        date: String(data.date),
        html: markdown.render(content),
        excerpt: plainExcerpt(content),
        readMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE))
      }

      return { code: `export default ${JSON.stringify(note)}`, map: null }
    }
  }
}

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
    notesMarkdown(),
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
