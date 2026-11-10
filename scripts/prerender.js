/* Runs after the client and SSR builds (see `npm run build`). For every URL in
   src/entry-server.js it renders the app to static HTML and writes it where
   GitHub Pages will serve it with a 200: /about -> about.html, and
   /notes/<slug> -> notes/<slug>.html. Each page gets its own title,
   description, canonical URL, Open Graph tags, and structured data, so search
   engines, AI crawlers that don't run JavaScript, and link previews (LinkedIn,
   Slack, iMessage) all see real content. The browser then mounts the live app
   over the markup. Also writes sitemap.xml, robots.txt, and the 404.html
   GitHub Pages falls back to. */
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const SITE = 'https://sambrothers0.github.io'
const OG_IMAGE = `${SITE}/img/og-image.jpg`

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const ssrDir = join(root, 'dist-ssr')

const { render, urls } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')))
const template = readFileSync(join(dist, 'index.html'), 'utf8')

const PERSON = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: 'Sam Brothers',
  url: `${SITE}/`,
  image: OG_IMAGE,
  jobTitle: 'Software Developer',
  address: { '@type': 'PostalAddress', addressLocality: 'Chapel Hill', addressRegion: 'NC', addressCountry: 'US' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'William & Mary' },
  knowsAbout: ['Software development', 'Web development', 'Vue.js', 'Python', 'Data engineering', 'Data analytics'],
  sameAs: ['https://github.com/sambrothers0', 'https://www.linkedin.com/in/samjbrothers/']
}

const escapeHtml = text => String(text)
  .replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// JSON inside <script> only has to avoid closing the tag early
const jsonLd = data => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`

function structuredData (url, head) {
  const page = `${SITE}${url}`
  if (url === '/') {
    return jsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        PERSON,
        { '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Sam Brothers', publisher: { '@id': PERSON['@id'] } },
        { '@type': 'ProfilePage', url: page, name: head.title, mainEntity: { '@id': PERSON['@id'] } }
      ]
    })
  }
  if (head.type === 'article') {
    return jsonLd({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: head.title.replace(/ \| Sam Brothers \| Software Developer$/, ''),
      description: head.description,
      datePublished: head.published,
      url: page,
      image: OG_IMAGE,
      author: { '@type': 'Person', name: PERSON.name, url: PERSON.url }
    })
  }
  return jsonLd({
    '@context': 'https://schema.org',
    '@type': url === '/about' ? 'AboutPage' : url === '/contact' ? 'ContactPage' : 'WebPage',
    url: page,
    name: head.title,
    description: head.description,
    about: PERSON
  })
}

function headTags (url, head) {
  const canonical = `${SITE}${url}`
  const title = escapeHtml(head.title)
  const description = escapeHtml(head.description)
  return [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}">`,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:type" content="${head.type}">`,
    `<meta property="og:site_name" content="Sam Brothers">`,
    `<meta property="og:title" content="${title}">`,
    `<meta property="og:description" content="${description}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${OG_IMAGE}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="Sam Brothers smiling outdoors in front of mountains">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    structuredData(url, head)
  ].join('\n    ')
}

const TITLE_TAG = /<title>[^<]*<\/title>/
const APP_DIV = '<div id="app"></div>'
if (!TITLE_TAG.test(template) || !template.includes(APP_DIV)) {
  throw new Error('dist/index.html no longer has the <title> and empty #app the prerender fills in')
}

const fileFor = url => url === '/' ? 'index.html' : `${url.slice(1)}.html`

for (const url of urls) {
  const { html, head } = await render(url)
  if (!head.title || !head.description) throw new Error(`${url} is missing a title or description`)
  const page = template
    .replace(TITLE_TAG, headTags(url, head))
    .replace(APP_DIV, `<div id="app">${html}</div>`)
  const out = join(dist, fileFor(url))
  mkdirSync(dirname(out), { recursive: true })
  writeFileSync(out, page)
  console.log(`prerendered ${url} -> ${fileFor(url)}`)
}

/* GitHub Pages serves this, with a 404 status, for any path it has no file
   for. It is the bare app shell: vue-router renders NotFound on the client.
   noindex keeps a stray URL out of search results. */
writeFileSync(join(dist, '404.html'), template.replace(TITLE_TAG,
  '<title>Page not found | Sam Brothers | Software Developer</title>\n    <meta name="robots" content="noindex">'))

writeFileSync(join(dist, 'sitemap.xml'), [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map(url => `  <url><loc>${SITE}${url}</loc></url>`),
  '</urlset>',
  ''
].join('\n'))

writeFileSync(join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)

// the SSR bundle was only ever an input to this script
rmSync(ssrDir, { recursive: true, force: true })
console.log(`wrote 404.html, sitemap.xml (${urls.length} URLs), robots.txt`)
