import { createMemoryHistory } from 'vue-router'
import { renderToString } from 'vue/server-renderer'
import { createSiteApp } from './app'
import { pages, noteBySlug } from './content/notes'

/* Build-time only: scripts/prerender.js imports the SSR build of this file to
   turn each route into static HTML. Never shipped to the browser. */

/** Every URL worth a static page and a sitemap entry. */
export const urls = [
  '/', '/about', '/projects', '/contact', '/resume', '/notes',
  ...pages.map(page => `/notes/${page.slug}`)
]

/** The head fields for a URL: route meta, or the note itself on a note page. */
function headFor (route) {
  if (route.name === 'note') {
    const note = noteBySlug(route.params.slug)
    // front matter may set `description` when the first paragraph is a poor summary
    const summary = note.description || note.excerpt
    return {
      title: `${note.title} | Sam Brothers | Software Developer`,
      description: summary.length > 160 ? `${summary.slice(0, 157).trimEnd()}…` : summary,
      type: 'article',
      published: note.date
    }
  }
  return { title: route.meta.title, description: route.meta.description, type: 'website' }
}

export async function render (url) {
  const { app, router } = createSiteApp(createMemoryHistory())
  await router.push(url)
  await router.isReady()
  const html = await renderToString(app)
  return { html, head: headFor(router.currentRoute.value) }
}
