// The Notes page's content, authored by hand as one file per entry in ./data/.
// Same shape as the projects loader: everything is bundled at build time, so
// the page has nothing to fetch before it can render.
//
// Two file types live side by side in ./data/, and which one a note is written
// as is what decides how it opens — not its categories. A note is a page when
// there is a page's worth of it, which is exactly what choosing markdown says:
//
//   *.js  — pointers at something that already lives somewhere else (an
//           album, a game, a tool). One default-exported object; `body` is the
//           whole of the note and the row prints it in full, and `url` is what
//           the row opens, in a new tab.
//
//   *.md  — long-form musings, each with a page at /notes/<slug>. YAML front
//           matter carries the same fields the .js entries use, and the
//           markdown below it is rendered to HTML at build time by the
//           notes-markdown plugin in vite.config.js — the parser never ships
//           to the browser. The plugin also derives `excerpt` (first
//           paragraph, plain text) for the list row and `readMinutes` from the
//           word count.
//
// To add a note: drop a file in ./data/ following either shape below. Nothing
// else. The filename is the slug, which is also the URL of a markdown note's
// page. A note still being written stays out of the site by saying so —
// `draft: true` in a markdown note's front matter, `hidden: true` in a .js
// one — and a draft is dropped by the plugin before it is ever rendered, so
// its prose is not in the bundle to be found.
//
//   {
//     title:      'Radiohead — In Rainbows',
//     categories: [CATEGORIES.ART],  // every chip the note answers to, and a
//                                    // pill for each; front matter may write
//                                    // them as `categories: [art, musings]`
//     date:       '2026-07',         // ISO, sorts lexically
//     url:        'https://…',       // where a .js note's row goes
//     linkLabel:  'Listen on Spotify',// optional; names the link, in place of
//                                    // the hostname the row falls back to
//     body:       '…'                // plain text; markdown files use the
//   }                                // body of the file instead
//
// The entries sit in their own subdirectory rather than beside this file, so
// the globs below cannot pick up the loader or the category vocabulary.

import { CATEGORY_LIST, CATEGORY_PILL, DEFAULT_CATEGORIES } from '@/content/notes/categories'

export { formatDate } from '@/utils/dates'

const jsModules = import.meta.glob('./data/*.js', { eager: true })
const markdownModules = import.meta.glob('./data/*.md', { eager: true })

const slugOf = path => path.match(/([^/]+)\.[^./]+$/)[1]

export const FORMATS = Object.freeze({
  MARKDOWN: 'markdown',
  SHORT: 'short'
})

/* A note's categories, as a list, however it wrote them: front matter is
   hand-typed, so `categories: musings, art` on one line is read the same as
   the array a .js entry passes. Anything outside the vocabulary is dropped,
   because an invented category has no chip to answer to and no hue to wear. */
function categoriesOf (entry) {
  const declared = Array.isArray(entry.categories)
    ? entry.categories
    : String(entry.categories || '').split(',')

  return declared
    .map(category => String(category).trim())
    .filter(category => CATEGORY_PILL[category])
}

/* Fills in what every consumer would otherwise have to, so neither the list
   row nor the note page has to derive a pill label or cope with a missing
   excerpt. `format` is not something a note declares — it is which glob picked
   the file up — so a note cannot claim a page it has no body for. */
function normalize (slug, format, entry) {
  const categories = categoriesOf(entry)

  return {
    ...entry,
    slug,
    format,
    categories,
    /* The pills on the row, in vocabulary order rather than the order the note
       happened to list them, so a run of rows reads down the page evenly. */
    pills: CATEGORY_LIST
      .filter(category => categories.includes(category.key))
      .map(category => ({ key: category.key, label: category.pill })),
    /* Markdown entries carry a plain-text excerpt for the row; short entries
       are short enough to be their own excerpt. */
    excerpt: entry.excerpt || entry.body || ''
  }
}

const entriesOf = (modules, format) =>
  Object.entries(modules).map(([path, module]) => normalize(slugOf(path), format, module.default))

export const notes = [
  ...entriesOf(jsModules, FORMATS.SHORT),
  ...entriesOf(markdownModules, FORMATS.MARKDOWN)
]
  /* Drafts arrive here as `hidden` too: the markdown plugin turns the front
     matter's `draft: true` into one, keeping the unfinished prose out. */
  .filter(note => !note.hidden)
  .sort((a, b) => b.date.localeCompare(a.date))

/** The notes with a page of their own: the markdown ones. Everything else is
    the whole of itself in the list. */
export const pages = notes.filter(note => note.format === FORMATS.MARKDOWN)

export function noteBySlug (slug) {
  return notes.find(note => note.slug === slug)
}

/** Chip counts, in chip order: [{ key, label, pill, count }]. A note under two
    categories counts once under each, so the counts add up to more than the
    list is long. A category nothing carries yet is left out rather than shown
    as a chip leading to an empty list. */
export const categoryCounts = CATEGORY_LIST
  .map(category => ({
    ...category,
    count: notes.filter(note => note.categories.includes(category.key)).length
  }))
  .filter(category => category.count > 0)

/** The categories the page starts on, minus any that nothing carries yet — a
    default chip with nothing under it would open the page on an empty list. */
export const defaultCategories = DEFAULT_CATEGORIES
  .filter(key => categoryCounts.some(category => category.key === key))
